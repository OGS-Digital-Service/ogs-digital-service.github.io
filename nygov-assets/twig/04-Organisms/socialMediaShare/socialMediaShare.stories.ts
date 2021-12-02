// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import SocialMediaShare from "./socialMediaShare.twig";
storiesOf("04-Organisms/Social Media Share", module).add("Social Media Share", () =>
  SocialMediaShare({
    url: "/some-text",
    site_host: "www.test.gov",
    section: {
      facebookToggle: true,
      twitterToggle: true,
      linkedinToggle: true,
      linkedInText: "Some text",
      twitterText: "Some text"
    }
  })
);
