// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import HeadingTwig from "./headings.twig";

const stories = storiesOf("02-Atoms/Headings", module);
  
stories.add("Section/Frame Title", () =>
  HeadingTwig({
    title: 'Section Title',
    variant: 'title'
  })
);

stories.add("Section/Frame Headline", () =>
  HeadingTwig({
    title: 'Section Headline',
    variant: 'headline'
  })
);