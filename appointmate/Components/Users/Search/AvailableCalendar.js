import { Fragment } from "react";
import GridLayout from "react-grid-layout";
import styles from "./calendar.module.css";

const AvailableCalendar = () => {
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
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
      <div className={styles.cal}>
        <div className={styles.lines}></div>
        <div className={styles.main}>
          <div className={styles.body}>
            <h1 className={styles.header}>
              {new Date(currentYear, currentMonth, 1).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h1>
            <GridLayout
              className={styles.layout}
              cols={7}
              rowHeight={24}
              width={320}
            >
              {daysOfWeek.map((day, index) => (
                <div
                  key={`day-${index}`}
                  data-grid={{ x: index, y: 0, w: 1, h: 1, static: true }}
                  className={styles.day}
                >
                  {day}
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
        </div>
      </div>
    </Fragment>
  );
};

export default AvailableCalendar;
