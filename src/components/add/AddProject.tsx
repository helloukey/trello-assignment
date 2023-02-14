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
import useGlobalContext from "../../hooks/useGlobalContext";

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

const AddProject = () => {
  const { currentUser, projects, dispatch } = useGlobalContext({});
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = React.useState<string>("");
  const [imageName, setImageName] = React.useState<string>("");
  const [imageURL, setImageURL] = React.useState<string | ArrayBuffer | null>(
    ""
  );
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const image = data.get("imagefile") as Blob;
    setError("");

    // Validation
    if (image.size > 100000) {
      setError("Image size should be less than 100kb.");
      return;
    }
    if (title.length < 3 || title.length > 15) {
      setError("Title should be between 3 to 15 characters long.");
      return;
    }
    if (description.length < 50 || description.length > 150) {
      setError("Description should be between 50 to 150 characters long.");
      return;
    }
    if (!currentUser) {
      setError("You are not authorized to perform this task.");
      return;
    }
    if (!imageURL) {
      setError("Image file not loaded.");
      return;
    }

    // Form structure
    const formData = {
      id: new Date().getTime(),
      username: currentUser,
      project: title,
      description: description,
      image: imageURL,
    };

    if (!error.length && currentUser && imageURL) {
      if (projects) {
        const data = JSON.parse(projects);
        const newData = [...data, formData];
        localStorage.setItem(
          "trackier-current-projects",
          JSON.stringify(newData)
        );
        const dispatchData = localStorage.getItem("trackier-current-projects");
        if (dispatchData)
          dispatch({ type: "SET_PROJECTS", payload: dispatchData });
        handleClose();
      } else {
        const newData = [formData];
        localStorage.setItem(
          "trackier-current-projects",
          JSON.stringify(newData)
        );
        const dispatchData = localStorage.getItem("trackier-current-projects");
        if (dispatchData)
          dispatch({ type: "SET_PROJECTS", payload: dispatchData });
        handleClose();
      }
    }
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.files;
    if (name && name[0]) {
      setImageName(name[0].name);
    } else {
      setImageName("");
    }

    // Image URL
    const reader = new FileReader();
    if (name && name[0]) {
      reader.readAsDataURL(name[0]);
      reader.addEventListener("load", () => {
        setImageURL(reader.result);
        setImageLoaded(true);
      });
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
                Add Project
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
                <div style={{ marginTop: "8px" }}>
                  <label
                    htmlFor="imagefile"
                    style={{
                      width: "100%",
                      height: "auto",
                      border: "1px solid #333",
                      padding: "8px 16px",
                      cursor: "pointer",
                      color: "#CCC",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {imageName && imageURL ? `${imageName}` : "Add Image"}
                    <input
                      type="file"
                      name="imagefile"
                      accept="image/*"
                      hidden
                      id="imagefile"
                      onChange={handleImage}
                    />
                  </label>
                </div>
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
                  disabled={!imageLoaded}
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

export default AddProject;
