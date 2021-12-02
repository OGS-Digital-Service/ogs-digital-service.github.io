// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import Milestone from "./milestone.twig";

const stories = storiesOf("03-Molecules/Milestone", module);
stories.add("milestone", () =>
  Milestone({
    date: "03-01-2020",
    name: "Milestone 1"
  })
);
