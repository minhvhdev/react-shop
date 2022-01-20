import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "components/Header/Header";
import Footer from "./Footer";
import Loading from "./Loading";
import AdminHeader from "./AdminHeader";
import { useSelector } from "react-redux";
import store from "app/store";
import { initialUser } from "app/slice/userSlice";

function Layout({ loading, children }) {
  const router = useRouter();
  const path = router.asPath;
  const isAdmin = path.includes("admin");
  const isUser = path.includes("user");
  const logged = useSelector((state) => state.logged);
  useEffect(() => {
    if (logged.status === "loaded") {
      if (
        (isAdmin && logged?.data?.role !== "ROLE_ADMIN") ||
        (isUser && !logged.data)
      ) {
        router.push("/");
      }
    }
  }, [logged, isAdmin, isUser, router]);
  return (
    <>
      {loading ? (
        <div className="back-drop">
          <Loading />
        </div>
      ) : null}
      {isAdmin ? (
        <>
          {logged && (
            <>
              <AdminHeader />
              <main className="page-content">{children}</main>
            </>
          )}
        </>
      ) : (
        <>
          <Header />
          <main className="page-content">{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}

export default React.memo(Layout);
