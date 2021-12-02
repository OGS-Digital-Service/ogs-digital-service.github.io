// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import Supporter from "./supporter.twig";

const stories = storiesOf("03-Molecules/Supporter", module);
stories.add("supporter", () =>
  Supporter({
    name: "Name One",
    title: "Title One",
    quote: "Accenture is proud to be part of New York State’s innovative approach to helping citizens outmaneuver the uncertainty of this pandemic. Accenture has committed skilled technology team members to help address New York’s urgent and high impact coronavirus response activities. We stand together with the state’s digital team to help ensure citizens can access the information they need during this difficult time.",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
  })
);
