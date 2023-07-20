import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";

export const Overlay = () => {

    const { progress } = useProgress();
    const { play , setPlay, hasScroll} = usePlay();
    return (
        // when "play" has been activated disable overlay
        <div className={`overlay ${play ? "overlay--disable" : ""} ${hasScroll ? "overlay--disable" : ""}`}> 
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
                {/* <p className="intro__scroll">Scroll to begin your journey!</p> */}
                <button className="explore" onClick={() => {
                    setPlay(true)
                }}>Explore</button>
            </div>
                )}
        </div>
    );
};