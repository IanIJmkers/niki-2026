export const projects = [
  {
    id: 1,
    slug: "the-3rd-space",
    title: "the 3rd space",
    date: "March 2023",
    subtitle: "Architectural study / 2023",
    image: "/images/third.webp",
    hoverImage: "/images/third-hover.webp",
    gallery: [
      { id: 1, src: "/images/third.webp" },
      { id: 2, src: "/images/third-hover.webp" },
    ],
  },
  {
    id: 2,
    slug: "spoiled",
    title: "spoiled",
    date: "June 2023",
    subtitle: "Fashion editorial / 2023",
    image: "/images/spoiled.webp",
    hoverImage: "/images/spoiled-hover.webp",
    gallery: [
      { id: 1, src: "/images/spoiled.webp" },
      { id: 2, src: "/images/spoiled-hover.webp" },
    ],
  },
  {
    id: 3,
    slug: "lychee-or-not",
    title: "lychee or not",
    date: "January 2024",
    subtitle: "A botanical exploration / 2024",
    image: "/images/lychee.webp",
    hoverImage: "/images/lychee-hover.webp",
    gallery: [
      { id: 1, src: "/images/lychee.webp" },
      { id: 2, src: "/images/lychee-hover.webp" },
    ],
  },
  {
    id: 4,
    slug: "spinal-fracture",
    title: "spinal fracture",
    date: "November 2023",
    subtitle: "Mechanical photography / 2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam volutpat sit amet nibh porta ultricies. Mauris luctus, ipsum quis rhoncus lobortis, velit leo iaculis ipsum, ut voluptate leo mi quis velit. Mauris at scelerisque nunc. Proin rhoncus, arcu sit amet pharetra congue, eros elit viverra tortor, id sollicitudin neque ipsum eu turpis. Praesent tortor leo, rutrum nec tincidunt quis, laoreet commodo metus.",
    image: "/images/spinal.webp",
    hoverImage: "/images/spinal-hover.webp",
    gallery: [
      { id: 1, src: "/images/spinal-1.webp" },
      { id: 2, src: "/images/spinal-2.webp" },
      { id: 3, src: "/images/spinal-3.webp" },
      { id: 4, src: "/images/spinal-4.webp" },
      { id: 5, src: "/images/spinal-5.webp" },
    ],
  },
  {
    id: 5,
    slug: "madame",
    title: "madame",
    date: "September 2023",
    subtitle: "Conceptual series / 2023",
    image: "/images/madame.webp",
    hoverImage: "/images/madame-hover.webp",
    gallery: [
      { id: 1, src: "/images/madame.webp" },
      { id: 2, src: "/images/madame-hover.webp" },
    ],
  },
  {
    id: 6,
    slug: "globe",
    title: "globe",
    date: "March 2024",
    subtitle: "Globe / 2024",
    image: "/images/globe.webp",
    hoverImage: "/images/globe-hover.webp",
    gallery: [
      { id: 1, src: "/images/globe.webp" },
      { id: 2, src: "/images/globe-hover.webp" },
    ],
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);

export const getProjectsExcluding = (excludeId) =>
  projects.filter((p) => p.id !== excludeId);

export const getNextProject = (currentId) => {
  const i = projects.findIndex((p) => p.id === currentId);
  return projects[(i + 1) % projects.length];
};

export const getPrevProject = (currentId) => {
  const i = projects.findIndex((p) => p.id === currentId);
  return projects[(i - 1 + projects.length) % projects.length];
};
