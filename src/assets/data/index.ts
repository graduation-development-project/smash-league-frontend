import images from "@/assets/images";
import {
  CanlendarIcon,
  ClockIcon,
  LocationIcon,
  MedalIcon,
  NotificationIcon,
} from "../icons";

export const sliderImages = [
  {
    id: 1,
    url: images.featuredTourCardMain,
    title: "All Star Season 2025",
    description: "The Shuttlecock Masters Championship",
    prize: "50,000",
    details: [
      {
        id: 1,
        content: "March 15-20, 2024",
        icon: CanlendarIcon,
      },
      {
        id: 2,
        content: "March 1st, 2024",
        icon: ClockIcon,
      },
      {
        id: 3,
        content: "International Sports Arena, Singapore",
        icon: LocationIcon,
      },
    ],
  },
  {
    id: 2,
    url: images.viewImage,
    title: "All Star Season 2024",
    description: "The Shuttlecock Masters Championship",
    prize: "40,000",
    details: [
      {
        id: 1,
        content: "March 15-20, 2023",
        icon: CanlendarIcon,
      },
      {
        id: 2,
        content: "March 1st, 2023",
        icon: ClockIcon,
      },
      {
        id: 3,
        content: "My Dinh National Stadium, Hanoi",
        icon: LocationIcon,
      },
    ],
  },
  {
    id: 3,
    url: images.featuredTourCardMain,
    title: "All Star Season 2023",
    description: "The Shuttlecock Masters Championship",
    prize: "30,000",
    details: [
      {
        id: 1,
        content: "March 15-20, 2022",
        icon: CanlendarIcon,
      },
      {
        id: 2,
        content: "March 1st, 2022",
        icon: ClockIcon,
      },
      {
        id: 3,
        content: "Old Trafford, Manchester",
        icon: LocationIcon,
      },
    ],
  },
  {
    id: 4,
    url: images.viewImage,
    title: "All Star Season 2022",
    description: "The Shuttlecock Masters Championship",
    prize: "20,000",
    details: [
      {
        id: 1,
        content: "March 15-20, 2021",
        icon: CanlendarIcon,
      },
      {
        id: 2,
        content: "March 1st, 2021",
        icon: ClockIcon,
      },
      {
        id: 3,
        content: "Stamford Bridge, London",
        icon: LocationIcon,
      },
    ],
  },
];

export const organizerImage = {
  id: 1,
  url: images.refereesImage,
  title: "Become a Badminton Referee",
  description:
    "Join our community and play a crucial role in tournaments. Whether you're experienced or just starting, we have opportunities for you!",
  details: [
    {
      id: 1,
      content: "Officiate thrilling matches with professionalism.",
      icon: NotificationIcon,
    },

    {
      id: 2,
      content: "Gain practical experience to advance your skills.",
      icon: CanlendarIcon,
    },

    {
      id: 3,
      content: "Gain practical experience to advance your skills.",
      icon: MedalIcon,
    },
  ],
};

export const organizerDataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Feb",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "June",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "July",
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: "Aug",
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: "Sept",
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: "Oct",
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: "Nov",
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: "Dec",
  },
];
