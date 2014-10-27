package <%=packageName%>.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DataRestConfigurer extends RepositoryRestMvcConfiguration {

    private final Logger log = LoggerFactory.getLogger(DataRestConfigurer.class);
	
    @Override
    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        super.configureRepositoryRestConfiguration(config);
        try {
            config.setBaseUri(new URI("/app/rest/api"));
        } catch (URISyntaxException e) {
            log.error("Spring Data Rest configuration failed", e);
        }

    }
}