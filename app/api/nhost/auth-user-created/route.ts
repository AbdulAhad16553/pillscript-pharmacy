import { NextRequest, NextResponse } from "next/server";

const INSERT_PHARMACY_USER_MUTATION = `
  mutation InsertPharmacyUser(
    $user_id: uuid!
    $blood_group: String
    $company_id: uuid
    $district_id: uuid
    $basetown_id: uuid
    $gender: String
    $cnic: String
    $phone: String
    $phone2: String
    $dob: String
  ) {
    insert_pharmacy_users_one(
      object: {
        user_id: $user_id
        blood_group: $blood_group
        company_id: $company_id
        district_id: $district_id
        basetown_id: $basetown_id
        gender: $gender
        cnic: $cnic
        phone: $phone
        phone2: $phone2
        dob: $dob
      }
    ) {
      id
    }
  }
`;

async function callGraphQL(query: string, variables: Record<string, any>) {
  const subdomain =
    process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || "lfgwnrkyoofwbvejrpqm";
  const region = process.env.NEXT_PUBLIC_NHOST_REGION || "eu-central-1";

  const graphqlUrl =
    process.env.NHOST_GRAPHQL_URL ||
    `https://${subdomain}.graphql.${region}.nhost.run/v1`;

  const adminSecret =
    process.env.NHOST_ADMIN_SECRET ||
    process.env.HASURA_GRAPHQL_ADMIN_SECRET;

  if (!adminSecret) {
    throw new Error(
      "Missing NHOST_ADMIN_SECRET or HASURA_GRAPHQL_ADMIN_SECRET environment variable."
    );
  }

  const res = await fetch(graphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": adminSecret,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (!res.ok || json.errors) {
    throw new Error(
      json.errors?.[0]?.message || `GraphQL error with status ${res.status}`
    );
  }

  return json.data;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newUser = body.event?.data?.new;
    if (!newUser) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const authUserId: string = newUser.id;
    const meta = newUser.metadata || newUser.raw_user_meta_data || {};
    const pharmacy = meta.pharmacy || {};
    const phones: string[] = Array.isArray(pharmacy.phones)
      ? pharmacy.phones
      : [];

    await callGraphQL(INSERT_PHARMACY_USER_MUTATION, {
      user_id: authUserId,
      blood_group: pharmacy.bloodGroup || null,
      company_id: pharmacy.companyId || null,
      district_id: pharmacy.districtId || null,
      basetown_id: pharmacy.baseTownId || null,
      gender: pharmacy.gender || null,
      cnic: pharmacy.cnic || null,
      phone: phones[0] || null,
      phone2: phones[1] || null,
      dob: pharmacy.dob || null,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("auth-user-created webhook error", err);
    return NextResponse.json(
      { error: err.message || "Webhook error" },
      { status: 500 }
    );
  }
}

