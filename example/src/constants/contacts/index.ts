export interface Contact {
  name: string;
  image: string;
}

export interface GroupedContacts {
  [letter: string]: Contact[];
}

const contacts: Contact[] = [
  {
    name: "Alice Johnson",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  { name: "Brian Lee", image: "https://randomuser.me/api/portraits/men/2.jpg" },
  {
    name: "Carla Gomez",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  { name: "David Kim", image: "https://randomuser.me/api/portraits/men/4.jpg" },
  {
    name: "Emily Clark",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Frank Murphy",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    name: "Grace Patel",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    name: "Henry Zhou",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    name: "Isla Rivera",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    name: "Jack Nguyen",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Karen Smith",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    name: "Leo Brown",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Mia Wilson",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    name: "Noah Davis",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    name: "Olivia Moore",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
  },
];

export { contacts };
