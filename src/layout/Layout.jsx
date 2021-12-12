import Header from "components/Header/Header";
import Footer from "./Footer";
import Loading from "./Loading";

function Layout({ loading, children }) {
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

export default Layout;
