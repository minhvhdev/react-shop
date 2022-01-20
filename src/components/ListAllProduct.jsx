import ProductCard from "components/ProductCard";
import { sortJSON } from "lib/Helper";
import Loading from "layout/Loading";
import NullPage from "layout/NullPage";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";

ListAllProduct.propTypes = {
  coffee: PropTypes.bool.isRequired,
  other: PropTypes.bool.isRequired,
  range: PropTypes.number.isRequired,
  products: PropTypes.array.isRequired,
};
function ListAllProduct({products, range, other, coffee}) {
  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0);
  const perPage = 12;
  const [pageCount, setPageCount] = useState(0);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
    window.scrollTo(0, 120);
  };
  const handleSort = (evt) => {
    const value = evt.target.value;
    if (+value === 0) {
      setList([...sortJSON(list, "price")]);
    } else {
      setList([...sortJSON(list, "price", false)]);
    }
  };
  useEffect(() => {
    let a = [];
    if (coffee && other) {
      a = products;
    } else if (coffee) {
      a = products.filter((item) => {
        return item.coffee === true;
      });
    } else {
      a = products.filter((item) => {
        return item.coffee === false;
      });
    }
    if (range < 1000000) {
      a = a.filter((item) => {
        return item.price <= range;
      });
    }
    setList(a);
    setPageCount(Math.ceil(a.length / perPage));
  }, [coffee, other, range, products]);
  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <span className="fs-5">Sắp xếp theo:</span>
        <select
          name="product-sort"
          className="ms-2 mb-1"
          id="product-sort"
          onChange={handleSort}
          defaultValue="-1"
        >
          <option disabled hidden value="-1">
            --- Lựa chọn ---
          </option>
          <option value="0">Giá tăng dần</option>
          <option value="1">Giá giảm dần</option>
        </select>
      </div>
      <Row>
        {list.length > 0 ? (
          <>
            {list.slice(offset, offset + perPage).map((product, i) => {
              return (
                <Col
                  xs={12}
                  className="col-ssm-6 mb-3 text-center"
                  lg={4}
                  xxl={3}
                  key={i}
                >
                  <ProductCard product={product} />
                </Col>
              );
            })}

            {pageCount > 1 ? (
              <div className="d-flex justify-content-center mt-2">
                <ReactPaginate
                  previousLabel={<GrCaretPrevious />}
                  nextLabel={<GrCaretNext />}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName="pagination"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  activeClassName="active"
                />
              </div>
            ) : null}
          </>
        ) : (
          <NullPage />
        )}
      </Row>
    </>
  );
}
export default React.memo(ListAllProduct);
