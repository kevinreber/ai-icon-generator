export const getS3BucketThumbnailURL = (id: string) => {
  return `${process.env.S3_BUCKET_THUMBNAIL_URL_AWS}/resized-${id}`;
};
