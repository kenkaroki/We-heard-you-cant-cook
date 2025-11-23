from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app , origins=["http://localhost:5173"])


#register blueprints
from routes.authentication.auth  import auth_bp

app.register_blueprint(auth_bp, url_prefix="/api/authentication")
@app.route("/health" ,methods=["GET"])
def health():
    return jsonify({
        "status":"good all services are up. I hope..."
    })

