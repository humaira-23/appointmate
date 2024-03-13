import { useEffect, useState } from "react";
import styles from "@/shared/Components/users/profRegister.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import NormalInput from "@/Components/inputs/NormalInput";
import axios from "axios";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { uploadImages } from "@/requests/upload";
import CircleLoader from "../Loaders/CircleLoader";
import { Router } from "next/router";

const ProfessionalRegister = ({ profession, user }) => {
  const [profIndex, setProfIndex] = useState(null);
  const [mssg, setMssg] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    userId: user._id,
    prefix: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    professional: "",
    specialIn: "",
    // age: "",
    officeAddress: "",
    expYears: "",
    desc: "",
    workspace: "",
  };

  const [newProf, setNewProf] = useState(initialValues);
  const {
    prefix,
    name,
    email,
    phone,
    gender,
    professional,
    specialIn,
    // age,
    officeAddress,
    expYears,
    desc,
  } = newProf;

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setNewProf((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleDdChange = (e) => {
    const selectedProfession = e.target.value;
    setNewProf((prevState) => {
      return { ...prevState, professional: selectedProfession };
    });
    const index = profession.findIndex(
      (prof) => prof.profName === selectedProfession
    );
    setProfIndex(index);
  };

  useEffect(() => {
    if (newProf.professional == "Doctor") {
      setNewProf((prevState) => {
        return { ...prevState, prefix: "Dr." };
      });
    } else if (newProf.professional == "Lawyer") {
      setNewProf((prevState) => {
        return { ...prevState, prefix: "Adv." };
      });
    } else if (newProf.gender == "Female") {
      setNewProf((prevState) => {
        return { ...prevState, prefix: "Ms." };
      });
    } else if (newProf.gender == "Male") {
      setNewProf((prevState) => {
        return { ...prevState, prefix: "Mr." };
      });
    }  else {
      setNewProf((prevState) => {
        return { ...prevState, prefix: null };
      });
    }
  }, [newProf.gender,newProf.professional]);

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
        setNewProf((prevProf) => ({
          ...prevProf,
          workspace: uploadResult,
        }));
      } catch (error) {
        console.error("Error converting data URI to Blob:", error);
      }
    };
  };

  const professionalValidation = Yup.object({
    name: Yup.string()
      .required("Your business name is required!")
      .min(3, "The business name must be atleast 3 characters long")
      .max(50, "The business name can't exceed 50 characters"),
    email: Yup.string()
      .required("Email address is required!")
      .email("Please enter a vaild email address"),
    phone: Yup.string()
      .required("Phone number is required")
      .test("is-valid-phone", "Enter a valid phone number", (value) => {
        // Custom phone number validation logic
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(value);
      }),
    gender: Yup.string().required("Please select your Gender"),

    professional: Yup.string().required("Please select your profession"),

    specialIn: Yup.string().required("Please select your specialization"),

    officeAddress: Yup.string()
      .required("Your office address is required")
      .min(10, "Address must be atleast 10 characters long")
      .max(250, "Address should not exceed 250 characters"),

    expYears: Yup.number()
      .required("Your years of experience is required")
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
    desc: Yup.string()
      .required("Description is required")
      .min(10, "Description must be atleast 10 characters long")
      .max(250, "Description should not exceed 250 characters"),

          // age: Yup.number()
    //   .required("Your age is required")
    //   .min(18, "Minimum age must be atleast 18 yrs")
    //   .max(75, "Maximum age must be below 75 yrs")
    //   .test(
    //     "is-valid-age",
    //     "Age must be in valid format (e.g., 2.8)",
    //     (value) => {
    //       if (typeof value !== "undefined") {
    //         const integerValue = Math.trunc(value); // Get the integer part of the number
    //         const fractionalPart = value - integerValue; // Get the fractional part
    //         return fractionalPart <= 0.11; // Check if the fractional part is within the allowed range
    //       }
    //       return true;
    //     }
    //   ),
  });

  const submitHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/professional", { newProf });
      setMssg(data.message);
      // Router.push("./professional/profile");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMssg(error.response.data.message);
    }
  };

  return (
    <>
      {loading && <CircleLoader />}
      <div className={styles.body}>
        <div className={styles.heading}>
          <h2>switch to professional </h2>
          <p>Expand your business by registering your profession!</p>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            name,
            email,
            phone,
            gender,
            professional,
            specialIn,
            // age,
            officeAddress,
            expYears,
            desc,
          }}
          validationSchema={professionalValidation}
          onSubmit={() => {
            submitHandler();
          }}
        >
          {(form) => (
            <Form>
              <div className={styles.form}>
                <div className={styles.column}>
                  <div className={styles.containers}>
                    <NormalInput
                      labeltext="Business Name : "
                      for="name"
                      name="name"
                      type="text"
                      placeholder="Biom Wellness"
                      onChange={inputChangeHandler}
                    />
                  </div>
                  <div className={styles.containers}>
                    <NormalInput
                      labeltext="Business Email : "
                      for="email"
                      name="email"
                      type="email"
                      placeholder="ziva123@gmail.com"
                      onChange={inputChangeHandler}
                    />
                    {/* <NormalInput
                      labeltext="Age : "
                      for="age"
                      name="age"
                      type="number"
                      placeholder=""
                      onChange={inputChangeHandler}
                    /> */}
                  </div>
                  <div className={styles.containerRadio}>
                    <div>
                      <label>Gender: </label>
                    </div>
                    <div className={styles.radioInput}>
                      <div>
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="Male"
                          onChange={inputChangeHandler}
                        />
                        Male
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="Female"
                          onChange={inputChangeHandler}
                        />
                        Female
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="others"
                          name="gender"
                          value="Others"
                          onChange={inputChangeHandler}
                        />
                        Others
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className={styles.column}>
                  <div className={styles.containers}>
                    <div>
                      <label>Professional In: </label>
                    </div>
                    <div>
                      <select
                        name="professional"
                        onChange={handleDdChange}
                        value={professional}
                      >
                        <option value={null} key={null}>
                          --Select--
                        </option>
                        {profession.map((prof, i) => (
                          <option value={prof.profName} key={i}>
                            {prof.profName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className={styles.containers}>
                    <div>
                      <label>Specialization In:</label>
                    </div>
                    <div>
                      <select
                        name="specialIn"
                        onChange={inputChangeHandler}
                        value={specialIn}
                      >
                        <option value={null} key={null}>
                          --Select--
                        </option>
                        {profession[profIndex]?.specialIn.map((special, i) => (
                          <option value={special} key={i}>
                            {special}
                          </option>
                        ))}
                      </select>
                    </div>
                    </div>
                    <NormalInput
                      labeltext="Workspace : "
                      for="workspace"
                      name="workspace"
                      type="file"
                      onChange={imageHandler}
                      accept="image/png,image/jpeg,image/webp"
                    />
                  <div className={styles.container}>
                    <NormalInput
                      labeltext="Business Phone (+91):"
                      for="phone"
                      name="phone"
                      type="phone"
                      placeholder=""
                      onChange={inputChangeHandler}
                    />
                    <NormalInput
                      labeltext="Experience (yrs) :"
                      for="expYears"
                      name="expYears"
                      type="Number"
                      placeholder=""
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
              </div> */}
                <div className={styles.column}>
                  <div className={styles.containers}>
                    <NormalInput
                      labeltext="Workspace : "
                      for="workspace"
                      name="workspace"
                      type="file"
                      onChange={imageHandler}
                      accept="image/png,image/jpeg,image/webp"
                    />
                  </div>
                  <div className={styles.container}>
                    <NormalInput
                      labeltext="Business Phone : "
                      for="phone"
                      name="phone"
                      type="phone"
                      placeholder="+91 7085451289"
                      onChange={inputChangeHandler}
                    />
                    <NormalInput
                      labeltext="Experience (yrs) :"
                      for="expYears"
                      name="expYears"
                      type="Number"
                      placeholder="5 years"
                      onChange={inputChangeHandler}
                    />
                  </div>
                  <div className={styles.containersProfession}>
                    <div>
                      <label>Professional In: </label>
                    </div>
                    <div>
                      <label>Specialization In:</label>
                    </div>
                  </div>
                  <div className={styles.container}>
                    <div>
                      <select
                        name="professional"
                        onChange={handleDdChange}
                        value={professional}
                      >
                        <option value={null} key={null}>
                          --Select--
                        </option>
                        {profession.map((prof, i) => (
                          <option value={prof.profName} key={i}>
                            {prof.profName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        name="specialIn"
                        onChange={inputChangeHandler}
                        value={specialIn}
                      >
                        <option value={null} key={null}>
                          --Select--
                        </option>
                        {profession[profIndex]?.specialIn.map((special, i) => (
                          <option value={special} key={i}>
                            {special}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.textarea}>
                <div>
                  <label>Office Address</label>
                  <label>
                    Description<span>(Optional)</span>
                  </label>
                </div>
                <div>
                  <textarea
                    placeholder="juhu tara road,mumbai, maharashtra,india"
                    name="officeAddress"
                    onChange={inputChangeHandler}
                  />
                  <textarea
                    placeholder="Please describe your Profession"
                    name="desc"
                    onChange={inputChangeHandler}
                  />
                </div>
              </div>
              <p className={styles.disclaimer}>
                By clicking register now, you agree to our updated Privacy
                Policy Terms and Conditions.
              </p>
              <button type="submit" className={styles.btn}>
                Register
              </button>
            </Form>
          )}
        </Formik>
        <div>{mssg}</div>
      </div>
    </>
  );
};

export default ProfessionalRegister;
