export class GridResults<T> {
    items: T[] = [];
    pagination: Pagination = null;
}

export class GridCriteria<T>{
    criteria: T;
    gridCriteria: Pagination = null;
}

export class Pagination {
    pageSize?: number;
    page?: number;
    totalRecord?: number;
    totalPages?: number;
    sortby?: string = '';
    sortdir?: string = 'asc';
}

export class Paginator {
    public page: number;
    public first: number;
    public rows: number;
    public pageCount: number;
    public totalRecord?: number;
}


