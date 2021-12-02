const button = {
  section: {
    type: "ParagraphButtons",
    title: "Testing Buttons",
    headline: "Testing Buttons",
    description: {
      processed:
        "<p>Delivering on his 2019 Justice Agenda first laid out in December, Governor Cuomo announced historic progressive accomplishments during this year's Legislative Session - the most productive in modern political history.</p>",
    },
    buttons: [
      {
        button: {
          webform: {
            id: "governor_sign_up",
            status: "open",
          },
        },
      },
      {
        button: {
          link: {
            title: "Testing Youtube",
            url: {
              path: "https://youtube.com",
            },
          },
        },
      },
    ],
  },
};

const titleBar = {
  section: {
    type: "ParagraphTitleBar",
    title: "Title Bar",
    subtitle: "Subtitle",
  }
};

const popularServices = {
  section: {
    type: 'ParagraphPopularServices',
    readMore: {
      url: {
        path: "https://google.com"
      },
      linkText: "View More"
    },
    title: "Popular Services",
    queue: [{
      entity: {
        img: {
          url: "https://picsum.photos/200/180",
        },
        button: {
          url: {
            path: "https://google.com"
          },
          linkText: "Unemployment Assistance",
        }
      }
    },
    {
      entity: {
        img: {
          url: "https://picsum.photos/200/180",
        },
        button: {
          url: {
            path: "https://google.com"
          },
          linkText: "Apply for Snap",
        }
      }
    },
    {
      entity: {
        img: {
          url: "https://picsum.photos/200/180",
        },
        button: {
          url: {
            path: "https://google.com"
          },
          linkText: "Government Jobs",
        }
      }
    },
    {
      entity: {
        img: {
          url: "https://picsum.photos/200/180",
        },
        button: {
          url: {
            path: "https://google.com"
          },
          linkText: "Pay traffic Violation NY",
        }
      }
    }]
  }
};

const wysiwyg = {
  section: {
    type: "ParagraphWysiwyg",
    title: "Testing",
    body: {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id felis euismod, condimentum arcu sed, egestas lorem. In tempor urna quis purus aliquet blandit. Vivamus mi lectus, ullamcorper id aliquam a, lacinia at turpis. Phasellus a dui commodo, sagittis augue eu, ultricies magna. Vivamus posuere hendrerit erat, vel blandit sem scelerisque a. Proin varius nec magna eu tincidunt. Vestibulum pretium sapien ut ante pulvinar, efficitur ultrices ex fringilla. Nullam rutrum nulla et tortor convallis ultricies. Cras dapibus, justo eget rutrum eleifend, ante risus tincidunt nibh, sed pharetra ipsum nunc sed urna. Donec pellentesque tempor leo, et imperdiet velit mollis eu. Nullam volutpat cursus cursus.Fusce tempus purus vitae vestibulum finibus. Etiam convallis eros ex, at tincidunt turpis gravida nec. Etiam est velit, blandit quis commodo vel, suscipit cursus quam. Mauris eu leo ullamcorper, tristique urna nec, consectetur tellus. Donec consequat venenatis egestas. Suspendisse interdum facilisis leo, sit amet vulputate elit accumsan at. Quisque iaculis imperdiet ante vel porta. Ut neque tortor, sagittis sit amet facilisis ut, bibendum id eros. Pellentesque sed ipsum et lectus viverra porta. Pellentesque vulputate nulla elit, nec convallis justo dapibus sit amet.",
      summary: "Testing from landing page summary",
    },
  },
};

const hero = {
  section: {
    type: 'ParagraphHeroQueue',
    heroOption: "default",
    queue: [
      {
        hero: {
          headline: "Hero Title",
          date: {
            date: "May 05, 2020",
          },
          description: "Delivering on his 2019 Justice Agenda first laid out in December, Governor Cuomo announced historic progressive accomplishments",
          learnMore: {
            url: {
              path: "https://google.com"
            },
            title: "Learn More",
          },
          stream: {
            url: {
              path: "https://players.brightcove.net/2886492229001/default_default/index.html?videoId=5452960876001"
            },
            title: "Watch Live",
          },
          featuredImage: {
            entity: {
              desktopImg: {
                derivative: {
                  url: "https://picsum.photos/1280/510",
                },
              },
              tabletImg: {
                derivative: {
                  url: "https://picsum.photos/768/307",
                },
              },
              mobileImg: {
                derivative: {
                  url: "https://picsum.photos/320/256",
                },
              },
            },
          },
          placement: "left",
        }
      }
    ]
  }
};
const filter = {
  section: {
    type: "ParagraphNygovFilter",
    sidebar: {
      title: "title",
      subTitle: "SubTitle",
      text: {
        title: "Filter",
        labels: [
          "Administration",
          "Business",
          "Education",
          "Health and Human Services",
          "Local and Regional Authorities",
          "Public Safety",
          "Recreation and Environment",
          "Statewide Elected Officials",
          "Transportation and Utilities",
        ],
        label: "Show All Agencies",
        checked: "checked",
      },
      date: {
        title: "Filter",
        labels: ["2015 - 2016", "2016 - 2017", "2017 - 2018", "2018 - 2019"],
        label: "Show All Agencies",
        checked: "checked",
      },
    },
    results: {
      text: "100",
      label: "Results",
      card: {
        logo: {
          path: "https://example.com/",
          entity: {
            desktopImg: {
              derivative: {
                img: "https://picsum.photos/240/240",
              },
            },
            tabletImg: {
              derivative: {
                img: "https://picsum.photos/240/240",
              },
            },
            mobileImg: {
              derivative: {
                img: "https://picsum.photos/278/278",
              },
            },
          },
        },
        content: {
          category: [
            "Agencies Category",
            "News item Category",
            "Events Scheduled Category",
          ],
          title: "Title",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no...",
          url: "https://example.com/",
          date: {
            month: "Month",
            day: "10",
            year: "2020",
          },
          timeLocation: {
            time: "01:00 am",
            location: "State Capitol Red Room Albany, NY",
          },
        },
        footer: {
          url: {
            facebook: "https://www.facebook.com/511NY",
            twitter: "https://twitter.com/my511NY",
            youtube: "https://www.youtube.com/user/511NY",
            flickr: "https://www.flickr.com/photos/39858003@N07/",
            pinterest: "http://www.pinterest.com/511ny/",
          },
        },
      },
      paginate: {
        index: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      },
    },
  },
};

const languages = {
  section: {
    type: "ParagraphLanguages",
    languages: [
      {
        language: {
          name: "08.28.19.rel_.LTGOVERNORSCHEDULE_Russian.pdf",
          english: "Russian Translation",
          translated: "Перевод на русский язык",
          media: {
            file: {
              url:
                "http://127.0.0.1:8888/sites/default/files/2019-09/08.28.19.rel_.LTGOVERNORSCHEDULE_Russian_0.pdf",
            },
          },
        },
      },
      {
        language: {
          name: "08.28.19.rel_.LTGOVERNORSCHEDULE_Spanish.pdf",
          english: "Spanish Translation",
          translated: "Traducción al español",
          media: {
            file: {
              url:
                "http://127.0.0.1:8888/sites/default/files/2019-09/08.28.19.rel_.LTGOVERNORSCHEDULE_Spanish_0.pdf",
            },
          },
        },
      },
      {
        language: {
          name: "08.28.19.rel_.LTGOVERNORSCHEDULE_HaitianCreole.pdf",
          english: "Haitian-Creole Translation",
          translated: "Tradiksyon kreyòl ayisyen",
          media: {
            file: {
              url:
                "http://127.0.0.1:8888/sites/default/files/2019-09/08.28.19.rel_.LTGOVERNORSCHEDULE_HaitianCreole_1.pdf",
            },
          },
        },
      },
      {
        language: {
          name: "08.27.19.rel_.GOVERNORSCHEDULE_Korean.pdf",
          english: "Korea Translation",
          translated: "한국어 번역",
          media: {
            file: {
              url:
                "http://127.0.0.1:8888/sites/default/files/2019-09/08.27.19.rel_.GOVERNORSCHEDULE_Korean_0.pdf",
            },
          },
        },
      },
      {
        language: {
          name: "08.27.19.rel_.GOVERNORSCHEDULE_Bengali.pdf",
          english: "Bengali Translation",
          translated: "বাংলা অনুবাদ",
          media: {
            file: {
              url:
                "http://127.0.0.1:8888/sites/default/files/2019-09/08.27.19.rel_.GOVERNORSCHEDULE_Bengali_0.pdf",
            },
          },
        },
      },
      {
        language: {
          name: "08.27.19.rel_.GOVERNORSCHEDULE_Chinese.pdf",
          english: "Chinese Translation",
          translated: "中文翻譯",
          media: {
            file: {
              url:
                "http://127.0.0.1:8888/sites/default/files/2019-09/08.27.19.rel_.GOVERNORSCHEDULE_Chinese_0.pdf",
            },
          },
        },
      },
    ],
  },
};
const default_card = {
  section: {
    type: "ParagraphCardsQueue",
    title: "Default Card Frame",
    subheadline: "Sub Headline",
    cardType: "default_card",
    cardQueue: [
      {
        card: {
          referenceType: "MediaCard",
          label: "Card Label 1",
          description: {
            processed:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
            summaryProcessed:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          learnMore: {
            url: {
              path: "https://google.com",
            },
            linkText: "Learn More",
          },
          image: {
            entity: {
              desktopImg: {
                derivative: {
                  url: "https://picsum.photos/400/225",
                },
              },
              tabletImg: {
                derivative: {
                  url: "https://picsum.photos/225/225",
                },
              },
              mobileImg: {
                derivative: {
                  url: "https://picsum.photos/400/225",
                },
              },
            },
          },
        },
      },
      {
        card: {
          referenceType: "MediaCard",
          label: "Card Label 2",
          description: {
            processed:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
            summaryProcessed:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          learnMore: {
            url: {
              path: "https://google.com",
            },
            linkText: "Learn More",
          },
          image: {
            entity: {
              desktopImg: {
                derivative: {
                  url: "https://picsum.photos/400/225",
                },
              },
              tabletImg: {
                derivative: {
                  url: "https://picsum.photos/225/225",
                },
              },
              mobileImg: {
                derivative: {
                  url: "https://picsum.photos/400/225",
                },
              },
            },
          },
        },
      },
      {
        card: {
          referenceType: "MediaCard",
          label: "Card Label 3",
          description: {
            processed:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
            summaryProcessed:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          learnMore: {
            url: {
              path: "https://google.com",
            },
            linkText: "Learn More",
          },
          image: {
            entity: {
              desktopImg: {
                derivative: {
                  url: "https://picsum.photos/400/225",
                },
              },
              tabletImg: {
                derivative: {
                  url: "https://picsum.photos/225/225",
                },
              },
              mobileImg: {
                derivative: {
                  url: "https://picsum.photos/400/225",
                },
              },
            },
          },
        },
      },
    ],
  },
};

const mobile_app_card = {
  section: {
    type: "ParagraphCardsQueue",
    title: "Mobile App Card Frame",
    subheadline: "Sub Headline",
    cardType: "mobile_app_card",
    cardQueue: [
      {
        card: {
          label: "Card Label 1",
          description: {
            processed:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
            summaryProcessed:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          learnMore: {
            url: {
              path: "https://google.com",
            },
            linkText: "Download App",
          },
          image: {
            entity: {
              desktopImg: {
                derivative: {
                  url: "https://picsum.photos/400/225",
                },
              },
              tabletImg: {
                derivative: {
                  url: "https://picsum.photos/225/225",
                },
              },
              mobileImg: {
                derivative: {
                  url: "https://picsum.photos/400/225",
                },
              },
            },
          },
        },
      },
      {
        card: {
          label: "Card Label 2",
          description: {
            processed:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
            summaryProcessed:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          learnMore: {
            url: {
              path: "https://google.com",
            },
            linkText: "Download App",
          },
          image: {
            entity: {
              desktopImg: {
                derivative: {
                  url: "https://picsum.photos/400/225",
                },
              },
              tabletImg: {
                derivative: {
                  url: "https://picsum.photos/225/225",
                },
              },
              mobileImg: {
                derivative: {
                  url: "https://picsum.photos/400/225",
                },
              },
            },
          },
        },
      },
    ],
  },
};
export {
  hero,
  wysiwyg,
  titleBar,
  button,
  popularServices,
  languages,
  default_card,
  mobile_app_card,
  filter,
};
