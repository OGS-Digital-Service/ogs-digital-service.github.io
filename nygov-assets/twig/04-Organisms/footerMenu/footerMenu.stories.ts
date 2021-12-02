import "./index";
//@ts-ignore
import FooterMenu from "./footerMenu.twig";
import { storiesOf } from "@storybook/html";
import mockData from "./footerMenu.data";

const stories = storiesOf("04-Organisms/footerMenu", module);

stories.add('Footer Menu', () => FooterMenu(mockData))