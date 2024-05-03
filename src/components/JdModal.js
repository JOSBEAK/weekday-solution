import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

export default function JdModal({ jobDescription, open, handleClose }) {
  const handleCloseModal = () => {
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <b>About Company</b>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A veniam
            quod mollitia dolor voluptate aperiam libero minima delectus et
          </p>
          <b>About us</b>

          <p>{jobDescription}</p>
        </Box>
      </Modal>
    </div>
  );
}
