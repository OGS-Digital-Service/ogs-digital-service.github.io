// @ts-ignore
import { storiesOf } from "@storybook/html";

import "./index";
import mockData from "./heroItems.data";

// @ts-ignore
import heroItems from "./heroItems.twig";

const stories = storiesOf("03-Molecules/Hero Items", module);

//Landing Hero
stories.add("Landing Page Hero Items", () =>
  heroItems({
    hero: mockData.section.landingHero,
    variant: "m-landingPage__hero -items",
  })
);

//Article Hero
stories.add("Article Hero Items", () =>
  heroItems({
    hero: mockData.section.articleHero,
    variant: "m-articlePage__hero -items",
  })
);

//Program Hero
stories.add("Program Hero Items", () =>
  heroItems({
    hero: mockData.section.programHero,
    variant: "m-programPage__hero -items",
  })
);

//Emergency Hero
stories.add("Emergency Hero Items", () =>
  heroItems({
    hero: mockData.section.emergencyHero,
    variant: "m-emergencyPage__hero -items",
  })
);

//Service Hero
stories.add("Service Hero Items", () =>
  heroItems({
    hero: mockData.section.serviceHero,
    variant: "m-servicePage__hero -items",
  })
);

//News Hero
stories.add("News Hero Items", () =>
  heroItems({
    hero: mockData.section.newsHero,
    variant: "m-newsPage__hero -items",
  })
);

//Executive Order Hero
stories.add("Executive Order Hero Items", () =>
  heroItems({
    hero: mockData.section.executiveOrderHero,
    variant: "m-executiveOrderPage__hero -items",
  })
);

//ScheduledEvent Hero
stories.add("ScheduledEvent Hero Items", () =>
  heroItems({
    hero: mockData.section.scheduledEventHero,
    variant: "m-scheduledEventPage__hero -items",
  })
);

//Bio Hero
stories.add("Biography Hero Items", () =>
  heroItems({
    hero: mockData.section.bioHero,
    variant: "m-bioPage__hero -items",
  })
);

//Agency Hero
stories.add("Agency Term Hero Items", () =>
  heroItems({
    hero: mockData.section.agencyHero,
    variant: "m-agencyTerm__hero -items",
  })
);

//County Hero
stories.add("County Hero Items", () =>
  heroItems({
    hero: mockData.section.countyHero,
    variant: "m-countyTerm__hero -items",
  })
);
