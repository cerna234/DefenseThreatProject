#include "radar.h"
#include <cstdlib> // For rand() and srand()
#include <ctime>   // For time()
#include <iostream>
#include <random>
#include <string>

// Generate a random double in the range [min, max]
double randomDoubleIR(double min, double max) {
    return min + (max - min) * (rand() / static_cast<double>(RAND_MAX));
}

int randomInt(int min, int max) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis(min, max);
    return dis(gen);
}

// Create a random radar object
RadarObject createRandomObject() {
    RadarObject obj;
    obj.x = randomDoubleIR(0.0, 800.0);  // Random x position within a range of 0 to 800
    obj.y = randomDoubleIR(0.0, 600.0);  // Random y position within a range of 0 to 600
    obj.vx = randomDoubleIR(-5.0, 5.0);  // Random velocity in the x direction
    obj.vy = randomDoubleIR(-5.0, 5.0);  // Random velocity in the y direction
    obj.size = randomDoubleIR(5.0, 20.0);
    
    return obj;
}

// Update the position of a radar object based on its velocity
void updatePosition(RadarObject& obj, double dt) {
    obj.x += obj.vx * dt;
    obj.y += obj.vy * dt;

    // Wrap around the screen (if needed)
    if (obj.x < 0) obj.x += 800.0;
    if (obj.x > 800.0) obj.x -= 800.0;
    if (obj.y < 0) obj.y += 600.0;
    if (obj.y > 600.0) obj.y -= 600.0;
}

// Print the data of a radar object (position, speed, size)
void printObjectData(const RadarObject& obj, std::string objectName,int objectNum) {
    for(int i = 0; i < objectNum;){
        //std::cout << "Object" + std::to_string(i) << std::endl;
        if(objectName == "Object" + std::to_string(i)){
            std::cout << "Position: (" << obj.x << ", " << obj.y << ")"
              << ", Speed: (" << obj.vx << ", " << obj.vy << ")"
              << ", Size: " << obj.size << ")"
              << ", name: " << obj.name << std::endl;   
        }
         i++;
 
    }
   
}



// Function will be used to clasify each object that is observed
void setName(RadarObject& obj, int objectNum){
    obj.name = "Object" + std::to_string(objectNum);;
}

extern "C" void runRadarSim(){
     // Radar data
    const int numObjects = randomInt(0,3);        // Number of objects to simulate
    const double timeInterval = 0.1;  // Time step in seconds
    const int radarSignals = 10;    
    const int seconds = 30;     // Number of time steps to simulate

    // IR(Infrared) data


    // Seed the random number generator
    srand(static_cast<unsigned>(time(nullptr)));

   

    // Create a vector to store radar objects
    if(numObjects > 0){
        std::vector<RadarObject> objects(numObjects);

        
        
        for(int i = 0; i < numObjects;){
            for (auto& obj : objects) {
            obj = createRandomObject();
            setName(obj,i); 
            i++;
            }
        }
        

        // Simulation loop
    
        
            

            for (int signal = 0; signal < radarSignals; ++signal) {
                std::cout << "SIGNAL:" << signal << std::endl;
                for (auto& obj : objects) {
                    
                    updatePosition(obj, timeInterval);
                    
                    // print object will be a function that will store this data into a structure that can be used to analyze
                    printObjectData(obj,obj.name,numObjects);
                }
        
            //std::cout << std::endl;
            }

            

            
        
    }
    else{
        std::cout << "No objects found" << std::endl;
    }
}