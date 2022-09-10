import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IHeroPopular } from '../types';
import { homeActions } from '../_redux';
import { selectPopular } from '../_redux/selectors';

const Popular: React.FC = () => {
  const dispatch = useDispatch();
  const { data }: IHeroPopular = useSelector(selectPopular) || [];

  useEffect(() => {
    dispatch(homeActions.getHeroPopular());
  }, [dispatch]);
  return (
    <div className="widget rounded">
      <div className="widget-header text-center">
        <h3 className="widget-title">Popular Posts</h3>
        <img src="images/wave.svg" className="wave" alt="wave" />
      </div>
      <div className="widget-content">
        {data.slice(0, 3).map((item, index) => (
          <div className="post post-list-sm circle" key={item.key}>
            <div className="thumb circle">
              <span className="number">{index + 1}</span>
              <a href={item.pathTitle}>
                <div className="inner">
                  <img
                    src={item.image}
                    alt="post-title"
                    className="post-circle image"
                  />
                </div>
              </a>
            </div>
            <div className="details clearfix">
              <h6 className="post-title my-0">
                <a href={item.pathTitle}>{item.title}</a>
              </h6>
              <ul className="meta list-inline mt-1 mb-0">
                <li className="list-inline-item">{item.date}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
