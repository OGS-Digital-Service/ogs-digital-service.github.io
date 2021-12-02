// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import Document from "./document.twig";

const stories = storiesOf("03-Molecules/Documents", module);
stories.add("document download", () =>
  Document({
    item: "downloadLink",
    url: "https://google.com",
    english: "Spanish Translation",
    translated: "Traducción al español"
  })
);
