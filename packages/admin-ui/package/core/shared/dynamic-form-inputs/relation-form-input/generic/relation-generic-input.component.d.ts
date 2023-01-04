import { TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RelationCustomFieldConfig } from '../../../../common/generated-types';
import { ModalService } from '../../../../providers/modal/modal.service';
export declare class RelationGenericInputComponent {
    private modalService;
    readonly: boolean;
    parentFormControl: FormControl;
    config: RelationCustomFieldConfig;
    relationId: string;
    template: TemplateRef<any>;
    constructor(modalService: ModalService);
    selectRelationId(): void;
    remove(): void;
}
