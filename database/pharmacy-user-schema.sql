-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends auth.users from Nhost)
-- This table stores basic user information
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    display_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Link to Nhost auth.users if needed
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create company table if it doesn't exist
CREATE TABLE IF NOT EXISTS company (
    company_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_fullname VARCHAR(255) NOT NULL UNIQUE,
    company_displayname VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pharmacy_users table
-- This table stores pharmacy-specific user information
CREATE TABLE IF NOT EXISTS pharmacy_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    blood_group VARCHAR(5) CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    image_id VARCHAR(255), -- Nhost storage file ID
    company_id UUID REFERENCES company(company_id) ON DELETE SET NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_auth_user_id ON users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_pharmacy_users_user_id ON pharmacy_users(user_id);
CREATE INDEX IF NOT EXISTS idx_pharmacy_users_company_id ON pharmacy_users(company_id);
CREATE INDEX IF NOT EXISTS idx_pharmacy_users_active ON pharmacy_users(active);
CREATE INDEX IF NOT EXISTS idx_pharmacy_users_image_id ON pharmacy_users(image_id);
CREATE INDEX IF NOT EXISTS idx_company_fullname ON company(company_fullname);

-- Create trigger for updated_at on users table
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pharmacy_users_updated_at BEFORE UPDATE ON pharmacy_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_updated_at BEFORE UPDATE ON company
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample companies
INSERT INTO company (company_fullname, company_displayname) VALUES 
('Pfizer Inc.', 'Pfizer'),
('Johnson & Johnson', 'J&J'),
('Novartis AG', 'Novartis'),
('Roche Holding AG', 'Roche'),
('Merck & Co.', 'Merck'),
('GlaxoSmithKline', 'GSK'),
('Sanofi', 'Sanofi'),
('Abbott Laboratories', 'Abbott'),
('Bayer AG', 'Bayer'),
('AstraZeneca', 'AstraZeneca')
ON CONFLICT (company_fullname) DO NOTHING;

-- Add comments for documentation
COMMENT ON TABLE users IS 'Stores basic user information (email, phone, display_name)';
COMMENT ON TABLE pharmacy_users IS 'Stores pharmacy-specific user information (blood_group, image_id, company_id, active)';
COMMENT ON COLUMN pharmacy_users.image_id IS 'Nhost storage file ID for user profile image';
COMMENT ON COLUMN pharmacy_users.active IS 'Boolean flag to indicate if the pharmacy user account is active';


