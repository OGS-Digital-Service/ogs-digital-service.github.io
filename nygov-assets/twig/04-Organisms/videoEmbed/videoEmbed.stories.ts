// @ts-ignore
import { storiesOf } from "@storybook/html";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import "./index";
// @ts-ignore
import VideoEmbed from "./videoEmbed.twig";
import data from "./videoEmbed.data";

const stories = storiesOf("04-Organisms/Video Embed", module);
stories.addDecorator(withKnobs);

stories.add("Video Embed (with cover image)", () => {
  const navigatorOption = boolean('Navigator', false);
  const centerLayoutOption = boolean('Use center layout (Program, Landing)', false);
  return VideoEmbed({ ...data.sections[0], node: { navigator: navigatorOption, bundle: centerLayoutOption ? 'program' : ''} });
});

stories.add("Video Embed (no cover image)", () => {
  const navigatorOption = boolean('Navigator', false);
  const centerLayoutOption = boolean('Use center layout (Program, Landing)', false);
  return VideoEmbed({ ...data.sections[1], node: { navigator: navigatorOption, bundle: centerLayoutOption ? 'program' : ''} });
});
