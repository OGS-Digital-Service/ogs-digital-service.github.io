import "./index";
//@ts-ignore
import connectFooterMenu from "./connectFooterMenu.twig";
import { storiesOf } from "@storybook/html";
import mockData from "./connectFooterMenu.data";

const stories = storiesOf("04-Organisms/ConnectFooterMenu", module);

stories.add('Connect Footer Menu', () => connectFooterMenu(mockData))