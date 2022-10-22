import moment from "moment";
import "moment/locale/ru";

export const formatDate = (date: Date) => {
  moment.suppressDeprecationWarnings = true;

  const formatDate = moment(date);

  let formatted = formatDate.calendar().replace(", в", ",");

  if (!(formatted.includes("Вчера") || formatted.includes("Сегодня"))) {
    const daysBefore = moment({ hours: 0 }).diff(
      formatDate.format("MM-DD-YYYY"),
      "days"
    );

    formatted = `${daysBefore}`;
    formatted += daysBefore < 5 ? " дня назад, " : " дней назад, ";
    formatted += formatDate.format("HH:mm");
  }

  formatted += " i-GMT+3";

  return formatted;
};
