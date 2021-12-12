import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="Cà phê nguyên chất Thơ Dũng"
            content="Mua bán và tin tức về cà phê. Bán các loại cà phê rang xay bột hạt thương hiệu cà phê nguyên chất Thơ Dũng"
          />
          <link rel="apple-touch-icon" href="logo192.png" />
          <link rel="manifest" href="manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
