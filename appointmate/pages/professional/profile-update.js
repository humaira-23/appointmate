import Navbar from "@/shared/Components/professional/navbar";
import Searchbar from "@/shared/Components/professional/searchbar";
import data from "@/shared/Components/professional/profileData.json";
import styles from "@/pages/professional/index.module.css";
import UpdateForm from "@/Components/professional/updateForm";
import Professional from "@/models/Professional";
import User from "@/models/User";
import { getSession } from "next-auth/react";
import db from "@/utils/db";


export default function UpdateProfessional({professional}) {

  console.log(professional)

    return (
      <>
      <div className={styles.body}>
        <div>
          <Navbar pageActive={"profile"} />
        </div>
        <div>
          <Searchbar data={data}/>
          <div className={styles.content}>
            <UpdateForm user={professional}/>
          </div>
        </div>
      </div>
      </>
    );
  }

export async function getServerSideProps(context) {
    const {req} = context
    const session = await getSession({req})
    db.connectDb()
    console.log(session)
    const getUser = await User.findById(session.user.id)
    console.log(getUser);
    const getProfessional = await Professional.find({userId: getUser._id }) 
    console.log(getProfessional)
    db.disconnectDb()
  
    return {
      props: {
        professional: JSON.parse(JSON.stringify(getProfessional)),
        user: JSON.parse(JSON.stringify(getUser)),
      }
    }
  }