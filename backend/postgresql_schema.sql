-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE NULL, -- now allows NULL for OAuth-only users
    google_oauth_email VARCHAR(100) UNIQUE,
    facebook_oauth_email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    service_chosen BOOLEAN DEFAULT FALSE,
    birth_day INTEGER CHECK (birth_day BETWEEN 1 AND 31),
    birth_month INTEGER CHECK (birth_month BETWEEN 1 AND 12),
    birth_year INTEGER CHECK (birth_year BETWEEN 1900 AND EXTRACT(YEAR FROM CURRENT_DATE)),
    is_admin BOOLEAN DEFAULT FALSE,
    is_owner BOOLEAN DEFAULT FALSE,
    is_provider BOOLEAN DEFAULT FALSE,
    is_student BOOLEAN DEFAULT TRUE,
    auth_provider VARCHAR(20) DEFAULT 'local' CHECK (auth_provider IN ('local', 'google', 'facebook')), -- tracks login method
    last_login TIMESTAMP -- updated at successful login
);


-- PRESCRIPTIONS TABLE (normalized from users)
CREATE TABLE prescriptions (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    prescribed_class VARCHAR(100),
    prescribed_hours INTEGER,
    completed_hours INTEGER,
    course_completed BOOLEAN,
    prescribed_screening VARCHAR(100),
    screening_completed BOOLEAN
);

-- CONTACT TABLE
CREATE TABLE contact (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    phone VARCHAR(20),
    email VARCHAR(100),
    address_1 VARCHAR(255),
    address_2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    zip VARCHAR(20)
);

-- USER UPLOADS TABLE
CREATE TABLE user_uploads (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    id_front TEXT,
    id_back TEXT,
    court_doc1 TEXT,
    court_doc2 TEXT,
    court_doc3 TEXT,
    court_doc4 TEXT
);

-- ORDERS TABLE
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(10, 2),
    date DATE,
    time TIME,
    product VARCHAR(100),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- ALL CLASSES TABLE
CREATE TABLE all_classes (
    id SERIAL PRIMARY KEY,
    class_name VARCHAR(100),
    total_attendees INTEGER,
    instructor_name VARCHAR(100)
);

-- CLASS ATTENDANCE JOIN TABLE
CREATE TABLE class_attendance (
    class_id INTEGER REFERENCES all_classes(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (class_id, user_id)
);

-- SINGLE CLASS TABLE
CREATE TABLE single_class (
    id SERIAL PRIMARY KEY,
    class_name VARCHAR(100),
    class_date DATE,
    class_time TIME,
    total_attended INTEGER
);

-- SINGLE CLASS ATTENDANCE JOIN TABLE
CREATE TABLE single_class_attendance (
    class_id INTEGER REFERENCES single_class(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    completed BOOLEAN,
    PRIMARY KEY (class_id, user_id)
);

-- SERVICE REGISTRANTS TABLE
CREATE TABLE service_registrants (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(100),
    service_description TEXT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- SESSION TABLE (FOR PASSPORT)
CREATE TABLE session (
    sid VARCHAR PRIMARY KEY,
    sess JSON NOT NULL,
    expire TIMESTAMP NOT NULL
);

CREATE INDEX "IDX_session_expire" ON session (expire);

-- LOGIN ATTEMPTS TABLE
CREATE TABLE login_attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    ip_address VARCHAR(45),
    success BOOLEAN,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USER ACTIVITY LOG
CREATE TABLE user_activity_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    action TEXT,
    metadata JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PHI ACCESS LOG (for HIPAA)
CREATE TABLE phi_access_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    patient_id INTEGER,
    accessed_table VARCHAR(100),
    operation VARCHAR(10),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FIELD CHANGE LOG (for HIPAA audit trail)
CREATE TABLE field_change_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    table_name VARCHAR(50),
    column_name VARCHAR(50),
    old_value TEXT,
    new_value TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- FIELD CHANGE LOG (for HIPAA audit trail)
CREATE TABLE login_attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    ip_address VARCHAR(45),
    success BOOLEAN,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);