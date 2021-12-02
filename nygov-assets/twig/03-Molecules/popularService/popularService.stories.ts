import { storiesOf } from "@storybook/html";

import "./index";
import mockData from "./popularService.data";

// @ts-ignore
import popularService from "./popularService.twig";

const stories = storiesOf("03-Molecules/Popular Service", module);

stories.add("Title", () =>
  popularService({
    title: mockData.title,
    linkText: mockData.readMore.linkText,
    url: mockData.readMore.url.path,
    variant: "m-popularService__title"
  })
);

stories.add("Card", () =>
  popularService({
    card: mockData.card,
    variant: "m-popularService__card"
  })
);
