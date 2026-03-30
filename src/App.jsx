import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import useCameraRecorder from './components/CameraRecorder';
import Step0Consent from './steps/Step0Consent';
import Step1Welcome from './steps/Step1Welcome';
import Step2ScratchFake from './steps/Step2ScratchFake';
import Step3Quiz from './steps/Step3Quiz';
import Step4TrueFalse from './steps/Step4TrueFalse';
import Step5ScratchFake2 from './steps/Step5ScratchFake2';
import Step6Hints from './steps/Step6Hints';
import Step7BuildUp from './steps/Step7BuildUp';
import Step8Reveal from './steps/Step8Reveal';
import Step9LoveNote from './steps/Step9LoveNote';

const steps = [
  Step1Welcome,
  Step2ScratchFake,
  Step3Quiz,
  Step4TrueFalse,
  Step5ScratchFake2,
  Step6Hints,
  Step7BuildUp,
  Step8Reveal,
  Step9LoveNote,
];

export default function App() {
  const [consentDone, setConsentDone] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { isRecording, videoUrl, startRecording, stopRecording, downloadVideo } = useCameraRecorder();

  const handleAcceptCamera = async () => {
    await startRecording();
    setConsentDone(true);
  };

  const handleDeclineCamera = () => {
    setConsentDone(true);
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Stop recording when reaching the last step
      if (currentStep + 1 === steps.length - 1 && isRecording) {
        stopRecording();
      }
    }
  };

  if (!consentDone) {
    return (
      <div className="w-full min-h-screen">
        <Step0Consent onAccept={handleAcceptCamera} onDecline={handleDeclineCamera} />
      </div>
    );
  }

  const StepComponent = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="w-full min-h-screen">
      {/* Small recording indicator */}
      {isRecording && (
        <div className="fixed top-3 right-3 z-50 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-red-500" style={{ fontFamily: 'Fredoka' }}>REC</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <StepComponent
            onNext={goNext}
            {...(isLastStep ? { videoUrl, downloadVideo } : {})}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
