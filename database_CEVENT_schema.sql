
CREATE DATABASE charity_management;

Connect to the database (run this in pgAdmin query tool after creating the database)
\c charity_management


CREATE TABLE "User" (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    roles VARCHAR(20) NOT NULL CHECK (roles IN ('donor', 'volunteer', 'organizer', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    profile_image_url VARCHAR(255)
);

CREATE TYPE donation_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

CREATE TYPE event_status AS ENUM ('planned', 'ongoing', 'completed', 'cancelled');

CREATE TYPE task_status AS ENUM ('pending', 'in-progress', 'completed', 'cancelled');

CREATE TABLE "CreditCard" (
    card_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    card_number VARCHAR(255) NOT NULL, -- encrypted in application
    expiration_date DATE NOT NULL,
    cvv VARCHAR(255) NOT NULL, -- encrypted in application
    billing_address TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON DELETE CASCADE
);

CREATE TABLE "CharityEvent" (
    event_id SERIAL PRIMARY KEY,
    organizer_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255) NOT NULL,
    target_amount DECIMAL(10, 2) NOT NULL,
    current_amount DECIMAL(10, 2) DEFAULT 0.00,
    status event_status DEFAULT 'planned',
    cover_image_url VARCHAR(255),
    FOREIGN KEY (organizer_id) REFERENCES "User"(user_id) ON DELETE CASCADE
);

CREATE TABLE "Donation" (
    donation_id SERIAL PRIMARY KEY,
    donor_id INT NOT NULL,
    event_id INT NOT NULL,
    credit_card_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status donation_status DEFAULT 'pending',
    transaction_id VARCHAR(255) UNIQUE,
    donation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES "User"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES "CharityEvent"(event_id) ON DELETE CASCADE,
    FOREIGN KEY (credit_card_id) REFERENCES "CreditCard"(card_id) ON DELETE CASCADE
);


CREATE TABLE "Attendance" (
    attendance_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    attendance_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES "User"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES "CharityEvent"(event_id) ON DELETE CASCADE,
    UNIQUE (user_id, event_id) -- Prevent duplicate attendance
);

-- Sponsor table
CREATE TABLE "Sponsor" (
    sponsor_id SERIAL PRIMARY KEY,
    Fname VARCHAR(100) NOT NULL,
    contact_email VARCHAR(100) NOT NULL,
    sponsorship_amount DECIMAL(10, 2) NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES "CharityEvent"(event_id) ON DELETE CASCADE
);

CREATE TABLE "Task" (
    task_id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    assigned_user_id INT NOT NULL,
    description TEXT NOT NULL,
    status task_status DEFAULT 'pending',
    deadline TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (event_id) REFERENCES "CharityEvent"(event_id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_user_id) REFERENCES "User"(user_id) ON DELETE CASCADE
);


CREATE INDEX idx_event_status ON "CharityEvent"(status);
CREATE INDEX idx_donation_status ON "Donation"(status);
CREATE INDEX idx_task_status ON "Task"(status);
CREATE INDEX idx_user_role ON "User"(roles);