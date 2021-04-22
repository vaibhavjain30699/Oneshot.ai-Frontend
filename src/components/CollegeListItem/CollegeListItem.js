import React from "react";

import "./CollegeListItem.css";

const CollegeListItem = (props) => {
    return (
        <div className="cliMain" onClick={props.onPress}>
            {props.children}
        </div>
    );
};

export default CollegeListItem;
