FROM nginx:1.17.1-alpine
COPY /dist/angular-quiz-app /usr/share/nginx/html
