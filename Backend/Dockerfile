# --- Build Stage ---
FROM maven:3.9.4-amazoncorretto-21 AS build

WORKDIR /workspace

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn package -DskipTests -B

# --- Run Stage ---

FROM amazoncorretto:21.0.7-alpine3.21

WORKDIR /app

COPY --from=build /workspace/target/tasks-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]