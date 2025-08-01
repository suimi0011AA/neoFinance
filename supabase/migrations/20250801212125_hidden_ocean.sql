/*
  # Initial Schema for NeoFinance Platform

  1. New Tables
    - `user_profiles` - User personal and financial information
    - `user_goals` - Financial goals for each user
    - `transactions` - Income and expense transactions
    - `user_expenses` - Monthly expense categories for each user

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  age integer NOT NULL,
  job_type text NOT NULL,
  city text NOT NULL,
  monthly_income numeric NOT NULL DEFAULT 0,
  risk_profile text NOT NULL DEFAULT 'moderate' CHECK (risk_profile IN ('conservative', 'moderate', 'aggressive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  target_amount numeric NOT NULL DEFAULT 0,
  current_amount numeric NOT NULL DEFAULT 0,
  deadline date NOT NULL,
  category text NOT NULL CHECK (category IN ('vacation', 'emergency_fund', 'debt', 'savings', 'investment')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  amount numeric NOT NULL DEFAULT 0,
  category text NOT NULL,
  description text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Create user_expenses table
CREATE TABLE IF NOT EXISTS user_expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  category text NOT NULL,
  monthly_amount numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_expenses ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create policies for user_goals
CREATE POLICY "Users can read own goals"
  ON user_goals
  FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM user_profiles WHERE auth.uid()::text = id::text));

CREATE POLICY "Users can insert own goals"
  ON user_goals
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE auth.uid()::text = id::text));

CREATE POLICY "Users can update own goals"
  ON user_goals
  FOR UPDATE
  TO authenticated
  USING (user_id IN (SELECT id FROM user_profiles WHERE auth.uid()::text = id::text));

CREATE POLICY "Users can delete own goals"
  ON user_goals
  FOR DELETE
  TO authenticated
  USING (user_id IN (SELECT id FROM user_profiles WHERE auth.uid()::text = id::text));

-- Create policies for transactions
CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM user_profiles WHERE auth.uid()::text = id::text));

CREATE POLICY "Users can insert own transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE auth.uid()::text = id::text));

CREATE POLICY "Users can update own transactions"
  ON transactions
  FOR UPDATE
  TO authenticated
  USING (user_id IN (SELECT id FROM user_profiles WHERE auth.uid()::text = id::text));

CREATE POLICY "Users can delete own transactions"
  ON transactions
  FOR DELETE
  TO authenticated
  USING (user_id IN (SELECT id FROM user_profiles WHERE auth.uid()::text = id::text));

-- Create policies for user_expenses
CREATE POLICY "Users can read own expenses"
  ON user_expenses
  FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM user_profiles WHERE auth.uid()::text = id::text));

CREATE POLICY "Users can insert own expenses"
  ON user_expenses
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IN (SELECT id FROM user_profiles WHERE auth.uid()::text = id::text));

CREATE POLICY "Users can update own expenses"
  ON user_expenses
  FOR UPDATE
  TO authenticated
  USING (user_id IN (SELECT id FROM user_profiles WHERE auth.uid()::text = id::text));

CREATE POLICY "Users can delete own expenses"
  ON user_expenses
  FOR DELETE
  TO authenticated
  USING (user_id IN (SELECT id FROM user_profiles WHERE auth.uid()::text = id::text));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_goals_user_id ON user_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_user_expenses_user_id ON user_expenses(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_goals_updated_at BEFORE UPDATE ON user_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_expenses_updated_at BEFORE UPDATE ON user_expenses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();