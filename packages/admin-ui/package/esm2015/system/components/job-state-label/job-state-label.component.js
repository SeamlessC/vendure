import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JobState } from '@vendure/admin-ui/core';
export class JobStateLabelComponent {
    get iconShape() {
        switch (this.job.state) {
            case JobState.COMPLETED:
                return 'check-circle';
            case JobState.FAILED:
                return 'exclamation-circle';
            case JobState.CANCELLED:
                return 'ban';
            case JobState.PENDING:
            case JobState.RETRYING:
                return 'hourglass';
            case JobState.RUNNING:
                return 'sync';
        }
    }
    get colorType() {
        switch (this.job.state) {
            case JobState.COMPLETED:
                return 'success';
            case JobState.FAILED:
            case JobState.CANCELLED:
                return 'error';
            case JobState.PENDING:
            case JobState.RETRYING:
                return '';
            case JobState.RUNNING:
                return 'warning';
        }
    }
}
JobStateLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-job-state-label',
                template: "<vdr-chip [colorType]=\"colorType\">\n    <clr-icon [attr.shape]=\"iconShape\" class=\"mr1\"></clr-icon>\n    {{ job.state | titlecase }}\n    <span *ngIf=\"job.state === 'RUNNING'\" class=\"progress\">\n        {{ (job.progress / 100) | percent }}\n    </span>\n</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".progress{margin-left:3px}clr-icon{min-width:12px}\n"]
            },] }
];
JobStateLabelComponent.propDecorators = {
    job: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9iLXN0YXRlLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc3lzdGVtL3NyYy9jb21wb25lbnRzL2pvYi1zdGF0ZS1sYWJlbC9qb2Itc3RhdGUtbGFiZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBbUIsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRbkUsTUFBTSxPQUFPLHNCQUFzQjtJQUkvQixJQUFJLFNBQVM7UUFDVCxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO1lBQ3BCLEtBQUssUUFBUSxDQUFDLFNBQVM7Z0JBQ25CLE9BQU8sY0FBYyxDQUFDO1lBQzFCLEtBQUssUUFBUSxDQUFDLE1BQU07Z0JBQ2hCLE9BQU8sb0JBQW9CLENBQUM7WUFDaEMsS0FBSyxRQUFRLENBQUMsU0FBUztnQkFDbkIsT0FBTyxLQUFLLENBQUM7WUFDakIsS0FBSyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3RCLEtBQUssUUFBUSxDQUFDLFFBQVE7Z0JBQ2xCLE9BQU8sV0FBVyxDQUFDO1lBQ3ZCLEtBQUssUUFBUSxDQUFDLE9BQU87Z0JBQ2pCLE9BQU8sTUFBTSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELElBQUksU0FBUztRQUNULFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDcEIsS0FBSyxRQUFRLENBQUMsU0FBUztnQkFDbkIsT0FBTyxTQUFTLENBQUM7WUFDckIsS0FBSyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3JCLEtBQUssUUFBUSxDQUFDLFNBQVM7Z0JBQ25CLE9BQU8sT0FBTyxDQUFDO1lBQ25CLEtBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN0QixLQUFLLFFBQVEsQ0FBQyxRQUFRO2dCQUNsQixPQUFPLEVBQUUsQ0FBQztZQUNkLEtBQUssUUFBUSxDQUFDLE9BQU87Z0JBQ2pCLE9BQU8sU0FBUyxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQzs7O1lBdkNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixnU0FBK0M7Z0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O2tCQUVJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSm9iSW5mb0ZyYWdtZW50LCBKb2JTdGF0ZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1qb2Itc3RhdGUtbGFiZWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9qb2Itc3RhdGUtbGFiZWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2pvYi1zdGF0ZS1sYWJlbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBKb2JTdGF0ZUxhYmVsQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKVxuICAgIGpvYjogSm9iSW5mb0ZyYWdtZW50O1xuXG4gICAgZ2V0IGljb25TaGFwZSgpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuam9iLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIEpvYlN0YXRlLkNPTVBMRVRFRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2NoZWNrLWNpcmNsZSc7XG4gICAgICAgICAgICBjYXNlIEpvYlN0YXRlLkZBSUxFRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2V4Y2xhbWF0aW9uLWNpcmNsZSc7XG4gICAgICAgICAgICBjYXNlIEpvYlN0YXRlLkNBTkNFTExFRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2Jhbic7XG4gICAgICAgICAgICBjYXNlIEpvYlN0YXRlLlBFTkRJTkc6XG4gICAgICAgICAgICBjYXNlIEpvYlN0YXRlLlJFVFJZSU5HOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaG91cmdsYXNzJztcbiAgICAgICAgICAgIGNhc2UgSm9iU3RhdGUuUlVOTklORzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3N5bmMnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGNvbG9yVHlwZSgpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuam9iLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIEpvYlN0YXRlLkNPTVBMRVRFRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3N1Y2Nlc3MnO1xuICAgICAgICAgICAgY2FzZSBKb2JTdGF0ZS5GQUlMRUQ6XG4gICAgICAgICAgICBjYXNlIEpvYlN0YXRlLkNBTkNFTExFRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2Vycm9yJztcbiAgICAgICAgICAgIGNhc2UgSm9iU3RhdGUuUEVORElORzpcbiAgICAgICAgICAgIGNhc2UgSm9iU3RhdGUuUkVUUllJTkc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgY2FzZSBKb2JTdGF0ZS5SVU5OSU5HOlxuICAgICAgICAgICAgICAgIHJldHVybiAnd2FybmluZyc7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=