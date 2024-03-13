import logo from "@/shared/images/categories.png";
import styles from "@/Components/Users/categories.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Categories = () => {
  // const router=useRouter();
  // const handleViewMoreClick = () => {
  //   router.push("/profile/search");
  // };

  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  const handleViewMoreClick = () => {
    // Check if a category is selected
    if (selectedCategory) {
      // Navigate to the search page with the selected category as a query parameter
      router.push({
        pathname: '/profile/search',
        query: { category: selectedCategory },
      });
    } else {
      // If no category is selected, navigate to the default search page
      router.push('/profile/search');
    }
  };

  return (
    <>
    <div className={styles.main}>
      <div className={styles.body}>
        <h1>Categories</h1>
        <div className={styles.rows}>
          <div className={styles.col}>
          <div className={styles.r1c1} onClick={() => setSelectedCategory('Teacher')}>
              <h2>Tutoring services</h2>
              <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />{" "}
              </svg>
              </div>
            </div>
            <div className={styles.r1c2}>
              <h2>Legal And Compilance</h2>
              <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />{" "}
              </svg>
              </div>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.r2c1}>
              <h2>Health and wellness</h2>
              <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />{" "}
              </svg>
              </div>
            </div>
            <div className={styles.r2c2}>
              <h2>Saloon and beauty</h2>
              <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />{" "}
              </svg>
              </div>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.r3c1} onClick={handleViewMoreClick}>
              <h2>View All</h2>
              <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />{" "}
              </svg>
              </div>
            </div>
            <div className={styles.r3c2}>
              <h2>Professional services</h2>
              <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />{" "}
              </svg>
              </div>
            </div>
            <div className={styles.r3c3}>
              <h2>Automotive</h2>
              <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />{" "}
              </svg>
              </div>
            </div>
          </div>
          <div className={styles.image}>
            <Image src={logo} alt="categoies" />
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Categories;
