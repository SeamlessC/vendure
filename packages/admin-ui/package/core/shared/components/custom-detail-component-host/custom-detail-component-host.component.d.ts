import { ComponentFactoryResolver, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomDetailComponentLocationId } from '../../../common/component-registry-types';
import { CustomDetailComponentService } from '../../../providers/custom-detail-component/custom-detail-component.service';
export declare class CustomDetailComponentHostComponent implements OnInit, OnDestroy {
    private viewContainerRef;
    private componentFactoryResolver;
    private customDetailComponentService;
    locationId: CustomDetailComponentLocationId;
    entity$: Observable<any>;
    detailForm: FormGroup;
    private componentRefs;
    constructor(viewContainerRef: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver, customDetailComponentService: CustomDetailComponentService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
