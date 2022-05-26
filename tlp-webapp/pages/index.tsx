import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Code, Text } from '@mantine/core';
import Card from '../components/Card';
import Grid from '../components/Grid';

const Home: NextPage = () => {
  return (
    <Box
      component="main"
      sx={{
        paddingLeft: '2rem',
        paddingRight: '2rem',
      }}
    >
      <Head>
        <title>Tekken Learning Platform</title>
      </Head>

      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          sx={{
            color: '#0070f3',
            fontSize: '2rem',
            '@media (min-width: 800px)': {
              fontSize: '3rem',
            },
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </Text>

        <Text
          sx={{
            color: 'black',
            fontSize: '0.9rem',
            '@media (min-width: 700px)': {
              fontSize: '1.2rem',
            },
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          Get started by editing{' '}
          <Code
            sx={{
              color: 'black',
              fontSize: '0.8rem',
              textAlign: 'center',
            }}
          >
            pages/index.tsx
          </Code>
        </Text>

        <Grid>
          <Card
            title="Documentation &rarr;"
            description="Find in-depth information about Next.js features and API."
            link="https://nextjs.org/docs"
          />
          <Card
            title="Learn &rarr;"
            description="Learn about Next.js in an interactive course with quizzes!"
            link="https://nextjs.org/learn"
          />
          <Card
            title="Examples &rarr;"
            description="Discover and deploy boilerplate example Next.js projects."
            link="https://nextjs.org/examples"
          />
          <Card
            title="Deploy &rarr;"
            description="Instantly deploy your Next.js site to a public URL with Vercel."
            link="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          />
        </Grid>
      </Box>

      <Box
        component="footer"
        sx={{
          display: 'flex',
          flex: '1',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          borderTop: '1px solid #eaeaea',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Box component="span" sx={{ height: '1rem', marginLeft: '1.5rem' }}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </Box>
        </a>
      </Box>
    </Box>
  );
};

export default Home;
