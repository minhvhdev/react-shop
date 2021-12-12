import React from "react";
import NullPage from "layout/NullPage";
function NullCartItem() {
  return (
    <>
      <p>Bạn chưa thêm bất kì sản phẩm nào !!!</p>
      <NullPage/>
    </>
  );
}

export default React.memo(NullCartItem);
