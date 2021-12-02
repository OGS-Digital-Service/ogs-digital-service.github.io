// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";

// @ts-ignore
import Fonts from "./fontFamilies.twig";


const fontStories = storiesOf("01-Base/Typography/fontFamilies", module);

fontStories.add("Font Families", () =>
  Fonts(
    {
      fonts: [
        {
          font: 'Proxima Nova Regular',
          className: 'text-proxima'
        },
        {
          font: 'D Sari',
          className: 'text-d-sari'
        },
        {
          font: 'Oswald Regular',
          className: 'text-oswald'
        },
      ]
    }
  )
)