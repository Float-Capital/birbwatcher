import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";
import AddressPage from "./pages/AddressPage";
import CollectionPage from "./pages/CollectionPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "address/:address",
      element: <AddressPage />,
    },
    {
      path: "collection/:collection",
      element: <CollectionPage />,
    },
  ]);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center bg-[#2d0b5a] bg-opacity-30">
      <NavBar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
