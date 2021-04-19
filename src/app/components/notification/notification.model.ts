
export class Notification {
    id: string;
    type: NotificationType;
    message: string;
    autoCloseAfter: number;
    keepAfterRouteChange: boolean;
    fade: boolean;

    constructor(init?: Partial<Notification>) {
        Object.assign(this, init);
    }
}

export enum NotificationType {
    Success,
    Error,
    Info,
    Warning
}