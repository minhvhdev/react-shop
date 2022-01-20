import Router from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import "../styles/index.scss";
import { Provider } from "react-redux";
import store from "app/store";
import Layout from "layout/Layout";
import { initialUser } from "app/slice/userSlice";
import { initialCart, socialAsyncCart } from "app/slice/shopcartSlice";
import ReactNotification from "react-notifications-component";
import { initialAddress, socialAsyncAddress } from "app/slice/addressSlice";

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
        <ReactNotification className="fs--1" />
        <Layout loading={loading}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
