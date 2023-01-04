import { Pipe } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { I18nService } from '../../providers/i18n/i18n.service';
/**
 * @description
 * Displays a number of milliseconds in a more human-readable format,
 * e.g. "12ms", "33s", "2:03m"
 *
 * @example
 * ```TypeScript
 * {{ timeInMs | duration }}
 * ```
 *
 * @docsCategory pipes
 */
export class DurationPipe {
    constructor(i18nService) {
        this.i18nService = i18nService;
    }
    transform(value) {
        if (value < 1000) {
            return this.i18nService.translate(_('datetime.duration-milliseconds'), { ms: value });
        }
        else if (value < 1000 * 60) {
            const seconds1dp = +(value / 1000).toFixed(1);
            return this.i18nService.translate(_('datetime.duration-seconds'), { s: seconds1dp });
        }
        else {
            const minutes = Math.floor(value / (1000 * 60));
            const seconds = Math.round((value % (1000 * 60)) / 1000)
                .toString()
                .padStart(2, '0');
            return this.i18nService.translate(_('datetime.duration-minutes:seconds'), {
                m: minutes,
                s: seconds,
            });
        }
    }
}
DurationPipe.decorators = [
    { type: Pipe, args: [{
                name: 'duration',
            },] }
];
DurationPipe.ctorParameters = () => [
    { type: I18nService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVyYXRpb24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL3BpcGVzL2R1cmF0aW9uLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV0RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7O0dBV0c7QUFJSCxNQUFNLE9BQU8sWUFBWTtJQUNyQixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFHLENBQUM7SUFFaEQsU0FBUyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0NBQWdDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3pGO2FBQU0sSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRTtZQUMxQixNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7U0FDeEY7YUFBTTtZQUNILE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDbkQsUUFBUSxFQUFFO2lCQUNWLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsbUNBQW1DLENBQUMsRUFBRTtnQkFDdEUsQ0FBQyxFQUFFLE9BQU87Z0JBQ1YsQ0FBQyxFQUFFLE9BQU87YUFDYixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7OztZQXRCSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLFVBQVU7YUFDbkI7OztZQWhCUSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuXG5pbXBvcnQgeyBJMThuU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9pMThuL2kxOG4uc2VydmljZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBEaXNwbGF5cyBhIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSBtb3JlIGh1bWFuLXJlYWRhYmxlIGZvcm1hdCxcbiAqIGUuZy4gXCIxMm1zXCIsIFwiMzNzXCIsIFwiMjowM21cIlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBUeXBlU2NyaXB0XG4gKiB7eyB0aW1lSW5NcyB8IGR1cmF0aW9uIH19XG4gKiBgYGBcbiAqXG4gKiBAZG9jc0NhdGVnb3J5IHBpcGVzXG4gKi9cbkBQaXBlKHtcbiAgICBuYW1lOiAnZHVyYXRpb24nLFxufSlcbmV4cG9ydCBjbGFzcyBEdXJhdGlvblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGkxOG5TZXJ2aWNlOiBJMThuU2VydmljZSkge31cblxuICAgIHRyYW5zZm9ybSh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHZhbHVlIDwgMTAwMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaTE4blNlcnZpY2UudHJhbnNsYXRlKF8oJ2RhdGV0aW1lLmR1cmF0aW9uLW1pbGxpc2Vjb25kcycpLCB7IG1zOiB2YWx1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8IDEwMDAgKiA2MCkge1xuICAgICAgICAgICAgY29uc3Qgc2Vjb25kczFkcCA9ICsodmFsdWUgLyAxMDAwKS50b0ZpeGVkKDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaTE4blNlcnZpY2UudHJhbnNsYXRlKF8oJ2RhdGV0aW1lLmR1cmF0aW9uLXNlY29uZHMnKSwgeyBzOiBzZWNvbmRzMWRwIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IodmFsdWUgLyAoMTAwMCAqIDYwKSk7XG4gICAgICAgICAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5yb3VuZCgodmFsdWUgJSAoMTAwMCAqIDYwKSkgLyAxMDAwKVxuICAgICAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pMThuU2VydmljZS50cmFuc2xhdGUoXygnZGF0ZXRpbWUuZHVyYXRpb24tbWludXRlczpzZWNvbmRzJyksIHtcbiAgICAgICAgICAgICAgICBtOiBtaW51dGVzLFxuICAgICAgICAgICAgICAgIHM6IHNlY29uZHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==