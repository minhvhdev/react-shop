import React from "react";
import notfound from "assets/img/notfound.gif";
function NullPage() {
  return (
    <div className="d-flex justify-content-center">
      <img src={notfound} alt="not found" height="300px" />
    </div>
  );
}

export default NullPage;
