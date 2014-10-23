<%= angularAppName %>.factory('Pageable', function() {
    var Pageable = function(resource, pagedData) {

        var sort_order = "id";
        var sort_direction = "asc";
        var _more;
        var _less;
        var _page;
        var _totalPages;
        var limit = 20;
        var _number;
        var _totalElements;
        var _pagedData = pagedData;

        var search = function() {
            var sortBy = sort_order + ',' + sort_direction;
            resource.getList({
                sort: sortBy,
                limit: limit,
                page: _page
            }).then(function(data) {
				if(data.page){
					_more = !(data.page.number === data.page.totalPages - 1);
					_less = !(data.page.number === 0);
					_number = data.page.number;
					_totalPages = data.page.totalPages;
					_totalElements = data.page.totalElements;
				}
                _pagedData = data;
            });
        };

        var sort = function(col) {
            if (sort_direction === "desc") {
                sort_direction = "asc";
            } else if (sort_direction === "asc") {
                sort_direction = "desc";
            }
            sort_order = col;
            search();
        }

        var show_next = function() {
            if (_more) {
                _page++;
                search();
            }
        };

        var show_previous = function() {
            if (_less) {
                _page--;
                search();
            }
        };

        var has_more = function() {
            if (_more) {
                return "acitve";
            } else {
                return "disabled";
            }
        };

        var has_less = function() {
            if (_less) {
                return "acitve";
            } else {
                return "disabled";
            }
        };

        var reset = function() {
            limit = 20;
            _page = 0;
            authors = [];
            _more = true;
            _less = false;
            search();
        };

        var data = function() {
            return _pagedData;
        }

        var totalPages = function() {
            return _totalPages;
        }

        var sortDirection = function() {
            return sort_direction;
        }

        var sortOrder = function() {
            return sort_order;
        }
        var totalElements = function() {
            return _totalElements;
        }

        var number = function() {
            return _number;
        }

        var removeElement = function(element) {
            var index = _pagedData.indexOf(element);
            if (index > -1) _pagedData.splice(index, 1);
        }

        if (pagedData) {
			if(pagedData.page){
				_more = !(pagedData.page.number === pagedData.page.totalPages - 1);
				_less = !(pagedData.page.number === 0);
				_page = pagedData.page.number;
				_totalPages = pagedData.page.totalPages;
				_totalElements = pagedData.page.totalElements;
			}
        } else {
            _page = 0;
            search();
        }

        return {
            has_more: has_more,
            has_less: has_less,
            show_next: show_next,
            show_previous: show_previous,
            sort: sort,
            search: search,
            reset: reset,
            number: number,
            totalPages: totalPages,
            totalElements: totalElements,
            data: data,
            sortOrder: sortOrder,
            sortDirection: sortDirection,
            removeElement: removeElement
        }
    }
    return Pageable;
});
