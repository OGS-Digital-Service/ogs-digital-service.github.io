// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import Biography from "./biography.twig";
storiesOf("04-Organisms/Biography", module).add("Biography", () =>
  Biography({
    section: {
      title: "A Title",
      bioImage: {
        entity: {
          bioImg: {
            derivative: {
              url: "https://picsum.photos/250/300"
            }
          }
        }
      },
      bioName: "Susan Brownell Anthony",
      bioTitle: "American suffragist",
      dateOfBirth: "1820",
      dateOfDeath: "1906",
      textFirst: {
        content: "<p>Donec eu sapien porta, varius ante sed, faucibus massa. Phasellus at pretium leo. Cras est nisi, viverra non dignissim nec, commodo id tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas ac tellus a eros pharetra suscipit eu eu sem.</p>"
      },
      bioQuote: "Quote Donec luctus, ex a cursus mollis, risus metus molestie lectus, sed gravida libero leo vitae turpis. Nullam in fringilla quam. Aenean sem nunc, auctor id tortor id, sodales convallis orci.",
      bioQuoteCredit: "S. Anthony",
      textSecond: {
        content: "<p>Donec eu sapien porta, varius ante sed, faucibus massa. Phasellus at pretium leo. Cras est nisi, viverra non dignissim nec, commodo id tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas ac tellus a eros pharetra suscipit eu eu sem.</p>"
      },
      // video: "https://www.youtube.com/watch?v=1ZYbU82GVz4",
      textThird: {
        content: "<p>Donec eu sapien porta, varius ante sed, faucibus massa. Phasellus at pretium leo. Cras est nisi, viverra non dignissim nec, commodo id tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas ac tellus a eros pharetra suscipit eu eu sem.</p>"
      },
      bioLinkTitle: "For more information, please visit:",
      bioLink: [
        {
          url: {
            path: "https://google.com"
          },
          title: "National Women's History Museum"
        },
        {
          url: {
            path: "https://google.com"
          },
          title: "Susan B. Anthony Foundation"
        }
      ]
    },
  })
);
