import PostApi from "api/PostApi";
import ProductApi from "api/ProductApi";
import BannerSlide from "components/BannerSlide";
import TopPost from "components/TopPost";
import TopProductSlide from "components/TopProductSlide";
import Head from "next/head";
import { useRouter } from "next/router";
import queryString from "query-string";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { socialAsyncAddress } from "redux/slice/addressSlice";
import { socialAsyncCart } from "redux/slice/shopcartSlice";
import { login } from "redux/slice/userSlice";
import store from "redux/store";

function HomePage({ products, posts }) {
  const router = useRouter();
  useEffect(() => {
    const token = queryString.parse(location.search);
    if (token?.accessToken) {
      store.dispatch(login({ ...token }));
      store.dispatch(socialAsyncCart());
      store.dispatch(socialAsyncAddress());
      const pathName = localStorage.getItem("_pathname");
      const search = localStorage.getItem("_search");
      const url = pathName + search;
      router.push(url, undefined, { shallow: true });
      localStorage.removeItem("_pathname");
      localStorage.removeItem("_search");
    }
  }, []);
  return (
    <section className="pt-3 pt-md-5">
      <Head>
        <title>Cà phê Thơ Dũng - Trang chủ</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cà Phê Bột Rang Xay" />
        <meta
          property="og:description"
          content="Mua bán và tin tức về cà phê. Bán các loại cà phê rang xay bột hạt thương hiệu cà phê nguyên chất Thơ Dũng"
        />
        <meta property="og:url" content="https://caphethodung.vn" />
        <meta property="og:site_name" content="Cà Phê Thơ Dũng" />
      </Head>
      <Container>
        <Row>
          <BannerSlide />
          <TopPost posts={posts} />
        </Row>
      </Container>
      <TopProductSlide products={products} />

      <>
        <div id="about" className="text-center py-5">
          <Container>
            <h2 className="font-weight-bold">
              Cà Phê Nguyên Chất Rang Mộc Thơ Dũng
            </h2>
            <h4 className="font-weight-bold mb-2">
              Tìm về hương vị tự nhiên, hướng tới sức khỏe người dùng
            </h4>
            <h1 className="logo-about">
              <i className="icon-logo-full"></i>
            </h1>
            <p>
              Cà phê nguyên chất rang mộc Thơ Dũng là sản phẩm cà phê rang củi
              truyền thống của công ty TNHH TM cà phê Minh Dũng tại 176 Nguyễn
              Chí Thanh, thị trấn Quảng Phú, huyện CưMgar, tỉnh Đăk Lăk. Hiện
              tại công ty có các sản phẩm cà phê nguyên chất Robusta, Robusta
              Culi, Arabica,... Với kinh nghiệm hơn 20 năm trong ngành cà phê
              chúng tôi luôn đảm bảo mang tới những hạt cà phê ngon nhất, tốt
              nhất Việt Nam.
            </p>
            <p>
              Tất cả sản phẩm của chúng tôi đều có nguồn gốc bản địa Đăk Lăk và
              Lâm Đồng, 100% tự nhiên.
            </p>
          </Container>
        </div>
      </>

      <>
        <div id="procedure">
          <Container>
            <Row className="py-5 px-2 px-md-5 m-0 text-white">
              <Col xs={12} className="text-center">
                <h2 className="font-custom">
                  Quy Trình Làm Ra Ly Cà Phê Sạch Nguyên Chất
                </h2>
                <i className="icon-coffee"></i>
              </Col>
              <Col xs={12} className="text-center">
                <p className="mb-5">
                  Lựa chọn vùng nguyên liệu hữu cơ; Áp dụng quy trình sơ chế -
                  rang xay chuyên biệt; <br />
                  Phối trộn theo gu vị là các yếu tố cốt lõi tạo nên sản phẩm cà
                  phê sạch nguyên chất tại cà phê Thơ Dũng
                </p>
              </Col>
              <Col xs={12} sm={6} lg={4} className="text-center">
                <i className="icon-BC-01 icon-procedure"></i>
                <h4>Vùng nguyên liệu hữu cơ</h4>
                <p>
                  Tại cà phê Thơ Dũng, hạt cà phê được tuyển chọn từ Tây Nguyên
                  với nguyên liệu canh tác hữu cơ. Trái cà phê được hái chín
                  100% qua sự chọn lọc bởi bàn tay cần mẫn của người nông dân.
                </p>
              </Col>
              <Col xs={12} sm={6} lg={4} className="text-center">
                <i className="icon-BC-02 icon-procedure"></i>
                <h4>Phương pháp sơ chế chuẩn</h4>
                <p>
                  Thấu hiểu hạt cà phê từng vùng nguyên liệu, cà phê Thơ Dũng
                  chọn phương pháp sơ chế phù hợp: chế biến khô, chế biến ướt,
                  chế biến honey để tạo ra vị cafe nguyên chất đậm đà, quyến rũ.
                </p>
              </Col>
              <Col xs={12} sm={6} lg={4} className="text-center">
                <i className="icon-BC-03 icon-procedure"></i>
                <h4>Kỹ thuật rang xay thủ công</h4>
                <p>
                  Hạt cà phê được lựa chọn tỉ mỉ và được rang bằng đôi bàn tay
                  đầy nghệ thuật của người có kinh nghiệm hơn 20 năm trong ngành
                  cà phê. Sẽ cho ra hương vị, màu sắc đặc trưng và chất lượng
                </p>
              </Col>
              <Col xs={12} sm={6} lg={4} className="text-center">
                <i className="icon-BC-04 icon-procedure"></i>
                <h4>Phối trộn theo gu vị </h4>
                <p>
                  Hiểu đặc tính dòng cà phê Arabica, Robusta, thử nghiệm hương
                  vị từng mẻ rang, cà phê Thơ Dũng tiến hành phối trộn theo tỉ
                  lệ bí quyết riêng để tạo ra chất cafe phù hợp từng gu vị.{" "}
                </p>
              </Col>
              <Col xs={12} sm={6} lg={4} className="text-center">
                <i className="icon-BC-05 icon-procedure"></i>
                <h4>Đóng gói theo tiêu chuẩn </h4>
                <p>
                  Cà phê sau khi phối trộn theo gu vị sẽ được đóng gói bằng túi
                  chuyên dụng có khóa zipper, giúp bảo quản cafe tốt hơn, cafe
                  giữ được hương vị lâu hơn sau khi mở bao bì.{" "}
                </p>
              </Col>
              <Col xs={12} sm={6} lg={4} className="text-center">
                <i className="icon-BC-06 icon-procedure"></i>
                <h4>Ly cafe tuyệt hảo </h4>
                <p>
                  Hạt cà phê rang xay, cafe bột nguyên chất được phân phối đến
                  người tiêu dùng qua dịch vụ chuyển phát. Bạn có thể thưởng
                  thức bằng cách pha phin hoặc máy pha Espresso.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </>

      <>
        <div className="py-5 position-relative" id="know">
          <Container>
            <Row>
              <Col xs={12} className="text-center mb-3">
                <h2>Cách Nhận Biết Cà Phê Rang Xay Nguyên Chất</h2>{" "}
                <i className="icon-coffee"></i>
              </Col>
              <img
                className="main-img-know d-lg-block d-none"
                src="/statics/img/banner.png"
                alt="Cà phê nguyên chất là gì "
              />
              <Col xs={12} md={5} className="text-end pe-5 pr-md-0">
                <Col className="position-relative">
                  <img
                    className="img-know-left"
                    src="/statics/img/icon7.png"
                    alt="Cà phê nguyên chất là gì "
                  />
                  <div className="pe-2">
                    <h4>Cà phê nguyên chất là gì </h4>
                    <p>
                      Cà phê sạch nguyên chất là sản phẩm được chăm chút từ khâu
                      trồng trọt đến đóng gói. Hạt cà phê được tuyển chọn từ
                      vùng nguyên liệu hữu cơ, sơ chế đúng kỹ thuật, rang xay
                      đúng quy trình, đặc biệt không tẩm hóa chất, hương vị.
                    </p>
                  </div>
                </Col>
                <Col xs={12} className="position-relative">
                  <img
                    className="img-know-left"
                    src="/statics/img/icon8.png"
                    alt="Bột cà phê nguyên chất "
                  />
                  <div className="pe-2">
                    <h4>Bột cà phê nguyên chất </h4>
                    <p>
                      Sau khi rang hạt cà phê giãn nở từ 1,5 đến 2 lần. Vì vậy,
                      cùng một khối lượng, gói cafe nguyên chất sẽ to hơn cafe
                      trộn. Bột cà phê nguyên chất có màu nâu đậm, khi tiếp xúc
                      có cảm giác tơi xốp, khô rời, hương thơm dễ chịu.
                    </p>
                  </div>
                </Col>
                <Col xs={12} className="position-relative">
                  <img
                    className="img-know-left"
                    src="/statics/img/icon9.png"
                    alt="Cafe nguyên chất khi pha "
                  />
                  <div className="pe-2">
                    <h4>Cafe nguyên chất khi pha </h4>
                    <p>
                      Cà phê sạch nguyên chất khi tiếp xúc với nước nóng sẽ giãn
                      nở, làm cho bột cafe phồng và sủi bọt. Cà phê pha trộn khi
                      pha sẽ có trạng thái dẻo, dính do thành phần tinh bột.
                    </p>
                  </div>
                </Col>
              </Col>
              <div className="col"></div>
              <Col xs={12} md={5} className="text-left ps-5 pl-md-0">
                <Col xs={12} className="position-relative">
                  <img
                    className="img-know-right"
                    src="/statics/img/icon10.png"
                    alt="Nhận biết sau khi pha "
                  />
                  <div className="ps-2">
                    <h4>Nhận biết sau khi pha </h4>
                    <p>
                      Nước cafe rang xay nguyên chất có màu nâu cánh gián trong
                      trẻo. Khi cho vào ly đá, cà phê chuyển sang màu hổ phách.
                      Mùi cafe thơm nhẹ nhàng, thanh tao, sâu lắng, không phải
                      mùi thơm nồng, mạnh, gắt, khó chịu của cafe pha tẩm.
                    </p>
                  </div>
                </Col>
                <Col xs={12} className="position-relative">
                  <img
                    className="img-know-right"
                    src="/statics/img/icon11.png"
                    alt="Vị cafe rang xay nguyên chất "
                  />
                  <div className="ps-2">
                    <h4>Vị cà phê nguyên chất </h4>
                    <p>
                      Dù pha bằng phin hay pha trên máy thì bạn cũng dễ dàng cảm
                      nhận được vị đắng thanh, chua nhẹ và hậu vị ngọt của cà
                      phê nguyên chất, không phải vị đắng gắt khó chịu dai dẳng
                      của chất tạo vị trong cafe pha tẩm.
                    </p>
                  </div>
                </Col>
                <Col xs={12} className="position-relative">
                  <img
                    className="img-know-right"
                    src="/statics/img/icon12.png"
                    alt="cà phê Thơ Dũng"
                  />
                  <div className="ps-2">
                    <h4>Cà phê Thơ Dũng</h4>
                    <p>
                      Là nhà cung cấp cà phê uy tín, chúng tôi nghiên cứu tạo ra
                      sản phẩm cà phê sạch nguyên chất nhiều gu vị, phù hợp pha
                      phin, pha máy. Tại đây, bạn có thể chọn mua bột hoặc hạt
                      cà phê theo nhu cầu.
                    </p>
                  </div>
                </Col>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    </section>
  );
}
export async function getStaticProps(context) {
  const products = await ProductApi.getAll();
  const posts = await PostApi.getAll();
  return {
    props: { products, posts },
  };
}

export default HomePage;
