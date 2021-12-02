import "./index";
//@ts-ignore
import { storiesOf } from "@storybook/html";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import contact from "./contact.twig";
import contactData from "./contact.data";


const stories = storiesOf("04-Organisms/Contact", module);
stories.addDecorator(withKnobs);

contactData.sections.forEach((item, i) => {
  stories.add("Example " + (i+1), () => {
    const navigatorOption = boolean('Navigator', false);
    return contact( { ...item, node: { navigator: navigatorOption }} );
  });
});
