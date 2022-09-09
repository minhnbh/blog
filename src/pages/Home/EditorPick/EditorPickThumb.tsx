import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IEditorPickedPosts } from '../types';
import { homeActions } from '../_redux';
import { selectEditorPick } from '../_redux/selectors';

const EditorPickThumb: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading }: IEditorPickedPosts = useSelector(selectEditorPick);
  console.log(data);

  useEffect(() => {
    dispatch(homeActions.getEditorPickedPosts());
  }, [dispatch]);
  return (
    <div className={classNames('post', { loading })}>
      <div className="thumb rounded">
        <a
          href={data[0]?.pathCategory}
          className="category-badge position-absolute"
        >
          {data[0]?.category}
        </a>
        <span className="post-format">
          <i className="icon-picture"></i>
        </span>
        <a href={data[0]?.pathTitle}>
          <div className="inner">
            <img
              src={data[0]?.image}
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
              src={data[0]?.imageAuthor}
              className="post-author image"
              alt="author"
            />
            {data[0]?.author}
          </a>
        </li>
        <li className="list-inline-item">{data[0]?.date}</li>
      </ul>
      <h5 className="post-title mb-3 mt-3">
        <a href={data[0]?.pathTitle}>{data[0]?.title}</a>
      </h5>
      <p className="excerpt mb-0">{data[0]?.description}</p>
    </div>
  );
};

export default EditorPickThumb;
