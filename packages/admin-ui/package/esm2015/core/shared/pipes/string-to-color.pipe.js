import { Pipe } from '@angular/core';
import { stringToColor } from '../../common/utilities/string-to-color';
export class StringToColorPipe {
    transform(value) {
        return stringToColor(value);
    }
}
StringToColorPipe.decorators = [
    { type: Pipe, args: [{
                name: 'stringToColor',
                pure: true,
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXRvLWNvbG9yLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9waXBlcy9zdHJpbmctdG8tY29sb3IucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFNdkUsTUFBTSxPQUFPLGlCQUFpQjtJQUMxQixTQUFTLENBQUMsS0FBVTtRQUNoQixPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7WUFQSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLElBQUksRUFBRSxJQUFJO2FBQ2IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHN0cmluZ1RvQ29sb3IgfSBmcm9tICcuLi8uLi9jb21tb24vdXRpbGl0aWVzL3N0cmluZy10by1jb2xvcic7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnc3RyaW5nVG9Db2xvcicsXG4gICAgcHVyZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgU3RyaW5nVG9Db2xvclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0NvbG9yKHZhbHVlKTtcbiAgICB9XG59XG4iXX0=