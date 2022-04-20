import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";


const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  export interface Popup {
    open: boolean;
    handleOpen:() => void;
    handleClose:()=>void;
  }

const PopupAlert:FunctionComponent<Popup> = ({open,handleOpen,handleClose}) => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={handleOpen}>Something went wrong!!</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Authorization
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <span>You need to login. Your token is expired already.</span>
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              Go to Login page
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default PopupAlert;
