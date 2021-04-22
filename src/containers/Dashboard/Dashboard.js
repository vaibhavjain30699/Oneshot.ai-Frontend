import React from "react";
import { Container } from "@material-ui/core";
import { Col, Row } from "antd";

import "./Dashboard.css";
import collegeImage from "../../assets/college.png";

const Dashboard = (props) => {
    return (
        <div className="dashboardMain">
            <Container>
                <div className="dashboardBody">
                    <Row align="middle">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <div>
                                <div className="dbText">
                                    Confused about what college to apply to
                                    after the exams?
                                </div>
                                <img
                                    src={collegeImage}
                                    alt="College"
                                    style={{ width: "100%" }}
                                />
                                <div className="dbText">
                                    College Mantra provides you all that you
                                    need.
                                    <br />
                                    Check out the list of colleges to find out
                                    the college that meets your need.
                                    <br />
                                    Get more detailed information of colleges
                                    categorized by state and course to find the
                                    one that meets your needs.
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <div className="dashboardButtonBlock">
                                <div
                                    className="dashboardButton"
                                    onClick={() => {
                                        props.history.push("/collegeList");
                                    }}
                                >
                                    List of Colleges
                                </div>
                                <div
                                    className="dashboardButton"
                                    onClick={() => {
                                        props.history.push("/statistics");
                                    }}
                                >
                                    College Statistics
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default Dashboard;
