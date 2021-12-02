// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";

// @ts-ignore
import Title from "./title.twig";

storiesOf("02-Atoms/Title", module)
  .add(
    "Emergency Title",
    () =>
      Title({
        title: "Emergency Title",
        classNames: "a-hero__emergency -title",
        variant: "heading"
      }),
  )
  .add(
    "Hero Title",
    () =>
      Title({
        title: "This is a title in a hero",
        classNames: "a-hero__title",
        variant: "title"
      }),
    {
      backgrounds: [
        {
          name: "NYGOV Blue",
          value: "#007AC2",
          default: true,
        },
      ],
    }
  )
  .add("Buttons Frame Title", () =>
    Title({
      title: "Title for buttons frame",
      classNames: "a-buttons__title",
      variant: "title"
    })
  )
  .add("Buttons Frame Headline", () =>
    Title({
      headline: "Headline for buttons frame",
      classNames: "a-buttons__headline",
      variant: "headline"
    })
  )
  .add("Card Title", () =>
    Title({
      title: "Card Frame Title",
      classNames: "a-card__title",
      variant: "title"
    })
  )
  .add("Card SubHeadline", () =>
    Title({
      headline: "Card Frame SubHeadline",
      classNames: "a-card__subHeadline",
      variant: "headline"
    })
  )
  .add("Filter Title", () =>
    Title({
      title: "Filter Title",
      classNames: "a-sidebar__title",
      variant: "title"
    })
  )
  .add("Filter SubTitle", () =>
    Title({
      headline: "Filter SubTitle",
      classNames: "a-sidebar__subTitle",
      variant: "headline"
    })
  )
  .add("Results Card Title Name ", () =>
    Title({
      url: "http://www.ny.gov/agencies/511ny",
      headline: "Title",
      classNames: "a-resultsCard__title",
      variant: "headline"
    })
  )
  .add("NY.Gov Hero View Header", () =>
    Title({
      title: "The official website of New York State",
      classNames: "a-nygov__hero -slogan",
      variant: "title"
    })
  );
