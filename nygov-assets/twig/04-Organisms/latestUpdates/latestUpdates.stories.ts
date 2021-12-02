import "./index";
//@ts-ignore
import LatestUpdates from "./latestUpdates.twig";
import { storiesOf } from "@storybook/html";
import mockData from "./latestUpdates.data";

const stories = storiesOf("04-Organisms/Emergency Latest Updates", module);

stories.add("Emergency Latest Updates", () => LatestUpdates(mockData));
