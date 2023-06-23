import React from "react";
import Loader from "../components/Loader";
import collectionConfig from "../collection-config.js";
import { useParams } from "react-router-dom";
import { fetchCollection, fetchCollectionTokens } from "../data-fetchers.js";
import NFTCollectionCard from "../components/NFTCollectionCard";

const CollectionPage = () => {
  let { collection } = useParams();
  const [collectionFetchState, setCollectionFetchState] = React.useState({
    loading: true,
    errorMessage: null,
    nftcollection: {},
  });
  const [tokensFetchState, setTokensFetchState] = React.useState({
    loading: true,
    errorMessage: null,
    tokens: [],
  });

  const [limit, setLimit] = React.useState(24);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    fetchCollection(collection).then((result) => {
      setCollectionFetchState((_) => result);
    });
  }, []);

  React.useEffect(() => {
    fetchCollectionTokens(collection, offset, limit).then((result) => {
      setTokensFetchState((_) => result);
    });
  }, [limit, offset]);

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center">
        Collection page Network: {collection}
        <br />
        {collectionFetchState.loading ? (
          <Loader />
        ) : collectionFetchState.errorMessage ? (
          <p>{collectionFetchState.errorMessage}</p>
        ) : collectionFetchState.tokens != {} ? (
          <NFTCollectionCard collection={collectionFetchState.nftcollection} />
        ) : (
          "No collection found"
        )}
        {tokensFetchState.loading ? (
          <Loader />
        ) : tokensFetchState.errorMessage ? (
          <p>{tokensFetchState.errorMessage}</p>
        ) : tokensFetchState.tokens != [] ? (
          tokensFetchState.tokens.map((token) => {
            return token.tokenId;
          })
        ) : (
          "No tokens found"
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
