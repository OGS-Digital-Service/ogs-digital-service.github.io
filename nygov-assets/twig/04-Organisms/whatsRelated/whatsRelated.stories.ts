// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import WhatsRelated from "./whatsRelated.twig";
storiesOf("04-Organisms/Whats Related", module).add("Whats Related", () =>
  WhatsRelated({
    section: {
      title: "What's Related",
      chapterLink: false,
      partOfNavigator: false,
      relatedLinks: [
        {
          links: {
            label: "Another test",
            type: "node",
            contentLink: {
              path: "/another-test"
            }
          }
        },
        {
          links: {
            label: "Test Bio and Links Card",
            type: "node",
            contentLink: {
              path: "/test-bio-and-links-card"
            }
          }
        }
      ]
    }
  })
);
