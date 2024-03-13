import React from "react";
import Image from "next/image";
import bookingbg from "../shared/images/bookingbg.png";

import styles from "./steps.module.css";

function Steps() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.body}>
          <div className={styles.header}>
            <p>Booking made with a 3 step setup process</p>
          </div>
          <div className={styles.content}>
            <div className={styles.image}>
              <Image src={bookingbg} alt="Booking" />
            </div>
            <div className={styles.line}>
                <p></p>
            </div>
            <div className={styles.text}>
            <div className={styles.number}>
                <p>1</p></div>
              <div className={styles.steps}>
                <p className={styles.title}>Set Your Availability</p>
                <p className={styles.desp}>
                  Define Your Schedule, Connect Your Calendar And The Right Time
                  Will Show On Your Booking Page.
                </p>
              </div>
              <div className={styles.number}>
                <p>2</p></div>
              <div className={styles.steps}>
                <p className={styles.title}>Share Your Booking Link</p>
                <p className={styles.desp}>
                  Share Your Booking Page Via Email, Text Or Even In Your
                  Website Chat.
                </p>
              </div>
              <div className={styles.number}>
                <p>3</p></div>
              <div className={styles.steps}>
                <p className={styles.title}>Watch The Bookings Fly In</p>
                <p className={styles.desp}>
                  As Professionals Starts Scheduling Time With You, Appointo
                  Provides You A Dashboard To Manage Your Booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Steps;
