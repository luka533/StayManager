import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDeleteBooking } from "../booking/useDeleteBooking";
import { useUpdateBooking } from "../booking/useUpdateBooking";

const ITEM_HEIGHT = 48;

type LongMenuProps = {
  status: "checked-in" | "checked-out" | "unconfirmed";
  id: number;
};

export default function LongMenu({ status, id }: LongMenuProps) {
  const options = ["See Details", "Delete"];

  // if checked-in or unconfirmed make extra field (checkout or checkin)
  if (status === "checked-in") options.push("Checkout");
  if (status === "unconfirmed") options.push("Checkin");

  const navigate = useNavigate();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { updateBooking, isUpdating } = useUpdateBooking();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleAction(option: string) {
    if (option === "See Details") navigate(`/bookings/${id}`);
    if (option === "Checkout" || option === "Checkin")
      updateBooking({
        bookingId: id,
        newData: {
          status: status === "checked-in" ? "checked-out" : "checked-in",
        },
      });
    if (option === "Delete") deleteBooking(id);
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
          list: {
            "aria-labelledby": "long-button",
          },
        }}
      >
        {options.map((option) => {
          return (
            <MenuItem
              key={option}
              onClick={() => {
                handleAction(option);
                handleClose();
              }}
              disabled={isDeleting || isUpdating}
            >
              {option}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
