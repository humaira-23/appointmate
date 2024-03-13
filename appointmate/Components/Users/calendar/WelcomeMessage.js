import styles from "@/Components/Users/calendar/welcomeMessage.module.css"

const WelcomeMessage = ({user}) => {

    return (
      <>  
      <div className={styles.body}>
        <h2>Welcome {user.name},</h2>
        <p>Check the latest update on your calender</p>
      </div>
      </>
    );
  }

export default WelcomeMessage;