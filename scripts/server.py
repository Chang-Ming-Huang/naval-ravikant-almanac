#!/usr/bin/env python3
"""
Simple HTTP Server for Naval Ravikant Almanac Website
Usage: python server.py [port]
Default port: 8000
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path

def run_server(port=8000, open_browser=True):
    """
    Run a simple HTTP server for the website
    
    Args:
        port (int): Port number to run the server on
        open_browser (bool): Whether to automatically open the browser
    """
    
    # Change to the directory containing this script
    script_dir = Path(__file__).parent.absolute()
    os.chdir(script_dir)
    
    # Check if index.html exists
    if not Path('index.html').exists():
        print("❌ Error: index.html not found in current directory!")
        print(f"Current directory: {script_dir}")
        return False
    
    # Create server
    Handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), Handler) as httpd:
            server_url = f"http://localhost:{port}"
            
            print("🚀 Naval Ravikant Almanac Server Starting...")
            print("=" * 50)
            print(f"📂 Serving directory: {script_dir}")
            print(f"🌐 Server URL: {server_url}")
            print(f"📱 Port: {port}")
            print("=" * 50)
            print("✅ Server is running! Press Ctrl+C to stop.")
            print()
            
            # Open browser automatically
            if open_browser:
                print("🔗 Opening browser...")
                try:
                    webbrowser.open(server_url)
                except Exception as e:
                    print(f"⚠️  Could not open browser automatically: {e}")
                    print(f"👆 Please manually open: {server_url}")
            else:
                print(f"👆 Open your browser and go to: {server_url}")
            
            print()
            print("📄 Available files:")
            for file in sorted(Path('.').glob('*')):
                if file.is_file() and not file.name.startswith('.'):
                    size = file.stat().st_size
                    size_str = f"{size:,} bytes" if size < 1024 else f"{size/1024:.1f} KB"
                    print(f"   • {file.name} ({size_str})")
            
            print("\n" + "=" * 50)
            
            # Start serving
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Error: Port {port} is already in use!")
            print(f"💡 Try a different port: python server.py {port + 1}")
        else:
            print(f"❌ Error starting server: {e}")
        return False
    
    except KeyboardInterrupt:
        print("\n" + "=" * 50)
        print("🛑 Server stopped by user")
        print("👋 Thanks for using Naval Ravikant Almanac!")
        return True

def main():
    """Main function to handle command line arguments"""
    
    # Default port
    default_port = 8000
    port = default_port
    
    # Parse command line arguments
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
            if port < 1024 or port > 65535:
                print("⚠️  Warning: Port should be between 1024 and 65535")
                if port < 1024:
                    print("💡 Using default port 8000 instead")
                    port = default_port
        except ValueError:
            print(f"❌ Invalid port number: {sys.argv[1]}")
            print(f"💡 Using default port {default_port}")
            port = default_port
    
    # Show help if requested
    if len(sys.argv) > 1 and sys.argv[1] in ['-h', '--help', 'help']:
        print("📖 Naval Ravikant Almanac - Simple Server")
        print()
        print("Usage:")
        print(f"  python {Path(__file__).name}")
        print(f"  python {Path(__file__).name} [port]")
        print(f"  python {Path(__file__).name} --help")
        print()
        print("Examples:")
        print(f"  python {Path(__file__).name}        # Start server on port 8000")
        print(f"  python {Path(__file__).name} 3000   # Start server on port 3000")
        print()
        print("Features:")
        print("  • Automatic browser opening")
        print("  • File listing and sizes")
        print("  • Error handling")
        print("  • Clean shutdown with Ctrl+C")
        return
    
    # Run the server
    run_server(port)

if __name__ == "__main__":
    main()