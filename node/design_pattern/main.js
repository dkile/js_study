const a = {
  items: [
    {
      url: "#header-1",
      title: "Header 1",
      items: [
        {
          url: "#header-2",
          title: "Header 2",
        },
      ],
    },
    {
      url: "#header-1-1",
      title: "Header 1",
      items: [
        {
          url: "#header-2-1",
          title: "Header 2",
          items: [
            {
              url: "#header-3",
              title: "Header 3",
            },
          ],
        },
      ],
    },
    {
      url: "#header-1-2",
      title: "Header 1",
      items: [
        {
          url: "#header-2-2",
          title: "Header 2",
          items: [
            {
              url: "#header-3-1",
              title: "Header 3",
            },
          ],
        },
      ],
    },
  ],
};

const flattenObject = (obj) =>
  Object.keys(obj)
    .map((k) => obj[k])
    .flat()
    .map((el) =>
      Object.keys(el)
        .map((k) => el[k])
        .flat()
    );
