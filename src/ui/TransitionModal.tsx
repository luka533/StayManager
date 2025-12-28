import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "2%",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({
  children,
  handleCloseMenuItem,
  setAddApartment,
}: {
  children: React.ReactNode;
  handleCloseMenuItem?: () => void;
  setAddApartment?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="Edit Apartment"
        aria-describedby="Edit your already created Apartment"
        open={open}
        onClose={() => {
          handleClose();
          handleCloseMenuItem?.();
          setAddApartment?.(false);
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
