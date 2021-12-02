// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";

// @ts-ignore
import Weights from "./weight.twig";

const weightStories = storiesOf("01-Base/Typography/weights", module);

weightStories.add("Font Weights", () =>
  Weights(
    {
      weights: [
        {
          weight: "Semi-bold ",
          className: "text-semi-bold"
        },
        {
          weight: "Bold",
          className: "text-bold"
        },
        {
          weight: "Extra-bold",
          className: "text-extra-bold"
        },
        {
          weight: "Regular",
          className: "text-regular"
        },
        {
          weight: "Light",
          className: "text-light"
        }
      ]
    }
  )
)