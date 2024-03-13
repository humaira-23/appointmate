import styles from "@/Components/professional/schedules/pending.module.css";
import Image from "next/image";
import Card from "./pendingCard";

const PendingAppointment = ({ appointment }) => {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.title}>
          <h2>Pending Appointments</h2>
        </div>
        <section className={styles.content}>
        <div className={styles.grid}>
        {appointment.map((data,i) => {
          if (data.status == "Pending") {
            return (
              <Card key={i} data={data}/>
            )
          }
        })}
      </div>
      </section>
      </div>
    </>
  );
};

export default PendingAppointment;
