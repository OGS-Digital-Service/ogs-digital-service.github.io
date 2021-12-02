// @ts-ignore
import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";

import "./index";
import mockData from "./hero.data";

// @ts-ignore
import hero from "./hero.twig";

const stories = storiesOf("04-Organisms/Hero Frames", module);
stories.addDecorator(withKnobs);

mockData.section.forEach((item) => {
  const data = { ...item };
  const liveOff = { ...item, hero: { ...item.hero, stream: null } };
  const noImage = { ...item, hero: { ...item.hero, featuredImage: null } };

  //Landing Hero
  if (item.heroType == "landingPageHero") {
    stories.add("landingPage Hero", () => {
      const showLiveOption = select("Live", ["Yes", "No"], "No");
      const output = showLiveOption === "Yes" ? data : liveOff;
      return hero(output);
    });
  }

  //Article Hero
  if (item.heroType == "articlePageHero") {
    stories.add("Article Hero", () => {
      const imageOption = select("Image", ["Yes", "No"], "No");
      const output = imageOption === "Yes" ? data : noImage;
      return hero(output);
    });
  }

  //Program Hero
  if (item.heroType == "programPageHero") {
    stories.add("Program Hero", () => {
      const imageOption = select("Image", ["Yes", "No"], "No");
      const output = imageOption === "Yes" ? data : noImage;
      return hero(output);
    });
  }

  //Emergency Hero
  if (item.heroType == "emergencyPageHero") {
    stories.add("Emergency Hero", () => {
      return hero(data);
    });
  }

  //Service Hero
  if (item.heroType == "servicePageHero") {
    stories.add("Service Hero", () => {
      const imageOption = select("Image", ["Yes", "No"], "No");
      const output = imageOption === "Yes" ? data : noImage;
      return hero(output);
    });
  }

  //News Hero
  if (item.heroType == "newsPageHero") {
    stories.add("News Hero", () => {
      const imageOption = select("Image", ["Yes", "No"], "No");
      const output = imageOption === "Yes" ? data : noImage;
      return hero(output);
    });
  }

  //Executive Order Hero
  if (item.heroType == "executiveOrderPageHero") {
    stories.add("Executive Order Hero", () => {
      const imageOption = select("Image", ["Yes", "No"], "No");
      const output = imageOption === "Yes" ? data : noImage;
      return hero(output);
    });
  }

  //ScheduledEvent Hero
  if (item.heroType == "scheduledEventPageHero") {
    stories.add("ScheduledEvent Hero", () => {
      const imageOption = select("Image", ["Yes", "No"], "No");
      const output = imageOption === "Yes" ? data : noImage;
      return hero(output);
    });
  }

  //Biography Hero
  if (item.heroType == "bioPageHero") {
    stories.add("Biography Hero", () => {
      return hero(data);
    });
  }
});
