// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('POST RECIEVED:', req.body.data);
    res.send({ data: 'POST SUCCESS' });
  } else {
    res.status(200).json({ name: 'John Doe' });
  }
}
