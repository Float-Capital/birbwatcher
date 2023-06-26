const NFTThumbnail = ({ token, size }) => {
  return (
    <div className="m-2 w-full object-cover">
      <img src={token.image} className={"w-full h-full"} />
      <p>{token.name}</p>
    </div>
  );
};

export default NFTThumbnail;
