import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { Col, Modal, Row, Spin, Table } from "antd";
import axios from "axios";

import "./CollegeInfo.css";
import institute from "../../assets/institute.jpg";
import userLogo from "../../assets/userLogo.jpg";
import config from "../../config";

const CollegeInfo = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [clgInfo, setClgInfo] = useState({});
    const [stuList, setStuList] = useState([]);
    const [similarClg, setSimilarClg] = useState([]);

    const path = window.location.pathname.split("/");
    const clgId = path[path.length - 1];

    useEffect(() => {
        setClgInfo({});
        setStuList([]);
        setSimilarClg([]);
        const baseUrlInfo = `${config.baseUrl}fetchCollegeDetails/byID`;
        const baseUrlStu = `${config.baseUrl}fetchCollegeDetails/students`;
        const baseUrlClg = `${config.baseUrl}fetchSimilarColleges`;

        const reqBody = {
            id: clgId,
        };
        axios
            .post(baseUrlInfo, reqBody)
            .then((res) => {
                setClgInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .post(baseUrlStu, reqBody)
            .then((res) => {
                // console.log(res.data);
                const resData = res.data;
                var stuData = [];
                var i;
                for (i = 1; i <= resData.length; i++) {
                    stuData.push({ ...resData[i - 1], eno: i, key: i });
                }
                setStuList(stuData);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .post(baseUrlClg, reqBody)
            .then((res) => {
                const resData = res.data;
                var clgData = [];
                var i;
                for (i = 1; i <= resData.length; i++) {
                    clgData.push({ ...resData[i - 1], key: i });
                }
                setSimilarClg(clgData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [setClgInfo, clgId, setStuList, setSimilarClg]);

    const columns = [
        {
            title: "Enrollment Number",
            dataIndex: "eno",
        },
        {
            title: "Name",
            dataIndex: "Name",
        },
        {
            title: "Batch",
            dataIndex: "Year_of_batch",
        },
    ];

    const columnsClg = [
        {
            title: "Name",
            dataIndex: "Name",
        },
        {
            title: "City",
            dataIndex: "City",
        },
        {
            title: "State",
            dataIndex: "State",
        },
        {
            title: "Student Count",
            dataIndex: "No_of_Students",
        },
    ];

    const closeModal = () => {
        setShowModal(false);
        setModalData({});
    };

    const openModal = () => {
        setShowModal(true);
    };

    console.log(clgInfo, stuList, similarClg);

    return (
        <div className="ciMain">
            <Container>
                {Object.keys(clgInfo).length === 0 ? (
                    <div className="clSpin">
                        <Spin size="large" />
                    </div>
                ) : (
                    <div className="ciBody">
                        <Row justify="center">
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <div className="ciInfoBody">
                                    <img
                                        src={institute}
                                        alt="institute"
                                        style={{ width: "100%" }}
                                    />
                                    <div className="ciInstiName">
                                        {clgInfo.Name}
                                    </div>
                                    <Row align="middle">
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            Founded In:
                                        </Col>
                                        <Col
                                            xs={16}
                                            sm={16}
                                            md={16}
                                            lg={16}
                                            xl={16}
                                        >
                                            {clgInfo.Year_founded}
                                        </Col>
                                    </Row>
                                    <Row align="middle">
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            Location:
                                        </Col>
                                        <Col
                                            xs={16}
                                            sm={16}
                                            md={16}
                                            lg={16}
                                            xl={16}
                                        >
                                            {clgInfo.City}, {clgInfo.State},{" "}
                                            {clgInfo.Country}
                                        </Col>
                                    </Row>
                                    <Row align="middle">
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            Courses offered:
                                        </Col>
                                        <Col
                                            xs={16}
                                            sm={16}
                                            md={16}
                                            lg={16}
                                            xl={16}
                                        >
                                            {clgInfo.Courses.join(", ")}
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <div className="ciHeading">Student List</div>
                        <Table
                            columns={columns}
                            tableLayout="fixed"
                            dataSource={stuList}
                            pagination={{ pageSize: 10 }}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: (event) => {
                                        setModalData(record);
                                        openModal();
                                    },
                                };
                            }}
                            style={{ cursor: "pointer" }}
                        />
                        <div className="ciHeading">Similar Colleges</div>
                        <Table
                            columns={columnsClg}
                            tableLayout="fixed"
                            dataSource={similarClg}
                            pagination={{ pageSize: 10 }}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: (event) => {
                                        // console.log(record);
                                        props.history.push(
                                            `/institute/${record._id}`
                                        );
                                    },
                                };
                            }}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                )}
                <Modal
                    title="Student Details"
                    visible={showModal}
                    onOk={closeModal}
                    onCancel={closeModal}
                    closable={false}
                    maskClosable={true}
                >
                    <div className="ciModal">
                        {Object.keys(modalData).length === 0 ? (
                            <Spin size="large" />
                        ) : (
                            <div className="ciModal">
                                <Row justify="center">
                                    <Col
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        xl={12}
                                    >
                                        <img
                                            src={userLogo}
                                            alt="logo"
                                            className="ciUserLogo"
                                        />
                                    </Col>
                                </Row>
                                <Row align="middle">
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        Name:
                                    </Col>
                                    <Col
                                        xs={16}
                                        sm={16}
                                        md={16}
                                        lg={16}
                                        xl={16}
                                    >
                                        {modalData.Name}
                                    </Col>
                                </Row>
                                <Row align="middle">
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        Batch:
                                    </Col>
                                    <Col
                                        xs={16}
                                        sm={16}
                                        md={16}
                                        lg={16}
                                        xl={16}
                                    >
                                        {modalData.Year_of_batch}
                                    </Col>
                                </Row>
                                <Row align="middle">
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        Skills:
                                    </Col>
                                    <Col
                                        xs={16}
                                        sm={16}
                                        md={16}
                                        lg={16}
                                        xl={16}
                                    >
                                        {modalData.Skills.join(", ")}
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </div>
                </Modal>
            </Container>
        </div>
    );
};

export default CollegeInfo;
