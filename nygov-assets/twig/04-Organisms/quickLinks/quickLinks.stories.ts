// @ts-ignore
 import { storiesOf } from "@storybook/html";
 import "./index";
 // @ts-ignore
 import QuickLinks from "./quickLinks.twig";
 import data from "./quickLinks.data";

 storiesOf("04-Organisms/QuickLinks", module).add("quickLinks", ()=> QuickLinks(data));
