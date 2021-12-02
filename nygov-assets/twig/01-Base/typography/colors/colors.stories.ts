// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";

// @ts-ignore
import Colors from "./colors.twig";

const textcolors = storiesOf("01-Base/Typography/colors", module);

textcolors.add("Font Colors", () =>
  Colors(
    {
      colors: [
        {
          className: "text-alerts",
          hex: "#B52C2C",
          background: "#FCFCFC",
        },
        {
          className: "text-alerts-rollover",
          hex: "#8C1C1C",
          background: "#FCFCFC",
        },
        {
          className: "text-black",
          hex: '#000000',
          background: "#FCFCFC",
        },
        {
          className: "text-primary-blue",
          hex: "#154973",
          background: "#FCFCFC",
        },
        {
          className: "text-primary-blue-accent",
          hex: "#457AA5",
          background: "#FCFCFC",
        },
        {
          className: "text-primary-gold",
          hex: '#FACE00',
          background: "#FCFCFC",
        },
        {
          className: "text-primary-gold-accent",
          hex: '#FFE396',
          background: "#FCFCFC",
        },
        {
          className: "text-primary-gold-light",
          hex: '#FFE396',
          background: "#FCFCFC",
        },
        {
          className: "text-primary-light-blue",
          hex: '#EFF6FB',
          background: "#FCFCFC",
        },
        {
          className: "text-primary-light-blue-accent",
          hex: '#EFF6FB',
          background: "#FCFCFC",
        },
        {
          className: "text-primary-links",
          hex: '#007AC2',
          background: "#FCFCFC",
        },
        {
          className: "text-links",
          hex: '#007AC2',
          background: "#FCFCFC",
        },
        {
          className: "text-footer-links",
          hex: '#154973',
          background: "#EDEDED",
        },
        {
          className: "text-dark",
          hex: '#242424',
          background: "#FCFCFC",
        }, {
          className: "text-white",
          hex: '#FFFFF',
          background: "#000000",
        }
      ]
    }
  ));