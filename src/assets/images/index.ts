const images = {
  heroImage: require("@/assets/images/Hero.png"),
  heroBadmintonImage: require("@/assets/images/Hero-Badminton.png"),
  featuredTourCardMain: require("@/assets/images/TourCardMain.png"),
  featuredTourCard: require("@/assets/images/TourCard.png"),
  sceneryImage: require("@/assets/images/scenery.jpg"),
};

export const sliderImages = [
  {
    id: 1,
    url: images.featuredTourCardMain,
    title: "All Star Season 2025",
    description: "The Shuttlecock Masters Championship",
    prize: "50,000",
    date: "March 15-20, 2024",
    registerDeadline: "March 1st, 2024",
    location: "International Sports Arena, Singapore",
  },
  {
    id: 2,
    url: images.sceneryImage,
    title: "All Star Season 2024",
    description: "The Shuttlecock Masters Championship",
    prize: "40,000",
    date: "March 16-21, 2023",
    registerDeadline: "March 2st, 2023",
    location: "My Dinh Stadium, VietNam",
  },
  {
    id: 3,
    url: images.featuredTourCardMain,
    title: "All Star Season 2023",
    description: "The Shuttlecock Masters Championship",
    prize: "30,000",
    date: "March 16-21, 2022",
    registerDeadline: "March 2st, 2022",
    location: "My Dinh Stadium, VietNam",
  },
  {
    id: 4,
    url: images.sceneryImage,
    title: "All Star Season 2022",
    description: "The Shuttlecock Masters Championship",
    prize: "20,000",
    date: "March 16-21, 2022",
    registerDeadline: "March 2st, 2022",
    location: "My Dinh Stadium, VietNam",
  },
];

export default images;
