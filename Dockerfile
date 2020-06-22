FROM node:10.13.0

LABEL maintainer = "Mure <405348097@qq.com>"

RUN mkdir -p /home/www/hellokoa
WORKDIR /home/www/hellokoa

COPY . /home/www/hellokoa

RUN yarn install

ENV HOST 0.0.0.0
ENV PORT 3003

EXPOSE 3003

CMD npm run dev
