// @ts-ignore
import { storiesOf } from "@storybook/html";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import "./index";
// @ts-ignore
import TranslatedDocuments from "./translatedDocuments.twig";
import data from "./translatedDocuments.data";

const stories = storiesOf("04-Organisms/Translated Documents", module);
stories.addDecorator(withKnobs);

stories.add("Translated Documents (with Navigator option)", () => {
  const navigatorOption = boolean('Navigator', false);
  return TranslatedDocuments({ ...data, node: { navigator: navigatorOption } })
});
