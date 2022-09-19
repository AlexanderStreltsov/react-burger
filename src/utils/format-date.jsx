import moment from "moment";
import "moment/locale/ru";

export const formatDate = (date) => {
  const formatDate = moment(date);

  let formatted = formatDate.calendar().replace(", в", ",");

  if (!(formatted.includes("Вчера") || formatted.includes("Сегодня"))) {
    formatted = moment({ hours: 0 }).diff(
      formatDate.format("MM-DD-YYYY"),
      "days"
    );

    formatted += formatted < 5 ? " дня назад, " : " дней назад, ";
    formatted += formatDate.format("HH:mm");
  }

  formatted += " i-GMT+3";

  return formatted;
};
