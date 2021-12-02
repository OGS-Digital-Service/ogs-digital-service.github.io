// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import programNote from "./notes/programLabel.md";

// @ts-ignore
import Link from "./link.twig";

storiesOf("02-Atoms/Link", module)
  .add("Label link", () =>
    Link({
      url: "https://google.com",
      content: "Label Link",
      variant: "a-label__link",

    })
  )
  .add(
    "Hero label Link",
    () =>
      Link({
        url: "https://google.com",
        content: "Hero label Link",
        variant: "a-hero__link",
      }),
    { notes: { markdown: programNote } }
  )
  .add("In body link", () =>
    Link({
      url: "https://google.com",
      content: "A link inside a paragraph.",
      variant: "a-body__link",

    })
  )
  .add("Alert link", () =>
    Link({
      url: "https://google.com",
      content: "Alert Link",
      variant: "a-alert__link",

    })
  )
  .add("Card Label", () =>
    Link({
      content: "Card Label",
      url: "https://google.com",
      variant: "a-card__label",
    })
  )
  .add("Icon Link ", () =>
    Link({
        url: "https://example.com/",
        variant: "a-facebook__icon-link",
        icon: "a-facebook -icon",
        newTab: true,
    })
  )
  .add("Results Card Website Link ", () =>
    Link({
      url: "https://example.com/",
      content: "Results Card Website Link",
      variant: "a-resultsCard__website -link",
    })
  )
  .add("Audio Photo Link ", () =>
    Link({
      url: "https://example.com/",
      content: "Audio",
      variant: "a-audio-photo__link",
    })
  )
  .add("Plan Link ", () =>
    Link({
      url: "https://example.com/",
      content: "Explore NYS",
      variant: "a-plan-date__link",
    })
  )
  .add("Modal Link ", () =>
    Link({
      url: "https://example.com/",
      content: "Sign the Petition",
      variant: "a-modal__link",
    })
  );

