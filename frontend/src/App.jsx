import "./App.css";
import Login from "./Components/login";
import Signup from "./Components/signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const creatBrewser = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider  router= {creatBrewser}  />
    </>
  );
}

export default App;
