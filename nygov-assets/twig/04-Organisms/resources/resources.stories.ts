// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import Resources from "./resources.twig";
storiesOf("04-Organisms/Resources", module).add("Resources", () =>
  Resources({
    section: {
      title: "Resources title",
      headline: "Resources headline",
      color: "red",
      links: [
        {
          paragraph: {
            link: {
              title: "Albany County",
              url: {
                path: "https://google.com"
              }
            },
            newTab: true
          }
        },
        {
          paragraph: {
            link: {
              title: "Schenectady County",
              url: {
                path: "https://google.com"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Niskayuna",
              url: {
                path: "https://google.com"
              }
            },
            "newTab": true
          }
        },
        {
          paragraph: {
            link: {
              title: "Latham",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Troy",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Saratoga County",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Buffalo",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Yates County",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "New York City",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Columbia County",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "North County",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Western NY",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Southern Tier",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Mid-Hudson Region",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Long Island",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Albany County",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Schenedeady County",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Niskayuna",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Latham",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Troy",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Saratoga County",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Buffalo",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        },
        {
          paragraph: {
            link: {
              title: "Yates County",
              url: {
                path: "/"
              }
            },
            "newTab": false
          }
        }
      ]
    }
  })
);
