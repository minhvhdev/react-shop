import { socialLogin } from "app/slice/headerSlice";
import store from "app/store";
import queryString from "query-string";
import React from "react";
import { Redirect } from "react-router-dom";

function OAuth2RedirectHandler(props) {
  const response = queryString.parse(props.location.search);
  // @ts-ignore
  store.dispatch(socialLogin(response));
  return (
    <>
      (
      <Redirect
        to={{
          pathname: localStorage.getItem("_pathname"),
          search: localStorage.getItem("_search"),
          state: { from: props.location },
        }}
      />
      )
    </>
  );
}

export default OAuth2RedirectHandler;
