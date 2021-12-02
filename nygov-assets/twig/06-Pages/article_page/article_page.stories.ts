import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import ArticlePage from "./article_page.twig";
import {articlePageData} from "./article_page.data";

const stories = storiesOf("06-Pages/Pages", module);

stories.add("Article Page", () => {
  return ArticlePage(articlePageData);
});


stories.add("Navigator - Article Page", () => {
  return ArticlePage({
    node: {
      ...articlePageData.node,
      navigator: true,
    }
  });
});
