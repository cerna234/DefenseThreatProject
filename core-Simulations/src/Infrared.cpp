#include "Infrared.h"
#include <cstdlib> // For rand() and srand()
#include <ctime>   // For time()
#include <iostream>
#include <random>
#include <string>

// Generate a random double in the range [min, max]
double randomDouble(double min, double max) {
    return min + (max - min) * (rand() / static_cast<double>(RAND_MAX));
}

int randomIntIR(int min, int max) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dis(min, max);
    return dis(gen);
}


std::vector<InfraredData> ProcessData(InfraredData& obj) {
    // Create a single InfraredData object in a 3D vector
    
    std::vector<InfraredData> data = { obj }; // Single 1D vector of InfraredData
    
    
    return data;
}

void outputData(std::vector<InfraredData> data){


   for(auto& row : data){
    std::cout << "TEST" << std::endl;
    std::cout << row.objectName << std::endl;
   }

}



InfraredData createRandomIRObject() {
    InfraredData IRobj;
    IRobj.objectName = "testName";
    IRobj.x = randomDouble(0.0, 800.0); 
    IRobj.y = randomDouble(0.0, 600.0); 
    IRobj.vx = randomDouble(-5.0, 5.0);  // Random velocity in the x direction
    IRobj.vy = randomDouble(-5.0, 5.0); //
    IRobj.intensity = randomDouble(0, 1000);
    IRobj.temperature = randomDouble(70, 200);  
    IRobj.hotspots = randomIntIR(1,4); // Faranheit
    

    return IRobj;
}

void updateIRObject(InfraredData& obj, double dt){
    
    obj.x += obj.vx * dt;
    obj.y += obj.vy * dt;

    // Wrap around the screen (if needed)
    if (obj.x < 0) obj.x += 800.0;
    if (obj.x > 800.0) obj.x -= 800.0;
    if (obj.y < 0) obj.y += 600.0;
    if (obj.y > 600.0) obj.y -= 600.0;

    double randNum = randomDouble(0,10);
    if(randNum > 5.0){
        obj.temperature = obj.temperature + randomDouble(0,5);
        obj.intensity = obj.intensity + randomDouble(0,10);
    }
    else{
        obj.temperature = obj.temperature + randomDouble(-5,0);
        obj.intensity = obj.intensity + randomDouble(-10,0);
    }

}

// Function will be used to clasify each object that is observed and give it an identifying name

void setRadarName(InfraredData& obj, std::string objectName){

    // Tanks 140f- 200f,  Trucks 130-180f, humans 86- 104
    
        if(obj.temperature > 70 && obj.temperature < 129){
                
                    obj.objectName = "Human" + std::to_string(randomIntIR(0,1000));
                
                
            }
            else if(obj.temperature > 130 && obj.temperature < 200){
                
            
                if(obj.hotspots > 4){
                    //Tank
                    obj.objectName = "Tank" + std::to_string(randomIntIR(0,1000));
                }
                else if(obj.hotspots == 3){
                    //truck
                    obj.objectName = "Truck" + std::to_string(randomIntIR(0,1000));
                }
                else{
                    obj.objectName = "Car" + std::to_string(randomIntIR(0,1000));
                }
            }
            else{
                // none of the above
                obj.objectName = "Unknown" + std::to_string(randomIntIR(0,100));
            }
    
    
    
   
  
}

std::vector<InfraredData> runInfraredSim(){
    const int numObjects = randomIntIR(0,3);        // Number of objects to simulate
    const double timeInterval = 0.1;  // Time step in seconds  
    const int seconds = 30;     // Number of time steps to simulate

    std::vector<InfraredData> FinalData;
    // IR(Infrared) data
    

    // Seed the random number generator
    srand(static_cast<unsigned>(time(nullptr)));

   

    
    
    std::vector<InfraredData> IRobjects(numObjects);

    for(int i = 0; i < seconds; i++){

        //std::cout << "SECONDS" << std::endl;

        for (auto& obj2 : IRobjects) {
               
              obj2 = createRandomIRObject();
              setRadarName(obj2, obj2.objectName);
              updateIRObject(obj2,timeInterval);

               // ProcessData returns a vector
              // ProcessData(obj2);
              FinalData.push_back(obj2);
               
            }
    }


   return FinalData;
    
}


