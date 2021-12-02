import "./index";

//@ts-ignore
import Highlight from "./highlight.twig";
import { storiesOf } from "@storybook/html";
import mockData from "./highlight.data";

const stories = storiesOf("04-Organisms/Highlight", module);

stories.add("Highlight", () => {
  return Highlight(mockData);
})