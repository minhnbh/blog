import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IPost } from '../types';
import { homeActions } from '../_redux';
import classNames from 'classnames';

const LatestPost: React.FC<{ item: IPost }> = ({ item }) => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    dispatch(homeActions.getLatestPosts());
  }, [dispatch]);
  return (
    <div className="col-md-12 col-sm-6">
      <div className="post post-list clearfix">
        <div className="thumb rounded">
          <span className="post-format-sm">
            <i className="icon-picture"></i>
          </span>
          <a href={item.pathTitle}>
            <div className="inner">
              <img
                src={item.image}
                alt="post-title"
                className="post-editor image"
              />
            </div>
          </a>
        </div>
        <div className="details">
          <ul className="meta list-inline mb-3">
            <li className="list-inline-item">
              <a href="#">
                <img
                  src={item.imageAuthor}
                  className="author post-author image"
                  alt="author"
                />
                {item.author}
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">{item.category}</a>
            </li>
            <li className="list-inline-item">{item.date}</li>
          </ul>
          <h5 className="post-title">
            <a href={item.pathTitle}>{item.title}</a>
          </h5>
          <p className="excerpt mb-0">{item.description}</p>
          <div className="post-bottom clearfix d-flex align-items-center">
            <div className="social-share me-auto">
              <button
                className={classNames('toggle-button', {
                  'icon-share': showDropdown === false,
                  'icon-close': showDropdown === true
                })}
                onClick={handleShowDropdown}
              ></button>
              <ul
                className={classNames('icons list-unstyled list-inline mb-0', {
                  visible: showDropdown === true
                })}
              >
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-telegram-plane"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="far fa-envelope"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="more-button float-end">
              <a href={item.pathTitle}>
                <span className="icon-options"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestPost;
