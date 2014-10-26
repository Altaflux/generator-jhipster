'use strict';

<%= angularAppName %>.factory('<%= entityClass %>', function (DataRestRestangular, ResourceConfigurer) {

	<% var relations = [];
		for (relationshipId in relationships) {
			if (relationships[relationshipId].relationshipType == 'many-to-one') {
			relations.push(relationships[relationshipId].otherEntityName);
		}
	} %>
	var relations = <%= JSON.stringify(relations).replace(new RegExp("\"", 'g'), "\'") %>;	
	
	ResourceConfigurer('<%= entityInstance %>', relations);
	ResourceConfigurer('<%= pluralEntityInstance %>', relations);
	return DataRestRestangular.service('<%= pluralEntityInstance %>');
});
