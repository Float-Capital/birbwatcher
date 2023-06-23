import React from "react";
import Search from "../components/svgs/Search";
import NFTCollectionCard from "../components/NFTCollectionCard";
import Loader from "../components/Loader";
import axios from "axios";
import { ethers } from "ethers";
import collectionConfig from "../collection-config.js";
import {
  fetchCollections,
  fetchIPFSJSON,
  getAddressFromENS,
  fetchUser,
} from "../data-fetchers.js";

const nftTokenURIABI = [
  "function tokenURI(uint256 tokenId) external view returns (string memory)",
];

const contractAddressToRpcUrlMapping = (address) => {
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

function HomePage() {
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

  const [userFetchState, setUserFetchState] = React.useState({
    loading: false,
    errorMessage: null,
    user: { tokenMap: [] },
  });

  const [collectionsFetchState, setCollectionsFetchState] = React.useState({
    loading: true,
    errorMessage: null,
    nftcollections: [],
  });

  const reset = () => {
    setErrorMessage(""); // reset error message
    setUserTokens([]); // reset user tokens
    setMetadata([]); // reset metadata
  };

  React.useEffect(() => {
    reset();
  }, []);

  React.useEffect(() => {
    fetchCollections().then((result) => {
      setCollectionsFetchState((_) => result);
    });
  }, []);

  const handleInputChange = (e) => {
    setUserAddress(e.target.value);
  };

  async function handleClick() {
    setUserFetchState({ ...userFetchState, loading: true });
    reset();
    let isEns = userAddress.includes(".eth");
    let address = isEns ? await getAddressFromENS(userAddress) : userAddress;
    let user = await fetchUser(address);
    setUserFetchState(user);
  }

  React.useEffect(() => {
    if (userFetchState.user.tokensMap) {
      userFetchState.user.tokensMap.forEach((token) => {
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
              let tokenURI = await contract.tokenURI(tokenId);

              // Fetch the metadata JSON using the URI
              let isHostedOnIPFS = tokenURI.includes("ipfs://");

              const isBase64Encoded = tokenURI.includes("base64");

              const response = isHostedOnIPFS
                ? await fetchIPFSJSON(tokenURI)
                : await fetch(tokenURI);

              let metadataJSON;
              if (isBase64Encoded) {
                tokenURI = tokenURI.replace(
                  "data:application/json;base64,",
                  ""
                );
                tokenURI = tokenURI.replace("==", "");
                const rawString = atob(tokenURI);
                const decodedObject = JSON.parse(rawString);
                metadataJSON = decodedObject;
              } else {
                metadataJSON = await response.json();
              }

              isHostedOnIPFS = metadataJSON.image.includes("ipfs://");

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
          fetchMetadata();
        }
      });
    }
  }, [userFetchState.user]);

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

      {userFetchState.loading ? (
        <Loader />
      ) : metadata && metadata.length > 0 ? (
        <div className="flex flex-row flex-wrap justify-center">
          {metadata.map((token) => {
            let size = metadata && metadata.length > 4 ? "100px" : "300px";
            return (
              <div className="m-2">
                <img src={token.image} width={size} height={size} />
                <p>{token.name}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 flex max-w-[1200px] flex-row justify-center flex-wrap">
          {collectionsFetchState.loading ? (
            <Loader />
          ) : collectionsFetchState.errorMessage ? (
            <p>{collectionsFetchState.errorMessage}</p>
          ) : collectionsFetchState.nftcollections.length != 0 ? (
            collectionsFetchState.nftcollections.map((collection) => {
              return <NFTCollectionCard collection={collection} />;
            })
          ) : (
            "No collections found"
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
