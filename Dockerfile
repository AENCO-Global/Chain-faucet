FROM node:8-alpine
LABEL "maintainer"="Simon Ball <simon.ball@aencoin.com>"

ARG BUILD_ID=LocalRun

COPY server /root/.aen/faucet
COPY bin /root/.aen/bin
COPY supervisor/conf.d /root/.aen/supervisor

# Install some basic packages
RUN mkdir -p /root/.aen/var \
  && apk --update add bash g++ make procps supervisor

# Overwrite the default supervisor configuration
COPY supervisor/supervisord.conf /etc/supervisord.conf

RUN sed -i "s/###BUILD###/$BUILD_ID/g" /root/.aen/faucet/package.json

EXPOSE 8888
WORKDIR /root/.aen
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
