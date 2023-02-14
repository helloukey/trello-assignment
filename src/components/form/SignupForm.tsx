import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import useGlobalContext from "../../hooks/useGlobalContext";

// Regex
const usernameRegex = /^[a-z0-9_-]{3,15}$/;
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const SignupForm = () => {
  const { dispatch } = useGlobalContext({});
  const [isUsername, setIsUsername] = React.useState<boolean>(true);
  const [isEmail, setIsEmail] = React.useState<boolean>(true);
  const [isPassword, setIsPassword] = React.useState<boolean>(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    // Signup if data is valid, else return
    if (username && isUsername && email && isEmail && password && isPassword) {
      localStorage.setItem(username,
        JSON.stringify({ username, email, password })
      );
      localStorage.setItem("trackier-current-user", username);
      dispatch({type: "SET_CURRENT_USER", payload: username});
    } else {
      return;
    }
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");

    // Username validation
    if (username) {
      if (usernameRegex.test(`${username}`)) {
        setIsUsername(true);
      } else {
        setIsUsername(false);
      }
    } else {
      setIsUsername(true);
    }

    // Email validation
    if (email) {
      if (emailRegex.test(`${email}`)) {
        setIsEmail(true);
      } else {
        setIsEmail(false);
      }
    } else {
      setIsEmail(true);
    }

    // Password validation
    if (password) {
      if (passwordRegex.test(`${password}`)) {
        setIsPassword(true);
      } else {
        setIsPassword(false);
      }
    } else {
      setIsPassword(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginBottom: "20vh" }}>
      <CssBaseline />
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
          Signup
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          onChange={handleChange}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                error={!isUsername}
                helperText={
                  !isUsername &&
                  "Username must be between 3 to 15 characters long."
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!isEmail}
                helperText={!isEmail && "Invalid Email Address."}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!isPassword}
                helperText={
                  !isPassword &&
                  "Password must be of minimum 8 characters with at least one uppercase, one lowercase, one number, and one special character."
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Link to="/login">Already have an account? Login</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupForm;
