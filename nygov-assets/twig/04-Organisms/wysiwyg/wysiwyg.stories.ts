// @ts-ignore
import { storiesOf } from "@storybook/html";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import "./index";
// @ts-ignore
import Wysiwyg from "./wysiwyg.twig"
import data from "./wysiwyg.data";

const stories = storiesOf("04-Organisms/WYSIWYG", module);
stories.addDecorator(withKnobs);

stories.add("WYSIWYG (with Navigator option)", () => {
  const navigatorOption = boolean('Navigator', false);
  return Wysiwyg({ ...data, node: { navigator: navigatorOption } });
});
