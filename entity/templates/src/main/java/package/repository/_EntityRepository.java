package <%=packageName%>.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import <%=packageName%>.domain.<%= entityClass %>;<% if (databaseType == 'sql') { %>
import org.springframework.data.jpa.repository.JpaRepository;<% if (fieldsContainOwnerManyToMany == true) { %>
import org.springframework.data.jpa.repository.Query;
<% } } %><% if (databaseType == 'nosql') { %>
import org.springframework.data.mongodb.repository.MongoRepository;<% } %><% if (fieldsContainBigDecimal == true) { %>
import java.math.BigDecimal;<% } %><% if (fieldsContainLocalDate == true) { %>
import org.joda.time.LocalDate;<% } %>

<% if (databaseType == 'sql') { %>/**
 * Spring Data JPA repository for the <%= entityClass %> entity.
 */<% } %><% if (databaseType == 'nosql') { %>/**
 * Spring Data MongoDB repository for the <%= entityClass %> entity.
 */<% } %>
public interface <%= entityClass %>Repository extends <% if (databaseType == 'sql') { %>JpaRepository<% } %><% if (databaseType == 'nosql') { %>MongoRepository<% } %><<%= entityClass %>, <% if (databaseType == 'sql') { %>Long<% } %><% if (databaseType == 'nosql') { %>String<% } %>> {

<% for (fieldId in fields) { %>
	Page<<%= entityClass %>> findBy<%=fields[fieldId].fieldName.charAt(0).toUpperCase() + fields[fieldId].fieldName.slice(1)%><% if(fields[fieldId].fieldType == 'String') { %>Like<% } %>(@Param("<%=fields[fieldId].fieldName%>")<%= fields[fieldId].fieldType %> <%=fields[fieldId].fieldName%>, Pageable pageable );
	<% } %>
	
<% if (fieldsContainOwnerManyToMany == true) { %>
    @Query("select <%= entityInstance %> from <%= entityClass %> <%= entityInstance %> <% for (relationshipId in relationships) {
        if (relationships[relationshipId].relationshipType == 'many-to-many' && relationships[relationshipId].ownerSide == true) { %>left join fetch <%= entityInstance %>.<%= relationships[relationshipId].otherEntityName %>s <% } } %>where <%= entityInstance %>.id = :id")
    <%= entityClass %> findOneWithEagerRelationships(@Param("id") Long id);
<% } %>
}
