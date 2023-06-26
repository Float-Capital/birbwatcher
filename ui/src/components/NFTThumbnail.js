const NFTThumbnail = ({ token, size }) => {
  const aLongString = 30;
  return (
    <div className="m-2">
      <img src={token.image} className={"w-full max-w-[300px] h-auto "} />
      <p className={`text-${token.name.length > aLongString ? "xs" : "md"}`}>
        {token.name}
      </p>
    </div>
  );
};

export default NFTThumbnail;
