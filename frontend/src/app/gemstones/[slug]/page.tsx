import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GemstoneDetailClient from "@/components/GemstoneDetailClient";

const GEMSTONES: Record<string, {
  name: string; sanskrit: string; planet: string; color: string;
  tagline: string; properties: string[]; rashi: string[];
  weight: string; metal: string; finger: string; day: string;
  description: string; caution: string; howToWear: string;
  images: string[]; basePricePerRatti: number;
}> = {
  "cats-eye": {
    name: "Cat's Eye", sanskrit: "Lehsuniya", planet: "Ketu", color: "#ca8a04",
    tagline: "Spiritual liberation, intuition, and Ketu's mystical power.",
    properties: ["Intuition", "Spirituality", "Liberation", "Protection", "Occult knowledge", "Moksha"],
    rashi: ["Sagittarius", "Pisces"],
    weight: "3–6 carats", metal: "Gold or Silver", finger: "Little finger", day: "Thursday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Cat_sEye_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Cat_s_Eye_composed.png"
    ],
    basePricePerRatti: 800,
    description: "Cat's Eye (Lehsuniya) is the gemstone of Ketu, the south node of the Moon — a spiritual, detached, and mystical force. Ketu governs past-life karma, occult knowledge, renunciation, and liberation (Moksha). Cat's Eye is worn to enhance intuitive and psychic abilities, protect from negative energy, and navigate the spiritual dimensions of existence.",
    caution: "Like Gomed, Cat's Eye should only be worn after careful consultation. Ketu is a separating force — it may cause detachment from material things. Not suitable during Rahu Dasha.",
    howToWear: "Wear a Chrysoberyl Cat's Eye of 3+ carats showing a distinct chatoyancy band, in gold or silver on the little finger. Chant 'Om Kem Ketave Namaha'.",
  },
  pearl: {
    name: "Pearl", sanskrit: "Moti", planet: "Moon", color: "#94a3b8",
    tagline: "Emotional balance, intuition, and lunar grace.",
    properties: ["Calm", "Intuition", "Relationships", "Memory", "Peace", "Creativity"],
    rashi: ["Cancer", "Scorpio", "Pisces"],
    weight: "4–6 carats", metal: "Silver", finger: "Little finger (right hand)", day: "Monday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Pearl_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Pearl_composed.png"
    ],
    basePricePerRatti: 600,
    description: "Pearl is the gemstone of the Moon (Chandra), governing mind, emotions, mother, and intuition. A weak or afflicted Moon can cause emotional instability, insomnia, and relationship difficulties. Pearl calms the mind, enhances emotional intelligence, and strengthens relationships — particularly the bond with one's mother.",
    caution: "Avoid wearing Pearl with Ruby (Sun) as Moon and Sun are natural enemies in Jyotish. Persons with Scorpio Moon may experience intensified emotions.",
    howToWear: "Set a natural saltwater pearl of 4+ carats in silver. Wear on the little finger on a Monday during Shukla Paksha (waxing moon phase) during Chandra hora. Chant 'Om Shraam Shreem Shroom Sah Chandraya Namaha' 108 times.",
  },
  "white-pukhraj": {
    name: "White Pukhraj", sanskrit: "Shwet Pukhraj", planet: "Venus", color: "#e2e8f0",
    tagline: "Vedic alternative to Diamond, invoking Venusian luxury and creative harmony.",
    properties: ["Luxury", "Creativity", "Beauty", "Relationships", "Aesthetics"],
    rashi: ["Taurus", "Libra"],
    weight: "3–5 carats", metal: "White Gold or Silver", finger: "Ring or Middle finger", day: "Friday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_White_Pukhraj_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_WhitePukhraj_composed.png"
    ],
    basePricePerRatti: 2500,
    description: "White Pukhraj (White Sapphire) is the primary Vedic substitute for Diamond, representing Venus (Shukra), the planet of luxury, artistic excellence, relationships, and refinement. It enhances magnetic attraction, creative flow, and material comfort.",
    caution: "Ensure it is not worn with Ruby or Pearl, as Venus is incompatible with the Sun and Moon.",
    howToWear: "Set in white gold or silver on the ring or middle finger on a Friday during Shukra hora. Chant 'Om Draam Dreem Droom Sah Shukraya Namaha' 108 times.",
  },
  "ceylon-pukhraj": {
    name: "Ceylon Pukhraj", sanskrit: "Ceylon Pukhraj", planet: "Jupiter", color: "#fbbf24",
    tagline: "Premium Sri Lankan Yellow Sapphire for wisdom, health, and prosperity.",
    properties: ["Wisdom", "Wealth", "Divine Grace", "Good Fortune", "Success"],
    rashi: ["Sagittarius", "Pisces"],
    weight: "3–6 carats", metal: "Gold", finger: "Index finger", day: "Thursday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_CeylonPukhraj_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Ceylon_Pukhraj_composed.png"
    ],
    basePricePerRatti: 5500,
    description: "Ceylon Pukhraj is the premium Sri Lankan Yellow Sapphire of Jupiter (Guru), highly revered for its superior clarity and brilliant yellow saturation. It brings unmatched spiritual alignment, massive wealth opportunities, and robust physical health.",
    caution: "Yellow Sapphire is generally safe for most ascendants, but Capricorn and Aquarius lagna holders should consult a Jyotishi before wearing as Jupiter may rule challenging houses.",
    howToWear: "Wear a Ceylon Yellow Sapphire of 3+ carats in gold on the index finger on a Thursday morning during Guru hora. Chant 'Om Graam Greem Groom Sah Gurave Namaha' 108 times.",
  },
  "peetambari-neelam": {
    name: "Peetambari Neelam", sanskrit: "Peetambari", planet: "Jupiter & Saturn", color: "#8b5cf6",
    tagline: "Rare bi-color sapphire combining the forces of Jupiter and Saturn.",
    properties: ["Balance", "Karmic Justice", "Wealth", "Discernment", "Focus"],
    rashi: ["Capricorn", "Aquarius", "Sagittarius", "Pisces"],
    weight: "3–5 carats", metal: "Gold or Panchdhatu", finger: "Middle finger", day: "Thursday or Saturday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Peetambari_Neelam_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_PeetambariNeelam_composed.png"
    ],
    basePricePerRatti: 6500,
    description: "Peetambari Neelam is a highly rare, naturally bi-color sapphire containing both yellow and blue hues. It represents the combined power of Jupiter and Saturn, helping the wearer align spiritual wisdom with disciplined action to achieve rapid material growth.",
    caution: "Extremely powerful. Requires a trial period to check compatibility before permanent wearing.",
    howToWear: "Wear in gold or mixed metal on the middle finger on a Thursday or Saturday morning during respective horas. Chant Shani or Guru mantras.",
  },
  "ceylon-neelam": {
    name: "Ceylon Neelam", sanskrit: "Ceylon Neelam", planet: "Saturn", color: "#1d4ed8",
    tagline: "High-grade Sri Lankan Blue Sapphire for instant karmic elevation.",
    properties: ["Focus", "Karmic Cleansing", "Success", "Protection", "Willpower"],
    rashi: ["Capricorn", "Aquarius"],
    weight: "3–5 carats", metal: "Silver or Gold", finger: "Middle finger", day: "Saturday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_CeylonNeelam_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Ceylon_Neelam_composed.png"
    ],
    basePricePerRatti: 7500,
    description: "Ceylon Neelam (Sri Lankan Blue Sapphire) is the most sought-after and rapidly acting gemstone of Saturn (Shani). It is prized for its cornflower blue color and brings swift success, mental focus, and relief from chronic obstacles to compatible charts.",
    caution: "Perform a 3-day test trial. Do not wear if you experience bad dreams or sudden accidents during the trial.",
    howToWear: "Set in silver or gold on the middle finger, wear on Saturday morning during Shani hora after chanting 'Om Praam Preem Proom Sah Shanaischaraya Namaha' 108 times.",
  },
  neelam: {
    name: "Neelam", sanskrit: "Neelam", planet: "Saturn", color: "#2563eb",
    tagline: "The enforcer of Saturn's discipline and success.",
    properties: ["Discipline", "Justice", "Protection", "Focus", "Longevity"],
    rashi: ["Capricorn", "Aquarius"],
    weight: "3–5 carats", metal: "Silver or Panchdhatu", finger: "Middle finger", day: "Saturday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Neelam_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Neelam_composed.png"
    ],
    basePricePerRatti: 4500,
    description: "Neelam (Blue Sapphire) is the stone of Saturn (Shani). Worn to mitigate Saturnian difficulties, Neelam helps resolve laziness, builds mental clarity, and shields the wearer from negative psychic attacks.",
    caution: "Mandatory 3-day trial. Never wear with Ruby or Pearl.",
    howToWear: "Set in silver or panchdhatu. Wear on the middle finger on a Saturday during Shani hora while chanting Shani mantras.",
  },
  emerald: {
    name: "Emerald", sanskrit: "Panna", planet: "Mercury", color: "#059669",
    tagline: "Intelligence, communication, and Mercury's brilliance.",
    properties: ["Intelligence", "Creativity", "Business", "Communication", "Wit", "Analytics"],
    rashi: ["Gemini", "Virgo"],
    weight: "3–5 carats", metal: "Gold", finger: "Little finger", day: "Wednesday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Emerald_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Emerald_composed.png"
    ],
    basePricePerRatti: 3500,
    description: "Emerald (Panna) is the gemstone of Mercury (Budha), planet of intellect, communication, commerce, and analytical ability. Ideal for students, writers, traders, and IT professionals, Emerald sharpens the mind and enhances the ability to communicate, negotiate, and learn. A strong Mercury in the chart brings wit, adaptability, and business acumen.",
    caution: "Do not wear with Red Coral or Pearl as Mercury is inimical to Mars and Moon. Persons sensitive to skin may experience reactions to certain metal settings.",
    howToWear: "Wear a Colombian or Zambian emerald of 3+ carats in gold on the little finger on a Wednesday during Budha hora. Chant 'Om Braam Breem Broom Sah Budhaya Namaha' 108 times.",
  },
  "burmese-ruby": {
    name: "Burmese Ruby", sanskrit: "Burma Manikya", planet: "Sun", color: "#be123c",
    tagline: "Ultra-premium Burmese Ruby for maximum solar power and vitality.",
    properties: ["Royal Status", "Self-Expression", "Vitality", "Authority", "Fame"],
    rashi: ["Leo", "Aries", "Scorpio"],
    weight: "2–4 carats", metal: "Gold", finger: "Ring finger", day: "Sunday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Burmese_Ruby_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_BurmeseRuby_composed.png"
    ],
    basePricePerRatti: 9500,
    description: "Burmese Ruby is the ultimate quality of Ruby (Manikya), renowned for its deep pigeon-blood red hue. As the strongest channel for Sun (Surya) energy, it promotes exceptional leadership, fame, self-worth, and heart health.",
    caution: "Intense energy. Consult an astrologer if you have elevated anger or high blood pressure.",
    howToWear: "Wear in gold on the ring finger of the right hand on Sunday morning during Surya hora. Chant 'Om Hraam Hreem Hroom Sah Suryaya Namaha' 108 times.",
  },
  ruby: {
    name: "Ruby", sanskrit: "Manikya", planet: "Sun", color: "#e11d48",
    tagline: "The stone of kings, solar vitality, and divine authority.",
    properties: ["Leadership", "Confidence", "Vitality", "Success", "Courage", "Fame"],
    rashi: ["Leo", "Aries", "Scorpio"],
    weight: "3–6 carats", metal: "Gold", finger: "Ring finger (right hand)", day: "Sunday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Ruby_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Ruby_composed.png"
    ],
    basePricePerRatti: 2500,
    description: "Ruby, or Manikya in Sanskrit, is the gemstone of the Sun (Surya) — the king of the Navagrahas. A strong Sun in one's chart blesses leadership ability, government favor, paternal relations, and self-confidence. Ruby amplifies the Sun's energy, making it ideal for those seeking career authority, visibility, or healing weak solar energy in their chart.",
    caution: "Do not wear if Saturn, Venus, or Mercury are dominant in your chart without consulting a Jyotishi. Ruby generates intense heat energy and may increase aggression or ego if worn by the wrong ascendant.",
    howToWear: "Wear a natural, unheated ruby of minimum 3 carats set in gold on the ring finger of the right hand on a Sunday morning during Surya hora after purifying with Panchgavya and chanting 'Om Hraam Hreem Hroom Sah Suryaya Namaha' 108 times.",
  },
  "australian-fire-opal": {
    name: "Australian Fire Opal", sanskrit: "Opal", planet: "Venus", color: "#38bdf8",
    tagline: "Exquisite Australian Opal representing luxury, glamour, and beauty.",
    properties: ["Glamour", "Love", "Luxury", "Creative Mastery", "Beauty"],
    rashi: ["Taurus", "Libra"],
    weight: "5–8 carats", metal: "Silver or White Gold", finger: "Ring or Index finger", day: "Friday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Australian_Fire_Opal_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Australian_Fire_Opal_composed.png"
    ],
    basePricePerRatti: 2200,
    description: "Australian Fire Opal, with its unique play of colors, is a luxurious gemstone of Venus (Shukra). It enhances aesthetic skills, brings success in artistic professions, and attracts luxury and romance into the wearer's life.",
    caution: "Generally safe, but avoid if you seek isolation or struggle with sensory overload.",
    howToWear: "Wear in silver or white gold on the ring finger of the right hand on Friday morning during Shukra hora. Chant 'Om Shukraya Namaha' 108 times.",
  },
  "fire-opal": {
    name: "Fire Opal", sanskrit: "Opal", planet: "Venus", color: "#f97316",
    tagline: "The fiery stone of artistic inspiration and marital bliss.",
    properties: ["Passion", "Aesthetics", "Relationships", "Joy", "Sensuality"],
    rashi: ["Taurus", "Libra"],
    weight: "4–7 carats", metal: "Silver", finger: "Ring finger", day: "Friday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Fire_Opal_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Fire_Opal_composed.png"
    ],
    basePricePerRatti: 1200,
    description: "Fire Opal is associated with Venus (Shukra). It helps release artistic blocks, improves marital harmony, and boosts personal magnetism.",
    caution: "Handle with care as opals are relatively soft gemstones.",
    howToWear: "Set in silver and wear on a Friday during Shukra hora. Chant Venus mantras.",
  },
  "blue-topaz": {
    name: "Blue Topaz", sanskrit: "Pushparag Uparatna", planet: "Jupiter", color: "#60a5fa",
    tagline: "A peaceful substitute for Pukhraj to enhance communication and wisdom.",
    properties: ["Intellect", "Communication", "Mental Peace", "Learning", "Wisdom"],
    rashi: ["Sagittarius", "Pisces"],
    weight: "5–10 carats", metal: "Silver", finger: "Index or Middle finger", day: "Thursday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Blue_Topaz_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Blue_Topaz_composed.png"
    ],
    basePricePerRatti: 400,
    description: "Blue Topaz is an excellent sub-stone (Uparatna) for Jupiter. It helps quieten an overactive mind, improves communication abilities, and assists in learning complex subjects.",
    caution: "Ensure it does not clash with Saturn's gemstones if they are malefic in your chart.",
    howToWear: "Wear in silver on the index finger on Thursday mornings during Guru hora.",
  },
  "white-topaz": {
    name: "White Topaz", sanskrit: "Dantur", planet: "Venus", color: "#f1f5f9",
    tagline: "Clear cosmic substitute for Venusian energy and creative clarity.",
    properties: ["Clarity", "Creative Flow", "Harmony", "Vitality", "Aesthetics"],
    rashi: ["Taurus", "Libra"],
    weight: "5–8 carats", metal: "Silver", finger: "Ring finger", day: "Friday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_White_Topaz_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_White_Topaz_composed.png"
    ],
    basePricePerRatti: 500,
    description: "White Topaz is a beautiful semi-precious alternative to Diamond. Guided by Venus (Shukra), it removes confusion, attracts positive relationships, and encourages aesthetic appreciation.",
    caution: "Avoid wearing with Sun or Moon gemstones.",
    howToWear: "Wear in silver on the ring finger on Friday morning during Shukra hora.",
  },
  "natural-zircon": {
    name: "Natural Zircon", sanskrit: "Zircon", planet: "Venus", color: "#e2e8f0",
    tagline: "Ancient, highly refractive alternative to Diamond for wealth and glamour.",
    properties: ["Magnetic Aura", "Material Wealth", "Happiness", "Arts", "Beauty"],
    rashi: ["Taurus", "Libra"],
    weight: "4–7 carats", metal: "Silver", finger: "Ring finger", day: "Friday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Natural_Zircon_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Natural_Zircon_composed.png"
    ],
    basePricePerRatti: 900,
    description: "Natural Zircon is one of the oldest minerals on Earth, carrying strong Venus (Shukra) frequencies. Its intense brilliance matches Diamond and helps the wearer achieve prosperity, artistic breakthrough, and romantic satisfaction.",
    caution: "Do not confuse with synthetic cubic zirconia. Ensure the zircon is natural.",
    howToWear: "Wear in silver on the ring finger on Friday during Shukra hora.",
  },
  zirconia: {
    name: "Zirconia", sanskrit: "Kritrim Diamond", planet: "Venus (Substitute)", color: "#f8fafc",
    tagline: "Affordable modern alternative for channeling light Venusian vibes.",
    properties: ["Aesthetic appeal", "Youthfulness", "Modern Luck", "Lightness", "Grace"],
    rashi: ["Taurus", "Libra"],
    weight: "4–8 carats", metal: "Silver", finger: "Middle or Ring finger", day: "Friday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Zirconia_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Zirconia_composed.png"
    ],
    basePricePerRatti: 150,
    description: "Zirconia (Cubic Zirconia) acts as a modern, budget-friendly substitute (Uparatna) for Venus. While carrying lesser astrological charge than natural diamond, its highly refractive property helps invite positive aesthetic and luxury vibes.",
    caution: "Astrological strength is lower than natural gemstones. Wear mainly for fashion and light astrological support.",
    howToWear: "Wear in silver on the ring or middle finger on Friday morning.",
  },
  garnet: {
    name: "Garnet", sanskrit: "Tamra", planet: "Rahu", color: "#991b1b",
    tagline: "Grounding protection, ambition, and Rahu's drive.",
    properties: ["Energy", "Rahu Protection", "Root Healing", "Fame", "Success"],
    rashi: ["Aquarius", "Taurus", "Libra"],
    weight: "4–8 carats", metal: "Silver", finger: "Middle finger", day: "Saturday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Garnet_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Garnet_composed.png"
    ],
    basePricePerRatti: 300,
    description: "Garnet is associated with Rahu. It acts as an anchor, helping the wearer overcome fear, gain popularity, and build a protective shield against psychic attacks.",
    caution: "Rahu energy is intense. Avoid if your chart indicates negative Rahu placements.",
    howToWear: "Set in silver and wear on the middle finger on a Saturday morning.",
  },
  "lapis-lazuli": {
    name: "Lapis Lazuli", sanskrit: "Rajavarta", planet: "Saturn (Uparatna)", color: "#1e3a8a",
    tagline: "The royal blue stone of inner truth, wisdom, and Saturnian protection.",
    properties: ["Truth", "Third Eye", "Protection", "Wisdom", "Communication"],
    rashi: ["Capricorn", "Aquarius"],
    weight: "6–10 carats", metal: "Silver", finger: "Middle finger", day: "Saturday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Lapis_Lazuli_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Lapis_Lazuli_composed.png"
    ],
    basePricePerRatti: 250,
    description: "Lapis Lazuli is a revered substitute for Blue Sapphire, associated with Saturn (Shani). It is excellent for third eye activation, mental clarity, and relieving Saturn-related depression.",
    caution: "Avoid if you suffer from extreme introversion or passive energy.",
    howToWear: "Set in silver and wear on the middle finger on a Saturday during Saturn hora.",
  },
  turquoise: {
    name: "Turquoise", sanskrit: "Firoza", planet: "Jupiter & Venus", color: "#06b6d4",
    tagline: "The legendary talisman of travel safety, health, and spiritual growth.",
    properties: ["Protection", "Healing", "Wealth", "Travel Safety", "Calmness"],
    rashi: ["Sagittarius", "Pisces", "Taurus", "Libra"],
    weight: "5–10 carats", metal: "Silver", finger: "Ring or Little finger", day: "Thursday or Friday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Turquoise_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Turquoise_composed.png"
    ],
    basePricePerRatti: 350,
    description: "Turquoise (Firoza) is a widely popular astrological protector, representing Jupiter and Venus. It guards the wearer from accidents, negative vibes, and supports overall physiological wellness.",
    caution: "Always purchase natural turquoise, as dyed synthetic imitations are very common.",
    howToWear: "Wear in silver on the ring or index finger on a Thursday or Friday morning.",
  },
  moonstone: {
    name: "Moonstone", sanskrit: "Chandrakant Mani", planet: "Moon (Uparatna)", color: "#e2e8f0",
    tagline: "The glowing lunar gem for emotional balance and divine feminine energy.",
    properties: ["Calm", "Feminine Energy", "Intuition", "Sleep", "Peace"],
    rashi: ["Cancer"],
    weight: "5–8 carats", metal: "Silver", finger: "Little finger", day: "Monday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Moonstone_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Moonstone_composed.png"
    ],
    basePricePerRatti: 200,
    description: "Moonstone (Chandrakant Mani) is the secondary gemstone for the Moon (Chandra). It possesses a soft, soothing energy that relieves anxiety, balances hormones, and enhances spiritual intuition.",
    caution: "Do not wear if you suffer from fluid retention issues without guidance.",
    howToWear: "Set in silver on the little or ring finger on a Monday evening during Shukla Paksha.",
  },
  amethyst: {
    name: "Amethyst", sanskrit: "Katela", planet: "Saturn (Uparatna)", color: "#7e22ce",
    tagline: "The stone of spiritual sobriety, meditative peace, and Saturn's grace.",
    properties: ["Sobriety", "Intuition", "Calmness", "Spiritual Growth", "Focus"],
    rashi: ["Capricorn", "Aquarius"],
    weight: "4–8 carats", metal: "Silver", finger: "Middle finger", day: "Saturday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Amethyst_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Amethyst_composed.png"
    ],
    basePricePerRatti: 300,
    description: "Amethyst (Katela or Jamunia) is the primary Uparatna for Saturn (Shani). It converts negative thoughts into spiritual energy, heals addictive tendencies, and relieves anxiety.",
    caution: "Do not pair with Sun or Mars stones.",
    howToWear: "Set in silver on the middle finger on a Saturday evening during Shani hora.",
  },
  citrine: {
    name: "Citrine", sanskrit: "Sunela", planet: "Jupiter (Uparatna)", color: "#eab308",
    tagline: "The merchant's stone of wealth, optimism, and solar plexus energy.",
    properties: ["Abundance", "Confidence", "Optimism", "Mental Focus", "Success"],
    rashi: ["Sagittarius", "Pisces"],
    weight: "4–8 carats", metal: "Gold or Silver", finger: "Index finger", day: "Thursday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Citrine_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Citrine_composed.png"
    ],
    basePricePerRatti: 400,
    description: "Citrine (Sunela) is the sub-stone for Jupiter. It boosts self-confidence, sparks creative enterprise, and attracts business luck and prosperity.",
    caution: "Safe for almost all, but consult if you have high ego or liver issues.",
    howToWear: "Set in gold or silver on the index finger on Thursday mornings during Guru hora.",
  },
  "tiger-eye": {
    name: "Tiger Eye", sanskrit: "Tiger Eye", planet: "Sun & Mars", color: "#a16207",
    tagline: "Courage, grounding focus, and absolute self-confidence.",
    properties: ["Willpower", "Protection", "Action", "Vitality", "Confidence"],
    rashi: ["Leo", "Aries", "Scorpio"],
    weight: "6–10 carats", metal: "Panchdhatu or Silver", finger: "Ring or Middle finger", day: "Sunday or Tuesday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_Tiger_Eye_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_Tiger_Eye_composed.png"
    ],
    basePricePerRatti: 180,
    description: "Tiger Eye is a powerful Uparatna that channels Sun and Mars energy. It is worn for building self-confidence, grounding overactive emotions, and protecting the auric field.",
    caution: "Generally very safe. Cleanse regularly to maintain its grounding vibration.",
    howToWear: "Wear in silver or panchdhatu on a Tuesday or Sunday morning.",
  },
  "african-ruby": {
    name: "African Ruby", sanskrit: "African Manikya", planet: "Sun", color: "#9f1239",
    tagline: "Deep, grounding African Ruby for leadership, courage, and vitality.",
    properties: ["Leadership", "Vitality", "Confidence", "Action", "Courage"],
    rashi: ["Leo", "Aries", "Scorpio"],
    weight: "3–6 carats", metal: "Gold", finger: "Ring finger", day: "Sunday",
    images: [
      "https://humarapandit.com/cdn/shop/files/1img0_African_Ruby_composed_1080x.png",
      "https://humarapandit.com/cdn/shop/files/img0_African_Ruby_composed.png"
    ],
    basePricePerRatti: 1500,
    description: "African Ruby is a highly potent, beautifully rich-colored variety of Ruby representing the Sun (Surya). It aids in professional success, heart strength, and building personal boundaries.",
    caution: "Avoid pairing with diamonds or blue sapphires.",
    howToWear: "Set in gold and wear on the ring finger on Sunday mornings.",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gem = GEMSTONES[slug];
  if (!gem) return { title: "Gemstone Not Found" };
  return {
    title: `${gem.name} (${gem.sanskrit}) — Vedic Gemstone Guide`,
    description: gem.tagline,
  };
}

export async function generateStaticParams() {
  return Object.keys(GEMSTONES).map((slug) => ({ slug }));
}

export default async function GemstoneDetailPage({ params }: Props) {
  const { slug } = await params;
  const gem = GEMSTONES[slug];
  if (!gem) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 px-6 pb-24">
        <GemstoneDetailClient gem={gem} />
      </main>
      <Footer />
    </>
  );
}
