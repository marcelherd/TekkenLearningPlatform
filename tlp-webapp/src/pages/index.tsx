import type { NextPage } from 'next';

const Home: NextPage = () => {
  return <div>Hello</div>;
};

export function getServerSideProps() {
  return {
    redirect: {
      destination: '/dashboard',
      permanent: true,
    },
  };
}

export default Home;
