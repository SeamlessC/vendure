import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ModalDialogComponent } from '../../shared/components/modal-dialog/modal-dialog.component';
import { SimpleDialogComponent } from '../../shared/components/simple-dialog/simple-dialog.component';
import { OverlayHostService } from '../overlay-host/overlay-host.service';
import * as i0 from "@angular/core";
import * as i1 from "../overlay-host/overlay-host.service";
/**
 * @description
 * This service is responsible for instantiating a ModalDialog component and
 * embedding the specified component within.
 *
 * @docsCategory providers
 * @docsPage ModalService
 * @docsWeight 0
 */
export class ModalService {
    constructor(componentFactoryResolver, overlayHostService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.overlayHostService = overlayHostService;
    }
    /**
     * @description
     * Create a modal from a component. The component must implement the {@link Dialog} interface.
     * Additionally, the component should include templates for the title and the buttons to be
     * displayed in the modal dialog. See example:
     *
     * @example
     * ```HTML
     * class MyDialog implements Dialog {
     *  resolveWith: (result?: any) => void;
     *
     *  okay() {
     *    doSomeWork().subscribe(result => {
     *      this.resolveWith(result);
     *    })
     *  }
     *
     *  cancel() {
     *    this.resolveWith(false);
     *  }
     * }
     * ```
     *
     * @example
     * ```HTML
     * <ng-template vdrDialogTitle>Title of the modal</ng-template>
     *
     * <p>
     *   My Content
     * </p>
     *
     * <ng-template vdrDialogButtons>
     *   <button type="button"
     *           class="btn"
     *           (click)="cancel()">Cancel</button>
     *   <button type="button"
     *           class="btn btn-primary"
     *           (click)="okay()">Okay</button>
     * </ng-template>
     * ```
     */
    fromComponent(component, options) {
        const modalFactory = this.componentFactoryResolver.resolveComponentFactory(ModalDialogComponent);
        return from(this.overlayHostService.getHostView()).pipe(mergeMap(hostView => {
            const modalComponentRef = hostView.createComponent(modalFactory);
            const modalInstance = modalComponentRef.instance;
            modalInstance.childComponentType = component;
            modalInstance.options = options;
            return new Observable(subscriber => {
                modalInstance.closeModal = (result) => {
                    modalComponentRef.destroy();
                    subscriber.next(result);
                    subscriber.complete();
                };
            });
        }));
    }
    /**
     * @description
     * Displays a modal dialog with the provided title, body and buttons.
     */
    dialog(config) {
        return this.fromComponent(SimpleDialogComponent, {
            locals: config,
            size: config.size,
        });
    }
}
ModalService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ModalService_Factory() { return new ModalService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i1.OverlayHostService)); }, token: ModalService, providedIn: "root" });
ModalService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ModalService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: OverlayHostService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvcHJvdmlkZXJzL21vZGFsL21vZGFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDbkcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDdEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7OztBQXlFMUU7Ozs7Ozs7O0dBUUc7QUFJSCxNQUFNLE9BQU8sWUFBWTtJQUNyQixZQUNZLHdCQUFrRCxFQUNsRCxrQkFBc0M7UUFEdEMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQy9DLENBQUM7SUFFSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdDRztJQUNILGFBQWEsQ0FDVCxTQUFvQyxFQUNwQyxPQUF5QjtRQUV6QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUVqRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ25ELFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNoQixNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDakUsTUFBTSxhQUFhLEdBQThCLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztZQUM1RSxhQUFhLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO1lBQzdDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBRWhDLE9BQU8sSUFBSSxVQUFVLENBQUksVUFBVSxDQUFDLEVBQUU7Z0JBQ2xDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxNQUFTLEVBQUUsRUFBRTtvQkFDckMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzVCLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBSSxNQUF1QjtRQUM3QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUU7WUFDN0MsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7U0FDcEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7OztZQW5GSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7OztZQTNGUSx3QkFBd0I7WUFPeEIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgZnJvbSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1vZGFsRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvbW9kYWwtZGlhbG9nL21vZGFsLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2ltcGxlRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2ltcGxlLWRpYWxvZy9zaW1wbGUtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPdmVybGF5SG9zdFNlcnZpY2UgfSBmcm9tICcuLi9vdmVybGF5LWhvc3Qvb3ZlcmxheS1ob3N0LnNlcnZpY2UnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQW55IGNvbXBvbmVudCBpbnRlbmRlZCB0byBiZSB1c2VkIHdpdGggdGhlIE1vZGFsU2VydmljZS5mcm9tQ29tcG9uZW50KCkgbWV0aG9kIG11c3QgaW1wbGVtZW50XG4gKiB0aGlzIGludGVyZmFjZS5cbiAqXG4gKiBAZG9jc0NhdGVnb3J5IHByb3ZpZGVyc1xuICogQGRvY3NQYWdlIE1vZGFsU2VydmljZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIERpYWxvZzxSID0gYW55PiB7XG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogRnVuY3Rpb24gdG8gYmUgaW52b2tlZCBpbiBvcmRlciB0byBjbG9zZSB0aGUgZGlhbG9nIHdoZW4gdGhlIGFjdGlvbiBpcyBjb21wbGV0ZS5cbiAgICAgKiBUaGUgT2JzZXJ2YWJsZSByZXR1cm5lZCBmcm9tIHRoZSAuZnJvbUNvbXBvbmVudCgpIG1ldGhvZCB3aWxsIGVtaXQgdGhlIHZhbHVlIHBhc3NlZFxuICAgICAqIHRvIHRoaXMgbWV0aG9kIGFuZCB0aGVuIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIHJlc29sdmVXaXRoOiAocmVzdWx0PzogUikgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaWFsb2dCdXR0b25Db25maWc8VD4ge1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgdHlwZTogJ3NlY29uZGFyeScgfCAncHJpbWFyeScgfCAnZGFuZ2VyJztcbiAgICB0cmFuc2xhdGlvblZhcnM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBudW1iZXI+O1xuICAgIHJldHVyblZhbHVlPzogVDtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbmZpZ3VyZXMgYSBnZW5lcmljIG1vZGFsIGRpYWxvZy5cbiAqXG4gKiBAZG9jc0NhdGVnb3J5IHByb3ZpZGVyc1xuICogQGRvY3NQYWdlIE1vZGFsU2VydmljZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIERpYWxvZ0NvbmZpZzxUPiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBib2R5Pzogc3RyaW5nO1xuICAgIHRyYW5zbGF0aW9uVmFycz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIH07XG4gICAgYnV0dG9uczogQXJyYXk8RGlhbG9nQnV0dG9uQ29uZmlnPFQ+PjtcbiAgICBzaXplPzogJ3NtJyB8ICdtZCcgfCAnbGcnIHwgJ3hsJztcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIE9wdGlvbnMgdG8gY29uZmlndXJlIHRoZSBiZWhhdmlvdXIgb2YgdGhlIG1vZGFsLlxuICpcbiAqIEBkb2NzQ2F0ZWdvcnkgcHJvdmlkZXJzXG4gKiBAZG9jc1BhZ2UgTW9kYWxTZXJ2aWNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxPcHRpb25zPFQ+IHtcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBTZXRzIHRoZSB3aWR0aCBvZiB0aGUgZGlhbG9nXG4gICAgICovXG4gICAgc2l6ZT86ICdzbScgfCAnbWQnIHwgJ2xnJyB8ICd4bCc7XG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogU2V0cyB0aGUgdmVydGljYWwgYWxpZ25tZW50IG9mIHRoZSBkaWFsb2dcbiAgICAgKi9cbiAgICB2ZXJ0aWNhbEFsaWduPzogJ3RvcCcgfCAnY2VudGVyJyB8ICdib3R0b20nO1xuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIFdoZW4gdHJ1ZSwgdGhlIFwieFwiIGljb24gaXMgc2hvd25cbiAgICAgKiBhbmQgY2xpY2tpbmcgaXQgb3IgdGhlIG1hc2sgd2lsbCBjbG9zZSB0aGUgZGlhbG9nXG4gICAgICovXG4gICAgY2xvc2FibGU/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIFZhbHVlcyB0byBiZSBwYXNzZWQgZGlyZWN0bHkgdG8gdGhlIGNvbXBvbmVudCBiZWluZyBpbnN0YW50aWF0ZWQgaW5zaWRlIHRoZSBkaWFsb2cuXG4gICAgICovXG4gICAgbG9jYWxzPzogUGFydGlhbDxUPjtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgc2VydmljZSBpcyByZXNwb25zaWJsZSBmb3IgaW5zdGFudGlhdGluZyBhIE1vZGFsRGlhbG9nIGNvbXBvbmVudCBhbmRcbiAqIGVtYmVkZGluZyB0aGUgc3BlY2lmaWVkIGNvbXBvbmVudCB3aXRoaW4uXG4gKlxuICogQGRvY3NDYXRlZ29yeSBwcm92aWRlcnNcbiAqIEBkb2NzUGFnZSBNb2RhbFNlcnZpY2VcbiAqIEBkb2NzV2VpZ2h0IDBcbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5SG9zdFNlcnZpY2U6IE92ZXJsYXlIb3N0U2VydmljZSxcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBDcmVhdGUgYSBtb2RhbCBmcm9tIGEgY29tcG9uZW50LiBUaGUgY29tcG9uZW50IG11c3QgaW1wbGVtZW50IHRoZSB7QGxpbmsgRGlhbG9nfSBpbnRlcmZhY2UuXG4gICAgICogQWRkaXRpb25hbGx5LCB0aGUgY29tcG9uZW50IHNob3VsZCBpbmNsdWRlIHRlbXBsYXRlcyBmb3IgdGhlIHRpdGxlIGFuZCB0aGUgYnV0dG9ucyB0byBiZVxuICAgICAqIGRpc3BsYXllZCBpbiB0aGUgbW9kYWwgZGlhbG9nLiBTZWUgZXhhbXBsZTpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgSFRNTFxuICAgICAqIGNsYXNzIE15RGlhbG9nIGltcGxlbWVudHMgRGlhbG9nIHtcbiAgICAgKiAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBhbnkpID0+IHZvaWQ7XG4gICAgICpcbiAgICAgKiAgb2theSgpIHtcbiAgICAgKiAgICBkb1NvbWVXb3JrKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICogICAgICB0aGlzLnJlc29sdmVXaXRoKHJlc3VsdCk7XG4gICAgICogICAgfSlcbiAgICAgKiAgfVxuICAgICAqXG4gICAgICogIGNhbmNlbCgpIHtcbiAgICAgKiAgICB0aGlzLnJlc29sdmVXaXRoKGZhbHNlKTtcbiAgICAgKiAgfVxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgSFRNTFxuICAgICAqIDxuZy10ZW1wbGF0ZSB2ZHJEaWFsb2dUaXRsZT5UaXRsZSBvZiB0aGUgbW9kYWw8L25nLXRlbXBsYXRlPlxuICAgICAqXG4gICAgICogPHA+XG4gICAgICogICBNeSBDb250ZW50XG4gICAgICogPC9wPlxuICAgICAqXG4gICAgICogPG5nLXRlbXBsYXRlIHZkckRpYWxvZ0J1dHRvbnM+XG4gICAgICogICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAqICAgICAgICAgICBjbGFzcz1cImJ0blwiXG4gICAgICogICAgICAgICAgIChjbGljayk9XCJjYW5jZWwoKVwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAqICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgKiAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIlxuICAgICAqICAgICAgICAgICAoY2xpY2spPVwib2theSgpXCI+T2theTwvYnV0dG9uPlxuICAgICAqIDwvbmctdGVtcGxhdGU+XG4gICAgICogYGBgXG4gICAgICovXG4gICAgZnJvbUNvbXBvbmVudDxUIGV4dGVuZHMgRGlhbG9nPGFueT4sIFI+KFxuICAgICAgICBjb21wb25lbnQ6IFR5cGU8VD4gJiBUeXBlPERpYWxvZzxSPj4sXG4gICAgICAgIG9wdGlvbnM/OiBNb2RhbE9wdGlvbnM8VD4sXG4gICAgKTogT2JzZXJ2YWJsZTxSIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIGNvbnN0IG1vZGFsRmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE1vZGFsRGlhbG9nQ29tcG9uZW50KTtcblxuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLm92ZXJsYXlIb3N0U2VydmljZS5nZXRIb3N0VmlldygpKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoaG9zdFZpZXcgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGFsQ29tcG9uZW50UmVmID0gaG9zdFZpZXcuY3JlYXRlQ29tcG9uZW50KG1vZGFsRmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWxJbnN0YW5jZTogTW9kYWxEaWFsb2dDb21wb25lbnQ8YW55PiA9IG1vZGFsQ29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgICAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UuY2hpbGRDb21wb25lbnRUeXBlID0gY29tcG9uZW50O1xuICAgICAgICAgICAgICAgIG1vZGFsSW5zdGFuY2Uub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Uj4oc3Vic2NyaWJlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UuY2xvc2VNb2RhbCA9IChyZXN1bHQ6IFIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsQ29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogRGlzcGxheXMgYSBtb2RhbCBkaWFsb2cgd2l0aCB0aGUgcHJvdmlkZWQgdGl0bGUsIGJvZHkgYW5kIGJ1dHRvbnMuXG4gICAgICovXG4gICAgZGlhbG9nPFQ+KGNvbmZpZzogRGlhbG9nQ29uZmlnPFQ+KTogT2JzZXJ2YWJsZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyb21Db21wb25lbnQoU2ltcGxlRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICBsb2NhbHM6IGNvbmZpZyxcbiAgICAgICAgICAgIHNpemU6IGNvbmZpZy5zaXplLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=