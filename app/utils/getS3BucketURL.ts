export const getS3BucketURL = (id: string) => {
  return `${process.env.AWS_S3_BUCKET_URL}/${id}`;
};
