# DEPLOY VARS
if [[ -z "${APP_BUCKET}" ]]; then
  echo "APP_BUCKET is missing"
  exit 1
fi

if [[ -z "${AWS_DISTRIBUTION_ID}" ]]; then
  echo "AWS_DISTRIBUTION_ID is missing"
  exit 1
fi

# BUILD
yarn
yarn run build

# UPLOAD
aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --content-type "video/webm" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.webm"

aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --content-type "image/webp" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.webp"

aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --content-type "video/mp4" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.mp4"

aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --content-type "text/css" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.css"

aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.woff"

aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.woff2"

aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --content-type "application/javascript" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.js" \
  --exclude "service-worker.js"

aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --content-type "application/json" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.css.map" \
  --include "*.js.map" \
  --exclude "service-worker.js.map"

aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --content-type "text/plain" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.txt"

aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --content-type "image/x-icon" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.ico"

aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --content-type "image/png" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.png"

aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --content-type "image/svg+xml" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.svg"

# Now deploy named files that are not cached.
# These are small lightweight files that are not hashed.
# It is important to deploy these files last,
# because they reference the previously uploaded hashed files.

aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --content-type "text/html" \
  --cache-control "no-cache" \
  --exclude "*" \
  --include "*.html"

# aws s3 cp dist/ "s3://${APP_BUCKET}/" \
#   --recursive \
#   --content-type "text/html" \
#   --cache-control "no-cache" \
#   --exclude="*/" \
#   --exclude "*/.*" \
#   --exclude "*/*"

aws s3 cp dist/ "s3://${APP_BUCKET}/" \
  --recursive \
  --content-type "application/manifest+json" \
  --cache-control "no-cache" \
  --exclude "*" \
  --include "*.webmanifest"

aws s3 cp dist/service-worker.js "s3://${APP_BUCKET}/" \
  --content-type "application/javascript" \
  --cache-control "no-cache"

aws s3 cp dist/service-worker.js.map "s3://${APP_BUCKET}/" \
  --content-type "application/json" \
  --cache-control "no-cache"

aws cloudfront create-invalidation --distribution-id "${AWS_DISTRIBUTION_ID}" --paths '/*'