import { SelectNetwork } from "./SelectNetwork";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useNetworkColor } from "~~/hooks/scaffold-eth";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  const networkColor = useNetworkColor();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button className="btn btn-primary btn-sm" onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              return (
                <div className="px-2 flex justify-end items-center">
                  <div className="flex justify-center items-center border-1 rounded-lg">
                    <div className="flex items-center mr-1">
                      <span className="text-xs mr-2" style={{ color: networkColor }}>
                        {account.displayBalance}
                      </span>
                      <SelectNetwork chain={chain} />
                    </div>
                    {!chain.unsupported && (
                      <button
                        onClick={openAccountModal}
                        type="button"
                        className="btn btn-secondary btn-sm pl-0 pr-2 shadow-md"
                      >
                        <BlockieAvatar address={account.address} size={24} ensImage={account.ensAvatar} />
                        <span className="ml-2 mr-1">{account.displayName}</span>
                        <span>
                          <ChevronDownIcon className="h-6 w-4" />
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
