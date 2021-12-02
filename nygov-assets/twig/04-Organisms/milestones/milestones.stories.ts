// @ts-ignore
 import { storiesOf } from "@storybook/html";
 import "./index";
 // @ts-ignore
 import Milestones from "./milestones.twig";
 import data from "./milestones.data";

 storiesOf("04-Organisms/Milestones", module).add("milestones", ()=> Milestones(data));
