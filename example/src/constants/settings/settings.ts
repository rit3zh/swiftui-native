import { SFSymbol } from "sf-symbols-typescript";

export interface ISetting {
  name: string;
  image: SFSymbol;
  color: string;
}

export interface ISection {
  name: string;
  icon: SFSymbol;
  footer?: string;
}

export interface SettingsProps {
  section: ISection;
  data: ISetting[];
}

export const settings: SettingsProps[] = [
  {
    section: {
      name: "Network",
      icon: "network",
      footer: "Manage your device's connectivity options.",
    },
    data: [
      {
        name: "AirDrop",
        image: "drop.fill",
        color: "#007aff",
      },
      { name: "Wi-Fi", image: "wifi", color: "#34c759" },
      {
        name: "Bluetooth",
        image: "dot.radiowaves.left.and.right",
        color: "#007aff",
      },
      {
        name: "Mobile Data",
        image: "antenna.radiowaves.left.and.right",
        color: "#34c759",
      },
      { name: "Personal Hotspot", image: "personalhotspot", color: "#30b0c7" },
    ],
  },
  {
    section: {
      name: "Notifications",
      icon: "bell",
      footer: "Customize how and when your device alerts you.",
    },
    data: [
      { name: "Notifications", image: "bell.badge", color: "#ff3b30" },
      {
        name: "Sounds & Haptics",
        image: "speaker.wave.3.fill",
        color: "#ff9500",
      },
      { name: "Focus", image: "moon.fill", color: "#8e8e93" },
      { name: "Screen Time", image: "hourglass", color: "#5e5ce6" },
    ],
  },
  {
    section: {
      name: "Settings",
      icon: "gear",
      footer: "Access general preferences and visual settings.",
    },
    data: [
      { name: "General", image: "gear", color: "#8e8e93" },
      { name: "Control Center", image: "switch.2", color: "#5ac8fa" },
      {
        name: "Display & Brightness",
        image: "textformat.size",
        color: "#007aff",
      },
      { name: "Wallpaper", image: "photo.on.rectangle", color: "#5ac8fa" },
      { name: "Siri & Search", image: "mic.fill", color: "#ff2d55" },
    ],
  },
  {
    section: {
      name: "Security",
      icon: "lock.shield",
      footer: "Protect your data and monitor power usage.",
    },
    data: [
      { name: "Face ID & Passcode", image: "faceid", color: "#30b0c7" },
      { name: "Emergency SOS", image: "sos", color: "#ff3b30" },
      { name: "Battery", image: "battery.100", color: "#34c759" },
    ],
  },
];
