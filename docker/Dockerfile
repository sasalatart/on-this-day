FROM node:12.16-alpine3.11 AS builder

WORKDIR /build

COPY package.json yarn.lock .yarnclean tsconfig.json ./
COPY packages packages
RUN yarn install --frozen-lockfile
RUN yarn build

###

FROM node:12.16-alpine3.11

LABEL maintainer="Sebastian Salata R-T <sa.salatart@gmail.com>"

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnclean README.md ./

COPY --from=builder /build/packages/eslint-config/package.json packages/eslint-config/
COPY --from=builder /build/packages/eslint-config/index.js packages/eslint-config/

COPY --from=builder /build/packages/shared/build packages/shared/build
COPY --from=builder /build/packages/shared/package.json packages/shared/package.json

COPY --from=builder /build/packages/server/build packages/server/build
COPY --from=builder /build/packages/server/package.json packages/server/package.json

COPY --from=builder /build/packages/client/build packages/client/build
COPY --from=builder /build/packages/client/package.json packages/client/package.json

RUN yarn install --production

ENTRYPOINT ["yarn"]
CMD ["start"]
