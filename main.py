#!/bin/python3

from whiptail import Whiptail
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Seven*Subway*Jinn*Poseidon",
    database="wellbeing",
    collation="utf8mb4_general_ci"
)

c = mydb.cursor()

w = Whiptail(title="Wellbeing", backtitle="")

def addFields():
    name = w.inputbox("Name of the field to add:")[0]

    if name == "":
        return 1
    
    kind = w.menu("Please select the kind of field.", ["Quantity", "Scale", "Habit", "Time Spent"])[0]
    #Quantity = float
    #Scale = x to y
    #Habit = Done (Check or not check)
    #Time Spend = Minutes/Hours doing things, allow calculus (WIP)

    if kind == "":
        return 1
    elif kind == "Time Spent":
        kind="Time"

    #TODO: Ask for scale (x,y)
    scaleX = 0
    scaleY = 6

    #TODO: Check duplicates (name)
    c.execute("INSERT INTO fields (name, kind) VALUES (%s, %s)", [name, kind])
    mydb.commit()

def addData():
    c.execute("SELECT * FROM fields")
    result = c.fetchall()

    fields = []
    for x in result:
        fields.append(x[1])

    field = w.menu("Please select a field to add data to.", fields)[0]
    #TODO: Do not allow multiple data a day. If the field has existing data for today: show and ask to add or reset?
    
    

def main():
    menu = w.menu("Please select what you wanna do.", ["addFields", "addData"])[0]

    if menu == "addFields":
        addFields()
    elif menu == "addData":
        addData()

if __name__ == "__main__":
    main()