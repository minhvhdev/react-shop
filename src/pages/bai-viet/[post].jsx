import PostApi from "api/PostApi";
import {
  convertToUrl,
  formatDateTime,
  getIdFromUrl,
  renderImageLink,
  shortDescriptionProduct,
} from "lib/Helper";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  AiOutlineClockCircle,
  AiOutlineEye,
  AiOutlineFacebook,
} from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import NotFound from "../../layout/NotFound";
function PostPage({ post }) {
  console.log(post);
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <div className="post-page__bg">
      <Head>
        <title>{post.title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:image"
          content={renderImageLink(post.mainImgLink, 4)}
          data-rh="true"
        />
        <meta
          property="og:description"
          content={shortDescriptionProduct(post.content)}
        />
        <meta property="og:url" content="https://caphethodung.vn" />
        <meta property="og:site_name" content="Cà Phê Thơ Dũng" />
      </Head>
      {post ? (
        <Container className="post-page__container fs--8">
          <h1 className="post-page__title">{post.title}</h1>
          <div className="post-page__info">
            <span>
              <AiOutlineClockCircle className="icon" />{" "}
              {formatDateTime(post.createDate, false)}
            </span>
            <span>
              <AiOutlineEye className="icon" /> {post.numView}
            </span>
            <a
              rel="noreferrer"
              target="_blank"
              href={`http://www.facebook.com/sharer/sharer.php?u=${url}`}
            >
              <AiOutlineFacebook className="icon" />
            </a>
          </div>
          <div className="post-page__content">
            <div className="image-wrapper post-page__content--main-img">
              <img
                alt="Cà phê Thơ Dũng"
                src={renderImageLink(post.mainImgLink, 4)}
              />
            </div>
            <br />
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </Container>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const postId = getIdFromUrl(params.post);
  const posts = await PostApi.getAll();
  const post = posts.filter((el) => el.id == postId)[0];
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await PostApi.getAll();
  const paths = posts.map((post) => ({
    params: { post: convertToUrl(`${post.title}-${post.id}`) },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default React.memo(PostPage);
