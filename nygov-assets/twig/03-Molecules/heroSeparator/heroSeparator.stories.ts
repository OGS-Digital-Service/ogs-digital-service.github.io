// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";

// @ts-ignore
import heroSeparator from "./heroSeparator.twig";

const stories = storiesOf("03-Molecules/Hero Separator", module);

stories.add("Separator Bar", () => heroSeparator());
