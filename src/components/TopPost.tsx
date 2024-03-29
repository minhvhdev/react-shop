import { useMemo } from 'react';
import { IPost } from '@types';
import { convertToUrl, renderImageLink } from 'helper';
import Link from 'next/link';

interface Props {
  posts: IPost[];
}

function TopPost({ posts }: Props) {
  const renderPosts = useMemo(() => {
    if (posts.length <= 3) return posts;
    return posts.slice(-3);
  }, [posts]);

  return (
    <>
      <div id="top-posts" className="col fs--10">
        {renderPosts.map((item, index) => {
          return (
            <Link
              key={index}
              href={convertToUrl(`bai-viet/${item.title}-${item.id}`)}
              className="card"
              style={{
                backgroundImage: `url(${renderImageLink(item.mainImgLink, 2)})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundBlendMode: 'screen'
              }}>
              <p className="card-title m-0">{item.title}</p>
            </Link>
          );
        })}
        <Link href="/tat-ca-bai-viet" className="d-inline-block fs--10 fw--7 mt-2">
          Xem tất cả bài viết
          <i className="icon-arrow-right vertical-align--bottom"></i>
        </Link>
      </div>
      <i className="icon-coffee text-center my-3"></i>
    </>
  );
}

export default TopPost;
