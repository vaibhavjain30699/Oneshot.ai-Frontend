import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { Col, Modal, Row, Spin } from "antd";
import { Pie, Bar } from "@ant-design/charts";
import axios from "axios";

import "./Statistics.css";
import config from "../../config";

const Statistics = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [modalTitle, setModalTitle] = useState("");
    const [stateList, setStateList] = useState([]);
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        const baseUrlState = `${config.baseUrl}fetchStats/States`;
        const baseUrlCourse = `${config.baseUrl}fetchStats/Courses`;

        axios
            .post(baseUrlState)
            .then((res) => {
                const resData = res.data;
                var state = [];
                var i = 0;
                for (i = 0; i < resData.length; i++) {
                    state.push({
                        ...resData[i],
                        type: resData[i].title,
                        value: resData[i]["colleges"].length,
                    });
                }
                setStateList(state);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .post(baseUrlCourse)
            .then((res) => {
                const resData = res.data;
                var course = [];
                var i = 0;
                for (i = 0; i < resData.length; i++) {
                    course.push({
                        ...resData[i],
                        value: resData[i]["colleges"].length,
                    });
                }
                setCourseList(course);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [setStateList, setCourseList]);

    var pieConfig = {
        appendPadding: 10,
        data: stateList,
        angleField: "value",
        colorField: "type",
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: "inner",
            offset: "-50%",
            content: "{value}",
            style: {
                textAlign: "center",
                fontSize: 14,
            },
        },
        interactions: [
            { type: "element-selected" },
            { type: "element-active" },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: "pre-wrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                },
                formatter: function formatter() {
                    return "";
                },
            },
        },
        legend: false,
    };

    var barConfig = {
        data: courseList,
        xField: "value",
        yField: "title",
        seriesField: "title",
        legend: false,
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="stMain">
            <Container>
                <div className="stBody">
                    <Row justify="center">
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className="stHeading">
                                Statewise Representation of Colleges
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className="stSubheading">
                                Click on a segment to get more info about the
                                colleges in that state
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className="stCard">
                                {stateList.length === 0 ? (
                                    <Spin size="large" />
                                ) : (
                                    <Pie
                                        {...pieConfig}
                                        onReady={(plot) => {
                                            plot.on(
                                                "element:click",
                                                (...args) => {
                                                    const res = { ...args };
                                                    setModalTitle(
                                                        res[0].data.data.title
                                                    );
                                                    setModalData(
                                                        res[0].data.data
                                                            .colleges
                                                    );
                                                    setShowModal(true);
                                                }
                                            );
                                        }}
                                    />
                                )}
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className="stHeading">Course Popularity</div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className="stSubheading">
                                Click on a bar to get more info about the
                                colleges offering the course
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className="stCard">
                                {courseList.length === 0 ? (
                                    <Spin size="large" />
                                ) : (
                                    <Bar
                                        {...barConfig}
                                        onReady={(plot) => {
                                            plot.on(
                                                "element:click",
                                                (...args) => {
                                                    const res = { ...args };
                                                    setModalTitle(
                                                        res[0].data.data.title
                                                    );
                                                    setModalData(
                                                        res[0].data.data
                                                            .colleges
                                                    );
                                                    setShowModal(true);
                                                }
                                            );
                                        }}
                                    />
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title={modalTitle}
                    visible={showModal}
                    onOk={closeModal}
                    onCancel={closeModal}
                    closable={false}
                    maskClosable={true}
                >
                    {modalData.map((clg, key) => {
                        return (
                            <div key={key} className="stClgList">
                                <div
                                    className="stClg"
                                    onClick={() => {
                                        props.history.push(
                                            `/institute/${clg._id}`
                                        );
                                    }}
                                >
                                    {clg.Name}
                                </div>
                            </div>
                        );
                    })}
                </Modal>
            </Container>
        </div>
    );
};

export default Statistics;
