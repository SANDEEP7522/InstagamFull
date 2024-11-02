import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/login";
import Signup from "./Components/signup";
import Profile from "./Components/Profile";
import MainLayout from "./Components/MainLayout";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/", 
        element: <Home />
      },
      {
        path: "/profile/:id", 
        element: <Profile />
      },
    ]
  },
  {
    path: "/login",
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
       <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
