import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

const MyDocument = () => {
  return (
    <Html>
      <Head><meta charSet="utf-8" />
          <link rel="apple-touch-icon" href="logo192.png" />
          <link rel="manifest" href="manifest.json" />
          </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx)
  return { ...initialProps }
}

export default MyDocument