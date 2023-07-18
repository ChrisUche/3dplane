import { useProgress } from "@react-three/drei";

export const Overlay = () => {

    const { progress } = useProgress();
    return (
        <div className="overlay">
            {/* loader should diappear if the progress = 100 */}
            <div className={`loader ${progress === 100 ? "loader--disappear": ""}`}/> 
            {/* render the intro ui element only if its loaded */}
            {
                progress === 100 && (
            
            <div className="intro">
                <h1 className="logo">UCHE CHRIS
                    <div className="spinner">
                        <div className="spinner__image"/>
                    </div>
                </h1>
                <button className="explore">Explore</button>
            </div>
                )}
        </div>
    );
};