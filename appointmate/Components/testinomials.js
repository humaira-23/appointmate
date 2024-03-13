"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./testinomials.module.css";

import "swiper/css";
import "swiper/css/bundle";

import person1 from "@/shared/images/person1.png";

export default function Testinomials({ slides }) {
  return (
    <>
      <div className={styles.heading}>
        <p>our customer trust for their appointment scheduling needs</p>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={3}
        pagination={{ clickable: true }}
        centeredSlides={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className={styles.swiper}
      >
        {slides.map((slide) => (
          <SwiperSlide
            className={styles.slides}
            key={slide.pname}
            style={{ backgroundColor: slide.color }}
          >
            <div className={styles.profile}>
              <img src={slide.image} alt="" />
              <p>{slide.pname}</p>
            </div>
            <h2>{slide.title}</h2>
            <p>{slide.desc}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
