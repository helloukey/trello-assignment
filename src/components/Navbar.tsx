import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import useGlobalContext from "../hooks/useGlobalContext";

const Navbar = () => {
  const { currentUser, dispatch } = useGlobalContext({});
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = localStorage.getItem("trackier-current-user");
    if (user) {
      dispatch({ type: "SET_CURRENT_USER", payload: user });
    } else {
      dispatch({ type: "SET_CURRENT_USER", payload: null });
    }
  }, [currentUser, dispatch]);

  const handleClick = () => {
    if (currentUser) {
      localStorage.removeItem("trackier-current-user");
      dispatch({ type: "SET_CURRENT_USER", payload: null });
    } else {
      navigate("/login");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{ textDecoration: "none" }} to="/">
              Trackier Assignment
            </Link>
          </Typography>
          <Button onClick={handleClick} color="inherit">
            {currentUser ? "LOGOUT" : "LOGIN"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
