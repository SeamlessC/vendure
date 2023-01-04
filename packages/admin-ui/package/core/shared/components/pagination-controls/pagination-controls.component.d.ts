import { EventEmitter } from '@angular/core';
export declare class PaginationControlsComponent {
    id?: number;
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    pageChange: EventEmitter<number>;
}
