const NFTThumbnail = ({ token, size }) => {
  return (
    <div className="m-2">
      <img src={token.image} width={size} height={size} />
      <p>{token.name}</p>
    </div>
  );
};

export default NFTThumbnail;
