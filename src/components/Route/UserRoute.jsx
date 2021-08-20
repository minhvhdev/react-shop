import { setUserPage } from "app/slice/pageSlice";
import store from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
const UserRoute = ({ component, ...rest }) => {
  // @ts-ignore
  const token = useSelector((state) => state.logged);
  // @ts-ignore
  const isAdmin = useSelector((state) => state.isAdmin).status;
  if(isAdmin){
    store.dispatch(setUserPage());
  }
  return (
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
  );
};
export default React.memo(UserRoute);
