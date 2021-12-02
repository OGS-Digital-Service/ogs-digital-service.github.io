// @ts-ignore
import { storiesOf } from "@storybook/html";
import ".";
// @ts-ignore
import PlanDate from "./planDate.twig";

const stories = storiesOf("03-Molecules/Plan Date", module);
stories.add("Plan Date", () =>
  PlanDate({
    title: "2020 Labor Day Activities",
    startDate: "2020-09-15",
    endDate: "2021-09-15",
    link: "https://google.com",
    linkTitle: "Explore NYS",
    newTab: true,
    toggleEndDate: true
  })
);
