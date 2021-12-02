// @ts-ignore
 import { storiesOf } from "@storybook/html";
 import "./index";
 // @ts-ignore
 import TitleBar from "./titleBar.twig";
 import mockData from "./titleBar.data";

const stories = storiesOf("04-Organisms/Title Bar", module);

stories.add("Title Bar", () => TitleBar(mockData));