// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import AudioPhoto from "./audioPhoto.twig";
storiesOf("04-Organisms/AudioPhoto", module).add("AudioPhoto", () =>
  AudioPhoto({
    section: {
      title: "A Title",
      audio: {
        url: {
          path: "https://google.com"
        },
        title: "Audio",
      },
      photos: {
        url: {
          path: "https://google.com"
        },
        title: "Photos",
      },
      otherLink: {
        url: {
          path: "https://google.com"
        },
        title: "Other",
      },
    },
  })
);
