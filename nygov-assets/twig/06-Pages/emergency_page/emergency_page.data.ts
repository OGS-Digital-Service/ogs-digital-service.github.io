export const heroData = {
  type: "EmergencyHero",
  title: "Phasellus mattis consectetur tincidunt",
  description: {
    processed:
      "<p>Delivering on his 2019 Justice Agenda first laid out in December, Governor Cuomo announced historic progressive accomplishments during this year's Legislative Session - the most productive in modern political history.</p>",
  },
  lastUpdate: {
    date: "July 2, 2019",
  },
  twitter: "nygovcuomo",
  phone: "000-000-0000",
  updateLink: {
    title: "Visit MTA.info for Service Updates",
    url: {
      path: "http://alert.mta.info/",
    },
  },
};

export const latestUpdatesData = {
  type: "LatestUpdates",
  latestUpdatesTitle: "Latest Updates",
  latestUpdatesSection: [
    {
      content: {
        type: "ParagraphEmergencyUpdate",
        timeOption: true,
        date: "January 25, 2015 2.15pm",
        title:
          "Governor Cuomo Urges Commuters to Stay Home if Possible on Tuesday",
        description: {
          processed:
            "Roads and Public Transportation Throughout Hudson Valley, New York City and Long Island Could be Closed as a Result of Historic Blizzard Conditions with Significant Snow Accumulation",
        },
        learnMore: {
          linkText: "Learn More",
          url: {
            path: "/front",
          },
        },
      },
    },
    {
      content: {
        type: "ParagraphEmergencyUpdate",
        timeOption: true,
        date: "January 20, 2015 2.15pm",
        title:
          "Governor Cuomo Urges Commuters to Stay Home if Possible on Wednesday",
        description: {
          processed:
            "Roads and Public Transportation Throughout Hudson Valley, New York City and Long Island Could be Closed as a Result of Historic Blizzard Conditions with Significant Snow Accumulation",
        },
        learnMore: {
          linkText: "Learn More",
          url: {
            path: "/front",
          },
        },
      },
    },
    {
      content: {
        type: "ParagraphEmergencyUpdate",
        timeOption: true,
        date: "January 12, 2015 2.15pm",
        title:
          "Governor Cuomo Urges Commuters to Stay Home if Possible on Monday",
        description: {
          processed:
            "Roads and Public Transportation Throughout Hudson Valley, New York City and Long Island Could be Closed as a Result of Historic Blizzard Conditions with Significant Snow Accumulation",
        },
        learnMore: {
          linkText: "Learn More",
          url: {
            path: "/front",
          },
        },
      },
    },
  ],
  moreUpdates: {
    linkText: "More Updates",
    url: {
      path: "/front",
    },
  },
};

export const sectionsData = {
  sections: [
    {
      section: {
        type: "ParagraphWysiwyg",
        partOfNavigator: true,
        title: "A wysiwyg",
        headline: null,
        body: {
          content: "<p>Nunc ut nisi porttitor, convallis erat ac, egestas dolor. Duis ac lacus ut augue vulputate luctus a id dui. Etiam tincidunt consequat mi, non porttitor erat luctus ut. Fusce lacinia elit in dui vulputate interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur nec bibendum tellus. Morbi vestibulum sollicitudin erat sit amet sagittis. Donec id tincidunt augue. Suspendisse ullamcorper lacinia libero eu scelerisque. Vestibulum dui neque, dapibus nec ultricies vel, finibus ut tellus. Duis rhoncus lobortis metus et condimentum. Proin interdum lacinia tortor eget vulputate. Cras bibendum ultricies imperdiet. Vivamus sit amet dui et diam hendrerit maximus non ut velit. Nullam sapien purus, malesuada id tristique id, rhoncus at ante.</p>",
          summary: ""
        }
      }
    },
    {
      section: {
        type: "ParagraphPhotoGallery",
        uuid: "79e358e4-f38e-4da5-b239-f3ffc46642e4",
        partOfNavigator: true,
        title: "Test photo 1",
        headline: "A test",
        description: {
          content: "<p>In vulputate eros vitae augue tincidunt venenatis. Donec porta mattis leo vitae congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse id justo id massa pulvinar dictum ac ut urna. Sed pulvinar ullamcorper lectus eu malesuada. Proin nec turpis eu nisl porttitor hendrerit nec non sapien. Ut vestibulum tortor vitae felis consequat pulvinar. Pellentesque quis porttitor mauris. Curabitur imperdiet varius odio ac tristique. Quisque rutrum dictum ante, ac blandit felis egestas quis. Cras accumsan, enim ac maximus blandit, elit dolor pulvinar enim, sed aliquam nibh ex nec magna. Pellentesque facilisis enim ac orci scelerisque rutrum. Sed quis diam purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n"
        },
        images: [
          {
            entity: {
              entityLabel: "feat1.png",
              imageDescription: {
                content: "<p>Nunc vehicula turpis vitae tellus aliquam, a accumsan justo semper. Ut ut nisi vitae tellus elementum bibendum. Nulla in lacus ac lorem sodales facilisis. Mauris tincidunt justo vitae congue pellentesque. Quisque posuere turpis vel felis placerat consequat. Sed elementum iaculis interdum. Cras at condimentum felis, quis finibus tellus. Morbi condimentum accumsan est et auctor.</p>\n"
              },
              img: {
                derivative: {
                  url: "https://picsum.photos/630/355"
                }
              }
            }
          },
          {
            entity: {
              entityLabel: "astronaut.png",
              imageDescription: {
                content: "<p>Sed quis mi augue. Duis laoreet vitae augue eu consectetur. Aenean fermentum nunc a nisl suscipit, in faucibus risus faucibus. Quisque varius diam eget malesuada tristique. Suspendisse aliquet nisl ut odio volutpat lacinia a ut quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed malesuada tincidunt sapien, eu commodo lorem luctus ut. Pellentesque elementum turpis at rhoncus mollis.</p>\n"
              },
              img: {
                derivative: {
                  url: "https://picsum.photos/630/355"
                }
              }
            }
          }
        ]
      }
    }
  ]
};

export const alertsData = {
  alerts: [
    {
      section: {
        type: "ParagraphAlerts",
        title: "Test Alert 1",
        status: "not_in_service",
        description: {
          content: "<p>Ut tempor at purus ac ornare. Nunc vel neque ultrices, rutrum purus ac, consectetur metus. Praesent consequat dictum lorem, a ultricies ligula gravida id. Cras et mi vitae urna auctor convallis at ornare dui.</p>\n"
        },
        link: {
          title: "",
          url: {
            "path": "/"
          }
        }
      }
    },
    {
      section: {
        type: "ParagraphAlerts",
        title: "Test 2",
        status: "partially_affected",
        description: {
          content: "<p>Aliquam euismod velit odio, eu cursus augue vulputate sed. Donec lacinia, felis non ornare eleifend, </p>\n"
        },
        link: null
      }
    },
    {
      section: {
        type: "ParagraphAlerts",
        title: "Test 3",
        status: "normal_service",
        description: {
          content: "<p>Praesent tellus velit, pharetra vel tincidunt id, consequat quis leo. Phasellus at ligula quis est dictum hendrerit at ac leo. Curabitur gravida est sed enim auctor congue. Duis nunc ex, consectetur quis posuere ac,</p>\n"
        },
        link: {
          title: "",
          url: {
            "path": "https://google.com"
          }
        }
      }
    }
  ]
};
