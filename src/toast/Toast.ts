import { applyAnimation } from "./animate/ApplyAnimation";
import { applyContent } from "./content/ApplyContent";
import { applyStyle } from "./style/ApplyStyle";

export type ToastKeyframe = {
  frames: Keyframe[];
  options: KeyframeAnimationOptions;
};
export type ToastOptions = {
  content: string | HTMLElement;
  close?: {
    clickToClose?: boolean;
    delay?: number;
  };
  animate?: {
    disabled?: boolean;
    keyframes: ToastKeyframe;
  };
  style?: Record<string, string>;
};

export type ToastConfig = {} & ToastOptions;

const global = globalThis as any;
global.toasts = global.toasts || [];

export function toast(options: ToastOptions) {
  let container = document.getElementById("toast-main-container");
  if (!container) {
    container = buildContainer(options);
    document.body.appendChild(container);
  }
  const toast = buildToast(buildConfig(options));
  const toastContainer = buildToastContainer(toast, options);
  toastContainer.appendChild(toast);

  global.toasts.push(toastContainer);
  container.appendChild(toastContainer);
  applyAnimation(toastContainer, options);
  container.insertBefore(toastContainer, container.firstChild);
  closeToast(toastContainer, options);
}

function buildConfig(options: ToastOptions): ToastConfig {
  return options;
}

function buildContainer(options: ToastOptions) {
  const container = document.createElement("div");
  container.id = "toast-main-container";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.right = "0";
  container.style.width = "300px"
  return container;
}

function buildToastContainer(toast: HTMLDivElement, options: ToastOptions) {
  const container = document.createElement("div");

  const styles: Record<string, string> = {
    position: "relative",
    top: "0",
    right: "0",
    padding: "1rem",
    margin: "1rem",
    background: "black",
    color: "white",
    borderRadius: "0.5rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    zIndex: "9999",
    cursor: options.close?.clickToClose === false ? "not-allowed" : "pointer",
    ...(options.style || {}),
  };
  Object.keys(styles).forEach((key: string) => {
    toast.style[key as any] = styles[key];
  });

  return container;
}

function buildToast(options: ToastConfig): HTMLDivElement {
  const toast = document.createElement("div");
  applyStyle(toast, options);
  applyContent(toast, options);
  return toast;
}

function closeToast(toast: HTMLDivElement, options: ToastOptions) {
  const close = () => {
    const animation = applyAnimation(toast, options, true);
    if (animation) {
      animation.onfinish = () => {
        document.body.removeChild(toast);
      };
    }
  };

  if (options.close?.clickToClose !== false) {
    toast.addEventListener("click", close);
  }

  const disableDelayedClose = options.close?.delay === 0;
  if (disableDelayedClose) {
    return;
  }
  setTimeout(() => {
    close();
  }, options.close?.delay || 5000);
}
