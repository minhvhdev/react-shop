import Header from "components/Header/Header";
import Footer from "pages/layout/Footer";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
const UserRoute = ({ component, ...rest }) => {
  // @ts-ignore
  const token = useSelector((state) => state.logged);
  return (
    <>
      <Header />
      <div className="page-content">
        <Route
          {...rest}
          exact
          render={(props) =>
            rest.role && !token.data ? (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            ) : (
              <div>{React.createElement(component, props)}</div>
            )
          }
        />
      </div>
      <Footer />
    </>
  );
};
export default React.memo(UserRoute);
