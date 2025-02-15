from flask import Blueprint, request, jsonify
from services.user_service import UserService

# Define Blueprint
user_blueprint = Blueprint('user_blueprint', __name__)

# Initialize service
user_service = UserService()

# GET all users
@user_blueprint.route("/", methods=["GET"])
def get_users():
    users = user_service.get_all_users()
    return jsonify(users), 200

# GET single user by ID
@user_blueprint.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = user_service.get_user_by_id(user_id)
    if user:
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404

# POST: Create new user
@user_blueprint.route("/", methods=["POST"])
def create_user():
    data = request.json
    new_user = user_service.create_user(data.get("name"), data.get("email"))
    return jsonify(new_user), 201

# DELETE user by ID
@user_blueprint.route("/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    result = user_service.delete_user(user_id)
    if result:
        return jsonify({"message": "User deleted"}), 200
    return jsonify({"error": "User not found"}), 404
