import { storiesOf } from "@storybook/html";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import "./index";
// @ts-ignore
import ServicePage from "./service_page.twig";
import { servicePageData } from "./service_page.data";

const stories = storiesOf("06-Pages/Pages", module);
stories.addDecorator(withKnobs);

stories.add("Service Page", () => {
  const navigatorOption = boolean('Navigator', false);
  return ServicePage({ node: { ...servicePageData.node, navigator: navigatorOption } });
});
