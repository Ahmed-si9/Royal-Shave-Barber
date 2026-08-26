export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const ADDRESS_1 = "OPP McDonald's · Shop 123/68 Hardwick Cres";
export const ADDRESS_2 = "Holt ACT 2615, Canberra";
export const LANDMARK = "Near the Pumping Station mural";
export const PHONE_DISPLAY = "(02) 6254 1234";
export const PHONE_LINK = "tel:+61262541234";

export const IMAGES = {
  hero: "https://images.pexels.com/photos/18483780/pexels-photo-18483780.jpeg?auto=compress&cs=tinysrgb&w=1920",
  gallery: [
    {
      title: "Skin Fade",
      num: "01",
      url: "https://images.unsplash.com/photo-1629189784191-9afdcbcb0398?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwyfHxtZW4lMjBtb2Rlcm4lMjBoYWlyY3V0JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzg3NzQwMDYxfDA&ixlib=rb-4.1.0&q=85",
      span: "md:col-span-7",
      height: "h-[380px] md:h-[520px]",
    },
    {
      title: "Textured Crop",
      num: "02",
      url: "https://images.unsplash.com/photo-1599834562135-b6fc90e642ca?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwzfHxtZW4lMjBtb2Rlcm4lMjBoYWlyY3V0JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzg3NzQwMDYxfDA&ixlib=rb-4.1.0&q=85",
      span: "md:col-span-5",
      height: "h-[380px] md:h-[520px]",
    },
    {
      title: "Modern Taper",
      num: "03",
      url: "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHw0fHxtZW4lMjBtb2Rlcm4lMjBoYWlyY3V0JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzg3NzQwMDYxfDA&ixlib=rb-4.1.0&q=85",
      span: "md:col-span-5",
      height: "h-[380px] md:h-[520px]",
    },
    {
      title: "Beard Trim",
      num: "04",
      url: "https://images.unsplash.com/photo-1630827020718-3433092696e7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwxfHxtZW4lMjBtb2Rlcm4lMjBoYWlyY3V0JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzg3NzQwMDYxfDA&ixlib=rb-4.1.0&q=85",
      span: "md:col-span-7",
      height: "h-[380px] md:h-[520px]",
    },
  ],
  reviewers: {
    prajeet:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMHN0dWRpbyUyMGZhY2V8ZW58MHx8fHwxNzg3NzQwMDYxfDA&ixlib=rb-4.1.0&q=85",
    waddah:
      "https://images.pexels.com/photos/30975995/pexels-photo-30975995.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
};

export const HOURS = [
  { jsDay: 1, day: "Monday", open: 540, close: 1050, label: "9:00 AM – 5:30 PM" },
  { jsDay: 2, day: "Tuesday", open: 540, close: 1050, label: "9:00 AM – 5:30 PM" },
  { jsDay: 3, day: "Wednesday", open: 540, close: 1050, label: "9:00 AM – 5:30 PM" },
  { jsDay: 4, day: "Thursday", open: 540, close: 1050, label: "9:00 AM – 5:30 PM" },
  { jsDay: 5, day: "Friday", open: 540, close: 1110, label: "9:00 AM – 6:30 PM" },
  { jsDay: 6, day: "Saturday", open: 540, close: 1020, label: "9:00 AM – 5:00 PM" },
  { jsDay: 0, day: "Sunday", open: 540, close: 990, label: "9:00 AM – 4:30 PM" },
];

function canberraNow() {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  return { weekday: get("weekday"), minutes: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10) };
}

export function getOpenStatus() {
  const { weekday, minutes } = canberraNow();
  const today = HOURS.find((h) => h.day === weekday);
  const isOpen = Boolean(today && minutes >= today.open && minutes < today.close);
  return { isOpen, weekday, todayLabel: today ? today.label : "" };
}

export const BOOKING_SERVICES = [
  "Special Men's Haircut — from $25",
  "Skin Fade",
  "Textured Crop",
  "Modern Taper",
  "Kids Haircut",
  "Hot Towel & Shave",
  "Beard Trim",
];

export function scrollToId(id) {
  const el = document.querySelector(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -64, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
