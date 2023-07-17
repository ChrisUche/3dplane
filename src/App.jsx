import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { ScrollControls } from "@react-three/drei";
import { EffectComposer, Noise } from "@react-three/postprocessing";

function App() {
  return (
    <>
      <Canvas camera={{
        position: [0, 0, 5],
        fov: 30,
      }}>
        <color attach="background" args={["#ececec"]} />
        {/* ScrollControls IS HOW MUCH YOU CAN SCROLL */}
        <ScrollControls pages={20} damping={0.5}>
        <Experience />
        </ScrollControls>  
        <EffectComposer>
          <Noise opacity={0.05}/>
        </EffectComposer>
      </Canvas>
    </>
  );
}

export default App;
