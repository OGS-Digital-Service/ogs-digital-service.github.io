// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import CategoriesTiles from "./categoriesTiles.twig";
import data from "./categoriesTiles.data";

storiesOf("04-Organisms/CategoriesTiles", module).add("CategoriesTiles", () =>
CategoriesTiles(data));
