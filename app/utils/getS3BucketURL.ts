export const getS3BucketURL = (id: string) => {
  return `${process.env.S3_BUCKET_URL_AWS}/${id}`;
};
