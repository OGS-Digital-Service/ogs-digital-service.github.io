export default {
  section: [
    {
      cardType: "default_card",
      card: {
          keywords: [{
            entity: {
              keyword: "Category",
              url: {
                path: "https://google.com"
              }
            }
          }],
          label: "Default Card",
          referenceType: "MediaCard",
          description: {
            processed:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh. A few mor eto test",
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
                  url: "",
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
        chapterLinks: [{
          url: {
            path: "https://google.com"
          },
          linkText: "Apply",
        }
      ]
    },
    {
      cardType: "mobile_app_card",
      card: {
        label: "Mobile Card",
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
                url: "https://picsum.photos/200/180",
              },
            },
            tabletImg: {
              derivative: {
                url: "https://picsum.photos/200/180",
              },
            },
            mobileImg: {
              derivative: {
                url: "https://picsum.photos/200/180",
              },
            },
          },
        },
      },
    },
    {
      cardType: "default_card",
      card: {
          label: "Service Card",
          referenceType: "NodeService",
          image: {
            entity: {
              desktopImg: {
                derivative: {
                  url: "",
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
        contentLink: {
          path: "https://yahoo.com"
        },
        keywords: [{
          entity: {
            keyword: "Category",
            url: {
              path: "https://google.com"
            }
          }
        }],
        description: {
          processed:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh. A few mor eto test",
          summaryProcessed:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      },
    },
    {
      cardType: "stats_card",
      card: {
        label: "Stats Card",
        keywords: [{
          entity: {
            keyword: "Stat Card",
            url: {
              path: "https://google.com"
            }
          }

        }],
        description: {
          processed:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
          summaryProcessed:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        image: {
          entity: {
            desktopImg: {
              derivative: {
                url: "https://picsum.photos/200/180",
              },
            },
            tabletImg: {
              derivative: {
                url: "https://picsum.photos/200/180",
              },
            },
            mobileImg: {
              derivative: {
                url: "https://picsum.photos/200/180",
              },
            },
          },
        },
        fieldStats: "$150 Billion Education Aid"
      },
    },
    { cardType: "featured_hero_card",
      card: {
        label: "test program cards Hero",
        type: "node",
        referenceType: "NodeProgram",
        image: {
          entity: {
            desktopImg: {
              derivative: {
                url: ""
              }
            },
            tabletImg: {
              derivative: {
                url: ""
              }
            },
            mobileImg: {
              derivative: {
                url: ""
              }
            }
          }
        },
        keywords: [
          {
            entity: {
              keyword: "Bohagciv",
              url: {
                path: "/keywords/bohagciv"
              }
            }
          }
        ],
        description: null,
        contentLink: {
          routed: true,
          path: "/programs/test-program-cards-hero"
        },
        footerText: "Test Footer Text"
      }
    }
  ],
};
