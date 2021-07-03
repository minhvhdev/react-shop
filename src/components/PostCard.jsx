import { comma, formatDateTime, renderImageLink } from "lib/Helper";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {BsEye, BsClock} from "react-icons/bs"

import PropTypes from "prop-types";

function PostCard(props) {
  const post = props.post;
  return (
    <Card className="post-card">
      <Link to={"/post?id=" + post.id}>
        <Card.Img variant="top" src={renderImageLink(post.mainImgLink, 3)} />
      </Link>
      <Link className="text-decoration-none " to={"post?id=" + post.id}>
        <Card.Body>
          <p className="text-dark min-line--2 fs--8">{post.title}</p>
          <div className="d-flex text-muted justify-content-between">
            <div><BsClock className="icon"/> {formatDateTime(post.createDate,false)}</div>
            <div><BsEye className="icon fs--8"/> {post.numView}</div>
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
