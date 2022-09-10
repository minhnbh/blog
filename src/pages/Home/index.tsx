import React, { Fragment } from 'react';
import Categories from './Categories';
import EditorPick from './EditorPick';
import Hero from './HeroSection';
import Inspiration from './Inspiration';
import LatestPosts from './Latest';
import Popular from './Popular';
import TagClouds from './TagClouds';
import Trending from './Trending';
import WidgetAbout from './WidgetAbout';

const Home: React.FC = () => {
  return (
    <Fragment>
      <Hero />
      <div className="mb-5"></div>
      <section className="main-content">
        <div className="container-xl">
          <div className="row gy-4">
            <div className="col-lg-8">
              <EditorPick />
              <div className="mb-5"></div>
              <Trending />
              <div className="mb-5"></div>
              <Inspiration />
              <div className="mb-5"></div>
              <LatestPosts />
              <div className="mb-5"></div>
            </div>
            <div className="col-lg-4">
              <div className="side-bar">
                <WidgetAbout />
                <div className="mb-5"></div>
                <Popular />
                <div className="mb-5"></div>
                <Categories />
                <div className="mb-5"></div>
                <TagClouds />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
