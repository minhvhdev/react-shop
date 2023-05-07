import React from "react";
import Image from "next/image"
function NullPage() {
  return (
    <div className="d-flex justify-content-center">
      <Image src="/statics/img/notfound.gif" alt="not found" width="300" height="300"/>
    </div>
  );
}

export default NullPage;
