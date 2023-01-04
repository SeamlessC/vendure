import { assertNever } from '@vendure/common/lib/shared-utils';
/**
 * ConfigArg values are always stored as strings. If they are not primitives, then
 * they are JSON-encoded. This function unwraps them back into their original
 * data type.
 */
export function getConfigArgValue(value) {
    try {
        return value != null ? JSON.parse(value) : undefined;
    }
    catch (e) {
        return value;
    }
}
export function encodeConfigArgValue(value) {
    return Array.isArray(value) ? JSON.stringify(value) : (value !== null && value !== void 0 ? value : '').toString();
}
/**
 * Creates an empty ConfigurableOperation object based on the definition.
 */
export function configurableDefinitionToInstance(def) {
    return Object.assign(Object.assign({}, def), { args: def.args.map(arg => {
            return Object.assign(Object.assign({}, arg), { value: getDefaultConfigArgValue(arg) });
        }) });
}
/**
 * Converts an object of the type:
 * ```
 * {
 *     code: 'my-operation',
 *     args: {
 *         someProperty: 'foo'
 *     }
 * }
 * ```
 * to the format defined by the ConfigurableOperationInput GraphQL input type:
 * ```
 * {
 *     code: 'my-operation',
 *     arguments: [
 *         { name: 'someProperty', value: 'foo' }
 *     ]
 * }
 * ```
 */
export function toConfigurableOperationInput(operation, formValueOperations) {
    const argsArray = Array.isArray(formValueOperations.args) ? formValueOperations.args : undefined;
    const argsMap = !Array.isArray(formValueOperations.args) ? formValueOperations.args : undefined;
    return {
        code: operation.code,
        arguments: operation.args.map(({ name, value }, j) => {
            var _a, _b;
            const formValue = (_b = (_a = argsArray === null || argsArray === void 0 ? void 0 : argsArray.find(arg => arg.name === name)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : argsMap === null || argsMap === void 0 ? void 0 : argsMap[name];
            if (formValue == null) {
                throw new Error(`Cannot find an argument value for the key "${name}"`);
            }
            return {
                name,
                value: (formValue === null || formValue === void 0 ? void 0 : formValue.hasOwnProperty('value'))
                    ? encodeConfigArgValue(formValue.value)
                    : encodeConfigArgValue(formValue),
            };
        }),
    };
}
export function configurableOperationValueIsValid(def, value) {
    if (!def || !value) {
        return false;
    }
    if (def.code !== value.code) {
        return false;
    }
    for (const argDef of def.args) {
        const argVal = value.args[argDef.name];
        if (argDef.required && (argVal == null || argVal === '' || argVal === '0')) {
            return false;
        }
    }
    return true;
}
/**
 * Returns a default value based on the type of the config arg.
 */
export function getDefaultConfigArgValue(arg) {
    if (arg.list) {
        return [];
    }
    if (arg.defaultValue != null) {
        return arg.defaultValue;
    }
    const type = arg.type;
    switch (type) {
        case 'string':
        case 'datetime':
        case 'float':
        case 'ID':
        case 'int':
            return null;
        case 'boolean':
            return false;
        default:
            assertNever(type);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhYmxlLW9wZXJhdGlvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvY29tbW9uL3V0aWxpdGllcy9jb25maWd1cmFibGUtb3BlcmF0aW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQVMvRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEtBQVU7SUFDeEMsSUFBSTtRQUNBLE9BQU8sS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQ3hEO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsS0FBVTtJQUMzQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbkYsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGdDQUFnQyxDQUM1QyxHQUFvQztJQUVwQyxPQUFPLGdDQUNBLEdBQUcsS0FDTixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckIsdUNBQ08sR0FBRyxLQUNOLEtBQUssRUFBRSx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsSUFDdEM7UUFDTixDQUFDLENBQUMsR0FDb0IsQ0FBQztBQUMvQixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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akI7WUFDSSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnQXJnVHlwZSwgQ3VzdG9tRmllbGRUeXBlIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgYXNzZXJ0TmV2ZXIgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC11dGlscyc7XG5cbmltcG9ydCB7XG4gICAgQ29uZmlnQXJnRGVmaW5pdGlvbixcbiAgICBDb25maWd1cmFibGVPcGVyYXRpb24sXG4gICAgQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbixcbiAgICBDb25maWd1cmFibGVPcGVyYXRpb25JbnB1dCxcbn0gZnJvbSAnLi4vZ2VuZXJhdGVkLXR5cGVzJztcblxuLyoqXG4gKiBDb25maWdBcmcgdmFsdWVzIGFyZSBhbHdheXMgc3RvcmVkIGFzIHN0cmluZ3MuIElmIHRoZXkgYXJlIG5vdCBwcmltaXRpdmVzLCB0aGVuXG4gKiB0aGV5IGFyZSBKU09OLWVuY29kZWQuIFRoaXMgZnVuY3Rpb24gdW53cmFwcyB0aGVtIGJhY2sgaW50byB0aGVpciBvcmlnaW5hbFxuICogZGF0YSB0eXBlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZmlnQXJnVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAhPSBudWxsID8gSlNPTi5wYXJzZSh2YWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlQ29uZmlnQXJnVmFsdWUodmFsdWU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogKHZhbHVlID8/ICcnKS50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gZW1wdHkgQ29uZmlndXJhYmxlT3BlcmF0aW9uIG9iamVjdCBiYXNlZCBvbiB0aGUgZGVmaW5pdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyYWJsZURlZmluaXRpb25Ub0luc3RhbmNlKFxuICAgIGRlZjogQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbixcbik6IENvbmZpZ3VyYWJsZU9wZXJhdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZGVmLFxuICAgICAgICBhcmdzOiBkZWYuYXJncy5tYXAoYXJnID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uYXJnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBnZXREZWZhdWx0Q29uZmlnQXJnVmFsdWUoYXJnKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgIH0gYXMgQ29uZmlndXJhYmxlT3BlcmF0aW9uO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGFuIG9iamVjdCBvZiB0aGUgdHlwZTpcbiAqIGBgYFxuICoge1xuICogICAgIGNvZGU6ICdteS1vcGVyYXRpb24nLFxuICogICAgIGFyZ3M6IHtcbiAqICAgICAgICAgc29tZVByb3BlcnR5OiAnZm9vJ1xuICogICAgIH1cbiAqIH1cbiAqIGBgYFxuICogdG8gdGhlIGZvcm1hdCBkZWZpbmVkIGJ5IHRoZSBDb25maWd1cmFibGVPcGVyYXRpb25JbnB1dCBHcmFwaFFMIGlucHV0IHR5cGU6XG4gKiBgYGBcbiAqIHtcbiAqICAgICBjb2RlOiAnbXktb3BlcmF0aW9uJyxcbiAqICAgICBhcmd1bWVudHM6IFtcbiAqICAgICAgICAgeyBuYW1lOiAnc29tZVByb3BlcnR5JywgdmFsdWU6ICdmb28nIH1cbiAqICAgICBdXG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQ29uZmlndXJhYmxlT3BlcmF0aW9uSW5wdXQoXG4gICAgb3BlcmF0aW9uOiBDb25maWd1cmFibGVPcGVyYXRpb24sXG4gICAgZm9ybVZhbHVlT3BlcmF0aW9uczogeyBhcmdzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHwgQXJyYXk8eyBuYW1lOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfT4gfSxcbik6IENvbmZpZ3VyYWJsZU9wZXJhdGlvbklucHV0IHtcbiAgICBjb25zdCBhcmdzQXJyYXkgPSBBcnJheS5pc0FycmF5KGZvcm1WYWx1ZU9wZXJhdGlvbnMuYXJncykgPyBmb3JtVmFsdWVPcGVyYXRpb25zLmFyZ3MgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgYXJnc01hcCA9ICFBcnJheS5pc0FycmF5KGZvcm1WYWx1ZU9wZXJhdGlvbnMuYXJncykgPyBmb3JtVmFsdWVPcGVyYXRpb25zLmFyZ3MgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogb3BlcmF0aW9uLmNvZGUsXG4gICAgICAgIGFyZ3VtZW50czogb3BlcmF0aW9uLmFyZ3MubWFwKCh7IG5hbWUsIHZhbHVlIH0sIGopID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IGFyZ3NBcnJheT8uZmluZChhcmcgPT4gYXJnLm5hbWUgPT09IG5hbWUpPy52YWx1ZSA/PyBhcmdzTWFwPy5bbmFtZV07XG4gICAgICAgICAgICBpZiAoZm9ybVZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIGFuIGFyZ3VtZW50IHZhbHVlIGZvciB0aGUga2V5IFwiJHtuYW1lfVwiYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZvcm1WYWx1ZT8uaGFzT3duUHJvcGVydHkoJ3ZhbHVlJylcbiAgICAgICAgICAgICAgICAgICAgPyBlbmNvZGVDb25maWdBcmdWYWx1ZSgoZm9ybVZhbHVlIGFzIGFueSkudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIDogZW5jb2RlQ29uZmlnQXJnVmFsdWUoZm9ybVZhbHVlKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmFibGVPcGVyYXRpb25WYWx1ZUlzVmFsaWQoXG4gICAgZGVmPzogQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbixcbiAgICB2YWx1ZT86IHsgY29kZTogc3RyaW5nOyBhcmdzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IH0sXG4pIHtcbiAgICBpZiAoIWRlZiB8fCAhdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZGVmLmNvZGUgIT09IHZhbHVlLmNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGFyZ0RlZiBvZiBkZWYuYXJncykge1xuICAgICAgICBjb25zdCBhcmdWYWwgPSB2YWx1ZS5hcmdzW2FyZ0RlZi5uYW1lXTtcbiAgICAgICAgaWYgKGFyZ0RlZi5yZXF1aXJlZCAmJiAoYXJnVmFsID09IG51bGwgfHwgYXJnVmFsID09PSAnJyB8fCBhcmdWYWwgPT09ICcwJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZGVmYXVsdCB2YWx1ZSBiYXNlZCBvbiB0aGUgdHlwZSBvZiB0aGUgY29uZmlnIGFyZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRDb25maWdBcmdWYWx1ZShhcmc6IENvbmZpZ0FyZ0RlZmluaXRpb24pOiBhbnkge1xuICAgIGlmIChhcmcubGlzdCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGlmIChhcmcuZGVmYXVsdFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGFyZy5kZWZhdWx0VmFsdWU7XG4gICAgfVxuICAgIGNvbnN0IHR5cGUgPSBhcmcudHlwZSBhcyBDb25maWdBcmdUeXBlO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBjYXNlICdkYXRldGltZSc6XG4gICAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgY2FzZSAnSUQnOlxuICAgICAgICBjYXNlICdpbnQnOlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYXNzZXJ0TmV2ZXIodHlwZSk7XG4gICAgfVxufVxuIl19