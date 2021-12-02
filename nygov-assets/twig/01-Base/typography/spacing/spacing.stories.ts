// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";

// @ts-ignore
import spacing from "./spacing.twig";

const spacingStories = storiesOf("01-Base/Typography/spacing", module);

spacingStories.add("Spacing", () =>
  spacing(
    {
      space: [
        {
          className: "text-1-space",
          space: "1 px",
        },
        {
          className: "text-2-space",
          space: "2 px",
        },
        {
          className: "text-4-space",
          space: "4 px",
        }]
    })
);

