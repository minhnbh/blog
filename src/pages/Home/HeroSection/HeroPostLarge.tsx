import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IHeroPostLarge } from '../types';
import { homeActions } from '../_redux';
import { selectPostLarge } from '../_redux/selectors';

const HeroPostLarge: React.FC = () => {
  const dispatch = useDispatch();
  const { data }: IHeroPostLarge = useSelector(selectPostLarge);

  useEffect(() => {
    dispatch(homeActions.getHeroPostLarge());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="post featured-post-lg">
        <div className="details clearfix">
          <a href={data.pathCategory} className="category-badge">
            {data.category}
          </a>
          <h2 className="post-title">
            <a href={data.pathTitle}>{data.title}</a>
          </h2>
          <ul className="meta list-inline mb-0">
            <li className="list-inline-item">
              <a href="#">{data.author}</a>
            </li>
            <li className="list-inline-item">{data.date}</li>
          </ul>
        </div>
        <a href={data.pathTitle}>
          <div className="thumb rounded">
            <div
              className="inner data-bg-image"
              style={{
                backgroundImage: 'url(' + `${data.image}` + ')'
              }}
            ></div>
          </div>
        </a>
      </div>
    </Fragment>
  );
};

export default HeroPostLarge;
