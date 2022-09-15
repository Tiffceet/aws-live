from flask import Flask, render_template, request
from pymysql import connections
import os
import boto3
from config import customhost, customuser, custompass, customdb, custombucket, customregion, aws_access_key_id, aws_secret_access_key, aws_session_token

session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    aws_session_token=aws_session_token
)


app = Flask(__name__)

bucket = custombucket
region = customregion

db_conn = connections.Connection(
    host=customhost,
    port=3306,
    user=customuser,
    password=custompass,
    db=customdb

)
output = {}
table = 'employee'


@app.route("/", methods=['GET'])
def home():
    return render_template('Home.html')


@app.route("/view", methods=['GET'])
def view():
    return render_template('ViewEmp.html')


@app.route("/add", methods=['GET'])
def add():
    return render_template('AddEmpForm.html')


@app.route("/edit", methods=['GET'])
def edit():
    return render_template('EditEmpForm.html')


@app.route("/getemp", methods=['POST'])
def GetEmp():
    emp_id = request.form["emp_id"]
    with db_conn.cursor() as cursor:
        sql = "SELECT * FROM employee WHERE `emp_id`=%s"
        cursor.execute(sql, (emp_id))
        result = cursor.fetchone()
        if result is None:
            return render_template("GetEmp.html", output=f"Employee ID {emp_id} not found.<br>")
        else:
            return render_template("GetEmp.html", output=f"""
            Employee ID:<br> { result[0] } <br><br>

			  		First Name:<br> { result[1] } <br><br>

			  		Last Name:<br> { result[2] } <br><br>

			  		Primary Interest:<br> { result[3] } <br><br>

			  		Location:<br> { result[4] } <br><br>

			  		Image URL: <br> http://www.google.com <br><br>
            """)


@app.route("/addemp", methods=['POST'])
def AddEmp():
    emp_id = request.form['emp_id']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    pri_skill = request.form['pri_skill']
    location = request.form['location']
    emp_image_file = request.files['emp_image_file']

    insert_sql = "INSERT INTO employee VALUES (%s, %s, %s, %s, %s)"
    cursor = db_conn.cursor()

    if emp_image_file.filename == "":
        return "Please select a file"

    try:

        cursor.execute(insert_sql, (emp_id, first_name,
                       last_name, pri_skill, location))
        db_conn.commit()
        emp_name = "" + first_name + " " + last_name
        # Uplaod image file in S3 #
        emp_image_file_name_in_s3 = "emp-id-" + str(emp_id) + "_image_file"
        s3 = session.resource('s3')

        try:
            print("Data inserted in MySQL RDS... uploading image to S3...")
            s3.Bucket(custombucket).put_object(
                Key=emp_image_file_name_in_s3, Body=emp_image_file)
            bucket_location = session.client(
                's3').get_bucket_location(Bucket=custombucket)
            s3_location = (bucket_location['LocationConstraint'])

            if s3_location is None:
                s3_location = ''
            else:
                s3_location = '-' + s3_location

            object_url = "https://s3{0}.amazonaws.com/{1}/{2}".format(
                s3_location,
                custombucket,
                emp_image_file_name_in_s3)

        except Exception as e:
            return str(e)

    finally:
        cursor.close()

    print("all modification done...")
    return render_template('AddEmpOutput.html', name=emp_name)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
