import { useState } from "react";

import { useDeleteApartment } from "./useDeleteApartment.ts";
import { useDuplicateApartment } from "./useDuplicateApartment.ts";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import EditApartment from "./EditApartment.js";
import TransitionsModal from "../../ui/TransitionModal.js";
import SpinnerMini from "../../ui/SpinnerMini.js";

export default function LongMenu({ id }: { id: number }) {
  const { deleteApartment, isDeleting } = useDeleteApartment();
  const { duplicateApartment, isDuplicating } = useDuplicateApartment();

  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  if (isDeleting || isDuplicating) return <SpinnerMini />;

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    setOpenEditModal(false);
  };

  const handleAction = (option: string) => {
    if (option === "Edit") setOpenEditModal(true);
    if (option === "Duplicate") duplicateApartment(id);
    if (option === "Delete") deleteApartment(id);
    if (option !== "Edit") handleClose();
  };

  return (
    <>
      <IconButton
        sx={{
          height: "40px",
          width: "40px",
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {["Edit", "Duplicate", "Delete"].map((option) => (
          <MenuItem
            sx={{ padding: "10px 30px" }}
            key={option}
            onClick={() => handleAction(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>

      {openEditModal && (
        <TransitionsModal handleCloseMenuItem={handleClose}>
          <EditApartment handleClose={handleClose} id={id} />
        </TransitionsModal>
      )}
    </>
  );
}
