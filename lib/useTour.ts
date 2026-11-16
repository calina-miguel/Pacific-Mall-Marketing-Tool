import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// Tour audio tracks rendered directly from Kokoro TTS (Voice: af_heart)
const KOKORO_AUDIO: Record<string, string> = {
  intro: "/audio/tour_intro.mp3",
  studio: "/audio/tour_studio.mp3",
  engagement: "/audio/tour_engagement.mp3",
  crm: "/audio/tour_crm.mp3",
};

let currentAudio: HTMLAudioElement | null = null;

function playKokoroAudio(key: keyof typeof KOKORO_AUDIO) {
  if (typeof window === "undefined") return;

  // Stop any currently playing audio track
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const src = KOKORO_AUDIO[key];
  if (!src) return;

  const audio = new Audio(src);
  currentAudio = audio;
  audio.play().catch((err) => {
    console.warn("Audio autoplay prevented by browser policy:", err);
  });
}

function stopKokoroAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

export const startTour = () => {
  if (typeof window === "undefined") return;

  stopKokoroAudio();

  const driverObj = driver({
    showProgress: true,
    onDestroyStarted: () => {
      stopKokoroAudio();
      driverObj.destroy();
    },
    onHighlightStarted: (element) => {
      const path = window.location.pathname;
      if (element?.id === "content-studio" && path !== "/dashboard") {
        window.location.href = "/dashboard";
      } else if (element?.id === "engagement-hub" && path !== "/dashboard/engagement") {
        window.location.href = "/dashboard/engagement";
      } else if (element?.id === "lead-crm" && path !== "/dashboard/leads") {
        window.location.href = "/dashboard/leads";
      }
    },
    onHighlighted: (element) => {
      if (element?.id === "content-studio") {
        playKokoroAudio("studio");
      } else if (element?.id === "engagement-hub") {
        playKokoroAudio("engagement");
      } else if (element?.id === "lead-crm") {
        playKokoroAudio("crm");
      }
    },
    steps: [
      {
        element: "#content-studio",
        popover: {
          title: "Content Studio",
          description: "Welcome to Content Studio. Here you can generate retail campaign copy, headlines, and trending hashtags tailored for Pacific Mall."
        }
      },
      {
        element: "#engagement-hub",
        popover: {
          title: "Engagement Hub",
          description: "This is your Engagement Hub. It tracks incoming customer comments from social channels and prepares instant, courteous replies."
        }
      },
      {
        element: "#lead-crm",
        popover: {
          title: "Lead CRM",
          description: "Here in Lead CRM, you can manage customer contacts, track inquiry types, and dispatch direct promotional outreach."
        }
      }
    ]
  });

  // Play introductory VO from Kokoro TTS
  playKokoroAudio("intro");
  driverObj.drive();
};
