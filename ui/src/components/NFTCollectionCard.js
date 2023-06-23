import { Link } from "react-router-dom";

const NFTCollectionCard = (props) => {
  return (
    <Link to={`/collection/${props.collection.contractAddress}`}>
      <div className="w-[220px] h-[220px] bg-gray-400 m-4 border-1 rounded-lg">
        name: {props.collection.name}
        <br />
        symbol: {props.collection.symbol}
        <br />
        supply: {props.collection.currentSupply}
        <br />
        max supply:{" "}
        {props.collection.maxSupply == 0 ? "∞" : props.collection.maxSupply}
        <br />
        chain id: {props.collection.event_chain_id}
      </div>
    </Link>
  );
};

export default NFTCollectionCard;
