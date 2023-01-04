import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HtmlEditorFormInputComponent } from '../../../dynamic-form-inputs/code-editor-form-input/html-editor-form-input.component';
export class RawHtmlDialogComponent {
    constructor() {
        this.formControl = new FormControl();
        this.config = {
            name: '',
            type: '',
            list: false,
            required: true,
            ui: { component: HtmlEditorFormInputComponent.id },
        };
    }
    ngOnInit() {
        this.formControl.setValue(this.process(this.html));
    }
    process(str) {
        const div = document.createElement('div');
        div.innerHTML = str.trim();
        return this.format(div, 0).innerHTML.trim();
    }
    /**
     * Taken from https://stackoverflow.com/a/26361620/772859
     */
    format(node, level = 0) {
        const indentBefore = new Array(level++ + 1).join('\t');
        const indentAfter = new Array(level - 1).join('\t');
        let textNode;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < node.children.length; i++) {
            textNode = document.createTextNode('\n' + indentBefore);
            node.insertBefore(textNode, node.children[i]);
            this.format(node.children[i], level);
            if (node.lastElementChild === node.children[i]) {
                textNode = document.createTextNode('\n' + indentAfter);
                node.appendChild(textNode);
            }
        }
        return node;
    }
    cancel() {
        this.resolveWith(undefined);
    }
    select() {
        this.resolveWith(this.formControl.value);
    }
}
RawHtmlDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-raw-html-dialog',
                template: "<vdr-dynamic-form-input\n                      [def]=\"config\"\n                      [control]=\"formControl\"\n                  ></vdr-dynamic-form-input>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"cancel()\">\n       {{ 'common.cancel' | translate }}\n    </button>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"formControl.invalid\">\n        {{ 'common.update' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF3LWh0bWwtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvcmljaC10ZXh0LWVkaXRvci9yYXctaHRtbC1kaWFsb2cvcmF3LWh0bWwtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk3QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxzRkFBc0YsQ0FBQztBQVFwSSxNQUFNLE9BQU8sc0JBQXNCO0lBTm5DO1FBUUksZ0JBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLFdBQU0sR0FBd0I7WUFDMUIsSUFBSSxFQUFFLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxLQUFLO1lBQ1gsUUFBUSxFQUFFLElBQUk7WUFDZCxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsNEJBQTRCLENBQUMsRUFBRSxFQUFFO1NBQ3JELENBQUM7SUE2Q04sQ0FBQztJQXpDRyxRQUFRO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQVc7UUFDZixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFhLEVBQUUsS0FBSyxHQUFHLENBQUM7UUFDM0IsTUFBTSxZQUFZLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sV0FBVyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsSUFBSSxRQUFjLENBQUM7UUFFbkIseUNBQXlDO1FBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTlDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVyQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM1QyxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUI7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7WUEzREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLDhnQkFBK0M7Z0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IENvbmZpZ0FyZ0RlZmluaXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IERpYWxvZyB9IGZyb20gJy4uLy4uLy4uLy4uL3Byb3ZpZGVycy9tb2RhbC9tb2RhbC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0bWxFZGl0b3JGb3JtSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9keW5hbWljLWZvcm0taW5wdXRzL2NvZGUtZWRpdG9yLWZvcm0taW5wdXQvaHRtbC1lZGl0b3ItZm9ybS1pbnB1dC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1yYXctaHRtbC1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9yYXctaHRtbC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Jhdy1odG1sLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBSYXdIdG1sRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEaWFsb2c8c3RyaW5nPiB7XG4gICAgaHRtbDogc3RyaW5nO1xuICAgIGZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gICAgY29uZmlnOiBDb25maWdBcmdEZWZpbml0aW9uID0ge1xuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgdHlwZTogJycsXG4gICAgICAgIGxpc3Q6IGZhbHNlLFxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgdWk6IHsgY29tcG9uZW50OiBIdG1sRWRpdG9yRm9ybUlucHV0Q29tcG9uZW50LmlkIH0sXG4gICAgfTtcblxuICAgIHJlc29sdmVXaXRoOiAoaHRtbDogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiB2b2lkO1xuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5wcm9jZXNzKHRoaXMuaHRtbCkpO1xuICAgIH1cblxuICAgIHByb2Nlc3Moc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBzdHIudHJpbSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQoZGl2LCAwKS5pbm5lckhUTUwudHJpbSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRha2VuIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2MzYxNjIwLzc3Mjg1OVxuICAgICAqL1xuICAgIGZvcm1hdChub2RlOiBFbGVtZW50LCBsZXZlbCA9IDApIHtcbiAgICAgICAgY29uc3QgaW5kZW50QmVmb3JlID0gbmV3IEFycmF5KGxldmVsKysgKyAxKS5qb2luKCdcXHQnKTtcbiAgICAgICAgY29uc3QgaW5kZW50QWZ0ZXIgPSBuZXcgQXJyYXkobGV2ZWwgLSAxKS5qb2luKCdcXHQnKTtcbiAgICAgICAgbGV0IHRleHROb2RlOiBUZXh0O1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItZm9yLW9mXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnXFxuJyArIGluZGVudEJlZm9yZSk7XG4gICAgICAgICAgICBub2RlLmluc2VydEJlZm9yZSh0ZXh0Tm9kZSwgbm9kZS5jaGlsZHJlbltpXSk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9ybWF0KG5vZGUuY2hpbGRyZW5baV0sIGxldmVsKTtcblxuICAgICAgICAgICAgaWYgKG5vZGUubGFzdEVsZW1lbnRDaGlsZCA9PT0gbm9kZS5jaGlsZHJlbltpXSkge1xuICAgICAgICAgICAgICAgIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1xcbicgKyBpbmRlbnRBZnRlcik7XG4gICAgICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgodW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgodGhpcy5mb3JtQ29udHJvbC52YWx1ZSk7XG4gICAgfVxufVxuIl19