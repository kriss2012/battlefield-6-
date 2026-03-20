export interface Choice {
  text: string;
  tag: 'stealth' | 'intel' | 'fight';
  goto: string;
  raiseRage?: boolean;
  setFought?: boolean;
  saveEvidence?: boolean;
  setAlliance?: boolean;
}

export interface Scene {
  chapter: string;
  title: string;
  art: string;
  resolve: string;
  text: string;
  choices: Choice[];
}

export const storyData: Record<string, Scene> = {
  s_prologue: {
    chapter: 'CHAPTER I — THE BOY WITH NO VOICE',
    title: 'THE WEIGHT OF SILENCE',
    art: 'schoolyard',
    resolve: 'BROKEN',
    text: `His name was <strong>Aryan Malik</strong>. Seventeen years old. Medium height, forgettable face, invisible to most — which was, ironically, the one thing that kept him alive.<br><br>
    <em>Eastbrook Secondary School had its own ecosystem of cruelty.</em> At the top of the food chain sat <strong>Raza Bhatt</strong> — the kind of bully who didn't just hurt you physically. He dismantled you. Piece by piece, day by day, until you forgot what you used to be.<br><br>
    The trauma had been building since eighth grade. Three years of shoves in hallways. Lunch trays knocked from hands. Whispered words designed to hollow him out. And Aryan — quiet, intelligent, raised alone by his mother who worked double shifts at the hospital — had learned to fold himself smaller and smaller, until he was barely a shadow on the wall.<br><br>
    <span class="monologue">"If I don't react, they'll get bored. If I don't react, they'll stop. If I don't react—"</span><br><br>
    They never stopped.`,
    choices: [
      { text: '[ ENDURE ] Walk past Raza and his crew. Say nothing. Disappear into the crowd.', tag: 'stealth', goto: 's_endure' },
      { text: '[ OBSERVE ] Study them from afar. Learn the hierarchy. Map the weaknesses.', tag: 'intel', goto: 's_observe' },
      { text: '[ CONFRONT ] Make eye contact. Hold it. Something is different today.', tag: 'fight', goto: 's_confront_early' }
    ]
  },
  s_endure: {
    chapter: 'CHAPTER I — THE BOY WITH NO VOICE',
    title: 'INVISIBLE',
    art: 'schoolyard',
    resolve: 'BROKEN',
    text: `Aryan pulls the hood of his jacket up and cuts through the side corridor, taking the longer route to class. He's late. He doesn't care. Being late is safer than the gauntlet of the main hall where Raza holds court.<br><br>
    A hand shoots out from a locker bay and shoves him sideways. His books scatter. Laughter erupts. Three boys — Raza and his lieutenants, <strong>Vikram</strong> and <strong>Dev</strong>.<br><br>
    <div class="dialogue"><span class="speaker">RAZA</span>"Aww, look at him flinch. Still the same scared little rat."</div>
    Aryan stares at the floor tiles. One, two, three — he counts the cracks in the linoleum. An old trick. Anchor yourself to something real. Don't let them see the trembling hands.<br><br>
    He picks up his books slowly. Methodically. And walks away.<br><br>
    <span class="monologue">"I hate myself. I hate that I keep walking away. But I see how Raza's father has connections to the city councillor. I've seen the unmarked cars. There's something bigger here that I can't name yet."</span>`,
    choices: [
      { text: '[ ACCEPT ] Go home. Study. Keep your head down. Protect yourself.', tag: 'stealth', goto: 's_homelife' },
      { text: '[ RESEARCH ] Dig into Raza\'s background. Who is his father really?', tag: 'intel', goto: 's_research_raza' }
    ]
  },
  s_observe: {
    chapter: 'CHAPTER I — THE BOY WITH NO VOICE',
    title: 'THE ARCHITECT WATCHES',
    art: 'schoolyard',
    resolve: 'CALCULATING',
    text: `From his seat by the window in the library, Aryan has a perfect sightline to the courtyard below. He keeps a small notebook — blue cover, dense handwriting. He calls it his <em>Field Notes</em>. His teacher thinks it's homework. It isn't.<br><br>
    Over three months he has catalogued everything: Raza's schedule, his moods, the times he is alone versus surrounded. More importantly, he has tracked the adults who pick Raza up in blacked-out SUVs on Friday evenings. Adults who look nothing like school parents.<br><br>
    <div class="dialogue"><span class="speaker">ARYAN — INNER VOICE</span>"Raza's father isn't just a businessman. The registration plates. I ran them through a DMV public lookup last month. Shell company. Registered in three cities."</div>
    He's seventeen. He doesn't fully understand what he's stumbled onto. He only knows that Raza's cruelty isn't random — it's practiced. Inherited.`,
    choices: [
      { text: '[ PATIENCE ] Keep watching. Don\'t act yet. Let the picture become complete.', tag: 'intel', goto: 's_homelife', raiseRage: true },
      { text: '[ APPROACH ] An older student named Kabir seems to know things about Raza\'s family. Talk to him.', tag: 'intel', goto: 's_kabir_ally' }
    ]
  },
  s_confront_early: {
    chapter: 'CHAPTER I — THE BOY WITH NO VOICE',
    title: 'SOMETHING SNAPS',
    art: 'schoolyard',
    resolve: 'SPARKING',
    text: `<div class="fight-scene"><p class="fight-text">Something is different today. Aryan stops walking. He turns around.<br><br>
    Raza is mid-laugh, one hand on Vikram's shoulder, the other gesturing widely. The entire hallway — twelve, fifteen students — is watching.<br><br>
    Aryan takes three steps back toward him. His pulse is thunder.<br><br>
    <strong>Raza sees him coming and his smile widens. He's never seen this look on Aryan's face before.</strong><br><br>
    "Oh, the mouse wants to — "<br><br>
    Aryan's fist moves before the sentence ends. It's not clean. It's not trained. It's three years of compressed silence converted into a single swinging motion that catches Raza's jaw at the wrong angle and sends him stumbling sideways into the lockers with a metallic crash that echoes down the hallway.<br><br>
    Silence. Total silence.</p></div>
    The hallway is frozen. Raza touches his jaw. Looks at his hand. Looks at Aryan.<br><br>
    <div class="dialogue"><span class="speaker">RAZA — QUIET, DANGEROUS</span>"You just made the biggest mistake of your life."</div>`,
    choices: [
      { text: '[ STAND FIRM ] "Come on then." Don\'t break eye contact.', tag: 'fight', goto: 's_fight_hallway', setFought: true },
      { text: '[ WALK AWAY ] You said what you needed to say. Leave now.', tag: 'stealth', goto: 's_aftermath_early', setFought: true }
    ]
  },
  s_homelife: {
    chapter: 'CHAPTER I — THE BOY WITH NO VOICE',
    title: 'MA',
    art: 'schoolyard',
    resolve: 'TENDER',
    text: `<strong>Zarina Malik</strong> was forty-three years old and looked sixty, not from age but from love — the kind that carves itself into your face as sacrifice lines. She worked fourteen-hour shifts at the public hospital as a ward nurse. She came home smelling of antiseptic and made <em>dal</em> and rotis and asked Aryan about his day in a voice that made everything feel survivable.<br><br>
    <div class="dialogue"><span class="speaker">ZARINA</span>"You ate? Sit. Tell me what you learned today."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Nothing important."</div>
    She watches him with those quiet, knowing eyes. She has always known something is wrong at school. She doesn't push. She just makes tea and sits beside him and the silence between them is the safest place in his entire world.<br><br>
    <span class="monologue">"She works so hard for me. She has no one except me. I will not let my problems become her problems. I will not let her see what they've done to me."</span><br><br>
    That night, Aryan stares at the ceiling. Somewhere in the city, an SUV with blacked-out windows idles outside a restaurant. Men in expensive clothes make agreements. Names are exchanged. And a seventeen-year-old boy with shaking hands does not yet know his name is on a list.`,
    choices: [
      { text: '[ CONTINUE ] Six months pass. The day of reckoning approaches.', tag: 'stealth', goto: 's_the_day', raiseRage: true },
      { text: '[ TRAIN ] Aryan starts training in secret — early mornings, rooftop, self-taught.', tag: 'fight', goto: 's_training', raiseRage: true }
    ]
  },
  s_kabir_ally: {
    chapter: 'CHAPTER I — THE BOY WITH NO VOICE',
    title: 'THE MAN WHO KNEW TOO MUCH',
    art: 'schoolyard',
    resolve: 'CALCULATING',
    text: `<strong>Kabir Ansari</strong> is twenty-one, technically still in school, repeating his final year. But no one asks questions because his uncle sits on the school board. He deals in information the way others deal in cigarettes — quietly, by the back fence, never for free.<br><br>
    Aryan approaches him during the lunch period. Kabir looks up from his phone. Studies him.<br><br>
    <div class="dialogue"><span class="speaker">KABIR</span>"You're the one Raza's been running his mouth about. The quiet one."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"What do you know about his father?"</div>
    A long pause. Kabir pockets his phone.<br><br>
    <div class="dialogue"><span class="speaker">KABIR</span>"Bhatt Sr. is logistics for NEMESIS. That's what people call it on the street. But the official name is the <strong>Inter-State Intelligence Syndicate</strong>. ISI. Except it's not a government agency. It's a private criminal network that's been operating in five cities for twelve years. Weapons, trafficking, blackmail. They own police, they own politicians."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Why are you telling me this?"</div>
    <div class="dialogue"><span class="speaker">KABIR</span>"Because you have that look. The look people get right before they do something stupid or something historic."</div>`,
    choices: [
      { text: '[ ALLIANCE ] "Help me understand the structure. All of it."', tag: 'intel', goto: 's_isi_map', setAlliance: true },
      { text: '[ ALONE ] "I don\'t need partners." Walk away with what you know.', tag: 'stealth', goto: 's_homelife' }
    ]
  },
  s_research_raza: {
    chapter: 'CHAPTER I — THE BOY WITH NO VOICE',
    title: 'RABBIT HOLE',
    art: 'schoolyard',
    resolve: 'CALCULATING',
    text: `Late nights in front of a screen. The search history that Aryan clears every morning before his mother might see. Three weeks of digging through public records, news archives, social media threads, and a forum frequented by anonymous whistleblowers and true crime researchers.<br><br>
    What he finds makes him cold.<br><br>
    <strong>Bhatt Enterprises.</strong> Parent company: Indralok Holdings. Shell network stretching through seven jurisdictions. Associated personnel including one <strong>General Tariq Sadiq</strong>, former intelligence operative, currently private sector — and the man known in certain circles only as <strong>"The Director"</strong> — the untouchable head of the syndicate that has never once been photographed publicly.<br><br>
    <span class="monologue">"Raza isn't just a bully. He's a training exercise. His cruelty is being cultivated. And I — a schoolboy who flinches in hallways — I just decided I'm going to take this apart."</span><br><br>
    He closes the laptop. His hands have stopped shaking for the first time in three years.`,
    choices: [
      { text: '[ PLAN ] This needs more time. Build the case carefully.', tag: 'intel', goto: 's_homelife', setAlliance: false, raiseRage: true },
      { text: '[ ACT ] It starts now. Go find Raza.', tag: 'fight', goto: 's_the_day', raiseRage: true }
    ]
  },
  s_training: {
    chapter: 'CHAPTER I — THE BOY WITH NO VOICE',
    title: 'BEFORE DAWN',
    art: 'firstfight',
    resolve: 'HARDENING',
    text: `4:45 AM. The rooftop of Block C, their apartment building. Aryan in a worn t-shirt, running lunges across cold concrete, counting under his breath. He found videos online. Boxing fundamentals. Krav Maga basics. A former soldier's YouTube channel about street survival.<br><br>
    He has no bag. He punches the rolled-up blanket tied to the water tank. He runs the stairs fifteen times. He reads about pain tolerance and muscle memory and the psychology of violence.<br><br>
    <span class="monologue">"I'm not doing this to get revenge. I'm doing this so that the next time someone raises their hand at me, my body knows what to do before my fear catches up."</span><br><br>
    Six months. His posture changes. His jaw sets differently. Teachers notice but say nothing. Raza's crew notices. They start being slightly less direct in their cruelty — which is itself a kind of victory.<br><br>
    Then one morning his mother calls from the hospital, voice shaking. She has been suspended pending investigation. Someone filed an anonymous complaint. The timing is not coincidental.`,
    choices: [
      { text: '[ INVESTIGATE ] Find out who filed the complaint. Follow the thread.', tag: 'intel', goto: 's_the_day', raiseRage: true },
      { text: '[ CONFRONT RAZA ] This was him. Go confront him directly, trained and ready.', tag: 'fight', goto: 's_fight_hallway', setFought: true }
    ]
  },
  s_isi_map: {
    chapter: 'CHAPTER I — THE BOY WITH NO VOICE',
    title: 'THE ARCHITECTURE OF EVIL',
    art: 'schoolyard',
    resolve: 'CALCULATING',
    text: `Over eight evenings at a tea stall three blocks from school, Kabir lays it out. He draws it on napkins that Aryan photographs and burns. The ISI Syndicate has six tiers:<br><br>
    <div class="monologue">TIER 1 — The Director (unknown identity, known only to inner circle)<br>
    TIER 2 — The Four Generals (including Bhatt Sr.)<br>
    TIER 3 — Regional Commanders (10 cities)<br>
    TIER 4 — Enforcement (several hundred operatives)<br>
    TIER 5 — Fronts (legitimate businesses as cover)<br>
    TIER 6 — Leverage (civilians trapped, bribed, or threatened)</div>
    <div class="dialogue"><span class="speaker">KABIR</span>"You can't fight this. One person can't fight this. The police are compromised. Journalists who've tried are gone. This thing has been growing for twelve years undisturbed."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Where does Raza's father rank?"</div>
    <div class="dialogue"><span class="speaker">KABIR</span>"Tier 2. One of the Four Generals. He handles cross-city logistics — moving people, moving money."</div>
    Aryan folds the final napkin. Pockets it.<br><br>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Then that's where I start."</div>`,
    choices: [
      { text: '[ CONTINUE ] The plan takes shape over the following months.', tag: 'intel', goto: 's_the_day', raiseRage: true }
    ]
  },
  s_the_day: {
    chapter: 'CHAPTER II — THE DAY EVERYTHING BROKE',
    title: 'THE CONFRONTATION',
    art: 'firstfight',
    resolve: 'IGNITING',
    text: `<strong>March. A Tuesday.</strong> The kind of grey, unremarkable morning that has no right to be the day a person's life splits into before and after.<br><br>
    Aryan has turned eighteen three weeks ago. He is no longer the hunched boy who counted floor tiles. Something has changed in his bearing — a stillness, a density, like something cooling into hardened steel.<br><br>
    Raza finds him in the stairwell between second and third period. Raza is with four others today — not just his usual two. He has escalated for reasons Aryan will only understand later.<br><br>
    <div class="dialogue"><span class="speaker">RAZA</span>"Heard your mummy lost her job. Shame. How's she gonna pay rent?"</div>
    The stairwell is narrow. There are no cameras. Raza reaches out to shove Aryan's shoulder — a dismissive, contemptuous gesture — and Aryan's hand comes up and catches his wrist.<br><br>
    A pause. Everyone in the stairwell goes very still.<br><br>
    <div class="dialogue"><span class="speaker">ARYAN — QUIET</span>"Don't."</div>`,
    choices: [
      { text: '[ FIGHT ] Release his wrist. Then hit first. Take them all.', tag: 'fight', goto: 's_stairwell_fight' },
      { text: '[ CONTROLLED ] Bend his wrist back. One controlled move. Issue the warning.', tag: 'stealth', goto: 's_stairwell_control' }
    ]
  },
  s_fight_hallway: {
    chapter: 'CHAPTER II — THE DAY EVERYTHING BROKE',
    title: 'HALLWAY WAR',
    art: 'firstfight',
    resolve: 'FIGHTING',
    text: `<div class="fight-scene"><p class="fight-text">
    Vikram throws the first real punch. Aryan slips it — barely, and more from luck than skill — and drives his elbow back into Vikram's nose. The crack is sharp and wet. Vikram sits down immediately.<br><br>
    Dev comes from the left. Aryan doesn't have time to think. He drops, grabs Dev's reaching arm, twists his body and uses Dev's own momentum to fling him forward into the lockers. Metal thunders. Someone in the hallway screams.<br><br>
    Then Raza — and this one is different. Raza knows how to fight. He's been trained. His first strike catches Aryan's cheek and sends white sparks across his vision. His second never lands because Aryan has stepped inside it, grabbed Raza's collar with both hands, and driven his forehead into Raza's nose.<br><br>
    <strong>Three down. In fourteen seconds.</strong><br><br>
    Aryan is bleeding from the cheek. His knuckles are split. His heart rate is perhaps 190. He stands over Raza, who is sitting against the lockers pressing his hands to his face.
    </p></div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"I know about your father. I know about ISI. Tell him I know."</div>
    He walks to class. He sits down. He opens his textbook. His hands are trembling — but not from fear.`,
    choices: [
      { text: '[ PROCEED ] That evening, the consequences begin.', tag: 'fight', goto: 's_warning_call', setFought: true }
    ]
  },
  s_stairwell_fight: {
    chapter: 'CHAPTER II — THE DAY EVERYTHING BROKE',
    title: 'FIVE TO ONE',
    art: 'firstfight',
    resolve: 'UNLEASHED',
    text: `<div class="fight-scene"><p class="fight-text">
    Five against one, narrow stairwell. Every tactical disadvantage becomes an advantage.<br><br>
    They can't all attack at once. The first two are blocking the others. Aryan targets them first — a sharp palm strike to the first boy's chin, a sweep of the second's standing leg — both down before the third can clear the corner of the landing.<br><br>
    The third boy hesitates. That hesitation costs him. Aryan moves through it like a current through a gap.<br><br>
    Raza and his last man are at the top. Raza's last man makes a decision and runs. Raza doesn't.<br><br>
    They fight for forty seconds. It is ugly and close and real. Raza gets in two good hits — one to Aryan's ribs that makes breathing briefly impossible, one that splits his lip. But Aryan doesn't stop. Can't be stopped. Has been waiting for this moment for three years and his body has stored every single day of it.<br><br>
    Raza ends up on the stairwell floor. Aryan crouches over him.
    </p></div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"I know about Bhatt Senior. I know about ISI. Tell your father: <em>I'm coming.</em>"</div>`,
    choices: [
      { text: '[ NEXT ] That night, the first threat arrives.', tag: 'fight', goto: 's_warning_call', setFought: true }
    ]
  },
  s_stairwell_control: {
    chapter: 'CHAPTER II — THE DAY EVERYTHING BROKE',
    title: 'THE WHISPER THAT ROARS',
    art: 'firstfight',
    resolve: 'CONTROLLED',
    text: `Aryan bends Raza's wrist back — just enough. Not to break it. Just enough that pain overrides arrogance. Raza's face crumples in surprise.<br><br>
    The four others stare. They've never seen this before.<br><br>
    <div class="dialogue"><span class="speaker">ARYAN — BARELY ABOVE A WHISPER</span>"Tell your father his logistics company's registration in three shell jurisdictions doesn't survive a leak to the right journalist. Tell him the numbered accounts linked to Indralok Holdings are interesting reading. And tell him next time you raise your hand at me — I won't be this polite."</div>
    He releases. Raza doesn't move. Aryan steps past him, up the stairs, and doesn't look back.<br><br>
    <span class="monologue">"That was a mistake. He won't be scared. He'll be activated. I just poked a criminal empire with a stick."</span><br><br>
    By evening, he knows he was right. Because his phone rings at 9 PM and it's his mother calling from an unknown number.`,
    choices: [
      { text: '[ ANSWER ] "Ma? Where are you?"', tag: 'stealth', goto: 's_warning_call', setFought: true }
    ]
  },
  s_aftermath_early: {
    chapter: 'CHAPTER II — THE DAY EVERYTHING BROKE',
    title: 'THE QUIET BEFORE',
    art: 'schoolyard',
    resolve: 'WARY',
    text: `Aryan walks away from the stunned hallway. He can feel eyes on his back for every step. He doesn't look back.<br><br>
    The rest of the day passes in a strange suspended atmosphere — as if the school itself is holding its breath. Raza doesn't come to afternoon classes. His crew avoids eye contact.<br><br>
    Walking home at 4 PM, Aryan notices a car he doesn't recognize idling on the street near their building. A blacked-out SUV. Government plates that he has seen in his research — plates registered to Bhatt Enterprises.<br><br>
    He doesn't go inside. He walks past. Keeps walking. Finds a tea shop three streets away and sits with his back to the wall and watches the street.<br><br>
    <span class="monologue">"They escalated faster than I expected. I poked them and they went straight to surveillance. This means I've been noted. This means Ma could become leverage."</span><br><br>
    He calls his mother. She doesn't pick up. He calls again. No answer.`,
    choices: [
      { text: '[ RUN ] Sprint back to the apartment. Something is wrong.', tag: 'fight', goto: 's_too_late' },
      { text: '[ CALL KABIR ] "It\'s happening. I need that number you said you had. The emergency contact."', tag: 'intel', goto: 's_warning_call' }
    ]
  },
  s_warning_call: {
    chapter: 'CHAPTER III — WHAT THEY TOOK FROM HIM',
    title: 'THE PHONE CALL',
    art: 'kidnap',
    resolve: 'FRACTURING',
    text: `The voice on the phone is calm. Educated. The voice of someone who has made many such calls and found them unremarkable.<br><br>
    <div class="dialogue"><span class="speaker">UNKNOWN MALE</span>"Aryan Malik. You spoke to my son today. You mentioned things you shouldn't know. This concerns me."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Where is my mother?"</div>
    <div class="dialogue"><span class="speaker">BHATT SR.</span>"She's comfortable for now. Cooperative people tend to remain comfortable. This is a simple conversation about discretion. Your curiosity has been — ambitious. But you're eighteen and smart and these things can be managed. Walk away from whatever you think you know and she comes home tonight."</div>
    A long silence. Aryan's jaw is tight. His eyes are dry. This is the moment everything he has studied and observed and quietly prepared for becomes <em>real</em>.<br><br>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Put her on the phone."</div>
    Shuffling. Then his mother's voice — steady, because she is the bravest person he has ever known:<br><br>
    <div class="dialogue"><span class="speaker">ZARINA</span>"Aryan. Don't do anything they say. Don't give them—"</div>
    The line goes to Bhatt Sr. again.<br><br>
    <div class="dialogue"><span class="speaker">BHATT SR.</span>"You have 24 hours to decide what kind of son you want to be."</div>`,
    choices: [
      { text: '[ AGREE ] Buy time. Pretend to comply. "I\'ll walk away. Just tell me where to meet you."', tag: 'intel', goto: 's_fake_comply' },
      { text: '[ REFUSE ] "You have 24 hours to let her go before I burn everything down."', tag: 'fight', goto: 's_open_war' },
      { text: '[ TRACE ] Say nothing. Hang up. Trace the call and find her.', tag: 'stealth', goto: 's_trace_call' }
    ]
  },
  s_too_late: {
    chapter: 'CHAPTER III — WHAT THEY TOOK FROM HIM',
    title: 'EMPTY',
    art: 'kidnap',
    resolve: 'SHATTERED',
    text: `The apartment door is unlocked. It is never unlocked.<br><br>
    Inside: the familiar smell of home — cardamom, fabric softener, his mother's eucalyptus oil — and underneath it, something wrong. Something chemical and out of place.<br><br>
    Her dupatta is on the kitchen floor. A single slipper by the door. The stove has been turned off mid-cooking — the dal has stuck to the bottom of the pot. She would never leave the stove unattended.<br><br>
    <span class="monologue">"She fought. She didn't go quietly. That means she had time to make noise. That means the neighbors — "</span><br><br>
    Old Mrs. Varma from next door. She was at her window. She saw two men and a car. She didn't call the police because one of the men showed her something — a badge, she thought, though she's not sure.<br><br>
    <strong>They have her. And Aryan is alone in the apartment with cold dal and a single slipper and three years of research and a rage so enormous it has become a kind of silence.</strong><br><br>
    His phone buzzes. Unknown number.`,
    choices: [
      { text: '[ ANSWER ] Hear what they have to say before reacting.', tag: 'intel', goto: 's_warning_call' },
      { text: '[ DON\'T ANSWER ] Start moving. You know enough. Find her yourself.', tag: 'stealth', goto: 's_trace_call' }
    ]
  },
  s_fake_comply: {
    chapter: 'CHAPTER III — WHAT THEY TOOK FROM HIM',
    title: 'THE LIE WITH TEETH',
    art: 'kidnap',
    resolve: 'DECEPTIVE',
    text: `<div class="dialogue"><span class="speaker">ARYAN</span>"Fine. I'll meet you. I'll hand over everything I have. I just want her back."</div>
    A pause. Then Bhatt Sr., satisfied:<br><br>
    <div class="dialogue"><span class="speaker">BHATT SR.</span>"Smart boy. The Meridian Hotel. Room 412. Tomorrow, 10 AM. Come alone."</div>
    Aryan hangs up. He has approximately sixteen hours. He does not sleep. He spends those sixteen hours in motion.<br><br>
    He contacts Kabir. He retrieves a USB drive from a hidden location — his insurance copy of every document, every registration trace, every shell company mapping. He sends encrypted copies to four separate email accounts with delayed send timers: if he doesn't check in within 48 hours, the files automatically go to three journalists and a crime investigation forum.<br><br>
    <span class="monologue">"I am not going to Room 412 empty-handed. I am going there as a grenade with the pin already pulled. If they take me — everything releases anyway. Which means my leverage is absolute."</span><br><br>
    But by 3 AM, something shifts. Kabir calls, voice urgent.`,
    choices: [
      { text: '[ LISTEN ] "What happened, Kabir?"', tag: 'intel', goto: 's_mother_crisis' }
    ]
  },
  s_open_war: {
    chapter: 'CHAPTER III — WHAT THEY TOOK FROM HIM',
    title: 'THE DECLARATION',
    art: 'kidnap',
    resolve: 'WRATHFUL',
    text: `A long, cold silence on the line.<br><br>
    <div class="dialogue"><span class="speaker">BHATT SR. — DIFFERENTLY NOW</span>"You don't understand what you're threatening, boy."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"ISI Syndicate. Six tiers. The Director's inner circle. Bhatt Enterprises, Indralok Holdings. The numbered accounts. The logistics routes. The leverage files on three police commissioners and a deputy minister. I understand exactly what I'm threatening."</div>
    The silence this time is of a different quality entirely. It is the silence of a machine recalculating.<br><br>
    <div class="dialogue"><span class="speaker">BHATT SR.</span>"You're bluffing."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"I sent a package today. If my mother isn't released within six hours, it opens."</div>
    He hangs up. His hands are shaking. He doesn't know if Bhatt Sr. believed him — he should, because it's true — but he knows this: they will accelerate. They will not wait to find out if he's bluffing. They will move on his mother now, tonight, as leverage or as removal.`,
    choices: [
      { text: '[ MOVE ] Don\'t wait. Start finding her right now.', tag: 'fight', goto: 's_trace_call', raiseRage: true },
      { text: '[ KABIR ] Call Kabir immediately. "I need the safe house location. Now."', tag: 'intel', goto: 's_mother_crisis' }
    ]
  },
  s_trace_call: {
    chapter: 'CHAPTER III — WHAT THEY TOOK FROM HIM',
    title: 'HUNTING',
    art: 'warehouse',
    resolve: 'FOCUSED',
    text: `He is not a hacker. He is something more dangerous: a patient, observant person who has spent months learning specifically what he would need to know for this moment.<br><br>
    The call pinged off two towers, suggesting a location range of about two square kilometers in the south industrial zone. Cross-referenced with Bhatt Enterprises' registered properties — he has a list of seven. Three of them are in that radius. He eliminates two by parcel records showing them as active warehouses with regular truck schedules. The third: <strong>Unit 7B, Meridian Industrial Complex.</strong> Listed as vacant for renovation. Registered to a front company connected to Indralok Holdings six layers deep.<br><br>
    <span class="monologue">"That's where she is. I'm ninety percent certain. And ninety percent is enough."</span><br><br>
    It takes him forty minutes to get there on foot and by local bus, staying off anything with cameras. When he reaches the industrial zone at 11 PM, the complex is quiet. Dark. But Unit 7B has two men outside who are not construction workers.<br><br>
    They are armed.`,
    choices: [
      { text: '[ STEALTH APPROACH ] Circle the building. Find another way in. Don\'t let them know you\'re here.', tag: 'stealth', goto: 's_infiltration', saveEvidence: true },
      { text: '[ DIRECT ] You don\'t have time for stealth. Hit them fast and hard and get inside.', tag: 'fight', goto: 's_front_assault' }
    ]
  },
  s_mother_crisis: {
    chapter: 'CHAPTER III — WHAT THEY TOOK FROM HIM',
    title: 'KABIR\'S CALL',
    art: 'kidnap',
    resolve: 'DESPERATE',
    text: `<div class="dialogue"><span class="speaker">KABIR — URGENT</span>"They moved her. My contact inside just pinged me. They got worried after your call — they're taking her to the secondary site. The Director's people are taking over from Bhatt."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Where?"</div>
    <div class="dialogue"><span class="speaker">KABIR</span>"Meridian Industrial. Unit 7B. You have maybe two hours before they move her again. Aryan—"</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Don't tell me not to go."</div>
    <div class="dialogue"><span class="speaker">KABIR</span>"I wasn't going to. I was going to tell you there are at least six men in there. And that I'm coming with you."</div>
    A pause.<br><br>
    <div class="dialogue"><span class="speaker">ARYAN</span>"You don't have to—"</div>
    <div class="dialogue"><span class="speaker">KABIR</span>"I've been watching this organization eat people for four years. I've been scared. You're eighteen and you're not scared. So yes. I'm coming."</div>`,
    choices: [
      { text: '[ ACCEPT ] "Meet me at the bus stand on Station Road. 20 minutes."', tag: 'intel', goto: 's_infiltration', setAlliance: true, saveEvidence: true },
      { text: '[ ALONE ] "No. You\'ll get killed. Stay back and trigger the email drops if I don\'t call by 2 AM."', tag: 'stealth', goto: 's_front_assault' }
    ]
  },
  s_infiltration: {
    chapter: 'CHAPTER IV — THE COMPOUND',
    title: 'INTO THE DARK',
    art: 'warehouse',
    resolve: 'PRECISE',
    text: `The roof access is through a ventilation grate on the eastern face that is not visible from the guard positions. Aryan goes up first. The metal is cold. Inside, the compound smells of oil and concrete and something else — antiseptic. His jaw tightens.<br><br>
    Six men, as Kabir estimated. Aryan maps them from the catwalk above:<br><br>
    <div class="monologue">Two outside the main entrance.<br>One in the ground floor corridor.<br>Two near a door in the southeast corner (that's where she is).<br>One mobile — moving on a patrol loop roughly every eight minutes.</div>
    He times the mobile guard. Studies the door. The two guards near the southeast room are armed but relaxed — they're not expecting trouble from inside the compound.<br><br>
    <div class="dialogue"><span class="speaker">ARYAN — INNER</span>"Eight minutes. That's how long I have between the mobile guard's back-turn and his return."</div>
    He drops from the catwalk.<br><br>
    <strong>Seven minutes and fifty seconds begin.</strong>`,
    choices: [
      { text: '[ TAKE THE GUARD ] Neutralize the corridor guard first. Silent.', tag: 'stealth', goto: 's_compound_stealth' },
      { text: '[ DIRECT LINE ] Corridor guard can wait. Go straight for the door.', tag: 'fight', goto: 's_compound_fight' }
    ]
  },
  s_front_assault: {
    chapter: 'CHAPTER IV — THE COMPOUND',
    title: 'THROUGH THE FRONT DOOR',
    art: 'warehouse',
    resolve: 'RECKLESS',
    text: `<div class="fight-scene"><p class="fight-text">
    The two guards outside never see him coming from the dark.<br><br>
    The first goes down from a running tackle that drives his head against the corrugated wall — not elegant, brutally effective. The second has time to turn before Aryan hits him with the kind of efficiency that only comes from someone who has nothing left to lose — a combination that ends with the man face-down and unconscious.<br><br>
    Aryan picks up one of their radios. Inside, shouts. The noise was heard.<br><br>
    He goes through the door at speed. The corridor guard raises his weapon — hesitates for one critical half-second at the sight of this teenager with blood on his hands and dead eyes — and that half-second is everything.<br><br>
    <strong>Aryan is through the corridor and at the southeast door before the radio crackles with a response.</strong><br><br>
    He kicks the door open.
    </p></div>`,
    choices: [
      { text: '[ BREACH ] Go in. Whatever you find — go in.', tag: 'fight', goto: 's_find_mother' }
    ]
  },
  s_compound_stealth: {
    chapter: 'CHAPTER IV — THE COMPOUND',
    title: 'GHOST',
    art: 'warehouse',
    resolve: 'LETHAL',
    text: `<div class="fight-scene"><p class="fight-text">
    The corridor guard doesn't hear him until Aryan's arm is around his throat — a rear naked choke, applied with mechanical precision, held for seven seconds. The man slides down the wall without a sound.<br><br>
    Aryan takes his access card. His radio. His phone — which he pockets. Five minutes remaining on the patrol loop.<br><br>
    The two guards at the southeast door are more alert. He can't take both simultaneously from stealth. He needs them to separate.<br><br>
    He uses the confiscated radio. Clicks it twice — the signal for "check in" that he heard used when he was watching from the catwalk. One of the guards keys his own radio in response. Aryan doesn't reply. A moment later, the guard steps away from the door to try again on a different channel.<br><br>
    One guard remaining. Aryan moves.<br><br>
    <strong>Twenty seconds later, he is at the door alone. He uses the access card.</strong>
    </p></div>`,
    choices: [
      { text: '[ ENTER ] Open the door. Find her.', tag: 'stealth', goto: 's_find_mother' }
    ]
  },
  s_compound_fight: {
    chapter: 'CHAPTER IV — THE COMPOUND',
    title: 'CONTROLLED CHAOS',
    art: 'warehouse',
    resolve: 'UNLEASHED',
    text: `<div class="fight-scene"><p class="fight-text">
    He moves too fast for the corridor guard to respond cleanly. The guard fumbles for his radio — Aryan closes the distance in three steps and takes him down with a knee strike that ends the threat before the radio is fully keyed.<br><br>
    Noise. Both door guards turn simultaneously. One raises his weapon. Aryan drops below the line of fire, rolls forward, comes up inside the guard's arm — the one weapon that can't be used at zero distance — and takes him out with a close-range strike.<br><br>
    The second guard swings his own weapon. It catches Aryan across the shoulder. He staggers. Doesn't fall. Steps into the swing's aftermath and delivers two strikes that put the guard down.<br><br>
    <strong>His shoulder screams. He ignores it. He's at the door.</strong>
    </p></div>`,
    choices: [
      { text: '[ ENTER ] Open the door with the taken access card. Find her.', tag: 'fight', goto: 's_find_mother' }
    ]
  },
  s_find_mother: {
    chapter: 'CHAPTER IV — THE COMPOUND',
    title: 'TOO LATE',
    art: 'kidnap',
    resolve: 'BROKEN-OPEN',
    text: `The room is small and lit by a single hanging bulb. A chair in the center. Rope on the floor. The antiseptic smell, stronger here.<br><br>
    <strong>Zarina Malik is alive.</strong> Barely. She is on the floor against the far wall, head resting against it, eyes closed. She has been beaten. Her wrists are raw. When he crosses the room and touches her face, she opens her eyes.<br><br>
    <div class="dialogue"><span class="speaker">ZARINA</span>"Aryan. <em>Beta.</em> You came."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"I have you. We're going."</div>
    He lifts her. She's lighter than she should be. He carries her toward the door — and stops.<br><br>
    In the doorway stands a man he has only seen in photographs. Expensive suit. Cold eyes. Not Bhatt Sr. — someone higher. This man's stillness is absolute.<br><br>
    <div class="dialogue"><span class="speaker">MAN</span>"You're remarkable, son. You've made it further than anyone we've ever had to manage. But this ends here."</div>
    Behind him: four armed men.<br><br>
    <span class="monologue">"Ma. I have to put her down. I have to — "</span>`,
    choices: [
      { text: '[ FIGHT WITH MOTHER PRESENT ] "Then come on." Set her gently down. Stand up.', tag: 'fight', goto: 's_desperate_fight' },
      { text: '[ NEGOTIATE ] "I have a dead man\'s switch. Files release in 2 hours unless I cancel them. Let us leave."', tag: 'intel', goto: 's_standoff' }
    ]
  },
  s_desperate_fight: {
    chapter: 'CHAPTER IV — THE COMPOUND',
    title: 'FIVE AND ONE',
    art: 'warehouse',
    resolve: 'BEYOND-LIMITS',
    text: `<div class="fight-scene"><p class="fight-text">
    He has fought tonight. His shoulder is damaged. His knuckles are split. He has maybe sixty percent of what he started with.<br><br>
    The first man through the door gets Aryan's full and terrifying remaining sixty percent.<br><br>
    It is a brutal, close-quarters fight with no room for style. Aryan takes hits. Real hits. A strike to the ribs that might have cracked something. A glancing blow to the temple that makes the room swim. But for every hit he takes, he gives one back — and the men he's facing, for all their training, have not fought someone who is operating outside the fear response entirely.<br><br>
    <strong>You cannot intimidate someone who has already decided they don't care what happens to them.</strong><br><br>
    Four men down. The fifth — the one in the suit — has not moved. He watches with something approaching respect.<br><br>
    Aryan stands over the last fallen body. He is breathing hard. One eye is partially swollen.
    </p></div>
    <div class="dialogue"><span class="speaker">SUITED MAN</span>"You can't do this to the whole organization."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"I won't have to. Your files are going to do it for me."</div>`,
    choices: [
      { text: '[ TAKE HIM ] Subdue him. He\'s the key to everything above him.', tag: 'fight', goto: 's_capture_general' },
      { text: '[ GET MA OUT ] She comes first. Leave this man. Get her out now.', tag: 'stealth', goto: 's_escape_then_war' }
    ]
  },
  s_standoff: {
    chapter: 'CHAPTER IV — THE COMPOUND',
    title: 'THE EDGE OF THE KNIFE',
    art: 'kidnap',
    resolve: 'CALCULATING',
    text: `A long, careful silence. The suited man's eyes move to Aryan's pocket. To the phone visible there — a guard's phone. Calculating.<br><br>
    <div class="dialogue"><span class="speaker">SUITED MAN</span>"What files."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Shell companies, account numbers, logistics routes, the Deputy Minister's leverage file, the three police commissioners' files. Twelve years of ISI operational data that I've been compiling from public records, leaked documents, and sources. It goes to six journalists and two law enforcement contacts outside the jurisdiction at 3 AM unless I send a cancel code."</div>
    The man is very still. Aryan continues:<br><br>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Let my mother leave this building safely. Right now. And I walk out after her without these men following. In exchange: I give you 48 hours to disappear before the files drop anyway. That's the deal."</div>
    <div class="dialogue"><span class="speaker">SUITED MAN</span>"And if I decline?"</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Then the 48 hours disappears and it all goes right now."</div>`,
    choices: [
      { text: '[ HE ACCEPTS ] He signals his men to step back. He lets Zarina go.', tag: 'intel', goto: 's_escape_then_war' },
      { text: '[ HE DECLINES — FIGHT ] He signals his men forward. Trigger the files NOW and fight.', tag: 'fight', goto: 's_desperate_fight', raiseRage: true }
    ]
  },
  s_escape_then_war: {
    chapter: 'CHAPTER IV — THE COMPOUND',
    title: 'DAWN',
    art: 'warehouse',
    resolve: 'COLD',
    text: `Zarina is in a hospital bed by 2 AM. She has two broken ribs, lacerations, mild concussion. She will recover fully. The nurses ask no questions — Kabir's uncle on the school board has a cousin who is a senior doctor. Sometimes a network works in your favor.<br><br>
    Aryan sits in the waiting area. He is alone. Under the fluorescent light his face is damaged — bruised, cut — but his eyes are clear. Clearer than they have been in three years.<br><br>
    He opens a laptop. He navigates to the scheduled email queue. He doesn't cancel the sends.<br><br>
    He reschedules them — not for 3 AM. For 6 AM. When journalists begin their morning. When court offices open. When traffic is highest on news feeds.<br><br>
    <span class="monologue">"She's alive. I kept my promise — no, she didn't ask me to promise anything. But I kept it. And now there's still ISI. And The Director. And this doesn't end with one night."</span><br><br>
    His phone shows a message from Kabir: <em>"My contact in the organization is scared. Says The Director has ordered containment. They're going to disappear people. You need to move fast or the evidence chain collapses."</em>`,
    choices: [
      { text: '[ FAST ] "Tell your contact to send everything to the journalists TONIGHT. I\'ll handle the Director."', tag: 'fight', goto: 's_act5' },
      { text: '[ TACTICAL ] "Give me 72 hours to compile the final tier. We take the whole thing down or nothing."', tag: 'intel', goto: 's_act5' }
    ]
  },
  s_capture_general: {
    chapter: 'CHAPTER IV — THE COMPOUND',
    title: 'THE ASSET',
    art: 'warehouse',
    resolve: 'STRATEGIC',
    text: `The suited man does not resist. This is itself alarming — it means he has calculated that cooperation costs him less than resistance.<br><br>
    <div class="dialogue"><span class="speaker">SUITED MAN</span>"You don't know what you're holding."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Tier 2. One of the Four Generals. Logistics and coordination. Which means you know The Director's location protocols."</div>
    A flicker — so brief it might not have happened — behind those cold eyes.<br><br>
    <div class="dialogue"><span class="speaker">SUITED MAN</span>"You're building toward the top. Ambitious. You understand that even if you take down the Director, the organization—"</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Continues for a while and then collapses without central coordination, exposed finances, and a public evidence trail. Yes. I've read about this. I've planned for this."</div>
    He takes the man's phone. Takes the encrypted tablet from his jacket. Takes his access codes — not violently, but with an absolute certainty that makes violence unnecessary.<br><br>
    <strong>He now has what he needs for the final act.</strong>`,
    choices: [
      { text: '[ CONTINUE ] With his mother safe and a General in custody — it\'s time for the Director.', tag: 'intel', goto: 's_act5', saveEvidence: true }
    ]
  },
  s_act5: {
    chapter: 'CHAPTER V — THE DIRECTOR',
    title: 'TWELVE YEARS OF DARKNESS',
    art: 'final',
    resolve: 'ABSOLUTE',
    text: `<strong>Three weeks.</strong> Aryan doesn't sleep properly. He eats when he remembers to. He visits his mother every day and sits with her for exactly one hour — enough to remind both of them why this matters — and then returns to the work.<br><br>
    The files have done their job. Two journalists have published. One police commissioner has resigned. The Deputy Minister is under investigation. The ISI's financial channels are frozen in two jurisdictions. The organization is contracting, burning its edges, going quiet in the way that predators go quiet when cornered.<br><br>
    But the Director has not been touched.<br><br>
    Because the Director has never been identified. Even in the files. Even in the data. There is one person who is referenced only by a code name: <strong>KHURAM</strong>. Who is never in the same place twice. Who communicates through four layers of cutout.<br><br>
    Except: the General Aryan captured had an encrypted tablet. And on that tablet, buried under seventeen layers of misdirection, is a single location and a single date.<br><br>
    <strong>Tomorrow. A private estate outside the city. A meeting of whatever remains of ISI's inner circle.</strong><br><br>
    Aryan sits in the dark for a long time. Then he gets up and starts preparing.`,
    choices: [
      { text: '[ WITH KABIR ] Take Kabir and his contact. Three people, coordinated.', tag: 'intel', goto: 's_final_approach_alliance' },
      { text: '[ ALONE ] You started this alone. You end it alone.', tag: 'fight', goto: 's_final_approach_solo' }
    ]
  },
  s_final_approach_alliance: {
    chapter: 'CHAPTER V — THE DIRECTOR',
    title: 'THREE GHOSTS',
    art: 'final',
    resolve: 'PRECISE',
    text: `The estate is walled. Guards on a rotation. Security cameras — but Kabir's contact, who has been living inside ISI for four years and whose name Aryan will never know, has already corrupted the feeds for a forty-minute window starting at midnight.<br><br>
    They go in at 12:07.<br><br>
    Kabir handles the outer perimeter with tools Aryan doesn't ask about. Aryan handles the interior. Two guards between him and the meeting room door — handled with the efficiency of someone who has fought seventeen times in the past three weeks and stopped counting the pain.<br><br>
    <div class="fight-scene"><p class="fight-text">The meeting room door opens onto six men around a table. Five ISI inner circle. And at the head:<br><br>
    <strong>KHURAM.</strong><br><br>
    He is sixty years old. Unremarkable face. Well-dressed in the way of old wealth. He looks up from the table and sees Aryan in the doorway and his expression does not change. Not fear. Not surprise. A kind of recognition.<br><br>
    "I've been expecting something like you," he says. "Eventually."</p></div>`,
    choices: [
      { text: '[ REVEAL ] "It\'s over. The files are already public. Your men are already being arrested. This is just the last piece."', tag: 'intel', goto: 's_final_confrontation' },
      { text: '[ FIGHT ] Don\'t speak. Move. Every second of conversation is a second for them to react.', tag: 'fight', goto: 's_final_fight' }
    ]
  },
  s_final_approach_solo: {
    chapter: 'CHAPTER V — THE DIRECTOR',
    title: 'ONE AGAINST THE DARK',
    art: 'final',
    resolve: 'ABSOLUTE',
    text: `He goes in at midnight through the one gap in the patrol that he has observed for two days in a row.<br><br>
    The estate has seven guards. He takes four on the way in — each encounter documented carefully in his mind as a sequence of decisions and their outcomes. His shoulder, damaged a month ago, holds. His eye, still faintly bruised, sees clearly.<br><br>
    He is inside. He is moving. He is following a corridor that smells of old stone and fresh money.<br><br>
    <div class="fight-scene"><p class="fight-text">
    The third guard is waiting — not on routine, but placed deliberately. As if someone expected him. Aryan adjusts mid-motion, takes a hit to the arm, delivers two responses that end the encounter.<br><br>
    Then the corridor opens into light.<br><br>
    And there is the Director. Alone. Standing at a window with his back to the room. As if he ordered the others away. As if he has been waiting.<br><br>
    <strong>KHURAM turns.</strong>
    </p></div>
    <div class="dialogue"><span class="speaker">KHURAM</span>"I dismissed them. I thought you deserved this without an audience. One boy. Tore my organization apart in three weeks."</div>`,
    choices: [
      { text: '[ SPEAK ] "You took my mother. You built your empire on people like her. It ends."', tag: 'fight', goto: 's_final_confrontation' },
      { text: '[ ATTACK ] There\'s nothing left to say.', tag: 'fight', goto: 's_final_fight' }
    ]
  },
  s_final_confrontation: {
    chapter: 'CHAPTER V — THE DIRECTOR',
    title: 'THE RECKONING',
    art: 'final',
    resolve: 'ABSOLUTE',
    text: `<div class="dialogue"><span class="speaker">KHURAM</span>"You know the tragedy, boy? You would have been extraordinary working for me. This mind. This capability. Wasted on revenge."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"I'm not here for revenge."</div>
    <div class="dialogue"><span class="speaker">KHURAM</span>"No?"</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Revenge would be making you suffer the way my mother suffered. I'm not interested in that. I'm here because you're the last signature on the evidence chain. Because as long as you're free, the organization has a center. And I need you to not have a center."</div>
    A long pause. The old man studies him.<br><br>
    <div class="dialogue"><span class="speaker">KHURAM</span>"And if I surrender?"</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"Then the law handles it. Your lawyers will argue. Some of you will walk. I know that. I've accepted that. The structure still collapses. The people you were trafficking still get identified. The leverage files still release the people you were controlling."</div>
    <div class="dialogue"><span class="speaker">KHURAM</span>"You're eighteen."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"I know."</div>`,
    choices: [
      { text: '[ HE SURRENDERS ] "I\'ll walk out with you." The long game wins.', tag: 'intel', goto: 's_ending_justice' },
      { text: '[ HE REACHES FOR SOMETHING ] He draws a weapon. He was never going to surrender.', tag: 'fight', goto: 's_final_fight' }
    ]
  },
  s_final_fight: {
    chapter: 'CHAPTER V — THE DIRECTOR',
    title: 'THE LAST FIGHT',
    art: 'final',
    resolve: 'FINAL',
    text: `<div class="fight-scene"><p class="fight-text">
    The Director is sixty years old and has not fought personally in decades. But he has a weapon drawn and he has the calm of someone who has ordered death so many times that the act has lost its emotional charge for him.<br><br>
    He fires once. The round passes close enough that Aryan feels the air of it. He has already moved — rolling left, coming up behind the heavy oak table, using its bulk as cover while crossing the distance.<br><br>
    The second shot hits the table. Aryan vaults over it.<br><br>
    Close quarters. The weapon becomes useless. In close quarters, sixty years of privilege and twelve years of criminal empire and a lifetime of giving orders means nothing. What matters is who is faster.<br><br>
    <strong>Aryan is faster.</strong><br><br>
    The Director goes down. Not dead — Aryan has never killed anyone and does not start now. He is on the floor, wrist broken, disarmed, and looking up at this battered, scarred eighteen-year-old who has just dismantled his life's work with a notebook and a set of fists.<br><br>
    <strong>"It's over,"</strong> Aryan says. <strong>"All of it."</strong>
    </p></div>`,
    choices: [
      { text: '[ END ] The police — the uncorrupted ones, contacted through Kabir\'s chain — are outside.', tag: 'fight', goto: 's_ending_victory' }
    ]
  },
  s_ending_justice: {
    chapter: 'EPILOGUE',
    title: 'THE LONG ROAD',
    art: 'final',
    resolve: 'AT PEACE',
    text: `The Director walked out of the estate that night in handcuffs. Not police handcuffs — zip ties, because the investigating journalist and the two out-of-jurisdiction officers Kabir's contact had arranged were not standard-issue.<br><br>
    The trials take two years. Three of the Four Generals are convicted. The Director receives thirty-one years — more than he will likely live to serve. The Deputy Minister resigns. One hundred and forty-three people on the ISI leverage list are officially freed from blackmail documentation destroyed as evidence is processed.<br><br>
    Aryan testifies four times. In closed session, always. He is offered protection. He declines. He finishes school — not Eastbrook, a different one. He writes his university entrance essays about critical thinking and structural analysis and says nothing about ISI.<br><br>
    <strong>Zarina Malik recovers completely.</strong> She returns to nursing. She knows most of what happened and has asked few questions. One evening she places her hand over his and says:<br><br>
    <div class="dialogue"><span class="speaker">ZARINA</span>"You didn't have to do all that for me."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"I know. I did it for everyone else too."</div>
    <span class="monologue">He is nineteen. He is not the same boy who counted floor tiles. He doesn't know yet what he wants to be. But for the first time in years, he has time to figure it out.</span>`,
    choices: [
      { text: '✦ PLAY AGAIN — CHOOSE A DIFFERENT PATH', tag: 'stealth', goto: 'RESTART' }
    ]
  },
  s_ending_victory: {
    chapter: 'EPILOGUE',
    title: 'ASH AND DAWN',
    art: 'final',
    resolve: 'FORGED',
    text: `The estate is quiet when the officers arrive. The Director is sitting in a chair by the window — the one he stood at when he dismissed his men, when he thought this would be a final conversation between equals. He has said nothing since.<br><br>
    Aryan sits outside on the steps of the estate. Kabir sits beside him. Between them, a silence that has the weight of a finished thing.<br><br>
    <div class="dialogue"><span class="speaker">KABIR</span>"It's over."</div>
    <div class="dialogue"><span class="speaker">ARYAN</span>"The cases will take years."</div>
    <div class="dialogue"><span class="speaker">KABIR</span>"The structure is gone. The money is frozen. The leverage files are public. The people they controlled are free. The cases — that's someone else's problem now. Good people's problem."</div>
    A long pause. Dawn is beginning to grey the horizon.<br><br>
    <strong>Aryan thinks about his mother in a hospital bed smelling of antiseptic, saying his name in a shaking voice. He thinks about floor tiles and locker crashes and three years of folding himself smaller and smaller.</strong><br><br>
    He thinks about how none of that made him this. What made him this was refusing — eventually, and with enormous cost — to stay small.<br><br>
    <div class="dialogue"><span class="speaker">ARYAN</span>"I need to go see my mother."</div>
    He gets up. He walks toward the road. Behind him the estate stands empty, the last light of ISI going dark.<br><br>
    <span class="monologue"><em>The Shadow has risen. The night it rose in — is finally over.</em></span>`,
    choices: [
      { text: '↺ PLAY AGAIN — DISCOVER OTHER PATHS', tag: 'fight', goto: 'RESTART' }
    ]
  }
};
