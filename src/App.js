import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import QuestionPage from "./pages/QuestionPage.js";
import ResultPage from "./pages/ResultPage.js";

function App() {
  const [finalResult, setFinalResult] = useState("");
  const [screenHeight, setScreenHeight] = useState(0);

  // 화면 크기 설정 함수
  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  // 컴포넌트가 마운트될 때 화면 크기 설정
  useEffect(() => {
    setScreenSize();

    // 리사이즈 이벤트에 대응하여 동적으로 크기 설정
    const handleResize = () => {
      setScreenSize();
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResultChange = (result) => {
    setFinalResult(result);
  };

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
