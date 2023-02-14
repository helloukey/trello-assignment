import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import useGlobalContext from "../hooks/useGlobalContext";

const LoginForm = () => {
  const { dispatch } = useGlobalContext({});
  const [error, setError] = React.useState<string>("");
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    // Check if user is available
    if (username && password) {
      const result = localStorage.getItem(`${username}`);
      if (result) {
        const userData = JSON.parse(result);
        if (userData.password !== password) {
          setError("Invalid password.");
        } else {
          localStorage.setItem("trackier-current-user", `${username}`);
          setError("");
          dispatch({
            type: "SET_CURRENT_USER",
            payload: `${userData.username}`,
          });
        }
      } else {
        setError("No such user found.");
      }
    } else {
      setError("Username & Password are required.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginBottom: "20vh" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
