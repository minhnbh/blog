import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILatestPosts } from '../types';
import { homeActions } from '../_redux';
import { selectLatest } from '../_redux/selectors';
import LatestPost from './LatestPost';

const LatestPosts: React.FC = () => {
  const dispatch = useDispatch();
  const { data }: ILatestPosts = useSelector(selectLatest) || [];

  useEffect(() => {
    dispatch(homeActions.getLatestPosts());
  }, [dispatch]);
  return (
    <Fragment>
      <div className="section-header">
        <h3 className="section-title">Latest Posts</h3>
        <img src="images/wave.svg" className="wave" alt="wave" />
      </div>

      <div className="padding-30 rounded bordered">
        <div className="row">
          {data.map(item => (
            <LatestPost key={item.key} item={item}></LatestPost>
          ))}

          <div className="text-center">
            <button className="btn btn-simple">Load More</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LatestPosts;
