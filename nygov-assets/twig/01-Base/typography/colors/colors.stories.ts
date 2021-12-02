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
          hex: "#24387E",
          background: "#FCFCFC",
        },
        {
          className: "text-primary-blue-accent",
          hex: "#1B2A5E",
          background: "#FCFCFC",
        },
        {
          className: "text-primary-gold",
          hex: '#D5820D',
          background: "#FCFCFC",
        },
        {
          className: "text-primary-gold-accent",
          hex: '#DC9719',
          background: "#FCFCFC",
        },
        {
          className: "text-primary-gold-light",
          hex: '#F5A81C',
          background: "#FCFCFC",
        },
        {
          className: "text-primary-light-blue",
          hex: '#128EC3',
          background: "#FCFCFC",
        },
        {
          className: "text-primary-light-blue-accent",
          hex: '#0386BE',
          background: "#FCFCFC",
        },
        {
          className: "text-primary-links",
          hex: '#007AC2',
          background: "#FCFCFC",
        },
        {
          className: "text-links",
          hex: '#0F739D',
          background: "#FCFCFC",
        },
        {
          className: "text-footer-links",
          hex: '#24387E',
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