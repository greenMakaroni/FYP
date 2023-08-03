import { Canvas } from "@react-three/fiber";
import Postprocessing from "./Postprocessing";
import "./backgroundCanvas.css"

// model
import Scene from "./Scene";

const BackgroundCanvas = () => {
  return (
    <div className="backgroundCanvas">
      <Canvas dpr={[1, 1.5]} camera={{ position: [-15, 15, 18], fov: 35 }} gl={{ alpha: false }}>
        <color attach="background" args={['#17171b']} />

        {/* Lights */}
        <pointLight
          color={"white"}
          intensity={1.8}
          position={[-10, 30, -10]}
     
        />
        {/* {MODELS} */}
        <Scene />

        {/* {POSTPROCESSING EFFECTS} */}
        <Postprocessing />

      </Canvas>
    </div>
  )
}

export default BackgroundCanvas


