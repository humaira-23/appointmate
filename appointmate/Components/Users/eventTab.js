// "use client";

import styles from "@/Components/Users/event.module.css"
import Link from "next/link";
import AppointmentDetails from "./appointmentDetails";
import { useState } from "react";
import { useRouter } from "next/router";
import RegisterSucess from "@/shared/Components/users/RegisterSuccess";

export default function EventTab({tabs, data}) {
  const router = useRouter();
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const handleClick = () => {
    setOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  const handleExploreClick = () => {
    router.push("/profile/appointments");
  };


    return (
      <>
      <div className={styles.main}>
        <div className={styles.title}>
            <p>your upcoming appointments</p>
        </div>
        
        <div className={styles.content}>
        {tabs.map((tab) => (
            <div className={styles.tab}>
                <img src={tab.image} alt={tab.title}></img>
                <div>
                <h2>{tab.title}</h2>
                <h3>{tab.date}</h3>
                {data.map((data) => (
                  <div>
                <p onClick={handleClick}>View Details</p>
                {isOverlayVisible && (
        <AppointmentDetails onClose={handleCloseOverlay} data={data} />
        // <RegisterSucess onClose={handleCloseOverlay}/>
        )}
                </div>

                ))}
                </div>
            </div>
        ))}
        <div className={styles.btn} onClick={handleExploreClick}>
            <p>Explore more</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/> </svg>
        </div>
        </div>
        </div> 

      </>
    );
  }

