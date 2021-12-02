// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import Buttons from "./buttons.twig";
storiesOf("04-Organisms/Buttons", module).add("Buttons", () =>
  Buttons({
    section: {
      title: "Buttons Title",
      color: "blue", // or "gold", "midgray"
      headline: "Buttons Headling Goes here",
      description: {
        processed:
          "Mauris sit amet dolor vel lacus iaculis fringilla in eget sapien. Nam feugiat ipsum quis imperdiet feugiat. Integer nunc elit, vulputate quis purus maximus, congue tempor nisi. Donec lacinia justo in fermentum facilisis. In ac purus ut massa pulvinar accumsan. Ut mauris turpis, egestas a semper vitae, rhoncus sit amet dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet placerat arcu. Nam nisi nunc, porta malesuada arcu ac, rutrum vehicula quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      buttons: [
        {
          button: {
            link: {
              title: "Developing A Policy",
              url: {
                path: "https://youtube.com",
              },
            },
          },
        },
        {
          button: {
            link: {
              title: "Cancer Screening Benefits",
              url: {
                path: "https://youtube.com",
              },
            },
          },
        },
        {
          button: {
            link: {
              title: "Testing Youtube",
              url: {
                path: "https://youtube.com",
              },
            },
          },
        },
      ],
    },
  })
);
