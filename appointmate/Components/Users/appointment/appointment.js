import styles from "@/Components/Users/appointment/appointment.module.css";
import Card from "@/Components/Users/appointment/card";

const UpcomingAppointment = ({ appointment }) => {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.title}>
          <h2>Upcoming Appointments</h2>
        </div>
        <section className={styles.content}>
        <div className={styles.grid}>
        {appointment?.map((data,i) => (
            <Card key={i} data={data} />
            ))}
      </div>
      </section>
      </div>
    </>
  );
};

export default UpcomingAppointment;
