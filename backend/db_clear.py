from db_models import db, Event
from server import app
def clear_events():
    with app.app_context():
        db.session.query(Event).delete()
        db.session.commit()
        print("All events have been cleared from the database.")

if __name__ == "__main__":
    clear_events()