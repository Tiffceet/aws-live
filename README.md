# AWS
## EC2 Setup
1. Add a `config.py` file with the following variables set

| Variable              | Description           |
| --------------------- | --------------------- |
| customhost            | RDS database URL      |
| customuser            | RDS username          |    
| custompass            | RDS password          |
| customdb              | RDS database name     |        
| custombucket          | S3 bucket name        |       
| customregion          | AWS account region    |          

2. Run the following bash script
```bash
sudo yum update -y
sudo yum install git -y
sudo yum install mariadb -y
# git clone https://github.com/Tiffceet/aws-live
# cd aws-live
sudo python3 -m pip install flask boto3 pymysql
```

3. Start the server with
```
sudo python3 EmpApp.py
```

4. (Optional) Install autopep8 to format your code in vscode
```
python3 -m pip install autopep8
```

## RDS Setup
1. Connect to RDS
```
mysql -u admin -P 3306 --host hrmsdb.ccdclt0oc5rh.us-east-1.rds.amazonaws.com -p
```
2. Run sql from `database.sql`

## Notes
1. When creating security group, create it from the VPC page and link it to the correct VPC

2. EC2 User data
```bash
#!/bin/bash
sudo yum update -y
sudo yum install git -y
sudo yum install mariadb -y
git clone https://github.com/Tiffceet/aws-live
sudo python3 -m pip install flask boto3 pymysql
cd aws-live
sudo python3 EmpApp.py
```

3. When createing EC2, MUST attach LabRole as Instance profile; boto3 will do its job by using the given temporary access key inside EC2
Read https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html for more info