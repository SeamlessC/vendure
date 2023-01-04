import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, } from '@angular/core';
import { FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators, } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { getDefaultConfigArgValue } from '../../../common/utilities/configurable-operation-utils';
import { interpolateDescription } from '../../../common/utilities/interpolate-description';
/**
 * A form input which renders a card with the internal form fields of the given ConfigurableOperation.
 */
export class ConfigurableInputComponent {
    constructor() {
        this.readonly = false;
        this.removable = true;
        this.position = 0;
        this.remove = new EventEmitter();
        this.argValues = {};
        this.form = new FormGroup({});
        this.positionChangeSubject = new BehaviorSubject(0);
    }
    interpolateDescription() {
        if (this.operationDefinition) {
            return interpolateDescription(this.operationDefinition, this.form.value);
        }
        else {
            return '';
        }
    }
    ngOnInit() {
        this.positionChange$ = this.positionChangeSubject.asObservable();
    }
    ngOnChanges(changes) {
        if ('operation' in changes || 'operationDefinition' in changes) {
            this.createForm();
        }
        if ('position' in changes) {
            this.positionChangeSubject.next(this.position);
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.form.disable();
        }
        else {
            this.form.enable();
        }
    }
    writeValue(value) {
        if (value) {
            this.form.patchValue(value);
        }
    }
    trackByName(index, arg) {
        return arg.name;
    }
    getArgDef(arg) {
        var _a;
        return (_a = this.operationDefinition) === null || _a === void 0 ? void 0 : _a.args.find(a => a.name === arg.name);
    }
    createForm() {
        var _a, _b;
        if (!this.operation) {
            return;
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.form = new FormGroup({});
        this.form.__id = Math.random().toString(36).substr(10);
        if (this.operation.args) {
            for (const arg of ((_a = this.operationDefinition) === null || _a === void 0 ? void 0 : _a.args) || []) {
                let value = (_b = this.operation.args.find(a => a.name === arg.name)) === null || _b === void 0 ? void 0 : _b.value;
                if (value === undefined) {
                    value = getDefaultConfigArgValue(arg);
                }
                const validators = arg.list ? undefined : arg.required ? Validators.required : undefined;
                this.form.addControl(arg.name, new FormControl(value, validators));
            }
        }
        this.subscription = this.form.valueChanges.subscribe(value => {
            if (this.onChange) {
                this.onChange({
                    code: this.operation && this.operation.code,
                    args: value,
                });
            }
            if (this.onTouch) {
                this.onTouch();
            }
        });
    }
    validate(c) {
        if (this.form.invalid) {
            return {
                required: true,
            };
        }
        return null;
    }
}
ConfigurableInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-configurable-input',
                template: "<div class=\"card\" *ngIf=\"operation\">\n    <div class=\"card-block\">{{ interpolateDescription() }}</div>\n    <div class=\"card-block\" *ngIf=\"operation.args?.length\">\n        <form [formGroup]=\"form\" *ngIf=\"operation\" class=\"operation-inputs\">\n            <div *ngFor=\"let arg of operation.args; trackBy: trackByName\" class=\"arg-row\">\n                <ng-container *ngIf=\"form.get(arg.name) && getArgDef(arg) as argDef\">\n                    <label class=\"clr-control-label\">{{ argDef.label || (arg.name | sentenceCase) }}</label>\n                    <vdr-help-tooltip\n                        class=\"mr3\"\n                        *ngIf=\"argDef.description\"\n                        [content]=\"argDef.description\"\n                    ></vdr-help-tooltip>\n                    <vdr-dynamic-form-input\n                        [def]=\"getArgDef(arg)\"\n                        [readonly]=\"readonly\"\n                        [control]=\"form.get(arg.name)\"\n                        [formControlName]=\"arg.name\"\n                    ></vdr-dynamic-form-input>\n                </ng-container>\n            </div>\n        </form>\n    </div>\n    <div class=\"card-footer\" *ngIf=\"!readonly && removable\">\n        <button class=\"btn btn-sm btn-link btn-warning\" (click)=\"remove.emit(operation)\">\n            <clr-icon shape=\"times\"></clr-icon>\n            {{ 'common.remove' | translate }}\n        </button>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: ConfigurableInputComponent,
                        multi: true,
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef(() => ConfigurableInputComponent),
                        multi: true,
                    },
                ],
                styles: [":host{display:block;margin-bottom:12px}:host>.card{margin-top:6px}.operation-inputs{padding-top:0}.operation-inputs .arg-row:not(:last-child){margin-bottom:12px}.operation-inputs .arg-row{display:flex;flex-wrap:wrap;align-items:center}.operation-inputs .arg-row label{margin-right:6px}.operation-inputs .hidden{display:none}.operation-inputs label{min-width:130px;display:inline-block}\n"]
            },] }
];
ConfigurableInputComponent.propDecorators = {
    operation: [{ type: Input }],
    operationDefinition: [{ type: Input }],
    readonly: [{ type: Input }],
    removable: [{ type: Input }],
    position: [{ type: Input }],
    remove: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhYmxlLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvY29uZmlndXJhYmxlLWlucHV0L2NvbmZpZ3VyYWJsZS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBSUwsTUFBTSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxXQUFXLEVBQ1gsU0FBUyxFQUNULGFBQWEsRUFDYixpQkFBaUIsRUFHakIsVUFBVSxHQUNiLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEIsT0FBTyxFQUFFLGVBQWUsRUFBNEIsTUFBTSxNQUFNLENBQUM7QUFTakUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDbEcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFFM0Y7O0dBRUc7QUFtQkgsTUFBTSxPQUFPLDBCQUEwQjtJQWxCdkM7UUF1QmEsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDWixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQXlCLENBQUM7UUFDN0QsY0FBUyxHQUE0QixFQUFFLENBQUM7UUFHeEMsU0FBSSxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLDBCQUFxQixHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBc0duRSxDQUFDO0lBbkdHLHNCQUFzQjtRQUNsQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUMxQixPQUFPLHNCQUFzQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFB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LGFBQWE7d0JBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsMEJBQTBCLENBQUM7d0JBQ3pELEtBQUssRUFBRSxJQUFJO3FCQUNkO2lCQUNKOzthQUNKOzs7d0JBSUksS0FBSztrQ0FDTCxLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFic3RyYWN0Q29udHJvbCxcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBGb3JtQ29udHJvbCxcbiAgICBGb3JtR3JvdXAsXG4gICAgTkdfVkFMSURBVE9SUyxcbiAgICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICBWYWxpZGF0aW9uRXJyb3JzLFxuICAgIFZhbGlkYXRvcixcbiAgICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb25maWdBcmdUeXBlIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgYXNzZXJ0TmV2ZXIgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC11dGlscyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJbnB1dENvbXBvbmVudENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnQtcmVnaXN0cnktdHlwZXMnO1xuaW1wb3J0IHtcbiAgICBDb25maWdBcmcsXG4gICAgQ29uZmlnQXJnRGVmaW5pdGlvbixcbiAgICBDb25maWd1cmFibGVPcGVyYXRpb24sXG4gICAgQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29uZmlnQXJnVmFsdWUgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vdXRpbGl0aWVzL2NvbmZpZ3VyYWJsZS1vcGVyYXRpb24tdXRpbHMnO1xuaW1wb3J0IHsgaW50ZXJwb2xhdGVEZXNjcmlwdGlvbiB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi91dGlsaXRpZXMvaW50ZXJwb2xhdGUtZGVzY3JpcHRpb24nO1xuXG4vKipcbiAqIEEgZm9ybSBpbnB1dCB3aGljaCByZW5kZXJzIGEgY2FyZCB3aXRoIHRoZSBpbnRlcm5hbCBmb3JtIGZpZWxkcyBvZiB0aGUgZ2l2ZW4gQ29uZmlndXJhYmxlT3BlcmF0aW9uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jb25maWd1cmFibGUtaW5wdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb25maWd1cmFibGUtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NvbmZpZ3VyYWJsZS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBDb25maWd1cmFibGVJbnB1dENvbXBvbmVudCxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ29uZmlndXJhYmxlSW5wdXRDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhYmxlSW5wdXRDb21wb25lbnRcbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3JcbntcbiAgICBASW5wdXQoKSBvcGVyYXRpb24/OiBDb25maWd1cmFibGVPcGVyYXRpb247XG4gICAgQElucHV0KCkgb3BlcmF0aW9uRGVmaW5pdGlvbj86IENvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZmluaXRpb247XG4gICAgQElucHV0KCkgcmVhZG9ubHkgPSBmYWxzZTtcbiAgICBASW5wdXQoKSByZW1vdmFibGUgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHBvc2l0aW9uID0gMDtcbiAgICBAT3V0cHV0KCkgcmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxDb25maWd1cmFibGVPcGVyYXRpb24+KCk7XG4gICAgYXJnVmFsdWVzOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICAgIG9uQ2hhbmdlOiAodmFsOiBhbnkpID0+IHZvaWQ7XG4gICAgb25Ub3VjaDogKCkgPT4gdm9pZDtcbiAgICBmb3JtID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgcG9zaXRpb25DaGFuZ2UkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gICAgcHJpdmF0ZSBwb3NpdGlvbkNoYW5nZVN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGludGVycG9sYXRlRGVzY3JpcHRpb24oKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMub3BlcmF0aW9uRGVmaW5pdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGludGVycG9sYXRlRGVzY3JpcHRpb24odGhpcy5vcGVyYXRpb25EZWZpbml0aW9uLCB0aGlzLmZvcm0udmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2UkID0gdGhpcy5wb3NpdGlvbkNoYW5nZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoJ29wZXJhdGlvbicgaW4gY2hhbmdlcyB8fCAnb3BlcmF0aW9uRGVmaW5pdGlvbicgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVGb3JtKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCdwb3NpdGlvbicgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbkNoYW5nZVN1YmplY3QubmV4dCh0aGlzLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm0uZGlzYWJsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JtLmVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtLnBhdGNoVmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhY2tCeU5hbWUoaW5kZXg6IG51bWJlciwgYXJnOiBDb25maWdBcmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYXJnLm5hbWU7XG4gICAgfVxuXG4gICAgZ2V0QXJnRGVmKGFyZzogQ29uZmlnQXJnKTogQ29uZmlnQXJnRGVmaW5pdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbkRlZmluaXRpb24/LmFyZ3MuZmluZChhID0+IGEubmFtZSA9PT0gYXJnLm5hbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wZXJhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvcm0gPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICAgICAgKHRoaXMuZm9ybSBhcyBhbnkpLl9faWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMTApO1xuXG4gICAgICAgIGlmICh0aGlzLm9wZXJhdGlvbi5hcmdzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiB0aGlzLm9wZXJhdGlvbkRlZmluaXRpb24/LmFyZ3MgfHwgW10pIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IGFueSA9IHRoaXMub3BlcmF0aW9uLmFyZ3MuZmluZChhID0+IGEubmFtZSA9PT0gYXJnLm5hbWUpPy52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGdldERlZmF1bHRDb25maWdBcmdWYWx1ZShhcmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gYXJnLmxpc3QgPyB1bmRlZmluZWQgOiBhcmcucmVxdWlyZWQgPyBWYWxpZGF0b3JzLnJlcXVpcmVkIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKGFyZy5uYW1lLCBuZXcgRm9ybUNvbnRyb2wodmFsdWUsIHZhbGlkYXRvcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgY29kZTogdGhpcy5vcGVyYXRpb24gJiYgdGhpcy5vcGVyYXRpb24uY29kZSxcbiAgICAgICAgICAgICAgICAgICAgYXJnczogdmFsdWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5vblRvdWNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblRvdWNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICAgICAgaWYgKHRoaXMuZm9ybS5pbnZhbGlkKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iXX0=