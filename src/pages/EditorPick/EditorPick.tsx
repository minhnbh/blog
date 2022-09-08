import React from 'react';
import { EDITOR_POST } from './constants';
import EditorPickThumb from './EditorPickThumb';

const EditorPick: React.FC = () => {
  return (
    <div>
      <div className="section-header">
        <h3 className="section-title">Editor’s Pick</h3>
        <img src="images/wave.svg" className="wave" alt="wave" />
      </div>
      <div className="padding-30 rounded bordered">
        <div className="row gy-5">
          <div className="col-sm-6">
            <EditorPickThumb />
          </div>
          <div className="col-sm-6">
            {EDITOR_POST &&
              EDITOR_POST.map(item => (
                <div className="post post-list-sm square" key={item.key}>
                  <div className="thumb rounded">
                    <a href={item.path}>
                      <div className="inner">
                        <img
                          src={item.post}
                          alt="post-title"
                          className="post-editor-tabs"
                        />
                      </div>
                    </a>
                  </div>
                  <div className="details clearfix">
                    <h6 className="post-title my-0">
                      <a href={item.path}>{item.title}</a>
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
