// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import PlanSummary from "./planSummary.twig";
storiesOf("04-Organisms/PlanSummary", module).add("PlanSummary", () =>
  PlanSummary({
    section: {
      title: "The Plan",
      headline: "A Three-Step Process",
      color: "blue", // or "blue", "midgray"
      plans: [
        {
          paragraph: {
            keyPoint: "Age of Criminal Responsibility Raised to 18-years-old",
            supportingArgument: "All 16- and 17-year-olds who commit non-violent crimes will receive the intervention and evidence-based treatment they need."
          }
        },
        {
          paragraph: {
            keyPoint: "Specialized Juvenile Detention Facilities",
            supportingArgument: "Rather than adult jails and prisons, young people will be placed in specialized juvenile detention facilities certified by the State Office of Children and Family Services, in conjunction with the State Commission of Correction."
          }
        },
        {
          paragraph: {
            keyPoint: "Phased-In Implementation",
            supportingArgument: "The Raise the Age legislation will take effect for 16-year-olds on October 1, 2018 and 17-year-olds on October 1, 2019."
          }
        }
      ],
      moreLink: {
        url: {
          path: "https://google.com"
        },
        title: "Explore NYS"
      },
      newWindow: true,
    },
  })
);
