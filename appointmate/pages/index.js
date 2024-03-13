import NavLinks from "@/shared/Components/navlinks"
import HeroContent from "@/Components/heroContent"
import Steps from "@/Components/steps"
import Testinomials from "@/Components/testinomials"
import Footer from "@/shared/Components/footer"
import slides from "@/Components/testinomialsData.json"
import { getSession } from "next-auth/react"
import db from "@/utils/db"
import Professional from "@/models/Professional"

export default function Test({prof}) { 
    return (
        <>
        <NavLinks pageActive={"home"} prof={prof} />
        <HeroContent/>
        <Steps/>
        <Testinomials slides={slides} />
        <Footer/>
        </>
    )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  db.connectDb();
  const getProf = await Professional.find({ userId: session?.user.id });
  db.disconnectDb();
  return {
    props: {
      prof: JSON.parse(JSON.stringify(getProf)),
    },
  };
}

  