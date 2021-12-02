import "./index";

//@ts-ignore
import CardData from "./cardData.twig";
import { storiesOf } from "@storybook/html";

const stories = storiesOf("03-Molecules/CardContent", module);
stories.add("default card content", () =>
  CardData({
    label: "Testing Card Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
    url: "https://google.com",
    variant: "m-card__default",
  })
)
stories.add("stats card content", () =>
  CardData({
    label: "Testing Card Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
    fieldStats: "$325 Million Financial Aid",
    variant: "m-card__stats"
  })
);
