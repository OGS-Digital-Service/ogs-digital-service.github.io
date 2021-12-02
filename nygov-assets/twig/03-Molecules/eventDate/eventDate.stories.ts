import "./index";

//@ts-ignore
import eventDate from "./eventDate.twig";
import { storiesOf } from "@storybook/html";

const stories = storiesOf("03-Molecules/eventDate", module);

stories.add("Scheduled Event Date", () =>
  eventDate({
    monthStart: "Jan",
    dayStart: "20",
    yearStart: "2020",
    timeStart: "8:00 AM",
    monthEnd: "Jan",
    dayEnd: "20",
    yearEnd: "2020",
    timeEnd: "8:00 PM",
    variant:"m-eventDate"
  })
)