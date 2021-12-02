// @ts-ignore
import { storiesOf } from "@storybook/html";
import ".";
// @ts-ignore
import QuickLink from "./quickLink.twig";

const stories = storiesOf("03-Molecules/Quick Link", module);
stories.add("Quick Link", () =>
  QuickLink({
    image: "https://picsum.photos/110/110",
    title: "2020 Labor Day Activities",
    description: "Suspendisse mollis bibendum massa quis hendrerit. Duis dolor justo, imperdiet non nibh quis, rhoncus egestas neque. Nunc consectetur faucibus massa",
    link: "https://google.com",
    newTab: true,
    nodeType: "NodeArticlePage"
  })
);
