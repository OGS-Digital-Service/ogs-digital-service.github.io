// @ts-ignore
import { storiesOf } from "@storybook/html";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import "./index";
// @ts-ignore
import PhotoGallery from "./photoGallery.twig";
import data from "./photoGallery.data";

const stories = storiesOf("04-Organisms/Photo Gallery", module);
stories.addDecorator(withKnobs);

stories.add("Photo Gallery (with Navigator option)", () => {
  const navigatorOption = boolean('Navigator', false);
  const centerLayoutOption = boolean('Use center layout (Program, Emergency, Landing)', false);
  return PhotoGallery({ ...data, node: { navigator: navigatorOption, bundle: centerLayoutOption ? 'program' : ''} });
});

stories.add("Photo Gallery (News Page)", () => {
  const navigatorOption = boolean('Navigator', false);
  return PhotoGallery({ ...data, node: { navigator: navigatorOption, bundle: 'news'} });
});
