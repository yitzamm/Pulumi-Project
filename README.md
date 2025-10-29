# Pulumi + AWS Infrastructure as Code Project
October 28, 2025

<img width="250" height="250" alt="Image" src="https://github.com/user-attachments/assets/03e20b2d-b5e9-4a7e-8287-edb506d2c9ce" />

This mini-project demonstrates how to provision and manage AWS resources programmatically using Pulumi, an open-source Infrastructure-as-Code (IaC) framework that uses familiar programming languages instead of YAML or JSON. The project covers the complete workflow — from environment setup to resource deployment — using both the Pulumi CLI and AWS CLI.

## Key Objectives

1. Learn how to install, configure, and integrate Pulumi with the AWS CLI.
2. Initialize and configure a Pulumi project and stack.
3. Define AWS resources using TypeScript (or your chosen language).
4. Automate the deployment and management of cloud infrastructure.

## Implemented Resources

**S3 Bucket –** Provisioned through Pulumi for object storage.

**S3 Object –** Uploaded and managed programmatically.

**S3 Website Hosting –** Configured static website hosting directly on the bucket.

**Bucket Ownership Controls –** Applied best practices for modern S3 ownership and ACL management.

**Bucket Policy and Access Controls –** Enabled public read access for static website files (where applicable).

## Outcome

By the end of this project, the entire S3 static website setup is automated through code, eliminating manual configuration in the AWS Console. The project reinforces key Infrastructure-as-Code principles such as version control, reproducibility, and automated provisioning, forming a foundation for larger Pulumi-based cloud deployments.
