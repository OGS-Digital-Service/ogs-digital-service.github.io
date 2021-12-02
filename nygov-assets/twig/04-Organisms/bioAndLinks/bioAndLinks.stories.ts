import "./index";

//@ts-ignore
import BioCard from "./bioAndLinks.twig";
import { storiesOf } from "@storybook/html";
import mockData from "./bioAndLinks.data";

const stories = storiesOf("04-Organisms/Bio and Links", module);

mockData.section.forEach((item) => {
  const output = item.card;
  if(item.card.cardType=="ParagraphBioCard"){
  stories.add("Bio Card", () => {
    return BioCard(output);
  })
}
})

