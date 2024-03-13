import { useState } from "react";
import styles from "@/Components/professional/updateForm.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import NormalInput from "../inputs/NormalInput";
import axios from "axios";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { uploadImages } from "@/requests/upload";
// import CircleLoader from "../Loaders/CircleLoader";

const options = [
  { value: "sunday", label: "Sunday" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
];

const UpdateForm = ({ user }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [mssg, setMssg] = useState("");
  // const [loading, setLoading] = useState(false);

  const initialValues = {
    profId: user._id,
    name: "",
    about: "",
    education: "",
    expYears: "",
    title: "",
    days: [],
    fromTime: "",
    toTime: "",
    license: "",
    others: "",
    workspace: "",
  };

  const [getProf, setProf] = useState(initialValues);
  const {
    name,
    about,
    education,
    expYears,
    title,
    days,
    fromTime,
    toTime,
    license,
    others,
  } = getProf;

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setProf((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    setProf((prevState)=>{
      return {...prevState, days:setSelectedDay}
    })
  };

  const imageHandler = async (e) => {
    const file = e.target.files[0];

    if (!file) return; // No file selected

    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp"
    ) {
      setMssg(
        `${file.name} format is unsupported! Only JPEG, PNG, WEBP are allowed.`
      );
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setMssg(`${file.name} size is too large, max 5mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
      const dataURI = e.target.result;
      setMssg(""); // Clear any previous error messages

      try {
        const blob = await dataURItoBlob(dataURI);
        const path = "workspace images";
        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", blob, file.name);

        const uploadResult = await uploadImages(formData);
        setProf((prevProf) => ({
          ...prevProf,
          workspace: uploadResult,
        }));
      } catch (error) {
        console.error("Error converting data URI to Blob:", error);
      }
    };
  };

  const professionalUpdateValidation = Yup.object({
      name: Yup.string()
      // .required("Your business name is required!")
      .min(3, "The business name must be atleast 3 characters long")
      .max(30, "The business name can't exceed 30 characters"),

      about: Yup.string()
      // .required("About is required")
      .min(10, "About must be atleast 10 characters long")
      .max(250, "About should not exceed 250 characters"),

      education: Yup.string()
      // .required("Education is required")
      .min(10, "Education must be atleast 10 characters long")
      .max(100, "Education should not exceed 100 characters"),


      expYears: Yup.number()
        // .required("Your years of experience is required")
        .min(0.1, "Experience must be at least 0.1 years")
        .max(50, "Experience cannot exceed 50 years")
        .test(
          "is-valid-exp",
          "Experience must be in valid format (e.g., 2.8)",
          (value) => {
            if (typeof value !== "undefined") {
              const integerValue = Math.trunc(value); // Get the integer part of the number
              const fractionalPart = value - integerValue; // Get the fractional part
              return fractionalPart <= 0.11; // Check if the fractional part is within the allowed range
            }
            return true;
          }
        ),

        title: Yup.string()
      // .required("Your business name is required!")
      .min(3, "The business name must be atleast 3 characters long")
      .max(30, "The business name can't exceed 30 characters"),

    // days: Yup.string().required("Please select your Working Days"),

    fromTime: Yup.string()
    .required("Please select your Working Hours From"),
    toTime: Yup.string()
    .required("Please select your Working Hours To"),

    license: Yup.string()
      .required("License is required")
      .min(10, "License must be atleast 10 characters long")
      .max(100, "License should not exceed 100 characters"),

  });

  const submitHandler = async () => {
    // setLoading(true);
    try {
      const { data } = await axios.post("/api/profUpdate", { getProf });
      setMssg(data.message);
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      setMssg(error.response.data.message);
    }
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.heading}>
          <h2>Update your profile</h2>
          <p>Add on your details for more efficiency!</p>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            name,
            about,
            education,
            expYears,
            title,
            days,
            fromTime,
            toTime,
            license,
            others,
          }}
          validationSchema={professionalUpdateValidation}
          onSubmit={() => {
            submitHandler();
          }}
        >
           {(form) => (
          <Form>
            <div className={styles.form}>
              <div className={styles.container}>
                <div className={styles.column}>
                  <NormalInput
                    labeltext="Business Name : "
                    for="name"
                    name="name"
                    type="text"
                    // placeholder="Ziva Jason"
                    onChange={inputChangeHandler}
                  />
                  <NormalInput
                    labeltext="About : "
                    for="about"
                    name="about"
                    type="text"
                    // placeholder="Ziva Jason"
                    onChange={inputChangeHandler}
                  />
                  <NormalInput
                    labeltext="Education : "
                    for="education"
                    name="education"
                    type="text"
                    // placeholder="Ziva Jason"
                    onChange={inputChangeHandler}
                  />
                  <NormalInput
                    labeltext="Experience (yrs) :"
                    for="expYears"
                    name="expYears"
                    type="Number"
                    // placeholder="5 years"
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className={styles.column}>
                    <NormalInput
                      labeltext="Title : "
                      for="title"
                      name="title"
                      type="text"
                      // placeholder="Ziva Jason"
                      onChange={inputChangeHandler}
                    />
                    <NormalInput
                      labeltext="Workspace : "
                      for="workspace"
                      name="workspace"
                      type="file"
                      onChange={imageHandler}
                      accept="image/png,image/jpeg,image/webp"
                    />
                    <div className={styles.column}>
                      <div className={styles.label}>
                        <label>Business Days</label>
                      </div>
                      <div >
                      <div className={styles.time}>
                        <select
                          name="days"
                          value={selectedDay}
                          onChange={handleDayChange}
                        >
                          <option value={null} key={null} >
                            From
                          </option>
                          {options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <select
                          name="days"
                          value={selectedDay}
                          onChange={handleDayChange}
                        >
                          <option value={null} key={null} >
                            To
                          </option>
                          {options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        </div>
                      </div>
                    </div>
                    <div className={styles.column}>
                      <div className={styles.label}>
                        <label htmlFor="businesshours">Business Hours</label>
                      </div>
                      <div className={styles.time}>
                        <div className={styles.input}>
                          <input type="time" name="fromTime" />
                        </div>
                        <div className={styles.input}>
                          <input type="time" name="toTime" />
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className={styles.btn}>
                <button 
                  type="reset" 
                  value="Reset" 
                  className={styles.resetBtn} 
                >Reset</button>
                <button
                  type="submit"
                  value="Save"
                  className={styles.submitBtn}
                >Save</button>
              </div>
            </div>
          </Form>
          )}
        </Formik>
        <div>{mssg}</div>
      </div>
    </>
  );
};

export default UpdateForm;
