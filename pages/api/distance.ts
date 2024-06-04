// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  res.statusCode = 200;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=03-106,Polska&destinations=${req.body},Polska&key=AIzaSyBvNBSB0iv4b-troX8DUutWUCNqVytzBJA`
  );
  const data = await response.json();

  res.json({ response: data });
};
