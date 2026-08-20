import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CINEMATIC_EASE = 'power3.out';
export const SMOOTH_EASE = 'power2.out';
export const EXPO_EASE = 'expo.out';

export { gsap, ScrollTrigger };
