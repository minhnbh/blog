import React from 'react';
import EditorPick from './EditorPick';
import NewPosts from './NewPosts';

const Home: React.FC = () => {
  return (
    <section className="main-content">
      <div className="container-xl">
        <NewPosts />
        <div className="row gy-4">
          <div className="col-lg-8">
            <EditorPick />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
