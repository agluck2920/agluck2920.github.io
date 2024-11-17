import clientPromise from "../../../lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const users = await db
            .collection("users")
            .find({})
            .sort({ metacritic: -1 })
            .toArray();
        return Response.json(users);
    } catch (e) {
        console.error(e);
    }
} 