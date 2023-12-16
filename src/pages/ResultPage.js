import React, { useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import kakaoIcon from "../asset/kakao.png";
import { ResultList } from "../data/result_data";
import { useNavigate } from "react-router-dom";

const ResultPage = ({ finalResult }) => {
  const navigate = useNavigate();

  // const storageKey = "resultData"; // 로컬 스토리지에 저장될 키

  // // 로컬 스토리지에서 데이터 가져오기
  // const storedData = JSON.parse(localStorage.getItem(storageKey)) || {};

  // // finalResult가 존재하면 새로운 데이터 저장
  // if (finalResult) {
  //   storedData[finalResult] = ResultList.filter(
  //     (result) => finalResult in result
  //   )[0][finalResult];

  //   // 로컬 스토리지에 데이터 저장
  //   localStorage.setItem(storageKey, JSON.stringify(storedData));
  // } else {
  //   const results = storedData[finalResult] || {};
  // }

  console.log(finalResult, "finalResult");
  console.log(ResultList, "ResultList");
  console.log(process.env.PUBLIC_URL, "process.env.PUBLIC_URL");
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
    // useEffect 안에서 페이지 리로드 시 리다이렉션을 수행
    const handlePageReload = () => {
      console.log("리로드 시 리다이렉션 작업 수행 중");
      // navigate("/"); // "/" 경로로 리다이렉트

      // return redirect("/");
      window.location.reload("/");
    };

    window.addEventListener("beforeunload", handlePageReload);

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      window.removeEventListener("beforeunload", handlePageReload);
    };
  }, [navigate]);

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
          <h4>" {results.say} "</h4>
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
