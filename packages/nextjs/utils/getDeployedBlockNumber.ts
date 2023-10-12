export function getDeployedBlockNumber(network: number): string {
  let blockNumber = "";
  const polygonDeployBlock = "48607424";
  const bscDeployBlock = "31398047";
  const mainnetDeployBlock = "18179080";
  const mumbaiDeployBlock = "39253113";

  switch (network) {
    case 137:
      blockNumber = polygonDeployBlock;
      break;
    case 80001:
      blockNumber = mumbaiDeployBlock;
    case 56:
      blockNumber = bscDeployBlock;
      break;
    case 1:
      blockNumber = mainnetDeployBlock;
  }
  return blockNumber;
}
