package <%=packageName%>.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import java.net.URI;

@Configuration
public class DataRestConfigurer extends RepositoryRestMvcConfiguration {

    private final Logger log = LoggerFactory.getLogger(DataRestConfigurer.class);
	
    @Override
    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        super.configureRepositoryRestConfiguration(config);
        config.setMaxPageSize(Integer.MAX_VALUE);
        try {
            config.setBaseUri(new URI("/app/rest/api"));
        } catch (URISyntaxException e) {
            log.error("Spring Data Rest configuration failed", e);
        }

    }
}