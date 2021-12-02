// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";

// @ts-ignore
import Icons from "./icons.twig";

const iconStories = storiesOf("01-Base/Icons/icons", module);

iconStories.add("Icons", () =>
  Icons(
    {
      icons: [
        { className: "icon-magnifying-glass"} ,
        { className:"icon-share-arrow"},
        { className:"icon-external-link"},
        { className:"icon-up-chevron"},
        { className:"icon-down-chevron"},
        { className:"icon-right-chevron"},
        { className:"icon-left-chevron"},
        { className:"icon-right-caret"},
        { className:"icon-plus-circle"},
        { className:"icon-plus"},
        { className:"icon-plus-square"},
        { className:"icon-check-circle"},
        { className:"icon-check-mark"},
        { className:"icon-envelope"},
        { className:"icon-email-symbol"},
        { className:"icon-alert-triangle"},
        { className:"icon-play-button-arrow"},
        { className:"icon-arrow-circle"},
        { className:"icon-long-arrow-right"},
        { className:"icon-cellphone"},
        { className:"icon-phone"},
        { className:"icon-circle-hollow"},
        { className:"icon-circle-filled"},
        { className:"icon-times"},
        { className:"icon-times-circle"},
        { className:"icon-download"},
        { className:"icon-calendar"},
        { className:"icon-clock"},
        { className:"icon-file"},
        { className:"icon-globe"},
        { className:"icon-map-marker"},
        { className:"icon-info-circle"},
        { className:"icon-ellipsis"},
        { className:"icon-printer"},
        { className:"icon-quote-left"},
        { className:"icon-quote-right"},
        { className:"icon-facebook"},
        { className:"icon-instagram"},
        { className:"icon-twitter"},
        { className:"icon-youtube"},
        { className:"icon-flickr"},
        { className:"icon-pinterest"},
        { className:"icon-apple"},
        { className:"icon-google-play"},
        { className:"icon-google-plus"},
        { className:"icon-vimeo"},
        { className:"icon-vine"},
        { className:"icon-snapchat"},
        { className:"icon-tumblr"},
        { className:"icon-linkedin"},
        { className:"icon-soundcloud"},
        { className:"icon-rss"},
        { className:"icon-sync"},
        { className:"icon-long-arrow-down"},
        { className:"icon-bars"}
      ]
    }
  )
)