package com.task_tracker.tasks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the Task Tracker Spring Boot application.
 * 
 * Spring Boot Application Bootstrap Process:
 * =========================================
 * 
 * 1. @SpringBootApplication Annotation:
 *    - Combined annotation that includes:
 *      * @Configuration: Marks this class as a source of bean definitions
 *      * @EnableAutoConfiguration: Enables Spring Boot's auto-configuration mechanism
 *      * @ComponentScan: Scans for components in current package and sub-packages
 * 
 * 2. Application Startup Flow:
 *    - JVM calls the main() method first
 *    - SpringApplication.run() bootstraps the entire Spring application:
 *      a. Determines if running as web application (Servlet or Reactive)
 *      b. Sets up default configuration
 *      c. Starts the Spring ApplicationContext
 *      d. Performs classpath scanning (finds @Component, @Service, @Repository, @Controller, etc.)
 *      e. Registers all beans in the ApplicationContext
 *      f. Processes @Configuration classes
 *      g. Triggers auto-configuration based on classpath dependencies
 *      h. Applies properties from application.properties/yml
 *      i. Starts embedded web server (Tomcat by default)
 *      j. Initializes DispatcherServlet for handling HTTP requests
 * 
 * 3. Auto-Configuration Magic:
 *    - Automatically configures beans based on the classpath and properties:
 *      * Detects spring-boot-starter-data-jpa → Configures JPA repositories
 *      * Detects PostgreSQL driver → Configures database connection
 *      * Detects Tomcat → Configures embedded web server
 *      * And many more...
 * 
 * 4. Key Components Automatically Created:
 *    - DataSource for database connections
 *    - EntityManagerFactory for JPA operations
 *    - TransactionManager for database transactions
 *    - JpaRepositories for data access
 *    - Web server and DispatcherServlet
 *    - JSON/HTTP message converters
 * 
 * 5. Production-Ready Features:
 *    - Automatic configuration of logging
 *    - Externalized configuration (application.properties)
 *    - Environment profiles
 *    - Graceful shutdown handling
 */
@SpringBootApplication
public class TasksApplication {

	public static void main(String[] args) {
		// This single line replaces hundreds of lines of configuration code
		// that would be needed in traditional Spring applications
		SpringApplication.run(TasksApplication.class, args);
	}

}
