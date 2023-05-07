import Header from "components/Header/Header";
import { useRouter } from "next/router";
import React from "react";
import Footer from "./Footer";
import Loading from "./Loading";

function Layout({ loading, children }) {
  const router = useRouter();
  const path = router.asPath;
  return (
    <>
      {loading ? (
        <div className="back-drop">
          <Loading />
        </div>
      ) : null}
      <Header />
      <main className="page-content">{children}</main>
      <Footer />
    </>
  );
}

export default React.memo(Layout);
