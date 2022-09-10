import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICategories } from '../types';
import { homeActions } from '../_redux';
import { selectCategory } from '../_redux/selectors';

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const { data }: ICategories = useSelector(selectCategory) || [];

  useEffect(() => {
    dispatch(homeActions.getCategory());
  }, [dispatch]);
  return (
    <div className="widget rounded">
      <div className="widget-header text-center">
        <h3 className="widget-title">Explore Topics</h3>
        <img src="images/wave.svg" className="wave" alt="wave" />
      </div>
      <div className="widget-content">
        <ul className="list">
          {data.map(item => (
            <li key={item.name}>
              <a href="#">{item.name}</a>
              <span>({item.quality})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
