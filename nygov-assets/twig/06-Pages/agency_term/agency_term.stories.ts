import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";

import "./index";

// @ts-ignore
import AgencyTerm from "./agency_term.twig";
import { AgencyTermData } from "./agency_term.data";

const stories = storiesOf("06-Pages/Term", module);
stories.addDecorator(withKnobs);


stories.add("Agency Term", () => {
  return AgencyTerm({ term: AgencyTermData })
});

