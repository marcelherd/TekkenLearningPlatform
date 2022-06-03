import { useState } from 'react';

import { NextComponentType, NextPageContext } from 'next';
import type { AppProps } from 'next/app';

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { setCookies } from 'cookies-next';

import { NextComponentWithLayout } from '@/lib/types';
import Layout from '@/components/Layout';

const queryClient = new QueryClient();

type MyProps = AppProps & {
  colorScheme: ColorScheme;
  Component: NextComponentWithLayout;
};

function MyApp(props: MyProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
            breakpoints: {
              xs: 500,
              sm: 800,
              md: 1000,
              lg: 1200,
              xl: 1400,
            },
          }}
        >
          <Layout pageTitle={Component.pageTitle} breadcrumbs={Component.breadCrumbs}>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

export default MyApp;
