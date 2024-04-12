import { toast } from "./toast/Toast"

export function SuccessButton(element: HTMLButtonElement) {
  element.innerHTML = `Success`
  const send = () => {
    toast({
      content: 'Action performed successfully!',
      close: {
        clickToClose: false,
        delay: 0
      },
    })
  }

  element.addEventListener('click', () => send())
}
