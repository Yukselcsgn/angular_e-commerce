FROM nginx:alpine

# Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Angular browser output
COPY dist/ng-ecommerce/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
