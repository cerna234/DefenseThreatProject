import ctypes

# Load the shared library into ctypes
lib = ctypes.CDLL('./compiledSim.so')  # On Windows, use './example.dll'

# Define the argument and return types of the C++ functions
#lib.runInfraredSim.argtypes = ()


# Call the C++ function
result = lib.runInfraredSim()
print(result)

RadarResult = lib.runRadarSim()
print(RadarResult)

# Call the hello function
