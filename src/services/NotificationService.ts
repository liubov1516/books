type Handler = (message: string) => void;

export class NotificationService {
  private handler?: Handler;

  subscribe(handler: Handler): void {
    this.handler = handler;
  }

  notify(message: string): void {
    this.handler?.(message);
  }
}
