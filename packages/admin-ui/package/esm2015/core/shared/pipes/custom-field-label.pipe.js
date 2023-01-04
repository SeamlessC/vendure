import { Pipe } from '@angular/core';
/**
 * Displays a localized label for a CustomField or StringFieldOption, falling back to the
 * name/value if none are defined.
 */
export class CustomFieldLabelPipe {
    transform(value, uiLanguageCode) {
        if (!value) {
            return value;
        }
        const { label } = value;
        const name = this.isCustomFieldConfig(value) ? value.name : value.value;
        if (label) {
            const match = label.find(l => l.languageCode === uiLanguageCode);
            return match ? match.value : label[0].value;
        }
        else {
            return name;
        }
    }
    isCustomFieldConfig(input) {
        return input.hasOwnProperty('name');
    }
}
CustomFieldLabelPipe.decorators = [
    { type: Pipe, args: [{
                name: 'customFieldLabel',
                pure: true,
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWZpZWxkLWxhYmVsLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9waXBlcy9jdXN0b20tZmllbGQtbGFiZWwucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUlwRDs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sb0JBQW9CO0lBQzdCLFNBQVMsQ0FBQyxLQUE0QyxFQUFFLGNBQW1DO1FBQ3ZGLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3hFLElBQUksS0FBSyxFQUFFO1lBQ1AsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLEtBQUssY0FBYyxDQUFDLENBQUM7WUFDakUsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDL0M7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRU8sbUJBQW1CLENBQUMsS0FBVTtRQUNsQyxPQUFPLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7O1lBckJKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixJQUFJLEVBQUUsSUFBSTthQUNiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDdXN0b21GaWVsZENvbmZpZywgTGFuZ3VhZ2VDb2RlLCBTdHJpbmdGaWVsZE9wdGlvbiB9IGZyb20gJy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuXG4vKipcbiAqIERpc3BsYXlzIGEgbG9jYWxpemVkIGxhYmVsIGZvciBhIEN1c3RvbUZpZWxkIG9yIFN0cmluZ0ZpZWxkT3B0aW9uLCBmYWxsaW5nIGJhY2sgdG8gdGhlXG4gKiBuYW1lL3ZhbHVlIGlmIG5vbmUgYXJlIGRlZmluZWQuXG4gKi9cbkBQaXBlKHtcbiAgICBuYW1lOiAnY3VzdG9tRmllbGRMYWJlbCcsXG4gICAgcHVyZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tRmllbGRMYWJlbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IEN1c3RvbUZpZWxkQ29uZmlnIHwgU3RyaW5nRmllbGRPcHRpb24sIHVpTGFuZ3VhZ2VDb2RlOiBMYW5ndWFnZUNvZGUgfCBudWxsKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgbGFiZWwgfSA9IHZhbHVlO1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5pc0N1c3RvbUZpZWxkQ29uZmlnKHZhbHVlKSA/IHZhbHVlLm5hbWUgOiB2YWx1ZS52YWx1ZTtcbiAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IGxhYmVsLmZpbmQobCA9PiBsLmxhbmd1YWdlQ29kZSA9PT0gdWlMYW5ndWFnZUNvZGUpO1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoID8gbWF0Y2gudmFsdWUgOiBsYWJlbFswXS52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0N1c3RvbUZpZWxkQ29uZmlnKGlucHV0OiBhbnkpOiBpbnB1dCBpcyBDdXN0b21GaWVsZENvbmZpZyB7XG4gICAgICAgIHJldHVybiBpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpO1xuICAgIH1cbn1cbiJdfQ==