"""
Author: Andrew M

this project will be;
* amalgamation of various webapps and tooling + blog/rants + about me(linedin summary basically)
"""

import http.server
import socketserver
import os

PORT = int(os.environ.get("PORT", 8000))  # Use Heroku's port if available
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    print(f"Serving at http://0.0.0.0:{PORT}")
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()
