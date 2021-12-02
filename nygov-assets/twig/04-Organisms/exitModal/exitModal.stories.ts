import "./index";

//@ts-ignore
import ExitModal from "./exitModal.twig";
import { storiesOf } from "@storybook/html";

const stories = storiesOf("04-Organisms/Exit Modal", module);

//@ts-ignore
stories.add("Exit Modal", () => {

  const html = stringToHTML(ExitModal());
  const modal = html.querySelector('#o-exitModal');

  // @ts-ignore
  modal.style.display = 'block';
  return modal?.outerHTML;
})

const stringToHTML = function (str: string) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};