from pycomm3 import LogixDriver as comm
from pycomm3 import CIPDriver as scanner
import time
ip = ""

# the plc need to be physically set to RUN mode for this to function

def main():
    global ip
    devices = scanner.discover()
    for item in devices:
        if item["product_name"] == "2080-LC50-24QWB":
           ip = item["ip_address"]
    
    while(True):
        break

def startup():
    global ip
    devices = scanner.discover()
    for item in devices:
        if item["product_name"] == "2080-LC50-24QWB":
           ip = item["ip_address"]

def startMotor(cycles):
    with comm(ip) as plc:
        plc.write(("Start_Pump", True))
        time.sleep(.5)
        startCycles(cycles)
        


def stopMotor():
    with comm(ip) as plc:
        plc.write(("Start_Pump", False), ("Valve_Cycles", False))


def readCycles():
    with comm(ip) as plc:
        return plc.read(("showcase_value"))
    
def startCycles(cycles):
    with comm(ip) as plc:
        plc.write(("Valve_Cycles", True),("Num_Cycles", cycles))

def start():
    input("press enter to start")
    
    with comm(ip) as plc:
        plc.write(("Start_Cycles",True))
        while (True):
            temp = plc.read("showcase_value")[1]
            print(temp)
            if (temp == 60):
                break
            time.sleep(1)
        plc.write(("Progam_estop", True))
        


if __name__ == "__main__":
    main()