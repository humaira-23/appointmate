import styles from "@/Components/login.module.css";
import logo from "@/shared/images/login.png";
import Image from "next/image";
import { Fragment } from "react";
import LoginNavbar from "@/shared/Components/loginnav";
import Link from "next/link";
import { Form, Formik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import { signIn } from "next-auth/react"
import Router from "next/router"
import SigninInput from "@/Components/inputs/SigninInput";
import CircleLoader from "@/shared/Components/Loaders/CircleLoader";

const Signin = () => {
  const initialValues = {
    login_email: "",
    login_password: "",
    login_error: "",
  };

  const [user, setUser] = useState(initialValues);
  const { login_email, login_password, login_error } = user;
  const [loading, setLoading] = useState(false)

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required!")
      .email("Please enter a valid email address"),
    login_password: Yup.string().required("Please enter the password"),
  });

  const loginHandler = async () => {
    setLoading(true)
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };

    const res = await signIn("credentials", options);

    if (res?.error) {
      setUser((prevState) => {
        return { ...prevState, login_error: res?.error };
      });
    setLoading(false)
    } else {
      return Router.push("/");
    }
  };

  return (
    <Fragment>
      {loading && <CircleLoader />}
      <div className={styles.main}>
        <LoginNavbar />
        <div className={styles.body}>
          <div className={styles.image}>
            <Image src={logo} alt="login logo" />
          </div>
          <div className={styles.tab}>
          <h2 className={styles.title}>Welcome Back....</h2>
          <p>Sign in to your account</p>
          
          {/* <div className={styles.input}>
              <input type="text" placeholder="Email/Phone" />
            </div>
            <div className={styles.input}>
              <input type="password" placeholder="Password" />
            </div> */}
          <Formik
            enableReinitialize
            initialValues={{ login_email, login_password, login_error }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginHandler();
            }}
          >
            {(form) => (
              <Form method="post" action="/api/auth/signin/email">
                <div className={styles.input} >
                <SigninInput
                  name="login_email"
                  placeholder="Email"
                  type="text"
                  onChange={inputChangeHandler}
                /></div>
                <div className={styles.input}>
                <SigninInput
                  name="login_password"
                  placeholder="Password"
                  type="password"
                  onChange={inputChangeHandler}
                /></div>
                <div className={styles.error}>
                  {login_error && <span>{login_error}</span>}
                </div>
                <div className={styles.pass}>
                  <div className={styles.checkbox}>
                    <input type="checkbox" id="check1" name="check1" />
                    <p>Remember me</p>
                  </div>
                  <div>
                    <p>Forgot Password?</p>
                  </div>
                </div>
                <button type="submit" className={styles.btn}>
                  Login
                </button>
                <p className={styles.span}>
                  Don't have an account?{" "}
                  <Link href="/signup">
                    <span>Register</span>
                    </Link>
                </p>
              </Form>
            )}
          </Formik>

          <div className={styles.option}>
            <div></div>
            <p>OR</p>
            <div></div>
          </div>
          <div className={styles.social}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-facebook"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                  fill="#b3b3b3"
                ></path>{" "}
              </svg>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-google"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />{" "}
              </svg>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="22"
                height="22"
                fill="currentColor"
              >
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
              </svg>
            </div>
          </div>
        </div>
        </div>
        <div className={styles.divison}>
        </div>
      </div>
    </Fragment>
  );
};

export default Signin;
