
from flask import Flask, jsonify, request
from flask_cors import CORS 
import psycopg2
from psycopg2 import connect, extras
from psycopg2.extras import DictCursor
import pickle
from datetime import datetime
import os
import numpy as np
from Functions.spam_call_detection import SpamCallDetection
from Functions.spam_url_detection import URLdetection

# from spam_bitcoin_detection import BitcoinAddressDetection
from Functions.upi_verification import UPI_Verification
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import nltk
from nltk.corpus import stopwords
from collections import Counter
import Functions.spamham as sh

nltk.download("stopwords")

DB_CONFIG3 = {
    "host": "localhost",
    "database": "System_Database22",
    "user": "postgres",
    "password": "root",
    "port": 5432  
}

connection = psycopg2.connect(**DB_CONFIG3)
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'Hello, this is the root URL of all '



@app.route('/api/transactions/<sender_account>', methods=['GET'])
def get_transactions(sender_account):
    try:
        conn = psycopg2.connect(**DB_CONFIG3)
        cursor = conn.cursor()

        query = f"SELECT * FROM system_transaction WHERE sender_account = '{sender_account}'"
        cursor.execute(query)
        transactions = cursor.fetchall()

        transaction_list = []
        for transaction in transactions:
            transaction_dict = {
                'transactionid': transaction[0],
                'transactiontype': transaction[1],
                'oldbalanceorg': transaction[2],
                'newbalanceorig': transaction[3],
                'oldbalancedest': transaction[4],
                'newbalancedest': transaction[5],
                'transaction_date': str(transaction[6]),
                'sender_account': transaction[7],
                'receiver_account': transaction[8],
                'ip_address_sender': transaction[9],
                'fraud_transaction': transaction[10],
                 'amount': transaction[11]
            }
            transaction_list.append(transaction_dict)

        return transaction_list

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        if conn:
            conn.close()
        


        
@app.route('/api/users', methods=['GET'])
def get_all_users():
    conn = None
    try:
        conn = psycopg2.connect(**DB_CONFIG3)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM system_account;")
        users_data = cursor.fetchall()
        column_names = [desc[0] for desc in cursor.description]
        users_list = []

        for system_account_row in users_data :
            user_dict = {column_names[i]: system_account_row[i] for i in range(len(column_names))}
            users_list.append(user_dict)


        if users_data:
            return jsonify(users_list)
        else:
            return jsonify({'error': 'User not found'}), 404    
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn:
            conn.close()


@app.route('/api/users/<int:customer_id>', methods=['GET'])
def get_user_by_id(customer_id):
    try:
        conn = psycopg2.connect(**DB_CONFIG3)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM system_account WHERE customer_id = %s;", (customer_id,))
        user_data = cursor.fetchone()

        if user_data:
            column_names = [desc[0] for desc in cursor.description]
            user_dict = {column_names[i]: user_data[i] for i in range(len(column_names))}
            return jsonify(user_dict)
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn:
            conn.close()




@app.route('/api/notifications/all', methods=['GET'])
def get_notifications_all():
    try:
     
        conn = psycopg2.connect(**DB_CONFIG3)
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM Notifications;")
        notifications = cursor.fetchall()
        column_names = [desc[0] for desc in cursor.description]
        notifications_list = []
        for notification in notifications:
            notification_dict = {column_names[i]: notification[i] for i in range(len(column_names))}
            notifications_list.append(notification_dict)

        return jsonify(notifications_list)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Close database connection
        try:
            if conn:
                conn.close()
        except UnboundLocalError:
            pass


#Cases part 

def fetch_data_with_columns(cursor, query, params=None):
    cursor.execute(query, params)
    column_names = [desc[0] for desc in cursor.description]
    data = cursor.fetchone()
    return data, column_names

def get_fraud_transaction_details(transaction_id):
    try:
        conn = psycopg2.connect(**DB_CONFIG3)
        cursor = conn.cursor()
        query = """
            SELECT 
                Transactionid,
                Transactiontype,
                oldbalanceOrg,
                newbalanceOrig,
                oldbalanceDest,
                newbalanceDest,
                Transaction_date,
                Sender_account,
                Receiver_account,
                IP_address_sender,
                Fraud_Transaction
            FROM System_Transaction
            WHERE Transactionid = %s;
        """
        transaction_data, column_names = fetch_data_with_columns(cursor, query, (transaction_id,))
        if transaction_data:
            transaction_details = {column_names[i]: transaction_data[i] for i in range(len(column_names))}
            return transaction_details, column_names
        else:
            return None, None
    except Exception as e:
        raise e
    finally:
        if conn:
            conn.close()

def get_fraud_account_details(account_id):
    try:
        conn = psycopg2.connect(**DB_CONFIG3)
        cursor = conn.cursor()
        query = """
            SELECT 
                FraudAccount_id,
                first_name,
                last_name,
                account_balance,
                age,
                address,
                mobileno,
                addharno,
                lastlogin,
                branched,
                account_type,
                emailid,
                upi_id,
                account_number,
                pancard_number,
                city,
                credit_card_number,
                flag_KYC,
                flag_Phone_verified,
                current_address_month_count,
                account_creation_date,
                intended_bank_account,
                zip_count_4w,
                velocity_6h,
                velocity_24h,
                has_other_cards_count,
                proposed_credit_limit,
                employment_status_encoded,
                housing_status_encoded,
                Fraud_Account
            FROM FraudAccounts
            WHERE FraudAccount_id = %s;
        """
        account_data, column_names = fetch_data_with_columns(cursor, query, (account_id,))
        if account_data:
            account_details = {column_names[i]: account_data[i] for i in range(len(column_names))}
            return account_details, column_names
        else:
            return None, None
    except Exception as e:
        raise e
    finally:
        if conn:
            conn.close()


# Define the route to get all cases
@app.route('/api/cases', methods=['GET'])
def get_all_cases():
    try:
        # Connect to the PostgreSQL database
        connection = psycopg2.connect(**DB_CONFIG3)
        conn = psycopg2.connect(**DB_CONFIG3)
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM Cases;")
        cases = cursor.fetchall()
        cursor.close()
        connection.close()
        cases_list = [{'transaction_id': row[0], 'customer_id': row[1], 'status': row[2]} for row in cases]

        return jsonify({'cases': cases_list})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/api/cases/all', methods=['GET'])
def get_cases_all():
    try:
        connection = psycopg2.connect(**DB_CONFIG3)
        cursor = connection.cursor()
        query = """
            SELECT 
                Cases.case_id, 
                Cases.customer_id, 
                Cases.status, 
                system_transaction.transactionid, 
                system_transaction.transactiontype, 
                system_transaction.oldbalanceorg, 
                system_transaction.newbalanceorig, 
                system_transaction.oldbalancedest, 
                system_transaction.newbalancedest, 
                system_transaction.transaction_date,
                sender_account.customer_id AS sender_customer_id,
                sender_account.first_name AS sender_first_name,
                sender_account.last_name AS sender_last_name,
                sender_account.account_balance AS sender_account_balance,
                EXTRACT(YEAR FROM AGE(NOW(), sender_account.dob)) AS sender_age,
                sender_account.address AS sender_address,
                sender_account.dob AS sender_dob,
                sender_account.addharno AS sender_addharno,
                sender_account.pancard_number AS sender_pancard_number,
                sender_account.city AS sender_city,
                sender_account.lastlogin AS sender_lastlogin,
                sender_account.mobileno AS sender_mobileno,

                receiver_account.customer_id AS receiver_customer_id,
                receiver_account.first_name AS receiver_first_name,
                receiver_account.last_name AS receiver_last_name,
                receiver_account.account_balance AS receiver_account_balance,
                 EXTRACT(YEAR FROM AGE(NOW(), receiver_account.dob)) AS receiver_age,
                receiver_account.address AS receiver_address,
                receiver_account.dob AS receiver_dob,
                receiver_account.addharno AS receiver_addharno,
                receiver_account.pancard_number AS receiver_pancard_number,
                receiver_account.city AS receiverr_city,
                receiver_account.lastlogin AS receiver_lastlogin,
                receiver_account.mobileno AS receiver_mobileno,
                sender_account.customer_photo AS sender_customer_photo,
                receiver_account.customer_photo AS receiver_customer_photo,

                sender_account.account_number AS sender_account_number,
                receiver_account.account_number AS receiver_account_number,

                sender_account.branchid AS sender_branchid,
                receiver_account.branchid AS receiver_branchid,

                system_transaction.ip_address_sender, 
                system_transaction.fraud_transaction, 
                system_transaction.amount
            FROM 
                Cases
            JOIN 
                system_transaction ON Cases.transaction_id = system_transaction.transactionid
            JOIN 
                system_account AS sender_account ON system_transaction.sender_account = sender_account.account_number
            JOIN 
                system_account AS receiver_account ON system_transaction.receiver_account = receiver_account.account_number;
        """
        cursor.execute(query)

        cases = cursor.fetchall()
        cursor.close()
        connection.close()

        cases_list = [
                        {
                'case_id': row[0],
                'customer_id': row[1],
                'status': row[2],
                'transaction_details': {
                    'transaction_id': row[3],
                    'transaction_type': row[4],
                    'old_balance_org': row[5],
                    'new_balance_orig': row[6],
                    'old_balance_dest': row[7],
                    'new_balance_dest': row[8],
                    'transaction_date': row[9].strftime('%Y-%m-%d %H:%M:%S'),  # Format the datetime
                    'sender_account': {
                        'customer_id': row[10],
                        'first_name': row[11],
                        'last_name': row[12],
                        'account_balance': row[13],
                        'age': row[14],
                        'address': row[15],
                        'dob': row[16],  # Format the date of birth
                        'addharno': row[17],
                        'pancard_number': row[18],
                        'city': row[19],
                        'lastlogin': row[20],  # Format the last login datetime
                        'mobileno': row[21],
                        'senderphoto': row[34],
                        'account_number' : row[36],
                        'branchid': row[38]
                    },
                    'receiver_account': {
                        'customer_id': row[22],
                        'first_name': row[23],
                        'last_name': row[24],
                        'account_balance': row[25],
                        'age': row[26],
                        'address': row[27],
                        'dob': row[28],  # Format the date of birth
                        'addharno': row[29],
                        'pancard_number': row[30],
                        'city': row[31],
                        'lastlogin': row[32],  # Format the last login datetime
                        'mobileno': row[33],
                        'reciverphoto': row[35],
                        'account_number' : row[37],
                        'branchid': row[39]
                    },
                    'ip_address_sender': row[40],
                    'fraud_transaction': row[41],
                    'amount': row[36],
                },
            }
            for row in cases

        ]

        return jsonify({'cases': cases_list})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def update_case_status(case_id, new_status):
    try:
        conn = psycopg2.connect(**DB_CONFIG3)
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE cases SET status = %s WHERE open_case_id = %s;
        """, (new_status, case_id))
        conn.commit()

        return True  

    except Exception as e:
        raise e

    finally:
        if conn:
            conn.close()


@app.route('/api/cases/update', methods=['PUT'])
def update_case():
    try:
        data = request.get_json()
        case_id = data.get('case_id')
        new_status = data.get('new_status')

        if not case_id or not new_status:
            return jsonify({'error': 'Both case_id and new_status are required'}), 400
        if new_status.lower() not in ['open', 'close']:
            return jsonify({'error': 'Invalid value for new_status. Must be "open" or "close"'}), 400

        if update_case_status(case_id, new_status):
            return jsonify({'message': f'Case {case_id} updated successfully to {new_status}'})

        return jsonify({'error': f'Failed to update case {case_id} status'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
   


# Define the route to delete a case by ID
@app.route('/api/cases/delete/<int:case_id>', methods=['DELETE'])
def delete_case(case_id):
    conn = None
    try:
        conn = psycopg2.connect(**DB_CONFIG3)
        cursor = conn.cursor()
        cursor.execute("""
            DELETE FROM cases WHERE open_case_id = %s;
        """, (case_id,))
        conn.commit()

        return jsonify({'message': f'Case {case_id} deleted successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        try:
            if conn:
                conn.close()
        except UnboundLocalError:
            pass



@app.route('/api/cases/create', methods=['POST'])
def create_case():
    try:
        conn = psycopg2.connect(**DB_CONFIG3)
        cursor = conn.cursor()
        data = request.get_json()
        transaction_id = data.get('transaction_id')
        customer_id = data.get('customer_id')
        status = data.get('status')
        cursor.execute("""
            INSERT INTO cases (transaction_id, customer_id, status)
            VALUES (%s, %s, %s)
            RETURNING case_id;
        """, (transaction_id, customer_id, status))
        case_id = cursor.fetchone()[0]
        conn.commit()

        return jsonify({'message': f'Case {case_id} created successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if conn:
            conn.close()


@app.route('/api/users/all/<string:account_number>', methods=['GET'])
def get_user_by_account(account_number):
    try:
        conn = psycopg2.connect(**DB_CONFIG3)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM system_account WHERE account_number = %s;", (account_number,))
        user_data = cursor.fetchone()

        if user_data:
            column_names = [desc[0] for desc in cursor.description]
            user_dict = {column_names[i]: user_data[i] for i in range(len(column_names))}
            return jsonify(user_dict)
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn:
            conn.close()









#shararyu apis:
CREATE_ADMIN = (
    "CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);")

INSERT_ADMIN = ("INSERT INTO users (username, password) VALUES ('admin', 'admin123');")
SELECT_USER = ("SELECT id, username FROM users WHERE username = %s AND password = %s;")

@app.post('/api/admin/createAdmin')
def createAdmin():
    conn = psycopg2.connect(**DB_CONFIG3)
    cursor = conn.cursor()
    cursor.execute(CREATE_ADMIN)
    cursor.execute(INSERT_ADMIN)
    return("Admin created"), 201

@app.post('/api/admin/login')
def adminLogin():
    data = request.get_json()
    username = data['username']
    password = data['password']

    try:
        conn = psycopg2.connect(**DB_CONFIG3)
        cursor = conn.cursor()
        cursor.execute(SELECT_USER, (username, password))
        user_data = cursor.fetchone()

        if user_data:
            user_id, user_username = user_data
            return jsonify({"success": True}), 200
        else:
            return {"error": "Invalid username or password."}, 401

    except Exception as e:
        return {"error": str(e)}, 500
    
#calculating diff function
def balance_diff(data):
    #Sender's balance
    orig_change=data['newbalanceorig']-data['oldbalanceorg']
    # orig_change=orig_change.astype(int)
    data['orig_txn_diff']=round(data['amount']+orig_change,2)
    data['orig_txn_diff']=round(data['amount']-orig_change,2)
    # data['orig_txn_diff']=data['orig_txn_diff'].astype(int)
    data['orig_diff'] = 1 if data['orig_txn_diff'] !=0 else 0
    
    #Receiver's balance
    dest_change=data['newbalancedest']-data['oldbalancedest']
    # dest_change=dest_change.astype(int)
    data['dest_txn_diff']=round(data['amount']+dest_change,2)
    data['dest_txn_diff']=round(data['amount']-dest_change,2)
    # data['dest_txn_diff']=data['dest_txn_diff'].astype(int)
    data['dest_diff'] = 1 if data['dest_txn_diff'] !=0 else 0

    # data = data.pop("orig_txn_diff")
    del data["orig_txn_diff"]
    del data["dest_txn_diff"]
    
    return(data)


INSERT_TRANSACTION = """
    INSERT INTO system_transaction (transactiontype, oldbalanceorg,newbalanceorig, oldbalancedest, newbalancedest, transaction_date,sender_account,receiver_account,ip_address_sender,fraud_transaction,amount) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s ,%s)
    RETURNING transactionid;
"""
FREQUENCY_INDICATOR_QUERY = """SELECT COUNT(*) FROM system_transaction WHERE receiver_account = %s;"""
#Surge indicator
def surge_indicator(data):
    data['surge']=1 if data['amount']>450000 else 0 
    return(data)



#Save transaction to system database
@app.route('/api/insertSystemTransactions', methods=['POST'])
def saveTransaction():
    data = request.get_json()
    data["transaction_date"] = datetime.now().date()

    transaction_fraud_detection = pickle.load(open('transaction_fraud_detection.pkl','rb'))
    # [step, amount,	oldbalanceOrg,	newbalanceOrig,	oldbalanceDest,	newbalanceDest,	orig_diff,	dest_diff,	surge,	freq_dest,	type_CASH_IN,	typeCASH_OUT,	typeDEBIT,	typePAYMENT,	type_TRANSFER,	customers_org,	customers_des]
    model_data = [1]
    model_data.append(data['amount'])
    model_data.append(data['oldbalanceorg'])
    model_data.append(data['newbalanceorig'])
    model_data.append(data['oldbalancedest'])
    model_data.append(data['newbalancedest'])
    M_data = balance_diff(data)
    model_data.append(M_data['orig_diff'])
    model_data.append(M_data['dest_diff'])
    M_data = surge_indicator(M_data)
    model_data.append(M_data['surge'])
    try:
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(FREQUENCY_INDICATOR_QUERY,(data['receiver_account'],))
                f_count = cursor.fetchone()[0]
                model_data.append(f_count)
                if(data['tansactiontype']=="Cash In"):
                    model_data.append(1)
                else:
                    model_data.append(0)
                if(data['tansactiontype']=="Cash Out"):
                    model_data.append(1)
                else:
                    model_data.append(0)
                if(data['tansactiontype']=="Debit"):
                    model_data.append(1)
                else:
                    model_data.append(0)
                if(data['tansactiontype']=="Payment"):
                    model_data.append(1)
                else:
                    model_data.append(0)
                if(data['tansactiontype']=="Transfer"):
                    model_data.append(1)
                else:
                    model_data.append(0)
                model_data.append(int(data["sender_account"]))
                model_data.append(int(data["receiver_account"]))
                array_data_2d = np.array(model_data).reshape(1, -1)
                prediction = transaction_fraud_detection.predict_proba(array_data_2d)
                output = '{0:.{1}f}'.format(prediction[0][1],2)
                print("output:",output)
                if float(output) >= 0.5:
                    data['fraud_transaction'] = True
                else:
                    data['fraud_transaction'] = False
                
                values = (data['tansactiontype'],data['oldbalanceorg'], data['newbalanceorig'],data['oldbalancedest'],data['newbalancedest'], data['transaction_date'], data['sender_account'], data['receiver_account'], data['ip_address_sender'],data['fraud_transaction'],data['amount'])

                cursor.execute(INSERT_TRANSACTION,values)
                trans_id = cursor.fetchone()[0]
                print("trans_id = ",trans_id)

                if float(output) >= 0.5:
                    #Database notification
                    cursor.execute("""SELECT * FROM system_account WHERE account_number = %s;""",(data['sender_account'],))
                    Customer_id = cursor.fetchone()[0]
                    message = "Fraud Transaction Detected!"
                    noti_values = (message, 'Fraud_Transaction', trans_id, Customer_id)
                    print(noti_values)
                    cursor.execute("""INSERT INTO notifications (Message, Type, Transaction_id , Customer_id ) VALUES (%s, %s, %s, %s) RETURNING notification_id;""",noti_values)
                    notification_id = cursor.fetchone()[0]

                    #User sms notification


                    return {'transaction_id': trans_id,"Output":output,"notification_id":notification_id}, 201
                else :
                    return {'transaction_id': trans_id,"Output":output}, 201
                
        # if notification_id :
        #     #check if the transaction is fraud
        #     return jsonify({'transaction_id': trans_id,"Output":output,"notification_id":notification_id}), 201
        
    except Exception as e:
        return {"transaction_data": data, "model_data": model_data ,"error": str(e)}, 500    
    


CLOSE_CASE = ("UPDATE cases SET status = 'close' WHERE case_id = %s;")
@app.route("/api/case/closeCase", methods=["POST"])
def closeCase():
    data = request.get_json()
    case_id = data['case_id']
    try:
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(CLOSE_CASE,(case_id))
        return("Case closed"), 200
    except Exception as e:
        return {"error": str(e)},500   



@app.route('/api/transaction/<int:transactionid>', methods=['GET'])
def get_transaction_by_id(transactionid):
    try:
        with connection:
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM system_transaction WHERE transactionid = %s;", (transactionid,))
            data = cursor.fetchone()

            if data:
                column_names = [desc[0] for desc in cursor.description]
                data_dict = {column_names[i]: data[i] for i in range(len(column_names))}
                return jsonify(data_dict), 200
            else:
                return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500



 #15/01/2024
INSERT_CASE = ("INSERT INTO cases (status,customer_id,transaction_id) VALUES ('open', %s, %s);")    
@app.route("/api/case/openCase", methods=["POST"])
def openCase():
    data = request.get_json()
    transaction_id = data['transactionid']
    try:
        with connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM system_account WHERE account_number = %s;",(data['sender_account'],))
                customer_id = cursor.fetchone()[0]
                cursor.execute(INSERT_CASE,(customer_id,transaction_id))
        return{"Response":"Case opened"}, 200
    except Exception as e:
        return {"error": str(e)},500   
    
#User integration apis

@app.route("/phone/is_spam", methods=["POST"])
def check_phone():
    try:
        print(request.json)
        phone_number = request.json["phoneNumber"].strip()
        country_code = "IN"

        print(SpamCallDetection().getResults(phone_number, country_code))
        result = dict(SpamCallDetection().getResults(phone_number, country_code))

        # if(result['status'] == False):
        #     return jsonify(result)

        if len(result.keys()) == 1:
            return jsonify({"message": "APIs request quota exceeded"})
        try:
            spam_score = result["data"][0]["phones"][0]["spamScore"]
            spam_type = result["data"][0]["phones"][0]["spamType"]

        except:
            spam_score = None
            spam_type = None

        print("oye hoye")
        try:
            user_name = result["data"][0]["name"]
        except:
            user_name = ""
        if spam_score:
            return jsonify(
                {
                    "message": "Phone Number is not Safe to Proceed!",
                    "spamScore": spam_score,
                    "spam_type": spam_type,
                    "user_name": user_name,
                    "success": False
                }
            )
        else:
            
            return jsonify(
                {
                    "message": "Phone Number is Safe to Proceed!",
                    "spamScore": 0,
                    "spam_type": "Trusted",
                    "user_name": user_name,
                    "success": True
                }
            )

    except Exception as error:
        print(error)
        return jsonify(
            {
                "message": "Please pass the input parameters correctly or something went wrong.",
                "success": False
            }
        )


@app.route("/url/is_spam", methods=["POST"])
def check_url():
    try:
        input_url = request.json["input_link"].strip()
        # print(input_url)
        result = URLdetection().getResults(input_url)
        print(input_url)
        print(result)

        if result:
            
            risk_score = result[0]["Ai_model_phishing_predict_score"]

            message = ""
            if float(risk_score.strip().replace("%", "")) > 80:
                success = True
            else:
                success = False

            return jsonify(
                {
                    "success": success
                }
            )
        else:
            return jsonify({"message": "Something went wrong","success":False})

    except Exception as error:
        print("error", error)
        return jsonify({"message": "Please pass the input parameters correctly."})


@app.route("/sms_template/is_spam", methods=["POST"])
def check_sms_template():
    try:
        # input = []
        input_template = request.json["sms_template"]
        predicted = sh.spam_ham(input_template)
        sms_class = " "
        if predicted == 1:
            sms_class = "Ham SMS"
        else:
            sms_class = "Spam SMS"

        print(sms_class)

        message = " "
        if sms_class == "Spam SMS":
            message = "SMS is not Safe to Proceed!"

        else:
            message = "SMS is Safe to Proceed!"

        print(message)

        return jsonify(
            {
                "message": message,
                "sms_template_class": sms_class,
            }
        )

    except Exception as error:
        print("error", error)

        return jsonify(
            {
                "message": "Please pass the input parameters correctly or something went wrong",
            }
        )


@app.route("/upi/is_spam", methods=["POST"])
def check_upi():
    try:
        input_upi = request.json["upi_id"].strip()
        print(input_upi)
        verification_data = UPI_Verification().getResults(input_upi)
        print(verification_data)
        print(verification_data["result"]["account_exists"])
        if verification_data["result"]["account_exists"] == None:
            print("oyy hoyy")
            return jsonify(
                {
                    "message": "Account dosen't exist!",
                    "upi_class": "None",
                    "user_name": "Not Available",
                    "success": False
                }
            )

        else:
            return jsonify(
                {
                    "message": "Account exists!",
                    "success":True
                }
            )

    except Exception as error:
        print(error)
        return jsonify(
            {
                "message": "Please pass the input parameters correctly or something went wrong",
                "success": False
            }
        )


@app.route("/accNo/is_spam", methods=["POST"])
def check_accNo():
    data = request.get_json()
    try:
        with connection:
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM system_account WHERE account_number = %s;", (data["acc_no"],))
            data = cursor.fetchone()

            if data:
                if(data["fraud_account"]): 
                    return jsonify({"success":True}), 200
                else:
                    return jsonify({'error': 'Fraud account',"success":False}), 404
            else:
                return jsonify({'error': 'User not found',"success":False}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route("/transaction/is_spam", methods=["POST"])
def check_transactionid():
    data = request.get_json()
    try:
        with connection:
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM system_transaction WHERE transactionid = %s;", (data["transactionid"],))
            data = cursor.fetchone()
            if data:
                if(data["fraud_transaction"]): 
                    return jsonify({"success":True}), 200
                else:
                    return jsonify({'error': 'Fraud transaction',"success":False}), 404
            else:
                return jsonify({'error': 'Transaction not found',"success":False}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

# @app.route("/transaction/is_spam/<transactionid>", methods=["GET"])
# def check_transactionid(transactionid):
#     try:
#         with connection:
#             cursor = connection.cursor(dictionary=True)  # Use dictionary cursor
#             cursor.execute("SELECT * FROM system_transaction WHERE transactionid = %s;", (transactionid,))
#             data = cursor.fetchone()
#             if data:
#                 if data["fraud_transaction"]:
#                     return jsonify({"success": True}), 200
#                 else:
#                     return jsonify({'error': 'Fraud transaction', "success": False}), 404
#             else:
#                 return jsonify({'error': 'Transaction not found', "success": False}), 404

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
        
if __name__ == '__main__':
    app.run(debug=True)
