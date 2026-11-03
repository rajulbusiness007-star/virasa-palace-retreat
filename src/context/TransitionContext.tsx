import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { royalSoundscape } from '../utils/royalAudio';

export type TransitionStyle = 'fade' | 'slide' | 'scale' | 'cube' | 'mask';

export interface TransitionMeta {
  id: TransitionStyle;
  label: string;
  tagline: string;
  description: string;
  icon: string;
}

export const TRANSITION_CATALOG: TransitionMeta[] = [
  {
    id: 'slide',
    label: 'Royal Silk Slide',
    tagline: 'Directional Silk Glide',
    description: 'Smooth horizontal glide with gold boundary gleam and deceleration physics.',
    icon: '⇄',
  },
  {
    id: 'fade',
    label: 'Palace Dissolve',
    tagline: 'Atmospheric Mist Dissolve',
    description: 'Ethereal cross-dissolve with gentle defocus and luminous contrast emergence.',
    icon: '◌',
  },
  {
    id: 'scale',
    label: 'Sovereign Zoom',
    tagline: 'Deep-Focus Camera Reveal',
    description: 'Cinematic architectural dolly zoom with regal vignette focus.',
    icon: '⊕',
  },
  {
    id: 'cube',
    label: '3D Jharokha Cube',
    tagline: 'Rotational Chamber Perspective',
    description: 'True 3D rotational palace chamber perspective with depth shading.',
    icon: '◫',
  },
  {
    id: 'mask',
    label: 'Royal Arch Mask',
    tagline: 'Mughal Arch Silhouette Wipe',
    description: 'Hand-carved pointed royal archway silhouette uncovering the scene.',
    icon: '▲',
  },
];

interface TransitionContextType {
  transitionStyle: TransitionStyle;
  setTransitionStyle: (style: TransitionStyle, triggerSound?: boolean) => void;
  getTransitionVariants: () => {
    initial: any;
    animate: any;
    exit: any;
    transition?: any;
  };
  isWiping: boolean;
  wipeTitle: string;
  triggerTransitionWipe: (style?: TransitionStyle) => void;
  isAutoTouring: boolean;
  toggleAutoTour: () => void;
}

const TransitionContext = createContext<TransitionContextType>({
  transitionStyle: 'slide',
  setTransitionStyle: () => {},
  getTransitionVariants: () => ({ initial: {}, animate: {}, exit: {} }),
  isWiping: false,
  wipeTitle: '',
  triggerTransitionWipe: () => {},
  isAutoTouring: false,
  toggleAutoTour: () => {},
});

export const useTransitionStyle = () => useContext(TransitionContext);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transitionStyle, setTransitionStyleState] = useState<TransitionStyle>('slide');
  const [isWiping, setIsWiping] = useState<boolean>(false);
  const [wipeTitle, setWipeTitle] = useState<string>('');
  const [isAutoTouring, setIsAutoTouring] = useState<boolean>(false);
  const tourTimerRef = useRef<number | null>(null);

  const setTransitionStyle = (style: TransitionStyle, triggerSound = true) => {
    setTransitionStyleState(style);
    if (triggerSound) {
      royalSoundscape.playTransitionChime();
    }
  };

  const triggerTransitionWipe = (targetStyle?: TransitionStyle) => {
    const styleToUse = targetStyle || transitionStyle;
    setTransitionStyleState(styleToUse);
    const meta = TRANSITION_CATALOG.find((t) => t.id === styleToUse) || TRANSITION_CATALOG[0];
    setWipeTitle(meta.label);
    setIsWiping(true);
    royalSoundscape.playTransitionChime();

    setTimeout(() => {
      setIsWiping(false);
    }, 750);
  };

  // Auto-tour cycling through all transitions every 5 seconds when activated
  const toggleAutoTour = () => {
    if (isAutoTouring) {
      if (tourTimerRef.current) clearInterval(tourTimerRef.current);
      setIsAutoTouring(false);
    } else {
      setIsAutoTouring(true);
      triggerTransitionWipe();
      let currentIndex = TRANSITION_CATALOG.findIndex((t) => t.id === transitionStyle);
      tourTimerRef.current = window.setInterval(() => {
        currentIndex = (currentIndex + 1) % TRANSITION_CATALOG.length;
        const nextStyle = TRANSITION_CATALOG[currentIndex].id;
        triggerTransitionWipe(nextStyle);
      }, 4500);
    }
  };

  useEffect(() => {
    return () => {
      if (tourTimerRef.current) clearInterval(tourTimerRef.current);
    };
  }, []);

  const getTransitionVariants = () => {
    const ease = [0.16, 1, 0.3, 1]; // Taj palace smooth deceleration

    switch (transitionStyle) {
      case 'fade':
        return {
          initial: { opacity: 0, filter: 'blur(4px)' },
          animate: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.5, ease: 'easeOut' },
          },
          exit: {
            opacity: 0,
            filter: 'blur(4px)',
            transition: { duration: 0.35, ease: 'easeIn' },
          },
        };

      case 'slide':
        return {
          initial: { opacity: 0, x: 45, filter: 'brightness(0.95)' },
          animate: {
            opacity: 1,
            x: 0,
            filter: 'brightness(1)',
            transition: { duration: 0.55, ease },
          },
          exit: {
            opacity: 0,
            x: -45,
            filter: 'brightness(0.95)',
            transition: { duration: 0.38, ease },
          },
        };

      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.88 },
          animate: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.55, ease },
          },
          exit: {
            opacity: 0,
            scale: 1.08,
            transition: { duration: 0.38, ease },
          },
        };

      case 'cube':
        return {
          initial: {
            opacity: 0,
            rotateY: 38,
            scale: 0.92,
            transformPerspective: 1200,
          },
          animate: {
            opacity: 1,
            rotateY: 0,
            scale: 1,
            transformPerspective: 1200,
            transition: { duration: 0.6, ease },
          },
          exit: {
            opacity: 0,
            rotateY: -38,
            scale: 0.92,
            transformPerspective: 1200,
            transition: { duration: 0.45, ease },
          },
        };

      case 'mask':
        return {
          initial: {
            opacity: 0.3,
            clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
          },
          animate: {
            opacity: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            transition: { duration: 0.65, ease },
          },
          exit: {
            opacity: 0.3,
            clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
            transition: { duration: 0.42, ease },
          },
        };

      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  return (
    <TransitionContext.Provider
      value={{
        transitionStyle,
        setTransitionStyle,
        getTransitionVariants,
        isWiping,
        wipeTitle,
        triggerTransitionWipe,
        isAutoTouring,
        toggleAutoTour,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};
