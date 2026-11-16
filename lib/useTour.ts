import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const startTour = () => {
  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get all available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Priority list for high-quality, professional female voices
    const proVoices = [
        "Microsoft Jenny Online", 
        "Microsoft Aria Online",
        "Samantha", 
        "Google US English", 
        "Karen"
    ];

    const selectedVoice = voices.find(v => proVoices.some(p => v.name.includes(p))) || voices[0];
    
    utterance.voice = selectedVoice;
    utterance.rate = 0.9;   // Slower = more professional
    utterance.pitch = 1.05; // Slightly higher for clarity
    
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

  // Small delay to ensure voices are loaded in the browser
  setTimeout(() => {
    speak("Welcome to your Pacific Mall Marketing Dashboard. Let me show you around.");
    driverObj.drive();
  }, 500);
};
