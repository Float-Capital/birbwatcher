const NFTCollectionCardDetailed = (props) => {
  return (
    <div className={"border-1 rounded-lg flex flex-row"}>
      <img
        src={`/images/${props.collection.contractAddress.toLowerCase()}.png`}
        className="w-[220px] h-[220px]"
      />
      <div className="flex flex-col items-center justify-center min-w-[220px] w-[220px] h-[220px] bg-gray-200 p-2 text-black">
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
