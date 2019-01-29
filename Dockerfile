FROM node:carbon

WORKDIR /usr/src/facerecongnitionbrainAPI

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]