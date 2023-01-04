import { ComponentFactoryResolver } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { OverlayHostService } from '../overlay-host/overlay-host.service';
/**
 * @description
 * The types of notification available.
 *
 * @docsCategory providers
 * @docsPage NotificationService
 */
export declare type NotificationType = 'info' | 'success' | 'error' | 'warning';
/**
 * @description
 * Configuration for a toast notification.
 *
 * @docsCategory providers
 * @docsPage NotificationService
 */
export interface ToastConfig {
    message: string;
    translationVars?: {
        [key: string]: string | number;
    };
    type?: NotificationType;
    duration?: number;
}
/**
 * @description
 * Provides toast notification functionality.
 *
 * @example
 * ```TypeScript
 * class MyComponent {
 *   constructor(private notificationService: NotificationService) {}
 *
 *   save() {
 *     this.notificationService
 *         .success(_('asset.notify-create-assets-success'), {
 *           count: successCount,
 *         });
 *   }
 * }
 *
 * @docsCategory providers
 * @docsPage NotificationService
 * @docsWeight 0
 */
export declare class NotificationService {
    private i18nService;
    private resolver;
    private overlayHostService;
    private get hostView();
    private openToastRefs;
    constructor(i18nService: I18nService, resolver: ComponentFactoryResolver, overlayHostService: OverlayHostService);
    /**
     * @description
     * Display a success toast notification
     */
    success(message: string, translationVars?: {
        [key: string]: string | number;
    }): void;
    /**
     * @description
     * Display an info toast notification
     */
    info(message: string, translationVars?: {
        [key: string]: string | number;
    }): void;
    /**
     * @description
     * Display a warning toast notification
     */
    warning(message: string, translationVars?: {
        [key: string]: string | number;
    }): void;
    /**
     * @description
     * Display an error toast notification
     */
    error(message: string, translationVars?: {
        [key: string]: string | number;
    }): void;
    /**
     * @description
     * Display a toast notification.
     */
    notify(config: ToastConfig): void;
    /**
     * Load a ToastComponent into the DOM host location.
     */
    private createToast;
    /**
     * Returns a function which will destroy the toast component and
     * remove it from the openToastRefs array.
     */
    private createDismissFunction;
    /**
     * Calculate and set the top offsets for each of the open toasts.
     */
    private calculatePositions;
    private translateTranslationVars;
}
