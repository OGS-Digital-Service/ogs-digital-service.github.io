import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import NotFoundPage from "./not_found_page.twig";

const stories = storiesOf("06-Pages/Pages", module);

stories.add("Not Found Page", () => {
  return NotFoundPage();
});
