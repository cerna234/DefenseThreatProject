from flask import Blueprint, jsonify,request
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId,json_util
from bson.json_util import dumps


threat_bp = Blueprint('threatAnalysis', __name__)


#Switch to env var
mongo_uri = "mongodb+srv://defenseAdmin:Mc91089787@cluster0.mtmac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(mongo_uri)
db = client['sensorDataDb']  # Your database name

# Collections
collection = db['SensorData']  # Your collection name
statusTable = db['sensorStatus']


@threat_bp.route('/threatClassification', methods=['GET'])
def threatClassification():
    try:
        
        data = list(collection.find())
        
        for value in data:

            if value['TargetState'] == "Moving and Stationary Target Found":
            
               value['ThreatStatus'] = 'Threat'
        

            
            if value['TargetState'] == "Stationary Target":

                if value['StationaryTargetDistance'] < 15000:

                    if int(value['StationaryTargetEnergy Value']) < 45:
                        value['ThreatStatus'] = 'Threat'
                    else:
                        value['ThreatStatus'] = 'Crtitical Threat'
                    

                elif value['StationaryTargetDistance']  < 25000:
                    value['ThreatStatus'] = 'Threat'

                elif value['StationaryTargetDistance']  < 35000:
                    value['ThreatStatus'] = 'Possible Threat'
                else:
                    value['ThreatStatus'] = 'No Threat'
                        
              
         

            


        json_data = dumps(data)

     

        # Return the data as a JSON response
        return json_data, 200, {'Content-Type': 'application/json'}
    except Exception as e:
        # Return the error message as a JSON response with status 500
        return jsonify({"error": str(e)}), 500