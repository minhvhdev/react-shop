
import { fetchAllPost } from 'app/slice/postsSlice';
import { fetchAllProduct } from 'app/slice/productSlice';
import store from 'app/store';
import Header from 'components/Header/Header';
import AdminRoute from 'components/Route/AdminRoute';
import UserRoute from 'components/Route/UserRoute';
import { VERSION } from 'constants/index';
import AccountPage from 'pages/AccountPage';
import AdminPage from 'pages/admin/AdminPage';
import AllPostPage from 'pages/AllPostPage';
import AllProductPage from 'pages/AllProductPage';
import CheckOutPage from 'pages/CheckOutPage';
import HomePage from 'pages/HomePage';
import Footer from 'pages/layout/Footer';
import Loading from 'pages/layout/Loading';
import NotFound from 'pages/layout/NotFound';
import ScrollToTop from 'pages/layout/ScrollToTop';
import LikedProductPage from 'pages/LikedProductPage';
import MyOrdersPage from 'pages/MyOrdersPage';
import PostPage from 'pages/PostPage';
import ProductPage from 'pages/ProductPage';
import ShopcartPage from 'pages/ShopcartPage';
import SignUpPage from 'pages/SignUpPage';
import React, { Suspense, useEffect } from 'react';
import ReactNotification from "react-notifications-component";
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import './App.scss';
function App() {
  // @ts-ignore
  const products = useSelector((state) => state.products);
  const version = localStorage.getItem("_version");
  const isUpdate = !(version === VERSION);
  localStorage.setItem("_version", VERSION)
  // @ts-ignore
  const posts = useSelector((state) => state.posts);
  const productsLen = products.data.length;
  const postsLen = posts.data.length;
  // @ts-ignore
  const isAdmin = useSelector((state) => state.isAdmin).status;
  useEffect(() => {
    if (productsLen === 0 || isUpdate) {
      store.dispatch(fetchAllProduct());
    }
    if (postsLen === 0 || isUpdate) {
      store.dispatch(fetchAllPost())
    }
  }, [productsLen, postsLen, isUpdate]);
  return (
    <div className="App">
      {isAdmin ? null : <Header />}
      <ReactNotification className="fs--1" />
      <div className={isAdmin ? null : "page-content"}>
        {console.log("Render APP")}
        <Suspense fallback={<Loading />}>
          <ScrollToTop />
          <Switch>
            <UserRoute exact path="/" component={HomePage} />
            <UserRoute path="/signup" component={SignUpPage} />
            <UserRoute path="/product" component={ProductPage} />
            <UserRoute path="/post" component={PostPage} />
            <UserRoute path="/shopcart" component={ShopcartPage} />
            <UserRoute path="/checkout" component={CheckOutPage} />
            <UserRoute path="/allPost" component={AllPostPage} />
            <UserRoute path="/allProduct" component={AllProductPage} />
            <UserRoute role={true} path="/myfavs" component={LikedProductPage} />
            <UserRoute role={true} path="/myOrder" component={MyOrdersPage} />
            <UserRoute role={true} path="/myAccount" component={AccountPage} />
            <AdminRoute exact path="/admin" component={AdminPage} />
            <UserRoute component={NotFound} />
          </Switch>
        </Suspense>
      </div>
      {isAdmin ? null : <Footer />}
    </div>
  );
}

export default React.memo(App);
