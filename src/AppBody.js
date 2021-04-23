import { Redirect, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Dashboard from "./containers/Dashboard/Dashboard";
import CollegeList from "./containers/CollegeList/CollegeList";
import CollegeInfo from "./containers/CollegeInfo/CollegeInfo";
import Statistics from "./containers/Statistics/Statistics";

const AppBody = (props) => {
    return (
        <div>
            <Header {...props} />
            <div className="appBody">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/collegeList" component={CollegeList} />
                    <Route path="/institute" component={CollegeInfo} />
                    <Route exact path="/statistics" component={Statistics} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </div>
    );
};

export default AppBody;
