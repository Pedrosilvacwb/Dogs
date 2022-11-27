import React from 'react';
import Feed from './Feed/Feed';
import Head from './Helper/Head';

const Home = () => {
  return (
    <section className="container containerMain">
      <Head title="Fotos" />
      <Feed />
    </section>
  );
};

export default Home;
