import React, { useContext, useEffect } from "react";
import { authContext } from "../Contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import Navbar from ".././Components/Navbar";
import Header from ".././Components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Explorer() {
    const controller = new AbortController();
    // const signal = controller.signal;
    const { auth } = useContext(authContext);
    // const user = auth.data.user;
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-device-width: 1224px)"
    });
    useEffect(() => {
        const request = async () => {
            // const response = await fetchDB(
            //     `/user/${auth.data.user.username}`,
            //     null,
            //     signal
            // );
            // setUser(response.data);
        };
        request();
        return function () {
            console.log("Explorer data unmounting...");
            controller.abort();
        };
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
                    <Header name="Explorer" />

                </Col>
            </Row>
        </Container>
    );
}
export default Explorer;
