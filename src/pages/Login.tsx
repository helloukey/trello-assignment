import { Container } from "@mui/material";
import LoginForm from "../components/form/LoginForm";

type Props = {};
const Login = (props: Props) => {
  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm />
    </Container>
  );
};
export default Login;
