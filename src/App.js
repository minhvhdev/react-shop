
import { fetchAllPost } from 'app/slice/postsSlice';
import { fetchAllProduct } from 'app/slice/productSlice';
import store from 'app/store';
import AdminRoute from 'components/Route/AdminRoute';
import UserRoute from 'components/Route/UserRoute';
import { VERSION } from 'constants/index';
import AccountPage from 'pages/AccountPage';
import AdminAllOrderPage from 'pages/admin/AdminAllOrderPage';
import AdminOrderPage from 'pages/admin/AdminOrderPage';
import AdminPendingOrderPage from 'pages/admin/AdminPendingOrderPage';
import AdminPromotionPage from 'pages/admin/AdminPromotionPage';
import AdminShippingOrderPage from 'pages/admin/AdminShippingOrderPage';
import AllPostPage from 'pages/AllPostPage';
import AllProductPage from 'pages/AllProductPage';
import CheckOutPage from 'pages/CheckOutPage';
import HomePage from 'pages/HomePage';
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
  useEffect(() => {
    if (productsLen === 0 || isUpdate) {
      store.dispatch(fetchAllProduct());
    }
    if (postsLen === 0 || isUpdate) {
      store.dispatch(fetchAllPost())
    }
  }, [productsLen, postsLen, isUpdate]);
  return (
    <>
      <ReactNotification className="fs--1" />
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
          <AdminRoute exact path="/admin" component={AdminPendingOrderPage} />
          <AdminRoute path="/admin/pendingOrder" component={AdminPendingOrderPage} />
          <AdminRoute path="/admin/order" component={AdminOrderPage} />
          <AdminRoute path="/admin/shippingOrder" component={AdminShippingOrderPage} />
          <AdminRoute path="/admin/allOrder" component={AdminAllOrderPage} />
          <AdminRoute path="/admin/promotion" component={AdminPromotionPage} />
          <UserRoute component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

export default React.memo(App);
