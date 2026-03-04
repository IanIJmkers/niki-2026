import { desc } from "framer-motion/client";

export const projects = [
  {
    id: 1,
    slug: "the-3rd-space",
    title: "the 3rd space",
    date: "2023",
    subtitle: "Spatial Dissonance / 2023",
    description:
      "Space is often believed to be a passive construct but the relation(ship) of the individual to the creation of that said space is often overlooked. This three-dimensional object acts as a disorienting tool on an endless plane to force the viewer into reorientation. The individual has to actively negotiate and translate their surroundings in order to better situate oneself. What is the third space, and how does it relate to the extent of our awareness and outlook upon the world? How does this third space potentially look like?",
    image: "/images/third.webp",
    hoverImage: "/images/third-hover.webp",
    gallery: [
      { id: 1, src: "/images/third-1.webp" },
      { id: 2, src: "/images/third-2.webp" },
      { id: 3, src: "/images/third-3.webp" },
      { id: 4, src: "/images/third-4.webp" },
    ],
  },
  {
    id: 2,
    slug: "spoiled",
    title: "spoiled",
    date: "2020",
    subtitle: "Consumed Culture / 2020",
    description:
      "Spoiled is a collaborative project that explores food culture through trend-forecasting with themes of dystopia and the disconnectedness of humanity from nature. The publication's mission is to raise awareness through condensing information surrounding the transformation that affects food through modernization. Through these means we come to the realization that food plays a significant role as a cultural commodity other than simply being a necessity for survival.",
    image: "/images/spoiled.webp",
    hoverImage: "/images/spoiled-hover.webp",
    gallery: [
      { id: 1, src: "/images/spoiled.webp" },
      { id: 2, src: "/images/spoiled-1.webp" },
      { id: 3, src: "/images/spoiled-2.webp" },
      { id: 4, src: "/images/spoiled-3.webp" },
      { id: 5, src: "/images/spoiled-4.webp" },
      { id: 6, src: "/images/spoiled-5.webp" },
    ],
  },
  {
    id: 3,
    slug: "lychee-or-not",
    title: "lychee or not",
    date: "2021",
    subtitle: "Deceptive Materiality / 2021",
    description:
      "The focus of this project is an in depth documentation of prototyping, and material research. Through deep analysis of textures and elements the final product mimics a chosen fruit, which in this case is a lychee. By using a combination of silicon and wax in order to add 'realistic' attributes, the lychee is created. Among a collection of lychee, viewers have to distinguish which lychee in fact, is not real.",
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
    date: "2021",
    subtitle: "Mechanical Surrender / 2021",
    description:
      "Spinal Fracture is a visualization of a conceptual idea in the shape of a semi-functional sculptural object. The object acts as a brace while mimicking the function of a human spine. This project comments on the dangers of everyday technology, the control technology has, and how a transhuman dystopian future can become more of a reality. The spinal sculpture functions through the use of a coded motor that forces the spine to compress inwards. This action portrays the overarching control technology can have on humanity.",
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
    slug: "madame-fleurine",
    title: "madame fleurine",
    date: "2024",
    subtitle: "Craft Identity / 2024",
    description:
      "This project marked a pivotal shift in my practice — bridging the gap between creative expression and strategic thinking. Madame Fleurine was a comprehensive packaging and branding project that challenged me to step beyond personal artistic exploration and into the world of client-driven design. It required deep understanding of the business's identity, translating a client's vision into a cohesive visual language across packaging, branding, and marketing materials. Through this process, I learned how to balance creative ambition with commercial purpose — weaving a client's needs, values, and aspirations into designs that not only look compelling but communicate and resonate with their intended audience. Madame Fleurine represents my a full immersion into the strategic and communicative power of design as a professional tool.",
    image: "/images/madame.webp",
    hoverImage: "/images/madame-hover.webp",
    gallery: [
      { id: 1, src: "/images/madame.webp" },
      { id: 2, src: "/images/madame-hover.webp" },
    ],
  },
  {
    id: 6,
    slug: "liminal",
    title: "liminal",
    date: "2024",
    subtitle: "Threshold Perception / 2024",
    description:
      "This project explores liminality — the transitory state where one exists between understanding and disorientation. It investigates how spaces can submerge us into moments of pause and reflection, unlocking a heightened awareness of our surroundings. At its core, the work examines that precise fragment of sensation before comprehension settles in — when we do not yet understand what is in front of us, and in that uncertainty, a space of transformation and deeper consciousness emerges. Through this lens, liminality situates us within space through bodily reorientation, and simultaneously shapes that space through our ongoing relationship with the objects around us.",
    image: "/images/liminal.webp",
    hoverImage: "/images/liminal-hover.webp",
    gallery: [
      { id: 1, src: "/images/liminal-1.mp4", type: "video" },
      { id: 2, src: "/images/liminal-2.mp4", type: "video" },
    ],
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);

export const getNextProject = (currentId) => {
  const i = projects.findIndex((p) => p.id === currentId);
  return projects[(i + 1) % projects.length];
};
