import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID provided." });
    return;
  }

  let effectiveId: number;
  const collectionRelativeId = ((id - 1) % 50000) + 1;

  if (collectionRelativeId <= 15) {
    effectiveId = collectionRelativeId;
  } else {
    const seed = crypto
      .createHash("sha256")
      .update(id.toString())
      .digest("hex");
    effectiveId = (parseInt(seed, 16) % 15) + 1;
  }

  const descriptions: Record<number, string> = {
    1: "The crypto force is strong with this one. Defeating rebel shitcoins since the early days of the Galactic Empire.",
    2: "Crypto royalty in the house! She might wear a crown, but she's no stranger to a bull market.",
    3: "Taking it back to the prehistoric days of Bitcoin. Hodling since the Mesozoic era with style.",
    4: "Frozen assets? No problem. This Yeti's been cold staking since the Ice Age.",
    5: "Ruthlessly cute and coded for gains. Munching on bamboo and blockchain bytes.",
    6: "When he's not in The Matrix, he's mooning with altcoins. Taking red pills and spotting green candles!",
    7: "A legendary enigma in the crypto space. Rumored to have mined the first Bitcoin after Satoshi.",
    8: "Slow transactions? No worries. This sloth's patience in hodling always pays off.",
    9: "Conquering peaks and crypto charts. This ape's got a view from the top of every rally.",
    10: "Don't let the color fool you. This koala's got a nose for sweet eucalyptus and sweeter gains.",
    11: "When the market's full mooning, this ape's howling all the way to the crypto bank.",
    12: "Hot-headed and bullish to the bone. This skull's seen many bear markets and come out steaming.",
    13: "Riding through the volatility storms. Bringing darkness to all those bearish on his path.",
    14: "Bear markets can't kill what's already undead. Marching and hodling beyond the grave.",
    15: "Too cool for mainstream crypto. Only engages in the most elite DeFi jungles.",
  };

  const metadata = {
    name: `Mintly ONFT #${id}`,
    description: descriptions[effectiveId],
    image: `https://ipfs.io/ipfs/QmTGm14fRT12Nah4fi3QBsdzpzZkQKpeCwdhpqbYX8YmBG/${effectiveId}.png`,
  };

  res.status(200).json(metadata);
}
