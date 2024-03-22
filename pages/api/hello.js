export default function handler(req, res) {
  res.status(200).json({ text: "Hello" });
}

export async function fetchPosts() {
  const response = await fetch("API exmample.com");
  const data = await response.json();
  return data;
}

export default function handler(req, res) {
    const email = req.body.email;
  }