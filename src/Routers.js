import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import App from "./App";
import Home from "./components/Home";

import './App.css';

export const Routers = (props) => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:level" element={<App />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;