import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useGlobalContext from "../hooks/useGlobalContext";

type Project = {
  id: number;
  username: string;
  project: string;
  description: string;
  image: string;
};

const PaginationComp = () => {
  const { projects, dispatch, currentUser } = useGlobalContext({});
  let data: any;
  if (projects) {
    data = JSON.parse(projects).filter(
      (project: Project) => project.username === currentUser
    );
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch({ type: "SET_PROJECT_CURRENT_PAGE", payload: value });
  };

  return (
    <>
      {data && data.length ? (
        <Stack spacing={2} sx={{ marginBottom: "200px", marginTop: "50px" }}>
          <Pagination
            variant="outlined"
            count={data ? Math.ceil(data.length / 6) : undefined}
            sx={{ marginLeft: "auto", marginRight: "auto" }}
            onChange={handlePageChange}
          />
        </Stack>
      ) : null}
    </>
  );
};

export default PaginationComp;
