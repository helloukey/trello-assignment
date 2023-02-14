import Container from "@mui/material/Container";
import AddProject from "../components/add/AddProject";
import ProjectList from "../components/list/ProjectList";
import PaginationComp from "../components/Pagination";

type Props = {};
const Home = (props: Props) => {
  return (
    <Container
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <AddProject />
      <ProjectList />
      <PaginationComp />
    </Container>
  );
};
export default Home;
