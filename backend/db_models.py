from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Event(db.Model):
    id = db.Column(db.String(128), primary_key=True)
    time = db.Column(db.String(5), nullable=False)
    end_time = db.Column(db.String(5), nullable=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=True)
    organizer = db.Column(db.String(100), nullable=True)
    description = db.Column(db.Text, nullable=True)
    date = db.Column(db.String(10), nullable=False)
    weblink = db.Column(db.String(200), nullable=True)
    location = db.Column(db.String(200), nullable=True)
    image = db.Column(db.Text, nullable=True)
    address = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f"<Event {self.name}>"

class Place(db.Model):
    id = db.Column(db.String(128), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=True)
    description = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(200), nullable=False)
    weblink = db.Column(db.String(200), nullable=True)
    image = db.Column(db.Text, nullable=True)
    address = db.Column(db.String(200), nullable=True)
    def __repr__(self):
        return f"<Place {self.name}>"