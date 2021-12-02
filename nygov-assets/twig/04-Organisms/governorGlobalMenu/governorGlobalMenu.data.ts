export default {
  menu: {
    name: "Main navigation",
    links: [
      {
        label: "Pressroom",
        expanded: false,
        url: {
          path: "/",
          routed: true
        },
        links: []
      },
      {
        label: "Schedule",
        expanded: false,
        url: {
          path: "/programs/test-program-page",
          routed: true
        },
        links: []
      },
      {
        label: "Executive orders",
        expanded: false,
        url: {
          path: "/test-plan-summary-landing-page",
          routed: true
        },
        links: []
      },
      {
        label: "Priorities",
        expanded: true,
        url: {
          path: "/legislation/test-legislation",
          routed: true
        },
        links: [
          {
            label: "Civil Rights",
            url: {
              path: "/",
              routed: true
            }
          },
          {
            label: "Community Revitalization",
            url: {
              path: "/",
              routed: true
            }
          },
          {
            label: "Criminal Justice",
            url: {
              path: "/",
              routed: true
            }
          },
          {
            label: "Economic Development",
            url: {
              path: "/",
              routed: true
            }
          }
        ]
      },
      {
        label: "Legislation",
        expanded: false,
        url: {
          path: "/",
          routed: true
        },
        links: []
      },
      {
        label: "Contact",
        expanded: false,
        url: {
          path: "/test-bio-and-links-card",
          routed: true
        },
        links: []
      },
    ]
  },
}