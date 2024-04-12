import { ToastConfig } from "../Toast";

export function applyContent(toast: HTMLDivElement, options: ToastConfig) {
  if (typeof options.content === "string") {
    toast.textContent = options.content;
  } else {
    toast.appendChild(options.content);
  }
}
