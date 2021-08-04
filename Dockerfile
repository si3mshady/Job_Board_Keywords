FROM nginx:latest

LABEL developer=ElliottLamarArnold

WORKDIR /usr/share/nginx/html

COPY build /usr/share/nginx/html

EXPOSE 80

#  si3mshady/popularlanguages-fe:1