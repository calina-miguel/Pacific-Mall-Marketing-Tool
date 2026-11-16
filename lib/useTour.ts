import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const startTour = () => {
  const getFemaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    // Try to find a natural-sounding female voice
    return voices.find(v => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Zira") || v.name.includes("Google US English")) || voices[0];
  };

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = getFemaleVoice();
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const driverObj = driver({
    showProgress: true,
    onHighlighted: (element) => {
      const step = driverObj.getActiveStep();
      if (step?.popover?.description) {
        speak(step.popover.description);
      }
    },
    steps: [
      { element: '#content-studio', popover: { title: 'Content Studio', description: 'Enter a topic here to generate AI-powered, trend-compliant posts.' } },
      { element: '#engagement-hub', popover: { title: 'Engagement Hub', description: 'Monitor customer interactions and get AI-assisted reply suggestions.' } },
      { element: '#lead-crm', popover: { title: 'Lead CRM', description: 'See all captured leads here for your outreach campaigns.' } }
    ]
  });

  speak("Welcome to your Pacific Mall Marketing Dashboard. Let me show you around.");
  driverObj.drive();
};
