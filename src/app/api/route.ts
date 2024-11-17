import { NextRequest } from "next/server";
import clientPromise from "../../lib/mongodb";

export const dynamic = 'force-static';

export async function POST(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const res = await request.json();
        const filter = { email: res.formData.email };
        const options = { upsert: true };
        const update = {
            $set: {
                email: res.formData.email,
                password: res.formData.password,
                metadata: {
                    dob: res.formData.dob,
                    aboutText: res.formData.aboutMeText,
                },
                address: {
                    street_address: res.formData.address,
                    city: res.formData.city,
                    state: res.formData.state,
                    zip: res.formData.zip
                },
            }
        };

        const users = await db
                .collection("users")
                .updateOne(filter, update, options);

        return Response.json({ users });
    } catch (e) {
        console.error(e);
    }
}

export async function GET(request: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const params = request.nextUrl.searchParams;
        const user = await db
            .collection("users")
            .findOne({email: params.get('email')})

        return Response.json({user});
    } catch (e) {
        console.error(e);
    }
}