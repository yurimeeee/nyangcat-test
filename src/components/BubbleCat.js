import React, { useEffect, useRef, useState } from "react";

const BubbleCat = () => {
  const catImages = [
    "/asset/random/cat_1.png",
    "/asset/random/cat_2.png",
    "/asset/random/cat_3.png",
    "/asset/random/cat_4.png",
    "/asset/random/cat_5.png",
    "/asset/random/cat_6.png",
    "/asset/random/cat_7.png",
    "/asset/random/cat_8.png",
    "/asset/random/cat_9.png",
    "/asset/random/cat_10.png",
    "/asset/random/cat_11.png",
    "/asset/random/cat_12.png",
    "/asset/random/cat_13.png",
    "/asset/random/cat_14.png",
    "/asset/random/cat_15.png",
    "/asset/random/cat_16.png",
  ];

  const catImageRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fadeInOutImage = () => {
    const image = document.getElementById("catImage");

    if (image) {
      // image.style.opacity = "0";

      setTimeout(() => {
        const nextIndex = (currentImageIndex + 1) % catImages.length;
        const newImageSrc = catImages[nextIndex];
        image.src = newImageSrc;

        image.style.opacity = "1";
        image.style.transform = "scale(1.3)";

        setCurrentImageIndex(nextIndex);
      }, 1000);

      setTimeout(() => {
        // image.style.opacity = "0";
        image.style.transform = "scale(1.0)";
      }, 1500);

      setTimeout(() => {
        fadeInOutImage();
      }, 90000);
    }
  };

  useEffect(() => {
    fadeInOutImage();
  }, [catImages, currentImageIndex]);

  return (
    <div className="random-container">
      <img
        src={catImages[currentImageIndex]}
        alt="어떤 고양이"
        id="catImage"
        ref={catImageRef}
      />
    </div>
  );
};

export default BubbleCat;
