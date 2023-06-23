import React from "react";
import Search from "./components/svgs/Search";
import NFTCollectionCard from "./components/NFTCollectionCard";
import Loader from "./components/Loader";
import axios from "axios";
import { ethers } from "ethers";
import collectionConfig from "./collection-config.js";

const nftTokenURIABI = [
  "function tokenURI(uint256 tokenId) external view returns (string memory)",
];

const contractAddressToRpcUrlMapping = (address) => {
  switch (address) {
    case "0x90B3832e2F2aDe2FE382a911805B6933C056D6ed":
    case "0x3545192b340F50d77403DC0A64cf2b32F03d00A9":
    case "0x5663e3E096f1743e77B8F71b5DE0CF9Dfd058523":
    case "0xBCC664B1E6848caba2Eb2f3dE6e21F81b9276dD8":
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

async function getAddressFromENS(ensName) {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth.llamarpc.com"
  );

  try {
    const address = await provider.resolveName(ensName);
    return address;
  } catch (error) {
    console.error("Error resolving ENS name:", error);
    return null;
  }
}

async function fetchIPFSJSON(endpoint) {
  const gatewayURL = "https://ipfs.io/ipfs/";

  try {
    const cid = endpoint.replace("ipfs://", "");
    const response = await fetch(gatewayURL + cid);
    if (!response.ok) {
      throw new Error("Failed to fetch IPFS JSON");
    }

    return response;
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

function App() {
  // 0xf28eA36e3E68Aff0e8c9bFF8037ba2150312ac48 - denham.eth
  // 0x684f49bc1e04339d84F2370f14Dc1491A3B4F113 - rliriano.eth
  // 0x9F36A6bB398118bdCD5B1bC3343D8FEB6d7d02B9 - tjark.eth
  // 0x93D3F6d68B6416035Aa0c60E3c6D184b33d2c40A - some random address
  // 0x141EfE71dc89aC5b4DC8e9B9429a80978D6750b9 - some random address
  // 0x9f2B2aF2771747De236CDc38f10a169897330324 - some random address
  // 0x2d3f495F0e2370a68B60CEbB4406CbC0BE3d2145 - some random address
  const [userAddress, setUserAddress] = React.useState("");
  const [userTokens, setUserTokens] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [metadata, setMetadata] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  console.log(collectionConfig, "collectionConfig");

  const reset = () => {
    setErrorMessage(""); // reset error message
    setUserTokens([]); // reset user tokens
    setMetadata([]); // reset metadata
  };

  React.useEffect(() => {
    reset();
  }, []);

  const handleInputChange = (e) => {
    setUserAddress(e.target.value);
  };

  async function handleClick() {
    setIsLoading(true);
    reset();
    let isEns = userAddress.includes(".eth");
    let address = isEns ? await getAddressFromENS(userAddress) : userAddress;
    fetchUserData(address);
  }

  React.useEffect(() => {
    userTokens.forEach((token) => {
      let tokenAddressAndTokenId = token.id.split("-");

      if (tokenAddressAndTokenId[0] && tokenAddressAndTokenId[1]) {
        async function fetchMetadata() {
          try {
            let tokenAddress = tokenAddressAndTokenId[0];
            let tokenId = tokenAddressAndTokenId[1];

            let rpcUrl = contractAddressToRpcUrlMapping(tokenAddress);

            // Create an ethers.js provider
            const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

            // Create a contract instance using the token address and ABI
            const contract = new ethers.Contract(
              tokenAddress,
              nftTokenURIABI,
              provider
            );

            // Call the contract's tokenURI function to get the metadata URI
            const tokenURI = await contract.tokenURI(tokenId);

            // Fetch the metadata JSON using the URI
            const isHostedOnIPFS = tokenURI.includes("ipfs://");

            const response = isHostedOnIPFS
              ? await fetchIPFSJSON(tokenURI)
              : await fetch(tokenURI);

            let metadataJSON = await response.json();

            if (isHostedOnIPFS) {
              // map ipfs image url to http gateway
              metadataJSON.image =
                "https://ipfs.io/ipfs/" +
                metadataJSON.image.replace("ipfs://", "");
            }

            setMetadata((metadata) => [...metadata, metadataJSON]);
          } catch (error) {
            console.error(error);
            // Handle errors
          }
        }
        setIsLoading(false);
        fetchMetadata();
      }
    });
  }, [userTokens]);

  const fetchUserData = (address) => {
    // note to change the limit 100
    let userTokensQuery = `query MyQuery ($address: String!) {
      token(where: {owner: {_ilike: $address}})
      {
        id
      }
    }
  `;

    axios
      .post(
        "http://localhost:8080/v1/graphql",
        JSON.stringify({
          query: userTokensQuery,
          variables: { address: address },
          operationName: "MyQuery",
        }),
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((response) => {
        let r = response.data.data.token;
        if (r.length === 0) {
          setIsLoading(false);
          setErrorMessage("User not found");
        }
        setUserTokens(r);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage("Failed to fetch data from backend");
        console.error(`Error fetching data: ${error}`);
      });
  };

  return (
    <div className="flex flex-col h-full items-center justify-center bg-gray-200 text-gray-700">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-thin tracking-wider">
          Pooltogether birbwatcher
        </h1>
      </div>
      <div className="my-6">
        <div className="flex flex-row w-full">
          <input
            type="text"
            placeholder="Search a collectooors address or ens handle here 🐦"
            className="w-[80%] min-w-[500px] p-4 border-1 rounded-lg"
            value={userAddress}
            onChange={handleInputChange}
          />
          <button
            className="w-[60px] ml-4 p-2 border-1 rounded-lg bg-gray-300 hover:bg-gray-100 focus:bg-gray-100"
            onClick={handleClick}
          >
            <Search />
          </button>
        </div>
        <p>{errorMessage}</p>
      </div>

      {isLoading ? (
        <Loader />
      ) : userTokens.length > 0 ? (
        <div className="flex flex-row flex-wrap justify-center">
          {metadata.map((token) => {
            let size = metadata.length > 4 ? "100px" : "300px";
            return (
              <div className="m-2">
                <img src={token.image} width={size} height={size} />
                <p>{token.name}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 flex flex-row justify-center">
          {collectionConfig.map((collection) => {
            return <NFTCollectionCard collection={collection} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
