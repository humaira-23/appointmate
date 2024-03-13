import { useRouter } from "next/router";
import styles from "./exploreOption.module.css";
import Link from "next/link";

const ExploreOption = ({ data, extraProf }) => {
  const router = useRouter();

  const navigateTo = () => {
    router.push("/profile/search");
  };
  return (
    <>
    <div className={styles.body}>
      <h2>See Also</h2>
      <ul className={styles.details}>
        {extraProf.map((prof, i) => (
          <div className={styles.card} key={i}>
            <li >
              <div className={styles.content}>
                <img
                  src={prof.workspace[0].url}
                />
                <Link href={`/profile/search/explore/${prof._id}`}>
                <h3>{prof.name}</h3>
                </Link>
              </div>
            </li>
          </div>
        ))}
      </ul>
      </div>
    </>
  );
};

export default ExploreOption;

// // pages/index.js
// import Image from 'next/image';
// import React from 'react';

// const ImageCard = ({ imageUrl }) => {
//   return (
//     <div className="image-card">
//       <Image src={imageUrl} alt="Random Image" />
//     </div>
//   );
// };

// const ExploreOption = ({ randomImages }) => {
//   if (!randomImages || randomImages.length === 0) {
//     return <p>No random images available</p>;
//   }

//   return (
//     <div className="image-container">
//       {randomImages.map((image, index) => (
//         <ImageCard key={index} imageUrl={image} />
//       ))}
//     </div>
//   );
// };

// export async function getStaticProps() {
//   const jsonData = require('./exploreData.json');
//   const allImages = jsonData.image || [];

//   const randomImages = [];
//   for (let i = 0; i < 5; i++) {
//     const randomIndex = Math.floor(Math.random() * allImages.length);
//     randomImages.push(allImages[randomIndex]);
//   }

//   return {
//     props: {
//       randomImages,
//     },
//   };
// }

// export default ExploreOption;
