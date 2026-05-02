export type TextMessage = {
  id: string;
  kind: "text";
  side: "sent" | "received";
  content: string;
  timestamp: string;
};

export type CardMessage = {
  id: string;
  kind: "card";
  side: "received";
  data: {
    label: string;
    date: string;
    time: string;
    doctor: string;
    duration: string;
    location: string;
  };
};

export type Message = TextMessage | CardMessage;

export const CONVERSATION: readonly Message[] = [
  {
    id: "m1",
    kind: "text",
    side: "sent",
    content:
      "Hi, do you have any availability this week for a consultation? Saw your work on Instagram.",
    timestamp: "11:47 PM",
  },
  {
    id: "m2",
    kind: "text",
    side: "received",
    content:
      "Hi Layla, thanks for reaching out. We have two openings: Thursday 2 PM or Friday 10 AM. The consultation is 45 minutes with Dr. Rana Haddad, AED 300. Would either work for you?",
    timestamp: "11:47 PM",
  },
  {
    id: "m3",
    kind: "text",
    side: "sent",
    content: "Friday 10 AM works. Do I need to bring anything?",
    timestamp: "11:48 PM",
  },
  {
    id: "m4",
    kind: "text",
    side: "received",
    content:
      "Just your Emirates ID. We'll send a reminder Thursday evening with the clinic address and parking. Could I get your full name and mobile number to confirm?",
    timestamp: "11:48 PM",
  },
  {
    id: "m5",
    kind: "text",
    side: "sent",
    content: "Layla Al Suwaidi, +971 50 412 8867",
    timestamp: "11:49 PM",
  },
  {
    id: "m6",
    kind: "card",
    side: "received",
    data: {
      label: "APPOINTMENT CONFIRMED",
      date: "Friday",
      time: "10:00 AM",
      doctor: "Dr. Rana Haddad",
      duration: "45 min consultation",
      location: "Maison Aesthetic, Jumeirah",
    },
  },
];

export const CLINIC_NAME = "Maison Aesthetic";
export const CLINIC_STATUS = "Online";
export const PATIENT_NAME = "Layla Al Suwaidi";
