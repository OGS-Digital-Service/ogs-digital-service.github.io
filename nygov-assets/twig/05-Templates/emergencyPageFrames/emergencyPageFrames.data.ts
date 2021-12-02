export const mockData = {
  title: "Phasellus mattis consectetur tincidunt",
  mtaToggle: true,
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
  sections: [
    {
      section: {
        type: "ParagraphWysiwyg",
        partOfNavigator: true,
        title: "A wysiwyg",
        headline: null,
        body: {
          "content": "<p>Nunc ut nisi porttitor, convallis erat ac, egestas dolor. Duis ac lacus ut augue vulputate luctus a id dui. Etiam tincidunt consequat mi, non porttitor erat luctus ut. Fusce lacinia elit in dui vulputate interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur nec bibendum tellus. Morbi vestibulum sollicitudin erat sit amet sagittis. Donec id tincidunt augue. Suspendisse ullamcorper lacinia libero eu scelerisque. Vestibulum dui neque, dapibus nec ultricies vel, finibus ut tellus. Duis rhoncus lobortis metus et condimentum. Proin interdum lacinia tortor eget vulputate. Cras bibendum ultricies imperdiet. Vivamus sit amet dui et diam hendrerit maximus non ut velit. Nullam sapien purus, malesuada id tristique id, rhoncus at ante.</p>",
          summary: ""
        }
      }
    }
  ],

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
  ],
  moreUpdates: {
    linkText: "More Updates",
    url: {
      path: "/front",
    },
  },
};
