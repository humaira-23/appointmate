import Navbar from "@/shared/Components/users/navbar";
import Searchbar from "@/shared/Components/users/searchBar";
import data from "@/shared/Components/users/profileData.json";
import styles from "@/pages/profile/index.module.css";
import ExploreProfile from "@/Components/Users/Search/exploreProfile";
import ExploreOption from "@/Components/Users/Search/exploreOption";
import ImageData from "@/Components/Users/Search/exploreData.json"
import { getSession } from "next-auth/react";
import Professional from "@/models/Professional";
import db from "@/utils/db";
import User from "@/models/User";
import { randomize } from "@/utils/arrays";

export default function Explore({prof,user, extraProf}) {

    return (
      <>
      <div className={styles.body}>
        <div>
          <Navbar pageActive={"search"} />
        </div>
        <div>
          <Searchbar data={data}/>
            <ExploreProfile prof={prof} user={user} />
            <ExploreOption data={ImageData} extraProf={extraProf} />
        </div>
      </div>
      </>
    );
  }

export async function getServerSideProps(context) {
  const { req, query,res } = context;
  const session = await getSession({ req });
  const profId = query.profId
  db.connectDb();
  const getProf = await Professional.findById(profId);
  const getUser = await User.findById(getProf.userId)
  const extraProf = await Professional.find({
    $and: [
      { profIn: getProf.profIn },
      { _id: { $ne: profId } }
    ]
  });
  const isProf = await Professional.find({userId: session.user.id})
  db.disconnectDb();
  if (Array.isArray(isProf) && isProf.length > 0) {
    res.setHeader("Location", "/professional/profile");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        prof: JSON.parse(JSON.stringify(isProf)),
      },
    };
  }
  const randomExtraProf = randomize(extraProf)
  const topExtraProf = randomExtraProf.slice(0,5)
  return {
    props: {
      prof: JSON.parse(JSON.stringify(getProf)),
      user: JSON.parse(JSON.stringify(getUser)),
      extraProf: JSON.parse(JSON.stringify(topExtraProf)),
    },
  };
}