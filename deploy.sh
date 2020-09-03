npm run build
aws s3 rm s3://togattahanne --recursive
aws s3 cp dist/ s3://togattahanne --recursive
