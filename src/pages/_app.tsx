import Layout from 'layouts/Layout';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { initialCart } from 'redux/slice/shopcartSlice';
import store from 'redux/store';
import '../styles/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  useEffect(() => {
    store.dispatch(initialCart());
  }, []);

  return (
    <>
      <Provider store={store}>
        <Layout loading={loading}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
