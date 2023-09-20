import { useDisconnect, useSwitchNetwork } from "wagmi";
import { ArrowLeftOnRectangleIcon, ArrowsRightLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
import { enabledChains } from "~~/services/web3/wagmiConnectors";

// import { getTargetNetwork } from "~~/utils/scaffold-eth";

interface ISelectNetwork {
  network: string | undefined;
}

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const SelectNetwork: React.FC<ISelectNetwork> = ({ network }) => {
  const networkColor = useNetworkColor();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();
  //   const configuredNetwork = getTargetNetwork();

  return (
    <>
      <div className="dropdown dropdown-end mr-2">
        <label tabIndex={0} className="btn  btn-sm dropdown-toggle">
          <span>{network}</span>
          <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 mt-1 shadow-lg bg-base-100 rounded-box">
          {enabledChains.map(chain => (
            <li key={chain.id}>
              <button className="menu-item" type="button" onClick={() => switchNetwork?.(chain.id)}>
                <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
                <span className="whitespace-nowrap">
                  Switch to <span style={{ color: networkColor }}>{chain.name}</span>
                </span>
              </button>
            </li>
          ))}
          <li>
            <button className="menu-item text-error" type="button" onClick={() => disconnect()}>
              <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
