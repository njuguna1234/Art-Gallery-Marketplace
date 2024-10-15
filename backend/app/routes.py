from flask import Blueprint, request, jsonify
from app import db
from app.models import User, Artwork, Review, Purchase
from flask_jwt_extended import jwt_required, get_jwt_identity

main_bp = Blueprint('main', __name__)

# Get all artworks
@main_bp.route('/artworks', methods=['GET'])
def get_artworks():
    artworks = Artwork.query.all()
    return jsonify([artwork.to_dict() for artwork in artworks]), 200

# Create new artwork (artist only)
@main_bp.route('/artworks', methods=['POST'])
@jwt_required()
def create_artwork():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user.is_artist:
        return jsonify({"error": "Only artists can upload artworks"}), 403
    
    data = request.get_json()
    new_artwork = Artwork(
        title=data['title'],
        description=data['description'],
        price=data['price'],
        artist_id=user_id
    )
    
    db.session.add(new_artwork)
    db.session.commit()
    return jsonify(new_artwork.to_dict()), 201

# Review Artwork
@main_bp.route('/artworks/<int:artwork_id>/review', methods=['POST'])
@jwt_required()
def create_review(artwork_id):
    data = request.get_json()
    user_id = get_jwt_identity()
    
    new_review = Review(
        content=data['content'],
        rating=data['rating'],
        user_id=user_id,
        artwork_id=artwork_id
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_dict()), 201

# Purchase Artwork
@main_bp.route('/artworks/<int:artwork_id>/purchase', methods=['POST'])
@jwt_required()
def purchase_artwork(artwork_id):
    user_id = get_jwt_identity()
    purchase = Purchase(user_id=user_id, artwork_id=artwork_id)
    db.session.add(purchase)
    db.session.commit()
    return jsonify({"message": "Artwork purchased successfully"}), 201
