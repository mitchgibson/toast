import { ToastConfig } from "../Toast";

export function applyAnimation(element: HTMLElement, options: ToastConfig, reverse: boolean = false) {
    if (options.animate?.disabled) return null;
    if (options.animate?.keyframes) {
      const kf = options.animate.keyframes;
      return element.animate(kf.frames, kf.options);
    } else {
      const keyframes = reverse ? [{ transform: "translateX(0)" }, { transform: "translateX(100%)" }] : [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }];
      const kfOptions: KeyframeAnimationOptions = {
        duration: reverse ? 1000 : 650,
        easing: "ease-in-out",
      };
  
      return element.animate(keyframes, kfOptions);
    }
  }
  