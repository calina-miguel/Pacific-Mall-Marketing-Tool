import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const startTour = () => {
  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => 
        v.name.includes("Microsoft Aria") || 
        v.name.includes("Microsoft Jenny") || 
        v.name.includes("Samantha")
    );

    if (naturalVoice) utterance.voice = naturalVoice;
    
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const driverObj = driver({
    showProgress: true,
    onHighlightStarted: (element) => {
      const path = window.location.pathname;
      if (element?.id === 'content-studio' && path !== '/dashboard') window.location.href = '/dashboard';
      else if (element?.id === 'engagement-hub' && path !== '/dashboard/engagement') window.location.href = '/dashboard/engagement';
      else if (element?.id === 'lead-crm' && path !== '/dashboard/leads') window.location.href = '/dashboard/leads';
    },
    onHighlighted: (element) => {
      const step = driverObj.getActiveStep();
      if (step?.popover?.description) speak(step.popover.description);
    },
    steps: [
      { element: '#content-studio', popover: { title: 'Content Studio', description: 'Centralized content studio. Generate trend-compliant assets tailored to your brand voice.' } },
      { element: '#engagement-hub', popover: { title: 'Engagement Hub', description: 'Real-time engagement hub. AI-assisted response workflows for streamlined customer interactions.' } },
      { element: '#lead-crm', popover: { title: 'Lead CRM', description: 'Integrated lead management. Automatically capture and track customer outreach data.' } }
    ]
  });

  speak("Welcome to the Pacific Mall Core. A unified marketing automation engine for Mandaue. Let us begin.");
  driverObj.drive();
};
