import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { Col, Modal, Row, Spin } from "antd";
import { Pie, Bar } from "@ant-design/charts";

import "./Statistics.css";

const Statistics = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [modalTitle, setModalTitle] = useState("")

    var pieData = [
        {
            type: "分类一",
            value: 27,
        },
        {
            type: "分类二",
            value: 25,
        },
        {
            type: "分类三",
            value: 18,
        },
        {
            type: "分类四",
            value: 15,
        },
        {
            type: "分类五",
            value: 10,
        },
        {
            type: "其他",
            value: 5,
        },
    ];
    var pieConfig = {
        appendPadding: 10,
        data: pieData,
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

    var barData = [
        {
            year: "1951 年",
            value: 38,
        },
        {
            year: "1952 年",
            value: 52,
        },
        {
            year: "1956 年",
            value: 61,
        },
        {
            year: "1957 年",
            value: 145,
        },
        {
            year: "1958 年",
            value: 48,
        },
    ];
    var barConfig = {
        data: barData,
        xField: "value",
        yField: "year",
        seriesField: "year",
        legend: false,
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openModal = () => {
        setShowModal(true);
        setModalData([]);
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
                                <Pie
                                    {...pieConfig}
                                    onReady={(plot) => {
                                        plot.on("element:click", (...args) => {
                                            const res = { ...args };
                                            console.log(res[0].data.data);
                                            setShowModal(true);
                                        });
                                    }}
                                />
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
                                <Bar
                                    {...barConfig}
                                    onReady={(plot) => {
                                        plot.on("element:click", (...args) => {
                                            const res = { ...args };
                                            console.log(res[0].data.data);
                                            setShowModal(true);
                                        });
                                    }}
                                />
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
                    <Spin size="large" />
                </Modal>
            </Container>
        </div>
    );
};

export default Statistics;
