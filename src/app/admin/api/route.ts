import clientPromise from "../../../lib/mongodb";

export const dynamic = 'force-static';

export async function POST(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const res = await request.json();
        const filter = { email: 'defaultAdminEmail@gmail.com' };
        const options = { upsert: true };
        const update = {
            $set: {
                email: 'defaultAdminEmail@gmail.com',
                password: 'defaultPassowrd',
                config: {
                    aboutMe: {
                        name: 'aboutMe',
                        currentPage: res.aboutMe.currentPage
                    },
                    address: {
                        name: 'address',
                        currentPage:  res.address.currentPage
                    }, 
                    dateOfBirth: {
                        name: 'dateOfBirth',
                        currentPage:  res.dateOfBirth.currentPage
                    },
                }
            }
        };

        const adminConfig = await db
                .collection("admin")
                .updateOne(filter, update, options);

        return Response.json({ adminConfig });
    } catch (e) {
        return Response.json({error: e});
    }
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const adminConfig = await db
            .collection("admin")
            .findOne({ email: 'defaultAdminEmail@gmail.com' })
        return Response.json(adminConfig);
    } catch (e) {
        return Response.json({error: e});
    }
}