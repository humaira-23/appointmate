import styles from "@/Components/Users/appoinmentDetails.module.css";
import CircleLoader from "@/shared/Components/Loaders/CircleLoader";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AppointmentDetailsUser = ({data, setShowDetail }) => {

  const options = { 
    slotId: data.slotId,
    profId: data.profId,
    userId: data.userId,
    date: data.date,
    time: data.time, 
  }

  console.log(options)

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

  const findDayOfWeek = (dateString) => {
    const [day, month, year] = dateString.split('-');
    const date = new Date(year, month - 1, day); // month - 1 because month is zero-based in JavaScript Date object
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  };
  const dayOfWeek = findDayOfWeek(data.date);

  const cancelHandler = async () => {
    setLoading(true)
    const isConfirmed = window.confirm("Are you sure you want to cancel this appointment?");
    if (isConfirmed) {
      try {
        const queryParams = new URLSearchParams();
      queryParams.append("slotId", data.slotId);
      queryParams.append("profId", data.profId);
      queryParams.append("userId", data.userId);
      queryParams.append("date", data.date);
      queryParams.append("time", data.time);

      const result = await axios.delete(`/api/appointment?${queryParams.toString()}`);
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
    }
    setLoading(false)
  }
  
  return (
    <>
    {loading && <CircleLoader />}
    <div className={styles.details}>
      <div className={styles.overlay_content}>
        <div className={styles.close_btn} onClick={() => setShowDetail(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16"> <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/> </svg>
        </div>
        <div className={styles.profileDetails}>
          <img src={data.image} alt="Profile" />
          <div className={styles.profile}>
            <h2>{data.profName}</h2>
            <p>{data.officeAddress}</p>
          </div>
        </div>
        <div className={styles.appointmentDetails}>
          <div className={styles.row1}>
            <div className={styles.column}>
              <div>
                <label>date</label>
              </div>
              <div>
                <p>{formattedDate}</p>
              </div>
            </div>
            <div className={styles.column}>
            <div>
                <label>day</label>
              </div>
              <div>
                <p>{dayOfWeek}</p>
              </div>
            </div>
            <div className={styles.column}>
            <div>
                <label>time</label>
              </div>
              <div>
                <p>{data.time}</p>
              </div>
            </div>
          </div>
          <div className={styles.row2}>
          <div className={styles.column}>
          <div>
                <label>name</label>
              </div>
              <div>
                <p>{data.appointmentForName}</p>
              </div>
          </div>
          <div className={styles.column}>
          <div>
                <label>Phone number</label>
              </div>
              <div>
                <p>{data.phone}</p>
              </div>
          </div>
          </div>
        </div>
        <div className={styles.detailsBtn}>
          {/* <div className={styles.rescheduleBtn}>
            <p onClick={handleReschduleClick}>Reschedule</p>
          </div> */}
          {
            data.status !== "Cancled" && data.status !== "Declined" &&
            (<div className={styles.cancelBtn}>
            <p onClick={() => cancelHandler()}>Cancel Appointment</p>
          </div>)}
        </div>
      </div>
    </div>
    </>
  );
};

export default AppointmentDetailsUser;
