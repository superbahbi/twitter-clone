import React from "react";
import ReactModal from "react-bootstrap/Modal";
import styled from "styled-components";
import { Close } from "../Assets/Icon";
import IconButton from "./IconButton";
const CustomModal = styled(ReactModal)``;
const CustomModalBody = styled(ReactModal.Body)`
  max-height: 500px;
  overflow: hidden;
  overflow-y: scroll;
`;
function Modal(props) {
  function onFormSubmit(e) {
    e.preventDefault();
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
        <ReactModal.Header>
          <IconButton
            type="button"
            iconComponent={<Close />}
            color="#0f1419"
            hoverColor="#0f1419"
            handleClick={props.onHandleModal}
          />
        </ReactModal.Header>
        <CustomModalBody>{props.body}</CustomModalBody>
        {props.footer && (
          <ReactModal.Footer closeButton>
            {/* <Button
              name="button"
              type="submit"
              btnStyle="signup-btn"
              label={props.label}
            /> */}
          </ReactModal.Footer>
        )}
      </form>
    </CustomModal>
  );
}
export default Modal;
