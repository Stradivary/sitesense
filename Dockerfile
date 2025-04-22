FROM new.cicd-jfrog.telkomsel.co.id/docker/node:20.18.2-alpine AS base

# the install and build is already done in compile stage in the gitlabci pipeline
# we just need to copy the build artifacts from the compile stage
FROM base AS builder
WORKDIR /app

# copy requirements, .next/standalone and .next/static and public
COPY .next/standalone ./.next/standalone
COPY .next/static ./.next/static
COPY public ./public

### Production image runner ###
FROM base AS runner

WORKDIR /

# Set NODE_ENV to production
ENV NODE_ENV=production

# Disable Next.js telemetry
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Set correct permissions for nextjs user and don't run as root
RUN addgroup apps && \
	  adduser -SDH potloc && \
	  mkdir -p .next/cache && chown -R potloc:apps .next

WORKDIR /app
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=potloc:apps /app/.next/standalone ./
COPY --from=builder --chown=potloc:apps /app/.next/static ./.next/static
COPY --from=builder --chown=potloc:apps /app/public ./public
USER potloc

# Exposed port (for orchestrators and dynamic reverse proxies)
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV https_proxy="http://prelly.telkomsel.co.id:8080"
ENV http_proxy="http://prelly.telkomsel.co.id:8080"

# Run the nextjs app
CMD ["node", "server.js"]