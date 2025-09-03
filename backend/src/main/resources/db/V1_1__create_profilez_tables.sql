CREATE TYPE candidate_status AS ENUM (
    'APPLIED',
    'SCREENING',
    'INTERVIEW_SCHEDULED',
    'INTERVIEW_COMPLETED',
    'OFFER_EXTENDED',
    'HIRED',
    'REJECTED',
    'WITHDRAWN'
);

CREATE TYPE document_type AS ENUM (
    'RESUME',
    'COVER_LETTER',
    'PORTFOLIO',
    'CERTIFICATE',
    'OTHER'
);

CREATE TABLE candidate_v1 (
    id UUID PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    date_of_birth DATE,
    experience INTEGER NOT NULL,
    status candidate_status NOT NULL DEFAULT 'APPLIED',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    summary TEXT
);

CREATE TABLE education_v1 (
    id UUID PRIMARY KEY,
    candidate_id UUID NOT NULL,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    fieldOfStudy VARCHAR(255) NOT NULL,
    graduationYear INT,
    gpa NUMERIC(3,2),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (candidate_id) REFERENCES candidate_v1 (id) ON DELETE CASCADE
);

CREATE TABLE work_experience_v1 (
    id UUID PRIMARY KEY,
    candidate_id UUID NOT NULL,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (candidate_id) REFERENCES candidate_v1 (id) ON DELETE CASCADE
);

CREATE TABLE skill_v1 (
    id UUID PRIMARY KEY,
    candidate_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    level VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (candidate_id) REFERENCES candidate_v1 (id) ON DELETE CASCADE,
    CONSTRAINT uq_candidate_skill UNIQUE (candidate_id, name)
);

CREATE TABLE project_v1 (
    id UUID PRIMARY KEY,
    candidate_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (candidate_id) REFERENCES candidate_v1 (id) ON DELETE CASCADE
);

CREATE TABLE address_v1 (
    id UUID PRIMARY KEY,
    candidate_id UUID UNIQUE NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (candidate_id) REFERENCES candidate_v1 (id) ON DELETE CASCADE
);

CREATE TABLE candidate_document_v1 (
    id UUID PRIMARY KEY,
    candidate_id UUID NOT NULL,
    document_type document_type NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT,
    download_url TEXT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_at TIMESTAMP NOT NULL DEFAULT NOW(),
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (candidate_id) REFERENCES candidate_v1 (id) ON DELETE CASCADE
);

CREATE INDEX idx_candidate_email ON candidate_v1(email);
CREATE INDEX idx_education_candidate ON education_v1(candidate_id);
CREATE INDEX idx_work_candidate ON work_experience_v1(candidate_id);
CREATE INDEX idx_skill_candidate ON skill_v1(candidate_id);
CREATE INDEX idx_project_candidate ON project_v1(candidate_id);
CREATE INDEX idx_address_candidate_id ON address_v1(candidate_id);