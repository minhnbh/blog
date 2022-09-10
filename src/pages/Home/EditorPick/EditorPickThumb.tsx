import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IEditorPickedPosts } from '../types';
import { homeActions } from '../_redux';
import { selectEditorPick } from '../_redux/selectors';

const EditorPickThumb: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading }: IEditorPickedPosts = useSelector(selectEditorPick);
  const firstItem = data[0] || {};

  useEffect(() => {
    dispatch(homeActions.getEditorPickedPosts());
  }, [dispatch]);
  return (
    <div className={classNames('post', { loading })}>
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
        <a href={firstItem.pathTitle}>
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
              className="post-author image"
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
  );
};

export default EditorPickThumb;
