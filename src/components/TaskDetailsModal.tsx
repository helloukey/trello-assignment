import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import useGlobalContext from "../hooks/useGlobalContext";

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

type Props = {
  deleteId: number;
  title: string;
  description: string;
  assignedUsers: string;
  dueDate: string;
};

type Data = {
  id: number;
  projectId: number;
  username: string;
  task: string;
  description: string;
  assignedUsers: string;
  dueDate: string;
};

const TaskDetailsModal = ({
  deleteId,
  title,
  description,
  assignedUsers,
  dueDate,
}: Props) => {
  const { tasks, dispatch } = useGlobalContext({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    const id = target.dataset.id;
    const data = JSON.parse(tasks as string);

    // filter data
    const newData = data?.filter((item: Data) => item.id !== Number(id));
    localStorage.setItem("trackier-current-tasks", JSON.stringify(newData));
    dispatch({ type: "SET_TASKS", payload: JSON.stringify(newData) });
  };

  return (
    <>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<DeleteIcon />}
          sx={{ margin: "10px" }}
          onClick={handleDelete}
          data-id={deleteId}
        >
          Delete
        </Button>
        <Button onClick={handleOpen}>View Task</Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title: {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 4 }}>
            Description: {description}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 4 }}>
            Assigned Users: {assignedUsers}
          </Typography>
          <Typography id="modal-modal-description">
            Due date: {dueDate}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export default TaskDetailsModal;
