import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import bee from '@/assets/bee.png';
import grid from '@/assets/grid.png';

const BannerSlider = () => {
    return (
        <StyledSwiper
            loop={true}
            modules={[Pagination]}
            centeredSlides={true}
            slidesPerView={1}
            speed={800}
            spaceBetween={-10} 
            pagination={{ clickable: true }}
        >
            <StyledSwiperSlide>
                <BeeImage src={bee} alt="bee img" />
                <GridImage src={grid} alt="grid img" />
                <span>Пройдите опрос</span>
                <h2>Почему именно пчёл?</h2>
            </StyledSwiperSlide>
            <StyledSwiperSlide>
                <span>Пройдите опрос</span>
                <h2>Почему именно пчёл?</h2>
            </StyledSwiperSlide>
            <StyledSwiperSlide>
                <span>Пройдите опрос</span>
                <h2>Почему именно пчёл?</h2>
            </StyledSwiperSlide>
            <StyledSwiperSlide>
                <span>Пройдите опрос</span>
                <h2>Почему именно пчёл?</h2>
            </StyledSwiperSlide>
        </StyledSwiper>
    );
};

const StyledSwiper = styled(Swiper)`
  padding: 0 24px 20px;

  .swiper-slide {
    transform: scale(0.90);
    opacity: 0.6;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .swiper-slide-active {
    transform: scale(1);
    opacity: 1;
  }
  .swiper-pagination {
    bottom: 0px;
  }

  .swiper-pagination-bullet {
    width: 8px;
    height: 4px;
    background: #6A7080;
    opacity: 0.5;
    border-radius: 16px;
    margin: 0 2px !important;
    transition: width 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    width: 32px;
    height: 4px;
    background-color: #FFB81A;
  }
`;
const StyledSwiperSlide = styled(SwiperSlide)`
  position: relative;
  box-sizing: border-box;
  padding: 24px 24px 42px;
  background-color: #1F222B;
  border: 1px solid #272A33;
  border-radius: 16px;
  cursor: grab;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 32px;
    height: 32px;
    background: radial-gradient(circle at center, #FFD26D, #FFB81A);
    filter: blur(32px);
  }
  &::after {
    content: '';
    position: absolute;
    top: -30px;
    right: 80px;
    width: 42px;
    height: 32px;
    background: radial-gradient(circle at center, #FFD26D, #FFB81A);
    filter: blur(32px);
  }
  span {
    text-transform: uppercase;
    font-size: 10px;
    color: #6A7080;
  }

  h2 {
    margin-top: 32px;
    position: relative;
    font-size: 20px;
    line-height: 22px;
    max-width: 140px;

    &:before {
      content: '';
      position: absolute;
      bottom: -20px;
      width: 24px;
      height: 2px;
      border-radius: 16px;
      background-color: #FFB81A;
    }
  }
`;
const BeeImage = styled.img`
  position: absolute;
  right: -30px;
  bottom: -70px;
  transform: rotate(-30deg);
  mix-blend-mode: screen;
  width: 220px;
`
const GridImage = styled.img`
  position: absolute;
  top: -20px;
`

export default BannerSlider;