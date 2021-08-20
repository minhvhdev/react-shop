import { formatDateTime, renderImageLink } from "lib/Helper";
import PropTypes from "prop-types";
import React from "react";
import { Card } from "react-bootstrap";
import { BsClock, BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";

function PostCard(props) {
  const post = props.post;
  return (
    <Card>
      <Link to={"/post?id=" + post.id}>
        <div className="image-wrapper">
          <img alt="Cà phê Thơ Dũng" src={renderImageLink(post.mainImgLink, 3)} />
        </div>
      </Link>
      <Link className="text-decoration-none " to={"post?id=" + post.id}>
        <Card.Body>
          <p className="text-dark min-line--2 fs--8">{post.title}</p>
          <div className="d-flex text-muted justify-content-between">
            <div>
              <BsClock className="icon" />{" "}
              {formatDateTime(post.createDate, false)}
            </div>
            <div>
              <BsEye className="icon fs--8" /> {post.numView}
            </div>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default React.memo(PostCard);
