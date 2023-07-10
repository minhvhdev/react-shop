import Image from 'next/image';
import React from 'react';

const NullPage: React.FC = () => {
  return (
    <div className="d-flex justify-content-center">
      <Image src="/statics/images/notfound.gif" alt="not found" width="300" height="300" />
    </div>
  );
};

export default NullPage;
