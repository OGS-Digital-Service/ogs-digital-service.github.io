//@ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";

//@ts-ignore
import TitleBar from "./titleBar.twig";

storiesOf("03-Molecules/Title Bar", module)
  .add("Title Bar", () =>
    TitleBar({
      title: "Title Bar",
      text: "Title Bar Subtitle",
      variant: "m-titleBar",
      }
    )
  )
