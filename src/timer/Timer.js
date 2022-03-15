import React, { useEffect, useRef, useState } from "react";
import { formateTimer } from '../utils/Util.js';
import './Timer.css';

export const Timer = () => {

    const [timer, setTimer] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef(null);

    useEffect(() => {
        handleResume();
    }, [])

    function handleResume() {
        setIsPaused(false)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handlePause = () => {
        clearInterval(countRef.current)
        setIsPaused(true)
    }

    return (
        <div className="app">
            <h3>Time</h3>
            <div className='stopwatch-card'>
                <p>{formateTimer(timer)}</p>
                <div className='buttons'>
                    {
                        !isPaused ? <button onClick={handlePause}>Pause</button> :
                            <button onClick={handleResume}>Resume</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Timer;