import styles from "@/Components/Users/Search/BookingSuccess.module.css";
import { useRouter } from "next/router";
import successLogo from "@/shared/images/Sucess.png";
import Image from "next/image";
import Link from "next/link";

const BookingSuccess = ({ onClose, prof, closeHandler }) => {
  const router = useRouter();

  return (
    <div className={styles.details}>
      <div className={styles.overlay_content}>
        <div className={styles.close_btn} onClick={closeHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-x-circle-fill"
            viewBox="0 0 16 16"
            onClick={onClose}
          >
            {" "}
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />{" "}
          </svg>
        </div>
        <div className={styles.successMessage}>
          <Image src={successLogo} alt="Success" />
          <h2>Appointment Confirm!</h2>
          <h3>
            Your Appointment with<span> {prof.name}</span> is confirmed.
          </h3>
        </div>
        <div className={styles.btn}>
          <Link href={`/profile/search?q=${prof.profIn}`}>
            <div className={styles.doneBtn}>
              <div>Book More</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
