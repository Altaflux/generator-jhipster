'use strict';

<%= angularAppName %>.controller('<%= entityClass %>Controller', function ($scope, Pageable, resolved<%= entityClass %>, <%= entityClass %><% for (relationshipId in relationships) { %>, resolved<%= relationships[relationshipId].otherEntityNameCapitalized %><% } %>) {

        $scope.<%= entityInstance %>s = resolved<%= entityClass %>;<% for (relationshipId in relationships) { %>
        $scope.<%= relationships[relationshipId].otherEntityName %>s = resolved<%= relationships[relationshipId].otherEntityNameCapitalized %>;<% } %>
		$scope.<%= entityInstance %> = <%= entityClass %>.one();
		
		$scope.pagingData = new Pageable(<%= entityClass %>, resolved<%= entityClass %>);
		
        $scope.create = function () {
			$scope.<%= entityInstance %>.save().then(function(){
			    $scope.pagingData.search();
                $('#save<%= entityClass %>Modal').modal('hide');
                $scope.clear();
			});
        };

        $scope.update = function (id) {			
			<%= entityClass %>.one(id).get().then(function(response){
				$scope.<%= entityInstance %> = response;
				$('#save<%= entityClass %>Modal').modal('show');
			});
        };

        $scope.delete = function (id) {
		    id.get().then(function(response){
                response.remove().then(function(){
					$scope.pagingData.removeElement(id);
                });
            });
        };

        $scope.clear = function () {
            $scope.<%= entityInstance %> = <%= entityClass %>.one();
        };
    });
