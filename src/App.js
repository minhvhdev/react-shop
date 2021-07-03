import { unwrapResult } from '@reduxjs/toolkit';
import { fetchAllPost } from 'app/slice/postsSlice';
import { fetchAllProduct } from 'app/slice/productSlice';
import Header from 'components/Header/Header';
import OAuth2RedirectHandler from 'components/OAuth2RedirectHandler';
import AccountPage from 'pages/AccountPage';
import AllPostPage from 'pages/AllPostPage';
import AllProductPage from 'pages/AllProductPage';
import CheckOutPage from 'pages/CheckOutPage';
import HomePage from 'pages/HomePage';
import Footer from 'pages/layout/Footer';
import Loading from 'pages/layout/Loading';
import NotFound from 'pages/layout/NotFound';
import ScrollToTop from 'pages/layout/ScrollToTop';
import ProductPage from 'pages/ProductPage';
import ShopcartPage from 'pages/ShopcartPage';
import SignUpPage from 'pages/SignUpPage';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
function App() {
  const dispatch = useDispatch();
  // @ts-ignore
  const products = useSelector((state) => state.products);
  // @ts-ignore
  const posts = useSelector((state) => state.posts);
  const productsLen = products.data.length;
  const postsLen = posts.data.length;
  useEffect(() => {
    if (productsLen === 0) {
      // @ts-ignore
      dispatch(fetchAllProduct()).then(unwrapResult);
    }
    if (postsLen === 0) {
      // @ts-ignore
      dispatch(fetchAllPost()).then(unwrapResult);
    }
  }, [productsLen, postsLen, dispatch]);
  return (
    <div className="App">
      <Header />
      <div className="page-content">
        {console.log("Render APP")}
        <Suspense fallback={<Loading />}>
          <ScrollToTop/>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/product" component={ProductPage} />
            <Route path="/shopcart" component={ShopcartPage} />
            <Route path="/checkout" component={CheckOutPage} />
            <Route path="/allPost" component={AllPostPage} />
            <Route path="/allProduct" component={AllProductPage} />
            <Route path="/account" component={AccountPage} />
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default React.memo(App);
