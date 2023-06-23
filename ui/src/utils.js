export const nftTokenURIABI = [
  "function tokenURI(uint256 tokenId) external view returns (string memory)",
];

export const contractAddressToRpcUrlMapping = (address) => {
  switch (address) {
    case "0x90B3832e2F2aDe2FE382a911805B6933C056D6ed":
    case "0x3545192b340F50d77403DC0A64cf2b32F03d00A9":
    case "0x5663e3E096f1743e77B8F71b5DE0CF9Dfd058523":
    case "0xBCC664B1E6848caba2Eb2f3dE6e21F81b9276dD8":
    case "0xFcCC94f2b99eC71FF04E6cE9F0eA9797F4f0536B":
      return "https://eth.llamarpc.com";
    case "0xc10baAd4D7a0C3574d50FA606666EB7De176c7E6":
      return "https://rpc.ankr.com/optimism";
    case "0x841918849E6784d7e643837Ad59571eA1fc5000B":
      return "https://polygon-rpc.com";
    default: {
      console.error("No RPC URL found for contract: ", address);
      return "";
    }
  }
};
