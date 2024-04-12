import { ToastConfig } from "../Toast";

export function applyStyle(toast: HTMLDivElement, options: ToastConfig) {
  const styles: Record<string, string> = {
    position: "absolute",
    top: "0",
    right: "0",
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
}
