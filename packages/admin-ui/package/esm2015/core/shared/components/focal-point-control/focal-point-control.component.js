import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewChild, } from '@angular/core';
export class FocalPointControlComponent {
    constructor() {
        this.visible = false;
        this.editable = false;
        this.fpx = 0.5;
        this.fpy = 0.5;
        this.focalPointChange = new EventEmitter();
    }
    get initialPosition() {
        return this.focalPointToOffset(this.fpx == null ? 0.5 : this.fpx, this.fpy == null ? 0.5 : this.fpy);
    }
    onDragEnded(event) {
        const { x, y } = this.getCurrentFocalPoint();
        this.fpx = x;
        this.fpy = y;
        this.focalPointChange.emit({ x, y });
    }
    getCurrentFocalPoint() {
        const { left: dotLeft, top: dotTop, width, height } = this.dot.nativeElement.getBoundingClientRect();
        const { left: frameLeft, top: frameTop } = this.frame.nativeElement.getBoundingClientRect();
        const xInPx = dotLeft - frameLeft + width / 2;
        const yInPx = dotTop - frameTop + height / 2;
        return {
            x: xInPx / this.width,
            y: yInPx / this.height,
        };
    }
    focalPointToOffset(x, y) {
        const { width, height } = this.dot.nativeElement.getBoundingClientRect();
        return {
            x: x * this.width - width / 2,
            y: y * this.height - height / 2,
        };
    }
}
FocalPointControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-focal-point-control',
                template: "<ng-content></ng-content>\n<div class=\"frame\" #frame [style.width.px]=\"width\" [style.height.px]=\"height\">\n    <div\n        #dot\n        class=\"dot\"\n        [class.visible]=\"visible\"\n        [class.editable]=\"editable\"\n        cdkDrag\n        [cdkDragDisabled]=\"!editable\"\n        cdkDragBoundary=\".frame\"\n        (cdkDragEnded)=\"onDragEnded($event)\"\n        [cdkDragFreeDragPosition]=\"initialPosition\"\n    ></div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{position:relative;display:block}.frame{position:absolute;top:0}.dot{width:20px;height:20px;border-radius:50%;border:2px solid white;position:absolute;visibility:hidden;transition:opacity .3s;box-shadow:0 0 4px 4px #0000006b}.dot.visible{visibility:visible;opacity:.7}.dot.editable{cursor:move;visibility:visible;opacity:1;animation:pulse;animation-duration:.5s;animation-iteration-count:4}@keyframes pulse{0%{border-color:#fff}50%{border-color:var(--color-warning-500)}to{border-color:#fff}}\n"]
            },] }
];
FocalPointControlComponent.propDecorators = {
    visible: [{ type: Input }],
    editable: [{ type: Input }],
    width: [{ type: HostBinding, args: ['style.width.px',] }, { type: Input }],
    height: [{ type: HostBinding, args: ['style.height.px',] }, { type: Input }],
    fpx: [{ type: Input }],
    fpy: [{ type: Input }],
    focalPointChange: [{ type: Output }],
    frame: [{ type: ViewChild, args: ['frame', { static: true },] }],
    dot: [{ type: ViewChild, args: ['dot', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jYWwtcG9pbnQtY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2ZvY2FsLXBvaW50LWNvbnRyb2wvZm9jYWwtcG9pbnQtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsR0FDWixNQUFNLGVBQWUsQ0FBQztBQVV2QixNQUFNLE9BQU8sMEJBQTBCO0lBTnZDO1FBT2EsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBT2pCLFFBQUcsR0FBRyxHQUFHLENBQUM7UUFDVixRQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ1QscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztJQWtDM0QsQ0FBQztJQTdCRyxJQUFJLGVBQWU7UUFDZixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWlCO1FBQ3pCLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU8sb0JBQW9CO1FBQ3hCLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDckcsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDNUYsTUFBTSxLQUFLLEdBQUcsT0FBTyxHQUFHLFNBQVMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sS0FBSyxHQUFHLE1BQU0sR0FBRyxRQUFRLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM3QyxPQUFPO1lBQ0gsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSztZQUNyQixDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNO1NBQ3pCLENBQUM7SUFDTixDQUFDO0lBRU8sa0JBQWtCLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDM0MsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3pFLE9BQU87WUFDSCxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUM7WUFDN0IsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDO1NBQ2xDLENBQUM7SUFDTixDQUFDOzs7WUFsREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLGtkQUFtRDtnQkFFbkQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7c0JBRUksS0FBSzt1QkFDTCxLQUFLO29CQUNMLFdBQVcsU0FBQyxnQkFBZ0IsY0FDNUIsS0FBSztxQkFFTCxXQUFXLFNBQUMsaUJBQWlCLGNBQzdCLEtBQUs7a0JBRUwsS0FBSztrQkFDTCxLQUFLOytCQUNMLE1BQU07b0JBRU4sU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7a0JBQ25DLFNBQVMsU0FBQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrRHJhZ0VuZCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCB0eXBlIFBvaW50ID0geyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1mb2NhbC1wb2ludC1jb250cm9sJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZm9jYWwtcG9pbnQtY29udHJvbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZm9jYWwtcG9pbnQtY29udHJvbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGb2NhbFBvaW50Q29udHJvbENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgdmlzaWJsZSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGVkaXRhYmxlID0gZmFsc2U7XG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aC5weCcpXG4gICAgQElucHV0KClcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0LnB4JylcbiAgICBASW5wdXQoKVxuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGZweCA9IDAuNTtcbiAgICBASW5wdXQoKSBmcHkgPSAwLjU7XG4gICAgQE91dHB1dCgpIGZvY2FsUG9pbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBvaW50PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZnJhbWUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBmcmFtZTogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gICAgQFZpZXdDaGlsZCgnZG90JywgeyBzdGF0aWM6IHRydWUgfSkgZG90OiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcblxuICAgIGdldCBpbml0aWFsUG9zaXRpb24oKTogUG9pbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2NhbFBvaW50VG9PZmZzZXQodGhpcy5mcHggPT0gbnVsbCA/IDAuNSA6IHRoaXMuZnB4LCB0aGlzLmZweSA9PSBudWxsID8gMC41IDogdGhpcy5mcHkpO1xuICAgIH1cblxuICAgIG9uRHJhZ0VuZGVkKGV2ZW50OiBDZGtEcmFnRW5kKSB7XG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5nZXRDdXJyZW50Rm9jYWxQb2ludCgpO1xuICAgICAgICB0aGlzLmZweCA9IHg7XG4gICAgICAgIHRoaXMuZnB5ID0geTtcbiAgICAgICAgdGhpcy5mb2NhbFBvaW50Q2hhbmdlLmVtaXQoeyB4LCB5IH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q3VycmVudEZvY2FsUG9pbnQoKTogUG9pbnQge1xuICAgICAgICBjb25zdCB7IGxlZnQ6IGRvdExlZnQsIHRvcDogZG90VG9wLCB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLmRvdC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCB7IGxlZnQ6IGZyYW1lTGVmdCwgdG9wOiBmcmFtZVRvcCB9ID0gdGhpcy5mcmFtZS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCB4SW5QeCA9IGRvdExlZnQgLSBmcmFtZUxlZnQgKyB3aWR0aCAvIDI7XG4gICAgICAgIGNvbnN0IHlJblB4ID0gZG90VG9wIC0gZnJhbWVUb3AgKyBoZWlnaHQgLyAyO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogeEluUHggLyB0aGlzLndpZHRoLFxuICAgICAgICAgICAgeTogeUluUHggLyB0aGlzLmhlaWdodCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvY2FsUG9pbnRUb09mZnNldCh4OiBudW1iZXIsIHk6IG51bWJlcik6IFBvaW50IHtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLmRvdC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogeCAqIHRoaXMud2lkdGggLSB3aWR0aCAvIDIsXG4gICAgICAgICAgICB5OiB5ICogdGhpcy5oZWlnaHQgLSBoZWlnaHQgLyAyLFxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==