import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import QuestionPage from "./pages/QuestionPage.js";
import ResultPage from "./pages/ResultPage.js";

function App() {
  const [finalResult, setFinalResult] = useState("");

  const handleResultChange = (result) => {
    // 부모 컴포넌트에서 결과 값을 받아 처리
    setFinalResult(result);
  };

  return (
    <div className="App">
      {/* <Router basename={process.env.PUBLIC_URL}> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/questions"
            element={<QuestionPage onResultChange={handleResultChange} />}
          />
          <Route
            path="/result"
            element={<ResultPage finalResult={finalResult} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
