// @ts-ignore
import { storiesOf } from "@storybook/html";
import {
  withKnobs,
  array
} from "@storybook/addon-knobs";

import "./index";
// @ts-ignore
import LandingPage from "./landing_page.twig";
import { titleBar, hero, wysiwyg, button, popularServices, filter, languages, default_card, mobile_app_card } from "./landing_page.data";

const stories = storiesOf("06-Pages/Pages", module);
stories.addDecorator(withKnobs);

//Example of Knobs Addon
stories.add("Landing Page", () => {
  const separator = ":";
  const defaultValues = ["titleBar","hero_live", "wysiwyg", "buttons", "popularServices", "filter", "languages", "default_card", "mobile_app_card"];

  // const value = options("Frames", values, defaultVal, optionsObj);
  const value = array("Frames Order", defaultValues, separator);

  let data = {
    node: {
      sections: [{}]
    }
  };

  if (value.length > 0) {
    for (let i = 0; i < value.length; i += 1) {
      switch (value[i]) {
        case "titleBar":
          data.node.sections.push(titleBar);
          break;
        case "default_card":
          data.node.sections.push(default_card);
          break;
        case "mobile_app_card":
          data.node.sections.push(mobile_app_card);
          break;
        case "popularServices":
          data.node.sections.push(popularServices);
          break;
        case "wysiwyg":
          data.node.sections.push(wysiwyg);
          break;
        case "filter":
          data.node.sections.push(filter);
          break;
        case "languages":
          data.node.sections.push(languages);
          break;
        case "hero_live":

          // Here we must create a new hero live object because if the user choosen
          // a non-live hero, it would've been replaced in the original data.
          const heroLive = {
            ...hero,
            section: {
              ...hero.section,
              queue: [
                {
                  ...hero.section.queue[0],
                  hero: {
                    ...hero.section.queue[0].hero,
                    stream: {
                      uri:
                        "https://players.brightcove.net/2886492229001/default_default/index.html?videoId=5452960876001",
                      title: "Watch Live"
                    },
                  }
                }
              ]
            }
          }
          data.node.sections.push(heroLive);
          break;
        case "hero":
          let heroNoLive = { ...hero }
          delete heroNoLive.section.queue[0].hero.stream;

          //This replaces the original 'hero' property in the data object.
          data.node.sections.push(heroNoLive);
          break;
        case "buttons":
          data.node.sections.push(button);
          break;
      }
    }
  }

  return LandingPage(data);
});
