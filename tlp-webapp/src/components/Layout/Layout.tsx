import Head from 'next/head';

import { AppShell, Title } from '@mantine/core';

import { Breadcrumb } from '@/lib/types';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PageTitle from '@/components/common/PageTitle';

import Header from './Header/';
import Navigator from './Navigator';

export interface LayoutProps {
  pageTitle?: string;
  breadcrumbs?: Breadcrumb[];
  children: React.ReactNode;
}

export default function Layout({ pageTitle, breadcrumbs, children }: LayoutProps) {
  return (
    <AppShell
      padding="md"
      navbar={<Navigator />}
      header={<Header />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Head>
        <title>Tekken Learning Platform</title>
      </Head>

      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}

      {pageTitle && <PageTitle>{pageTitle}</PageTitle>}

      {children}
    </AppShell>
  );
}
