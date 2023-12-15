import React, { useEffect } from "react";

const KakaoShareButton = () => {
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
      window.Kakao.init("c089c8172def97eb00c07217cae17495");
    };

    document.head.appendChild(script);

    // 언마운트 시에 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const shareMessage = () => {
    window.Kakao.Share.sendDefault({
      // kakao.Link.sendDefault({
      // ... 공유 내용 설정
      // container: '#kakaotalk-sharing-btn',
      // objectType: 'feed',
      // content: {
      //   title: '나는 어떤 고양이?!',
      //   description: '성격으로 알아보는 냥캣테스트',
      //   imageUrl:
      //     'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
      //   link: {
      //     mobileWebUrl: 'https://developers.kakao.com',
      //     webUrl: 'https://developers.kakao.com',
      //   },
    });
  };

  return (
    <a href="javascript:void(0)" onClick={shareMessage}>
      {/* 카카오 공유 버튼 이미지 또는 컴포넌트 */}공유하기
    </a>
  );
};

export default KakaoShareButton;
