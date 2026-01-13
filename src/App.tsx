import { Routes, Route } from "react-router";
import Home from "@/pages/home";
import Articles from "@/pages/articles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />} />
    </Routes>
  );
}

export default App;
