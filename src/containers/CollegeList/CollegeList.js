import React from "react";
import { Container } from "@material-ui/core";

import "./CollegeList.css";
import CollegeListItem from "../../components/CollegeListItem/CollegeListItem";

const CollegeList = (props) => {
    return (
        <div className="clMain">
            <Container>
                <div className="clBody">
                    <div className="clHeading">List of Colleges</div>
                    <CollegeListItem onPress={() => {
                        props.history.push("/institute")
                    }}>College Name</CollegeListItem>
                </div>
            </Container>
        </div>
    );
};

export default CollegeList;
