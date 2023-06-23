const NFTCollectionCard = (props) => {
  console.log(props, "props.collection");
  return (
    <div className="w-[100px] h-[100px] bg-gray-400 m-4 border-1 rounded-lg">
      {props.collection.name}
    </div>
  );
};

export default NFTCollectionCard;
