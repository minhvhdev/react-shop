import NullPage from "layouts/NullPage";
import React from "react";
function NullCartItem() {
  return (
    <>
      <p>Bạn chưa thêm bất kì sản phẩm nào !!!</p>
      <NullPage/>
    </>
  );
}

export default React.memo(NullCartItem);
