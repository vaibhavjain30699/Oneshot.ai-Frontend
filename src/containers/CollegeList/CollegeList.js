import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";
import { Spin } from "antd";

import "./CollegeList.css";
import CollegeListItem from "../../components/CollegeListItem/CollegeListItem";
import config from "../../config";

const CollegeList = (props) => {
    const [clgList, setClgList] = useState([]);

    useEffect(() => {
        const url = `${config.baseUrl}fetchCollegeDetails/allColleges`;
        axios
            .post(url)
            .then((res) => {
                setClgList(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [setClgList]);

    return (
        <div className="clMain">
            <Container>
                <div className="clBody">
                    <div className="clHeading">List of Colleges</div>
                    {
                        clgList.length === 0 ?
                        <div className="clSpin">
                            <Spin size="large" />
                        </div> :
                        <div>
                            {
                                clgList.map((clg, key) => {
                                    return <CollegeListItem key={key} onPress={() => {
                                        props.history.push(`/institute/${clg.id}`);
                                    }}>
                                    {clg.name}
                                    </CollegeListItem>
                                })
                            }
                        </div>
                    }
                </div>
            </Container>
        </div>
    );
};

export default CollegeList;
