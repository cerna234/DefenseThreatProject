#ifndef RADAR_H
#define RADAR_H
#include <string>
#include <vector>

// Structure to represent an object detected by radar
struct RadarObject {
    double x, y;       // Position (x and y coordinates)
    double vx, vy;     // Velocity components (speed in x and y directions)
    double size;   
    std::string name;    // Size (diameter or radius of the object)
};

// Function to generate a random double in the range [min, max]
double randomDoubleIR(double min, double max);

// Function to generate a random integer in the range [min, max]
int randomInt(int min, int max);

// Function to create a random radar object
RadarObject createRandomObject();

// Function to update the position of an object based on its velocity
void updatePosition(RadarObject& obj, double dt);

// Function to print the data of a radar object (position, speed, size)
void printObjectData(const RadarObject& obj,std::string objectName,int objectNum);

void setName(RadarObject& obj,int objectNum);

#endif // RADAR_H
