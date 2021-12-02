// @ts-ignore
import { storiesOf } from "@storybook/html";
import ".";
// @ts-ignore
import CategoryTile from "./categoryTile.twig";

const stories = storiesOf("03-Molecules/Category Tile", module);
stories.add("Category Tile", () =>
  CategoryTile({
    image: "https://picsum.photos/50/50",
    link: "https://google.com",
    title: "Good Agricultural Practices",
    newTab: true
  })
);
