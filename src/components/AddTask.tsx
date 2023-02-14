import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import useGlobalContext from "../hooks/useGlobalContext";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "444px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const buttonStyles = {
  position: "fixed",
  bottom: "5%",
  right: "5%",
  zIndex: "1000",
};

const AddTask = () => {
  const { currentUser, tasks, dispatch } = useGlobalContext({});
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = React.useState<string>("");
  const { id: projectId } = useParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const assignedUsers = data.get("assignedusers") as string;
    const dueDate = data.get("date") as string;
    setError("");

    // Validation
    if (title.length < 3 || title.length > 15) {
      setError("Title should be between 3 to 15 characters long.");
      return;
    }
    if (description.length < 50 || description.length > 150) {
      setError("Description should be between 50 to 150 characters long.");
      return;
    }
    if (assignedUsers.length < 3) {
        setError("Assigning Users must be more than 3 characters long.");
        return; 
    }
    if (!dueDate.length) {
        setError("Date is required.");
        return;
    }
    if (!/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(dueDate)) {
      setError("Invalid Date Format.");
      return;
    }
    if (!currentUser) {
      setError("You are not authorized to perform this task.");
      return;
    }

    // Form structure
    const formData = {
      id: new Date().getTime(),
      projectId: Number(projectId),
      username: currentUser,
      task: title,
      description: description,
      assignedUsers: assignedUsers,
      dueDate: dueDate
    };

    if (!error.length && currentUser) {
      if (tasks) {
        const data = JSON.parse(tasks);
        const newData = [...data, formData];
        localStorage.setItem(
          "trackier-current-tasks",
          JSON.stringify(newData)
        );
        const dispatchData = localStorage.getItem("trackier-current-tasks");
        if (dispatchData)
          dispatch({ type: "SET_TASKS", payload: dispatchData });
        handleClose();
      } else {
        const newData = [formData];
        localStorage.setItem(
          "trackier-current-tasks",
          JSON.stringify(newData)
        );
        const dispatchData = localStorage.getItem("trackier-current-tasks");
        if (dispatchData)
          dispatch({ type: "SET_TASKS", payload: dispatchData });
        handleClose();
      }
    }
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={buttonStyles}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <AddCardOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add Task
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  rows={3}
                  name="description"
                  label="Description"
                  id="description"
                  autoComplete="description"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="assignedusers"
                  label="Assign Users"
                  id="assignedusers"
                  autoComplete="assignedusers"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="date"
                  label="Due Date in DD/MM/YYYY"
                  id="date"
                  autoComplete="date"
                />
              
                {/* Error */}
                {error && (
                  <Alert sx={{ marginTop: "8px" }} severity="error">
                    {error}
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTask;
