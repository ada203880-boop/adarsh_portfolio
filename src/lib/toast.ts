export type ToastType = 'success' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  emoji?: string;
}

type ToastHandler = ((toast: ToastMessage) => void) | null;

let handler: ToastHandler = null;
const queue: ToastMessage[] = [];

export function registerToastHandler(fn: ToastHandler) {
  handler = fn;
  if (handler) {
    while (queue.length > 0) {
      const item = queue.shift();
      if (item) handler(item);
    }
  }
}

export function toast(message: string, type: ToastType = 'info', emoji?: string) {
  const newToast: ToastMessage = {
    id: Math.random().toString(36).substring(2, 9),
    message,
    type,
    emoji,
  };
  if (handler) {
    handler(newToast);
  } else {
    queue.push(newToast);
  }
}

