const ByEnvio = () => {
  return (
    <div className="flex flex-col md:flex-row items-center m-2 md:m-4">
      Powered by{" "}
      <a href="https://envio.dev">
        <img
          src="/images/envio.jpg"
          style={{ height: "32px", margin: "4px" }}
        />
      </a>{" "}
      Better, faster Indexing
    </div>
  );
};

export default ByEnvio;
