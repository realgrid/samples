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
        { name: "id", fieldName: "id", width: "50", header: { text: "ID" }, editor: { type: "number", readOnly: true} },
        { name: "title", fieldName: "title", width: "250", header: { text: "제목" }, styleName: "left-column" },
        { name: "body", fieldName: "body", width: "400", header: { text: "내용" }, styleName: "left-column" },
        { name: "userId", fieldName: "userId", width: "70", header: { text: "사용자ID" } },
        { 
            name: "tags", 
            fieldName: "tags", 
            width: "150", 
            header: { text: "태그" },
            valueCallback: function (grid, item, fieldName, index, value) {
                return Array.isArray(value) ? value.join(', ') : '';
            }
        },
        { name: "reactions", fieldName: "reactions", width: "80", header: { text: "반응 수" } }
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
    fetchData(1, pageSize, currentSortBy, currentSortOrder, currentSearchQuery, true);
}

function fetchData(page, limit, sortBy, sortOrder, searchQuery, initializePagination = false) {
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
                totalRecords = response.total; // Total records from API

                if (initializePagination) {
                    setupPagination(); // Initialize pagination.js after first load
                }
                // Update pagination if it's already initialized (e.g., after search)
                if ($('#pagination-container').data('pagination')) {
                     $('#pagination-container').pagination('updateItems', totalRecords);
                     $('#pagination-container').pagination('drawPage', currentPage);

                }
                gridView.setFocus(); // Return focus to grid
            } else {
                console.error("API response format error:", response);
                dataProvider.clearRows();
                totalRecords = 0;
                 if (initializePagination) setupPagination(); // still setup pagination with 0 items
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching data: ", status, error);
            dataProvider.clearRows();
            totalRecords = 0;
            if (initializePagination) setupPagination(); // still setup pagination with 0 items
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
        // Check if the clicked column is one of our defined data columns that we want to be sortable
        // This simple check assumes all defined columns are sortable.
        // You could add more specific logic if some columns aren't sortable.
        if (!column || !column.fieldName) {
            return true; // Allow default behavior if it's not a data column click
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
        fetchData(1, pageSize, currentSortBy, currentSortOrder, currentSearchQuery, false);
        
        // Reset pagination.js to page 1
        if ($('#pagination-container').data('pagination')) {
            $('#pagination-container').pagination('go', 1);
        }
        
        console.log(`Sorting requested: field=${currentSortBy}, order=${currentSortOrder}`);
        return false; // Prevent default grid sorting action
    };

    // Remove the onSortingChanged handler if it exists from previous attempts
    if (gridView.onSortingChanged) {
        gridView.onSortingChanged = null;
    }
    console.log("Sorting setup with onColumnHeaderClicked.");
}

function setupSearch() {
    $('#searchButton').on('click', function () {
        currentSearchQuery = $('#searchInput').val();
        // Fetch data with search query, reset to page 1
        fetchData(1, pageSize, currentSortBy, currentSortOrder, currentSearchQuery, false); 
        if ($('#pagination-container').data('pagination')) {
            $('#pagination-container').pagination('go', 1);
        }
    });

    $('#searchInput').on('keypress', function (e) {
        if (e.which === 13) { // Enter key
            $('#searchButton').click();
        }
    });
}

function setupPagination() {
    if (totalRecords === 0 && !currentSearchQuery) { // Only show limited pages if no records initially
        // This case might happen if API fails on first load
         $('#pagination-container').pagination({
            dataSource: function(done){ // Provide a dummy source for structure
                var result = [];
                for(var i = 1; i <= 0; i++) result.push(i);
                done(result);
            },
            totalNumber: 0,
            pageSize: pageSize,
            callback: function (data, pagination) {
                // This won't be called if totalNumber is 0
            }
        });
        return;
    }

    $('#pagination-container').pagination({
        dataSource: function(done) {
            // This function is just to satisfy pagination.js if it needs a dataSource.
            // We are driving data loading externally via fetchData.
            // Create a dummy array based on totalRecords for pagination.js to calculate pages.
            let dummyData = [];
            for (let i = 1; i <= totalRecords; i++) {
                dummyData.push(i);
            }
            done(dummyData);
        },
        locator: 'items', // Not strictly needed as we handle data via callback
        totalNumber: totalRecords,
        pageSize: pageSize,
        pageNumber: currentPage,
        showPrevious: true,
        showNext: true,
        ajax: { // We don't use pagination.js internal ajax, but callback is key
            beforeSend: function() {
                // Can show a loader here if needed, but fetchData handles it
            }
        },
        callback: function (data, pagination) {
            // This callback provides `pagination.pageNumber` which is the new page.
            // `data` here would be the slice from the dummyData if dataSource was used directly.
            // We ignore `data` and use `pagination.pageNumber`.
            if (currentPage !== pagination.pageNumber) { // Avoid re-fetching if page hasn't changed
                 fetchData(pagination.pageNumber, pageSize, currentSortBy, currentSortOrder, currentSearchQuery, false);
            }
        }
    });
}
