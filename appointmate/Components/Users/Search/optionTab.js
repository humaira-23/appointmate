import { useState, useEffect } from "react";
import styles from "@/Components/Users/Search/optionTab.module.css";
import Details from "@/Components/Users/Search/details";
import Link from "next/link";

export default function OptionTab({profession, professional}) {

  const [activeIndex,setActiveIndex] = useState(null)

  const togleIndex = (i) => {
    setActiveIndex(i)
  }

  const clearIndex = () => {
    setActiveIndex(null);
  };

  return (
    <>
      <div className={styles.main}>
        <h2>
          Get a perfect appointment for yourself!
        </h2>
        <ul className={styles.options}>
          {profession.map((prof, i) => (
            <li
              key={i}
              onMouseEnter={() => togleIndex(i)}
              onMouseLeave={clearIndex}
            >
              <div className={styles.optionlist}>
                {prof.profName}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
              </div>
              <div className={styles.lists}>
                <ul className={styles.sub}>
                  {prof.specialIn.map((special, j) => (
                    <Link href={`/profile/search?q=${special}`}>
                      <li key={j} className={activeIndex == i ? styles.active : ""}>{special}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
      <ul className={styles.details}>
        {
          professional.map((prof,i) => (
            <Details prof={prof} key={i} />
          ))
        }
        </ul>
      </div>
    </>
  );
};

