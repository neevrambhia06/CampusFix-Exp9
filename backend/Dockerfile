# ==========================================
# Fixora Backend Dockerfile
# Multi-stage build for Spring Boot on Render
# ==========================================

# Stage 1: Build with Maven
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copy Maven wrapper and pom.xml first (layer caching)
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Download dependencies (cached layer)
RUN chmod +x mvnw && ./mvnw dependency:resolve -B

# Copy source code and build
COPY src/ src/
RUN ./mvnw clean package -DskipTests -B

# Stage 2: Runtime image
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the built JAR
COPY --from=build /app/target/campusfix-backend.jar app.jar

# Render sets the PORT env variable
EXPOSE ${PORT:-8080}

# Run with Render's PORT
ENTRYPOINT ["java", "-jar", "app.jar"]
