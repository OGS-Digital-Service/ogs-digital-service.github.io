// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";

// @ts-ignore
import filterItems from "./filterItems.twig";
import mockData from "./filterItems.data";

const stories = storiesOf("03-Molecules/Filter Items", module);
//Sidebar Section
stories.add("Sidebar Title", () =>
  filterItems({
    title: mockData.section.sidebar.title,
    variant: "m-sidebar__title",
  })
);
stories.add("Sidebar Labels", () =>
  filterItems({
    label: mockData.section.sidebar.labels,
    variant: "m-sidebar__label",
  })
);
stories.add("Sidebar SubTitle", () =>
  filterItems({
    subheadline: mockData.section.sidebar.subTitle,
    variant: "m-sidebar__subTitle",
  })
);
stories.add("Sidebar Search ", () =>
  filterItems({ variant: "m-sidebar__search" })
);
stories.add("Sidebar Select All Label", () =>
  filterItems({
    label: mockData.section.sidebar.label,
    variant: "m-sidebar__selectAll",
  })
);
stories.add("Sidebar Date Input", () =>
  filterItems({ label: "Date Range", variant: "m-sidebar__date" })
);

//Results Section
stories.add("Results Search Information", () =>
  filterItems({
    text: "100",
    label: "Results",
    variant: "m-sidebar__search -info",
  })
);

stories.add("Results Card Content", () =>
  filterItems({
    category: mockData.section.results.card.content.category,
    title: mockData.section.results.card.content.title,
    description: mockData.section.results.card.content.description,
    url: mockData.section.results.card.content.url,
    variant: "m-resultsCard__content",
  })
);

//Scheduled Event Card Section
stories.add("Events Scheduled Results Card", () =>
  filterItems({
    category: mockData.section.results.card.content.category,
    title: mockData.section.results.card.content.title,
    month: mockData.section.results.card.ScheduledEventCard.date.month,
    day: mockData.section.results.card.ScheduledEventCard.date.day,
    year: mockData.section.results.card.ScheduledEventCard.date.year,
    time: mockData.section.results.card.ScheduledEventCard.timeLocation.time,
    location:
      mockData.section.results.card.ScheduledEventCard.timeLocation.location,
    variant: "m-resultsCard__scheduledEvent",
  })
);

//Footer Section
stories.add("Results Follow Footer Bar", () =>
  filterItems({
    text: mockData.section.results.card.footer.text,
    url: mockData.section.results.card.footer.url,
    variant: "m-resultsCard__footer -follow",
  })
);

stories.add("Results Share Footer Bar", () =>
  filterItems({
    text: mockData.section.results.card.footer.text,
    url: mockData.section.results.card.footer.url,
    variant: "m-resultsCard__footer -share",
  })
);

stories.add("Download Footer Bar", () =>
  filterItems({
    text: mockData.section.results.card.footer.text,
    url: mockData.section.results.card.footer.url,
    variant: "m-resultsCard__footer -download",
  })
);

//Pagination
stories.add("Pagination", () =>
  filterItems({
    url: "https://google.com",
    index: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    variant: "m-results__pagination",
  })
);
