import { getGraphQlInputName } from '@vendure/common/lib/shared-utils';
/**
 * Transforms any custom field "relation" type inputs into the corresponding `<name>Id` format,
 * as expected by the server.
 */
export function transformRelationCustomFieldInputs(variables, customFieldConfig) {
    if (variables.input) {
        if (Array.isArray(variables.input)) {
            for (const item of variables.input) {
                transformRelations(item, customFieldConfig);
            }
        }
        else {
            transformRelations(variables.input, customFieldConfig);
        }
    }
    return transformRelations(variables, customFieldConfig);
}
/**
 * @description
 * When persisting custom fields, we need to send just the IDs of the relations,
 * rather than the objects themselves.
 */
function transformRelations(input, customFieldConfig) {
    for (const field of customFieldConfig) {
        if (field.type === 'relation') {
            if (hasCustomFields(input)) {
                const entityValue = input.customFields[field.name];
                if (input.customFields.hasOwnProperty(field.name)) {
                    delete input.customFields[field.name];
                    input.customFields[getGraphQlInputName(field)] =
                        field.list && Array.isArray(entityValue)
                            ? entityValue.map(v => v === null || v === void 0 ? void 0 : v.id)
                            : entityValue === null
                                ? null
                                : entityValue === null || entityValue === void 0 ? void 0 : entityValue.id;
                }
            }
        }
    }
    return input;
}
function hasCustomFields(input) {
    return input != null && input.hasOwnProperty('customFields') && typeof input.customFields === 'object';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLXJlbGF0aW9uLWN1c3RvbS1maWVsZC1pbnB1dHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvdXRpbHMvdHJhbnNmb3JtLXJlbGF0aW9uLWN1c3RvbS1maWVsZC1pbnB1dHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFLdkU7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGtDQUFrQyxDQUVoRCxTQUFZLEVBQUUsaUJBQXNDO0lBQ2xELElBQUksU0FBUyxDQUFDLEtBQUssRUFBRTtRQUNqQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLEtBQUssTUFBTSxJQUFJLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7YUFDL0M7U0FDSjthQUFNO1lBQ0gsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1NBQzFEO0tBQ0o7SUFDRCxPQUFPLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxrQkFBa0IsQ0FBSSxLQUFRLEVBQUUsaUJBQXNDO0lBQzNFLEtBQUssTUFBTSxLQUFLLElBQUksaUJBQWlCLEVBQUU7UUFDbkMsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtZQUMzQixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDeEIsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUMvQyxPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0QyxLQUFLLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMxQyxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDOzRCQUNwQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxFQUFFLENBQUM7NEJBQzdCLENBQUMsQ0FBQyxXQUFXLEtBQUssSUFBSTtnQ0FDdEIsQ0FBQyxDQUFDLElBQUk7Z0NBQ04sQ0FBQyxDQUFDLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxFQUFFLENBQUM7aUJBQzdCO2FBQ0o7U0FDSjtLQUNKO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLEtBQVU7SUFDL0IsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLElBQUksT0FBTyxLQUFLLENBQUMsWUFBWSxLQUFLLFFBQVEsQ0FBQztBQUMzRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0R3JhcGhRbElucHV0TmFtZSB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXV0aWxzJztcbmltcG9ydCB7IHNpbXBsZURlZXBDbG9uZSB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2ltcGxlLWRlZXAtY2xvbmUnO1xuXG5pbXBvcnQgeyBDdXN0b21GaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYW55IGN1c3RvbSBmaWVsZCBcInJlbGF0aW9uXCIgdHlwZSBpbnB1dHMgaW50byB0aGUgY29ycmVzcG9uZGluZyBgPG5hbWU+SWRgIGZvcm1hdCxcbiAqIGFzIGV4cGVjdGVkIGJ5IHRoZSBzZXJ2ZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1SZWxhdGlvbkN1c3RvbUZpZWxkSW5wdXRzPFxuICAgIFQgZXh0ZW5kcyB7IGlucHV0PzogUmVjb3JkPHN0cmluZywgYW55PiB8IEFycmF5PFJlY29yZDxzdHJpbmcsIGFueT4+IH0gJiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0gYW55XG4+KHZhcmlhYmxlczogVCwgY3VzdG9tRmllbGRDb25maWc6IEN1c3RvbUZpZWxkQ29uZmlnW10pOiBUIHtcbiAgICBpZiAodmFyaWFibGVzLmlucHV0KSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhcmlhYmxlcy5pbnB1dCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YXJpYWJsZXMuaW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1SZWxhdGlvbnMoaXRlbSwgY3VzdG9tRmllbGRDb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNmb3JtUmVsYXRpb25zKHZhcmlhYmxlcy5pbnB1dCwgY3VzdG9tRmllbGRDb25maWcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cmFuc2Zvcm1SZWxhdGlvbnModmFyaWFibGVzLCBjdXN0b21GaWVsZENvbmZpZyk7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBXaGVuIHBlcnNpc3RpbmcgY3VzdG9tIGZpZWxkcywgd2UgbmVlZCB0byBzZW5kIGp1c3QgdGhlIElEcyBvZiB0aGUgcmVsYXRpb25zLFxuICogcmF0aGVyIHRoYW4gdGhlIG9iamVjdHMgdGhlbXNlbHZlcy5cbiAqL1xuZnVuY3Rpb24gdHJhbnNmb3JtUmVsYXRpb25zPFQ+KGlucHV0OiBULCBjdXN0b21GaWVsZENvbmZpZzogQ3VzdG9tRmllbGRDb25maWdbXSkge1xuICAgIGZvciAoY29uc3QgZmllbGQgb2YgY3VzdG9tRmllbGRDb25maWcpIHtcbiAgICAgICAgaWYgKGZpZWxkLnR5cGUgPT09ICdyZWxhdGlvbicpIHtcbiAgICAgICAgICAgIGlmIChoYXNDdXN0b21GaWVsZHMoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW50aXR5VmFsdWUgPSBpbnB1dC5jdXN0b21GaWVsZHNbZmllbGQubmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LmN1c3RvbUZpZWxkcy5oYXNPd25Qcm9wZXJ0eShmaWVsZC5uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgaW5wdXQuY3VzdG9tRmllbGRzW2ZpZWxkLm5hbWVdO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jdXN0b21GaWVsZHNbZ2V0R3JhcGhRbElucHV0TmFtZShmaWVsZCldID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLmxpc3QgJiYgQXJyYXkuaXNBcnJheShlbnRpdHlWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGVudGl0eVZhbHVlLm1hcCh2ID0+IHY/LmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZW50aXR5VmFsdWUgPT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGVudGl0eVZhbHVlPy5pZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiBoYXNDdXN0b21GaWVsZHMoaW5wdXQ6IGFueSk6IGlucHV0IGlzIHsgY3VzdG9tRmllbGRzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IH0ge1xuICAgIHJldHVybiBpbnB1dCAhPSBudWxsICYmIGlucHV0Lmhhc093blByb3BlcnR5KCdjdXN0b21GaWVsZHMnKSAmJiB0eXBlb2YgaW5wdXQuY3VzdG9tRmllbGRzID09PSAnb2JqZWN0Jztcbn1cbiJdfQ==