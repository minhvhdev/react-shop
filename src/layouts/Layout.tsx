import React, { ReactNode } from 'react';
import { Spin } from 'antd';

import Header from 'components/Header/Header';

import Footer from './Footer';

interface Props {
  loading: boolean;
  children: ReactNode;
}

const Layout = ({ loading, children }: Props) => {
  return (
    <Spin spinning={loading}>
      <Header />
      <main className="page-content">{children}</main>
      <Footer />
    </Spin>
  );
};

export default React.memo(Layout);
