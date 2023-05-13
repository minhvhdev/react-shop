import React, { useEffect, useState } from 'react';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import { IPost } from '@types';
import postApi from 'api/postApi';
import { sortJSON } from 'helper';
import NullPage from 'layouts/NullPage';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import PostCard from 'components/PostCard';

type Props = {
  posts: IPost[];
};

const ListAllPost: React.FC<Props> = ({ posts }) => {
  const [list, setList] = useState<IPost[]>([]);
  const [offset, setOffset] = useState(0);
  const perPage = 2;
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (selectedItem: { selected: number }): void => {
    const selectedPage = selectedItem.selected;
    setOffset(selectedPage * perPage);
    window.scrollTo(0, 120);
  };

  const handleSort: React.ChangeEventHandler<HTMLSelectElement> = (evt) => {
    const value = evt.target.value;
    if (value === '0') {
      setList(sortJSON(list, 'numView', false) as IPost[]);
    }
    if (value === '1') {
      setList([...sortJSON(list, 'createDate', false)]);
    } else {
      setList([...sortJSON(list, 'createDate')]);
    }
  };

  useEffect(() => {
    setList([...posts]);
    setPageCount(Math.ceil(posts.length / perPage));
  }, [posts]);

  return (
    <Container>
      <Head>
        <title>Cà phê Thơ Dũng - Tất cả bài viết</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cà Phê Bột Rang Xay" />
        <meta property="og:description" content="Tất cả các bài viết của cà phê Thơ Dũng" />
        <meta property="og:url" content="https://caphethodung.vn" />
        <meta property="og:site_name" content="Cà Phê Thơ Dũng" />
      </Head>
      <Breadcrumb className="fs--11 mt-3">
        <li className="breadcrumb-item">
          <Link href="/">Trang chủ</Link>
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
                defaultValue="-1">
                <option disabled hidden value="-1">
                  --- Lựa chọn ---
                </option>
                <option value="0">Lượt xem</option>
                <option value="1">Mới nhất</option>
                <option value="2">Cũ nhất</option>
              </select>
            </div>
          </div>
          <Row className="position-relative">
            {list.length > 0 ? (
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
};

export const getStaticProps: GetStaticProps = async () => {
  const posts: IPost[] = await postApi.getAll();
  return {
    props: { posts }
  };
};

export default React.memo(ListAllPost);
