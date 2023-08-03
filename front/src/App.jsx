//canvas on all pages
import BackgroundCanvas from "./components/background/BackgroundCanvas.jsx";

// router 
import { 
    RouterProvider,
  } from "react-router-dom";
  import router from "./router.jsx"

const App = () => {
  return (
    <>
        <BackgroundCanvas />
        <RouterProvider router={router} />
    </>
  )
}

export default App