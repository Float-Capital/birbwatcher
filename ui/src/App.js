import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

  return <RouterProvider router={router} />;
}

export default App;
