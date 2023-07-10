import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaAngleUp, FaFacebookF } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlineMail, HiPhone } from 'react-icons/hi';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div id="footer" className="text-white">
      <Container>
        <Row>
          <Col xs={12} md={6} lg={4}>
            <div style={{ fontSize: '70px' }}>
              <i className="icon-logo-full"></i>
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <h5>Các giấy tờ liên</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/statics/PDFs/ngu-coc/ban-tu-cong-bo-san-pham.pdf" target="_blank">
                  - Bản tự công bố sản phẩm ngũ cốc
                </a>
              </li>
              <li>
                <a href="/statics/PDFs/ngu-coc/tieu-chuan-co-so.pdf" target="_blank">
                  - Tiêu chuẩn cơ sở ngũ cốc
                </a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <h5>Liên lạc</h5>
            <ul className="list-unstyled">
              <li>
                <HiOutlineMail /> caphethodung@gmail.com
              </li>
              <li>
                <HiPhone /> 091 402 87 13
              </li>
              <li>
                <HiOutlineLocationMarker /> 176 Nguyễn Chí Thanh, Quảng Phú, CưMgar, Đăk Lăk.
              </li>
              <li>
                <a href="https://www.facebook.com/C%C3%A0-ph%C3%AA-Th%C6%A1-D%C5%A9ng-100560468308205">
                  <FaFacebookF /> Facebook
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr />
        <h6>©Copyright by Tho Dung Coffee</h6>
      </Container>
      {isVisible && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <FaAngleUp />
        </div>
      )}
    </div>
  );
};

export default React.memo(Footer);
