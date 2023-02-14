import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import useGlobalContext from "../../hooks/useGlobalContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TaskDetailsModal from "../TaskDetailsModal";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type Data = {
  id: number;
  projectId: number;
  username: string;
  task: string;
  description: string;
  assignedUsers: string;
  dueDate: string;
};

type Props = {};
const TaskList = (props: Props) => {
  const { currentUser, tasks } = useGlobalContext({});
  const [data, setData] = useState<[] | Data[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (tasks) {
      setData(JSON.parse(tasks));
    }
  }, [tasks]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const [reorderedItem] = data?.splice(result.source.index, 1);
    data?.splice(result.destination.index, 0, reorderedItem);

    setData(data);
    localStorage.setItem("trackier-current-tasks", JSON.stringify(data));
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        paddingTop: "50px",
      }}
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks">
          {(provided: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                paddingTop: "50px",
              }}
            >
              {data &&
                data
                  .filter(
                    (task) =>
                      task.username === currentUser &&
                      task.projectId === Number(id)
                  )
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={`${task.id}`}
                      index={index}
                    >
                      {(provided: any) => (
                        <Card
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{ maxWidth: 345, maxHeight: 400 }}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {task.task}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {task.description}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              fontWeight={800}
                            >
                              {task.assignedUsers}
                            </Typography>
                            <TaskDetailsModal
                              deleteId={task.id}
                              title={task.task}
                              description={task.description}
                              assignedUsers={task.assignedUsers}
                              dueDate={task.dueDate}
                            />
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};
export default TaskList;
