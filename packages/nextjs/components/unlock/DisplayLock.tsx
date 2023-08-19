import { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import DisplayListItem from "./DisplayListItem";
import { useAccount } from "wagmi";
import { useScaffoldEventHistory, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

type WrappedLock = {
  wrapper: string | undefined;
  lock: string | undefined;
  creator: string | undefined;
};

export interface WrappedLockEvent {
  args: WrappedLock;
  block: any;
  log: any;
  receipt: any;
  transaction: any;
}

export const DisplayLock = () => {
  const { address } = useAccount();
  const {
    data: newWrapEvents,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "UnlockPaperWrapperFactory",
    eventName: "NewWrap",
    fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
    filters: { creator: address },
    blockData: true,
  });

  const [wrappedLocks, setWrappedLocks] = useState<WrappedLockEvent[] | undefined>(newWrapEvents);

  const handleNewWrapEvent = (logs: any[]) => {
    logs.forEach(log => {
      const { wrapper, lock, creator } = log.args;
      // Check if the event with the same lock exists
      const exists = wrappedLocks?.some(event => event.args.lock === lock);
      if (!exists) {
        setWrappedLocks(prevState => [
          ...(prevState || []),
          {
            args: {
              wrapper,
              lock,
              creator,
            },
            block: {},
            log: {},
            receipt: {},
            transaction: {},
          },
        ]);
      }
    });
  };

  useScaffoldEventSubscriber({
    contractName: "UnlockPaperWrapperFactory",
    eventName: "NewWrap",
    listener: handleNewWrapEvent,
  });

  useEffect(() => {
    if (newWrapEvents && Array.isArray(newWrapEvents)) {
      const combinedEvents = [...(wrappedLocks || []), ...newWrapEvents];
      const deduplicatedEvents = Array.from(new Set(combinedEvents.map(e => e.args.lock))).map(lock =>
        combinedEvents.find(e => e.args.lock === lock),
      );
      console.log("deduplicatedEvents", deduplicatedEvents);
      setWrappedLocks(deduplicatedEvents);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newWrapEvents]);

  return (
    <div className="flex flex-col justify-center items-center py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <h1 className="sm:text-4xl text-center mb-10">Your Deployed Wrappers</h1>
      <ul>
        {!isLoadingEvents && wrappedLocks && wrappedLocks.length > 0 ? (
          wrappedLocks.map((event, index) => (
            <DisplayListItem key={`${index}-${event.args.lock}`} event={event}></DisplayListItem>
          ))
        ) : !errorReadingEvents ? (
          <div className="sm:text-2xl text-center">No lock wrappers deployed...</div>
        ) : isLoadingEvents ? (
          <div className="w-full text-center">
            <Spinner />
          </div>
        ) : (
          <div className="sm:text-2xl text-red text-center">Error reading events!</div>
        )}
      </ul>
    </div>
  );
};
