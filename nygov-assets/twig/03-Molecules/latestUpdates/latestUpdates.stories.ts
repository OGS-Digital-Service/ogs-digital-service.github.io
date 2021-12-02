// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import latestUpdates from "./latestUpdates.twig";

const stories = storiesOf("03-Molecules/Latest Updates", module);
stories.add("Latest Updates", () =>
  latestUpdates({
    latestUpdatesTitle: "Latest Updates",
    moreUpdates: {
      linkText: "More Updates",
      url: {
        path: "/front",
      },
    },
    latestUpdatesSection: [
      {
        content: {
          type: "ParagraphEmergencyUpdate",
          timeOption: true,
          date: "January 25, 2015 2.15pm",
          title:
            "Governor Cuomo Urges Commuters to Stay Home if Possible on Monday",
          description: {
            processed:
              "Roads and Public Transportation Throughout Hudson Valley, New York City and Long Island Could be Closed as a Result of Historic Blizzard Conditions with Significant Snow Accumulation",
          },
          learnMore: {
            linkText: "Learn More",
            url: {
              path: "/front",
            },
          },
        },
      },
    ],
  })
);
