import "./index";
//@ts-ignore
import Connect from "./connect.twig";
import { storiesOf } from "@storybook/html";
import mockData from "./connect.data";

const stories = storiesOf("04-Organisms/Connect", module);

stories.add('Connect Paragraph', () => Connect(mockData))