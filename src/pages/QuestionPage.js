import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { QnaList } from "../data/QnaList";

const QuestionPage = ({ onResultChange }) => {
  const [qidx, setQidx] = useState(0);
  const [next, setNext] = useState(0);
  const [valueArr, setValueArr] = useState([]);
  const [countArr, setCountArr] = useState([]);
  const [result, setResult] = useState("");
  const [hasResult, setHasResult] = useState(false);
  const navigate = useNavigate();

  const qAmt = QnaList.length;

  //테스트 과정
  const goNext = () => {
    if (qidx !== qAmt - 1) {
      setQidx(next);
      setNext(next + 1);
    } else {
      goResult();
    }
  };

  const addAnswer = (value) => {
    const newValueArr = [...valueArr, value];
    setValueArr(newValueArr);

    // 초기값으로 빈 객체를 사용
    const countValues = valueArr.reduce((counts, value) => {
      // counts 객체에 해당 값이 존재하면 개수를 1 증가, 없으면 1로 초기화
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {});

    // console.log("Count of values:", countValues);
    setCountArr(countValues);
    //다음 문제로 이동
    goNext();
  };

  let str1 = "";
  let str2 = "";
  let str3 = "";
  let str4 = "";

  const goResult = () => {
    if (countArr["e"] > countArr["i"]) {
      str1 = "E";
    } else {
      str1 = "I";
    }
    if (countArr["n"] > countArr["s"]) {
      str2 = "N";
    } else {
      str2 = "S";
    }
    if (countArr["f"] > countArr["t"]) {
      str3 = "F";
    } else {
      str3 = "T";
    }
    if (countArr["p"] > countArr["j"]) {
      str4 = "P";
    } else {
      str4 = "J";
    }
    let newStr = str1 + str2 + str3 + str4;
    // setResult(newStr);
    // console.log(newStr, "result newStr");

    // 결과 값을 부모 컴포넌트로 전달
    onResultChange(newStr);
    setHasResult(true);
    // navigate("/result");
  };

  return (
    <div>
      <div className="test-testing">
        {!hasResult ? (
          <>
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
                  // onClick={(event) => addAnswer(event.target.value)}
                >
                  {answerText.answer}
                </button>
              ))}
            </div>
          </>
        ) : (
          <Link to="/result">결과보러가기</Link>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
