export default async function handler(req, res) {
    const { query } = req.query;

    const apiKey = process.env.VITE_NEWS_API_KEY;

    if (!query) {
        return res.status(400).json({ error: "Missing query" });
    }

    try {
        const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            query
        )}&sortBy=publishedAt&language=en&apiKey=${apiKey}`
        );

        const data = await response.json();

        if (!response.ok) {
        return res.status(response.status).json({ error: data.message });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Server Error", details: error.message });
    }
}
