
---------SLEEP-------------
################
Dummy-sleep
Python Script
1
1
###############
import time
global time

#############

def funct(inputs):
    out = inputs[0]
    time.sleep(:PARAM1)
    return [out]

########

:PARAM1 type int value 2

-----------END SLEEP------------



-------SPLIT-----------
#########
Tratamient-Split
Python Script
1
2
##########


from sklearn.model_selection import train_test_split
global train_test_split

#################
def FUNC(inputs):
    input1 = inputs[0]
    X_train, test = train_test_split(input1, test_size=:PARAM1, random_state=:PARAM2)
    return [X_train, test]

###############
:PARAM1 float 0.1
:PARAM2 int value 123

----------END SPLIT--------------


--------------DATASET CSV-----------
####################
Datos-DataSetCSV
Python Script
input 0
output 1
####################

import pandas as pd
global pd

#################

def func(inputs):
    out = pd.read_csv(filepath_or_buffer=:PARAM1,
                      sep=:PARAM2)
    return [out]


############

:PARAM1 typeCSV  value ''
:PARAM2 string value ','

###############

-----------END DATASET-------------



para correr el satelite 
python runcode.py [proyecto_id] http://127.0.0.1:8081







