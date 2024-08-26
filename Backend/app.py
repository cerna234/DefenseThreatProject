from flask import Flask, jsonify, request
import ctypes

# Load the shared library into ctypes
lib = ctypes.CDLL('./compiledSim.so')  # On Windows, use './example.dll'

# Define the argument and return types of the C++ functions
#lib.runInfraredSim.argtypes = ()

# Call the C++ function
result = lib.runInfraredSim()



app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    print(result)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)