import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const startTour = () => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      { element: '#content-studio', popover: { title: 'Content Studio', description: 'Enter a topic here to generate AI-powered, trend-compliant posts.' } },
      { element: '#engagement-hub', popover: { title: 'Engagement Hub', description: 'Monitor customer interactions and get AI-assisted reply suggestions.' } },
      { element: '#lead-crm', popover: { title: 'Lead CRM', description: 'See all captured leads here for your outreach campaigns.' } }
    ]
  });

  // Voice Over using Web Speech API
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  driverObj.drive();
  speak("Welcome to your Pacific Mall Marketing Dashboard. Let me show you around.");
};
