import React, { useContext } from "react";
import ReactModal from "react-bootstrap/Modal";
import styled, { ThemeContext } from "styled-components";
import { Close } from "../Assets/Icon";
import { IModalProps } from "../Helper/interface";
import IconButton from "./IconButton";
const CustomModal = styled(ReactModal)``;
const CustomModalBody = styled(ReactModal.Body)`
  max-height: 500px;
  overflow: hidden;
  overflow-y: scroll;
`;

const Modal: React.FC<IModalProps> = ({
  index,
  show,
  onHide,
  onFormSubmit,
  onHandleModal,
  body,
  footer,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <CustomModal
      id={index}
      show={show}
      onHide={onHide}
      animation={false}
      style={{ opacity: 50 }}
    >
      <form onSubmit={onFormSubmit}>
        <ReactModal.Header>
          <IconButton
            type="button"
            iconComponent={<Close />}
            color={theme.color.text}
            hoverColor={theme.color.text}
            handleClick={onHandleModal}
          />
        </ReactModal.Header>
        <CustomModalBody>{body}</CustomModalBody>
        {footer && (
          <ReactModal.Footer>
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
};
export default Modal;
