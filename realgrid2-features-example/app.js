var gridView;
var dataProvider;

// Global state variables
let currentPage = 1;
const pageSize = 10; // Default page size
let currentSortBy = 'id'; // Default sort field
let currentSortOrder = 'asc'; // Default sort order
let currentSearchQuery = '';
let totalRecords = 0;

$(document).ready(function () {
    RealGrid.setLocale('ko');

    dataProvider = new RealGrid.LocalDataProvider(false); // false for async data loading
    gridView = new RealGrid.GridView("realgrid");
    gridView.setDataSource(dataProvider);

    // Define Fields based on dummyjson.com/posts structure
    const fields = [
        { fieldName: "id", dataType: "number" },
        { fieldName: "title", dataType: "text" },
        { fieldName: "body", dataType: "text" },
        { fieldName: "userId", dataType: "number" },
        { fieldName: "tags", dataType: "object" }, // Assuming tags is an array
        { fieldName: "reactions", dataType: "number" }
    ];
    dataProvider.setFields(fields);

    // Define Columns
    const columns = [
        { name: "id", fieldName: "id", width: "50", header: { text: "ID" }, editor: { type: "number", readOnly: true}, sortable: true },
        { name: "title", fieldName: "title", width: "250", header: { text: "제목" }, styleName: "left-column", sortable: true },
        { name: "body", fieldName: "body", width: "400", header: { text: "내용" }, styleName: "left-column", sortable: true },
        { name: "userId", fieldName: "userId", width: "70", header: { text: "사용자ID" }, sortable: true },
        { 
            name: "tags", 
            fieldName: "tags", 
            width: "150", 
            header: { text: "태그" },
            valueCallback: function (grid, item, fieldName, index, value) {
                return Array.isArray(value) ? value.join(', ') : '';
            },
            sortable: true // Assuming tags can be sorted by their string representation
        },
        { name: "reactions", fieldName: "reactions", width: "80", header: { text: "반응 수" }, sortable: true }
    ];
    gridView.setColumns(columns);

    // Grid options
    gridView.setOptions({
        display: { fitStyle: "evenFill" },
        header: { height: 40 },
        footer: { visible: false },
        checkBar: { visible: false },
        stateBar: { visible: false },
        fixed: { colCount: 0 },
        edit: { editable: false }, // Data from API is typically read-only on client
        // sortMode: "exclusive", // This is implicitly handled by sorting.style
        sorting: {
            enabled: true, // Enable header click for sorting UI
            style: "exclusive", // Ensures single column sort, provides fields/directions to onSorting
            keepFocusedCell: true
        }
    });
    
    // Disable RealGrid's internal paging as pagination.js will handle it
    gridView.setPaging(false);

    // Setup event handlers
    setupSorting();
    setupSearch();
    
    // Initial data load
    fetchDataAndInitializePagination();
});

function fetchDataAndInitializePagination() {
    // Fetch initial data to get total count for pagination.js
    // currentSearchQuery, currentSortBy, currentSortOrder should be used
    fetchData(1, pageSize, currentSortBy, currentSortOrder, currentSearchQuery);
}

function fetchData(page, limit, sortBy, sortOrder, searchQuery) {
    currentPage = page; // Update global current page

    let url = 'https://dummyjson.com/posts';
    const params = {
        limit: limit,
        skip: (page - 1) * limit,
        sortBy: sortBy,
        order: sortOrder
    };

    if (searchQuery) {
        url = `https://dummyjson.com/posts/search`;
        params.q = searchQuery;
        // Note: dummyjson search API might not support sortBy/order.
        // If sorting is active with search, results might not be as expected from API.
        // Removing sort params for search to avoid potential API errors or unexpected behavior.
        delete params.sortBy;
        delete params.order;
        console.warn("Sorting may not be applied when searching with dummyjson API.");
    }

    gridView.showLoading(); // Show loading indicator

    $.ajax({
        url: url,
        type: 'GET',
        data: params,
        dataType: 'json',
        success: function (response) {
            if (response && response.posts) {
                dataProvider.fillJsonData(response.posts, { fillMode: "set" });
                totalRecords = response.total;
                setupPagination(currentPage); // Re-initialize/update pagination with new total and current page
                gridView.setFocus();
            } else {
                console.error("API response format error:", response);
                dataProvider.clearRows();
                totalRecords = 0;
                setupPagination(currentPage); // Still update pagination (will clear it if totalRecords is 0)
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching data: ", status, error);
            dataProvider.clearRows();
            totalRecords = 0;
            setupPagination(currentPage); // Update pagination to show no data
        },
        complete: function () {
            gridView.hideLoading(); // Hide loading indicator
        }
    });
}

function setupSorting() {
    // Ensure sorting UI is enabled in options
    // This should be in gridView.setOptions: sorting: { enabled: true, style: "exclusive" }
    // Individual columns also have `sortable: true`

    // Remove potentially incorrect handlers from previous attempts
    if (gridView.onColumnHeaderClicked) {
        gridView.onColumnHeaderClicked = null;
    }
    if (gridView.onSortingChanged) {
        gridView.onSortingChanged = null;
    }

    gridView.onSorting = function (grid, fields, directions) {
        console.log("!!! gridView.onSorting FIRED !!!");
        console.log("fields:", fields, "directions:", directions);

        if (!fields || fields.length === 0) {
            return true; // Allow default if no fields to sort by (should not happen in exclusive sort mode on click)
        }

        // For exclusive sort, we typically care about the first element.
        const fieldIndex = fields[0]; // This is the index of the column in the getColumns() array
        const sortDirection = directions[0]; // This should be RealGrid.SortDirection enum value

        // Get the column object using the index
        const column = grid.getColumns()[fieldIndex];

        if (!column || !column.fieldName) {
            console.error("onSorting: Clicked column or its fieldName is undefined. Column index was:", fieldIndex);
            return true; // Prevent error, allow default (which won't sort without fieldName)
        }

        currentSortBy = column.fieldName;
        currentSortOrder = sortDirection === RealGrid.SortDirection.ASCENDING ? 'asc' : 'desc';

        // Clear previous sort indicators from all columns
        // RealGrid might handle this with exclusive sort style, but explicit is safer for clarity
        const allColumns = grid.getColumns();
        for (let i = 0; i < allColumns.length; i++) {
            if (allColumns[i].fieldName !== currentSortBy) {
                grid.setColumnProperty(allColumns[i].fieldName, "sortDirection", null);
            }
        }
        
        // Set sort indicator for the clicked column
        // The grid might do this automatically if sort is not cancelled,
        // but explicit control is safer for server-side.
        grid.setColumnProperty(currentSortBy, "sortDirection", sortDirection);
        
        console.log(`Sorting requested: field=${currentSortBy}, order=${currentSortOrder}`);

        // Fetch data with new sorting parameters from page 1
        fetchData(1, pageSize, currentSortBy, currentSortOrder, currentSearchQuery);
        
        // Reset pagination.js to page 1 (will be re-verified in next plan step)
        // This relies on fetchData calling setupPagination(1)
        
        return false; // IMPORTANT: Prevent default client-side sorting
    };
    console.log("Sorting setup with onSorting handler.");
}

function setupSearch() {
    $('#searchButton').on('click', function () {
        currentSearchQuery = $('#searchInput').val();
        // Fetch data with search query, reset to page 1
        fetchData(1, pageSize, currentSortBy, currentSortOrder, currentSearchQuery);
    });

    $('#searchInput').on('keypress', function (e) {
        if (e.which === 13) { // Enter key
            $('#searchButton').click();
        }
    });
}

function setupPagination(targetPage) {
    // If a previous instance exists, destroy it to prevent conflicts or duplicate paginators
    if ($('#pagination-container').data('pagination')) {
        $('#pagination-container').pagination('destroy');
    }

    if (totalRecords <= 0) { // Also check for <= 0
        $('#pagination-container').html(''); // Clear the container if no records
        console.log("Pagination: No records to display.");
        return;
    }

    $('#pagination-container').pagination({
        dataSource: function(done) { // Still provide a dummy dataSource for structure if library requires it
            let dummyData = [];
            for (let i = 1; i <= totalRecords; i++) dummyData.push(i);
            done(dummyData);
        },
        totalNumber: totalRecords,
        pageSize: pageSize,
        pageNumber: targetPage || currentPage, // Set the initial page number
        showPrevious: true,
        showNext: true,
        callback: function (data, pagination) { // data is from dataSource, pagination is the state
            // Check if the page number from the callback is different from our global currentPage
            // This prevents re-fetching if we programmatically set the page which then triggers callback
            if (currentPage !== pagination.pageNumber) {
                 fetchData(pagination.pageNumber, pageSize, currentSortBy, currentSortOrder, currentSearchQuery);
            }
        }
    });
    console.log(`Pagination setup/updated: total=${totalRecords}, current page=${targetPage || currentPage}`);
}
