import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICategories } from '../types';
import { homeActions } from '../_redux';
import { selectCategory } from '../_redux/selectors';

const TagClouds: React.FC = () => {
  const dispatch = useDispatch();
  const { data }: ICategories = useSelector(selectCategory) || [];

  useEffect(() => {
    dispatch(homeActions.getCategory());
  }, [dispatch]);
  return (
    <div className="widget rounded">
      <div className="widget-header text-center">
        <h3 className="widget-title">Tag Clouds</h3>
        <img src="images/wave.svg" className="wave" alt="wave" />
      </div>
      <div className="widget-content">
        {data.map(item => (
          <a href="#" className="tag" key={item.name}>
            #{item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TagClouds;
