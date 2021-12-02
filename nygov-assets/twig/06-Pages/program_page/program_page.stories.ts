import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import ProgramPage from "./program_page.twig";
import { programData } from "./program_page.data";

const stories = storiesOf("06-Pages/Pages", module);

stories.add("Program Page", () => {
  return ProgramPage(programData);
});
