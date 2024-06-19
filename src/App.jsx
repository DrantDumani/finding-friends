import { routes } from "./router/route";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
