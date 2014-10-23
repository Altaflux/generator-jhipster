package <%=packageName%>.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import java.net.URI;

@Configuration
public class DataRestConfigurer extends RepositoryRestMvcConfiguration {

    @Override
    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        super.configureRepositoryRestConfiguration(config);
        try {
           config.setBaseUri(new URI("/app/rest/api"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}