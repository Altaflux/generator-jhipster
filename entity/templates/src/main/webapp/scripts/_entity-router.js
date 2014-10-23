'use strict';

<%= angularAppName %>
    .config(function ($routeProvider, $httpProvider, $translateProvider, USER_ROLES) {
            $routeProvider
                .when('/<%= entityInstance %>', {
                    templateUrl: 'views/<%= entityInstance %>s.html',
                    controller: '<%= entityClass %>Controller',
                    resolve:{
                        resolved<%= entityClass %>: ['<%= entityClass %>', function (<%= entityClass %>) {
                            return <%= entityClass %>.getList();
                        }]<% for (relationshipId in relationships) {
                            var relationshipClass = relationships[relationshipId].otherEntityNameCapitalized;%>,
                        resolved<%=relationshipClass%>: ['<%=relationshipClass%>', function (<%=relationshipClass%>) {
                            return <%=relationshipClass%>.getList();
                        }]<% } %>
                    },
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
        });
