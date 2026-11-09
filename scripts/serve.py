import http.server
import socket
import sys
import mimetypes

PORT = 8092

mimetypes.add_type('image/webp', '.webp')
mimetypes.add_type('application/json', '.json')
mimetypes.add_type('font/woff2', '.woff2')
mimetypes.add_type('font/woff', '.woff')
mimetypes.add_type('application/wasm', '.wasm')

# Common exceptions raised when a browser tab closes or cancels a request
CLIENT_DISCONNECT_EXCEPTIONS = (
    ConnectionResetError,
    ConnectionAbortedError,
    BrokenPipeError,
    TimeoutError
)

class MultiThreadedCORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def handle(self):
        """Process incoming requests, suppressing client disconnection noise."""
        try:
            super().handle()
        except CLIENT_DISCONNECT_EXCEPTIONS:
            pass
        except socket.error as e:
            winerror = getattr(e, 'winerror', None) or getattr(e, 'errno', None)
            if winerror in (10053, 10054):
                pass
            else:
                raise

    def handle_one_request(self):
        """Read and handle a single HTTP request, catching disconnects during header reads."""
        try:
            super().handle_one_request()
        except CLIENT_DISCONNECT_EXCEPTIONS:
            self.close_connection = True
        except socket.error as e:
            winerror = getattr(e, 'winerror', None) or getattr(e, 'errno', None)
            if winerror in (10053, 10054):
                self.close_connection = True
            else:
                raise

    def copyfile(self, source, outputfile):
        """Stream file contents to client, catching disconnects if user leaves page mid-stream."""
        try:
            super().copyfile(source, outputfile)
        except CLIENT_DISCONNECT_EXCEPTIONS:
            pass
        except socket.error as e:
            winerror = getattr(e, 'winerror', None) or getattr(e, 'errno', None)
            if winerror in (10053, 10054):
                pass
            else:
                raise

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        try:
            super().end_headers()
        except CLIENT_DISCONNECT_EXCEPTIONS:
            pass

    def do_OPTIONS(self):
        try:
            self.send_response(200, "ok")
            self.end_headers()
        except CLIENT_DISCONNECT_EXCEPTIONS:
            pass

    def do_POST(self):
        if self.path.startswith('/api/diag-log'):
            try:
                length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(length)
                with open('scripts/sketchfab_materials.json', 'wb') as f:
                    f.write(body)
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"status":"saved"}')
            except CLIENT_DISCONNECT_EXCEPTIONS:
                pass
            return
        self.send_error(404, "Not Found")

    def log_message(self, format, *args):
        # Keep terminal clean and quiet during normal traffic
        pass

class HighSpeedThreadingServer(http.server.ThreadingHTTPServer):
    allow_reuse_address = True
    daemon_threads = True

    def handle_error(self, request, client_address):
        """Gracefully ignore normal browser socket terminations without polluting stderr."""
        exc_type, exc_val, exc_tb = sys.exc_info()
        if exc_type and issubclass(exc_type, CLIENT_DISCONNECT_EXCEPTIONS):
            return
        if exc_type and issubclass(exc_type, socket.error):
            winerror = getattr(exc_val, 'winerror', None) or getattr(exc_val, 'errno', None)
            if winerror in (10053, 10054):
                return
        super().handle_error(request, client_address)

def run_server():
    server_address = ("", PORT)
    with HighSpeedThreadingServer(server_address, MultiThreadedCORSRequestHandler) as httpd:
        print(f"High-Speed Multi-Threaded Server running at http://localhost:{PORT}/")
        print("Press Ctrl+C to stop.")
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == '__main__':
    run_server()
