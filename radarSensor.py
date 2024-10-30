import serial
import requests

ser = serial.Serial('/dev/serial0', 256000, timeout=1)
header = 'f4f3f2f1'
endHeader= 'f8f7f6f5'


#if (Pull status of sensor that will be updated dependent on a api call that will be /stop that will set it to false and /start that will set it to true)
def detectTargetState(data):
   outPutState = data[16:18]
   stateClassification = ''
   outputDataOutput = {}
   print("-----------------------------------------------")
 
   if outPutState != '00' or outPutState!= '' :
      
       if outPutState == '01':
           stateClassification = "Moving Target"
           
           #print(f"TARGET STATE: {stateClassification}")
           #print(" ")
           #print("MOVING TARGET DATA:")
           #print(" ")
           #print(f"Movement Target distance(cm): {int(data[18:22],16)}") #2 bytes
           #print(f"Exercise target Energy value: {data[22:24]}") #1 byte
           #print(" ")
           
           outputDataOutput['TargetState'] = stateClassification
           outputDataOutput['MovementTarget Distance'] =  int(data[18:22],16)
           outputDataOutput['MovementTarget Energy Value'] = data[22:24]

           return outputDataOutput
              
       if outPutState == '02':
           stateClassification = "Stationary Target"

           outputDataOutput['TargetState'] = stateClassification
           outputDataOutput['StationaryTargetDistance'] = int(data[24:28],16)
           outputDataOutput['StationaryTargetEnergy Value'] = data[28:30]
           #print(f"TARGET STATE: {stateClassification}")
           #print("STATIONARY TARGET DATA:")
           #print(" ")
           #print(f"stationary target distance(cm): {int(data[24:28],16)}") #2 bytes
           #print(f"Stationary target energy value: {data[28:30]} ") #1 byte

           return outputDataOutput
                  
       if outPutState == '03':
           stateClassification = "Moving and Stationary Target Found"
           #print(f"TARGET STATE: {stateClassification}")



           outputDataOutput['TargetState'] = stateClassification
           outputDataOutput['StationaryTargetDistance'] = int(data[24:28],16)
           outputDataOutput['StationaryTargetEnergyValue'] = data[28:30]

           outputDataOutput['TargetState'] = stateClassification
           outputDataOutput['MovementTargetDistance'] =  int(data[18:22],16)
           outputDataOutput['MovementTargetEnergyValue'] = data[22:24]

           outputDataOutput['DetectionDistance'] = int(data[30:34],16)

           return outputDataOutput
      
           #print("STATIONARY TARGET DATA:")
           #print(" ")
           #print(f"stationary target distance(cm): {int(data[24:28],16)}") #2 bytes
           #print(f"Stationary target energy value: {data[28:30]} ") #1 byte


           #print(" ")
           #print("MOVING TARGET DATA:")
           #print(" ")
           #print(f"Movement Target distance(cm): {int(data[18:22],16)}") #2 bytes
           #print(f"Exercise target Energy value: {data[22:24]}") #1 byte
           #print(" ")


      
       #print(f"Detection Distance (cm) {int(data[30:34],16)}") #2 bytes
       #print(f"DETECTION RAW: {data[30:34]}")
       #print(" ")


       
  

  



def sendTargetData(targetData):
    try:
        url = "https://defenseproject-fca5305c6d88.herokuapp.com/sensor-Data"  # Replace with your API endpoint
        response = requests.post(url, json=targetData)


        if response.status_code == 201:
            print("Data sent successfully:", response.json())
    except Exception as e:
        print("Error sending data:", str(e))

def getSensorStatus():
    try:
        url = "https://defenseproject-fca5305c6d88.herokuapp.com/status"
        response = requests.get(url)
        if response.status_code == 200:
        # Parse JSON response
            data = response.json()
            sensorStatus = (data['sensorStatus'])
            return sensorStatus
        else:
            print("Failed to retrieve data. Status code:", response.status_code)
        return response
    except Exception as e:
        print("ERROR IN RETRIEVING STATUS: ", str(e))


sensorStatus = getSensorStatus()
print(sensorStatus)


def runningSensor():
    
        sensorStatus = getSensorStatus()

        while sensorStatus == 'on':
            sensorStatus = getSensorStatus()
            if ser.in_waiting > 0:
                raw_data = ser.read(64)
                
                
                if raw_data.hex()[0:8] == header: # and raw_data.hex()[-8:] == endHeader:




                    sendTargetData(detectTargetState(raw_data.hex()))
                    
                        
                        
                        
                        
                        
                        #print(f"SIZE:  {raw_data.hex()[8:12]}") # Intra-frame data Length
                        #print(f"DATA TYPE:  {raw_data.hex()[12:14]} ") # Data Type( 1 byte )
                        #print(f"HEAD: {raw_data.hex()[14:16]}" ) #Head 0xAA
                        #print(" ")
                    
                        #print(f"END: {raw_data.hex()[34:36]}")
                        #print(f"Check: {raw_data.hex()[36:38]} ")
                        #print(f"REST: {raw_data.hex()[38:46]} " )
                    
                
        








   


try:
    while True:
        runningSensor()
    
except KeyboardInterrupt:
    ser.close()
    print("CLOSED")

