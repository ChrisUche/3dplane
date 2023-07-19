import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";

export const Overlay = () => {

    const { progress } = useProgress();
    const { play , setPlay} = usePlay();
    return (
        <div className="overlay">
            {/* loader should diappear if the progress = 100 */}
            <div className={`loader ${progress === 100 ? "loader--disappear": ""}`}/> 
            {/* render the intro ui element only if its loaded */}
            {
                progress === 100 && (
            
            <div className={`intro ${play ? "intro--disappear" : ""} `}>
                <h1 className="logo">UCHE CHRIS
                    <div className="spinner">
                        <div className="spinner__image"/>
                    </div>
                </h1>
                <button className="explore" onClick={() => {
                    setPlay(true)
                }}>Explore</button>
            </div>
                )}
        </div>
    );
};