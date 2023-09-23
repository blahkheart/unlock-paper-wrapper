import { SelectNetwork } from "./SelectNetwork";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDisconnect, useSwitchNetwork } from "wagmi";
import { ArrowLeftOnRectangleIcon, ArrowsRightLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useScaffoldConfig } from "~~/context/ScaffoldConfigContext";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
import { enabledChains } from "~~/services/web3/wagmiConnectors";

// import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  const networkColor = useNetworkColor();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();
  const { configuredNetwork, setNetwork } = useScaffoldConfig();
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

              if (chain.unsupported || chain.id !== configuredNetwork.id) {
                return (
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className={`btn btn-sm dropdown-toggle ${chain.unsupported ? "btn-error" : "btn-warning"}`}
                    >
                      <span>{chain.unsupported ? "Wrong network" : "Switch network"}</span>
                      <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 mt-1 shadow-lg bg-base-100 rounded-box">
                      {enabledChains.map(chain => (
                        <li key={chain.id}>
                          <button
                            className="menu-item"
                            type="button"
                            onClick={() => {
                              setNetwork(chain);
                              switchNetwork?.(chain.id);
                            }}
                          >
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
                );
              }

              return (
                <div className="px-2 flex justify-end items-center">
                  <div className="flex justify-center items-center border-1 rounded-lg">
                    <div className="flex items-center mr-1">
                      <span className="text-xs mr-2" style={{ color: networkColor }}>
                        {account.displayBalance}
                      </span>
                      <SelectNetwork network={chain.name} />
                    </div>
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
