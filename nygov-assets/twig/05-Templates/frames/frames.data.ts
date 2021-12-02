export const mockData = {
  sections: [
    {
      section: {
        type: 'ParagraphHeroQueue',
        heroOption: "default",
        queue: [
          {
            hero: {
              headline: "Hero Title",
              date: {
                date: "May 05, 2020"
              },
              description: "Delivering on his 2019 Justice Agenda first laid out in December, Governor Cuomo announced historic progressive accomplishments during this year's Legislative Session - the most productive in modern political history.",
              learnMore: {
                url: {
                  path: "https://google.com"
                },
                title: "Learn More"
              },
              relatedContent: {
                url: {
                  path: "https://google.com"
                },
                title: "Related Site"
              },
              archived: {
                url: {
                  path: "https://google.com"
                }
              },
              stream: {
                url: {
                  path: "https://players.brightcove.net/2886492229001/default_default/index.html?videoId=5452960876001"
                },
                title: "Watch Live"
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
          },
          {
            hero: {
              bioName: "THE 56TH GOVERNOR OF NEW YORK STATE",
              bioTitle: "Andrew M. Cuomo",
              featuredImage: {
                entity: {
                  desktopImg: {
                    derivative: {
                      url:
                        "https://picsum.photos/1280/510"
                    }
                  },
                  tabletImg: {
                    derivative: {
                      url:
                        "https://picsum.photos/768/307"
                    }
                  },
                  mobileImg: {
                    derivative: {
                      url:
                        "https://picsum.photos/320/256"
                    }
                  }
                }
              },
              socials: [
                {
                  uri: "https://www.facebook.com/GovernorAndrewCuomo"
                },
                {
                  uri: "https://twitter.com/NYGovCuomo"
                },
                {
                  uri: "https://www.youtube.com/nygovcuomo"
                },
                {
                  uri: "https://www.flickr.com/photos/governorandrewcuomo/"
                },
                {
                  uri: "https://www.instagram.com/"
                }
              ]
            }
          }
        ]
      }
    },
    {
      section: {
        type: 'ParagraphWysiwyg',
        body: {
          content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
        }
      }
    },
    {
      section: {
        type: 'ParagraphButtons',
        title: 'Button.'
      }
    },
    {
      section: {
        type: 'ParagraphPopularServices',
        title: "Popular Services",
        readMore: {
          url: {
            path: "https://google.com"
          },
          linkText: "View More"
        },
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
    },
    {
      section: {
        type: "ParagraphNygovFilter",
        sidebar: {
          title: 'title',
          subTitle: "SubTitle",
          text: {
            title: "Filter",
            labels: ["Administration", "Business", "Education", "Health and Human Services", "Local and Regional Authorities", "Public Safety", "Recreation and Environment", "Statewide Elected Officials", "Transportation and Utilities"],
            label: "Show All Agencies",
            checked: "checked"
          },
          date: {
            title: "Filter",
            labels: ["2015 - 2016", "2016 - 2017", "2017 - 2018", "2018 - 2019"],
            label: "Show All Agencies",
            checked: "checked"
          }
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
                    img: "https://picsum.photos/240/240"
                  }
                },
                tabletImg: {
                  derivative: {
                    img: "https://picsum.photos/240/240"
                  }
                },
                mobileImg: {
                  derivative: {
                    img: "https://picsum.photos/278/278"
                  }
                }
              }
            },
            content: {
              category: ["Agencies Category", "News item Category", "Events Scheduled Category"],
              title: "Title",
              description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no...",
              url: "https://example.com/",
              date: {
                month: "Month",
                day: "10",
                year: "2020"
              },
              timeLocation: {
                time: "01:00 am",
                location: "State Capitol Red Room Albany, NY"
              }
            },
            footer: {
              url: {
                facebook: "https://www.facebook.com/511NY",
                twitter: "https://twitter.com/my511NY",
                youtube: "https://www.youtube.com/user/511NY",
                flickr: "https://www.flickr.com/photos/39858003@N07/",
                pinterest: "http://www.pinterest.com/511ny/"
              }
            }
          },
          paginate: {
            index: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
          }
        }
      }
    },
    {
      section: {
        type: 'ParagraphLanguages',
        languages: [{
          language: {
            name: "test_french.pdf",
            english: "Franch Translation",
            translated: "Traduction du Franch",
            media: {
              file: {
                url: "http://127.0.0.1:8888/sites/default/files/2020/franch/test_french_0.pdf"
              }
            }
          }
        },
        {
          language: {
            name: "08.28.19.rel_.LTGOVERNORSCHEDULE_Russian.pdf",
            english: "Russian Translation",
            translated: "Перевод на русский язык",
            media: {
              file: {
                url: "http://127.0.0.1:8888/sites/default/files/2019-09/08.28.19.rel_.LTGOVERNORSCHEDULE_Russian_0.pdf"
              }
            }
          }
        }
        ]
      }
    },
    {
      section: {
        type: "ParagraphCardsQueue",
        title: "Default Card Frame",
        subheadline: "Sub Headline",
        cardType: "default_card",
        cardQueue: [{
          card: {
            referenceType: "MediaCard",
            label: "Card Label 1",
            description: {
              processed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
              summaryProcessed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            learnMore: {
              url: {
                path: "https://google.com"
              },
              linkText: "Learn More",
            },
            image: {
              entity: {
                desktopImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                },
                tabletImg: {
                  derivative: {
                    url: "https://picsum.photos/225/225"
                  }
                },
                mobileImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                }
              }
            }
          }
        },
        {
          card: {
            referenceType: "MediaCard",
            label: "Card Label 2",
            description: {
              processed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
              summaryProcessed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            learnMore: {
              url: {
                path: "https://google.com"
              },
              linkText: "Learn More",
            },
            image: {
              entity: {
                desktopImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                },
                tabletImg: {
                  derivative: {
                    url: "https://picsum.photos/225/225"
                  }
                },
                mobileImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                }
              }
            },
            chapterLinks: [
              {
                url: {
                  path: "https://google.com"
                },
                linkText: "Overview"
              },
              {
                url: {
                  path: "https://google.com"
                },
                linkText: "Eligibility"
              },
              {
                url: {
                  path: "https://google.com"
                },
                linkText: "Apply"
              }
            ],
          }
        },
        {
          card: {
            referenceType: "MediaCard",
            label: "Card Label 3",
            description: {
              processed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
              summaryProcessed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            learnMore: {
              url: {
                path: "https://google.com"
              },
              linkText: "Learn More",
            },
            image: {
              entity: {
                desktopImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                },
                tabletImg: {
                  derivative: {
                    url: "https://picsum.photos/225/225"
                  }
                },
                mobileImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                }
              }
            }
          }
        },
        {
          card: {
            referenceType: "MediaCard",
            label: "Card Label 4",
            description: {
              processed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
              summaryProcessed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            learnMore: {
              url: {
                path: "https://google.com"
              },
              linkText: "Learn More",
            },
            image: {
              entity: {
                desktopImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                },
                tabletImg: {
                  derivative: {
                    url: "https://picsum.photos/225/225"
                  }
                },
                mobileImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                }
              }
            }
          }
        },
        {
          card: {
            referenceType: "MediaCard",
            label: "Card Label 5",
            description: {
              processed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
              summaryProcessed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            learnMore: {
              url: {
                path: "https://google.com"
              },
              linkText: "Learn More",
            },
            image: {
              entity: {
                desktopImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                },
                tabletImg: {
                  derivative: {
                    url: "https://picsum.photos/225/225"
                  }
                },
                mobileImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                }
              }
            }
          }
        }
        ]
      }
    },

    {
      section: {
        type: "ParagraphCardsQueue",
        title: "Mobile App Card Frame",
        subheadline: "Sub Headline",
        cardType: "mobile_app_card",
        cardQueue: [{
          card: {
            label: "Card Label 1",
            description: {
              processed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
              summaryProcessed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            learnMore: {
              url: {
                path: "https://google.com"
              },
              linkText: "Download App",
            },
            image: {
              entity: {
                desktopImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                },
                tabletImg: {
                  derivative: {
                    url: "https://picsum.photos/225/225"
                  }
                },
                mobileImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                }
              }
            }
          }
        },
        {
          card: {
            label: "Card Label 2",
            description: {
              processed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
              summaryProcessed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            learnMore: {
              url: {
                path: "https://google.com"
              },
              linkText: "Download App",
            },
            image: {
              entity: {
                desktopImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                },
                tabletImg: {
                  derivative: {
                    url: "https://picsum.photos/225/225"
                  }
                },
                mobileImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                }
              }
            }
          }
        },
        {
          card: {
            label: "Card Label 3",
            description: {
              processed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
              summaryProcessed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            learnMore: {
              url: {
                path: "https://google.com"
              },
              linkText: "Download App",
            },
            image: {
              entity: {
                desktopImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                },
                tabletImg: {
                  derivative: {
                    url: "https://picsum.photos/225/225"
                  }
                },
                mobileImg: {
                  derivative: {
                    url: "https://picsum.photos/400/225"
                  }
                }
              }
            }
          }
        },

        ]
      }
    },
    {
      section: {
        type: "ParagraphCardsQueue",
        title: "Stats Card Frame",
        subheadline: "Sub Headline",
        cardType: "stats_card",
        learnMore: {
          linkText: "Learn More",
          url: {
            path: "https://google.com"
          }
        },
        cardQueue: [{
          card: {
            label: "Card Label 1",
            description: {
              processed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
            },
            image: {
              entity: {
                desktopImg: {
                  derivative: {
                    url: "https://picsum.photos/350"
                  }
                },
                tabletImg: {
                  derivative: {
                    url: "https://picsum.photos/225"
                  }
                },
                mobileImg: {
                  derivative: {
                    url: "https://picsum.photos/400"
                  }
                }
              },
            },
            fieldStats: "$150 Billion Education Aid"
          }
        },
        {
          card: {
            label: "Card Label 2",
            description: {
              processed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
            },
            image: {
              entity: {
                desktopImg: {
                  derivative: {
                    url: "https://picsum.photos/350"
                  }
                },
                tabletImg: {
                  derivative: {
                    url: "https://picsum.photos/225"
                  }
                },
                mobileImg: {
                  derivative: {
                    url: "https://picsum.photos/400"
                  }
                }
              },
            },
            fieldStats: "$150  Billion Education Aid"
          }
        },
        {
          card: {
            label: "Card Label 3",
            description: {
              processed: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh nunc, eleifend ut magna id, porttitor pellentesque tellus. Sed suscipit vestibulum urna, ut vestibulum massa dignissim sit amet. Donec non magna nibh.",
            },
            image: {
              entity: {
                desktopImg: {
                  derivative: {
                    url: "https://picsum.photos/350"
                  }
                },
                tabletImg: {
                  derivative: {
                    url: "https://picsum.photos/225"
                  }
                },
                mobileImg: {
                  derivative: {
                    url: "https://picsum.photos/400"
                  }
                }
              },
            },
            fieldStats: "$150 Billion Education Aid"
          }
        }
        ]
      },
    }
  ]

};