import { storiesOf } from "@storybook/html";

import "./index";
import mockData from "./popularServices.data";

// @ts-ignore
import PopularServices from "./popularServices.twig";

const stories = storiesOf("04-Organisms/Popular Services", module);

stories.add("Popular Services", () =>
  PopularServices({
    section: mockData.section,
  })
);