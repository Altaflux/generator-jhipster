'use strict';

<%= angularAppName %>.factory('<%= entityClass %>', function (DataRestRestangular, ResourceConfigurer) {

	var relations = ['self'<% for (relationshipId in relationships) {
    if (relationships[relationshipId].relationshipType == 'many-to-one') {
        var otherEntityName = relationships[relationshipId].otherEntityName;
                        %>,'<%=otherEntityName %>'<% } } %>];
						
	ResourceConfigurer('<%= entityInstance %>', relations);
	return DataRestRestangular.service('<%= entityInstance %>s');
});
