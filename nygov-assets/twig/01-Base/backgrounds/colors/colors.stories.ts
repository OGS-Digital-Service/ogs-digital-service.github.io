// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";

//@ts-ignore
import Colors from "./colors.twig";

const bgstories = storiesOf("01-Base/Backgrounds/colors", module);

bgstories.add("Background Colors", () =>
  Colors(
    {
      colors: [
        {
          className: "bg-alerts",
          fontColor: "#fff",
          hex: '#B52C2C'
        },
        {
          className: "bg-alerts-rollover",
          fontColor: "#fff",
          hex: '#8C1C1C'
        },
        {
          className: "bg-black",
          fontColor: "#fff",
          hex: '#000000'
        },
        {
          className: "bg-primary-blue",
          fontColor: "#fff",
          hex: '#154973'
        },
        {
          className: "bg-primary-light-blue",
          fontColor: "#fff",
          hex: '#007AC2'
        },
        {
          className: "bg-primary-blue-accent",
          fontColor: "#fff",
          hex: '#457AA5'
        },
        {
          className: "bg-primary-links",
          fontColor: "#fff",
          hex: '#007AC2'
        },
        {
          className: "bg-primary-gold",
          fontColor: "#000",
          hex: '#FACE00'
        },
        {
          className: "bg-primary-gold-accent",
          fontColor: "#000",
          hex: '#FFE396'
        },
        {
          className: "bg-primary-gold-light",
          fontColor: "#000",
          hex: '#FFE396'
        },
        {
          className: "bg-card-cta",
          fontColor: "#000",
          hex: '#EDEDED'
        },
        {
          className: "bg-logo",
          fontColor: "#000",
          hex: '#FCFCFC'
        },
        {
          className: "bg-card-outline",
          fontColor: "#000",
          hex: '#D0D0CE'
        },
        {
          className: "bg-dark",
          fontColor: "#fff",
          hex: '#242424'
        },
        {
          className: 'bg-gray',
          fontColor: '#000',
          hex: '#62666A'
        },
        {
          className: 'bg-white',
          fontColor: '#000',
          hex: '#FFFFFF'
        }
      ]
    }
  ));