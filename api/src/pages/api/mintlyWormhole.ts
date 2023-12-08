import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID provided." });
    return;
  }

  let effectiveId: number;
  const collectionRelativeId = ((id - 1) % 100000) + 1;

  if (collectionRelativeId <= 20) {
    effectiveId = collectionRelativeId;
  } else {
    const seed = crypto
      .createHash("sha256")
      .update(id.toString())
      .digest("hex");
    effectiveId = (parseInt(seed, 16) % 20) + 1;
  }

  const descriptions: Record<number, string> = {
    1: "Crypto witchcraft at its finest. This Witch blends blockchain spells with earth's elements for epic trades.",
    2: "Riding the crypto waves, this Water Mage makes market splashes with seamless flow and fluid strategy.",
    3: "Ghost of the blockchain, this Spirit Mage trades in shadows, mastering gains beyond the physical realm.",
    4: "Crystal clear market vision. This Mage's crystal-infused insights cut through volatility like a knife.",
    5: "A shadow in the market, striking with stealth and strategic genius for unexpected crypto wins.",
    6: "Illusionist of the crypto world, turning market mirages into real profits with a masterful touch.",
    7: "Sound Mage syncing with the market beat, turning chaotic crypto tunes into harmonic gains.",
    8: "Digital warrior, braving bear markets with a bullish spirit and a sword sharp as their trades.",
    9: "Eagle-eyed Archer, nailing bull's eyes in the market, sniping profits from a distance with precision.",
    10: "Market's minstrel, this Bard spins blockchain tales into profit, harmonizing trades with tunes.",
    11: "Alchemy of crypto. This master turns ordinary coins into digital gold with ancient wisdom and modern tactics.",
    12: "Chaos Mage thriving in market storms, turning turmoil into triumph with a wild, unpredictable edge.",
    13: "Striking like lightning, this Mage's electrifying insights zap through market volatility for brilliant gains.",
    14: "A mystic of market flames, igniting investments with fiery foresight and unparalleled intuition.",
    15: "Arcane insights into blockchain's depths, uncovering hidden crypto treasures with magical prowess.",
    16: "Reading the cosmic ledger, this Mage aligns stars and markets for otherworldly investment journeys.",
    17: "Navigating the uncharted territories of crypto space, finding interstellar profits among cosmic risks.",
    18: "A beacon in market fog, this Light Mage's radiant strategies light up paths to crypto prosperity.",
    19: "Master of the void, turning market emptiness into substantial gains, a faceless enigma in crypto space.",
    20: "Thriving in digital obscurity, this Void entity draws power from market depths, revealing unseen profits.",
  };

  const metadata = {
    name: `Mintly wNFT #${id}`,
    description: descriptions[effectiveId],
    image: `https://ipfs.io/ipfs/QmXnGLn3Vv3jqzDNwXx3ymPqB2XYzkBVnkgYRvRtZ8PV1c/${effectiveId}.png`,
  };

  res.status(200).json(metadata);
}
