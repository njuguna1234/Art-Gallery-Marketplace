import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for your React frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Directory for saving uploaded images
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/artworks', methods=['POST'])
def submit_artwork():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    image = request.files['image']
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        # Get other form data
        title = request.form['title']
        price = request.form['price']
        description = request.form['description']

        # Here, you can save the artwork details to the database
        # For now, we'll just return a success response
        return jsonify({
            "message": "Artwork successfully submitted",
            "title": title,
            "price": price,
            "description": description,
            "image_url": f"/uploads/{filename}"
        }), 201
    else:
        return jsonify({"error": "Invalid image format"}), 400

@app.route('/api/artworks', methods=['GET'])
def get_artworks():
    # Replace this with actual logic to fetch artworks from your database
    artworks = [{"id": 1, "title": "Sample Art", "description": "Description of sample art", "price": 100.0, "image_url": "/uploads/sample.jpg"}]
    return jsonify({"artworks": artworks}), 200

@app.route('/api/login', methods=['POST'])
def login():
    # Implement your login logic here
    return jsonify({"message": "Login successful"}), 200

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
