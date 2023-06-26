export const nftTokenURIABI = [
  "function tokenURI(uint256 tokenId) external view returns (string memory)",
];

export const contractAddressToRpcUrlMapping = (address) => {
  let toLowerCaseAddress = address.toLowerCase();
  switch (toLowerCaseAddress) {
    case "0x90B3832e2F2aDe2FE382a911805B6933C056D6ed".toLowerCase():
    case "0x3545192b340F50d77403DC0A64cf2b32F03d00A9".toLowerCase():
    case "0x5663e3E096f1743e77B8F71b5DE0CF9Dfd058523".toLowerCase():
    case "0xBCC664B1E6848caba2Eb2f3dE6e21F81b9276dD8".toLowerCase():
    case "0xFcCC94f2b99eC71FF04E6cE9F0eA9797F4f0536B".toLowerCase():
    case "0x9aF7B3cfCa8a0d0feD9A8C9b77f6088cB1bbF791".toLowerCase():
      return "https://eth.llamarpc.com";
    case "0xc10baAd4D7a0C3574d50FA606666EB7De176c7E6".toLowerCase():
      return "https://rpc.ankr.com/optimism";
    case "0x841918849E6784d7e643837Ad59571eA1fc5000B".toLowerCase():
      return "https://polygon-rpc.com";
    default: {
      console.error("No RPC URL found for contract: ", address);
      return "";
    }
  }
};
