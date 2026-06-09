import sqlite3

conn = sqlite3.connect("support_crm.db")

cursor = conn.cursor()

cursor.execute("""
SELECT name
FROM sqlite_master
WHERE type='table';
""")

tables = cursor.fetchall()

print("Tables:")
print(tables)

conn.close()