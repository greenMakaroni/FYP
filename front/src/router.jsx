// pages
import Home from "./pages/home/Home.jsx";
import ErrorPage from "./pages/error/ErrorPage.jsx";

// router
import { 
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  }
])

export default router