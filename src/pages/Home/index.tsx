import React from 'react';
import EditorPick from './EditorPick';
import Hero from './HeroSection';
import Inspiration from './Inspiration';
import Trending from './Trending/Trending';

const Home: React.FC = () => {
  return (
    <section className="main-content">
      <div className="container-xl">
        <Hero />
        <div className="mb-5"></div>
        <div className="row gy-4">
          <div className="col-lg-8">
            <EditorPick />
            <div className="mb-5"></div>
            <Trending />
            <div className="mb-5"></div>
            <Inspiration />
            <div className="mb-5"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
