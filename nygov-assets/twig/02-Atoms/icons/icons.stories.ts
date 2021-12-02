// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import Icons from "./icons.twig";

const stories = storiesOf("02-Atoms/Icons", module);

stories.add("File Icon", () => Icons({ icon: "a-file -icon" }));
stories.add("Play Icon", () => Icons({ icon: "a-play -icon" }));
stories.add("Download Icon", () => Icons({ icon: "a-download -icon" }));
stories.add("Solid Right Arrow Icon", () => Icons({ icon: "a-solidRightArrow -icon" }));
stories.add("Long Left Arrow Icon", () => Icons({ icon: "a-longLeftArrow -icon" }));
stories.add("Long Right Arrow Icon", () => Icons({ icon: "a-longRightArrow -icon" }));
stories.add("Down Arrow Icon", () => Icons({ icon: "a-downArrow -icon" }));
stories.add("Up Arrow Icon", () => Icons({ icon: "a-upArrow -icon" }));
stories.add("left Arrow Icon", () => Icons({ icon: "a-leftArrow -icon" }));
stories.add("Search Icon", () => Icons({ icon: "a-search -icon" }));
stories.add("Facebook Icon", () => Icons({ icon: "a-facebook -icon" }));
stories.add("Twiiter Icon", () => Icons({ icon: "a-twitter -icon" }));
stories.add("YouTube Icon", () => Icons({ icon: "a-youtube -icon" }));
stories.add("Flickr Icon", () => Icons({ icon: "a-flickr -icon" }));
stories.add("Pinterest Icon", () => Icons({ icon: "a-pinterest -icon" }));
stories.add("Clear All Icon", () => Icons({ icon: "a-clearAll -icon" }));
stories.add("Share Icon", () => Icons({ icon: "a-share -icon" }));
stories.add("Solid Clock Icon", () => Icons({ icon: "a-solidClock -icon" }));
stories.add("Regular Clock Icon", () => Icons({ icon: "a-clock -icon" }));
stories.add("Pin Icon", () => Icons({ icon: "a-pin -icon" }));
stories.add("Card Icon", () => Icons({ icon: "card" }));
stories.add("Check Icon", () => Icons({ icon: "check" }));
stories.add("Chapter Link Icon", () => Icons({ icon: "link" }));
stories.add("Envelope Icon", () => Icons({ icon: "envelope" }));
stories.add("Alert Icon", () => Icons({ icon: "a-alert -icon" }));
stories.add("Clock Icon", () => Icons({ icon: "clock" }));
stories.add("Map Marker Icon", () => Icons({ icon: "mapMarker" }));
stories.add("Update Icon", () => Icons({ icon: "update" }));
stories.add("Icon Arrow Circle", () => Icons({ icon: "icon-arrow-circle" }));

