# AWS

## VPC Setup

-   3 Availablity Zone
-   1 NAT in one AZ
-   All public subnet: Auto assign public IPv4 address

## S3 Setup

1. Bucket name: `loozikang-employee`
2. Uncheck "Block all public access"
3. Set bucket policy to allow all bucket items to be read-only by anonymous user [Read More](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html#example-bucket-policies-use-case-2)

## RDS Setup
1. Username: admin
    Password: admin123
2. Connect to an EC2 compute resource
3. No public access
4. Select security group
5. Connect to RDS

```
mysql -u admin -P 3306 --host hrmsdb.ccdclt0oc5rh.us-east-1.rds.amazonaws.com -p
```

6. Run sql commands in `database.sql`

## EC2 Setup

1. Run the following commands

```bash
# Install dependencies
sudo yum update -y
sudo yum install git -y
sudo yum install mariadb -y
sudo python3 -m pip install flask boto3 pymysql

# Clone source code in root folder
cd /
sudo git clone https://github.com/Tiffceet/aws-live
cd aws-live
```

2. Test if the server works with `sudo python3 EmpApp.py`

3. Create AMI with this EC2 instance

4. Attach LabRole as Instance Profile (Ctrl + F : AMI)

5. Launch template attach LabRole as Instance Profile (Ctrl + F : AMI)

## Load Balancer & Auto Scaling

1. Create target group - A group of EC2 instance to be targeted for load balancing
2. Create launch template - For auto scaling to create a new instance
3. Create load balancer - To put in front of target group; Front-facing client
4. Create auto scaling group - Increase or decrease EC2 instance based on auto-scaling policy

## Additional Notes

1. When creating security group, create it from the VPC page and link it to the correct VPC

2. EC2 User data for launch template

```bash
#!/bin/bash
cd aws-live
sudo python3 EmpApp.py
```

3. When createing EC2, MUST attach LabRole as Instance profile; boto3 will do its job by using the given temporary access key inside EC2 [Read More](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html)

4. `config.py` content description

| Variable     | Description        |
| ------------ | ------------------ |
| customhost   | RDS database URL   |
| customuser   | RDS username       |
| custompass   | RDS password       |
| customdb     | RDS database name  |
| custombucket | S3 bucket name     |
| customregion | AWS account region |
