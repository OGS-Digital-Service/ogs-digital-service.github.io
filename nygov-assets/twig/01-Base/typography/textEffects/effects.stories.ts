// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";

// @ts-ignore
import Effects from "./effects.twig";

const weightStories = storiesOf("01-Base/Typography/effects", module);

weightStories.add("Font Effects", () =>
  Effects(
    {
      effects: [
        {
          effect: "italic",
          className: "text-italic"
        },
      ]
    }
  )
)