import styles from "@/Components/Users/welcome.module.css"

const WelcomeNote = ({user}) => {
    return (
      <> 
      <div className={styles.main}>
        <div className={styles.greetings}>
            <h2 suppressHydrationWarning={true}>Hello, {user.name}</h2>
            <p>Let's manage your time to enhance productivity</p>
        </div>
        <div className={styles.message}>
            <div>
                <h2>you have an appointment soon! </h2>
                <p>checkout your calendar to know your schedule.</p>
            </div>
        </div>
        </div> 
      </>
    );
  }

export default WelcomeNote;