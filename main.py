#!/bin/python3

from whiptail import Whiptail

#https://whiptail.readthedocs.io/en/latest/example.html
w = Whiptail(title="This is the title", backtitle="This is the backtitle")

def addFields():
    prompt = w.inputbox("Enter some text:")[0]
