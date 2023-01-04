import { Pipe } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';
export class ChannelLabelPipe {
    transform(value, ...args) {
        if (value === DEFAULT_CHANNEL_CODE) {
            return _('common.default-channel');
        }
        else {
            return value;
        }
    }
}
ChannelLabelPipe.decorators = [
    { type: Pipe, args: [{
                name: 'channelCodeToLabel',
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC1sYWJlbC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvcGlwZXMvY2hhbm5lbC1sYWJlbC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFLNUUsTUFBTSxPQUFPLGdCQUFnQjtJQUN6QixTQUFTLENBQUMsS0FBVSxFQUFFLEdBQUcsSUFBVztRQUNoQyxJQUFJLEtBQUssS0FBSyxvQkFBb0IsRUFBRTtZQUNoQyxPQUFPLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQ3RDO2FBQU07WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7OztZQVZKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsb0JBQW9CO2FBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHsgREVGQVVMVF9DSEFOTkVMX0NPREUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC1jb25zdGFudHMnO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2NoYW5uZWxDb2RlVG9MYWJlbCcsXG59KVxuZXhwb3J0IGNsYXNzIENoYW5uZWxMYWJlbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgLi4uYXJnczogYW55W10pOiBhbnkge1xuICAgICAgICBpZiAodmFsdWUgPT09IERFRkFVTFRfQ0hBTk5FTF9DT0RFKSB7XG4gICAgICAgICAgICByZXR1cm4gXygnY29tbW9uLmRlZmF1bHQtY2hhbm5lbCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19