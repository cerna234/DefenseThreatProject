from flask import Blueprint, jsonify,request
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId,json_util
from bson.json_util import dumps
import requests


threat_bp = Blueprint('threatAnalysis', __name__)


#Switch to env var
mongo_uri = "mongodb+srv://defenseAdmin:Mc91089787@cluster0.mtmac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(mongo_uri)
db = client['sensorDataDb']  # Your database name

# Collections
collection = db['SensorData']  # Your collection name
statusTable = db['sensorStatus']


@threat_bp.route('/threatClassification/<string:route>', methods=['GET'])
def threatClassification(route):
    try:
        base_url = "http://127.0.0.1:5000"  # Update with your server's base URL
        response = requests.get(f"{base_url}/{route}")

        # Ensure the request was successful
        if response.status_code != 200:
            return jsonify({"error": f"Failed to fetch data: {response.text}"}), response.status_code

        # Parse the JSON response
        data = response.json()

        # Check if the response is a list or a single object
        if isinstance(data, dict):
            # Wrap single object in a list to process uniformly
            data = [data]

       
        for value in data:
         
            if value['TargetState'] == "Moving and Stationary Target Found":
                movingThreat = ""
                stationaryThreat = ""

                if value['StationaryTargetDistance'] < 15000:
                    if int(value['StationaryTargetEnergyValue']) < 45:  # Corrected field name
                        stationaryThreat = 'Threat'
                    else:
                        stationaryThreat = 'Critical Threat'

                elif value['StationaryTargetDistance'] < 25000:
                    stationaryThreat = 'Threat'

                elif value['StationaryTargetDistance'] < 35000:
                    stationaryThreat = 'Possible Threat'
                else:
                    stationaryThreat = 'No Threat'


                if value['MovementTargetDistance'] < 15000:
                    if int(value['MovementTargetEnergyValue']) < 45:  # Corrected field name
                        movingThreat = 'Threat'
                    else:
                        movingThreat = 'Critical Threat'

                elif value['MovementTargetDistance'] < 25000:
                    movingThreat = 'Threat'

                elif value['MovementTargetDistance'] < 35000:
                    movingThreat = 'Possible Threat'
                else:
                    movingThreat = 'No Threat'

                if 'Critical Threat' in [stationaryThreat, movingThreat]:
                    value['ThreatStatus'] = 'Critical Threat'
                elif 'Threat' in [stationaryThreat, movingThreat]:
                    value['ThreatStatus'] = 'Threat'
                elif 'Possible Threat' in [stationaryThreat, movingThreat]:
                    value['ThreatStatus'] = 'Possible Threat'
                else:
                    value['ThreatStatus'] = 'No Threat'


                
       

            elif value['TargetState'] == "Stationary Target":
                if value['StationaryTargetDistance'] < 15000:
                    if int(value['StationaryTargetEnergy Value']) < 45:  # Corrected field name
                        value['ThreatStatus'] = 'Threat'
                    else:
                        value['ThreatStatus'] = 'Critical Threat'

                elif value['StationaryTargetDistance'] < 25000:
                    value['ThreatStatus'] = 'Threat'

                elif value['StationaryTargetDistance'] < 35000:
                    value['ThreatStatus'] = 'Possible Threat'
                else:
                    value['ThreatStatus'] = 'No Threat'

            elif value['TargetState'] == "No Target":
                value['ThreatStatus'] = "No Threat"
        # Return the modified data as a JSON response
        return jsonify(data), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
