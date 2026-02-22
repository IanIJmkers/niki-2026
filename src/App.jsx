import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import NoiseOverlay from "./components/NoiseOverlay";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <Router>
      <CustomCursor />
      <NoiseOverlay />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/project/:slug"
          element={
            <SmoothScroll>
              <ProjectPage />
            </SmoothScroll>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
