// Games + Dutch narration. Chunks: { tr, ar, nl }. Quran texts are built from quran.js (Siregar NL translation).

// Dutch meanings for the prayer steps (narration), in PRAYER_STEPS order.
window.STEP_NL = {
  1: "Allah is de Grootste.",
  2: "Reciteer de hele Al-Fatiha, de Opening. Daarna zachtjes: amien.",
  3: "In de eerste twee rak'ah voeg je een korte soera toe, bijvoorbeeld Al-Ikhlaas.",
  4: "Glorie aan mijn Heer, de Geweldige. Drie keer.",
  5: "Allah hoort wie Hem prijst. Onze Heer, aan U komt alle lof toe.",
  6: "Glorie aan mijn Heer, de Allerhoogste. Drie keer.",
  7: "Mijn Heer, vergeef mij.",
  8: "Glorie aan mijn Heer, de Allerhoogste. Drie keer.",
  10: "Alle begroetingen zijn voor Allah, alle zuivere daden zijn voor Allah, de goede woorden en de gebeden zijn voor Allah. Vrede zij met u, o Profeet, en de barmhartigheid van Allah en Zijn zegeningen. Vrede zij met ons en met de rechtschapen dienaren van Allah. Ik getuig dat er geen god is dan Allah, de Enige, zonder deelgenoot, en ik getuig dat Mohammed Zijn dienaar en boodschapper is.",
  11: "O Allah, zend Uw zegeningen over Mohammed en de familie van Mohammed, zoals U ze zond over Ibrahim en de familie van Ibrahim. U bent de Geprezene, de Glorierijke. O Allah, schenk Uw zegen aan Mohammed en de familie van Mohammed, zoals U die schonk aan Ibrahim en de familie van Ibrahim. U bent de Geprezene, de Glorierijke.",
  12: "Vrede zij met jullie, en de barmhartigheid van Allah.",
};
window.WUDU_NL = "Ik getuig dat er geen god is dan Allah, de Enige, zonder deelgenoot, en ik getuig dat Mohammed Zijn dienaar en boodschapper is.";
window.AFTER_NL = [
  "Ik vraag Allah om vergeving. Drie keer.",
  "O Allah, U bent de Vrede en van U komt de vrede. Gezegend bent U, o Bezitter van majesteit en eer.",
  "Glorie aan Allah, drieëndertig keer. Alle lof aan Allah, drieëndertig keer. Allah is de Grootste, drieëndertig keer.",
  "Ayat al-Koersi, het Troonvers.",
];

const PRAYER_TEXTS = [
  { id: "phrases", name: "Phrases in the prayer", sub: "Takbir, ruku, sujud, salam", chunks: [
    { tr: "Allāhu akbar", ar: "اللَّهُ أَكْبَرُ", nl: "Allah is de Grootste" },
    { tr: "Subḥāna rabbiyal-ʿaẓīm", ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", nl: "Glorie aan mijn Heer, de Geweldige (ruku)" },
    { tr: "Samiʿallāhu liman ḥamidah", ar: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ", nl: "Allah hoort wie Hem prijst (opkomen)" },
    { tr: "Rabbanā wa lakal-ḥamd", ar: "رَبَّنَا وَلَكَ الْحَمْدُ", nl: "Onze Heer, aan U komt alle lof toe" },
    { tr: "Subḥāna rabbiyal-aʿlā", ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى", nl: "Glorie aan mijn Heer, de Allerhoogste (sujud)" },
    { tr: "Rabbighfir lī", ar: "رَبِّ اغْفِرْ لِي", nl: "Mijn Heer, vergeef mij (zitten)" },
    { tr: "As-salāmu ʿalaykum wa raḥmatullāh", ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ", nl: "Vrede zij met jullie en de barmhartigheid van Allah" },
  ]},
  { id: "tash", name: "Tashahhud", sub: "Maliki version · the sitting", chunks: [
    { tr: "At-taḥiyyātu lillāh", ar: "التَّحِيَّاتُ لِلَّهِ", nl: "Alle begroetingen zijn voor Allah" },
    { tr: "az-zākiyātu lillāh", ar: "الزَّاكِيَاتُ لِلَّهِ", nl: "alle zuivere daden zijn voor Allah" },
    { tr: "aṭ-ṭayyibātu aṣ-ṣalawātu lillāh", ar: "الطَّيِّبَاتُ الصَّلَوَاتُ لِلَّهِ", nl: "de goede woorden en de gebeden zijn voor Allah" },
    { tr: "as-salāmu ʿalayka ayyuhan-nabiyyu", ar: "السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ", nl: "vrede zij met u, o Profeet" },
    { tr: "wa raḥmatullāhi wa barakātuh", ar: "وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ", nl: "en de barmhartigheid van Allah en Zijn zegeningen" },
    { tr: "as-salāmu ʿalaynā", ar: "السَّلَامُ عَلَيْنَا", nl: "vrede zij met ons" },
    { tr: "wa ʿalā ʿibādillāhiṣ-ṣāliḥīn", ar: "وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ", nl: "en met de rechtschapen dienaren van Allah" },
    { tr: "ashhadu an lā ilāha illallāh", ar: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ", nl: "ik getuig dat er geen god is dan Allah" },
    { tr: "waḥdahu lā sharīka lah", ar: "وَحْدَهُ لَا شَرِيكَ لَهُ", nl: "de Enige, zonder deelgenoot" },
    { tr: "wa ashhadu anna Muḥammadan ʿabduhu wa rasūluh", ar: "وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", nl: "en ik getuig dat Mohammed Zijn dienaar en boodschapper is" },
  ]},
  { id: "salawat", name: "Salawat Ibrahimiyya", sub: "Last sitting, after the tashahhud", chunks: [
    { tr: "Allāhumma ṣalli ʿalā Muḥammad", ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ", nl: "O Allah, zend Uw zegeningen over Mohammed" },
    { tr: "wa ʿalā āli Muḥammad", ar: "وَعَلَى آلِ مُحَمَّدٍ", nl: "en over de familie van Mohammed" },
    { tr: "kamā ṣallayta ʿalā Ibrāhīm", ar: "كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ", nl: "zoals U ze zond over Ibrahim" },
    { tr: "wa ʿalā āli Ibrāhīm", ar: "وَعَلَى آلِ إِبْرَاهِيمَ", nl: "en over de familie van Ibrahim" },
    { tr: "innaka ḥamīdun majīd", ar: "إِنَّكَ حَمِيدٌ مَجِيدٌ", nl: "U bent de Geprezene, de Glorierijke" },
    { tr: "Allāhumma bārik ʿalā Muḥammad", ar: "اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ", nl: "O Allah, schenk Uw zegen aan Mohammed" },
    { tr: "wa ʿalā āli Muḥammad", ar: "وَعَلَى آلِ مُحَمَّدٍ", nl: "en aan de familie van Mohammed" },
    { tr: "kamā bārakta ʿalā Ibrāhīm", ar: "كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ", nl: "zoals U die schonk aan Ibrahim" },
    { tr: "wa ʿalā āli Ibrāhīm", ar: "وَعَلَى آلِ إِبْرَاهِيمَ", nl: "en aan de familie van Ibrahim" },
    { tr: "innaka ḥamīdun majīd", ar: "إِنَّكَ حَمِيدٌ مَجِيدٌ", nl: "U bent de Geprezene, de Glorierijke" },
  ]},
  { id: "after", name: "After the prayer", sub: "Istighfar + Allāhumma antas-salām", chunks: [
    { tr: "Astaghfirullāh (×3)", ar: "أَسْتَغْفِرُ اللَّهَ", nl: "Ik vraag Allah om vergeving" },
    { tr: "Allāhumma antas-salām", ar: "اللَّهُمَّ أَنْتَ السَّلَامُ", nl: "O Allah, U bent de Vrede" },
    { tr: "wa minkas-salām", ar: "وَمِنْكَ السَّلَامُ", nl: "en van U komt de vrede" },
    { tr: "tabārakta yā dhal-jalāli wal-ikrām", ar: "تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ", nl: "gezegend bent U, o Bezitter van majesteit en eer" },
  ]},
  { id: "wudu", name: "Testimony after wudu", sub: "Ashhadu an lā ilāha illallāh…", chunks: [
    { tr: "Ashhadu an lā ilāha illallāh", ar: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ", nl: "Ik getuig dat er geen god is dan Allah" },
    { tr: "waḥdahu lā sharīka lah", ar: "وَحْدَهُ لَا شَرِيكَ لَهُ", nl: "de Enige, zonder deelgenoot" },
    { tr: "wa ashhadu anna Muḥammadan ʿabduhu wa rasūluh", ar: "وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", nl: "en ik getuig dat Mohammed Zijn dienaar en boodschapper is" },
  ]},
  { id: "kursi", name: "Ayat al-Kursi", sub: "In 9 parts · after every prayer", quranKey: "2:255", chunks: [
    { tr: "Allāhu lā ilāha illā huwal-ḥayyul-qayyūm", ar: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", nl: "Allah, er is geen god dan Hij, de Levende, de Zelfbestaande" },
    { tr: "lā taʾkhudhuhu sinatun wa lā nawm", ar: "لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ", nl: "sluimer noch slaap overvalt Hem" },
    { tr: "lahu mā fis-samāwāti wa mā fil-arḍ", ar: "لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ", nl: "aan Hem behoort wat in de hemelen en op de aarde is" },
    { tr: "man dhal-ladhī yashfaʿu ʿindahu illā bi-idhnih", ar: "مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ", nl: "wie kan bij Hem voorspraak doen, behalve met Zijn toestemming?" },
    { tr: "yaʿlamu mā bayna aydīhim wa mā khalfahum", ar: "يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ", nl: "Hij weet wat vóór hen en wat achter hen is" },
    { tr: "wa lā yuḥīṭūna bi-shayʾin min ʿilmihi illā bimā shāʾ", ar: "وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ", nl: "en zij omvatten niets van Zijn kennis, behalve wat Hij wil" },
    { tr: "wasiʿa kursiyyuhus-samāwāti wal-arḍ", ar: "وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ", nl: "Zijn Troon omvat de hemelen en de aarde" },
    { tr: "wa lā yaʾūduhu ḥifẓuhumā", ar: "وَلَا يَئُودُهُ حِفْظُهُمَا", nl: "en het bewaren ervan vermoeit Hem niet" },
    { tr: "wa huwal-ʿaliyyul-ʿaẓīm", ar: "وَهُوَ الْعَلِيُّ الْعَظِيمُ", nl: "en Hij is de Verhevene, de Geweldige" },
  ]},
];

// Surahs → one chunk per verse (audio = real recitation)
window.TEXTS = [
  ...PRAYER_TEXTS,
  ...QURAN.filter((s) => s.n !== 2).map((s) => ({ id: "q" + s.n, name: s.name, sub: s.meaning, quran: true, path: s.path,
    chunks: s.ayahs.map((a) => ({ tr: a.tr, ar: a.ar, nl: a.nl, en: a.en, k: a.k })) })),
];

// Order the prayer: one rak'ah + ending
window.PRAYER_ORDER = [
  { t: "Niyyah", d: "Intention in your heart" },
  { t: "Allāhu akbar", d: "Opening takbir, hands up" },
  { t: "Al-Fatiha", d: "Standing" },
  { t: "Short surah", d: "E.g. Al-Ikhlas" },
  { t: "Ruku", d: "Subḥāna rabbiyal-ʿaẓīm" },
  { t: "Rise", d: "Samiʿallāhu liman ḥamidah" },
  { t: "Sujud", d: "Subḥāna rabbiyal-aʿlā" },
  { t: "Sit briefly", d: "Rabbighfir lī" },
  { t: "Second sujud", d: "Subḥāna rabbiyal-aʿlā" },
  { t: "Tashahhud", d: "At-taḥiyyātu lillāh…" },
  { t: "Salawat Ibrahimiyya", d: "Allāhumma ṣalli ʿalā Muḥammad…" },
  { t: "Salam", d: "As-salāmu ʿalaykum" },
];
