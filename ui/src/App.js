import React from "react";
import Search from "./components/svgs/Search";
import NFTCollectionCard from "./components/NFTCollectionCard";

function App() {
  return (
    <div className="flex flex-col h-full items-center justify-center bg-gray-200 text-gray-700">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-thin tracking-wider">
          Pooltogether birbwatcher
        </h1>
      </div>
      <p className="my-6 tracking-wide">
        <div className="flex flex-row w-full">
          <input
            placeholder="Search a collectooors address here 🐦"
            className="w-[80%] min-w-[500px] p-4 border-1 rounded-lg"
          />
          <div className="w-[60px] ml-4 p-2 border-1 rounded-lg bg-green-300">
            <Search />
          </div>
        </div>
      </p>
      <div className="mt-6 flex flex-row justify-center">
        <NFTCollectionCard />
        <NFTCollectionCard />
        <NFTCollectionCard />
        <NFTCollectionCard />
        <NFTCollectionCard />
      </div>
    </div>
  );
}

export default App;
