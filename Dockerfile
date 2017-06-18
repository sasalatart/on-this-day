FROM node:7-onbuild

MAINTAINER Sebastian Salata R-T <SA.SalataRT@GMail.com>

ENV NODE_ENV=production

RUN npm run build

EXPOSE 9000

CMD ["npm", "start"]
