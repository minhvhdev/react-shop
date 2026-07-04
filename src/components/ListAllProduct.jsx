import React, { useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import { Select } from 'antd';
import { sortJSON } from 'helper';
import NullPage from 'layouts/NullPage';
import PropTypes from 'prop-types';

import ProductCard from 'components/ProductCard';

ListAllProduct.propTypes = {
  coffee: PropTypes.bool.isRequired,
  other: PropTypes.bool.isRequired,
  range: PropTypes.number.isRequired,
  products: PropTypes.array.isRequired
};
function ListAllProduct({ products, range, other, coffee }) {
  const [offset, setOffset] = useState(0);
  const [sortOrder, setSortOrder] = useState('-1');
  const perPage = 12;

  const filteredList = useMemo(() => {
    let nextList = [];

    if (coffee && other) {
      nextList = products;
    } else if (coffee) {
      nextList = products.filter((item) => {
        return item.coffee === true;
      });
    } else {
      nextList = products.filter((item) => {
        return item.coffee === false;
      });
    }

    if (range < 1000000) {
      nextList = nextList.filter((item) => {
        return item.price <= range;
      });
    }

    return nextList;
  }, [coffee, other, range, products]);

  const list = useMemo(() => {
    if (sortOrder === '0') {
      return sortJSON([...filteredList], 'price');
    }

    if (sortOrder === '1') {
      return sortJSON([...filteredList], 'price', false);
    }

    return filteredList;
  }, [filteredList, sortOrder]);

  const pageCount = Math.ceil(list.length / perPage);
  const normalizedOffset = offset < list.length ? offset : 0;
  const currentPage = Math.floor(normalizedOffset / perPage);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
    window.scrollTo(0, 120);
  };

  const handleSort = (value) => {
    setSortOrder(value);
    setOffset(0);
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <span className="fs-5">Sắp xếp theo:</span>
        <Select
          name="product-sort"
          className="ms-2 mb-1"
          id="product-sort"
          onChange={handleSort}
          defaultValue="-1">
          <option disabled hidden value="-1">
            --- Lựa chọn ---
          </option>
          <option value="0">Giá tăng dần</option>
          <option value="1">Giá giảm dần</option>
        </Select>
      </div>
      <Row>
        {list.length > 0 ? (
          <>
            {list.slice(normalizedOffset, normalizedOffset + perPage).map((product, i) => {
              return (
                <Col xs={12} className="col-ssm-6 mb-3 text-center" lg={4} xxl={3} key={i}>
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
                  forcePage={currentPage}
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
