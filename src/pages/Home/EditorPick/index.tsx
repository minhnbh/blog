import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IEditorPickedPosts } from '../types';
import { homeActions } from '../_redux';
import { selectEditorPick } from '../_redux/selectors';
import EditorPickThumb from './EditorPickThumb';

const EditorPick: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading }: IEditorPickedPosts = useSelector(selectEditorPick);

  useEffect(() => {
    dispatch(homeActions.getEditorPickedPosts());
  }, [dispatch]);

  return (
    <div>
      <div className="section-header">
        <h3 className="section-title">Editor’s Pick</h3>
        <img src="images/wave.svg" className="wave" alt="wave" />
      </div>
      <div className={classNames('padding-30 rounded bordered', { loading })}>
        <div className="row gy-5">
          <div className="col-sm-6">
            <EditorPickThumb />
          </div>

          <div className="col-sm-6">
            {data.slice(1).map(item => (
              <div className="post post-list-sm square" key={item.key}>
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
      </div>
    </div>
  );
};

export default EditorPick;
