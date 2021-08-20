import { setAdminPage } from "app/slice/pageSlice";
import store from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
const AdminRoute = ({ component, ...rest }) => {
  // @ts-ignore
  const token = useSelector((state) => state.logged);
  // @ts-ignore
  const isAdmin = useSelector((state) => state.isAdmin).status;
  if(!isAdmin){
    store.dispatch(setAdminPage());
  }
  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        token.data && token.data.role === "ROLE_ADMIN" ? (
          <div>{React.createElement(component, props)}</div>
        ) : (
          <Redirect
            to={{
              pathname:"/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default React.memo(AdminRoute);
