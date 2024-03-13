import "@/styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <SessionProvider session={session}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
