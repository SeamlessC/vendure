import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewChildren, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { unique } from '@vendure/common/lib/unique';
export const OPTION_VALUE_INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OptionValueInputComponent),
    multi: true,
};
export class OptionValueInputComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.groupName = '';
        this.add = new EventEmitter();
        this.remove = new EventEmitter();
        this.edit = new EventEmitter();
        this.disabled = false;
        this.input = '';
        this.isFocussed = false;
        this.lastSelected = false;
        this.editingIndex = -1;
    }
    get optionValues() {
        var _a, _b;
        return (_b = (_a = this.formValue) !== null && _a !== void 0 ? _a : this.options) !== null && _b !== void 0 ? _b : [];
    }
    registerOnChange(fn) {
        this.onChangeFn = fn;
    }
    registerOnTouched(fn) {
        this.onTouchFn = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.changeDetector.markForCheck();
    }
    writeValue(obj) {
        this.formValue = obj || [];
    }
    focus() {
        this.textArea.nativeElement.focus();
    }
    editName(index, event) {
        var _a;
        const optionValue = this.optionValues[index];
        if (!optionValue.locked && !optionValue.id) {
            event.cancelBubble = true;
            this.editingIndex = index;
            const input = (_a = this.nameInputs.get(index)) === null || _a === void 0 ? void 0 : _a.nativeElement;
            setTimeout(() => input === null || input === void 0 ? void 0 : input.focus());
        }
    }
    updateOption(index, event) {
        const optionValue = this.optionValues[index];
        const newName = event.target.value;
        if (optionValue) {
            if (newName) {
                optionValue.name = newName;
                this.edit.emit({ index, option: optionValue });
            }
            this.editingIndex = -1;
        }
    }
    removeOption(option) {
        var _a;
        if (!option.locked) {
            if (this.formValue) {
                this.formValue = (_a = this.formValue) === null || _a === void 0 ? void 0 : _a.filter(o => o.name !== option.name);
                this.onChangeFn(this.formValue);
            }
            else {
                this.remove.emit(option);
            }
        }
    }
    handleKey(event) {
        switch (event.key) {
            case ',':
            case 'Enter':
                this.addOptionValue();
                event.preventDefault();
                break;
            case 'Backspace':
                if (this.lastSelected) {
                    this.removeLastOption();
                    this.lastSelected = false;
                }
                else if (this.input === '') {
                    this.lastSelected = true;
                }
                break;
            default:
                this.lastSelected = false;
        }
    }
    handleBlur() {
        this.isFocussed = false;
        this.addOptionValue();
    }
    addOptionValue() {
        const options = this.parseInputIntoOptions(this.input).filter(option => {
            var _a;
            // do not add an option with the same name
            // as an existing option
            const existing = (_a = this.options) !== null && _a !== void 0 ? _a : this.formValue;
            return !(existing === null || existing === void 0 ? void 0 : existing.find(o => (o === null || o === void 0 ? void 0 : o.name) === option.name));
        });
        if (!this.formValue && this.options) {
            for (const option of options) {
                this.add.emit(option);
            }
        }
        else {
            this.formValue = unique([...this.formValue, ...options]);
            this.onChangeFn(this.formValue);
        }
        this.input = '';
    }
    parseInputIntoOptions(input) {
        return input
            .split(/[,\n]/)
            .map(s => s.trim())
            .filter(s => s !== '')
            .map(s => ({ name: s, locked: false }));
    }
    removeLastOption() {
        if (this.optionValues.length) {
            const option = this.optionValues[this.optionValues.length - 1];
            this.removeOption(option);
        }
    }
}
OptionValueInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-option-value-input',
                template: "<div class=\"input-wrapper\" [class.focus]=\"isFocussed\" (click)=\"textArea.focus()\">\n    <div class=\"chips\" *ngIf=\"0 < optionValues.length\">\n        <vdr-chip\n            *ngFor=\"let option of optionValues; last as isLast; index as i\"\n            [icon]=\"option.locked ? 'lock' : 'times'\"\n            [class.selected]=\"isLast && lastSelected\"\n            [class.locked]=\"option.locked\"\n            [colorFrom]=\"groupName\"\n            (iconClick)=\"removeOption(option)\"\n        >\n            <span [hidden]=\"editingIndex !== i\">\n                <input\n                    #editNameInput\n                    type=\"text\"\n                    [ngModel]=\"option.name\"\n                    (blur)=\"updateOption(i, $event)\"\n                    (click)=\"$event.cancelBubble = true\"\n                />\n            </span>\n            <span\n                class=\"option-name\"\n                [class.editable]=\"!option.locked && !option.id\"\n                (click)=\"editName(i, $event)\" [hidden]=\"editingIndex === i\">{{ option.name }}</span>\n        </vdr-chip>\n    </div>\n    <textarea\n        #textArea\n        (keyup)=\"handleKey($event)\"\n        (focus)=\"isFocussed = true\"\n        (blur)=\"handleBlur()\"\n        [(ngModel)]=\"input\"\n        [disabled]=\"disabled\"\n    ></textarea>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.Default,
                providers: [OPTION_VALUE_INPUT_VALUE_ACCESSOR],
                styles: [".input-wrapper{background-color:#fff;border-radius:3px!important;border:1px solid var(--color-grey-300)!important;cursor:text}.input-wrapper.focus{border-color:var(--color-primary-500)!important;box-shadow:0 0 1px 1px var(--color-primary-100)}.input-wrapper .chips{padding:5px}.input-wrapper textarea{border:none;width:100%;height:24px;margin-top:3px;padding:0 6px}.input-wrapper textarea:focus{outline:none}.input-wrapper textarea:disabled{background-color:var(--color-component-bg-100)}vdr-chip ::ng-deep .wrapper{margin:0 3px}vdr-chip.locked{opacity:.8}vdr-chip.selected ::ng-deep .wrapper{border-color:var(--color-warning-500)!important;box-shadow:0 0 1px 1px var(--color-warning-400);opacity:.6}vdr-chip .option-name.editable:hover{outline:1px solid var(--color-component-bg-300);outline-offset:1px;border-radius:1px}vdr-chip input{padding:0!important;margin-top:-2px;margin-bottom:-2px}\n"]
            },] }
];
OptionValueInputComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
OptionValueInputComponent.propDecorators = {
    groupName: [{ type: Input }],
    textArea: [{ type: ViewChild, args: ['textArea', { static: true },] }],
    nameInputs: [{ type: ViewChildren, args: ['editNameInput', { read: ElementRef },] }],
    options: [{ type: Input }],
    add: [{ type: Output }],
    remove: [{ type: Output }],
    edit: [{ type: Output }],
    disabled: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLXZhbHVlLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9vcHRpb24tdmFsdWUtaW5wdXQvb3B0aW9uLXZhbHVlLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFJTixTQUFTLEVBQ1QsWUFBWSxHQUNmLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFcEQsTUFBTSxDQUFDLE1BQU0saUNBQWlDLEdBQWE7SUFDdkQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHlCQUF5QixDQUFDO0lBQ3hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQWVGLE1BQU0sT0FBTyx5QkFBeUI7SUFxQmxDLFlBQW9CLGNBQWlDO1FBQWpDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQXBCNUMsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUlkLFFBQUcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ2pDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ3BDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBcUMsQ0FBQztRQUM5RCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGlCQUFZLEdBQUcsQ0FBQyxD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QUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO3NCQUNsRCxLQUFLO2tCQUNMLE1BQU07cUJBQ04sTUFBTTttQkFDTixNQUFNO3VCQUNOLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFByb3ZpZGVyLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgdW5pcXVlIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi91bmlxdWUnO1xuXG5leHBvcnQgY29uc3QgT1BUSU9OX1ZBTFVFX0lOUFVUX1ZBTFVFX0FDQ0VTU09SOiBQcm92aWRlciA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPcHRpb25WYWx1ZUlucHV0Q29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZSxcbn07XG5cbmludGVyZmFjZSBPcHRpb24ge1xuICAgIGlkPzogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBsb2NrZWQ6IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW9wdGlvbi12YWx1ZS1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL29wdGlvbi12YWx1ZS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3B0aW9uLXZhbHVlLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICAgIHByb3ZpZGVyczogW09QVElPTl9WQUxVRV9JTlBVVF9WQUxVRV9BQ0NFU1NPUl0sXG59KVxuZXhwb3J0IGNsYXNzIE9wdGlvblZhbHVlSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQElucHV0KCkgZ3JvdXBOYW1lID0gJyc7XG4gICAgQFZpZXdDaGlsZCgndGV4dEFyZWEnLCB7IHN0YXRpYzogdHJ1ZSB9KSB0ZXh0QXJlYTogRWxlbWVudFJlZjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgICBAVmlld0NoaWxkcmVuKCdlZGl0TmFtZUlucHV0JywgeyByZWFkOiBFbGVtZW50UmVmIH0pIG5hbWVJbnB1dHM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgICBASW5wdXQoKSBvcHRpb25zOiBPcHRpb25bXTtcbiAgICBAT3V0cHV0KCkgYWRkID0gbmV3IEV2ZW50RW1pdHRlcjxPcHRpb24+KCk7XG4gICAgQE91dHB1dCgpIHJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8T3B0aW9uPigpO1xuICAgIEBPdXRwdXQoKSBlZGl0ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGluZGV4OiBudW1iZXI7IG9wdGlvbjogT3B0aW9uIH0+KCk7XG4gICAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBpbnB1dCA9ICcnO1xuICAgIGlzRm9jdXNzZWQgPSBmYWxzZTtcbiAgICBsYXN0U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICBmb3JtVmFsdWU6IE9wdGlvbltdO1xuICAgIGVkaXRpbmdJbmRleCA9IC0xO1xuICAgIG9uQ2hhbmdlRm46ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xuICAgIG9uVG91Y2hGbjogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG5cbiAgICBnZXQgb3B0aW9uVmFsdWVzKCk6IE9wdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybVZhbHVlID8/IHRoaXMub3B0aW9ucyA/PyBbXTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlRm4gPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaEZuID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtVmFsdWUgPSBvYmogfHwgW107XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIHRoaXMudGV4dEFyZWEubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGVkaXROYW1lKGluZGV4OiBudW1iZXIsIGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gdGhpcy5vcHRpb25WYWx1ZXNbaW5kZXhdO1xuICAgICAgICBpZiAoIW9wdGlvblZhbHVlLmxvY2tlZCAmJiAhb3B0aW9uVmFsdWUuaWQpIHtcbiAgICAgICAgICAgIGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmVkaXRpbmdJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLm5hbWVJbnB1dHMuZ2V0KGluZGV4KT8ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaW5wdXQ/LmZvY3VzKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlT3B0aW9uKGluZGV4OiBudW1iZXIsIGV2ZW50OiBJbnB1dEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gdGhpcy5vcHRpb25WYWx1ZXNbaW5kZXhdO1xuICAgICAgICBjb25zdCBuZXdOYW1lID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgaWYgKG9wdGlvblZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3TmFtZSkge1xuICAgICAgICAgICAgICAgIG9wdGlvblZhbHVlLm5hbWUgPSBuZXdOYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdC5lbWl0KHsgaW5kZXgsIG9wdGlvbjogb3B0aW9uVmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVkaXRpbmdJbmRleCA9IC0xO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlT3B0aW9uKG9wdGlvbjogT3B0aW9uKSB7XG4gICAgICAgIGlmICghb3B0aW9uLmxvY2tlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtVmFsdWUgPSB0aGlzLmZvcm1WYWx1ZT8uZmlsdGVyKG8gPT4gby5uYW1lICE9PSBvcHRpb24ubmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUZuKHRoaXMuZm9ybVZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUuZW1pdChvcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICBjYXNlICcsJzpcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE9wdGlvblZhbHVlKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdFNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGFzdE9wdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pbnB1dCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0U2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUJsdXIoKSB7XG4gICAgICAgIHRoaXMuaXNGb2N1c3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFkZE9wdGlvblZhbHVlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRPcHRpb25WYWx1ZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucGFyc2VJbnB1dEludG9PcHRpb25zKHRoaXMuaW5wdXQpLmZpbHRlcihvcHRpb24gPT4ge1xuICAgICAgICAgICAgLy8gZG8gbm90IGFkZCBhbiBvcHRpb24gd2l0aCB0aGUgc2FtZSBuYW1lXG4gICAgICAgICAgICAvLyBhcyBhbiBleGlzdGluZyBvcHRpb25cbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gdGhpcy5vcHRpb25zID8/IHRoaXMuZm9ybVZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuICFleGlzdGluZz8uZmluZChvID0+IG8/Lm5hbWUgPT09IG9wdGlvbi5uYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdGhpcy5mb3JtVmFsdWUgJiYgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQuZW1pdChvcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JtVmFsdWUgPSB1bmlxdWUoWy4uLnRoaXMuZm9ybVZhbHVlLCAuLi5vcHRpb25zXSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlRm4odGhpcy5mb3JtVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5wdXQgPSAnJztcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlSW5wdXRJbnRvT3B0aW9ucyhpbnB1dDogc3RyaW5nKTogT3B0aW9uW10ge1xuICAgICAgICByZXR1cm4gaW5wdXRcbiAgICAgICAgICAgIC5zcGxpdCgvWyxcXG5dLylcbiAgICAgICAgICAgIC5tYXAocyA9PiBzLnRyaW0oKSlcbiAgICAgICAgICAgIC5maWx0ZXIocyA9PiBzICE9PSAnJylcbiAgICAgICAgICAgIC5tYXAocyA9PiAoeyBuYW1lOiBzLCBsb2NrZWQ6IGZhbHNlIH0pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUxhc3RPcHRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvblZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMub3B0aW9uVmFsdWVzW3RoaXMub3B0aW9uVmFsdWVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==