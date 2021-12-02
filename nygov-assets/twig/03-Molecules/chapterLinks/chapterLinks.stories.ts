import "./index";

//@ts-ignore
import ChapterLinks from "./chapterLinks.twig";
import { storiesOf } from "@storybook/html";

const stories = storiesOf("03-Molecules/ChapterLinks", module);
stories.add("Chapter Links", () =>
  ChapterLinks({
    chapterLinks: [
      {
        url: {
          path: "https://google.com",
        },
        linkText: "Overview",
      },
      {
        url: {
          path: "https://google.com",
        },
        linkText: "Eligibility",
      },
      {
        url: {
          path: "https://google.com",
        },
        linkText: "Apply",
      },
    ],
    variant: "m-card__chapterLinks",
  })
);
