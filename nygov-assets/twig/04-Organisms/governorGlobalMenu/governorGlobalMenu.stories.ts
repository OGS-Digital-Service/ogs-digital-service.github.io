import "./index";
//@ts-ignore
import governorGlobalMenu from "./governorGlobalMenu.twig";
import { storiesOf } from "@storybook/html";
import mockData from "./governorGlobalMenu.data";

const stories = storiesOf("04-Organisms/Governor Global Menu", module);

stories.add('Governor Global Menu', () => governorGlobalMenu(mockData))