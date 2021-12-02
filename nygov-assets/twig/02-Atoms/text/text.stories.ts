// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";

// @ts-ignore
import Text from "./text.twig";

storiesOf("02-Atoms/Text", module)
  .add(
    "Hero Description",
    () =>
      Text({
        text: "At 3:45 PM Governor Cuomo makes an announcement in Copiague.",
        classNames: "a-hero__description -text",
        variant: "string"
      }),
    {
      backgrounds: [
        {
          name: "NYGOV Blue",
          value: "#128ec3",
          default: true
        }
      ]
    }
  )
  .add(
    "Wysiwyg",
    () =>
      Text({
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id felis euismod, condimentum arcu sed, egestas lorem. In tempor urna quis purus aliquet blandit. Vivamus mi lectus, ullamcorper id aliquam a, lacinia at turpis. Phasellus a dui commodo, sagittis augue eu, ultricies magna. Vivamus posuere hendrerit erat, vel blandit sem scelerisque a. Proin varius nec magna eu tincidunt. Vestibulum pretium sapien ut ante pulvinar, efficitur ultrices ex fringilla. Nullam rutrum nulla et tortor convallis ultricies. Cras dapibus, justo eget rutrum eleifend, ante risus tincidunt nibh, sed pharetra ipsum nunc sed urna. Donec pellentesque tempor leo, et imperdiet velit mollis eu. Nullam volutpat cursus cursus.Fusce tempus purus vitae vestibulum finibus. Etiam convallis eros ex, at tincidunt turpis gravida nec. Etiam est velit, blandit quis commodo vel, suscipit cursus quam. Mauris eu leo ullamcorper, tristique urna nec, consectetur tellus. Donec consequat venenatis egestas. Suspendisse interdum facilisis leo, sit amet vulputate elit accumsan at. Quisque iaculis imperdiet ante vel porta. Ut neque tortor, sagittis sit amet facilisis ut, bibendum id eros. Pellentesque sed ipsum et lectus viverra porta. Pellentesque vulputate nulla elit, nec convallis justo dapibus sit amet.",
        classNames: "a-wysiwygContent",
        variant: "html"
      })
  )
  .add("Card Description", () =>
    Text({
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id felis euismod, condimentum arcu sed, egestas lorem. In tempor urna quis purus aliquet blandit. Vivamus mi lectus, ullamcorper id aliquam a, lacinia at turpis.",
      classNames: "a-card__description",
      variant: "html"
    })
  )
  .add("Filter Toggle", () =>
    Text({
      text: "Filter Toggle",
      classNames: "a-filter__toggle -text",
      variant: "string"
    })
  )
  .add("LastUpdate Label", () =>
    Text({
      text: "Label",
      classNames: "a-emergency__label -text",
      variant: "string"
    })
  )
  .add("Agency Category", () =>
    Text({
      text: "Agency Category",
      classNames: "a-hero__agency -text",
      variant: "string"
    })
  )
  .add("Card Chapter Link", () =>
    Text({
      text: "Sample Option",
      classNames: "a-card__links",
      variant: "string"
    })
  )
  .add(
    "Hero Follow Text",
    () =>
      Text({
        text: "follow",
        classNames: "a-hero__follow -text",
        variant: "string"
      }),
  )
  .add(
    "Total Records Number",
    () =>
      Text({
        text: "100",
        classNames: "a-results__totalRecord -number",
        variant: "string"
      }),
  )
  .add(
    "Total Records Label",
    () =>
      Text({
        text: "Label",
        classNames: "a-results__totalRecord -label",
        variant: "string"
      }),
  )
  .add(
    "Results Card Category",
    () =>
      Text({
        text: "Category",
        classNames: "a-resultsCard__category",
        variant: "string"
      })
  ).add(
    "Results Card Description ",
    () =>
      Text({
        text: "Description",
        variant: "string"
      })
  )
  .add(
    "Results Card Footer Label",
    () =>
      Text({
        text: "Label",
        classNames: "a-resultsCard__footer -label",
        variant: "string"
      })
  )
  .add("Stats Description", () =>
    Text({
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Vivendum intellegat et qui, ei denique consequuntur vix. Vivendum intellegat et qui, ei denique consequuntur vix. Usu ut commune mentitum, putent facete vim id. Vis labore scripta ne, ut alii mediocritatem his. Feugiat ceteros appellantur et sed, at illum virtute persequeris duo. Vivendum intellegat et qui, ei denique consequuntur vix. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Te quo atqui libris, dicta aeque usu an. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec.",
      classNames: "a-stats__description",
      variant: "html"

    }),
    {
      backgrounds: [
        {
          name: "NYGOV Blue",
          value: "#128ec3",
          default: true,

        }
      ]
    })
  .add("Stats", () =>
    Text({
      fieldStats: "$29 Billion Infrastructure Plan",
      variant: "a-stats__stats"

    }),
    {
      backgrounds: [
        {
          name: "NYGOV Blue",
          value: "#128ec3",
          default: true,

        }
      ]
    });


