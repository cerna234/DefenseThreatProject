#include "radar.h"
#include <iostream>
#include <vector>
#include <ctime> // For time()

int main() {
    const int numObjects = randomInt(3,3);        // Number of objects to simulate
    const double timeInterval = 0.1;  // Time step in seconds
    const int radarSignals = 10;         // Number of time steps to simulate

    
    // Seed the random number generator
    srand(static_cast<unsigned>(time(nullptr)));

    // Create a vector to store radar objects
    if(numObjects > 0){
        std::vector<RadarObject> objects(numObjects);

        
        for (auto& obj : objects) {
            obj = createRandomObject();
            
            //printObjectData(obj);
        }
        
        for(int i = 0; i < numObjects;){
        
            for (auto& obj : objects) {
            obj = createRandomObject();
            setName(obj,i); 
            i++;
            //printObjectData(obj);
        }
        }
        

        // Simulation loop
    
        for(int i = 0; i < numObjects; i++){
            
        
        

            for (int signal = 0; signal < radarSignals; ++signal) {
            std::cout << "SIGNAL:" << signal << std::endl;
            for (auto& obj : objects) {
                
                updatePosition(obj, timeInterval);
                
                printObjectData(obj,obj.name,numObjects);
            }
            

            
            //std::cout << std::endl;
            }

            

            
        }
    }
    else{
        std::cout << "No objects found" << std::endl;
    }
    
    

    

    return 0;
}
