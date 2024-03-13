import { useEffect, useState } from "react";
import ProfileOverlay from "@/shared/Components/users/profileOverlay";
import Image from "next/image";
import Filter from "@/shared/images/filter.png";
import styles from "@/shared/Components/users/searchbar.module.css";
import { useRouter } from "next/router";

const Searchbar = ({ data, user,searchHandler }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const handleImageClick = () => {
    setOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  const router = useRouter();
  const [query, setQuery] = useState(router.query.q || "");
  const handleSearch = (e) => {
    e.preventDefault();
      if (router.pathname !== "/profile/search") {
        if (query.length > 1) {
          router.push(`/profile/search?q=${query}`)
        }
      } else {
        searchHandler(query)
      }
  };

  useEffect(() => {
    setQuery(router.query.q || "")
  }, [router.query.q]);

  return (
    <>
      <div className={styles.main}>
        <form onSubmit={(e) => handleSearch(e)}>
          <div className={styles.searchbar}>
            <input
              type="text"
              placeholder="Search for anything..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
        </form>
        <div className={styles.filtericon}>
          <Image src={Filter} alt="" />
        </div>
        <div className={styles.date}>
          <p>{formattedDate}</p>
        </div>
        <div className={styles.notification}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-bell-fill"
            viewBox="0 0 16 16"
          >
            {" "}
            <path
              d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"
              fill="#737171"
            ></path>{" "}
          </svg>
        </div>
        {data.map((data) => (
          <div className={styles.profile}>
            <img src={data.image} alt="Profile" onClick={handleImageClick} />
            {isOverlayVisible && (
              <ProfileOverlay
                onClose={handleCloseOverlay}
                data={data}
                user={user}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Searchbar;
