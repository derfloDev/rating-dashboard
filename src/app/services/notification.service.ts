import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Notification, NotificationType } from '../components/notification/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private defaultId = 'default-alert';
  notification = new Subject<Notification>();

  constructor() { }

  onAlert(id = this.defaultId): Observable<Notification> {
    return this.notification.asObservable().pipe(filter(x => x && x.id === id));
  }

  success(message: string, options?: any) {
    this.alert(new Notification({ ...options, type: NotificationType.Success, message }));
  }

  error(message: string, options?: any) {
    this.alert(new Notification({ ...options, type: NotificationType.Error, message }));
  }

  info(message: string, options?: any) {
    this.alert(new Notification({ ...options, type: NotificationType.Info, message }));
  }

  warn(message: string, options?: any) {
    this.alert(new Notification({ ...options, type: NotificationType.Warning, message }));
  }
  
  alert(alert: Notification) {
    alert.id = alert.id || this.defaultId;
    this.notification.next(alert);
  }

  clear(id = this.defaultId) {
    this.notification.next(new Notification({ id }));
  }
}
