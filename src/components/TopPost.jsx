import { renderImageLink } from "lib/Helper";
import Loading from "layout/Loading";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

function TopPost() {
  // @ts-ignore
  const posts = useSelector((state) => state.posts);
  return (
    <>
      <div id="top-posts" className="col fs--10">
        {posts.status === "loading" ? (
          <Loading type="inline" />
        ) : posts.data.length ? (
          posts.data.slice(-3).map((item, index) => {
            return (
              <Link
                className="card"
                key={index}
                to={"/post?id=" + item.id}
                style={{
                  backgroundImage: `url(${renderImageLink(
                    item.mainImgLink,
                    2
                  )})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundBlendMode: "screen",
                }}
              >
                <p className="card-title m-0">{item.title}</p>
              </Link>
            );
          })
        ) : null}
        <Link href="/tat-ca-bai-viet">
          <a className="d-inline-block fs--10 fw--7 mt-2">
            Xem tất cả bài viết
            <i className="icon-arrow-right vertical-align--bottom"></i>
          </a>
        </Link>
      </div>
      <i className="icon-coffee text-center my-3"></i>
    </>
  );
}

export default TopPost;
