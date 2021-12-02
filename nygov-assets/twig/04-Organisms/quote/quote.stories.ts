// @ts-ignore
 import { storiesOf } from "@storybook/html";
 import "./index";
 // @ts-ignore
 import Quote from "./quote.twig";
 import data from "./quote.data";

 storiesOf("04-Organisms/Quote", module).add("quote", ()=> Quote(data));
