"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket");

// Create the ownership controls

// Bucket Ownership Controls
/// In Amazon S3, object ownership determines who owns the objects inside a bucket.
/// By default, the AWS account that uploads an object owns it — even if the bucket belongs to a different account.
/// This can cause access control problems (especially with cross-account uploads, CI/CD pipelines, or public website deployments), because the bucket owner might not automatically have permissions on objects uploaded by others.

// Object Ownership Rules
/// -> "BucketOwnerPreferred": S3 automatically changes ownership of uploaded objects to the bucket owner. Best for most use cases, especially static websites, CI/CD, or cross-account uploads.
/// -> "BucketOwnerEnforced": Disables ACLs entirely — the bucket owner owns all objects, and access is controlled only by IAM policies. Recommended for modern setups — aligns with AWS’ push toward “ACLs disabled” buckets.
/// -> "ObjectWriter": The uploader owns the object. Rarely used today — mainly for legacy setups or when multiple accounts intentionally own their own objects.

const ownershipControls = new aws.s3.BucketOwnershipControls("ownership-controls", {
    bucket: bucket.id,
    rule: {
        objectOwnership: "ObjectWriter"
    }
});

// Disable the public access block 
const publicAccessBlock = new aws.s3.BucketPublicAccessBlock("public-access-block", {
    bucket: bucket.id,
    blockPublicAcls: false,
});

// Create a public website
const website = new aws.s3.BucketWebsiteConfiguration("website", {
    bucket: bucket.id,
    indexDocument: {
        suffix: "index.html",
    }
});

// Create an S3 bucket object
const bucketObject = new aws.s3.BucketObject("index.html", {
    bucket: bucket.id,
    source: new pulumi.asset.FileAsset("./index.html"),
    contentType: "text/html",
    acl: "public-read",
}, { dependsOn: [publicAccessBlock,ownershipControls,website] });

// Export the name of the bucket
exports.bucketName = bucket.id;
exports.bucketEndpoint = pulumi.interpolate`http://${website.websiteEndpoint}`;

// Interpolate
/// pulumi.interpolate is Pulumi’s way of combining strings with dynamic outputs (values that only exist at deploy time, like bucket endpoints, ARNs, etc.).
/// pulumi.interpolate is a Pulumi helper that lets you safely embed Output values in strings.

// NOTE: The ASCII code for the backticks is left ALT + 96
