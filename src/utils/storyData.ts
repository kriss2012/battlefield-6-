export interface Choice {
  text: string;
  goto: string;
  tag?: 'fight' | 'intel' | 'stealth' | 'empathy';
  raiseRage?: boolean;
  lowerRage?: boolean;
  setFought?: boolean;
  saveEvidence?: boolean;
  setAlliance?: boolean;
  unlockSkill?: 'combat' | 'stealth' | 'intel';
}

export interface Scene {
  chapter: string;
  title: string;
  text: string;
  art: string;
  portrait?: string;
  speaker?: string;
  choices: Choice[];
}

export const storyData: Record<string, Scene> = {
  // CHAPTER 1: THE BOY WHO DISAPPEARED
  s1_intro: {
    chapter: "CHAPTER ONE — THE BOY WHO DISAPPEARED",
    title: "NAGPUR, 2009",
    text: "The city of Nagpur woke up every morning in the same way it always had — with the smell of chai and diesel, the sound of auto-rickshaws arguing with bicycles at intersections. Aryan Sharma was sixteen years old and had been disappearing for two years. Not literally, but interiorly. The slow erasure of a self under sustained, relentless pressure.",
    art: "schoolyard",
    choices: [
      { text: "Head into St. Xaviers", goto: "s1_library" }
    ]
  },
  s1_library: {
    chapter: "CHAPTER ONE — THE BOY WHO DISAPPEARED",
    title: "THE LIBRARY PASSAGE",
    text: "He did not make it through the library passage. Kabir Rao and his associates were waiting. 'Look at this. The ghost is trying a new path.' Kabir took Aryan's bag, held it upside down, and shook it. Out fell his things, including a drawing of his mother. Kabir picked it up and Tore. It. In. Half.",
    art: "schoolyard",
    portrait: "kabir",
    speaker: "KABIR RAO",
    choices: [
      { text: "Pick up the pieces quietly", goto: "s1_home", lowerRage: true },
      { text: "Clench your fists and walk away", goto: "s1_home", raiseRage: true }
    ]
  },
  s1_home: {
    chapter: "CHAPTER ONE — THE BOY WHO DISAPPEARED",
    title: "LAXMI NAGAR ROAD",
    text: "Home was a flat that smelled of cooking from fifteen different kitchens. His mother, Savita, was waiting with chai. She sensing the stillness in him. 'He tore the drawing. The one of you,' Aryan said. Savita looked at him steadily. 'Aryan, one day you will not need to take the long road home.'",
    art: "schoolyard",
    portrait: "savita",
    speaker: "SAVITA SHARMA",
    choices: [
      { text: "Two years of weight later...", goto: "s2_gym" }
    ]
  },

  // CHAPTER 2: THE WEIGHT OF WATER
  s2_gym: {
    chapter: "CHAPTER TWO — THE WEIGHT OF WATER",
    title: "THE GYM ON NEHRU STREET",
    text: "He passed the gym above the tailor shop and heard the rhythmic thud. He went up. Balwant Singh, a man with cauliflower ears and the quality of disciplined stillness, pointed at the bag. 'Hit it until it hurts you back.'",
    art: "warehouse",
    portrait: "balwant",
    speaker: "BALWANT SINGH",
    choices: [
      { text: "Hit the bag until your hands bleed", goto: "s2_training", raiseRage: true },
      { text: "Focus on the technique and precision", goto: "s2_training", unlockSkill: "combat" }
    ]
  },
  s2_training: {
    chapter: "CHAPTER TWO — THE WEIGHT OF WATER",
    title: "PUNISHMENT VS TRAINING",
    text: "Aryan practiced until he understood what Balwant saw. 'You're not training. You're punishing yourself,' Balwant said. 'Punishment makes you rawer. Training makes you sharper. Only one will help you when the moment comes.'",
    art: "warehouse",
    portrait: "balwant",
    speaker: "BALWANT SINGH",
    choices: [
      { text: "Accept the training", goto: "s2_map", unlockSkill: "intel" }
    ]
  },
  s2_map: {
    chapter: "CHAPTER TWO — THE WEIGHT OF WATER",
    title: "THE GIFT",
    text: "Balwant handed him a map of Nagpur marked in red. 'From a friend. In case you ever need to find someone.' It was the most comprehensive private intelligence document on ISF's operations in existence.",
    art: "warehouse",
    portrait: "balwant",
    speaker: "BALWANT SINGH",
    choices: [
      { text: "CHAPTER THREE: THE STONE MOVES", goto: "s3_wallet" }
    ]
  },

  // CHAPTER 3: THE DAY THE STONE MOVED
  s3_wallet: {
    chapter: "CHAPTER THREE — THE DAY THE STONE MOVED",
    title: "THE WORKSHOP SHED",
    text: "Kabir held up a photograph of Savita. 'Your mummy's kind of pretty, you know? For a teacher. Maybe we pay her a visit.' Something happened in Aryan. Not an explosion, but a subsidence. The ground gave way, and absolute clarity took its place.",
    art: "firstfight",
    portrait: "kabir",
    speaker: "KABIR RAO",
    choices: [
      { text: "Move before he realizes", goto: "s3_victory", tag: "fight", setFought: true }
    ]
  },
  s3_victory: {
    chapter: "CHAPTER THREE — THE DAY THE STONE MOVED",
    title: "THE RECKONING",
    text: "Kabir folded from a solar plexus strike. Dev hit the wall. Prashant ran. Aryan picked up the photo. 'Stay away from me. Stay away from my mother,' he said. The geometry of power at St. Xavier's had shifted forever.",
    art: "firstfight",
    choices: [
      { text: "The machinery wakes...", goto: "s4_isf" }
    ]
  },

  // CHAPTER 4: THE IRON SHADOW FRONT
  s4_isf: {
    chapter: "CHAPTER FOUR — THE IRON SHADOW FRONT",
    title: "THE MACHINE",
    text: "ISF began as an off-book intel network from Colonel Sengupta. It grew into a monster. Durgesh Rao called them. They didn't anticipate what kind of person was standing behind those two years of silence. The coal compresses. The pressure builds.",
    art: "warehouse",
    choices: [
      { text: "Go home", goto: "s5_empty" }
    ]
  },

  // CHAPTER 5: THE EMPTY KITCHEN
  s5_empty: {
    chapter: "CHAPTER FIVE — THE EMPTY KITCHEN",
    title: "THE BROKEN CHAIN",
    text: "The flat door was open. The chain lock was broken. The chai pot was thick and overcooked. His mother was gone. On the refrigerator, three letters were scratched into the white paint: ISF. She had left him a name.",
    art: "kidnap",
    choices: [
      { text: "Gather yourself and call Balwant", goto: "s5_briefing" }
    ]
  },
  s5_briefing: {
    chapter: "CHAPTER FIVE — THE EMPTY KITCHEN",
    title: "SAFEHOUSE 3",
    text: "Balwant tapped the map. 'Safehouse 3. Textile district. She won't stay there long. We need to move before the three-day window closes.' Balwant finally told him about RAW, about ISF's history, and why he'd been waiting for Aryan.",
    art: "warehouse",
    portrait: "balwant",
    speaker: "BALWANT SINGH",
    choices: [
      { text: "Start the hunt", goto: "s6_infil" }
    ]
  },

  // CHAPTER 6: INTO THE TEXTILE DISTRICT
  s6_infil: {
    chapter: "CHAPTER SIX — INTO THE TEXTILE DISTRICT",
    title: "THE SERVICE ENTRANCE",
    text: "Aryan hit the warehouse at 2 AM. He moved through camera gaps and neutralized the guards with Balwant's 'thoughtful application of pressure'. He pinned Veer Choudhary, the logistics coordinator, to his desk.",
    art: "warehouse",
    speaker: "ARYAN",
    choices: [
      { text: "'Where is she?'", goto: "s6_veer" }
    ]
  },
  s6_veer: {
    chapter: "CHAPTER SIX — INTO THE TEXTILE DISTRICT",
    title: "VEER'S CALCULATION",
    text: "Veer looked at Aryan's eyes and saw no bluff. 'District 7,' Veer whispered. 'Basement level. She was moved within the hour.' Aryan looked at him. 'Go home tonight. Stay home tomorrow.'",
    art: "warehouse",
    choices: [
      { text: "Head to District 7", goto: "s7_basement" }
    ]
  },

  // CHAPTER 7: FORTY-SEVEN HOURS
  s7_basement: {
    chapter: "CHAPTER SEVEN — FORTY-SEVEN HOURS",
    title: "BASEMENT LEVEL TWO",
    text: "He reached the compound at hour 47. He fought through the ground floor, taking a knife across the shoulder. He found the fourth room. Savita was there, sitting against the wall. Her hands were ice cold.",
    art: "final",
    choices: [
      { text: "Reach for her", goto: "s7_farewell" }
    ]
  },
  s7_farewell: {
    chapter: "CHAPTER SEVEN — FORTY-SEVEN HOURS",
    title: "ENOUGH",
    text: "Savita looked at him with the face from the photograph. 'I am so proud of you. Don't lose the boy who draws entirely. You were always exactly enough. Remember that.' She died in the corridor, holding his arm.",
    art: "final",
    portrait: "savita",
    speaker: "SAVITA SHARMA",
    choices: [
      { text: "Then he stood up. Then he began.", goto: "s8_war" }
    ]
  },

  // CHAPTER 8: THE RECKONING
  s8_war: {
    chapter: "CHAPTER EIGHT — THE RECKONING",
    title: "THE LONG ARITHMETIC",
    text: "For four months, Aryan was a ghost in the city's machine. He dismantled supply lines, leaked money laundering records to Arif Khan, and worked with Priya to cripple ISF's signals. Every week, he brought marigolds to the cemetery.",
    art: "final",
    choices: [
      { text: "Target: Durgesh Rao", goto: "s9_durgesh" },
      { text: "Target: Commander Hasan", goto: "s9_hasan" }
    ]
  },
  s9_durgesh: {
    chapter: "CHAPTER NINE — THE LAST THREE",
    title: "THE POLITICAL FALL",
    text: "Durgesh Rao resigned citing 'health reasons' before the arrest warrants hit. The file Aryan built was conclusive. Eleven years of corruption ended in eleven days. One down. Kabir fled to Pune.",
    art: "warehouse",
    choices: [
      { text: "Next: Commander Hasan", goto: "s9_hasan" }
    ]
  },
  s9_hasan: {
    chapter: "CHAPTER NINE — THE LAST THREE",
    title: "THE ELEVEN-MINUTE FIGHT",
    text: "Hasan's villa in the hills. The fight was brutal, two professionals trading damage. 'One boy cannot destroy what we built,' Hasan spat. Aryan refused to stay down. 'I'm trying to destroy what you are.' Two down.",
    art: "final",
    choices: [
      { text: "Force the Director's hand", goto: "s10_final" }
    ]
  },
  s10_final: {
    chapter: "CHAPTER TEN — THE MAN WHO BUILT THE MACHINE",
    title: "DISTRICT 7 HEADQUARTERS",
    text: "He entered the HQ alone. The Director was waiting. No guards. Just a man tired of the arithmetic. He handed Aryan a flash drive containing everything remaining of ISF. 'What happened to your mother was not acceptable. I am finished.'",
    art: "final",
    portrait: "director",
    speaker: "THE DIRECTOR",
    choices: [
      { text: "Finish it", goto: "s_epilogue" }
    ]
  },

  // EPILOGUE
  s_epilogue: {
    chapter: "EPILOGUE — THE SHORT ROAD HOME",
    title: "SHADOW RISING",
    text: "ISF collapsed. 300 arrests. Aryan stayed in the gym, practicing, drawing. 'Tell me about the other cities,' he told Balwant. He had found a new reason to exist. The Shadow was rising.",
    art: "schoolyard",
    choices: [
      { text: "THE END", goto: "RESTART" }
    ]
  }
};
