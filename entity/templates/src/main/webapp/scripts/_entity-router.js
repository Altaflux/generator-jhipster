'use strict';

<%= angularAppName %>
    .config(function ($routeProvider, $httpProvider, $translateProvider, USER_ROLES) {
            $routeProvider
                .when('/<%= entityInstance %>', {
                    templateUrl: 'views/<%= pluralEntityInstance %>.html',
                    controller: '<%= entityClass %>Controller',
                    resolve:{
                        resolved<%= entityClass %>: ['<%= entityClass %>', function (<%= entityClass %>) {
                            return <%= entityClass %>.getList();
                        }]<% for (relationshipId in relationships) {
                            var relationshipClass = relationships[relationshipId].otherEntityNameCapitalized;%>,
                        resolved<%=relationshipClass%>: ['<%=relationshipClass%>', function (<%=relationshipClass%>) {
                            return <%=relationshipClass%>.getList({limit: 2147483647});
                        }]<% } %>
                    },
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
        });
