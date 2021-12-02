import "./index";
//@ts-ignore
import SocialLink from "./socialLink.twig";
import { storiesOf } from "@storybook/html";
import mockData from "./socialLink.data";

const stories = storiesOf("03-Molecules/Social Link", module);
stories.add('Social Link: Icon + Text', () => SocialLink(mockData))