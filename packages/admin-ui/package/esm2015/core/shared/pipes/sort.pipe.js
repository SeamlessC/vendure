import { Pipe } from '@angular/core';
/**
 * A pipe for sorting elements of an array. Should be used with caution due to the
 * potential for perf degredation. Ideally should only be used on small arrays (< 10s of items)
 * and in components using OnPush change detection.
 */
export class SortPipe {
    transform(value, orderByProp) {
        return value.slice().sort((a, b) => {
            const aProp = orderByProp ? a[orderByProp] : a;
            const bProp = orderByProp ? b[orderByProp] : b;
            if (aProp === bProp) {
                return 0;
            }
            if (aProp == null) {
                return 1;
            }
            if (bProp == null) {
                return -1;
            }
            return aProp > bProp ? 1 : -1;
        });
    }
}
SortPipe.decorators = [
    { type: Pipe, args: [{
                name: 'sort',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvcGlwZXMvc29ydC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBEOzs7O0dBSUc7QUFJSCxNQUFNLE9BQU8sUUFBUTtJQUNqQixTQUFTLENBQUksS0FBeUIsRUFBRSxXQUFxQjtRQUN6RCxPQUFPLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0IsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksS0FBSyxLQUFLLEtBQUssRUFBRTtnQkFDakIsT0FBTyxDQUFDLENBQUM7YUFDWjtZQUNELElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDZixPQUFPLENBQUMsQ0FBQzthQUNaO1lBQ0QsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDYjtZQUNELE9BQU8sS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQW5CSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLE1BQU07YUFDZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIHBpcGUgZm9yIHNvcnRpbmcgZWxlbWVudHMgb2YgYW4gYXJyYXkuIFNob3VsZCBiZSB1c2VkIHdpdGggY2F1dGlvbiBkdWUgdG8gdGhlXG4gKiBwb3RlbnRpYWwgZm9yIHBlcmYgZGVncmVkYXRpb24uIElkZWFsbHkgc2hvdWxkIG9ubHkgYmUgdXNlZCBvbiBzbWFsbCBhcnJheXMgKDwgMTBzIG9mIGl0ZW1zKVxuICogYW5kIGluIGNvbXBvbmVudHMgdXNpbmcgT25QdXNoIGNoYW5nZSBkZXRlY3Rpb24uXG4gKi9cbkBQaXBlKHtcbiAgICBuYW1lOiAnc29ydCcsXG59KVxuZXhwb3J0IGNsYXNzIFNvcnRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtPFQ+KHZhbHVlOiBUW10gfCByZWFkb25seSBUW10sIG9yZGVyQnlQcm9wPzoga2V5b2YgVCkge1xuICAgICAgICByZXR1cm4gdmFsdWUuc2xpY2UoKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhUHJvcCA9IG9yZGVyQnlQcm9wID8gYVtvcmRlckJ5UHJvcF0gOiBhO1xuICAgICAgICAgICAgY29uc3QgYlByb3AgPSBvcmRlckJ5UHJvcCA/IGJbb3JkZXJCeVByb3BdIDogYjtcbiAgICAgICAgICAgIGlmIChhUHJvcCA9PT0gYlByb3ApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhUHJvcCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYlByb3AgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhUHJvcCA+IGJQcm9wID8gMSA6IC0xO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=