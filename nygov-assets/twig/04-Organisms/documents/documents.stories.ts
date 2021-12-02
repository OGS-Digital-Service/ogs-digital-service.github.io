// @ts-ignore
 import { storiesOf } from "@storybook/html";
 import "./index";
 // @ts-ignore
 import TranslatedDocuments from "./documents.twig";
 import data from "./documents.data";

 storiesOf("04-Organisms/Documents", module).add("Documents", ()=> TranslatedDocuments(data));
