import AdminHeader from "components/Admin/AdminHeader";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
const AdminRoute = ({ component, ...rest }) => {
  // @ts-ignore
  const token = useSelector((state) => state.logged);
  return (
    <>
      <AdminHeader />
      <div className="page-content">
        <Route
          {...rest}
          exact
          render={(props) =>
            token.data && token.data.role === "ROLE_ADMIN" ? (
              <div>{React.createElement(component, props)}</div>
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      </div>
    </>
  );
};
export default React.memo(AdminRoute);
