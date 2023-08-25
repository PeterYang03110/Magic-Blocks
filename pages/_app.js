import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { AuthProvider } from 'contexts/auth-context';
import { WalletProvider } from 'contexts/wallet-context';
import { PopupProvider } from 'contexts/popup-context';
import { ContractProvider } from 'contexts/contract-context';
import { PriceProvider } from 'contexts/price-context';
import FiefWeb3Provider from 'utils/hocs/FiefWeb3Provider';
import InterceptorProvider from 'utils/hocs/InterceptorProvider';
import ToastProvider from 'utils/hocs/ToastProvider';
import { AvatarProvider } from 'contexts/avatar-context';
import { AssetsProvider } from 'contexts/asset-context';
import * as COMMON_CONSTANTS from 'utils/constants/common';
import { BANNER_IMAGE_PATH } from 'utils/constants/image-paths';
import theme from 'styles/theme';
import Layout from 'Layout';
import 'react-loading-skeleton/dist/skeleton.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{COMMON_CONSTANTS.TITLE}</title>
        <meta charSet='utf-8' />
        <meta name='keywords' content='Keywords' />
        <meta name='description' content='Description' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='theme-color' content='#FFFFFF' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
        />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content={COMMON_CONSTANTS.SITE_URL} />
        <meta property='og:title' content={COMMON_CONSTANTS.TITLE} />
        <meta property='og:description' content={COMMON_CONSTANTS.DESCRIPTION} />
        <meta property='og:image' content={BANNER_IMAGE_PATH} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='628' />

        {/* Twitter */}
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={COMMON_CONSTANTS.SITE_URL} />
        <meta property='twitter:title' content={COMMON_CONSTANTS.TITLE} />
        <meta property='twitter:description' content={COMMON_CONSTANTS.DESCRIPTION} />
        <meta property='twitter:image' content={BANNER_IMAGE_PATH} />

        <meta name='msapplication-config' content='/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='msapplication-TileImage' content='/mstile-144x144.png' />
      </Head>
      <FiefWeb3Provider>
        <ThemeProvider theme={theme}>
          <ToastProvider />
            <WalletProvider>
              <PopupProvider>
                <AuthProvider>
                  <InterceptorProvider />
                  <PriceProvider>
                    <ContractProvider>
                      <AssetsProvider>
                        <CssBaseline />
                        <Layout>
                          <AvatarProvider>
                            <Component {...pageProps} />
                          </AvatarProvider>
                        </Layout>
                      </AssetsProvider>
                    </ContractProvider>
                  </PriceProvider>
                </AuthProvider>
              </PopupProvider>
            </WalletProvider>
        </ThemeProvider>
      </FiefWeb3Provider>
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default MyApp;
