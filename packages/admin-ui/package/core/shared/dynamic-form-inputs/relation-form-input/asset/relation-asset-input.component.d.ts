import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFormComponentId } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
import { FormInputComponent } from '../../../../common/component-registry-types';
import { GetAsset, RelationCustomFieldConfig } from '../../../../common/generated-types';
import { DataService } from '../../../../data/providers/data.service';
import { ModalService } from '../../../../providers/modal/modal.service';
export declare class RelationAssetInputComponent implements FormInputComponent, OnInit {
    private modalService;
    private dataService;
    static readonly id: DefaultFormComponentId;
    readonly: boolean;
    formControl: FormControl;
    config: RelationCustomFieldConfig;
    asset$: Observable<GetAsset.Asset | undefined>;
    constructor(modalService: ModalService, dataService: DataService);
    ngOnInit(): void;
    selectAsset(): void;
    remove(): void;
    previewAsset(asset: GetAsset.Asset): void;
}
