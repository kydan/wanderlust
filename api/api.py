import json
from flask import Flask
from flask import render_template
from flask import jsonify

# constants
ROOT = 'json'

app = Flask(__name__)

@app.route('/')
def get_root():
  paths = ['/phones','/networks','/countries','/reports']
  return render_template('root.html', paths=paths)
    
@app.route('/phones')
def get_phones():
  js_data = read_json(ROOT + '/phones.json')
  return jsonify(js_data)

@app.route('/networks')
def get_networks():
  js_data = read_json(ROOT + '/networks.json')
  return jsonify(js_data)

@app.route('/countries')
def get_countries():
  js_data = read_json(ROOT + '/countries.json')
  return jsonify(js_data)
  
@app.route('/reports')
def get_reports():
  js_data = read_json(ROOT + '/reports.json')
  return jsonify(js_data)
  
def read_json(file_path):
  json_data = open(file_path, 'r')
  data = json.load(json_data)
  json_data.close()
  return data

if __name__ == "__main__":
    app.run(debug=True)
