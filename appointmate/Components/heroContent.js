import React from "react";
import Image from "next/image";
import hero from "../shared/images/hero.png"
import styles from "./home.module.css"
import { useRouter } from "next/router";

function HeroContent() {
  const router = useRouter();

  const handleClick =()=>{
    router.push("/login")
  }
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.text}>
          <div className={styles.title}>
            <p>
              Book <span>Appointments</span>
            </p>
            <p>Online For Any</p>
            <p>Profession</p>
          </div>
          <div className={styles.content}>
            <p>Appointmate, Bookings syncs your calendars while letting customers
            self-schedule.</p> 
            <p>Say hello to smart scheduling.</p>
          </div>
          <div className={styles.btn} onClick={handleClick}>
            <div>Get Started</div>
          </div>
        </div>
        <div className={styles.image}>
          <Image src={hero} alt="Hero Image" />
        </div>
      </div>
    </>
  );
}

export default HeroContent;
