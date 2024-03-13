import Navbar from "@/shared/Components/users/navbar";
import Searchbar from "@/shared/Components/users/searchBar";
import data from "@/shared/Components/users/profileData.json";
import styles from "@/pages/profile/index.module.css";
import OptionTab from "@/Components/Users/Search/optionTab";
import { getSession } from "next-auth/react";
import db from "@/utils/db";
import Profession from "@/models/Profession";
import Professional from "@/models/Professional";
import { useRouter } from "next/router";
import { randomize } from "@/utils/arrays"

export default function Search({profession, prof, user}) {

  const router = useRouter()
  const filter = ({search}) => {
    const path = router.pathname
    const {query} = router
    if(search) query.q = search

    router.push({
      pathname: path,
      query: query,
    })
  }

  const searchHandler = (search) => {
    if (search == "") {
      filter({search: {}})
    } else {
      filter({search})
    }
  }

    return (
      <>
      <div className={styles.body}>
        <div>
          <Navbar pageActive={"search"} />
        </div>
        <div>
          <Searchbar data={data} searchHandler={searchHandler} />
          <OptionTab profession={profession} professional={prof} user={user} />
        </div>
      </div>
      </>
    );
  }

export async function getServerSideProps(context) {
  const { req, query, res} = context;
  const searchQuery = query.q || ""

  const search = searchQuery && searchQuery !== ""
    ? {
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { profIn: { $regex: searchQuery, $options: "i" } },
        { specialIn: { $regex: searchQuery, $options: "i" } },
        { officeAddress: { $regex: searchQuery, $options: "i" } }
      ]
    }
    : {};

  const session = await getSession({ req });
  db.connectDb();
  const getProfession = await Profession.find({});
  const getProf = await Professional.find({...search}).lean()
  const isProf = await Professional.find({userId: session.user.id})
  db.disconnectDb();
  const randomProf = randomize(getProf)
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
  return {
    props: {
      profession: JSON.parse(JSON.stringify(getProfession)),
      prof: JSON.parse(JSON.stringify(randomProf)),
    },
  };
}