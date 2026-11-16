import { driver, DriveStep } from "driver.js";
import "driver.js/dist/driver.css";

// Tour audio tracks rendered directly from Kokoro TTS (Voice: af_heart)
const KOKORO_AUDIO: Record<string, string> = {
  intro: "/audio/tour_intro.mp3",
  studio: "/audio/tour_studio.mp3",
  engagement: "/audio/tour_engagement.mp3",
  crm: "/audio/tour_crm.mp3",
};

// Cached HTMLAudioElement instances for instant zero-latency playback
const audioElements: Partial<Record<string, HTMLAudioElement>> = {};
let currentAudio: HTMLAudioElement | null = null;

function getAudio(key: string): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  const src = KOKORO_AUDIO[key];
  if (!src) return null;

  if (!audioElements[key]) {
    const audio = new Audio(src);
    audio.preload = "auto";
    audioElements[key] = audio;
  }
  return audioElements[key]!;
}

// Preload all audio tracks in background
export function preloadTourAudio() {
  if (typeof window === "undefined") return;
  Object.keys(KOKORO_AUDIO).forEach((key) => {
    getAudio(key);
  });
}

export function playKokoroAudio(key: string) {
  if (typeof window === "undefined") return;

  // Immediately stop any currently playing voiceover track
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {
      // Ignore pause errors
    }
    currentAudio = null;
  }

  const audio = getAudio(key);
  if (!audio) return;

  currentAudio = audio;
  try {
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn(`[Guided Tour] Autoplay prevented for track "${key}":`, err);
      });
    }
  } catch (err) {
    console.warn(`[Guided Tour] Error playing audio "${key}":`, err);
  }
}

export function stopKokoroAudio() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {
      // Ignore pause errors
    }
    currentAudio = null;
  }
}

// Find the element currently visible on the screen (works seamlessly on mobile & desktop)
function getVisibleTourTarget(tourKey: string, fallbackId: string): Element {
  if (typeof document === "undefined") return null as unknown as Element;
  const matches = Array.from(document.querySelectorAll(`[data-tour="${tourKey}"]`));
  const visible = matches.find((el) => {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== "none";
  });
  return (visible || matches[0] || document.querySelector(fallbackId)) as Element;
}

export const startTour = () => {
  if (typeof window === "undefined") return;

  // Preload tracks in case they haven't started yet
  preloadTourAudio();
  stopKokoroAudio();

  const steps: DriveStep[] = [
    {
      element: undefined,
      popover: {
        title: "✨ Welcome to Pacific Mall Marketing System",
        description: "Welcome to your marketing workspace. Let us take you on a quick guided walkthrough of your tools.",
        nextBtnText: "Start Tour &rarr;",
      },
      onHighlighted: () => {
        playKokoroAudio("intro");
      },
    },
    {
      element: () => getVisibleTourTarget("studio", "#content-studio"),
      popover: {
        title: "🎨 Content Studio",
        description: "Generate retail campaign copy, headlines, and trending hashtags tailored for Pacific Mall.",
        nextBtnText: "Next: Engagement &rarr;",
        prevBtnText: "&larr; Back",
      },
      onHighlighted: () => {
        playKokoroAudio("studio");
      },
    },
    {
      element: () => getVisibleTourTarget("engagement", "#engagement-hub"),
      popover: {
        title: "💬 Engagement Hub",
        description: "Track incoming customer comments from social channels and prepare instant, courteous replies.",
        nextBtnText: "Next: Lead CRM &rarr;",
        prevBtnText: "&larr; Back",
      },
      onHighlighted: () => {
        playKokoroAudio("engagement");
      },
    },
    {
      element: () => getVisibleTourTarget("crm", "#lead-crm"),
      popover: {
        title: "👥 Lead CRM",
        description: "Manage customer contacts, track inquiry types, and dispatch direct promotional outreach.",
        doneBtnText: "Finish Tour ✓",
        prevBtnText: "&larr; Back",
      },
      onHighlighted: () => {
        playKokoroAudio("crm");
      },
    },
  ];

  const driverObj = driver({
    showProgress: true,
    animate: true,
    allowClose: true,
    overlayColor: "rgba(26, 20, 41, 0.7)",
    stagePadding: 6,
    stageRadius: 16,
    steps,
    onDestroyStarted: () => {
      stopKokoroAudio();
      driverObj.destroy();
    },
  });

  driverObj.drive();
};
