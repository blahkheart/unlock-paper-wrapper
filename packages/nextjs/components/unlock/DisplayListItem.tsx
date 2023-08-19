import { Address } from "../scaffold-eth";
import { WrappedLockEvent } from "./DisplayLock";
import { Divider } from "antd";

interface DisplayListItemProps {
  event: WrappedLockEvent;
}

const DisplayListItem: React.FC<DisplayListItemProps> = ({ event }) => (
  <li key={event.args.lock}>
    <div className="flex justify-start items-center mb-2">
      <span className="mr-2 w-20">Wrapper:</span> <Address address={event.args.wrapper} />
    </div>
    <div className="flex justify-start items-center">
      <span className="mr-2 w-20">Lock:</span> <Address address={event.args.lock} />
    </div>
    <Divider className="my-3" />
  </li>
);
export default DisplayListItem;
