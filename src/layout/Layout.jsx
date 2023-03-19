import Header from "components/Header/Header";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";
import Loading from "./Loading";

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
