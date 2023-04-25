from flask import Flask
from model import make_pred
app = Flask(__name__)

@app.route('/data')
def index():
    y1, y2, y3 = make_pred()
    return {
        "predictedData": y1,
        "originalData": y2,
        "next30daysData": y3
    }

if __name__ == "__main__":
    app.run(debug=True)
