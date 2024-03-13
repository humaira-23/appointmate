import styles from "@/Components/professional/appointment/appointmentForm.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import CircleLoader from "@/shared/Components/Loaders/CircleLoader";
import { toast } from "react-toastify";

const AppointmentForm = ({prof}) => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  const todaysDate = `${yyyy}-${mm}-${dd}`;


  const initialValues = {
    profId: prof[0]._id,
    date: "",
    formTime: "",
    toTime: "",
    interval: "",
    slots: [],
    message: "",
    type: "",
  };

  const [newSlot, setNewSlot] = useState(initialValues);
  const { date, formTime, toTime, interval, message, type } = newSlot;
  const [availableRange, setAvailableRange] = useState([]);
  const [selectedRange, setSelectedRange] = useState([]);
  const [loading, setLoading] = useState(false)

  const formatDate = (e) => {
    const [yyyy, mm, dd] = e.target.value.split("-");
    const formattedDate = `${dd}-${mm}-${yyyy}`;
    setNewSlot((prevState) => {
      return { ...prevState, date: formattedDate };
    });
  };

  const generateTimeSlots = (fromTime, toTime, interval) => {
    const timeSlots = [];
    const fromHour = parseInt(fromTime.split(":")[0]);
    const fromMinute = parseInt(fromTime.split(":")[1]);
    const toHour = parseInt(toTime.split(":")[0]);
    const toMinute = parseInt(toTime.split(":")[1]);
  
    let currentTime = new Date();
    currentTime.setHours(fromHour);
    currentTime.setMinutes(fromMinute);
  
    while (
      currentTime.getHours() < toHour ||
      (currentTime.getHours() === toHour && currentTime.getMinutes() <= toMinute)
    ) {
      const startTime = `${String(currentTime.getHours()).padStart(2, "0")}:${String(currentTime.getMinutes()).padStart(2, "0")}`;
      currentTime.setMinutes(currentTime.getMinutes() + interval);
      const endTime = `${String(currentTime.getHours()).padStart(2, "0")}:${String(currentTime.getMinutes()).padStart(2, "0")}`;
      timeSlots.push(`${startTime} - ${endTime}`);
    }

    if (timeSlots.length > 1) {
      timeSlots.splice(-1)
    }
  
    return timeSlots;
  };  
  

  // Update availableRange when fromTime, toTime, or interval changes
  useEffect(() => {
    setSelectedRange([])
    if (newSlot.formTime && newSlot.toTime && newSlot.interval) {
      const timeSlots = generateTimeSlots(
        newSlot.formTime,
        newSlot.toTime,
        parseInt(newSlot.interval, 10)
      );
      setAvailableRange(timeSlots);
    }
  }, [newSlot.formTime, newSlot.toTime, newSlot.interval]);

  useEffect(() => {
    setSelectedRange([])
  }, [newSlot.interval]);

  const toggleRangeSelection = (range) => {
    const index = selectedRange.indexOf(range);
    if (index === -1) {
      // If the range is not already selected, add it to the selected ranges array
      setSelectedRange([...selectedRange, range]);
    } else {
      // If the range is already selected, remove it from the selected ranges array
      setSelectedRange(selectedRange.filter((r) => r !== range));
    }
  };


  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setNewSlot((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitHandler = async () => {
    setLoading(true)
    setSelectedRange(
      selectedRange.sort(
        (a, b) => availableRange.indexOf(a) - availableRange.indexOf(b)
      )
    );
    const slotsData = selectedRange.map((range) => ({ range }));
    await setNewSlot((prevState) => ({ ...prevState, slots: slotsData }));
    if (selectedRange.length < 1) {
      setLoading(false)
      toast.warning("Please select atleast 1 interval to create a slot")
      return;
    } else if (newSlot.slots.length < 1) {
      setLoading(false)
      return
    } else {
      try {
        const { data } = await axios.post("/api/slots", { newSlot });
        toast.success(data.message);
        window.location.reload();
      } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message);
      }
      setLoading(false)
    }
  };

  const validation = Yup.object({
    type: Yup.string().required("Please select a type"),
  });

  return (
    <>
    {loading && <CircleLoader/>}
      <Formik
        enableReinitialize
        initialValues={{ date, formTime, toTime, interval, message, type }}
        validationSchema={validation}
        onSubmit={
          submitHandler
        }
      >
        {(form) => (
          <Form>
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.row}>
                  <div className={styles.label}>
                    <label>Available Date Slot</label>
                    <label>Approval</label>
                  </div>
                  <div className={styles.input}>
                    <input type="date" name="date" min={todaysDate} onChange={formatDate} />
                    <div className={styles.radioInput}>
                      <div>
                        <input
                          type="radio"
                          id="auto"
                          name="type"
                          value="Auto"
                          onChange={inputChangeHandler}
                        />
                        Auto
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="manual"
                          name="type"
                          value="Manual"
                          onChange={inputChangeHandler}
                        />
                        Manual
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.labels}>
                    <label>Time Slot From</label>
                    <label>Time Slot To</label>
                  </div>
                  <div className={styles.input}>
                    <input
                      type="time"
                      name="formTime"
                      onChange={inputChangeHandler}
                    />
                    <input
                      type="time"
                      name="toTime"
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
                <div className={styles.intervals}>
                  <label>Select Intervals :</label>
                  <select name="interval" onChange={inputChangeHandler}>
                    <option value={null} key={null}>
                      --Select--
                    </option>
                    <option value="15" key="15">
                      15 mins
                    </option>
                    <option value="30" key="30">
                      30 mins
                    </option>
                    <option value="45" key="45">
                      45 mins
                    </option>
                    <option value="60" key="60">
                      1 hrs
                    </option>
                    <option value="90" key="90">
                      1:30 hrs
                    </option>
                    <option value="120" key="120">
                      2 hrs
                    </option>
                  </select>
                </div>
                <div className={styles.slot}>
                {availableRange.length > 0 && <p>Select to avail the slots</p>}
                <div className={styles.slots}>
                  {availableRange.map((time, i) => (
                    <div
                      key={i}
                      className={`${
                        selectedRange.includes(time) ? styles.slotsActive : ""
                      }`}
                      onClick={() => toggleRangeSelection(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.label}>
                  <label>
                    Your Message <span>(Optional)</span>
                  </label>
                </div>
                <div className={styles.input}>
                  <textarea name="message" onChange={inputChangeHandler} />
                </div>
              </div>
              <button type="submit" className={styles.btn}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AppointmentForm;
