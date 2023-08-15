import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  UnlockPaperWrapperFactory,
  NewWrap,
} from "../generated/UnlockPaperWrapperFactory/UnlockPaperWrapperFactory";
import { LockWrap, Creator } from "../generated/schema";

export function handleNewWrap(event: NewWrap): void {
  let creatorString = event.params.creator.toHexString();

  let creator = Creator.load(creatorString);

  if (creator === null) {
    creator = new Creator(creatorString);
    creator.address = event.params.creator;
    creator.createdAt = event.block.timestamp;
    creator.wrapsCount = BigInt.fromI32(1);
  } else {
    creator.wrapsCount = creator.wrapsCount.plus(BigInt.fromI32(1));
  }

  let lockWrap = new LockWrap(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  lockWrap.address = event.params.wrapper;
  lockWrap.creator = creatorString;
  lockWrap.lock = event.params.lock;
  lockWrap.creator = event.params.creator.toHexString();;
  lockWrap.createdAt = event.block.timestamp;
  lockWrap.transactionHash = event.transaction.hash.toHex();

  lockWrap.save();
  creator.save();
}
