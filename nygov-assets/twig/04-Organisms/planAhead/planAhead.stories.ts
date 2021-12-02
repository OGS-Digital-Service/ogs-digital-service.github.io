// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import PlanAhead from "./planAhead.twig";
storiesOf("04-Organisms/Plan Ahead", module).add("Plan Ahead", () =>
  PlanAhead({
    section: {
      title: "Plan",
      headline: "Ahead",
      color: "gold",
      datesParagraphs: [
        {
          paragraph: {
            title: "2020 Labor Day Activities 2020 Labor Day Activities",
            startDate: {
              value: "03-01-2020"
            },
            endDate: {
              value: "03-01-2022"
            },
            link: {
              url: {
                path: "https://google.com"
              },
              title: "Explore NYS"
            },
            newWindow: true,
            toggleDate: true
          }
        },
        {
          paragraph: {
            title: "Special Enrollment Period Deadline",
            startDate: {
              value: "03-01-2020"
            },
            endDate: {
              value: "03-01-2022"
            },
            link: {
              url: {
                path: "https://google.com"
              },
              title: "Get Health Coverage"
            },
            newWindow: true,
            toggleDate: true
          }
        },
        {
          paragraph: {
            title: "Census Response Deadline",
            startDate: {
              value: "03-01-2020"
            },
            endDate: {
              value: "03-01-2022"
            },
            link: {
              url: {
                path: "https://google.com"
              },
              title: "Respond to the Census"
            },
            newWindow: true,
            toggleDate: true
          }
        }
      ]
    }
  })
);
