import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import QuestionPage from "./pages/QuestionPage.js";
import ResultPage from "./pages/ResultPage.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<QuestionPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
