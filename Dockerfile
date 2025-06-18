FROM oven/bun

WORKDIR /app

COPY . .

RUN bun install
RUN bunx prisma generate

CMD ["bun", "src/index.ts"]
