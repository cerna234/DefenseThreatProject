import serial

ser = serial.Serial('/dev/serial0', 256000, timeout=1)
header = 'f4f3f2f1' 
endHeader= 'f8f7f6f5'
try:
    while True:
        if ser.in_waiting > 0:
            raw_data = ser.read(64)
            
            
            if raw_data.hex()[0:8] == header: # and raw_data.hex()[-8:] == endHeader:
                print(" ")
                print(f"Received: {raw_data.hex()}") #Full DATA
                print(" ")

                print(f"SIZE:  {raw_data.hex()[8:12]}") # Intra-frame data Length
                print(f"DATA TYPE:  {raw_data.hex()[12:14]} ") # Data Type( 1 byte )
                print(f"HEAD: {raw_data.hex()[14:16]}" ) #Head 0xAA
                print(" ")
                  
                print(f"TARGET State: {raw_data.hex()[16:18]}") #1 byte (0x00 = no target, 0x01 = Movement Target, 0x02 = stationary target, 0x03 = movement&stationary target)
                
                print("MOVING TARGET DATA:")
                print("---------")
                print(f"Movement Target distance(cm): {int(raw_data.hex()[18:22],16)}") #2 bytes
                print(f"Exercise target Energy value: {raw_data.hex()[22:24]}") #1 byte
                print(" ")
                
                print("STATIONARY TARGET DATA:")
                print("---------")
                print(f"stationary target distance(cm): {int(raw_data.hex()[24:28],16)}") #2 bytes
                print(f"Stationary target energy value: {raw_data.hex()[28:30]} ") #1 byte
                
                print(" ")
                print(f"DetectionDistance (cm) {int(raw_data.hex()[30:34],16)}") #2 bytes
                print(" ")
                
                print(f"END: {raw_data.hex()[34:36]}")
                print(f"Check: {raw_data.hex()[36:38]} ")
                print(f"REST: {raw_data.hex()[38:46]} " )
                
            
         

except KeyboardInterrupt:
    ser.close()
    print("CLOSED")
