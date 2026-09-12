import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useInView } from "react-intersection-observer";

interface ProgressBarsProps {
    title: string;
    value: number;
    showTitle?: boolean;
    height?: string;
}
const Progresbar: React.FC<ProgressBarsProps> = ({ title = "", value = 80, showTitle = true, height = "7px" }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = value;
            const duration = 700; // total animation time in ms
            const frameRate = 20; // update every 20ms
            const increment = end / (duration / frameRate);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    start = end;
                    clearInterval(timer);
                }
                setProgress(Math.round(start)); // both text + bar update together
            }, frameRate);
            return () => clearInterval(timer);
        }
    }, [inView, value,setProgress]);

    return ( 
        <li ref={ref}>
            <div className="why-choose-two__progress">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="why-choose-two__progress-title">{showTitle ? title : ""}</h4>
                    <span>{progress}%</span>
                </div>
                <ProgressBar
                    completed={progress}
                    maxCompleted={100}
                    bgColor="#2AB97E"
                    baseBgColor="#f7f7f9"
                    height={height}
                    isLabelVisible={false}
                    className="progressWrapper"
                    barContainerClassName="barContainer"
                    animateOnRender={false} // disable internal animation
                />
            </div>
        </li>
    );
};

export default React.memo(Progresbar);