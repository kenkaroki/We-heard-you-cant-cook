import pymongo
import os

#for test purpouses ##
from dotenv import load_dotenv
load_dotenv()

uri = os.getenv("MongoDbURI")
global client
global secondarydb
client  = pymongo.MongoClient(uri)


class database:
    secondarydb = "maincookdb"
    def create_user(email ,password):
        client.maincookdb.users.insert_one({"username" :email , "password":password})


    def get_user(email):
        user = client.maincookdb.users.find_one({"username" :email})
        return user


