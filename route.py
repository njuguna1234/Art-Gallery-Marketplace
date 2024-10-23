import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for your frontend URL and local development
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "https://art-gallery-marketplace-i757.onrender.com"]}})

# Define where to store uploaded images
UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Allowed file extensions for image uploads
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    """Check if the uploaded file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/artworks', methods=['POST'])
def upload_artwork():
    """
    Handle POST requests to upload new artwork.

    This route will accept a form with 'title', 'description', 'price', and 'image'.
    It will save the image and return a JSON response indicating success or failure.
    """
    # Check if the request has the form fields
    if 'title' not in request.form or 'description' not in request.form or 'price' not in request.form:
        return jsonify({"error": "Missing form data"}), 400

    # Check if the request contains a file
    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['image']

    # Ensure the user has uploaded a file and it's an allowed file type
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        # Secure the filename and save the file to the upload folder
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        # Get the other form data
        title = request.form['title']
        description = request.form['description']
        price = request.form['price']

        # Normally, you would store this data in the database
        # Example: save_artwork_to_db(title, description, price, filename)

        # Return a success response
        return jsonify({
            "message": "Artwork uploaded successfully",
            "artwork": {
                "title": title,
                "description": description,
                "price": price,
                "image_url": os.path.join(app.config['UPLOAD_FOLDER'], filename)  # Provide the URL of the uploaded image
            }
        }), 201
    else:
        return jsonify({"error": "Invalid file type"}), 400


if __name__ == '__main__':
    app.run(debug=True)
