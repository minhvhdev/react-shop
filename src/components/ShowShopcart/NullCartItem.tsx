import React from 'react';
import NullPage from 'layouts/NullPage';

const NullCartItem: React.FC = () => {
  return (
    <>
      <p>Bạn chưa thêm bất kì sản phẩm nào !!!</p>
      <NullPage />
    </>
  );
};

export default React.memo(NullCartItem);
