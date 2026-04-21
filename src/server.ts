import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));

interface FruitInfo {
  nume: string;
  origine: string;
  descriere: string;
  beneficii: string[];
  cumSaMananci: string;
  sezon: string;
  imagine: string;
}

const fructeExotice: Record<string, FruitInfo> = {
  'dragon fruit': {
    nume: 'Dragon Fruit (Dragon Fruit)',
    origine: 'America Centrală și de Sud',
    descriere: 'Un fruct spectaculos cu coajă roz-violet sau galbena și pulpă albă sau roșie cu semințe negre. Are un gust dulce și blând, similar cu kiwi și pere.',
    beneficii: ['Bogat în antioxidanți', 'Crește imunitatea', 'Bun pentru digestie', 'Scade nivelul zahărului din sânge'],
    cumSaMananci: 'Taie-l pe jumătate și scoate pulpa cu o lingură. Poate fi consumat crud, în smoothie-uri sau salate de fructe.',
    sezon: 'Iunie - Septembrie',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Yellow_pitaya.jpg'
  },
  'durian': {
    nume: 'Durian',
    origine: 'Asia de Sud-Est (Malaezia, Indonezia, Thailanda)',
    descriere: 'Cunoscut ca "regele fructelor", are un miros puternic și distinctiv, dar o cremă internă delicioasă. Coaja este acoperită cu țepi.',
    beneficii: ['Foarte nutritiv', 'Bogat în fibre', 'Conține potasiu și fier', 'Energizant natural'],
    cumSaMananci: 'Deschide coaja tăind-o și extrage pulpa cremoasă. Se mănâncă proaspăt sau în deserturi.',
    sezon: 'Iunie - August',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Durian_in_black.jpg'
  },
  'rambutan': {
    nume: 'Rambutan',
    origine: 'Malaezia, Indonezia',
    descriere: 'Un fruct mic, roșu, acoperit cu peri moi și flexibili. Pulpa este albă, translucidă și dulce, similar cu lychee.',
    beneficii: ['Bogat în vitamina C', 'Antioxidanți puternici', 'Hidratant', 'Bun pentru piele'],
    cumSaMananci: 'Deschide coaja cu unghia sau cuțitul și scoate pulpa. Elimină sâmburele din interior înainte de a mânca.',
    sezon: 'Iunie - Septembrie',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Rambutan_Fruit.jpg'
  },
  'mangosteen': {
    nume: 'Mangosteen',
    origine: 'Indonezia, Thailanda, Malaezia',
    descriere: 'Supranumit "regina fructelor", are o coajă mov închis și pulpa albă, suculentă, cu segmente asemănătoare citricelor.',
    beneficii: ['Antiinflamator puternic', 'Bogat în xantone', 'Susține sistemul imunitar', 'Bun pentru sănătatea inimii'],
    cumSaMananci: 'Taie coaja în jurul mijlocului și deschide-o. Mănâncă segmentele albe, dar evită sâmburele.',
    sezon: 'Aprilie - Septembrie',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Mangosteens_-_whole_and_opened.jpg'
  },
  'lychee': {
    nume: 'Lychee (Litchi)',
    origine: 'China',
    descriere: 'Fruct mic rotund cu coajă roșie și aspră și pulpă albă, translucidă, dulce și parfumată în jurul unui sâmbure mare.',
    beneficii: ['Vitamina C abundentă', 'Antioxidanți', 'Hidratant', 'Bun pentru circulație'],
    cumSaMananci: 'Cojește coaja roșie și mănâncă pulpa albă, îndepărtând sâmburele de culoare maro.',
    sezon: 'Mai - Iulie',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Lychee_600.jpg'
  },
  'passion fruit': {
    nume: 'Fructul Pasiunii (Maracuja)',
    origine: 'America de Sud (Brazilia, Paraguay)',
    descriere: 'Fruct rotund cu coajă mov sau galbenă și pulpa galben-portocalie cu multe semințe comestibile. Gustul este dulce-acrișor și foarte aromat.',
    beneficii: ['Bogat în vitamina A și C', 'Calmante naturale', 'Ajută digestia', 'Antioxidanți puternici'],
    cumSaMananci: 'Taie-l în două și mănâncă pulpa cu semințele direct cu lingura. Excelent și pentru sucuri.',
    sezon: 'Vară - Toamnă',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Passion_fruits_-_whole_and_halved.jpg'
  },
  'jackfruit': {
    nume: 'Jackfruit',
    origine: 'India, Bangladesh, Sri Lanka',
    descriere: 'Cel mai mare fruct care crește pe un copac, poate ajunge la 50 kg. Pulpa galbenă are gust dulce, asemănător cu mango și banană.',
    beneficii: ['Proteină vegetală', 'Fibre abundente', 'Vitamina B6', 'Potasiu'],
    cumSaMananci: 'Taie bucăți din pulpă, îndepărtând sâmburele mare. Poate fi consumat copt (dulce) sau verde (sărat).',
    sezon: 'Martie - Iunie',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Artocarpus_heterophyllus_fruits_at_tree.jpg'
  },
  'star fruit': {
    nume: 'Carambola (Star Fruit)',
    origine: 'Asia de Sud-Est, Sri Lanka',
    descriere: 'Fruct galben-verzui cu 5 muchii distincte care, tăiat în felii, formează stele perfecte. Gustul este dulce-acrișor și crocant.',
    beneficii: ['Vitamina C', 'Fibre', 'Bogat în antioxidanți', 'Calorii scăzute'],
    cumSaMananci: 'Spală-l și taie-l în felii transversale. Poate fi consumat cu tot cu coajă.',
    sezon: 'Iunie - Februarie',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Carambola_Starfruit.jpg'
  },
  'physalis': {
    nume: 'Physalis (Golden Berry)',
    origine: 'Peru, Chile',
    descriere: 'Fructe mici, rotunde, de culoare galben-portocalie, învelite într-o husă de hârtie. Gustul este dulce-acrișor, asemănător cu ananasul și citricele.',
    beneficii: ['Vitamina C și P', 'Antioxidanți', 'Beta-caroten', 'Fibre'],
    cumSaMananci: 'Scoate din husa de hârtie și mănâncă proaspete sau în deserturi și salate.',
    sezon: 'Iulie - Octombrie',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Uchuva_2005.jpg'
  },
  'longan': {
    nume: 'Longan',
    origine: 'Asia de Sud-Est (China, Vietnam, Thailanda)',
    descriere: 'Fruct mic cu coajă maro și translucidă și pulpă albă, translucidă, dulce și suculentă în jurul unui sâmbure negru.',
    beneficii: ['Calmant natural', 'Vitamina C', 'Bun pentru somn', 'Antiinflamator'],
    cumSaMananci: 'Coaje coaja și mănâncă pulpa albă. Sâmburele se îndepărtează.',
    sezon: 'Iulie - Septembrie',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Dimocarpus_longan_fruits.jpg'
  },
  'guava': {
    nume: 'Guava',
    origine: 'America Centrală și Mexic',
    descriere: 'Fruct rotund sau oval cu coajă verde sau galbenă și pulpă roz, albă sau roșie cu multe semințe mici. Foarte parfumat și dulce.',
    beneficii: ['Vitamina C de 4 ori mai mult decât portocala', 'Fibre', 'Licopen', 'Digestie sănătoasă'],
    cumSaMananci: 'Se poate mânca întreg, cu coajă și semințe sau în smoothie-uri și jeleuri.',
    sezon: 'Tot anul în zone tropicale',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Guava_pink_fruit.jpg'
  },
  'sapodilla': {
    nume: 'Sapodilla',
    origine: 'Mexic, America Centrală',
    descriere: 'Fruct maro, rotund cu pulpă moale, maro și dulce care amintește de miere, pere și zahăr brun.',
    beneficii: ['Energizant', 'Fibre', 'Antioxidanți', 'Bun pentru digestie'],
    cumSaMananci: 'Coajă și mănâncă pulpa moale. Semințele negre se îndepărtează.',
    sezon: 'Ianuarie - Iunie',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/0/00/%E0%B4%B8%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F.jpg'
  },
  'custard apple': {
    nume: 'Guanabana / Custard Apple',
    origine: 'America Centrală, Caraibe',
    descriere: 'Fruct cu coajă verde și proeminențe în formă de inimă. Pulpa cremoasă, albă are gust dulce care amintește de vanilie și ananas.',
    beneficii: ['Vitamina B6', 'Potasiu', 'Magneziu', 'Antioxidanți'],
    cumSaMananci: 'Taie-l și scoate pulpa cu lingura. Îndepărtează semințele negre mari.',
    sezon: 'Iunie - Octombrie',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Berthe_Hoola_van_Nooten53.jpg'
  },
  'breadfruit': {
    nume: 'Breadfruit (Fructul de pâine)',
    origine: 'Oceania, Insulele Pacificului',
    descriere: 'Fruct mare, verde, cu suprafață crescută. Pulpa coptă are textură și gust asemănător cu pâinea proaspăt coaptă sau cartofii.',
    beneficii: ['Carbohidrați complecși', 'Fibre', 'Vitamina C', 'Potasiu'],
    cumSaMananci: 'Se gătește coapt, fiert sau prăjit. Se servește ca înlocuitor al pâinii sau cartofilor.',
    sezon: 'Iulie - Februarie',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Artocarpus_altilis_%28fruit%29.jpg'
  },
  'rose apple': {
    nume: 'Rose Apple (Jambu)',
    origine: 'Asia de Sud-Est',
    descriere: 'Fruct în formă de clopot cu coajă roz, roșie sau verde. Pulpa albă este crocantă, suculentă și are aromă de trandafiri.',
    beneficii: ['Hidratant', 'Vitamina C', 'Calorii scăzute', 'Detoxifiant'],
    cumSaMananci: 'Mănâncă-l crud, întreg sau tăiat în felii. Coaja este comestibilă.',
    sezon: 'Aprilie - Iunie',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Wax_apple.png'
  },
  'tamarillo': {
    nume: 'Tamarillo (Tomatillo arbore)',
    origine: 'America de Sud (Peru, Chile, Ecuador)',
    descriere: 'Fruct oval, de culoare roșie, portocalie sau galbenă, asemănător cu ouăle de prepeliță. Pulpa este dulce-acrișoară cu multe semințe.',
    beneficii: ['Vitamina A', 'Vitamina C', 'Luteină', 'Potasiu'],
    cumSaMananci: 'Taie-l și scoate pulpa cu lingura. Coaja este amară și se îndepărtează.',
    sezon: 'Mai - Octombrie',
    imagine: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Tamarillos_-_whole_and_halved.jpg'
  }
};

const toateFructele = Object.values(fructeExotice);

app.get('/api/fruct/:nume', (req, res) => {
  const numeCautat = req.params.nume.toLowerCase().trim();

  // Căutare exactă mai întâi
  let fruct = fructeExotice[numeCautat];

  // Dacă nu există potrivire exactă, căutare parțială în chei
  if (!fruct) {
    const cheiePotrivita = Object.keys(fructeExotice).find(key =>
      key.includes(numeCautat) || numeCautat.includes(key)
    );
    if (cheiePotrivita) {
      fruct = fructeExotice[cheiePotrivita];
    }
  }

  // Căutare și în numele fructelor
  if (!fruct) {
    const fructDupaNume = Object.values(fructeExotice).find(f =>
      f.nume.toLowerCase().includes(numeCautat)
    );
    if (fructDupaNume) {
      fruct = fructDupaNume;
    }
  }

  if (fruct) {
    res.json({ success: true, data: fruct });
  } else {
    const sugestii = Object.keys(fructeExotice).filter(key =>
      key.includes(numeCautat) || numeCautat.includes(key)
    );
    res.json({
      success: false,
      message: `Fructul "${req.params.nume}" nu a fost găsit în baza noastră de date.`,
      sugestii: sugestii.length > 0 ? sugestii : Object.keys(fructeExotice)
    });
  }
});

app.get('/api/toate-fructele', (req, res) => {
  res.json({
    success: true,
    data: toateFructele
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`🥭 Serverul Exot rulează pe http://localhost:${PORT}`);
  console.log(`🍓 Deschide browser-ul și accesează http://localhost:${PORT}`);
});
