import { Injectable } from '@angular/core';
import { NotifierService, NotifierOptions } from 'angular-notifier';

type NOTIFIER_TYPE = 'default' | 'info' | 'success' | 'warning' | 'error';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private readonly notifier: NotifierService) {}

  public default(message: string): void {
    this.notify('default', message);
  }

  public success(message: string): void {
    this.notify('success', message);
  }

  public info(message: string): void {
    this.notify('info', message);
  }

  public warning(message: string): void {
    this.notify('warning', message);
  }

  public error(message: string): void {
    this.notify('error', message);
  }

  private notify(type: NOTIFIER_TYPE, message: string): void {
    this.notifier.show({ type, message });
  }

  public hideAll(): void {
    this.notifier.hideAll();
  }
}

export const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};
