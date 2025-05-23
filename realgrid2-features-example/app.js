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
        sortMode: "exclusive", // Use 'exclusive' for single column sort
        sorting: {
            enabled: true, // Enable header click for sorting UI, but we'll handle data fetching
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
    // Ensure sorting UI is enabled in options, but we'll control the logic
    // This was set in gridView.setOptions: sorting: { enabled: true }

    gridView.onColumnHeaderClicked = function (grid, column, button, clickData) {
        console.log("!!! gridView.onColumnHeaderClicked FIRED !!!"); // Prominent log
        console.log("Clicked column object:", column);
        console.log("Clicked column fieldName:", column ? column.fieldName : "N/A");
            
        // Check if the clicked column is one of our defined data columns that we want to be sortable
        // This simple check assumes all defined columns are sortable.
        // You could add more specific logic if some columns aren't sortable.
        if (!column || !column.fieldName) {
            console.log("onColumnHeaderClicked: Column or column.fieldName is undefined. Allowing default behavior.");
            return true; 
        }

        const clickedFieldName = column.fieldName;

        if (currentSortBy === clickedFieldName) {
            currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            currentSortBy = clickedFieldName;
            currentSortOrder = 'asc'; // Default to ascending for a new column
        }

        // Clear previous sort indicators from all columns
        const allColumns = grid.getColumns();
        for (let i = 0; i < allColumns.length; i++) {
            if (allColumns[i].fieldName !== currentSortBy) {
                grid.setColumnProperty(allColumns[i].fieldName, "sortDirection", null);
            }
        }
        
        // Set sort indicator for the clicked column
        grid.setColumnProperty(currentSortBy, "sortDirection", currentSortOrder === 'asc' ? RealGrid.SortDirection.ASCENDING : RealGrid.SortDirection.DESCENDING);

        // Fetch data with new sorting parameters from page 1
        fetchData(1, pageSize, currentSortBy, currentSortOrder, currentSearchQuery);
        
        console.log(`Sorting requested: field=${currentSortBy}, order=${currentSortOrder}`);
        return false; // Prevent default grid sorting action
    };

    // Remove the onSortingChanged handler if it exists from previous attempts
    if (gridView.onSortingChanged) {
        gridView.onSortingChanged = null;
    }
    console.log("Sorting setup with onColumnHeaderClicked (with diagnostic log).");
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
