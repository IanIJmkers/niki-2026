import { Analytics } from "@vercel/analytics/react";
import CustomCursor from "./components/CustomCursor";
import NoiseOverlay from "./components/NoiseOverlay";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Analytics />
      <CustomCursor />
      <NoiseOverlay />
      <HomePage />
    </>
  );
}

export default App;
