import styles from "@/Components/professional/schedules/upcoming.module.css";
import Image from "next/image";
import Card from "./upcomingCard";

const UpcomingAppointment = ({ appointment, prof }) => {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.title}>
          <h2>Upcoming Appointments</h2>
        </div>
        <section className={styles.content}>
        <div className={styles.grid}>
        {appointment.map((data,i) => (
            <Card key={i} data={data} prof={prof}/>
            ))}
      </div>
      </section>
      </div>
    </>
  );
};

export default UpcomingAppointment;
