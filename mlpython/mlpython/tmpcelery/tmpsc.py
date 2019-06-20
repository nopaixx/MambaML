
import time
stri = """
def func():
    print("run")
    ret = 2*2
    return ret
"""

exec(stri)

while True:

    print(func())
    time.sleep(1)
