import { Component, ComponentFactoryResolver, EventEmitter, Input, Output, ViewContainerRef, } from '@angular/core';
/**
 * A helper component used to embed a component instance into the {@link ModalDialogComponent}
 */
export class DialogComponentOutletComponent {
    constructor(viewContainerRef, componentFactoryResolver) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.create = new EventEmitter();
    }
    ngOnInit() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
        const componentRef = this.viewContainerRef.createComponent(factory);
        this.create.emit(componentRef.instance);
    }
}
DialogComponentOutletComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dialog-component-outlet',
                template: ``
            },] }
];
DialogComponentOutletComponent.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver }
];
DialogComponentOutletComponent.propDecorators = {
    component: [{ type: Input }],
    create: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbXBvbmVudC1vdXRsZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9tb2RhbC1kaWFsb2cvZGlhbG9nLWNvbXBvbmVudC1vdXRsZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUVOLGdCQUFnQixHQUNuQixNQUFNLGVBQWUsQ0FBQztBQUV2Qjs7R0FFRztBQUtILE1BQU0sT0FBTyw4QkFBOEI7SUFJdkMsWUFDWSxnQkFBa0MsRUFDbEMsd0JBQWtEO1FBRGxELHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUpwRCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUt4QyxDQUFDO0lBRUosUUFBUTtRQUNKLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEYsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7O1lBakJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxRQUFRLEVBQUUsRUFBRTthQUNmOzs7WUFURyxnQkFBZ0I7WUFOaEIsd0JBQXdCOzs7d0JBaUJ2QixLQUFLO3FCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgVHlwZSxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIGhlbHBlciBjb21wb25lbnQgdXNlZCB0byBlbWJlZCBhIGNvbXBvbmVudCBpbnN0YW5jZSBpbnRvIHRoZSB7QGxpbmsgTW9kYWxEaWFsb2dDb21wb25lbnR9XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWRpYWxvZy1jb21wb25lbnQtb3V0bGV0JyxcbiAgICB0ZW1wbGF0ZTogYGAsXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbXBvbmVudE91dGxldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgY29tcG9uZW50OiBUeXBlPGFueT47XG4gICAgQE91dHB1dCgpIGNyZWF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuY29tcG9uZW50KTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgdGhpcy5jcmVhdGUuZW1pdChjb21wb25lbnRSZWYuaW5zdGFuY2UpO1xuICAgIH1cbn1cbiJdfQ==