'use strict';

<%= angularAppName %>.controller('<%= entityClass %>Controller', function ($scope, Pageable, resolved<%= entityClass %>, <%= entityClass %><% for (relationshipId in relationships) { %>, resolved<%= relationships[relationshipId].otherEntityNameCapitalized %><% } %>) {

        $scope.<%= pluralEntityInstance %> = resolved<%= entityClass %>;<% for (relationshipId in relationships) { %>
        $scope.<%= relationships[relationshipId].otherEntityNamePluralized %> = resolved<%= relationships[relationshipId].otherEntityNameCapitalized %>;<% } %>
		$scope.<%= entityInstance %> = <%= entityClass %>.one();
		
		$scope.pagingData = new Pageable(<%= entityClass %>, $scope.<%= pluralEntityInstance %>);
		<% var searchMethods = [];
			for (fieldId in fields) {
				var likeMethod = '';
				if(fields[fieldId].fieldType == 'String'){likeMethod = 'Like';}
				searchMethods.push({desc: 'By ' + fields[fieldId].fieldName + ' ' + likeMethod, url: 'findBy' + fields[fieldId].fieldName.charAt(0).toUpperCase() + fields[fieldId].fieldName.slice(1) + likeMethod, param : fields[fieldId].fieldName, like : fields[fieldId].fieldType == 'String'});
		} %>
		$scope.searchMethods = <%= JSON.stringify(searchMethods).replace(new RegExp("\"", 'g'), "\'") %>;
		
		$scope.setSearchMehod = function(method){
			$scope.searchMethod = method;
		}
		
		$scope.startSearch = function(){
			$scope.pagingData.startSearch($scope.searchMethod);
		}
		
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
