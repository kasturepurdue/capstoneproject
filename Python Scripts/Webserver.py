from flask import Flask, request, jsonify
from flask_cors import CORS
import PLC_Comm as plc
import json
import threading as thr
import time



app = Flask(__name__)
# Enable CORS for a specific origin
CORS(app)




"""
curl -X PUT -H "Content-Type: application/json" -d "{\"event\": \"Change_Motor\", \"Motor_Status\": 0}" http://localhost:5000/webhook
curl -G -H "Content-Type: application/json" http://localhost:5000/webhook -d "event=Cycle_Check"
DO IN CMD NOT POWERSHELL
"""

@app.route('/webhook', methods=['GET', 'PUT'])
def webhook_listener():
    """
    This function listens for POST requests to the /webhook endpoint.
    """
    if request.method == 'GET':
        try:
            # Get the JSON payload from the request body
            print(request)
            data = request.args
            if data["event"] == "Cycle_Check":
                print("inside get event")
                cycles = plc.readCycles()
                # Process the received data here (e.g., store in database, trigger another action)
                return jsonify({"status": "success", "message": "Webhook received", "numCycles": cycles}), 200
            elif data:
                print("inside get data")
                return jsonify({"status": "error", "message": "Not a valid GET request"}), 500
            else:
                print("inside get error")
                return jsonify({"status": "error", "message": "No JSON payload received"}), 400
        except Exception as e:
            print(f"Error processing webhook: {e}")
            return jsonify({"status": "error", "message": f"Error processing request: {e}"}), 500
    elif request.method == 'PUT':
        try:
            # Get the JSON payload from the request body
            data = request.get_json()
            if data["event"] == "Change_Motor":
                if data["Motor_Status"] == 1:
                    print("start motor")
                    plc.startMotor(data["Num_Cycles"])
                elif data["Motor_Status"] == 0:
                    print("stop motor")
                    plc.stopMotor()
                else:
                    return jsonify({"status": "error", "message": "Not a valid motor state"})
                # Process the received data here (e.g., store in database, trigger another action)
                return jsonify({"status": "success", "message": "Webhook Put"}), 200
            elif data:
                return jsonify({"status": "error", "message": "Not a valid PUT request"}), 500
            else:
                return jsonify({"status": "error", "message": "No JSON payload received"}), 400
        except Exception as e:
            print(f"Error processing webhook: {e}")
            return jsonify({"status": "error", "message": f"Error processing request: {e}"}), 500
    else:
        # This route only handles POST requests, so other methods are not allowed
        return jsonify({"status": "error", "message": "Method not allowed"}), 405

def test1(id):
    for i in range(20):
        print("thread " + str(id) + ", " + str(i))
        time.sleep(1)

def test2():
    for i in range(20):
        if i % 2 == 0:
            print("thread 2, " + str(i))
        time.sleep(1)


def test(dict):
    t1 = thr.Thread(target=test1,args=(dict["user_id"],), daemon=True)
    #t2 = thr.Thread(target=test2, daemon=True)
    t1.start()
    #t2.start()
    if dict["user_id"] == 123:
        print("success")
        return jsonify({"status": "success", "message": "test success"}), 200
    else:
        print("failure")
        return jsonify({"status": "success", "message": "test failure"}), 200



if __name__ == '__main__':
    # Run the Flask app on a specific host and port
    # For local testing, you can use '0.0.0.0' to make it accessible from other devices on your network
    plc.startup()
    app.run(host='0.0.0.0', port=5000)