FROM nginx:1.25.4

WORKDIR /app

COPY ./src/ .

COPY --chown=www-data ./src/ /app

COPY --chown=www-data ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000