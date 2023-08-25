import { Fragment } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { ServerStyleSheets } from '@material-ui/core/styles';

import globalStyles from 'styles/global';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        <Fragment key='styles'>
          {initialProps.styles}
          {sheets.getStyleElement()}
        </Fragment>,
      ],
    };
  }

  render() {
    return (
      <Html lang='en' style={{ scrollBehavior: 'smooth' }}>
        <Head>
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='preload' href='/assets/fonts/Inter.ttf' as='font' crossOrigin='anonymous' />
          <link
            rel='preload'
            href='/assets/fonts/Inter-Bold.ttf'
            as='font'
            crossOrigin='anonymous'
          />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='apple-touch-icon' sizes='120x120' href='/apple-touch-icon.png' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
          <link
            href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap'
            rel='stylesheet'
          />
          <link rel='stylesheet' href='https://use.typekit.net/wpb6qgz.css' />

          <link
            rel='stylesheet'
            type='text/css'
            charSet='UTF-8'
            href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
          />
          <link
            rel='stylesheet'
            type='text/css'
            href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
          />

          <style jsx global>
            {globalStyles}
          </style>

          {/* Google Tag Manager */}
          <Script
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5T4V8XT');`,
            }}
          />
          {/* End Google Tag Manager */}
          <Script strategy='afterInteractive' src='/js/lubenda.js' />
          <Script strategy='afterInteractive' src='https://cdn.iubenda.com/cs/ccpa/stub.js' />
          <Script strategy='afterInteractive' src='https://cdn.iubenda.com/cs/iubenda_cs.js' />
        </Head>
        <body id='body'>
          {/*  Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5T4V8XT"
              height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
            }}
          />
          {/* End  Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
