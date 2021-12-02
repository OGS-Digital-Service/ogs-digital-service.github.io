// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import Alerts from "./alerts.twig";
storiesOf("04-Organisms/Alerts", module).add("Alerts", () =>
  Alerts({
    section: {
      alerts: [
        {
          section: {
            type: "ParagraphAlerts",
            description: {
              content: "<p>Ut tempor at purus ac ornare. Nunc vel neque ultrices, rutrum purus ac, consectetur metus. Praesent consequat dictum lorem, a ultricies ligula gravida id. Cras et mi vitae urna auctor convallis at ornare dui.</p>\n"
            },
            status: "not_in_service",
            title: "Test Alert 1",
            link: {
              "url": {
                "path": "/"
              }
            }
          }
        },
        {
          section: {
            type: "ParagraphAlerts",
            description: {
              content: "<p>Aliquam euismod velit odio, eu cursus augue vulputate sed. Donec lacinia, felis non ornare eleifend, </p>\n"
            },
            status: "partially_affected",
            title: "Test 2",
          }
        },
        {
          section: {
            type: "ParagraphAlerts",
            description: {
              content: "<p>Praesent tellus velit, pharetra vel tincidunt id, consequat quis leo. Phasellus at ligula quis est dictum hendrerit at ac leo. Curabitur gravida est sed enim auctor congue. Duis nunc ex, consectetur quis posuere ac,</p>\n"
            },
            status: "normal_service",
            title: "Test 3",
            link: {
              url: {
                path: "/test-bio-and-links-card"
              }
            }
          }
        }
      ]
    }
  })
);
