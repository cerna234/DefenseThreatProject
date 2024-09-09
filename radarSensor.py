import serial

ser = serial.Serial('/dev/serial0', 256000, timeout=1)
header = 'f4f3f2f1' 
try:
    while True:
        if ser.in_waiting > 0:
            raw_data = ser.read(2048)
            
            
            if raw_data.hex()[0:8] == header:
                print(f"Received: {raw_data.hex()}")
            
         

except KeyboardInterrupt:
    ser.close()
    print("CLOSED")
