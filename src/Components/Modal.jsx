import React from "react";
import ReactModal from "react-bootstrap/Modal";
import styled from "styled-components";

// import { useHistory } from "react-router-dom";
const CustomModal = styled(ReactModal)`
    height: 650px;
`;
function Modal(props) {
    // const history = useHistory();
    function onFormSubmit(e) {
        e.preventDefault();
        // const url = process.env.REACT_APP_API_URL + "/api/comment";

        const request = async (id = 100) => {

            //   if (postComment.status === 200) {
            //     console.log("Added user");
            //     history.push();
            //     props.setShow({
            //       ...props.show,
            //       status: false,
            //       id: null
            //     });
            //   }

            request();
            e.target.reset();
        }
    }

    return (
        <CustomModal
            id={props.index}
            show={props.show}
            onHide={props.onHide}
            animation={false}
            style={{ opacity: 50 }}
        >
            <form onSubmit={onFormSubmit}>
                <ReactModal.Header closeButton>{props.title}</ReactModal.Header>
                <ReactModal.Body>{props.body}</ReactModal.Body>
                {props.footer &&
                    <ReactModal.Footer closeButton>
                        {/* <Button
                    name="button"
                    type="submit"
                    btnStyle="signup-btn"
                    label={props.label}
                /> */}
                    </ReactModal.Footer>
                }

            </form>
        </CustomModal>
    );
}
export default Modal;
