import flask
import os
from db_models import db, Event, Place
from flask_cors import CORS
import hashlib

app = flask.Flask(__name__)

app.config["FLASK_SECRET_KEY"] = "f87b4ed82a5ae04b1c4a598ab9c8e5"

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_DIR = os.path.join(BASE_DIR, "database")
DB_PATH = os.path.join(DB_DIR, "users.db")

os.makedirs(DB_DIR, exist_ok=True)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + DB_PATH
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

CORS(app)

@app.route('/api/events/add', methods=['POST'])
def add_event():
    data = flask.request.get_json()
    title = data.get('name')
    date = data.get('date')
    time = data.get('time')
    endtime = data.get('endTime')
    description = data.get('description')
    location = data.get('location')
    category = data.get('category')
    organizer = data.get('organizer')
    weblink = data.get('weblink')
    image = data.get('image')
    address = data.get('address')
    if not title or not date or not time:
        return flask.jsonify({"error": "Title, date, and time are required fields."}), 400
    event = Event()
    event.name = title
    event.date = date
    event.time = time
    event.description = description
    event.end_time = endtime
    event.location = location
    event.category = category
    event.organizer = organizer
    event.weblink = weblink
    event.image = image
    event.address = address
    unique_string = f"{title}_{date}_{time}_{description}"
    event.id = hashlib.md5(unique_string.encode('utf-8')).hexdigest()
    db.session.add(event)
    db.session.commit()
    return flask.jsonify({"message": "Event added successfully!"}), 201

@app.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    events_list = []
    for event in events:
        events_list.append({
            "id": event.id,
            "name": event.name,
            "date": event.date,
            "time": event.time,
            "description": event.description,
            "location": event.location,
            "category": event.category,
            "organizer": event.organizer,
            "weblink": event.weblink,
            "image": event.image,
            "address": event.address
        })
    return flask.jsonify(events_list), 200

@app.route('/api/events/<string:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return flask.jsonify({"error": "Event not found."}), 404
    event_data = {
        "id": event.id,
        "name": event.name,
        "date": event.date,
        "time": event.time,
        "description": event.description,
        "location": event.location,
        "category": event.category,
        "organizer": event.organizer,
        "weblink": event.weblink,
        "image": event.image,
        "address": event.address
    }
    return flask.jsonify(event_data), 200

@app.route('/api/places', methods=['GET'])
def get_places():
    places = Place.query.all()
    places_list = []
    for place in places:
        places_list.append({
            "id": place.id,
            "name": place.name,
            "category": place.category,
            "description": place.description,
            "location": place.location,
            "weblink": place.weblink,
            "image": place.image,
            "address": place.address
        })
    return flask.jsonify(places_list), 200

@app.route('/api/places/add', methods=['POST'])
def add_place():
    data = flask.request.get_json()
    name = data.get('name')
    category = data.get('category')
    description = data.get('description')
    location = data.get('location')
    weblink = data.get('weblink')
    image = data.get('image')
    address = data.get('address')
    if not name or not location:
        return flask.jsonify({"error": "Name and location are required fields."}), 400
    place = Place()
    place.name = name
    place.category = category
    place.description = description
    place.location = location
    place.weblink = weblink
    place.image = image
    place.address = address
    unique_string = f"{name}_{location}_{description}"
    place.id = hashlib.md5(unique_string.encode('utf-8')).hexdigest()
    db.session.add(place)
    db.session.commit()
    return flask.jsonify({"message": "Place added successfully!"}), 201

@app.route('/api/places/<string:place_id>', methods=['GET'])
def get_place(place_id):
    place = Place.query.get(place_id)
    if not place:
        return flask.jsonify({"error": "Place not found."}), 404
    place_data = {
        "id": place.id,
        "name": place.name,
        "category": place.category,
        "description": place.description,
        "location": place.location,
        "weblink": place.weblink,
        "image": place.image,
        "address": place.address
    }
    return flask.jsonify(place_data), 200

if __name__ == '__main__':
    app.run(debug=True)