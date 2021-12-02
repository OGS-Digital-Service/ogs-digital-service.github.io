export default {
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
