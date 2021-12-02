import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import Emergency from "./emergency_page.twig";
import { heroData, latestUpdatesData, alertsData, sectionsData } from "./emergency_page.data";

const stories = storiesOf("06-Pages/Pages", module);

stories.add("Emergency Page", () =>
  Emergency({
    node: {
      ...heroData,
      ...latestUpdatesData,
      ...alertsData,
      ...sectionsData
    },
  })
);
