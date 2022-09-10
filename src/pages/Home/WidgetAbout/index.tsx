import React from 'react';

const WidgetAbout: React.FC = () => {
  return (
    <div className="widget rounded">
      <div
        className="widget-about data-bg-image text-center"
        style={{ backgroundImage: 'url(' + 'images/map-bg.png' + ')' }}
      >
        <p className="mb-4">
          Hello, We’re content writer who is fascinated by content fashion,
          celebrity and lifestyle. We helps clients bring the right content to
          the right people.
        </p>
        <ul className="social-icons list-unstyled list-inline mb-0">
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
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WidgetAbout;
