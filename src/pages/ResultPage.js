import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import kakaoIcon from "../asset/kakao.png";
import { ResultList } from "../data/result_data";

const ResultPage = ({ finalResult }) => {
  // const [best, setBest] = useState([]);
  // const [worst, setWorst] = useState([]);

  console.log(finalResult, "finalResult");
  console.log(ResultList, "ResultList");

  console.log("tupe", typeof finalResult);
  const results = ResultList.filter((result) => finalResult in result)[0][
    finalResult
  ];

  const bestArr = results.Best.map((mbti) =>
    ResultList.find((result) => mbti in result)
  );
  // console.log(bestArr, "bestArr");

  const bestMbti = bestArr.map((item) => {
    if (item) {
      return item[Object.keys(item)[0]];
    }
    return null;
  });
  // console.log(bestMbti);

  const worstArr = results.Worst.map((mbti) =>
    ResultList.find((result) => mbti in result)
  );
  console.log(worstArr, "worstArr");

  const worstMbti = worstArr.map((item) => {
    if (item) {
      return item[Object.keys(item)[0]];
    }
    return null;
  });

  useEffect(() => {
    // console.log(results, "results");
    // let bestMbti = results.Best;
    // const bestArr = ResultList.filter((result) => bestMbti in result)[0][
    //   bestMbti
    // ];
    // console.log(bestMbti, "bestMbti");
    // // setBest(...bestArr);
    // console.log(bestArr, "bestArr");

    // 컴포넌트가 언마운트될 때 클리어하는 등의 작업을 하고 싶다면
    return () => {
      console.log("컴포넌트가 언마운트될 때 수행됩니다.");
    };
  }, []);

  return (
    <div className="result">
      <div className="result-wrap animate__animated animate__fadeIn animate__slow-1s">
        <h2>테스트 결과</h2>
        <div className="mbti">
          <h3>
            {results.Feature}
            <strong> {results.Name}</strong>
          </h3>
          <img src={results.Img} alt={results.Name} />
        </div>
        <div className="overflow">
          <div className="result-desc">
            <p>{results.Desc}</p>
          </div>
          <div className="tags-wrap">
            <h4># 냥냥태그</h4>
            <div className="tags">
              {results.Tag.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
          <div className="chemistry">
            <div className="best">
              <p>잘 맞아요</p>
              <div className="mbti-wrap">
                {bestMbti.map((item, index) => (
                  <div key={index}>
                    <img src={item.Img} alt={item.Name} />
                    <p>{item.Name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="worst">
              <p>상극이에요</p>
              <div className="mbti-wrap">
                {worstMbti.map((item, index) => (
                  <div key={index}>
                    <img src={item.Img} alt={item.Name} />
                    <p>{item.Name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="btn-wrap">
            <Link to="/" className="btn start-btn">
              {" "}
              테스트 다시하기
            </Link>
            {/* <a href="" className="btn start-btn">
              테스트 다시하기
            </a> */}
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
