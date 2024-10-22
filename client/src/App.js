import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Signin from "./pages/login";
import MyProjects from "./pages/myProjects";
import SavedProj from "./pages/SavedProj";
import ProjectForm from "./pages/newProjects";
import NewProjects from "./pages/newProjects";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Editproj from "./pages/Editproj"
import Landing from "./pages/Landing";
import Details from "./pages/Details";
export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/" element={<Landing />} />

          {/* Protected routes, only accessible when logged in */}
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/my-projects"
            element={
              <ProtectedRoutes>
                <MyProjects />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/new-project"
            element={
              <ProtectedRoutes>
                <ProjectForm />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/save"
            element={
              <ProtectedRoutes>
                <SavedProj />
              </ProtectedRoutes>
            }
          />
            <Route
            path="/edit-project"
            element={
              <ProtectedRoutes>
                <Editproj />
              </ProtectedRoutes>
            }
          />
            <Route
            path="/details/:id"
            element={
              <ProtectedRoutes>
                <Details />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
