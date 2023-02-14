import { Container } from "@mui/material";
import SignupForm from "../components/form/SignupForm";

type Props = {};
const Signup = (props: Props) => {
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
      <SignupForm />
    </Container>
  );
};
export default Signup;
