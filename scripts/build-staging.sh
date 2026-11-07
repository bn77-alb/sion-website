#!/bin/bash
# Builds the staging preview (hidden from search engines) into dist-staging/.
# Published to https://bn77-alb.github.io/ (repo bn77-alb/bn77-alb.github.io, branch main).
set -e
cd "$(dirname "$0")/.."
PUBLIC_STAGING=1 PUBLIC_FORM_ENDPOINT=https://norvia2.app.n8n.cloud/webhook/sion-website-forms-staging npx astro build --outDir dist-staging
rm -f dist-staging/CNAME
printf 'User-agent: *\nDisallow: /\n' > dist-staging/robots.txt
touch dist-staging/.nojekyll
