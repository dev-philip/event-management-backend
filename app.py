from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS
CORS(app)

# Initialize database and migrations
from models import db  # Import db from models/__init__.py
db.init_app(app)  # Correctly initialize SQLAlchemy with the app

migrate = Migrate(app, db)  # Initialize Flask-Migrate

# Import models AFTER initializing db
from models.user_model import User  
from models.post_model import Post  

# Import and register API routes FIRST
from controllers.user_controller import user_blueprint
app.register_blueprint(user_blueprint, url_prefix="/api/users")

# Base URL route - API Documentation
@app.route("/")
def home():
    return {
        "message": "Welcome to the User API",
        "endpoints": {
            "GET /api/users/": "Retrieve all users",
            "GET /api/users/<user_id>": "Retrieve a single user",
            "POST /api/users/": "Create a new user",
            "DELETE /api/users/<user_id>": "Delete a user"
        }
    }

# Run the app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
