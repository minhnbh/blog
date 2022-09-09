import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import { IInspirationPosts } from '../types';
import { selectInspiration } from '../_redux/selectors';
import { homeActions } from '../_redux';

const Inspiration: React.FC = () => {
  const dispatch = useDispatch();
  const { data }: IInspirationPosts = useSelector(selectInspiration);

  useEffect(() => {
    dispatch(homeActions.getInspirationPosts());
  }, [dispatch]);
  return (
    <div>
      <div className="section-header">
        <h3 className="section-title">Inspiration</h3>
        <img src="images/wave.svg" className="wave" alt="wave" />
        <div className="slick-arrows-top">
          <button
            type="button"
            data-role="none"
            className="carousel-topNav-prev slick-custom-buttons review-swiper-button-prev"
            aria-label="Previous"
          >
            <i className="icon-arrow-left "></i>
          </button>
          <button
            type="button"
            data-role="none"
            className="carousel-topNav-next slick-custom-buttons review-swiper-button-next"
            aria-label="Next"
          >
            <i className="icon-arrow-right"></i>
          </button>
        </div>
      </div>
      <div className="row post-carousel-twoCol post-carousel">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          slidesPerGroup={1}
          modules={[Navigation]}
          navigation={{
            nextEl: '.review-swiper-button-next',
            prevEl: '.review-swiper-button-prev'
          }}
        >
          {data &&
            data.map(item => (
              <SwiperSlide key={item.key}>
                <div className="post post-over-content">
                  <div className="details clearfix">
                    <a href={item.pathCategory} className="category-badge">
                      Inspiration
                    </a>
                    <h4 className="post-title">
                      <a href={item.pathTitle}>{item.title}</a>
                    </h4>
                    <ul className="meta list-inline mb-0">
                      <li className="list-inline-item">
                        <a href="#">Katen Doe</a>
                      </li>
                      <li className="list-inline-item">{item.date}</li>
                    </ul>
                  </div>
                  <a href="blog-single.html">
                    <div className="thumb rounded post-medimum ">
                      <div className="inner">
                        <img
                          src={item.image}
                          alt="thumb"
                          className="post-medimum image"
                        />
                      </div>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Inspiration;
