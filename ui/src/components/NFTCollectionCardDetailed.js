const NFTCollectionCardDetailed = (props) => {
  return (
    <div className={"border-1 rounded-lg flex flex-row"}>
      <img
        src={`/images/${props.collection.contractAddress.toLowerCase()}.png`}
        className="w-[220px] h-[220px]"
      />
      <div className="w-[220px] h-[220px] bg-gray-400 p-2">
        {props.collection.name}
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
    </div>
  );
};

export default NFTCollectionCardDetailed;
