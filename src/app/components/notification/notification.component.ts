import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Notification, NotificationType } from './notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Notification[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.alertSubscription = this.notificationService.onAlert(this.id)
      .subscribe(notification => {
        if (!notification.message) {
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        this.alerts.push(notification);

        if (notification.autoCloseAfter) {
          setTimeout(() => this.removeAlert(notification), notification.autoCloseAfter);
        }
      });

    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.notificationService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(notification: Notification) {
    if (!this.alerts.includes(notification)) return;

    if (this.fade) {
      this.alerts.find(x => x === notification).fade = true;

      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== notification);
      }, 250);
    } else {
      this.alerts = this.alerts.filter(x => x !== notification);
    }
  }

  cssClass(notification: Notification) {
    if (!notification) return '';

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [NotificationType.Success]: 'alert alert-success',
      [NotificationType.Error]: 'alert alert-danger',
      [NotificationType.Info]: 'alert alert-info',
      [NotificationType.Warning]: 'alert alert-warning'
    }

    classes.push(alertTypeClass[notification.type]);

    if (notification.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }

}
