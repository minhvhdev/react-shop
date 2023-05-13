import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import { IProduct } from '@types';
import Link from 'next/link';

import ProductCard from './ProductCard';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Props {
  products: IProduct[];
}

const TopProductSlide: React.FC<Props> = ({ products }: Props) => {
  return (
    <div id="top-products" className="py-5">
      <Container className="px-4 text-center">
        <h2 className="text-center text-white mb-3">Sản phẩm bán chạy</h2>
        <Slider
          infinite={false}
          slidesToShow={5}
          dots={true}
          swipeToSlide={true}
          responsive={[
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1
              }
            }
          ]}
          className="product-slide">
          {products.slice(0, 6).map((item, index) => {
            return (
              <div className="px-2" key={index}>
                <ProductCard product={item} />
              </div>
            );
          })}
        </Slider>
        <Link href="/tat-ca-san-pham" className="btn btn-lg btn-primary mt-5 px-5">
          Xem tất cả sản phẩm
        </Link>
      </Container>
    </div>
  );
};

export default TopProductSlide;
