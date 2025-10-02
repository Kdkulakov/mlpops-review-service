import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MLOpsAssessment from "./pages/MLOpsAssessment";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MLOpsAssessment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
