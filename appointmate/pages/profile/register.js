import Navbar from "@/shared/Components/users/navbar";
import styles from "@/pages/profile/index.module.css";
import Searchbar from "@/shared/Components/users/searchBar";
import data from "@/shared/Components/users/profileData.json"
import ProfessionalRegister from "@/shared/Components/users/professionalRegister";
import db from "@/utils/db";
import Profession from "@/models/Profession";
import { getSession } from "next-auth/react";
import User from "@/models/User";
import Professional from "@/models/Professional";

export default function Users({profession, user}) {
  return (
    <>
      <div className={styles.body}>
        <div>
          <Navbar pageActive={"register"} />
        </div>
        <div>
          <Searchbar data={data}/>
          <ProfessionalRegister profession={profession} user={user} />
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps(context) {
  const {req,res} = context
  const session = await getSession({req})
  db.connectDb()
  const getProfessions = await Profession.find({}).sort({name : 1}).lean()
  const getUser = await User.findById(session.user.id)
  const getProf = await Professional.find({userId: session.user.id})
  db.disconnectDb()

  if (Array.isArray(getProf) && getProf.length > 0) {
    res.setHeader("Location", "/professional/profile");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        prof: JSON.parse(JSON.stringify(getProf)),
      },
    };
  }

  return {
    props: {
      profession: JSON.parse(JSON.stringify(getProfessions)),
      user: JSON.parse(JSON.stringify(getUser)),
    }
  }
}