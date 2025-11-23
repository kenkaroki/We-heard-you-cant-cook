from flask import Blueprint , request , jsonify
import hashlib


from database.config import database

auth_bp = Blueprint(name="authentication", import_name=__name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    user_info=request.get_json()
    email = user_info["email"]
    password = user_info["password"]

    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    if not email or not password:
        return jsonify({
            "message":"allfields are required"
        }, 400)
    
    try:
        user_db_info = database.get_user(email)

        if not user_db_info:
            return jsonify({
                "message":"user not found"
            },404)
        
        if hashed_password == user_db_info["password"]:
            return jsonify({
                "message" : "login successful"
            },200)
        
        return jsonify({
            "message" : "incorrect username or password"
        },403)
    except:
        return jsonify({
                "message" : "sorry cant log you in right now. We are experiencing some issues"
        }, 500)
        
    
@auth_bp.route("/signup" , methods=["POST"])
def signup():
    user_info=request.get_json()
    email = user_info["email"]
    password = user_info["password"]

    hashed_password = hashlib.sha256(password.encode()).hexdigest()
   

    if not email or not password:
        return jsonify({
            "message":"allfields are required"
        }),500
    
    try:
        user_db_info = database.get_user(email)

        if user_db_info is not None:  # More Pythonic than != None
            return jsonify({
                "message": "user already exists"
            }), 409
        
        database.create_user(email, hashed_password)
        return jsonify({
            "message": "user created successfully"
        }), 201
    
        
    except:
        return jsonify({
                "message" : "Sorry cant sign you up right now. We are experiencing some issues"
        }),500
        