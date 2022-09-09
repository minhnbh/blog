import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IHeroRecent } from '../types';
import { homeActions } from '../_redux';
import { selectRecent } from '../_redux/selectors';

const HeroRecent: React.FC = () => {
  const dispatch = useDispatch();
  const { data }: IHeroRecent = useSelector(selectRecent);

  useEffect(() => {
    dispatch(homeActions.getHeroRecent());
  }, [dispatch]);
  return (
    <div className="tab-pane fade show active" id="recent">
      {data &&
        data.map(item => (
          <div className="post post-list-sm circle" key={item.key}>
            <div className="thumb circle">
              <a href={item.pathTitle}>
                <div className="inner post-circle">
                  <img src={item.image} alt="post-title" className="image" />
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
  );
};

export default HeroRecent;
