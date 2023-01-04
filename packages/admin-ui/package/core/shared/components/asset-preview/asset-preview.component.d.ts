import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomFieldConfig, GetAsset, GetAssetList, UpdateAssetInput } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
import { ModalService } from '../../../providers/modal/modal.service';
import { NotificationService } from '../../../providers/notification/notification.service';
import { Point } from '../focal-point-control/focal-point-control.component';
export declare type PreviewPreset = 'tiny' | 'thumb' | 'small' | 'medium' | 'large' | '';
declare type AssetLike = GetAssetList.Items | GetAsset.Asset;
export declare class AssetPreviewComponent implements OnInit, OnDestroy {
    private formBuilder;
    private dataService;
    private notificationService;
    private changeDetector;
    private modalService;
    asset: AssetLike;
    editable: boolean;
    customFields: CustomFieldConfig[];
    customFieldsForm: FormGroup | undefined;
    assetChange: EventEmitter<Omit<UpdateAssetInput, "focalPoint">>;
    editClick: EventEmitter<any>;
    form: FormGroup;
    size: PreviewPreset;
    width: number;
    height: number;
    centered: boolean;
    settingFocalPoint: boolean;
    lastFocalPoint?: Point;
    private imageElementRef;
    private previewDivRef;
    private subscription;
    private sizePriorToSettingFocalPoint;
    constructor(formBuilder: FormBuilder, dataService: DataService, notificationService: NotificationService, changeDetector: ChangeDetectorRef, modalService: ModalService);
    get fpx(): number | null;
    get fpy(): number | null;
    ngOnInit(): void;
    ngOnDestroy(): void;
    getSourceFileName(): string;
    onImageLoad(): void;
    updateDimensions(): void;
    setFocalPointStart(): void;
    removeFocalPoint(): void;
    onFocalPointChange(point: Point): void;
    setFocalPointCancel(): void;
    setFocalPointEnd(): void;
    manageTags(): void;
}
export {};
