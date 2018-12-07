FROM node:8-alpine
LABEL "maintainer"="Simon Ball <simon.ball@aencoin.com>"

COPY server /root/.aen/faucet
COPY bin /root/.aen/bin
COPY supervisor /root/.aen/supervisor

WORKDIR /root/.aen
RUN mkdir -p /root/.aen/var \
  && apk --update add bash g++ make procps supervisor

EXPOSE 8888

CMD ["/usr/bin/supervisord", "-c", "/root/.aen/supervisor/supervisord.conf"]
