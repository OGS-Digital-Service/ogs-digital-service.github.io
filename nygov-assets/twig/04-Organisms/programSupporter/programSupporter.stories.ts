// @ts-ignore
 import { storiesOf } from "@storybook/html";
 import "./index";
 // @ts-ignore
 import ProgramSupporter from "./programSupporter.twig";
 import data from "./programSupporter.data";

 storiesOf("04-Organisms/ProgramSupporter", module).add("programSupporter", ()=> ProgramSupporter(data));
