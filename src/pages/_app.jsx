import Layout from "layout/Layout";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { initialAddress } from "redux/slice/addressSlice";
import { initialCart } from "redux/slice/shopcartSlice";
import { initialUser } from "redux/slice/userSlice";
import store from "redux/store";
import "../styles/index.scss";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  useEffect(() => {
    store.dispatch(initialCart());
    store.dispatch(initialUser());
    store.dispatch(initialAddress());
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
