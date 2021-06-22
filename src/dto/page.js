export default class Page {
    content;
    pageable;
    last;
    totalPages;
    totalElements;
    size;
    number;
    sort;
    numberOfElements;
    first;
    empty;

    /**
     * Construct a new Pageable
     * @author Joshua Podhola
     * @param {list} content List of all Pageable elements
     * @param {Object} pageable Object with redundant paging information (may be removed?)
     * @param {boolean} last Is this the last page?
     * @param {int} totalPages How many pages in total?
     * @param {int} totalElements How many elements in all pages combined?
     * @param {int} size Page size
     * @param {int} number Page number; starts at zero!
     * @param {Object} sort Object containing three booleans: sorted, unsorted, and empty
     * @param {int} numberOfElements Number of elements on the current page
     * @param {boolean} first Is this the first page?
     * @param {boolean} empty Is this page empty?
     */
    constructor(content, pageable, last, totalPages, totalElements, size, number, sort, numberOfElements, first, empty) {
        this.content = content;
        this.pageable = pageable;
        this.last = last;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.size = size;
        this.number = number;
        this.sort = sort;
        this.numberOfElements = numberOfElements;
        this.first = first;
        this.empty = empty;
    }
}