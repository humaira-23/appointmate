import styles from "@/Components/professional/schedules/pending.module.css";
import CircleLoader from "@/shared/Components/Loaders/CircleLoader";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Card = ({data}) => {

  const [loading, setLoading] = useState(false)

  const formatDate = (dateString) => {

    const [day, month, year] = dateString.split('-');
    const formattedDate = new Date(year, month - 1, day); // month - 1 because month is zero-based in JavaScript Date object
    // Convert to formatted string
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedString = formattedDate.toLocaleDateString('en-GB', options);
    
    return formattedString;
  };
  const formattedDate = formatDate(data.date);

  const actionHandler = async (value) => {
    setLoading(true)
      try {
        const queryParams = new URLSearchParams();
      queryParams.append("slotId", data.slotId);
      queryParams.append("profId", data.profId);
      queryParams.append("userId", data.userId);
      queryParams.append("date", data.date);
      queryParams.append("time", data.time);
      queryParams.append("status", value);

      const result = await axios.put(`/api/appointment?${queryParams.toString()}`);
        setLoading(false)
        toast.success(result.message);
        window.location.reload();
      } catch (error) {
        setLoading(false)
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      }
    setLoading(false)
  }

  return (
    <>
    {loading && <CircleLoader />}
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.profile}>
          <img src={"https://www.svgrepo.com/show/316857/profile-simple.svg"} alt="profile" height="64" width="64" />
        </div>
        <div className={styles.info}>
          <h3>{data.appointmentForName}</h3>
          <div className={styles.time}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="16"
          width="16"
          fill="currentColor"
        >
          <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
        </svg>
        <p>{data.time}</p>
      </div>
      <div className={styles.date}>
        <div className={styles.dateDetails}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-calendar3"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />{" "}
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />{" "}
          </svg>
          <p>{formattedDate}</p>
        </div>
        </div>
        </div>
      </div>
      <div className={styles.btn}>
        <button className={styles.declineBtn} onClick={() => actionHandler("Declined")}>Decline</button>
        <button className={styles.approveBtn} onClick={() => actionHandler("Booked")}>Approve</button>
      </div>
    </div>
    </>
  );
};

export default Card;
