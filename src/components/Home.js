import React from 'react';

import { Link } from 'react-router-dom';

import '../App.css';

class Home extends React.Component {

    render() {
        return (
            <div className='dialog'>
                <p>Choose the level of game!</p>
                <div >
                    <div>
                        <Link to="/game/easy">Easy</Link>
                    </div>
                    <div>
                        <Link to="/game/medium">Medium</Link>
                    </div>
                    <div>
                        <Link to="/game/hard">Hard</Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default Home;