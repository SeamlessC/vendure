import { Pipe } from '@angular/core';
/**
 * Formats a string into sentence case (first letter of first word uppercase).
 */
export class SentenceCasePipe {
    transform(value) {
        if (typeof value === 'string') {
            let lower;
            if (isCamelCase(value)) {
                lower = value.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
            }
            else {
                lower = value.toLowerCase();
            }
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        }
        return value;
    }
}
SentenceCasePipe.decorators = [
    { type: Pipe, args: [{ name: 'sentenceCase' },] }
];
function isCamelCase(value) {
    return /^[a-zA-Z]+[A-Z][a-zA-Z]+$/.test(value);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VudGVuY2UtY2FzZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvcGlwZXMvc2VudGVuY2UtY2FzZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBEOztHQUVHO0FBRUgsTUFBTSxPQUFPLGdCQUFnQjtJQUN6QixTQUFTLENBQUMsS0FBVTtRQUNoQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixJQUFJLEtBQWEsQ0FBQztZQUNsQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDbkU7aUJBQU07Z0JBQ0gsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUMvQjtZQUNELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7O1lBYkosSUFBSSxTQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRTs7QUFnQjlCLFNBQVMsV0FBVyxDQUFDLEtBQWE7SUFDOUIsT0FBTywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBGb3JtYXRzIGEgc3RyaW5nIGludG8gc2VudGVuY2UgY2FzZSAoZmlyc3QgbGV0dGVyIG9mIGZpcnN0IHdvcmQgdXBwZXJjYXNlKS5cbiAqL1xuQFBpcGUoeyBuYW1lOiAnc2VudGVuY2VDYXNlJyB9KVxuZXhwb3J0IGNsYXNzIFNlbnRlbmNlQ2FzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBsZXQgbG93ZXI6IHN0cmluZztcbiAgICAgICAgICAgIGlmIChpc0NhbWVsQ2FzZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBsb3dlciA9IHZhbHVlLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMSAkMicpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvd2VyID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsb3dlci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxvd2VyLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQ2FtZWxDYXNlKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gL15bYS16QS1aXStbQS1aXVthLXpBLVpdKyQvLnRlc3QodmFsdWUpO1xufVxuIl19