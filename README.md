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
sudo git clone https://github.com/Tiffceet/aws-live
cd aws-live
sudo python3 -m pip install flask boto3 pymysql
sudo touch config.py
echo customhost = \"hrmsdb.ccdclt0oc5rh.us-east-1.rds.amazonaws.com\" | sudo tee -a config.py
echo customuser = \"admin\" | sudo tee -a config.py
echo custompass = \"admin123\" | sudo tee -a config.py
echo customdb = \"employee\" | sudo tee -a config.py
echo custombucket = \"loozikang-employee\" | sudo tee -a config.py
echo customregion = \"us-east-1\" | sudo tee -a config.py
echo aws_access_key_id=\"ASIA2JLL2O2P4PCKQ256\" | sudo tee -a config.py
echo aws_secret_access_key=\"Yft3RizQGrvSZBPce6L2EVF2h/obPZ6rjLnVQ5uq\" | sudo tee -a config.py
echo aws_session_token=\"FwoGZXIvYXdzEI3//////////wEaDAMoeelwglVPFamWxiLPARoAdPiyb+6fXM0UI4qqnlAsuuY+PuWYBInBKbssQUgXtCbaG1eHG1GvxVci4Zuaj7cxF1cVv73QKza99drn1J8VrpXeebDxDIWowWkL0rGvBi8Zx/IBM1dxn2YDR7YcqOnayzqh62OB5tffAmi3Xm2UeQagyIftIL6OP8s4XSBx8UX0ePzUnV2WHabYYkwdEo9n23RM6Ly2Jd4WNPxNbD2c+V5DL8hwWrq8oOyJHdGN8P4xAgzxT64b+DXymz4EbLLjaWeja8B7oye5yfzkIijjlpqZBjItU/avUP269yUfSWuEEzBj9VuvXR/gPwGhzHjaZnOgEfrXFyQ8mDlVPPpmsFPo\" | sudo tee -a config.py
sudo python3 EmpApp.py
```