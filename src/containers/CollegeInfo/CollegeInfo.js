import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { Col, Modal, Row, Spin, Table } from "antd";

import "./CollegeInfo.css";
import institute from "../../assets/institute.jpg";
import userLogo from "../../assets/userLogo.jpg";

const CollegeInfo = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const columns = [
        {
            title: "Enrollment Number",
            dataIndex: "eno",
            // width: 150,
        },
        {
            title: "Name",
            dataIndex: "name",
            // width: 150,
        },
        {
            title: "Batch",
            dataIndex: "batch",
        },
    ];

    const data = [];
    const data1 = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }

    const closeModal = () => {
        setShowModal(false);
    };

    const openModal = () => {
        setShowModal(true);
        setModalData({
            name: "Student Name",
            batch: 2022,
            skills: "Blah Blah Blah",
        });
    };

    return (
        <div className="ciMain">
            <Container>
                <div className="ciBody">
                    <Row justify="center">
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <div className="ciInfoBody">
                                <img
                                    src={institute}
                                    alt="institute"
                                    style={{ width: "100%" }}
                                />
                                <div className="ciInstiName">College Name</div>
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
                                        XXXX
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
                                        XXXX
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
                                        XXXX
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <div className="ciHeading">Student List</div>
                    <Table
                        columns={columns}
                        tableLayout="fixed"
                        dataSource={data}
                        pagination={{ pageSize: 10 }}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    openModal();
                                },
                            };
                        }}
                        style={{ cursor: "pointer" }}
                    />
                    <div className="ciHeading">Similar Colleges</div>
                    <Table
                        columns={columns}
                        tableLayout="fixed"
                        dataSource={data1}
                        pagination={{ pageSize: 10 }}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    console.log(record);
                                },
                            };
                        }}
                        style={{ cursor: "pointer" }}
                    />
                </div>
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
                                        {modalData.name}
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
                                        {modalData.batch}
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
                                        {modalData.skills}
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
