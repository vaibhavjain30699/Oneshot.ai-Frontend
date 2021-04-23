import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = (props) => {
    return (
        <div
            className="headerMain"
            // onClick={() => {
            //     props.history.push("/");
            // }}
        >
            <Link to="/">
                <span style={{ color: "white" }}>CollegeMantra</span>
            </Link>
        </div>
    );
};

export default Header;
