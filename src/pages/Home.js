import React from "react";
import { Link } from "react-router-dom";
import catImg from "../asset/cat.png";
import "animate.css";
import KakaoShareButton from "../components/ShareButton";
import BubbleCat from "../components/BubbleCat";

const Home = () => {
  return (
    <div className="home">
      <div className="title-wrap animate__animated animate__fadeIn animate__slow-1s">
        <h2>성격으로 알아보는</h2>
        <h1>
          나는
          <br />
          어떤 고양이?!
        </h1>
      </div>
      <div className="main">
        <BubbleCat />
        <div className="btn-wrap animate__animated animate__fadeInUp animate__delay-0.5s animate__slow">
          <img src={catImg} alt="고양이" className="home-img" />
          <Link to="/questions" className="btn start-btn">
            테스트 시작하기
          </Link>
          <KakaoShareButton />
        </div>
      </div>
    </div>
  );
};

export default Home;
