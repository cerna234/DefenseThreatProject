#ifndef INFRARED_H
#define INFRARED_H
#include <string>
#include <vector>

// structure in which data will be stored

struct InfraredData {
    std::string objectName;
    float x; // X coordinate
    float y; // Y coordinate
    float vx;
    float vy;
    float intensity; // IR intensity
    float temperature; // Temperature
    int hotspots;
};



InfraredData createRandomIRObject();

void updateIRObject(InfraredData& obj,double dt);

void outputData(std::vector<InfraredData> data);

// Function will be used to clasify each object that is observed
void setRadarName(InfraredData& obj,std::string ObjectName);

std::vector<InfraredData> runInfraredSim();

std::vector<InfraredData> ProcessData(InfraredData& obj);


#endif // INFRARED_H
