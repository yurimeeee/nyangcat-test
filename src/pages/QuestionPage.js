import React, { useState } from "react";
import { QnaList } from "../data/QnaList";

const QuestionPage = () => {
  const [qidx, setqidx] = useState(0);
  const [next, setNext] = useState(0);
  const qAmt = QnaList.length;
  const [score, setScore] = useState(0);

  // 각 차원의 카운트를 담을 객체 초기화
  const counts = { e: 0, i: 0, n: 0, s: 0, f: 0, t: 0, p: 0, j: 0 };

  console.log(qAmt);
  //테스트 과정
  const goNext = (qidx) => {
    if (qidx === qAmt) {
      // goResult();
    } else {
      setqidx(next);
      setNext(qidx + 1);
    }
  };

  const addAnswer = (scorePoint) => {
    setScore(score + scorePoint);
    goNext(qidx + 1);
  };

  // const goResult = () => {
  //   if (score > 10) {
  //     setFScore(resultImg3);
  //   } else if (score > 5) {
  //     setFScore(resultImg2);
  //   } else {
  //     setFScore(resultImg1);
  //   }
  //   setStarted(false);
  //   setTesting(false);
  //   setResult(true);
  // };

  // 응답 순회하면서 각 차원의 카운트 증가
  QnaList.forEach((response) => {
    // 응답에서 차원 값 추출
    const dimensions = Object.keys(response).filter((key) => key !== "answer");

    // 추출한 차원 값들에 대해 카운트 증가
    dimensions.forEach((dimension) => {
      counts[dimension] += response[dimension] || 0;
    });
  });

  return (
    <div>
      <div className="test-testing">
        <div id="progress-wrap">
          <div className="progress">
            <div
              className="progress-bar"
              // ref={pBar}
              style={{ width: `${(100 / qAmt) * (qidx + 1)}%` }}
            ></div>
          </div>
          <div className="p-number">
            {qidx + 1} / {qAmt}
          </div>
        </div>
        <h2 className="q-number">Q{qidx + 1}</h2>
        <p className="question">{QnaList[qidx].q}</p>
        <div className="answer-btns">
          {QnaList[qidx].a.map((answerText, idx) => (
            <button
              key={idx}
              className="answer btn"
              value={answerText.value}
              onClick={() => addAnswer(answerText.value)}
            >
              {answerText.answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
