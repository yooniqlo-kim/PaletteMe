# backend/paletteme/Dockerfile
FROM openjdk:17
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
CMD ["java", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]