import { createContext, useReducer, Dispatch, useEffect } from "react";

type State = {
  currentUser: string | null;
  projects: string | null;
  projectCurrentPage: number;
  tasks: string | null;
};

type ACTIONTYPE =
  | { type: "SET_CURRENT_USER"; payload: string | null }
  | { type: "SET_PROJECTS"; payload: string | null }
  | { type: "SET_PROJECT_CURRENT_PAGE"; payload: number }
  | { type: "SET_TASKS"; payload: string | null };

type Context = {
  currentUser: null | string;
  projects: null | string;
  projectCurrentPage: number;
  tasks: null | string;
  dispatch: Dispatch<ACTIONTYPE>;
};

export const GlobalContext = createContext<Context | null>(null);

const globalReducer = (state: State, action: ACTIONTYPE) => {
  switch (action.type) {
    case "SET_CURRENT_USER": {
      return { ...state, currentUser: action.payload };
    }
    case "SET_PROJECTS": {
      return { ...state, projects: action.payload };
    }
    case "SET_PROJECT_CURRENT_PAGE": {
      return { ...state, projectCurrentPage: action.payload };
    }
    case "SET_TASKS": {
      return { ...state, tasks: action.payload };
    }
    default: {
      return state;
    }
  }
};

const GlobalContextProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    currentUser: null,
    projects: null,
    projectCurrentPage: 1,
    tasks: null,
  });

  useEffect(() => {
    const projects = localStorage.getItem("trackier-current-projects");
    const user = localStorage.getItem("trackier-current-user");
    const tasks = localStorage.getItem("trackier-current-tasks");
    if (projects) {
      dispatch({ type: "SET_PROJECTS", payload: projects });
    }
    if (tasks) {
      dispatch({ type: "SET_TASKS", payload: tasks });
    }
    if (user) {
      dispatch({ type: "SET_CURRENT_USER", payload: user });
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
