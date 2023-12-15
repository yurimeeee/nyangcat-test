import React from "react";
import { Link } from "react-router-dom";
import kakaoIcon from "../asset/kakao.png";
// import ResultData from "../data/result_data";

import { ResultList } from "../data/result_data";
const ResultPage = ({ finalResult }) => {
  console.log(finalResult, "finalResult");
  // console.log(ResultList, "ResultList");

  console.log("tupe", typeof finalResult);
  const results = ResultList.filter((result) => finalResult in result)[0][
    finalResult
  ];

  console.log(results);
  return (
    <div className="result">
      <div className="result-wrap animate__animated animate__fadeIn animate__slow-1s">
        <h2>테스트 결과</h2>
        <div className="mbti">
          <h3>
            {results.Feature}
            <strong> {results.Name}</strong>
          </h3>
          <img src={results.Img} alt="카카오톡" />
        </div>
        <div className="overflow">
          <div className="result-desc">
            <p>{results.Desc}</p>
          </div>
          <div>
            <div>
              <p>잘 맞아요</p>
            </div>
            <div>
              <p>상극이에요</p>
            </div>
          </div>
          <div className="btn-wrap">
            <a href="" className="btn start-btn">
              테스트 다시하기
            </a>
            <Link to="/" className="btn share-btn">
              <img src={kakaoIcon} alt="카카오톡" />
              친구에게 공유하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
