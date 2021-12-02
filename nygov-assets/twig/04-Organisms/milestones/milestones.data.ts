export default {
  section: {
    type: "ParagraphMilestones",
    title: "Milestone Title",
    headline: "Milestones Headline Here",
    whatsnext: "What's Next Text.",
    color: "light-blue",
    seemore: {
      uri: "https://google.com",
      title: "See More",
    },
    previewImage: {
      entity: {
        bgImg: {
          derivative: {
            url: "https://picsum.photos/220/220"
          }
        }
      }
    },
    milestoneParagraphs: [
      {
        paragraph: {
          name: "Milestone Title 1",
          date: {
            value: "03-01-2020"
          }
        }
      },
      {
        paragraph: {
          name: "Milestone Title 2",
          date: {
            value: "03-07-2020"
          }
        }
      },
      {
        paragraph: {
          name: "Milestone Title 3",
          date: {
            value: "03-14-2020"
          }
        }
      }
    ]
  }
}
