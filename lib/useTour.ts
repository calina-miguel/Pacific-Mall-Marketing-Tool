import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const startTour = () => {
  const getNaturalVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    // These are the high-quality native neural voices found on modern Windows/macOS
    const preferred = [
      "Microsoft Jenny",    // Extremely natural Windows
      "Samantha",           // Classic macOS
      "Karen",              // Australian natural
      "Google US English", 
      "Zira"
    ];
    return voices.find(v => preferred.some(p => v.name.includes(p))) || voices[0];
  };

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getNaturalVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.92; // Slightly slower feels more professional/thoughtful
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const driverObj = driver({
    showProgress: true,
    onHighlightStarted: (element) => {
      const currentPath = window.location.pathname;
      if (element?.id === 'content-studio' && currentPath !== '/dashboard') window.location.href = '/dashboard';
      else if (element?.id === 'engagement-hub' && currentPath !== '/dashboard/engagement') window.location.href = '/dashboard/engagement';
      else if (element?.id === 'lead-crm' && currentPath !== '/dashboard/leads') window.location.href = '/dashboard/leads';
    },
    onHighlighted: (element) => {
      const step = driverObj.getActiveStep();
      if (step?.popover?.description) speak(step.popover.description);
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
