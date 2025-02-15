1. Create Virtual Environment => `conda create --name flask-api python=3.10 -y`
2. Activate Virtual Environment => `conda activate flask-api`
3. Install dependencies => `pip install -r requirements.txt`
4. Run Flask App => `python app.py`

Initialize Flask-Migrate
`flask db init`

Create the First Migration
`flask db migrate -m "Initial migration"`

Apply Migrations
`flask db upgrade`
