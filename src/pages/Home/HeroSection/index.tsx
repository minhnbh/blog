import React, { useState } from 'react';
// import HeroPopular from './HeroPopular';
import HeroPostLarge from './HeroPostLarge';
import HeroRecent from './HeroRecent';
import classNames from 'classnames';
import HeroPopular from './HeroPopular';

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const POPULAR = 'popular';
  const RECENT = 'recent';
  const handleClickPopular = () => {
    setActiveTab(POPULAR);
  };
  const handleClickRecent = () => {
    setActiveTab(RECENT);
  };
  return (
    <section id="hero">
      <div className="container-xl">
        <div className="row gy-4">
          <div className="col-lg-8">
            <HeroPostLarge />
          </div>

          <div className="col-lg-4">
            <div className="post-tabs rounded bordered">
              <ul className="nav nav-tabs nav-pills nav-fill" id="postsTab">
                <li className="nav-item">
                  <button
                    className={classNames('nav-link', {
                      active: activeTab === POPULAR
                    })}
                    id="popular-tab"
                    type="button"
                    onClick={handleClickPopular}
                  >
                    Popular
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={classNames('nav-link', {
                      active: activeTab === RECENT
                    })}
                    id="recent-tab"
                    type="button"
                    onClick={handleClickRecent}
                  >
                    Recent
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="postsTabContent">
                {activeTab === POPULAR ? <HeroPopular /> : <HeroRecent />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
