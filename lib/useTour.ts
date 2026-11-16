import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// Helper to select the highest-quality, natural-sounding professional female voice available on the device
function getBestNaturalFemaleVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Ranked priority list of natural neural/premium female voices across Edge, Chrome, Safari, macOS, Windows, iOS, Android
  const preferredFemaleVoices = [
    // Microsoft Natural / Neural online voices (Edge / Windows 11) - exceptionally high naturalness
    "Microsoft Jenny Online (Natural)",
    "Microsoft Jenny Multilingual Online (Natural)",
    "Microsoft Aria Online (Natural)",
    "Microsoft Michelle Online (Natural)",
    "Microsoft Ava Online (Natural)",
    "Microsoft Emma Online (Natural)",
    "Microsoft Zira",
    // Google Chrome Natural voices
    "Google US English",
    "Google UK English Female",
    // Apple macOS / iOS Premium & Siri voices
    "Siri",
    "Samantha (Enhanced)",
    "Samantha",
    "Karen (Enhanced)",
    "Karen",
    "Victoria",
    "Moira",
    "Fiona",
    "Tessa"
  ];

  for (const name of preferredFemaleVoices) {
    const match = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()));
    if (match) return match;
  }

  // Fallback: search for any voice labeled with "Natural", "Neural", "Female", or "en-"
  const naturalFallback = voices.find(
    v =>
      (v.name.toLowerCase().includes("natural") || v.name.toLowerCase().includes("female")) &&
      v.lang.startsWith("en")
  );
  if (naturalFallback) return naturalFallback;

  // Final fallback: any English voice
  const englishFallback = voices.find(v => v.lang.startsWith("en-US") || v.lang.startsWith("en"));
  return englishFallback || voices[0] || null;
}

export const startTour = () => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const speak = (text: string) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = getBestNaturalFemaleVoice();

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Professional, warm cadence (rate: 0.92 for clear, executive clarity, pitch: 1.05 for friendly tone)
    utterance.rate = 0.94;
    utterance.pitch = 1.04;

    window.speechSynthesis.speak(utterance);
  };

  // Ensure voices are loaded (Chrome sometimes loads voices asynchronously)
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      // voices ready
    };
  }

  const driverObj = driver({
    showProgress: true,
    onDestroyStarted: () => {
      window.speechSynthesis.cancel();
      driverObj.destroy();
    },
    onHighlightStarted: (element) => {
      const path = window.location.pathname;
      if (element?.id === "content-studio" && path !== "/dashboard") window.location.href = "/dashboard";
      else if (element?.id === "engagement-hub" && path !== "/dashboard/engagement") window.location.href = "/dashboard/engagement";
      else if (element?.id === "lead-crm" && path !== "/dashboard/leads") window.location.href = "/dashboard/leads";
    },
    onHighlighted: (element) => {
      const step = driverObj.getActiveStep();
      if (step?.popover?.description) speak(step.popover.description);
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

  speak("Welcome to Pacific Mall Marketing System. Let me give you a quick walkthrough of your tools.");
  driverObj.drive();
};
