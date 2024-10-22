from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for your React frontend URL (localhost during development)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "https://art-gallery-marketplace.onrender.com"]}})

# Your routes and other code
@app.route('/api/artworks', methods=['GET', 'POST'])
def artworks():
    # Handle the request
    pass

if __name__ == '__main__':
    app.run(debug=True)
