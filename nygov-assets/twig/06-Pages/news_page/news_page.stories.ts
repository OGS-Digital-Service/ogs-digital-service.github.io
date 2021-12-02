import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import NewsPage from "./news_page.twig";
import { newsPageData } from "./news_page.data";

const stories = storiesOf("06-Pages/Pages", module);

stories.add("News Page", () => {
  return NewsPage(newsPageData);
});
