import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITrending } from '../types';
import { homeActions } from '../_redux';
import { selectTrending } from '../_redux/selectors';

const Trending: React.FC = () => {
  const dispatch = useDispatch();
  const { data }: ITrending = useSelector(selectTrending) || [];
  const firstItem = data[0] || {};
  const secondeItem = data[1] || {};

  useEffect(() => {
    dispatch(homeActions.getTrending());
  }, [dispatch]);
  return (
    <Fragment>
      <div className="section-header">
        <h3 className="section-title">Trending</h3>
        <img src="images/wave.svg" className="wave" alt="wave" />
      </div>

      <div className="padding-30 rounded bordered">
        <div className="row gy-5">
          <div className="col-sm-6">
            <div className="post">
              <div className="thumb rounded">
                <a
                  href={firstItem.pathCategory}
                  className="category-badge position-absolute"
                >
                  {firstItem.category}
                </a>
                <span className="post-format">
                  <i className="icon-picture"></i>
                </span>
                <a href="blog-single.html">
                  <div className="inner">
                    <img
                      src={firstItem.image}
                      alt="post-title"
                      className="post-editor image"
                    />
                  </div>
                </a>
              </div>
              <ul className="meta list-inline mt-4 mb-0">
                <li className="list-inline-item">
                  <a href="#">
                    <img
                      src={firstItem.imageAuthor}
                      className="author post-author image"
                      alt="author"
                    />
                    {firstItem.author}
                  </a>
                </li>
                <li className="list-inline-item">{firstItem.date}</li>
              </ul>
              <h5 className="post-title mb-3 mt-3">
                <a href={firstItem.pathTitle}>{firstItem.title}</a>
              </h5>
              <p className="excerpt mb-0">{firstItem.description}</p>
            </div>
            {data.slice(2, 4).map(item => (
              <div
                className="post post-list-sm square before-seperator"
                key={item.key}
              >
                <div className="thumb rounded">
                  <a href={item.pathTitle}>
                    <div className="inner">
                      <img
                        src={item.image}
                        alt="post-title"
                        className="post-editor-tabs image"
                      />
                    </div>
                  </a>
                </div>
                <div className="details clearfix">
                  <h6 className="post-title my-0">
                    <a href={item.title}>{item.title}</a>
                  </h6>
                  <ul className="meta list-inline mt-1 mb-0">
                    <li className="list-inline-item">{item.date}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="col-sm-6">
            <div className="post">
              <div className="thumb rounded">
                <a
                  href={secondeItem.pathCategory}
                  className="category-badge position-absolute"
                >
                  {secondeItem.category}
                </a>
                <span className="post-format">
                  <i className="icon-earphones"></i>
                </span>
                <a href={secondeItem.pathTitle}>
                  <div className="inner">
                    <img
                      src={secondeItem.image}
                      alt="post-title"
                      className="post-editor image"
                    />
                  </div>
                </a>
              </div>
              <ul className="meta list-inline mt-4 mb-0">
                <li className="list-inline-item">
                  <a href="#">
                    <img
                      src={secondeItem.imageAuthor}
                      className="author post-author image"
                      alt="author"
                    />
                    {secondeItem.author}
                  </a>
                </li>
                <li className="list-inline-item">{secondeItem.date}</li>
              </ul>
              <h5 className="post-title mb-3 mt-3">
                <a href={secondeItem.pathTitle}>{secondeItem.title}</a>
              </h5>
              <p className="excerpt mb-0">{secondeItem.description}</p>
            </div>

            {data.slice(4, 6).map(item => (
              <div
                className="post post-list-sm square before-seperator"
                key={item.key}
              >
                <div className="thumb rounded">
                  <a href={item.pathTitle}>
                    <div className="inner">
                      <img
                        src={item.image}
                        alt="post-title"
                        className="post-editor-tabs image"
                      />
                    </div>
                  </a>
                </div>
                <div className="details clearfix">
                  <h6 className="post-title my-0">
                    <a href={item.title}>{item.title}</a>
                  </h6>
                  <ul className="meta list-inline mt-1 mb-0">
                    <li className="list-inline-item">{item.date}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Trending;
