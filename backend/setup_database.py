#!/usr/bin/env python3
"""
Database setup script for deployment.
This script ensures the SQLite database file is available in the correct location.
"""

import os
import shutil
import sys
from pathlib import Path

def find_database():
    """Find the database file in various possible locations."""
    possible_paths = [
        Path.cwd() / "lds-scriptures-sqlite.db",
        Path.cwd() / "submodules" / "lds-scriptures" / "sqlite" / "lds-scriptures-sqlite.db",
        Path.cwd().parent / "submodules" / "lds-scriptures" / "sqlite" / "lds-scriptures-sqlite.db",
        Path.cwd().parent.parent / "submodules" / "lds-scriptures" / "sqlite" / "lds-scriptures-sqlite.db",
    ]
    
    for path in possible_paths:
        if path.exists():
            return path
    return None

def setup_database():
    """Set up the database file in the current directory."""
    print("Setting up database...")
    print(f"Current working directory: {Path.cwd()}")
    
    # List current directory contents
    print("Current directory contents:")
    for item in Path.cwd().iterdir():
        print(f"  {item}")
    
    # Find the database file
    db_source = find_database()
    if db_source is None:
        print("ERROR: Could not find database file in any expected location")
        print("Searched in:")
        for path in [
            Path.cwd() / "lds-scriptures-sqlite.db",
            Path.cwd() / "submodules" / "lds-scriptures" / "sqlite" / "lds-scriptures-sqlite.db",
            Path.cwd().parent / "submodules" / "lds-scriptures" / "sqlite" / "lds-scriptures-sqlite.db",
            Path.cwd().parent.parent / "submodules" / "lds-scriptures" / "sqlite" / "lds-scriptures-sqlite.db",
        ]:
            print(f"  {path} (exists: {path.exists()})")
        sys.exit(1)
    
    print(f"Found database at: {db_source}")
    
    # Copy to current directory (only if not already there)
    db_dest = Path.cwd() / "lds-scriptures-sqlite.db"
    if db_source != db_dest:
        shutil.copy2(db_source, db_dest)
        print(f"Copied database to: {db_dest}")
    else:
        print(f"Database already exists at: {db_dest}")
    print(f"Database file size: {db_dest.stat().st_size} bytes")
    
    # Verify the copy
    if db_dest.exists():
        print("✅ Database setup successful!")
    else:
        print("❌ Database setup failed!")
        sys.exit(1)

if __name__ == "__main__":
    setup_database() 