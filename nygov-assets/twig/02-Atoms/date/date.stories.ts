// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import DateTwig from "./date.twig";

storiesOf("02-Atoms/Date", module)
  .add("Hero Date", () =>
    DateTwig({
      date: "July 2, 2019",
      classNames: "a-hero__date",
      variant: "date"
    })
  );

