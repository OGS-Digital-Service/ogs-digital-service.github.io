// @ts-ignore
import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import JazzedRelease from "./jazzedRelease.twig";
storiesOf("04-Organisms/Jazzed Release", module).add("Jazzed Release", () =>
  JazzedRelease({
    section: {
      type: "ParagraphJazzedRelease",
      audioLink: {
        url: {
          path: "https://google.com"
        },
        linkText: "Audio"
      },
      photosLink: {
        url: {
          path: "https://google.com"
        },
        linkText: "Photos"
      },
      otherLink: {
        url: {
          path: "https://google.com"
        },
        linkText: "Test"
      },
      contactEmail: "Press.Office@exec.ny.gov",
      contactPhone: "Albany: (518) 474 - 8418\r\nNew York City: (212) 681 - 4640",
      contactTitle: "Contact the Governor’s Press Office",
      quote: {
        processed: "<p>Quisque elit mauris, accumsan non nisl vel, consectetur egestas enim. Etiam blandit viverra lorem, sit amet rutrum eros aliquam id. Quisque laoreet vulputate dolor, vel finibus ex consectetur non. Pellentesque dictum magna ac luctus sollicitudin. Aliquam quis sem enim. Suspendisse potenti. Aliquam odio quam, aliquam nec commodo id, ultrices ut eros. Vivamus in finibus eros. Nam venenatis ipsum eu augue blandit, id feugiat libero fermentum.</p>\n"
      },
      quoteCredit: "Someones name",
      rawHtml: "<a data-flickr-embed=\"true\" data-context=\"true\" href=\"https://www.flickr.com/photos/governorandrewcuomo/49913603956/in/album-72157714370591003\" title=\"Amid Ongoing COVID-19 Pandemic, Governor Cuomo Announces Seventh Region Hits Benchmark to Begin Reopening Tomorrow\"><img src=\"https://live.staticflickr.com/65535/49913603956_c6aff3668e_z.jpg\" width=\"640\" height=\"427\" alt=\"Amid Ongoing COVID-19 Pandemic, Governor Cuomo Announces Seventh Region Hits Benchmark to Begin Reopening Tomorrow\"></a><script async src=\"//embedr.flickr.com/assets/client-code.js\" charset=\"utf-8\"></script>",
      translations: [
        {
          "translatedDocument": {
            "name": "test2.pdf",
            "english": "english title ",
            "translated": "translated title",
            "media": {
              "file": {
                "url": "https://google.com"
              }
            }
          }
        },
        {
          "translatedDocument": {
            "name": "test2.pdf",
            "english": "english title ",
            "translated": "translated title",
            "media": {
              "file": {
                "url": "https://google.com"
              }
            }
          }
        }
      ],
      // videoEmbed: "hKYKJIBcFgQ",
      wysiwyg1: {
        processed: "<p>Proin enim nibh, feugiat eu ultricies et, scelerisque sed dolor. Suspendisse tellus turpis, ultricies non nisi ac, pretium vestibulum purus. Vestibulum vel purus vestibulum, aliquam felis a, hendrerit elit. Pellentesque cursus facilisis ligula, non consequat velit imperdiet ac. Quisque at sapien hendrerit, malesuada dolor non, tincidunt justo. Vestibulum porttitor et ex vitae sodales. Etiam aliquam scelerisque dignissim. Donec porttitor mi non mollis mollis. Phasellus tempus accumsan nibh et efficitur. Cras pulvinar erat id nunc iaculis, sodales iaculis tortor feugiat. Ut venenatis neque arcu. Suspendisse vel dignissim mi, feugiat bibendum lectus. In efficitur, mi sed sollicitudin gravida, eros mauris tristique dui, sit amet vehicula nisl felis eu lorem. Duis suscipit pretium risus, ut posuere elit lobortis et.</p>"
      },
      wysiwyg2: {
        processed: "<p>Suspendisse potenti. Mauris sagittis feugiat odio, a imperdiet libero. Nulla consequat elit et magna rutrum, id tincidunt sapien aliquet. Morbi suscipit, eros a sollicitudin porta, massa mauris volutpat mauris, non porttitor sapien felis sed urna. Praesent sit amet elit turpis. Curabitur rhoncus aliquam purus, nec commodo libero cursus quis. Vestibulum id fringilla dolor, at gravida dolor. Aliquam orci elit, ornare non quam sed, pellentesque vehicula augue. Pellentesque ut quam eget est auctor faucibus. Maecenas sed ultricies dui. Sed egestas enim quis diam interdum, eu pulvinar ex malesuada. Nam dapibus ultrices diam vitae molestie. Curabitur laoreet risus ipsum, vitae ullamcorper nulla aliquam venenatis. Duis semper ac risus non molestie. Pellentesque ut magna porta, interdum sapien ut, condimentum mi. Duis dignissim molestie nulla.</p>"
      },
      wysiwyg3: {
        processed: "<p>Nulla lobortis urna nunc, nec lacinia nisl interdum vitae. Cras vitae sapien lorem. Phasellus vel elit tincidunt, vehicula tortor eget, dapibus nisl. Donec feugiat lobortis malesuada. Sed a suscipit mi. Mauris porta arcu vel urna congue cursus. Sed a lorem nec turpis ullamcorper ultrices. Nullam scelerisque facilisis aliquam. Curabitur fermentum orci viverra lacus mollis scelerisque. Nullam felis nisi, dapibus at efficitur ac, consectetur consectetur justo. Sed et lacus rhoncus sem vestibulum accumsan vel quis nulla. Curabitur vitae velit et ante viverra suscipit ac mattis diam. Vestibulum ac luctus tortor, id porttitor nibh. Curabitur mattis orci ac nisl consectetur, sed dapibus dolor maximus. Vivamus gravida mauris et metus faucibus, quis mollis ex tempor.</p>"
      },
      wysiwyg4: {
        processed: "<p>Nulla lobortis urna nunc, nec lacinia nisl interdum vitae. Cras vitae sapien lorem. Phasellus vel elit tincidunt, vehicula tortor eget, dapibus nisl. Donec feugiat lobortis malesuada. Sed a suscipit mi. Mauris porta arcu vel urna congue cursus. Sed a lorem nec turpis ullamcorper ultrices. Nullam scelerisque facilisis aliquam. Curabitur fermentum orci viverra lacus mollis scelerisque. Nullam felis nisi, dapibus at efficitur ac, consectetur consectetur justo. Sed et lacus rhoncus sem vestibulum accumsan vel quis nulla. Curabitur vitae velit et ante viverra suscipit ac mattis diam. Vestibulum ac luctus tortor, id porttitor nibh. Curabitur mattis orci ac nisl consectetur, sed dapibus dolor maximus. Vivamus gravida mauris et metus faucibus, quis mollis ex tempor.</p>"
      }
    }
  })
);
