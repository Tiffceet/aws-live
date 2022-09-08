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
| aws_access_key_id     | AWS access key id     |                
| aws_secret_access_key | AWS access secret access key id |                
| aws_session_token     | AWS session token     |                

2. Run the following bash script
```bash
#!/bin/bash
sudo yum update -y
sudo yum install git -y
sudo yum install mariadb -y
# git clone https://github.com/lowchoonkeat/aws-live.git
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