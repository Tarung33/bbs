import subprocess
import sys
import os
import time

# Ensure UTF-8 output encoding on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except AttributeError:
        pass

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(root_dir, "backend")
    frontend_dir = os.path.join(root_dir, "frontend")

    # Determine Python executable
    venv_backend_win = os.path.join(backend_dir, "venv", "Scripts", "python.exe")
    venv_root_win = os.path.join(root_dir, "venv", "Scripts", "python.exe")
    venv_backend_nix = os.path.join(backend_dir, "venv", "bin", "python")
    venv_root_nix = os.path.join(root_dir, "venv", "bin", "python")

    if os.path.exists(venv_backend_win):
        python_exe = venv_backend_win
    elif os.path.exists(venv_root_win):
        python_exe = venv_root_win
    elif os.path.exists(venv_backend_nix):
        python_exe = venv_backend_nix
    elif os.path.exists(venv_root_nix):
        python_exe = venv_root_nix
    else:
        python_exe = sys.executable

    # Command for backend
    backend_cmd = [python_exe, "-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000", "--reload"]

    # Command for frontend
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    frontend_cmd = [npm_cmd, "run", "dev"]

    print("==================================================")
    print("      CRYPTOVISOR Single-Command Runner")
    print("==================================================")
    print(f"Backend  : http://127.0.0.1:8000")
    print(f"Frontend : http://localhost:5173")
    print("==================================================\n")

    processes = []
    try:
        p_backend = subprocess.Popen(backend_cmd, cwd=backend_dir)
        processes.append(p_backend)

        p_frontend = subprocess.Popen(frontend_cmd, cwd=frontend_dir)
        processes.append(p_frontend)

        while True:
            time.sleep(1)
            for p in processes:
                if p.poll() is not None:
                    print(f"\n[!] Process exited with code {p.returncode}. Shutting down...")
                    raise KeyboardInterrupt
    except KeyboardInterrupt:
        print("\n[*] Stopping CRYPTOVISOR servers...")
        for p in processes:
            if p.poll() is None:
                p.terminate()
        for p in processes:
            p.wait()
        print("[+] All servers stopped successfully.")

if __name__ == "__main__":
    main()
