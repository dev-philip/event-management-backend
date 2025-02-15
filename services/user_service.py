from models.user_model import User
from models import db

class UserService:
    def get_all_users(self):
        """Fetch all users from the database."""
        users = User.query.all()
        return [user.to_dict() for user in users]

    def get_user_by_id(self, user_id):
        """Fetch a single user by ID."""
        user = User.query.get(user_id)
        return user.to_dict() if user else None

    def create_user(self, name, email):
        """Create a new user."""
        new_user = User(name=name, email=email)
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict()

    def delete_user(self, user_id):
        """Delete user by ID."""
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return False
