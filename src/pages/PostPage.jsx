import React from "react";
import queryString from "query-string";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Loading from "../layout/Loading";
import NotFound from "../layout/NotFound";
import { formatDateTime, renderImageLink } from "lib/Helper";
import {
  AiOutlineClockCircle,
  AiOutlineEye,
  AiOutlineFacebook,
} from "react-icons/ai";
function PostPage() {
  const param = queryString.parse(window.location.hash);
  const url = window.location.href;
  const postId = param["post?id"];
  // @ts-ignore
  const posts = useSelector((state) => state.posts);
  let post = posts.data.filter((value) => {
    return value.id === +postId;
  })[0];
  return (
    <div className="post-page__bg">
      {posts.status === "loading" ? (
        <Loading />
      ) : post ? (
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
              <img alt="Cà phê Thơ Dũng" src={renderImageLink(post.mainImgLink, 4)} />
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

export default React.memo(PostPage);
