import React from 'react';

const EditorPickThumb: React.FC = () => {
  return (
    <div className="post">
      <div className="thumb rounded">
        <a href="category.html" className="category-badge position-absolute">
          Lifestyle
        </a>
        <span className="post-format">
          <i className="icon-picture"></i>
        </span>
        <a href="blog-single.html">
          <div className="inner">
            <img
              src="https://images.unsplash.com/photo-1529697216570-f48ef8f6b2dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="post-title"
              className="post-editor"
            />
          </div>
        </a>
      </div>
      <ul className="meta list-inline mt-4 mb-0">
        <li className="list-inline-item">
          <a href="#">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
              className="author"
              alt="author"
            />
            Katen Doe
          </a>
        </li>
        <li className="list-inline-item">29 March 2021</li>
      </ul>
      <h5 className="post-title mb-3 mt-3">
        <a href="blog-single.html">15 Unheard Ways To Achieve Greater Walker</a>
      </h5>
      <p className="excerpt mb-0">
        A wonderful serenity has taken possession of my entire soul, like these
        sweet mornings of spring which I enjoy
      </p>
    </div>
  );
};

export default EditorPickThumb;
