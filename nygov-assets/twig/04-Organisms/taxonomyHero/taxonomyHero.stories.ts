
// @ts-ignore
import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";

import "./index";
import mockData from "./taxonomyHero.data";

// @ts-ignore
import hero from "./taxonomyHero.twig";

const stories = storiesOf("04-Organisms/Taxonomy Hero Frames", module);
stories.addDecorator(withKnobs);

mockData.section.forEach((item) => {
  const data = { ...item };
  const noImage = { ...item, hero: { ...item.hero, featuredImage: null } };

  //Agency Term Hero
  if (item.heroType == "agencyTermHero") {
    stories.add("Agency Term Hero", () => {
      const imageOption = select('Image', ['Yes', 'No'], 'No');
      const output = imageOption === 'Yes' ? data : noImage;
      return hero(output);
    })
  };

  //County Term Hero
  if (item.heroType == "countyTermHero") {
    stories.add("Country Term Hero", () => {
      const imageOption = select('Image', ['Yes', 'No'], 'No');
      const output = imageOption === 'Yes' ? data : noImage;
      return hero(output);
    })
  };
});

