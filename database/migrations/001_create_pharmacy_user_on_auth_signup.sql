-- Migration: Create pharmacy_users row when a new auth user signs up (email verification flow)
--
-- This trigger runs when Nhost inserts a row into auth.users. It reads pharmacy form data
-- from options.metadata and inserts into users + pharmacy_users.
--
-- Schema: users (auth_user_id -> auth.users) <- pharmacy_users (user_id -> users)
-- Nhost stores signUp options.metadata in auth.users.metadata or raw_user_meta_data.

CREATE OR REPLACE FUNCTION public.on_auth_user_created_insert_pharmacy_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  meta jsonb;
  ph jsonb;
  v_user_id uuid;
  v_users_phone text;
  v_blood_group text;
  v_company_id uuid;
  v_district_id uuid;
  v_basetown_id uuid;
  v_gender text;
  v_cnic text;
  v_phone text;
  v_phone2 text;
  v_dob text;
  v_display_name text;
BEGIN
  meta := COALESCE(NEW.metadata, NEW.raw_user_meta_data, '{}'::jsonb);
  ph := meta->'pharmacy';

  v_display_name := COALESCE(NULLIF(TRIM(NEW.display_name), ''), NEW.email);
  v_users_phone := NULLIF(ph->'phones'->>0, '');
  IF v_users_phone IS NULL OR v_users_phone = '' THEN
    v_users_phone := 'signup-' || NEW.id::text;
  END IF;

  INSERT INTO public.users (email, phone, display_name, auth_user_id)
  VALUES (NEW.email, v_users_phone, v_display_name, NEW.id)
  RETURNING user_id INTO v_user_id;

  IF ph IS NULL THEN
    INSERT INTO public.pharmacy_users (user_id, active) VALUES (v_user_id, true);
    RETURN NEW;
  END IF;

  v_blood_group := NULLIF(ph->>'bloodGroup', '');
  v_company_id := (ph->>'companyId')::uuid;
  v_district_id := (ph->>'districtId')::uuid;
  v_basetown_id := (ph->>'baseTownId')::uuid;
  v_gender := NULLIF(ph->>'gender', '');
  v_cnic := NULLIF(ph->>'cnic', '');
  v_phone := NULLIF(ph->'phones'->>0, '');
  v_phone2 := NULLIF(ph->'phones'->>1, '');
  v_dob := NULLIF(ph->>'dob', '');

  INSERT INTO public.pharmacy_users (
    user_id,
    blood_group,
    company_id,
    district_id,
    basetown_id,
    gender,
    cnic,
    phone,
    phone2,
    dob,
    active
  ) VALUES (
    v_user_id,
    v_blood_group,
    v_company_id,
    v_district_id,
    v_basetown_id,
    v_gender,
    v_cnic,
    v_phone,
    v_phone2,
    v_dob,
    true
  );

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'on_auth_user_created_insert_pharmacy_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_pharmacy ON auth.users;
CREATE TRIGGER on_auth_user_created_pharmacy
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.on_auth_user_created_insert_pharmacy_user();
