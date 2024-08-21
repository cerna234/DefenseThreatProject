#include "radar.h"
#include "Infrared.h"
#include <iostream>
#include <vector>
#include <ctime> // For time()

int main() {
    // Radar data
    const int numObjects = randomInt(3,3);        // Number of objects to simulate
    const double timeInterval = 0.1;  // Time step in seconds
    const int radarSignals = 10;    
    const int seconds = 30;     // Number of time steps to simulate

    // IR(Infrared) data


    // Seed the random number generator
    srand(static_cast<unsigned>(time(nullptr)));

   

    // Create a vector to store radar objects
    if(numObjects > 0){
        std::vector<RadarObject> objects(numObjects);

        for (auto& obj : objects) {
            obj = createRandomObject();
            
        }
        
        for(int i = 0; i < numObjects;){
            for (auto& obj : objects) {
            obj = createRandomObject();
            setName(obj,i); 
            i++;
            }
        }
        

        // Simulation loop
    
        for(int i = 0; i < numObjects; i++){
            

            for (int signal = 0; signal < radarSignals; ++signal) {
            //std::cout << "SIGNAL:" << signal << std::endl;
            for (auto& obj : objects) {
                
                updatePosition(obj, timeInterval);
                
                // print object will be a function that will store this data into a structure that can be used to analyze
                //printObjectData(obj,obj.name,numObjects);
            }
        
            //std::cout << std::endl;
            }

            

            
        }
    }
    else{
        std::cout << "No objects found" << std::endl;
    }
    
    
    
    
    std::vector<InfraredData> IRobjects(numObjects);

    for(auto& obj2 : IRobjects){
        //std::cout << "CREATEDOBJ" << std::endl;
        obj2 = createRandomIRObject();
        
        
    }

    for(auto& obj2: IRobjects){
        setRadarName(obj2, obj2.objectName);
     
        randomDoubleIR(0,10);
      
        
    }


    for(int i = 0; i < seconds; i++){

        std::cout << "SECONDS" << std::endl;

        for (auto& obj2 : IRobjects) {
                // print object will be a function that will store this data into a structure that can be used to analyze
               // printObjectData(obj,obj.name,numObjects);
               updateIRObject(obj2,timeInterval);
               outputData(obj2);
            }

    }
    
    return 0;
}
