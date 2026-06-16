import sqlite3
import os

# Create database folder if it doesn't exist
os.makedirs("database", exist_ok=True)

# Connect to SQLite database
conn = sqlite3.connect("database/health_service.db")

cursor = conn.cursor()

# Patients Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    gender TEXT,
    age INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

# Doctors Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT NOT NULL,
    specialty TEXT,
    email TEXT,
    phone TEXT
)
""")

# Appointments Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    doctor_id INTEGER,
    appointment_date TEXT,
    appointment_time TEXT,
    status TEXT DEFAULT 'Pending',

    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
)
""")

# Services Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_name TEXT NOT NULL,
    description TEXT
)
""")

# Contacts Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

# Save changes
conn.commit()

# Close connection
conn.close()

print("✅ SQLite database created successfully!")
print("📁 Database location: database/health_service.db")