import { Form, Formik } from "formik";
import styles from "./appointmentForm.module.css";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CircleLoader from "@/shared/Components/Loaders/CircleLoader";
import BookingSuccess from "./BookingSucess";
import BookingPending from "./BookingPending";

const AppointmentForm = ({ prof, slots, user }) => {
  const initialValues = {
    profId: prof._id,
    userId: user._id,
    slotId: "",
    name: "",
    date: "",
    time: "",
    phone: "",
    appointmentForName: "",
    message: "",
  };

  const [newAppointment, setNewAppointment] = useState(initialValues);
  const { name, date, time, phone, appointmentForName, message } = newAppointment;
  const [index, setIndex] = useState(null);
  const [loading,setLoading] = useState(false)
  const [booked, setBooked] = useState(false)
  const [pending, setPending] = useState(false)

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setNewAppointment((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const closeHandler = () => {
    window.location.reload();
  }

  const findIndexByDate = (selectedDate) => {
    return slots.findIndex(slot => slot.date === selectedDate);
  };
  
  const dateChangeHandler = (event) => {
    const selectedDate = event.target.value;
    const selectedIndex = findIndexByDate(selectedDate);
    setNewAppointment((prevState) => {
      return { ...prevState, date: selectedDate };
    });
    setIndex(selectedIndex);
  };
  

  const validation = Yup.object({
    name: Yup.string()
      .required("Your business name is required!")
      .min(3, "The business name must be atleast 3 characters long")
      .max(30, "The business name can't exceed 30 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .test("is-valid-phone", "Enter a valid phone number", (value) => {
        // Custom phone number validation logic
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(value);
      }),
      appointmentForName: Yup.string()
      .required("This is required!")
      .min(3, "Name must be atleast 3 characters long")
      .max(30, "Name can't exceed 30 characters"),
    message: Yup.string()
      .max(250, "Description should not exceed 250 characters"),
  });

  const submitHandler = async () => {
    setLoading(true)
    if (newAppointment.date.length === 0 || newAppointment.time.length === 0) {
      toast.warning("Please select a date and time")
      setLoading(false)
      return;
    } else {
      try {
        const { data } = await axios.post("/api/appointment", {
          newAppointment,
        });
        setLoading(false)
        if (data.message == "Booked") {
          setBooked(true)
        } else {
          setPending(true)
        }
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false)
      }
    }
  };

  return (
    <>
      {loading && <CircleLoader />}
      {booked && <BookingSuccess prof={prof} closeHandler={closeHandler} />}
      {pending && <BookingPending prof={prof} closeHandler={closeHandler} />}
      <div className={styles.body}>
        <div className={styles.heading}>
          <h2>
            Book a
            <span>
              {" "}
              {prof.specialIn} {prof.profIn}
            </span>{" "}
            Appointment
          </h2>
          <p>
            We have the best<span> {prof.profIn}</span> experience in your
            region. Quality, guarantee and professionalism are our slogan!
          </p>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            name,
            date,
            time,
            phone,
            appointmentForName,
            message,
          }}
          validationSchema={validation}
          onSubmit={submitHandler}
        >
          {(form) => (
            <Form className={styles.form}>
              <div className={styles.label}>
                <label>Your Name</label>
              </div>
              <div className={styles.input}>
                <input
                  type="text"
                  placeholder="Ziva Jason"
                  name="name"
                  onChange={inputChangeHandler}
                />
              </div>
              <div className={styles.rows}>
                <div className={styles.column}>
                  <div className={styles.containerLabel}>
                    <label>Date Slot</label>
                  </div>
                  <div className={styles.containerInput}>
                    <select name="date" onChange={dateChangeHandler}>
                      <option value={null} key={null}>
                        --Select--
                      </option>
                      {slots.map((slot, i) => (
                        <option value={slot.date} key={i}>
                          {slot.date}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.containerLabel}>
                    <label htmlFor="phone">Phone Number</label>
                  </div>
                  <div className={styles.containerInput}>
                    <input
                      type="text"
                      placeholder="+91 7085451289"
                      name="phone"
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.containerLabel}>
                    <label>Time Slot</label>
                  </div>
                  <div className={styles.containerInput}>
                    <select name="time" onChange={inputChangeHandler}>
                      <option value={null} key={null}>
                        --Select--
                      </option>
                      {slots[index]?.slots.map((time, i) => {
                        if (time.status == "Vacant") {
                          return (
                            <option value={time.range} key={i}>
                              {time.range}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </div>
                  <div className={styles.containerLabel}>
                    <label htmlFor="appointmentfor">Appointment For</label>
                  </div>
                  <div className={styles.containerInput}>
                    <div>
                      <input
                        type="text"
                        name="appointmentForName"
                        placeholder="Ziva Jason"
                        onChange={inputChangeHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.label}>
                <label>
                  Your Message <span>(Optional)</span>
                </label>
              </div>
              <div className={styles.textarea}>
                <textarea
                  type="text"
                  placeholder="Please Describe Your Need"
                  name="message"
                  onChange={inputChangeHandler}
                />
              </div>
              <div>
                <p>
                  By clicking book appointment, You agree to our updated Privacy
                  Policy terms and Conditions.
                </p>
              </div>
              <button type="submit" className={styles.btn}>
                Book Appointment
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AppointmentForm
