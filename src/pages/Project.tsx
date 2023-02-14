import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalContext from "../hooks/useGlobalContext";
import { Box } from "@mui/system";
import TaskList from "../components/list/TaskList";
import AddTask from "../components/add/AddTask";
import Button from "@mui/material/Button";

type ProjectType = {
  id: number;
  project: string;
  description: string;
  username: string;
  image: string;
};

type Props = {};
const Project = (props: Props) => {
  const { projects } = useGlobalContext({});
  const { id } = useParams();
  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    if (projects) {
      setData(JSON.parse(projects));
    }
  }, [projects]);

  return (
    <Container
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {data &&
        data
          .filter((project: ProjectType) => project.id === Number(id))
          .map((project: ProjectType) => (
            <div
              key={project.id}
              style={{
                marginTop: "100px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              {/* Back Button */}
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="outlined">{"<<"} Go Back</Button>
              </Link>
              
              <Box sx={{ marginTop: "8px" }}>
                <Typography
                  variant="h2"
                  sx={{ fontSize: "36px", fontWeight: 500 }}
                >
                  {project.project}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontSize: "20px", fontWeight: 100 }}
                >
                  {project.description}
                </Typography>
              </Box>
            </div>
          ))}

      {/* AddTask */}
      <AddTask />
      {/* Task List */}
      <TaskList />
    </Container>
  );
};
export default Project;
