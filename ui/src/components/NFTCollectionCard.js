import { Link } from "react-router-dom";
import EthereumLogo from "./svgs/EthereumLogo";
import PolygonLogo from "./svgs/PolygonLogo";
import OptimismLogo from "./svgs/OptimismLogo";

const NFTCollectionCard = (props) => {
  console.log(props);
  return (
    <Link to={`/collection/${props.collection.contractAddress}`}>
      <div className={"border-1 rounded-lg relative group"}>
        <img
          src={`/images/${props.collection.contractAddress.toLowerCase()}.png`}
          className="w-[220px] h-[220px]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 w-[220px] h-[220px] bg-black bg-opacity-80 text-white p-2 text-center">
          {props.collection.name}
          <span className="text-sm">
            Supply: {props.collection.currentSupply}
          </span>
          <span className="text-sm">
            max supply:{" "}
            {props.collection.maxSupply == 0 ? "∞" : props.collection.maxSupply}
          </span>
          <span className="m-1">
            {props.collection.event_chain_id == 1 ? (
              <EthereumLogo />
            ) : props.collection.event_chain_id == 137 ? (
              <PolygonLogo />
            ) : props.collection.event_chain_id == 10 ? (
              <OptimismLogo />
            ) : null}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NFTCollectionCard;
