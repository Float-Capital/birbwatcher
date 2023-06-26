const NFTThumbnail = ({ token, size }) => {
  return (
    <div className="m-2">
      <img src={token.image} className={"w-full max-w-[300px] h-auto "} />
      <p>{token.name}</p>
    </div>
  );
};

export default NFTThumbnail;
