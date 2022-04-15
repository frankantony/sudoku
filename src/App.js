import { Link, useParams } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";
import { formateTimer } from './utils/Util.js';
import './App.css';
import Game from "./game/Game.js";

export const App = () => {

    const [timer, setTimer] = useState(0);
    const [paused, setPaused] = useState(false);
    const countRef = useRef(null);

    const level = useParams().level;

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed)
            handleResume();
        return () => (isSubscribed = false)
    }, []);

    function handleResume() {
        setPaused(false)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handlePause = () => {
        clearInterval(countRef.current)
        setPaused(true)
    }

    return (
        <div>
            <Game paused={paused} level={level} />
            <div className="app">
                <h3>Time</h3>
                <div className='stopwatch-card'>
                    <p>{formateTimer(timer)}</p>
                    <div className='buttons'>
                        {
                            !paused ? <button onClick={handlePause}>Pause</button> :
                                <button onClick={handleResume}>Resume</button>
                        }
                    </div>
                </div>
            </div>
			<br/>
			<div className = "App">
	            <Link to="/">Back</Link>
			</div>
        </div>
    );
}

export default App;
