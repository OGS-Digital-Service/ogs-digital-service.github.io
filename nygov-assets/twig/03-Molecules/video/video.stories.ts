// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import Video from "./video.twig";

const stories = storiesOf("03-Molecules/Video", module);
stories.add("Video", () =>
  Video({
    videoLink: "https://www.youtube.com/embed/hKYKJIBcFgQ",
    coverImageUrl: "https://picsum.photos/660/400",
    coverText: "Video Title Goes Here"
  })
);
