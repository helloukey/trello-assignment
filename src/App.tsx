import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Project from "./pages/Project";
import useGlobalContext from "./hooks/useGlobalContext";

const App = () => {
  const { currentUser } = useGlobalContext({});

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            currentUser ? <Home /> : <Navigate to="/login" replace={true} />
          }
        />
        {/* Signup */}
        <Route
          path="/signup"
          element={
            !currentUser ? <Signup /> : <Navigate to="/" replace={true} />
          }
        />
        {/* Login */}
        <Route
          path="/login"
          element={
            !currentUser ? <Login /> : <Navigate to="/" replace={true} />
          }
        />
        {/* Project */}
        <Route
          path="/project/:id"
          element={
            currentUser ? <Project /> : <Navigate to="/login" replace={true} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
