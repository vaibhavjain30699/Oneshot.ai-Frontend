import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";

import AppBody from "./AppBody";

function App() {
    return (
        <div className="App">
            <Router>
                <AppBody />
            </Router>
        </div>
    );
}

export default App;
