import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const name = 'quickstart';

const bucket = new gcp.storage.Bucket(`bucket-${name}`, {
    location: "US"
});

const topic = new gcp.pubsub.Topic(`topic-${name}`, {}, {});

const sa = new gcp.serviceaccount.Account(
  "my-service-account",
  {
    accountId: pulumi.interpolate`sa-${name}`,
  }
);

new gcp.storage.BucketIAMMember(
  `${name}-bucket-iam`,
  {
    bucket: bucket.id,
    member: pulumi.interpolate`serviceAccount:${sa.email}`,
    role: 'roles/storage.objectAdmin',
  }
);

new gcp.pubsub.TopicIAMMember(
  `${name}-topic-iam`,
  {
    topic: topic.id,
    member: pulumi.interpolate`serviceAccount:${sa.email}`,
    role: 'roles/pubsub.publisher',
  }
);

// Export the DNS name of the bucket
export const bucketName = bucket.url;
export const topicId = topic.id;
export const topicName = topic.name;
export const saEmail = sa.email;
