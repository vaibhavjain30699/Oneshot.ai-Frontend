import "./App.css";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import "antd/dist/antd.css";

import Header from "./components/Header/Header";
import Dashboard from "./containers/Dashboard/Dashboard";
import CollegeList from "./containers/CollegeList/CollegeList";
import CollegeInfo from "./containers/CollegeInfo/CollegeInfo";
import Statistics from "./containers/Statistics/Statistics";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="appBody">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route
                            exact
                            path="/collegeList"
                            component={CollegeList}
                        />
                        <Route path="/institute" component={CollegeInfo} />
                        <Route
                            exact
                            path="/statistics"
                            component={Statistics}
                        />
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
