import React, { useEffect, useState } from "react";
import kakaoIcon from "../asset/kakao.png";
import kakaoSmIcon from "../asset/kakao-sm.png";
import { useLocation } from "react-router-dom";
const { Kakao } = window;

const realUrl = "https://yurimeeee.github.io/nyangcat-test/";
const resultUrl = window.location.href;

const KakaoShareButton = () => {
  const location = useLocation();
  const [kakaoInitialized, setKakaoInitialized] = useState(false);

  useEffect(() => {
    // Kakao SDK 로드
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js";
    script.integrity =
      "sha384-kYPsUbBPlktXsY6/oNHSUDZoTX6+YI51f63jCPEIPFP09ttByAdxd2mEjKuhdqn4";
    script.crossOrigin = "anonymous";
    script.async = true;

    script.onload = () => {
      // Kakao SDK 초기화
      window.Kakao.init("6a0776bc9f8e88dc0f355d0ee8e063ed");
      window.Kakao.isInitialized();
      setKakaoInitialized(true);
    };

    document.head.appendChild(script);

    // 언마운트 시에 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const shareMessage = () => {
    if (kakaoInitialized) {
      // if (window.Kakao && window.Kakao.isInitialized()) {
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "나는 어떤 고양이?!",
          description: "성격으로 알아보는 냥캣테스트",
          imageUrl:
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhealth.chosun.com%2Fsite%2Fdata%2Fhtml_dir%2F2023%2F07%2F17%2F2023071701758.html&psig=AOvVaw04EQ9lCMHqJXrSUm8DtiG1&ust=1702877692585000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJCpxPLflYMDFQAAAAAdAAAAABAE",
          // "https://yurimeeee.github.io/nyangcat-test/asset/kakaoshare.png",
          link: {
            mobileWebUrl: realUrl,
          },
        },
        buttons: [
          {
            title: "테스트 하러가기",
            link: {
              mobileWebUrl: realUrl,
            },
          },
          {
            title: "친구의 결과보기",
            link: {
              mobileWebUrl: resultUrl,
            },
          },
        ],
      });
    }
  };

  return (
    // <a
    //   href="javascript:void(0)"
    //   onClick={shareMessage}
    //   className="btn share-btn"
    // >
    //   <img src={kakaoIcon} alt="카카오톡" />
    //   카카오톡 공유하기
    // </a>
    <div onClick={shareMessage}>
      {location.pathname === "/" ? (
        <div className="btn share-btn">
          <img src={kakaoIcon} alt="카카오톡" /> 카카오톡 공유하기
        </div>
      ) : location.pathname === "/result" ? (
        <button className="kakao circle-btn">
          <img src={kakaoSmIcon} alt="카카오톡 공유" />
        </button>
      ) : null}
    </div>
  );
};

export default KakaoShareButton;
