import "./index";
//@ts-ignore
import Cards from "./cards.twig";
import { storiesOf } from "@storybook/html";
import mockData from "./cards.data";

const stories = storiesOf("04-Organisms/Card Types", module);

const placeholderImage = {
  desktopImg: {
    derivative: {
      url: "./placeholders/NYGov_NYS_16x9.png",
    },
  },
  tabletImg: {
    derivative: {
      url: "./placeholders/NYGov_NYS_Square.png",
    },
  },
  mobileImg: {
    derivative: {
      url: "./placeholders/NYGov_NYS_16x9.png",
    },
  },
};

mockData.section.forEach((item) => {
  const imageData = item.card.image.entity.desktopImg.derivative.url
    ? { ...item.card.image.entity }
    : placeholderImage;
  const output = {
    ...item,
    card: {
      ...item.card,
      image: { ...item.card.image, entity: imageData },
    },
  };
  if (item.cardType == "default_card" && item.card.referenceType == "MediaCard") {
    stories.add("Default Card", () => {
      return Cards(output);
    });
  }
  if (item.cardType == "mobile_app_card") {
    stories.add("Mobile App Card", () => {
      return Cards(output);
    });
  }
  if (item.cardType == "featured_hero_card") {
    stories.add("Hero Card", () => {
      return Cards(output);
    });
  }

  if (item.cardType == "stats_card") {
    stories.add("Stats Card", () => {
      return Cards(output);
    });
  }
  if (item.cardType == "default_card" && item.card.referenceType == "NodeService") {
    stories.add("Services Card", () => {
      return Cards(output);
    });
  }
});
