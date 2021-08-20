import PostCard from "components/PostCard";
import { sortJSON } from "lib/Helper";
import Loading from "pages/layout/Loading";
import NullPage from "pages/layout/NullPage";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

ListAllPost.propTypes = {};
function ListAllPost(props) {
  // @ts-ignore
  const posts = useSelector((state) => state.posts);
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
    if (value === "0") {
      console.log("tăng dần");
      setList(sortJSON(list, "numView", false));
    }
    if (value === "1") {
      console.log("giảm dần");
      setList([...sortJSON(list, "createDate", false)]);
    } else {
      setList([...sortJSON(list, "createDate")]);
    }
  };
  useEffect(() => {
    setList([...posts.data]);
    setPageCount(Math.ceil(posts.data.length / perPage));
  }, [posts.data]);
  return (
    <Container>
      <Breadcrumb className="fs--11 mt-3">
        <li className="breadcrumb-item">
          <Link to="/">Trang chủ</Link>
        </li>
        <Breadcrumb.Item active>Tất cả bài viết</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <span className="fs-5">Các bài viết</span>
            </div>
            <div>
              <span className="fs-5">Sắp xếp theo:</span>
              <select
                name="post-sort"
                className="ms-2 mb-1"
                id="post-sort"
                onChange={handleSort}
                defaultValue={"-1"}
              >
                <option hidden disabled selected value="-1">
                  --- Lựa chọn ---
                </option>
                <option value="0">Lượt xem</option>
                <option value="1">Mới nhất</option>
                <option value="2">Cũ nhất</option>
              </select>
            </div>
          </div>
          <Row className="position-relative">
            {posts.status === "loading" ? (
              <Loading type="inline" />
            ) : list.length > 0 ? (
              <>
                {list.slice(offset, offset + perPage).map((post, i) => {
                  return (
                    <Col xs={12} md={6} xl={4} key={i} className="mb-3">
                      <PostCard post={post} />
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
        </Col>
      </Row>
    </Container>
  );
}

ListAllPost.propTypes = {};

export default React.memo(ListAllPost);
