import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

type Data = {
  id: number;
  username: string;
  project: string;
  description: string;
  image: string;
};

type Props = {};
const ProjectList = (props: Props) => {
  const { currentUser, projects, projectCurrentPage, dispatch } =
    useGlobalContext({});
  const [data, setData] = useState<null | Data[]>(null);
  useEffect(() => {
    if (projects) {
      setData(JSON.parse(projects));
    }
  }, [projects, currentUser]);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    const id = target.dataset.id;

    // filter data
    const newData = data?.filter((item) => item.id !== Number(id));
    localStorage.setItem("trackier-current-projects", JSON.stringify(newData));
    dispatch({ type: "SET_PROJECTS", payload: JSON.stringify(newData) });
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        paddingTop: "100px",
      }}
    >
      {data &&
        data
          .filter((project) => project.username === currentUser)
          .slice((projectCurrentPage - 1) * 6, projectCurrentPage * 6)
          .map((project) => (
            <Card
              sx={{ maxWidth: 345, maxHeight: 400, height: "fit-content" }}
              key={project.id}
            >
              <Link to={`/project/${project.id}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={project.image}
                    alt="green iguana"
                    sx={{ objectFit: "cover", aspectRatio: "16/9" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {project.project}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DeleteIcon />}
                  sx={{ margin: "10px" }}
                  onClick={handleDelete}
                  data-id={project.id}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
    </Container>
  );
};
export default ProjectList;
