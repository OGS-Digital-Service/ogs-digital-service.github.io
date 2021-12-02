//@ts-ignore
import { storiesOf } from '@storybook/html';
import "./index";

//@ts-ignore
import Footer from "./footer.twig";


storiesOf("03-Molecules/Bar", module)
  .add(
    "Card Footer",
    () =>
      Footer({
        text: "Details for Card",
        variant: "m-card__footer"
      })
  )
  .add(
    "Hero Card Footer",
    () =>
      Footer({
        text: "Details for Hero Card",
        variant: "m-card__heroFooter"
      })
  )
  .add(
    "Mobile Card Footer",
    () =>
      Footer({
        text: "Download App",
        variant: "m-card__mobileFooter"
      })
  )
  .add(
    "Stats Bar",
    () =>
      Footer({
        learnMore: {
        linkText: "Learn More",
        url: {
          path: "https://google.com",
        }
        },
        variant: "m-card__statsBar"
      })
  );