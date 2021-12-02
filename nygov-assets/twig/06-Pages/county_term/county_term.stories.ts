import { storiesOf } from "@storybook/html";
import { withKnobs } from "@storybook/addon-knobs";

import "./index";

// @ts-ignore
import CountyTerm from "./county_term.twig";
import { CountyTermData } from "./county_term.data";

const stories = storiesOf("06-Pages/Term", module);
stories.addDecorator(withKnobs);


stories.add("County Term", () => {
  return CountyTerm({ term: CountyTermData })
});

