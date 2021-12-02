// @ts-ignore
import { storiesOf } from "@storybook/html";
import {withKnobs, boolean, select} from "@storybook/addon-knobs";
import "./index";
// @ts-ignore
import Modal from "./modal.twig"
import mockData from "./modal.data";

const stories = storiesOf("04-Organisms/Modal", module);
stories.addDecorator(withKnobs);

mockData.section.forEach((item) => {

  const output = {
    section: {
      ...item
    }
  }

  if (item.displayType == "logo") {
    stories.add("Logo Modal", () => {
      return Modal(output);
    });
  }

  if (item.displayType == "background") {
    stories.add("Background Modal", () => {
      return Modal(output);
    });
  }

  if (item.displayType == "webform") {
    stories.add("Webform Modal", () => {
      return Modal(output);
    });
  }

});

