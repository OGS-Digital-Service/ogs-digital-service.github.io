// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import Buttons from "./buttons.twig";

const stories = storiesOf("02-Atoms/Buttons", module);
const filterStories = storiesOf("02-Atoms/Buttons/Filters Items", module);

const paginateButtonsStyles = [
  {
    label: "Paginate Next Large",
    variant: "paginate-next-large",
  },
  {
    label: "Paginate Previous Large",
    variant: "paginate-previous-large",
  },
  {
    label: "Paginate Next Large Disabled",
    variant: "paginate-next-large-disabled",
  },
  {
    label: "Paginate Previous Large Disabled",
    variant: "paginate-previous-large-disabled",
  },
  {
    label: "Paginate Next",
    variant: "paginate-next",
  },
  {
    label: "Paginate Previous",
    variant: "paginate-previous",
  },
  {
    label: "Paginate Next Disabled",
    variant: "paginate-next-disabled",
  },
  {
    label: "Paginate Previous Disabled",
    variant: "paginate-previous-disabled",
  },
];

for (const button of paginateButtonsStyles) {
  filterStories.add(button.label, () => Buttons({ variant: button.variant }));
}

filterStories.add("Paging Button", () =>
  Buttons({ variant: "paginate-page", pageNumbers: [1, 2, 3, 4, 5] })
);

stories
  .add(
    "Hero Watch Live Button",
    () =>
      Buttons({
        url: "/front",
        title: "Hero Link",
        variant: "a-hero__btn -link",
      }),
    {
      backgrounds: [
        {
          name: "NYGOV Blue",
          value: "#128ec3",
          default: true,
        },
      ],
    }
  )
  .add("Hero Archive Button", () =>
    Buttons({
      url: "/front",
      title: "Hero Link",
      variant: "a-hero__btn -link -archive",
    })
  )
  .add("Hero Live Now Button", () =>
    Buttons({
      url:
        "https://players.brightcove.net/2886492229001/default_default/index.html?videoId=5452960876001",
      title: "Live Now",
      variant: "a-hero__btn -live",
    })
  )
  .add("Buttons Frame Button", () =>
    Buttons({
      url: "https://google.com",
      title: "State of the State 2019",
      variant: "a-btn__link",
    })
  )
  .add("Card Category Mobile", () =>
    Buttons({
      url: "https://google.com",
      title: "App Category",
      variant: "a-buttons__cardCat",
    })
  )
  .add(" Stats Category", () =>
    Buttons({
      url: "https://google.com",
      title: "Stats Category",
      variant: "a-buttons__stats",
    })
  )
  .add(
    "Stats Learn More",
    () =>
      Buttons({
        url: "https://google.com",
        title: "Learn More",
        variant: "a-buttons__statsLM",
      }),
    {
      backgrounds: [
        {
          value: "#24387e",
          default: true,
        },
      ],
    }
  );
