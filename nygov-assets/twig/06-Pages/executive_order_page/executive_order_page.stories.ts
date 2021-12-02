import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import ExecutiveOrderPage from "./executive_order_page.twig";
import { data } from "./executive_order_page.data";

const stories = storiesOf("06-Pages/Pages", module);

stories.add("Executive Order Page", () => {
  return ExecutiveOrderPage(data);
});
