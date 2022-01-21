import { convertToUrl, renderImageLink } from "lib/Helper";
import Loading from "layout/Loading";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

function TopPost({ posts }) {
  return (
    <>
      <div id="top-posts" className="col fs--10">
        {posts.slice(-3).map((item, index) => {
          return (
            <Link
              key={index}
              href={convertToUrl(`bai-viet/${item.title}-${item.id}`)}
            >
              <a
                className="card"
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
              </a>
            </Link>
          );
        })}
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
