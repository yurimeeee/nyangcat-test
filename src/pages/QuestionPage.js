import React, { useState } from "react";
import { Link } from "react-router-dom";
import { QnaList } from "../data/QnaList";
import "animate.css";

const QuestionPage = ({ onResultChange }) => {
  const [qidx, setQidx] = useState(0);
  const [next, setNext] = useState(0);
  const [valueArr, setValueArr] = useState([]);
  const [countArr, setCountArr] = useState([]);
  const [result, setResult] = useState("");
  const [hasResult, setHasResult] = useState(false);
  const [key, setKey] = useState(0); // key 상태 추가

  const qAmt = QnaList.length;

  //테스트 과정
  const goNext = () => {
    if (qidx !== qAmt - 1) {
      setQidx(next + 1);
      setNext(next + 1);
    } else {
      goResult();
    }
  };

  const addAnswer = (value) => {
    const newValueArr = [...valueArr, value];
    setValueArr(newValueArr);

    const countValues = newValueArr.reduce((counts, value) => {
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {});
    setCountArr(countValues);
    // console.log(newValueArr, "newValueArr");
    // console.log(countArr, "counts");
    //다음 문제로 이동
    goNext();
    setKey((prevKey) => prevKey + 1); // key 상태를 변경하여 다시 렌더링
  };

  let str1 = "";
  let str2 = "";
  let str3 = "";
  let str4 = "";

  const goResult = () => {
    str1 = (countArr["e"] || 0) > (countArr["i"] || 0) ? "E" : "I";
    str2 = (countArr["n"] || 0) > (countArr["s"] || 0) ? "N" : "S";
    str3 = (countArr["f"] || 0) > (countArr["t"] || 0) ? "F" : "T";
    str4 = (countArr["p"] || 0) > (countArr["j"] || 0) ? "P" : "J";
    let newStr = str1 + str2 + str3 + str4;

    // 결과 값을 부모 컴포넌트로 전달
    onResultChange(newStr);
    setHasResult(true);
    // console.log(newStr, "newStr");
  };

  return (
    <div key={key} className="test">
      <div className="test-testing">
        {!hasResult ? (
          <>
            <div id="progress-wrap">
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: `${(100 / qAmt) * (qidx + 1)}%` }}
                ></div>
              </div>
              <div className="p-number">
                {qidx + 1} / {qAmt}
              </div>
            </div>
            <div className="animate__animated animate__fadeIn animate__slow-1s">
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
          </>
        ) : (
          <div className="result-loading">
            <div>
              <svg>
                <defs>
                  <filter id="poo">
                    <feGaussianBlur
                      in="SourceGraphic"
                      result="blur"
                      stdDeviation="4"
                    />
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -8"
                      result="goo"
                    />
                    <feBlend in2="goo" in="SourceGraphic" result="mix" />
                  </filter>
                </defs>
                <mask id="mask">
                  <g
                    id="g"
                    className="balls"
                    style={{ filter: "url('#poo')", fill: "#F8AB52" }}
                  >
                    <circle cx="25" cy="25" r="6" id="b1"></circle>
                    <circle cx="25" cy="25" r="6" id="b2"></circle>
                  </g>
                </mask>
                <rect
                  x="0"
                  y="0"
                  mask="url(#mask)"
                  fill="#F8AB52"
                  width="50"
                  height="50"
                />
                <animateTransform
                  href="#g"
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  id="an1"
                  href="#b1"
                  attributeName="cx"
                  calcMode="spline"
                  keyTimes="0; 0.5; 1"
                  values="25; 18; 25"
                  keySplines=".6 .01 .36 .99; .6 .01 .36 .99;"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  id="an2"
                  href="#b2"
                  attributeName="cx"
                  values="25; 32; 25"
                  calcMode="spline"
                  keySplines=".6 .01 .36 .99; .6 .01 .36 .99;"
                  keyTimes="0; 0.5; 1"
                  to="60"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  href="#b1"
                  attributeName="r"
                  values="6.4; 5; 6.4"
                  calcMode="spline"
                  keySplines=".6 .01 .36 .99; .6 .01 .36 .99;"
                  keyTimes="0; 0.5; 1"
                  to="60"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  href="#b2"
                  attributeName="r"
                  values="6.4; 5; 6.4"
                  calcMode="spline"
                  keySplines=".6 .01 .36 .99; .6 .01 .36 .99;"
                  keyTimes="0; 0.5; 1"
                  to="60"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </svg>
              <Link to="/result" className="start-btn btn">
                결과 보기
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
