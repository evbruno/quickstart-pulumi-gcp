import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";


// class QuickStartResources extends pulumi.ComponentResource {
// }

// Create a GCP resource (Storage Bucket)
const bucket = new gcp.storage.Bucket("my-bucket-v2", {
    location: "US"
});

const topic = new gcp.pubsub.Topic("my-topic", {}, {});

// Export the DNS name of the bucket
export const bucketName = bucket.url;

export const topicId = topic.id;
