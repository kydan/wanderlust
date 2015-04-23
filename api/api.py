import json
import os
from flask import Flask
from flask import render_template
from flask import jsonify

# constants
ROOT = 'json'

app = Flask(__name__)

@app.route('/',methods=['GET'])
def get_root():
  api_paths = ['/phones','/networks','/countries','/reports']
  return render_template('root.html', paths=api_paths)
    
@app.route('/phones',methods=['GET'])
def get_phones():
  js_data = read_json(ROOT + '/phones.json')
  #js_data['data'].append({'foo':'bar'}) #<== Example of how we can add data to our base json objects
  return jsonify(js_data)

@app.route('/networks',methods=['GET'])
def get_networks():
  js_data = read_json(ROOT + '/networks.json')
  return jsonify(js_data)

@app.route('/countries',methods=['GET'])
def get_countries():
  js_data = read_json(ROOT + '/countries.json')
  return jsonify(js_data)
  
@app.route('/reports',methods=['GET'])
def get_reports():
  js_data = read_json(ROOT + '/reports.json')
  return jsonify(js_data)
  
# Helper method to read the flat json
def read_json(file_path):
  json_data = open(file_path, 'r')
  data = json.load(json_data)
  json_data.close()
  return data

if __name__ == "__main__":
  port = int(os.environ['PORT'])
  host = os.environ['IP']
  app.run(debug=True,port=port,host=host)


