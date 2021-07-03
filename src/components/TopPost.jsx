import { renderImageLink, sortJSON } from "lib/Helper";
import Loading from "pages/layout/Loading";
import React from "react";
import { useSelector } from "react-redux";

function TopPost() {
  // @ts-ignore
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <>
      <div id="top-posts" className="col fs--10">
        {posts.status === "loading" ? (
          <Loading type="inline" />
        ) : posts.data.length ? (
          posts.data.slice(-3).map((item, index) => {
            return (
              <a
                className="card"
                key={index}
                href={"/post?id=" + item.id}
                style={{
                  backgroundImage: `url(${renderImageLink(item.mainImgLink, 2)})`,
                  backgroundSize:"cover",
                  backgroundRepeat:"no-repeat",
                  backgroundBlendMode: "screen",
                }}
              >
                <p className="card-title">{item.title}</p>
                {/* <img src={renderImageLink(item.mainImgLink, 2)} alt="" /> */}
              </a>
            );
          })
        ) : null}
        <a
          href="/page/all-posts.html"
          className="d-inline-block fs--10 fw--7 mt-2"
        >
          Xem tất cả bài viết
          <i className="icon-arrow-right vertical-align--bottom"></i>
        </a>
      </div>
      <i className="icon-coffee text-center my-3"></i>
    </>
  );
}

export default TopPost;
