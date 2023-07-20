import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { ScrollControls } from "@react-three/drei";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Overlay } from "./components/Overlay";
import { usePlay } from "./contexts/Play";

function App() {
  const {play}=  usePlay();
  return (
    <>
      <Canvas camera={{
        position: [0, 0, 5],
        fov: 30,
      }}>
        <color attach="background" args={["#ececec"]} />
        {/* ScrollControls IS HOW MUCH YOU CAN SCROLL */}
        <ScrollControls 
          pages={play ? 20 : 0} 
          damping={0.5}
          style={{
            top: "10px",
            left: "0px",
            bottom: "10px",
            right: "10px",
            width: "auto",
            height: "auto",
            animation: "fadeIn 2.5s ease-in-out 1.2s forwards",
            opacity: 0,
          }}
          >
        <Experience />
        </ScrollControls>  
        <EffectComposer>
          <Noise opacity={0.05}/>
        </EffectComposer>
      </Canvas>
      <Overlay />
    </>
  );
}

export default App;
