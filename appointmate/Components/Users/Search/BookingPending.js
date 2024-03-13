import styles from "@/Components/Users/Search/BookingPending.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const BookingPending = ({ onClose, prof, closeHandler }) => {
  const router = useRouter();

  const handleDoneClick = () => {
    router.push("/profile/appointments");
  };

  const handleMoreClick = () => {
    router.push("/profile/search");
  };

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 16 16"
            width="80"
            height="80"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          >
            {" "}
            <path d="m14.25 8.75c-.5 2.5-2.3849 4.85363-5.03069 5.37991-2.64578.5263-5.33066-.7044-6.65903-3.0523-1.32837-2.34784-1.00043-5.28307.81336-7.27989 1.81379-1.99683 4.87636-2.54771 7.37636-1.54771" />{" "}
            <polyline points="5.75 7.75,8.25 10.25,14.25 3.75" />{" "}
          </svg>
          <h2>Thanks for booking!</h2>
          <h3>Your Booking will be confirm by {prof.name} soon.</h3>
        </div>
        <div className={styles.btn}>
          <Link href={"/profile"}>
            <div className={styles.doneBtn}>
              <div>Done</div>
            </div>
          </Link>
          <Link href={`/profile/search?q=${prof.profIn}`}>
            <div className={styles.updateBtn}>
              <div>Book More</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingPending;
