#include "radar.h"
#include <cstdlib> // For rand() and srand()
#include <ctime>   // For time()
#include <iostream>
#include <random>
#include <string>

// Generate a random double in the range [min, max]
double randomDouble(double min, double max) {
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
    obj.x = randomDouble(0.0, 800.0);  // Random x position within a range of 0 to 800
    obj.y = randomDouble(0.0, 600.0);  // Random y position within a range of 0 to 600
    obj.vx = randomDouble(-5.0, 5.0);  // Random velocity in the x direction
    obj.vy = randomDouble(-5.0, 5.0);  // Random velocity in the y direction
    obj.size = randomDouble(5.0, 20.0);
    
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

