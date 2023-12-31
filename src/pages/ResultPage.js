import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import linkIcon from "../asset/link.png";
import { ResultList } from "../data/result_data";
import KakaoShareButton from "../components/ShareButton";
import { IconShare } from "@tabler/icons-react";

const ResultPage = ({ finalResult }) => {
  const [toLowerResult, setToLowerResult] = useState("");
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

  // console.log(finalResult, "finalResult");
  // console.log(ResultList, "ResultList");

  // const results = ResultList.filter((result) => finalResult in result)[0][
  //   finalResult
  // ];
  const results = ResultList.filter((result) => finalResult in result)[0][
    finalResult
  ];
  useEffect(() => {
    if (results) {
      setToLowerResult(results.Mbti.toLowerCase());
    }
  }, [finalResult]);

  const bestArr = results.Best.map((mbti) =>
    ResultList.find((result) => mbti in result)
  );

  const bestMbti = bestArr.map((item) => {
    if (item) {
      return item[Object.keys(item)[0]];
    }
    return null;
  });

  const worstArr = results.Worst.map((mbti) =>
    ResultList.find((result) => mbti in result)
  );

  const worstMbti = worstArr.map((item) => {
    if (item) {
      return item[Object.keys(item)[0]];
    }
    return null;
  });

  //링크 공유
  const urlRef = useRef(null);
  const toastRef = useRef(null);

  const copyToClipboard = () => {
    // input 포커스
    urlRef.current.select();
    document.execCommand("copy");
    toastRef.current.classList.add("active");
    setTimeout(() => {
      toastRef.current.classList.remove("active");
    }, 2000);
  };

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
            {/* <Link to="/" className="btn share-btn">
              <img src={kakaoIcon} alt="카카오톡" />
              친구에게 공유하기
            </Link> */}
          </div>
          <div className="share-wrap">
            <h4>
              <IconShare size={20} />
              테스트 공유하기
            </h4>
            <div className="share-btns">
              <div>
                <KakaoShareButton toLowerResult={toLowerResult} />
              </div>
              <div className="clipboard">
                <p className="toast" ref={toastRef}>
                  링크가 클립보드에 저장되었습니다.
                </p>
                <input
                  ref={urlRef}
                  type="text"
                  value={`https://yurimeeee.github.io/nyangcat-test/result/${toLowerResult}.html`}
                  readOnly
                  // className="hidden"
                  style={{ position: "absolute", left: "-9999px" }}
                />
                <button
                  onClick={copyToClipboard}
                  className="linkcopy circle-btn"
                >
                  <img src={linkIcon} alt="링크복사" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
