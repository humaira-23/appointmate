import styles from "@/Components/Users/calendar/eventView.module.css";
import logo from "@/shared/images/premium.png";
import Events from "./events";
import slideData from "@/Components/Users/calendar/EventData.json"
import Image from "next/image";

const EventViewTab = () => {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.image}>
          <Image src={logo} alt="planner" />
        </div>
        <div className={styles.content}>
            <div className={styles.title}>
            <h2>Your Appointment History</h2>
            <p>View All</p>
            </div>
            <div className={styles.event}>
            <Events slides={slideData}/>
            </div>
        </div>
      </div>
    </>
  );
};

export default EventViewTab;
