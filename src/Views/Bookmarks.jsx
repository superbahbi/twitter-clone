import React, { useContext, useState, useRef, useEffect } from "react";
import { authContext } from "../Contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import Navbar from ".././Components/Navbar";
import Header from ".././Components/Header";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Bookmarks() {
    const { auth } = useContext(authContext);
    const user = auth.data.user;
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-device-width: 1224px)"
    });
    useEffect(() => {
    }, []);
    return (
        <Container>
            <Row>
                {isDesktopOrLaptop && (
                    <Col md={3}>
                        <Navbar
                            username={auth && auth.data.user.username}
                            avatar={auth && auth.data.user.profile.avatar.filename}
                        />
                    </Col>
                )}
                <Col md={6}>
                    <Header name="Bookmarks" />

                </Col>
            </Row>
        </Container>
    );
}
export default Bookmarks;
