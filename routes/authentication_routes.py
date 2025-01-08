from flask import Blueprint, jsonify,request
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




@authentication_bp.route('/login', methods=['POST'])
def login():
    try:
        
        data = request.json

        print(data)
        


        if not data or not data.get("username"):
            return jsonify({"error": "USERNAME IS REQUIRED"}), 400

        username = data["username"]  # Extract username
        password = data.get("password")  # Optional passwor

        existing_user = collection.find_one({"username": data["username"], "password": password})
       

        if existing_user:
            access_token = create_access_token(identity=username)
            return jsonify({"returnedLoginData": access_token})
        else:
            return jsonify({"returnedLoginData": "Incorrect Username or password"})

       

        
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


