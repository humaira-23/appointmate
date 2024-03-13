import { Fragment } from "react";
import GridLayout from "react-grid-layout";
import styles from "@/Components/Users/calendar/calendarEvent.module.css";

const CalendarComponent = () => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const daysInMonth = Array.from({ length: 35 }, (_, index) => index + 1);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const generateLayout = () => {
    const layout = daysInMonth.map((day) => {
      const dayOfMonth = day - new Date(currentYear, currentMonth, 1).getDay();
      const isCurrentMonth = dayOfMonth >= 1 && dayOfMonth <= daysOfMonth;

      return {
        i: day.toString(),
        x: (day - 1) % 7,
        y: Math.floor((day - 1) / 7) + 1, // Shift by 1 to leave the first row for days of the week
        w: 1,
        h: 1,
        static: true,
        isCurrentMonth,
        dayOfMonth,
      };
    });

    return layout;
  };

  const layout = generateLayout();

  return (
    <Fragment>
        <div className={styles.body}>
            <div className={styles.header}>
                <div className={styles.title}>
        <h1 >
            {new Date(currentYear, currentMonth, 1).toLocaleString("en-US", {month: "long", year: 'numeric' 
            })}
          </h1>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="16" height="16"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
          </div>
          <div className={styles.btn}>
            <p>Schedule a Visit</p>
          </div>
          </div>
          <GridLayout
            className={styles.layout}
            cols={7}
            rowHeight={58}
            width={700}
          >
            {daysOfWeek.map((day, index) => (
              <div
                key={`day-${index}`}
                data-grid={{ x: index, y: 0, w: 1, h: 1, static: true }}
                className={styles.day}
              >
                <p>
                {day}
                </p>
              </div>
            ))}
            {layout.map((day) => (
              <div key={day.i} data-grid={day} className={styles.date}>
                <div className={styles.dayContent}>
                  <div className={styles.dayNumber}>
                    {day.isCurrentMonth ? day.dayOfMonth : ""}
                  </div>
                </div>
              </div>
            ))}
          </GridLayout>
        </div>
    </Fragment>
  );
};

export default CalendarComponent;

