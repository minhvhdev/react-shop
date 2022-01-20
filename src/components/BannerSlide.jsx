import React from "react";
import { Col } from "react-bootstrap";
import Slider from "react-slick";
import Image from "next/image";
function BannerSlide() {
  return (
    <Col id="banner-slide" xs={12} lg={8} xl={7} className="mb-3 mb-lg-0">
      <Slider
        dots={true}
        infinite={true}
        speed={800}
        autoplay={true}
        autoplaySpeed={4000}
      >
        <div className="image-wrapper">
          <Image
            src="/statics/img/iSlide1.jpg"
            priority={true}
            layout="fill"
            className="d-block w-100"
            alt="slide1"
          />
        </div>
        {/* <div className="image-wrapper">
                    <img src={iSlide2} className="d-block w-100" alt="slide1" />
                </div> */}
        <div className="image-wrapper">
          <Image
            src="/statics/img/iSlide3.jpg"
            priority={true}
            layout="fill"
            className="d-block w-100"
            alt="slide1"
          />
        </div>
      </Slider>
    </Col>
  );
}

export default BannerSlide;
