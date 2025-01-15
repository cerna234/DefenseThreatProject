from flask import Blueprint, jsonify,request, make_response 
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId,json_util
from bson.json_util import dumps
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)



authentication_bp = Blueprint('authentication', __name__)

#Switch to env var
mongo_uri = "mongodb+srv://defenseAdmin:Mc91089787@cluster0.mtmac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(mongo_uri)
db = client['sensorDataDb']  # Your database name

# Collections
collection = db['Authentication']  # Your collection name


@authentication_bp.route('/setcookie',methods=['POST']) 
def setcookie(): 
    # Checking if the request method is POST
    if request.method == 'POST':
        # Initializing response object 
        resp = make_response('Setting the cookie')  
        resp.set_cookie('GFG', 'ComputerScience Portal') 
        return resp
        
@authentication_bp.route('/login', methods=['POST'])
def login():
    try:
        
        data = request.json

       
        
      


        if not data or not data.get("username"):
            return jsonify({"error": "USERNAME IS REQUIRED"}), 400

        username = data["username"]  # Extract username
        password = data.get("password")  # Optional passwor

        existing_user = collection.find_one({"username": data["username"], "password": password})
       

        if existing_user:
            access_token = create_access_token(identity=username)
            resp = jsonify({"returnedLoginData": access_token})
            resp.set_cookie('auth_token', access_token) 
            return resp
            
        else:
            return jsonify({"returnedLoginData": "Incorrect Username or password"})

       

        
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@authentication_bp.route('/getcookie') 
def getcookie(): 
    GFG = request.cookies.get('GFG') 
    return 'GFG is a '+ GFG 