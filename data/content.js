// Deen Trainer — content. Arabic for Quran lives in quran.js (fetched from api.alquran.cloud).
// Prayer/dua texts below are the standard well-known wordings. Madhab notes = Maliki (Morocco).

window.WUDU = [
  { t: "Intention (niyyah)", d: "In your heart: you're doing wudu for prayer. Nothing to say out loud." },
  { t: "Bismillah", d: "Say “Bismillah” before you start.", ar: "بِسْمِ اللَّهِ" },
  { t: "Hands ×3", d: "Wash both hands up to the wrists, between the fingers." },
  { t: "Mouth ×3", d: "Take water in your right hand, rinse your mouth." },
  { t: "Nose ×3", d: "Sniff water in with the right hand, blow it out with the left." },
  { t: "Face ×3", d: "Hairline to chin, ear to ear. Run wet fingers through a beard." },
  { t: "Arms ×3", d: "Right arm first, fingertips up to and including the elbow. Then the left." },
  { t: "Head ×1", d: "Wet hands, wipe from the front of the head to the back and return to the front. In the Maliki school the whole head is wiped." },
  { t: "Ears ×1", d: "Index fingers inside the ears, thumbs behind them, with fresh water." },
  { t: "Feet ×3", d: "Right foot first, up to and including the ankles, between the toes. Then the left." },
  { t: "Testimony after wudu", d: "Look up and say:", ar: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", tr: "Ashhadu an lā ilāha illallāhu waḥdahu lā sharīka lah, wa ashhadu anna Muḥammadan ʿabduhu wa rasūluh", en: "I testify there is no god but Allah alone, with no partner, and that Muhammad is His servant and messenger. (Muslim 234)" },
];

window.WUDU_BREAKERS = [
  "Using the toilet (urine, stool) or passing wind",
  "Deep sleep (lying down, losing awareness)",
  "Losing consciousness",
  "After intimacy or a wet dream you need ghusl (a full shower with intention), not just wudu",
];

// One rak'ah walkthrough + closing. `pos` drives the figure.
window.PRAYER_STEPS = [
  { pos: "stand", t: "Face the qibla, intention", d: "Stand facing the qibla (southeast from NL). Intend in your heart which prayer, e.g. “Dhuhr, 4 rak'ah”." },
  { pos: "takbir", t: "Opening takbir", ar: "اللَّهُ أَكْبَرُ", tr: "Allāhu akbar", en: "Allah is the Greatest", d: "Raise your hands to shoulder or ear height as you say it. In the Maliki school this is the only time you raise your hands." },
  { pos: "stand", t: "Al-Fatiha", ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ …", tr: "Al-ḥamdu lillāhi rabbil-ʿālamīn …", en: "Recite the whole Fatiha. Then say “Āmīn”, quietly.", d: "Maliki: in an obligatory prayer you start directly with “Al-ḥamdu lillāh”, without the basmala and without an opening du'a. Many Moroccans keep their arms at their sides (sadl). Folding the hands is also a valid opinion.", link: "quran:1" },
  { pos: "stand", t: "A short surah", d: "Only in the 1st and 2nd rak'ah: add a short surah, e.g. Al-Ikhlas.", link: "quran:112" },
  { pos: "ruku", game: "phrases", t: "Ruku (bowing)", ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", tr: "Subḥāna rabbiyal-ʿaẓīm  ×3", en: "Glory be to my Lord, the Magnificent", d: "Say “Allāhu akbar”, bow with a straight back, hands on your knees." },
  { pos: "stand", t: "Rise from ruku", ar: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ۝ رَبَّنَا وَلَكَ الْحَمْدُ", tr: "Samiʿallāhu liman ḥamidah, Rabbanā wa lakal-ḥamd", en: "Allah hears whoever praises Him. Our Lord, to You is all praise.", d: "Behind an imam, you only say “Rabbanā wa lakal-ḥamd”." },
  { pos: "sujud", t: "Sujud (prostration)", ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى", tr: "Subḥāna rabbiyal-aʿlā  ×3", en: "Glory be to my Lord, the Most High", d: "“Allāhu akbar”, then go down: forehead + nose, both palms, knees and toes on the ground. Elbows off the floor." },
  { pos: "sit", t: "Sit between the two sujud", ar: "رَبِّ اغْفِرْ لِي", tr: "Rabbighfir lī", en: "My Lord, forgive me", d: "“Allāhu akbar”, sit up briefly and calmly. Don't rush this. Rushing is a typical beginner mistake." },
  { pos: "sujud", t: "Second sujud", ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى", tr: "Subḥāna rabbiyal-aʿlā  ×3", d: "Same as the first sujud. That completes one rak'ah." },
  { pos: "stand", t: "Stand up for the next rak'ah", d: "“Allāhu akbar” and stand up. Repeat from Al-Fatiha. After the 2nd rak'ah you sit for the tashahhud." },
  { pos: "sit", game: "tash", t: "Tashahhud (Maliki version, from Umar)", ar: "التَّحِيَّاتُ لِلَّهِ، الزَّاكِيَاتُ لِلَّهِ، الطَّيِّبَاتُ الصَّلَوَاتُ لِلَّهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", tr: "At-taḥiyyātu lillāh, az-zākiyātu lillāh, aṭ-ṭayyibātu aṣ-ṣalawātu lillāh. As-salāmu ʿalayka ayyuhan-nabiyyu wa raḥmatullāhi wa barakātuh. As-salāmu ʿalaynā wa ʿalā ʿibādillāhiṣ-ṣāliḥīn. Ashhadu an lā ilāha illallāhu waḥdahu lā sharīka lah, wa ashhadu anna Muḥammadan ʿabduhu wa rasūluh.", en: "All greetings, pure deeds, good words and prayers are for Allah. Peace be upon you, O Prophet, and Allah's mercy and blessings. Peace be upon us and upon Allah's righteous servants. I testify there is no god but Allah alone, without partner, and that Muhammad is His servant and messenger.", d: "This is the version taught in Moroccan mosques. The other widely used version (from Ibn Mas'ud, “at-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt…”) is also valid. Maliki: keep the right hand in a fist with the index finger pointing, moving it gently." },
  { pos: "sit", game: "salawat", t: "Salawat Ibrahimiyya (final sitting only)", ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ", tr: "Allāhumma ṣalli ʿalā Muḥammadin wa ʿalā āli Muḥammad, kamā ṣallayta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka ḥamīdun majīd. Allāhumma bārik ʿalā Muḥammadin wa ʿalā āli Muḥammad, kamā bārakta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka ḥamīdun majīd.", en: "O Allah, send prayers upon Muhammad and the family of Muhammad, as You did upon Ibrahim and the family of Ibrahim; You are Praiseworthy, Glorious. O Allah, bless Muhammad and the family of Muhammad, as You blessed Ibrahim and the family of Ibrahim; You are Praiseworthy, Glorious.", d: "In a 3- or 4-rak'ah prayer, after the first tashahhud you stand up straight away (\"Allāhu akbar\"). The salawat comes only in the last sitting." },
  { pos: "salam", t: "Taslim (ending)", ar: "السَّلَامُ عَلَيْكُمْ", tr: "As-salāmu ʿalaykum", en: "Peace be upon you", d: "Maliki: praying alone or as imam, one salam turning slightly to the right. Behind the imam you also return the salam. Elsewhere you'll often see two salams (right + left, “…wa raḥmatullāh”). Both are fine." },
];

window.PRAYERS = [
  { n: "Fajr", rak: 2, loud: "Aloud", when: "Dawn → sunrise", note: "Maliki: a quiet qunut du'a in the 2nd rak'ah before ruku (sunnah, not required)." },
  { n: "Dhuhr", rak: 4, loud: "Silent", when: "Just after midday", note: "Rak'ah 3–4: only Al-Fatiha." },
  { n: "Asr", rak: 4, loud: "Silent", when: "Afternoon", note: "Rak'ah 3–4: only Al-Fatiha." },
  { n: "Maghrib", rak: 3, loud: "1–2 aloud", when: "Right after sunset", note: "Short window: pray quickly after the adhan." },
  { n: "Isha", rak: 4, loud: "1–2 aloud", when: "Night", note: "Followed by witr (1 odd rak'ah, strongly recommended)." },
];

window.AFTER_PRAYER = [
  { ar: "أَسْتَغْفِرُ اللَّهَ", tr: "Astaghfirullāh  ×3", en: "I seek Allah's forgiveness" },
  { ar: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ", tr: "Allāhumma antas-salām wa minkas-salām, tabārakta yā dhal-jalāli wal-ikrām", en: "O Allah, You are Peace and from You is peace. Blessed are You, Owner of majesty and honour. (Muslim 591)" },
  { ar: "سُبْحَانَ اللَّهِ · الْحَمْدُ لِلَّهِ · اللَّهُ أَكْبَرُ", tr: "SubḥānAllāh ×33 · Al-ḥamdu lillāh ×33 · Allāhu akbar ×33", en: "Count on the fingers of your right hand. Seasoned people do this almost without thinking." },
  { ar: "آيَةُ الكُرْسِيّ", tr: "Ayat al-Kursi", en: "Recite it after every obligatory prayer (an-Nasa'i, al-Kubra). Learn it in week 3.", link: "quran:2" },
];

window.TELLS = [
  ["Rushing", "Calm (tuma'nina) in every position. Let every bone settle. That reads as experience."],
  ["Loud, unsure mumbling", "Recite at a steady pace. In silent prayers, move your lips but without sound."],
  ["Looking around", "Keep your eyes on the spot where you prostrate."],
  ["Gaps in the row", "In jama'ah: shoulder to shoulder, foot to foot, fill the gap."],
  ["Jumping up after the salam", "Stay sitting for the dhikr afterwards. Leaving straight away is a typical beginner move."],
  ["Overdoing it", "Too much “SubhanAllah” in conversation sounds forced. Calm and consistent is what reads as experience."],
];

// Phrase reflex game: situation → correct answer
window.PHRASES = [
  { s: "You walk into his house", a: "As-salāmu ʿalaykum", x: "The greeting. The one entering greets first." },
  { s: "He says: “As-salāmu ʿalaykum”", a: "Wa ʿalaykum as-salām wa raḥmatullāh", x: "Always answer with equal or more. (Quran 4:86)" },
  { s: "You're about to eat", a: "Bismillāh", x: "Forgot? Say “Bismillāhi awwalahu wa ākhirah”." },
  { s: "You've finished eating", a: "Al-ḥamdu lillāh", x: "And to the host, in Moroccan style: “Allah ykhlef”." },
  { s: "Someone sneezes and says “Al-ḥamdu lillāh”", a: "Yarḥamuk Allāh", x: "They answer: “Yahdīkumullāh wa yuṣliḥ bālakum”. (Bukhari 6224)" },
  { s: "You say: “See you next week”", a: "In shā' Allāh", x: "Always with plans for the future. (Quran 18:23–24)" },
  { s: "You see his beautiful house / kids", a: "Mā shā' Allāh / Tbārkallāh", x: "“Tbarkallah” is very Moroccan and lands well." },
  { s: "Someone did you a favour", a: "Jazāk Allāhu khayran", x: "The reply is “wa iyyāk” or “wa antum fa-jazākumullāhu khayran”." },
  { s: "You hear someone has passed away", a: "Innā lillāhi wa innā ilayhi rājiʿūn", x: "“To Allah we belong and to Him we return.” Then “Allah yrḥmu”." },
  { s: "He asks: “How are you?”", a: "Al-ḥamdu lillāh", x: "In Darija: “Labas, l-ḥamdulillāh”." },
  { s: "You made a mistake / said something wrong", a: "Astaghfirullāh", x: "Seeking forgiveness. Short and sincere." },
  { s: "You don't know the answer to his question", a: "Allāhu aʿlam", x: "“Allah knows best.” Humble and honest, and it's respected." },
  { s: "You hear the adhan", a: "Repeat the words quietly", x: "At “ḥayya ʿalaṣ-ṣalāh/falāḥ” say “lā ḥawla wa lā quwwata illā billāh”. (Muslim 385)" },
  { s: "Someone says “Eid Mubarak”", a: "Taqabbal Allāhu minnā wa minkum", x: "“May Allah accept it from us and from you.”" },
  { s: "Something surprising or beautiful", a: "SubḥānAllāh", x: "Amazement at Allah's creation." },
  { s: "Something bad happens", a: "Lā ḥawla wa lā quwwata illā billāh", x: "“There is no power or strength except through Allah.”" },
  { s: "You go to sleep", a: "Bismika Allāhumma amūtu wa aḥyā", x: "“In Your name, O Allah, I die and I live.” (Bukhari 6324)" },
  { s: "Someone makes a du'a for you", a: "Āmīn", x: "Also: “wa iyyāk” (and for you too)." },
];

window.DARIJA = [
  { d: "Salam ʿalikum", m: "Greeting (= as-salāmu ʿalaykum)" },
  { d: "Labas? / Kidayr?", m: "How are you? (to a man)" },
  { d: "Labas, l-ḥamdulillah", m: "Good, praise be to Allah" },
  { d: "ʿAmmi", m: "“Uncle”: respectful address for an older man. Or “Lḥajj” if he has done Hajj." },
  { d: "Tbarkallah ʿlik", m: "Mashallah / well done (very common)" },
  { d: "Bssaḥa", m: "Enjoy your meal / to your health (also after a shower or haircut)" },
  { d: "Safi, shukran", m: "Enough, thank you (when you're full; they'll insist anyway)" },
  { d: "Allah ykhlef", m: "May God replace it for you: what you say to the host after eating" },
  { d: "Allah yrḥem lwalidin", m: "God have mercy on your parents: a warm, deep thank-you" },
  { d: "Smaḥli", m: "Excuse me / sorry" },
  { d: "Wakha", m: "Okay" },
  { d: "Mzyan / bezzaf", m: "Good / a lot (“mzyan bezzaf” = very good)" },
  { d: "Bslama", m: "Goodbye" },
  { d: "Allah yʿṭik ṣṣaḥa", m: "God give you health: thanks to someone who worked or cooked" },
];

window.MOROCCO = [
  { t: "Tea (atay) is hospitality", d: "Mint tea poured from up high. Always accept it, drink it, and compliment it. Refusing tea feels cold." },
  { t: "Eating from one dish", d: "Tajine or couscous from a shared plate: right hand, bread as your spoon, eat from the part in front of you. They'll keep pushing more food your way (“kul, kul!”). Eat well, then “safi, l-ḥamdulillah, Allah ykhlef”." },
  { t: "Couscous on Friday", d: "Many Moroccan families eat couscous after Jumu'ah. If you're there on a Friday, asking “did you go to Jumu'ah?” makes a natural conversation opener." },
  { t: "Gift", d: "Bring something like good dates, Moroccan or other good pastries, or quality tea. Never alcohol, of course. Flowers are fine for the mother, but sweets are safer." },
  { t: "Respect for the elder", d: "Stand up when he comes in, let him speak first and lead, don't sit until he invites you. Speak about his daughter with respect and seriousness." },
  { t: "Women of the house", d: "Modest, respectful, not too familiar. Shaking hands across genders differs per family, so let them initiate. A hand on your heart with a small nod is a safe, respected greeting." },
  { t: "Maliki = Morocco", d: "Morocco follows the Maliki madhab and recites in the Warsh ʿan Nāfiʿ reading, so his Quran may look and sound slightly different from the Hafs on most apps. Both are authentic readings. Knowing this impresses people." },
  { t: "Tangier: conversation topics", d: "Ibn Battuta, the great 14th-century traveller, was born in Tangier (1304). The city mixes Darija and Spanish. Ask about his neighbourhood, his childhood and summers “in the bled” (back in Morocco). Moroccans love talking about home." },
  { t: "Ramadan the Moroccan way", d: "Iftar with dates, milk, ḥarira (soup), chebakia (honey sesame cookies) and msemen. Laylat al-Qadr is celebrated especially on the 27th night. Asking him about Ramadan in Tangier = a winning topic." },
  { t: "Eid al-Adha = “l-ʿId l-kbir”", d: "The big feast with the sheep. A family event. Ask how they celebrate it." },
];

window.HADITH = [
  { t: "Actions are by intentions", ar: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ", en: "Actions are only by intentions, and every person will have what they intended.", src: "Bukhari 1, Muslim 1907", why: "The first hadith of every collection. Very fitting for you: why you do something matters." },
  { t: "Islam wipes out what came before", en: "Do you not know that Islam wipes out what came before it?", src: "Muslim 121", why: "Said to ʿAmr ibn al-ʿĀṣ when he converted. A convert starts with a clean slate." },
  { t: "The hadith of Jibril", en: "Jibril asked about Islam (the 5 pillars), Iman (the 6 articles of faith) and Ihsan: “to worship Allah as though you see Him, and if you don't see Him, He sees you.”", src: "Muslim 8", why: "The whole religion in one conversation. Know the three levels." },
  { t: "Built on five", en: "Islam is built on five: the shahada, establishing prayer, giving zakat, Hajj to the House, and fasting Ramadan.", src: "Bukhari 8, Muslim 16", why: "The 5 pillars, straight from the source." },
  { t: "Love for your brother", en: "None of you truly believes until he loves for his brother what he loves for himself.", src: "Bukhari 13, Muslim 45", why: "" },
  { t: "Speak good or be silent", en: "Whoever believes in Allah and the Last Day, let him speak good or remain silent; let him honour his neighbour; let him honour his guest.", src: "Bukhari 6018, Muslim 47", why: "Hospitality is faith. That explains Moroccan hospitality." },
  { t: "Leave what doesn't concern you", en: "Part of the excellence of a person's Islam is leaving what does not concern him.", src: "Tirmidhi 2317", why: "" },
  { t: "Do not get angry", en: "A man said: advise me. He said: “Do not get angry.” He repeated it several times; each time: “Do not get angry.”", src: "Bukhari 6116", why: "" },
  { t: "The strong one", en: "The strong one is not the one who overpowers others in wrestling, but the one who controls himself when angry.", src: "Bukhari 6114, Muslim 2609", why: "" },
  { t: "Religion is sincerity", en: "The religion is naṣīḥa (sincerity).", src: "Muslim 55", why: "" },
  { t: "Allah looks at the heart", en: "Allah does not look at your appearance or your wealth, but He looks at your hearts and your deeds.", src: "Muslim 2564", why: "" },
  { t: "Make it easy", en: "Make things easy and do not make them difficult; give glad tidings and do not drive people away.", src: "Bukhari 69", why: "Good to know as a new Muslim: grow step by step." },
  { t: "A smile is charity", en: "Your smile in the face of your brother is charity.", src: "Tirmidhi 1956", why: "" },
  { t: "The best of you and the Quran", en: "The best of you are those who learn the Quran and teach it.", src: "Bukhari 5027", why: "" },
];

window.SEERAH = [
  { y: "~570", t: "Born in Mecca", d: "In the “Year of the Elephant” (see Surah Al-Fil). His father died before his birth, his mother when he was 6. Raised by his grandfather ʿAbd al-Muṭṭalib, then his uncle Abu Ṭālib." },
  { y: "~595", t: "Marriage to Khadijah", d: "A respected businesswoman. He was 25 and known as “al-Amīn”, the trustworthy one." },
  { y: "610", t: "The first revelation", d: "At 40, in the cave of Ḥirāʾ: the angel Jibril brought “Iqraʾ” (Read!), Surah Al-ʿAlaq 96:1–5. Khadijah was the first to believe." },
  { y: "610–622", t: "13 years in Mecca", d: "First Muslims: Khadijah, Abu Bakr, ʿAli, Zayd ibn Ḥāritha. Persecution of the Muslims; Bilal was tortured. The year of sorrow: Khadijah and Abu Ṭālib die. The night journey (Isrāʾ & Miʿrāj), when the 5 daily prayers were given." },
  { y: "622", t: "The Hijra to Medina", d: "Migration to Yathrib (Medina) with Abu Bakr. Year 1 of the Islamic calendar." },
  { y: "624", t: "Battle of Badr", d: "313 Muslims against ~1000 Quraysh, a victory. Fasting in Ramadan had been made obligatory shortly before (2 AH)." },
  { y: "630", t: "Conquest of Mecca", d: "Almost without bloodshed. He forgave his old enemies. The idols were removed from the Kaaba." },
  { y: "632", t: "Farewell Hajj and death", d: "The farewell sermon at ʿArafat. Died in Medina at 63." },
  { y: "632–661", t: "The four Rightly Guided Caliphs", d: "Abu Bakr, ʿUmar, ʿUthmān (compiled the Quran into one muṣḥaf), ʿAli." },
];

window.RAMADAN = [
  { t: "When", d: "Ramadan 1448 expected around early February 2027 (the exact date follows the moon sighting). Your first Ramadan, roughly 2 months after you meet him." },
  { t: "What", d: "From dawn (fajr) to sunset (maghrib): no eating, drinking, smoking or intimacy. And just as important: guard your tongue and behaviour." },
  { t: "Suhoor & iftar", d: "Suhoor = the meal before dawn (sunnah, there is blessing in it). Iftar = break the fast at maghrib, preferably with dates and water, like the Prophet ﷺ." },
  { t: "Tarawih", d: "Extra night prayers in the mosque after Isha. In Moroccan mosques often with beautiful Warsh recitation." },
  { t: "Laylat al-Qadr", d: "“Better than a thousand months” (Surah Al-Qadr 97). In the odd nights of the last 10; Moroccans mark the 27th especially." },
  { t: "Who doesn't fast", d: "Sick people, travellers, pregnant or nursing women, women during menstruation: they make up the days later. The elderly and chronically ill: fidya (feed someone)." },
  { t: "Zakat al-Fitr & Eid", d: "Before the Eid prayer you give zakat al-fitr (a small amount per person, for the poor). Eid al-Fitr = 1 Shawwal: Eid prayer in the morning, family, sweets." },
  { t: "Made a mistake?", d: "Ate or drank by accident? Your fast is still valid, just carry on. (Bukhari 1933)" },
];

// Flashcards (spaced repetition — Leitner)
window.CARDS = [
  { q: "The 5 pillars of Islam", a: "Shahada · Salah · Zakat · Sawm (Ramadan) · Hajj" },
  { q: "The 6 articles of faith (iman)", a: "Allah · the angels · the books · the messengers · the Last Day · qadar (divine decree, good and bad)" },
  { q: "The 3 levels in the hadith of Jibril", a: "Islam · Iman · Ihsan" },
  { q: "Rak'ah: Fajr / Dhuhr / Asr / Maghrib / Isha", a: "2 / 4 / 4 / 3 / 4" },
  { q: "Which prayers have recitation aloud?", a: "Fajr, and the first 2 rak'ah of Maghrib and Isha" },
  { q: "Which madhab does Morocco follow?", a: "Maliki (after Imam Malik ibn Anas of Medina)" },
  { q: "Which Quran reading is common in Morocco?", a: "Warsh ʿan Nāfiʿ" },
  { q: "The 4 Sunni madhabs", a: "Hanafi · Maliki · Shafi'i · Hanbali" },
  { q: "The 4 Rightly Guided Caliphs", a: "Abu Bakr · ʿUmar · ʿUthmān · ʿAli" },
  { q: "First revelation: where, what, when?", a: "Cave of Hira, “Iqra'” (96:1–5), 610, age 40" },
  { q: "The Hijra: year and meaning", a: "622: migration from Mecca to Medina, start of the Islamic calendar" },
  { q: "The first person to believe in the Prophet ﷺ", a: "Khadijah, his wife" },
  { q: "The angel of revelation", a: "Jibril (Gabriel)" },
  { q: "The 4 revealed books named in the Quran", a: "Tawrat (Musa) · Zabur (Dawud) · Injil (ʿIsa) · Quran (Muhammad ﷺ)" },
  { q: "How many surahs does the Quran have?", a: "114 surahs, 30 juz'" },
  { q: "Which surah is ‘a third of the Quran’?", a: "Al-Ikhlas (Bukhari 5013)" },
  { q: "Prophet with the longest story (one surah)", a: "Yusuf: Surah 12, “the most beautiful of stories”" },
  { q: "Ibrahim is called…", a: "Khalīl Allāh, the friend of Allah. Father of Ismaʿil and Ishaq." },
  { q: "Which prophet is mentioned most in the Quran?", a: "Musa (Moses)" },
  { q: "ʿIsa (Jesus) in Islam", a: "A great prophet, born of the virgin Maryam (who has her own surah, 19), not the son of God. He will return." },
  { q: "The two Eids", a: "Eid al-Fitr (end of Ramadan) · Eid al-Adha (Hajj, sacrifice)" },
  { q: "Zakat: how much?", a: "2.5% of savings held for a year above the threshold (nisab)" },
  { q: "Jumu'ah", a: "Friday prayer: replaces Dhuhr, 2 rak'ah after the khutbah. Obligatory for men." },
  { q: "Witr", a: "Odd-numbered night prayer after Isha, strongly recommended (sunnah mu'akkadah)" },
  { q: "What breaks wudu?", a: "Toilet, wind, deep sleep, losing consciousness" },
  { q: "Ghusl", a: "Full ritual bath: after intimacy, a wet dream (and for women after menstruation)" },
  { q: "Halal vs haram food", a: "Haram: pork, alcohol, blood, carrion, meat not slaughtered in Allah's name. Halal meat from a halal butcher." },
  { q: "Tangier: famous son", a: "Ibn Battuta (born 1304), the great traveller" },
];

window.FATHER = {
  scenes: [
    { q: "“Salam ʿalikum, come in, son.”", o: [
      ["“Wa ʿalaykum as-salām wa raḥmatullāh, ʿammi.” Hand on heart / shake his hand, wait until he invites you to sit.", 2, "Perfect: returned more, respectful address, he leads."],
      ["“Hi! Nice to finally meet you.”", 0, "Friendly, but he expects the salam. That's the first thing he hears."],
      ["“Salam!” and you sit down straight away.", 0, "Sitting before he invites you is impolite with Moroccan elders."] ] },
    { q: "“How long have you been Muslim, son?”", o: [
      ["Honest: the real date of your shahada, plus how long you'd been drawn to Islam before that, and that you're learning every day.", 2, "You promised not to lie. Honesty about being a recent convert, combined with clear seriousness, earns more respect than years you'd have to fake. Talk to your girlfriend before the visit so nobody gets caught off guard."],
      ["Dodge it: “Long enough, al-ḥamdulillah.”", 0, "Fathers notice evasion. And he'll ask follow-up questions."],
      ["“A few years.”", 0, "That's a lie, and he'll check it with questions about Ramadan, your mosque, your shahada. One slip and the trust is gone, for you and for her."] ] },
    { q: "It's time for Asr during the visit. He doesn't say anything.", o: [
      ["“ʿAmmi, it's time for Asr. Shall we pray?”", 2, "The strongest signal you can give. You don't wait for him; you bring it up yourself."],
      ["Wait until he brings it up.", 1, "Not wrong, but a missed opportunity."],
      ["Skip it, you'll make it up at home.", 0, "Asr just passing by while you're there is the sort of thing he'll notice."] ] },
    { q: "“Will you lead the prayer?”", o: [
      ["“No, ʿammi, you lead, please.” With a smile.", 2, "Letting the elder and more knowledgeable person lead is etiquette. He's almost certainly testing your adab, not your recitation."],
      ["Yes, of course, and you lead.", 0, "Risky, and less respectful. The host usually has more right to lead in his own house."],
      ["“I don't know how.”", 0, "You do know how. Humble, but not helpless."] ] },
    { q: "“Which surah are you learning right now?”", o: [
      ["Name the one you're actually learning, e.g. “Ayat al-Kursi, I'm almost there”, and ask what he recommends.", 2, "Honest and concrete, and asking for advice makes him the teacher. Fathers love that."],
      ["“I already know almost all of Juz' ʿAmma.”", 0, "Exaggerating. He might ask you to recite something."],
      ["“Not really learning one right now.”", 0, "Missed opportunity. Always be working on one."] ] },
    { q: "He pours tea for the third time and passes you the plate again.", o: [
      ["Accept, eat a bit more, and at some point: “Safi, l-ḥamdulillah, Allah ykhlef, ʿammi.”", 2, "Hospitality accepted, and politely ended the Moroccan way."],
      ["“No thanks, I'm on a diet.”", 0, "Refusing hospitality feels cold."],
      ["Keep eating until he stops.", 1, "He won't stop. You need to use the “safi” moment."] ] },
    { q: "“And what are your intentions with my daughter?”", o: [
      ["Calm and serious: you want to marry her, you want to do it the right way (nikah), and you'd like his blessing. Talk about how you'll provide for her and build a family.", 2, "This is THE question. Be clear about marriage, responsibility and his role. Discuss beforehand with your girlfriend what you can honestly say about timing."],
      ["“We'll see how it goes.”", 0, "For a practising Moroccan father, that's the worst answer there is."],
      ["“We're just getting to know each other.”", 0, "Without a direction towards nikah, this raises alarm bells."] ] },
    { q: "“Where do you pray Jumu'ah?”", o: [
      ["The real name of your mosque + something concrete (the imam, the khutbah from last week).", 2, "Concrete and true. Make sure you actually go every Friday, so you always have an answer."],
      ["“Different places.”", 0, "Vague. He'll ask follow-up questions."],
      ["“Mostly at home.”", 0, "Jumu'ah is in congregation. That's a red flag for him."] ] },
    { q: "He asks a question about Islam that you don't know the answer to.", o: [
      ["“Allāhu aʿlam, I don't know that yet. How do you see it, ʿammi?”", 2, "Honest, humble, and you give him the floor. That's how experienced Muslims do it too."],
      ["Make up a confident-sounding answer.", 0, "Making things up about religion is serious, and he'll notice."],
      ["Change the subject.", 1, "Fine once, but it doesn't build anything."] ] },
    { q: "“What are you looking forward to about Ramadan?”", o: [
      ["Your real plans (fasting, tarawih, finishing a juz') + ask how they spent Ramadan in Tangier.", 2, "Genuine enthusiasm + an invitation for him to share his memories."],
      ["“The food, haha.”", 1, "A little humour is fine, but follow it with something serious."],
      ["“Not much, honestly.”", 0, ""] ] },
  ],
  prompts: [
    { q: "Why did you become Muslim?", tip: "Your own words, 3–4 sentences: what you were searching for, what touched you (an ayah, a person, the prayer), and what changed in you. Not “because of her”. Just the truth." },
    { q: "How did you come to Islam?", tip: "The path: when were you first curious, what did you read or watch, who answered your questions?" },
    { q: "Who did your shahada with you, and where?", tip: "Name, mosque, date. Short and concrete." },
    { q: "What do you find hardest so far?", tip: "Being honest about this (e.g. Fajr, Arabic) makes you human and gives him room to give advice." },
    { q: "What do you love most about Islam?", tip: "Something specific: the peace in the prayer, Al-Fatiha, the brotherhood in the mosque…" },
    { q: "What are your intentions with my daughter?", tip: "Marriage (nikah), responsibility, his blessing. Agree with her what's honestly true about timing." },
    { q: "How are you going to take care of her?", tip: "Work, stability, your plans. Calm and concrete, no bragging." },
    { q: "What does your family think about it?", tip: "Be honest, and show respect for your own parents. Islam commands honouring your parents, even if they aren't Muslim (Quran 31:14–15)." },
  ],
};

// 30-day path. Day 1 = 2026-11-02. Each task: [label, target]
window.PLAN_START = "2026-11-02";
window.PLAN = (() => {
  const W = [
    { name: "Foundations", days: [
      [["Do wudu step by step", "salah:wudu"], ["Pray all 5 (with the text in front of you)", "prayers"], ["Al-Fatiha: verses 1–3", "quran:1"]],
      [["Wudu from memory", "salah:wudu"], ["Pray all 5", "prayers"], ["Al-Fatiha: verses 4–5", "quran:1"], ["Phrase game, 1 round", "learn:phrases"]],
      [["Pray all 5", "prayers"], ["Al-Fatiha: verses 6–7", "quran:1"], ["Flashcards: pillars & iman", "learn:cards"]],
      [["Pray all 5", "prayers"], ["Al-Fatiha in full, from memory", "quran:1"], ["Read: the hadith of Jibril", "learn:hadith"]],
      [["JUMU'AH at the mosque", "prayers"], ["Prayer phrases game + order the prayer", "game:phrases"], ["Morocco: tea & eating", "learn:morocco"]],
      [["Pray all 5", "prayers"], ["Al-Ikhlas", "quran:112"], ["Phrase game", "learn:phrases"]],
      [["Pray all 5", "prayers"], ["Review: Fatiha + Ikhlas", "quran:1"], ["Father sim: write your “why Islam”", "father:prompts"]],
    ]},
    { name: "Prayer in Arabic", days: [
      [["Pray all 5, phrases in Arabic", "prayers"], ["Tashahhud: first half (game: fill the gaps)", "game:tash"], ["Al-Falaq", "quran:113"]],
      [["Pray all 5", "prayers"], ["Tashahhud: second half (game: put in order)", "game:tash"], ["Darija: 5 phrases", "learn:darija"]],
      [["Pray all 5", "prayers"], ["Tashahhud in full: all 3 games cleared", "game:tash"], ["An-Nas", "quran:114"]],
      [["Pray all 5, without the text", "prayers"], ["Salawat Ibrahimiyya: first half", "game:salawat"], ["Seerah: Mecca", "learn:seerah"]],
      [["JUMU'AH + one extra prayer in jama'ah", "prayers"], ["Salawat Ibrahimiyya: all 3 games cleared", "game:salawat"], ["Flashcards", "learn:cards"]],
      [["Pray all 5", "prayers"], ["Al-Kawthar + Al-Asr", "quran:108"], ["Dhikr after prayer", "salah:after"]],
      [["Pray all 5", "prayers"], ["Have her watch you pray, get feedback", "salah:tells"], ["Father sim: 5 scenes", "father:scenes"]],
    ]},
    { name: "Depth", days: [
      [["Pray all 5 + witr", "prayers"], ["Ayat al-Kursi: parts 1–3 (game)", "game:kursi"], ["Read 4 hadith", "learn:hadith"]],
      [["Pray all 5 + witr", "prayers"], ["Ayat al-Kursi: parts 4–6 (game)", "game:kursi"], ["Darija: 5 more", "learn:darija"]],
      [["Pray all 5", "prayers"], ["Ayat al-Kursi: parts 7–9 (game)", "game:kursi"], ["Seerah: Medina", "learn:seerah"]],
      [["Pray all 5", "prayers"], ["Ayat al-Kursi: in full", "quran:2"], ["Flashcards: prophets", "learn:cards"]],
      [["JUMU'AH", "prayers"], ["Al-Fil + Quraysh", "quran:105"], ["Morocco: everything", "learn:morocco"]],
      [["Pray all 5 + Ayat al-Kursi after each prayer", "prayers"], ["Read 4 more hadith", "learn:hadith"], ["Phrase game", "learn:phrases"]],
      [["Pray all 5", "prayers"], ["Father sim: all prompts written out", "father:prompts"], ["Al-Nasr", "quran:110"]],
    ]},
    { name: "Ramadan + rehearsal", days: [
      [["Pray all 5", "prayers"], ["Ramadan: everything", "learn:ramadan"], ["Al-Kafirun", "quran:109"]],
      [["Pray all 5", "prayers"], ["Review every surah, aloud", "quran:1"], ["Flashcards: all", "learn:cards"]],
      [["Pray all 5", "prayers"], ["Father sim: all scenes", "father:scenes"], ["Darija: all of it", "learn:darija"]],
      [["Pray all 5", "prayers"], ["Recite all your surahs aloud to her", "quran:1"], ["Tells: check every point", "salah:tells"]],
      [["JUMU'AH", "prayers"], ["Read your prompts aloud, as if he's sitting in front of you", "father:prompts"], ["Phrase game: 100%", "learn:phrases"]],
      [["Pray all 5", "prayers"], ["Seerah + hadith review", "learn:seerah"], ["Discuss with her: what's true, what you'll say", "father:prompts"]],
      [["Pray all 5", "prayers"], ["Final rehearsal: all scenes, full marks", "father:scenes"], ["Calm. Al-ḥamdulillah. You've got this.", "prayers"]],
    ]},
  ];
  const out = [];
  W.forEach((w, wi) => w.days.forEach((tasks) => out.push({ week: wi + 1, weekName: w.name, tasks })));
  out.push({ week: 4, weekName: "Ramadan + rehearsal", tasks: [["Pray all 5", "prayers"], ["Review: Fatiha, Kursi, tashahhud games", "games"], ["Sleep well. Go with salam.", "prayers"]] });
  out.push({ week: 4, weekName: "Ramadan + rehearsal", tasks: [["Pray all 5", "prayers"], ["Calm review, nothing new", "learn:cards"]] });
  return out;
})();
