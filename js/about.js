import { getSavedLang, saveLang, applyLang, updateLangButtons } from "./lang.js";

const T={
en:{nav:{home:"Home",products:"Products",about:"About Us",contact:"Contact"},
a:{h1:"We Grow It.\nWe Wrap It.\nWe Deliver It.",sub:"GauVardhan Feed is the farm-direct maize silage brand of Gokul Biotech Pvt Ltd, built to give serious dairy farmers consistent, lab-verified feed with no middlemen and no guessing.",quote:"Every bale is a promise kept.",storyT:"Born from the farm.\nBuilt for farmers.",s1:"GauVardhan Feed started with a simple frustration — watching dairy farmers across Gujarat pay premium prices for silage that arrived with unknown moisture, inconsistent dry matter, and no lab data to back up any claims.",s2:"We set out to change that. By controlling every step from planting to wrapping to delivery, we tell you exactly what is in every bale — energy, protein, pH, dry matter — before it reaches your farm gate.",s3:"Today, GauVardhan Feed by Gokul Biotech Pvt Ltd serves progressive dairy and cattle farmers across Gujarat and Rajasthan who care about feed quality the same way we do. Every bale is a promise kept.",storyCta:"Order Now",valT:"What We Stand For",valS:"Three principles guide every bale we produce.",vals:[{i:"🔬",t:"Verified Quality",p:"Every batch is lab tested before dispatch. Full nutritional report shared with every order — no hiding, no guessing."},{i:"🤝",t:"Direct Relationship",p:"No middlemen. You deal directly with the farm. Same number, same team, same accountability every time."},{i:"⏱️",t:"Reliable Delivery",p:"We give you a confirmed window and we stick to it. Your feed cycle should never depend on someone else's schedule."}],promT:"Our promise to every farmer.",promS:"When you order from GauVardhan Feed, you are not buying a commodity. You are buying a verified, traceable, farm-direct product backed by Gokul Biotech Pvt Ltd and people who stand behind it.",promCta:"Work With Us",promPills:["Lab Report With Every Order","Farm-Direct, No Middleman","Consistent Dry Matter","Reliable Delivery Window","Responsive Support","Transparent Pricing"],teamT:"The People Behind the Bales",teamS:"A small team with deep roots in farming and animal nutrition.",team:[{i:"👨‍🌾",n:"Founder & Farm Head",r:"Operations & Quality",p:"Oversees all growing, harvesting and wrapping. Over a decade working with maize crops in Mehsana, Gujarat."},{i:"🧪",n:"Nutrition & Lab",r:"Feed Quality Assurance",p:"Manages all batch testing and lab coordination. Ensures every consignment meets our dry matter and energy targets before dispatch."},{i:"🚚",n:"Logistics & Delivery",r:"Farm-Gate Operations",p:"Plans all routes and delivery windows. Coordinates directly with farmers to ensure every bale arrives on time."}],milT:"How We Got Here",mil:[{y:"2014",t:"First Harvest",p:"Started growing maize on family land in Mehsana, Gujarat. Supplied silage locally to three farms."},{y:"2017",t:"Lab Testing Begins",p:"Invested in nutritional testing. Started sharing lab reports with every customer — a first in our region."},{y:"2020",t:"Professional Wrapping",p:"Moved to multi-layer wrapping equipment. Reduced spoilage, improved consistency significantly."},{y:"2023",t:"Expanded Delivery",p:"Started serving farms in Rajasthan and North Gujarat. Grew to 200+ farms served annually."},{y:"2026",t:"GauVardhan Feed Launches",p:"Launched as the direct-to-farm maize silage brand of Gokul Biotech Pvt Ltd with transparent pricing and a full digital presence."}]},
f:{t:"Links & Contact",tag:"GauVardhan Feed by Gokul Biotech Pvt Ltd. Premium maize silage, direct to farms that care about consistency.",call:"Call: +91 97270 07431",mail:"Email: harshilbarot667@gmail.com",h:"Mon–Sat, 6:00 AM – 8:00 PM",c:"© 2026 GauVardhan Feed. A brand of Gokul Biotech Pvt Ltd."}},
hi:{nav:{home:"होम",products:"उत्पाद",about:"हमारे बारे में",contact:"संपर्क"},
a:{h1:"हम उगाते हैं.\nहम लपेटते हैं.\nहम पहुंचाते हैं.",sub:"GauVardhan Feed, Gokul Biotech Pvt Ltd का फार्म-डायरेक्ट मक्का साइलेज ब्रांड है — गंभीर डेयरी किसानों को लैब-वेरिफाइड, स्थिर फीड देने के लिए बनाया गया।",quote:"हर बेल एक वादा है जो हम निभाते हैं।",storyT:"फार्म से जन्मा.\nकिसानों के लिए बना.",s1:"GauVardhan Feed की शुरुआत एक सरल निराशा से हुई — गुजरात के किसानों को अनजान नमी, असंगत ड्राई मैटर और बिना लैब डेटा वाले साइलेज के लिए प्रीमियम कीमत चुकाते देखना।",s2:"हमने इसे बदलने की ठानी। बुवाई से लेकर रैपिंग और डिलीवरी तक हर चरण को नियंत्रित करके, हम हर बेल की एनर्जी, प्रोटीन, pH और ड्राई मैटर ठीक-ठीक बताते हैं।",s3:"आज GauVardhan Feed, Gokul Biotech Pvt Ltd के साथ गुजरात और राजस्थान के उन्नत किसानों की सेवा करता है, जो फीड क्वालिटी को उतनी ही गंभीरता से लेते हैं।",storyCta:"अभी ऑर्डर करें",valT:"हम किसके लिए खड़े हैं",valS:"तीन सिद्धांत हमारे हर बेल का मार्गदर्शन करते हैं।",vals:[{i:"🔬",t:"वेरिफाइड क्वालिटी",p:"हर बैच डिस्पैच से पहले लैब टेस्ट। हर ऑर्डर के साथ पूरी न्यूट्रिशन रिपोर्ट।"},{i:"🤝",t:"सीधा संबंध",p:"कोई बिचौलिया नहीं। सीधे फार्म से डील। हर बार वही नंबर, वही टीम।"},{i:"⏱️",t:"भरोसेमंद डिलीवरी",p:"हम कन्फर्म्ड विंडो देते हैं और उस पर कायम रहते हैं।"}],promT:"हर किसान से हमारा वादा।",promS:"जब आप GauVardhan Feed से ऑर्डर करते हैं, तो आप एक वेरिफाइड, ट्रेसेबल, फार्म-डायरेक्ट प्रोडक्ट खरीदते हैं, जिसे Gokul Biotech Pvt Ltd का भरोसा प्राप्त है।",promCta:"हमसे संपर्क करें",promPills:["हर ऑर्डर के साथ लैब रिपोर्ट","फार्म-डायरेक्ट","स्थिर ड्राई मैटर","भरोसेमंद डिलीवरी","रेस्पॉन्सिव सपोर्ट","पारदर्शी मूल्य"],teamT:"बेल्स के पीछे के लोग",teamS:"खेती और पशु पोषण में गहरी जड़ें।",team:[{i:"👨‍🌾",n:"फाउंडर और फार्म हेड",r:"ऑपरेशन्स और क्वालिटी",p:"मेहसाणा में मक्का की खेती का दशक से अधिक अनुभव।"},{i:"🧪",n:"न्यूट्रिशन और लैब",r:"फीड क्वालिटी एश्योरेंस",p:"बैच टेस्टिंग और लैब कोऑर्डिनेशन का प्रबंधन।"},{i:"🚚",n:"लॉजिस्टिक्स और डिलीवरी",r:"फार्म-गेट ऑपरेशन्स",p:"रूट और डिलीवरी विंडो की योजना और किसानों से सीधा समन्वय।"}],milT:"हमारी यात्रा",mil:[{y:"2014",t:"पहली फसल",p:"मेहसाणा, गुजरात में पारिवारिक ज़मीन पर मक्का उगाना शुरू।"},{y:"2017",t:"लैब टेस्टिंग शुरू",p:"हर ग्राहक के साथ लैब रिपोर्ट शेयर करना शुरू किया।"},{y:"2020",t:"प्रोफेशनल रैपिंग",p:"मल्टी-लेयर रैपिंग उपकरण। कम बर्बादी, बेहतर स्थिरता।"},{y:"2023",t:"डिलीवरी विस्तार",p:"राजस्थान और उत्तर गुजरात में सेवा। 200+ फार्म प्रतिवर्ष।"},{y:"2026",t:"GauVardhan Feed लॉन्च",p:"पारदर्शी मूल्य के साथ Gokul Biotech Pvt Ltd का डायरेक्ट-टू-फार्म ब्रांड लॉन्च हुआ।"}]},
f:{t:"लिंक्स और संपर्क",tag:"GauVardhan Feed, Gokul Biotech Pvt Ltd का ब्रांड है। स्थिरता को प्राथमिकता देने वाले फार्म के लिए।",call:"कॉल: +91 97270 07431",mail:"ईमेल: harshilbarot667@gmail.com",h:"सोम-शनि, सुबह 6:00 - रात 8:00",c:"© 2026 GauVardhan Feed. Gokul Biotech Pvt Ltd का ब्रांड।"}},
gu:{nav:{home:"હોમ",products:"ઉત્પાદનો",about:"અમારા વિશે",contact:"સંપર્ક"},
  a:{
    h1:"અમે ઉગાડીએ છીએ.\nઅમે વીંટીએ છીએ.\nઅમે પહોંચાડીએ છીએ.",
    sub:"GauVardhan Feed, Gokul Biotech Pvt Ltd નો ફાર્મ-ડાયરેક્ટ મકાઈ સાઈલેજ બ્રાન્ડ છે — ગંભીર ડેરી ખેડૂતોને સ્થિર, લેબ-ચકાસેલ ફીડ આપવા માટે બનાવ્યો છે.",
    quote:"દરેક બેલ એક વચન છે જે અમે પાળીએ છીએ.",
    storyT:"ફાર્મમાંથી જન્મ્યા.\nખેડૂતો માટે બન્યા.",
    s1:"GauVardhan Feed ની શરૂઆત એક સરળ નિરાશામાંથી થઈ — ગુજરાતના ખેડૂતોને અજ્ઞાત ભેજ, અસ્થિર ડ્રાય મેટર અને કોઈ લેબ ડેટા વગરના સાઈલેજ માટે પ્રીમિયમ ભાવ ચૂકવતા જોવા.",
    s2:"અમે આ બદલવાનું નક્કી કર્યું. વાવણીથી ડિલિવરી સુધી દરેક તબક્કો નિયંત્રિત કરીને, અમે દરેક બેલની એનર્જી, પ્રોટીન, pH અને ડ્રાય મેટર ચોક્કસ કહી શકીએ.",
    s3:"આજે અમે ગુજરાત અને રાજસ્થાનના પ્રગતિશીલ ડેરી ખેડૂતોની સેવા કરીએ છીએ. દરેક બેલ એક પ્રતિજ્ઞા છે.",
    storyCta:"હવે ઓર્ડર કરો",
    valT:"અમે શું માટે ઊભા છીએ",
    valS:"ત્રણ સિદ્ધાંતો અમારા દરેક બેલને માર્ગ બતાવે છે.",
    vals:[
      {i:"🔬",t:"ચકાસેલ ગુણવત્તા",p:"દરેક બેચ ડિસ્પેચ પહેલા લેબ ટેસ્ટ. દરેક ઓર્ડર સાથે સંપૂર્ણ પોષણ રિપોર્ટ."},
      {i:"🤝",t:"સીધો સંબંધ",p:"કોઈ વચેટિયા નહીં. ફાર્મ સાથે સીધો વ્યવહાર. દર વખતે એ જ નંબર, એ જ ટીમ."},
      {i:"⏱️",t:"ભરોસાપાત્ર ડિલિવરી",p:"અમે કન્ફર્મ્ડ વિન્ડો આપીએ છીએ અને તેના પર ટકીએ છીએ."}
    ],
    promT:"દરેક ખેડૂત સાથે અમારું વચન.",
    promS:"જ્યારે તમે GauVardhan Feed પાસેથી ઓર્ડર કરો છો, ત્યારે તમે Gokul Biotech Pvt Ltd ના આધાર સાથે એક ચકાસેલ, ટ્રેસેબલ, ફાર્મ-ડાયરેક્ટ ઉત્પાદન ખરીદો છો.",
    promCta:"અમારી સાથે કામ કરો",
    promPills:["દરેક ઓર્ડર સાથે લેબ રિપોર્ટ","ફાર્મ-ડાયરેક્ટ","સ્થિર ડ્રાય મેટર","ભરોસાપાત્ર ડિલિવરી","ઝડપી સપોર્ટ","પારદર્શક ભાવ"],
    teamT:"બેલ્સ પાછળના લોકો",
    teamS:"ખેતી અને પશુ પોષણમાં ઊંડા મૂળ ધરાવતી ટીમ.",
    team:[
      {i:"👨‍🌾",n:"સ્થાપક અને ફાર્મ હેડ",r:"ઓપરેશન્સ અને ગુણવત્તા",p:"મહેસાણા, ગુજરાતમાં મકાઈ પાકો સાથે દાયકાથી વધુ અનુભવ."},
      {i:"🧪",n:"પોષણ અને લેબ",r:"ફીડ ગુણવત્તા ખાતરી",p:"બેચ ટેસ્ટિંગ અને લેબ સંકલનનું સંચાલન."},
      {i:"🚚",n:"લોજિસ્ટિક્સ અને ડિલિવરી",r:"ફાર્મ-ગેટ ઓપરેશન્સ",p:"તમામ રૂટ અને ડિલિવરી વિન્ડો આયોજે છે."}
    ],
    milT:"અમે કેવી રીતે અહીં પહોંચ્યા",
    mil:[
      {y:"2014",t:"પ્રથમ લણણી",p:"મહેસાણા, ગુજરાતમાં પારિવારિક જમીન પર મકાઈ ઉગાડવાની શરૂઆત."},
      {y:"2017",t:"લેબ ટેસ્ટિંગ શરૂ",p:"પોષણ પરીક્ષણમાં રોકાણ. દરેક ગ્રાહક સાથે લેબ રિપોર્ટ શેર કરવાની શરૂઆત."},
      {y:"2020",t:"પ્રોફેશનલ રેપિંગ",p:"મલ્ટિ-લેયર રેપિંગ સાધનો. બગાડ ઓછો, સ્થિરતા વધી."},
      {y:"2023",t:"ડિલિવરી વિસ્તરણ",p:"રાજસ્થાન અને ઉત્તર ગુજરાતમાં સેવા. વાર્ષિક 200+ ફાર્મ."},
      {y:"2026",t:"GauVardhan Feed લોન્ચ",p:"પારદર્શક ભાવ સાથે Gokul Biotech Pvt Ltd નો ડાયરેક્ટ-ટુ-ફાર્મ બ્રાન્ડ."}
    ]
  },
  f:{
    t:"લિંક્સ અને સંપર્ક",
    tag:"સ્થિરતાને પ્રાધાન્ય આપતા ફાર્મો માટે પ્રીમિયમ મકાઈ સાઈલેજ.",
    call:"કૉલ: +91 97270 07431",
    mail:"ઈમેઈલ: harshilbarot667@gmail.com",
    h:"સોમ–શનિ, સવારે 6:00 – રાત્રે 8:00",
    c:"© 2026 GauVardhan Feed. Gokul Biotech Pvt Ltd નો બ્રાન્ડ."
  }
}
};
let lang=getSavedLang();const G=p=>p.split(".").reduce((a,k)=>a?.[k],T[lang]);
function initMobileNav(){
  const toggle=document.getElementById("nav-toggle");
  const menu=document.getElementById("mobile-nav");
  if(!toggle||!menu)return;
  const close=()=>{menu.classList.remove("open");toggle.setAttribute("aria-expanded","false")};
  toggle.onclick=()=>{
    const open=!menu.classList.contains("open");
    menu.classList.toggle("open",open);
    toggle.setAttribute("aria-expanded",String(open));
  };
  menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));
  window.addEventListener("resize",()=>{if(window.innerWidth>980)close()});
}
function fill(){document.querySelectorAll("[data-i18n]").forEach(e=>{const v=G(e.dataset.i18n);if(typeof v==="string")e.textContent=v})}
function buildVals(){document.getElementById("vals").innerHTML=T[lang].a.vals.map(v=>`<div class="vcard"><div class="vicon">${v.i}</div><h3>${v.t}</h3><p>${v.p}</p></div>`).join("")}
function buildPills(){document.getElementById("pills").innerHTML=T[lang].a.promPills.map(p=>`<span class="pill">${p}</span>`).join("")}
function buildTeam(){document.getElementById("team").innerHTML=T[lang].a.team.map(m=>`<div class="tcard"><div class="avatar">${m.i}</div><h3>${m.n}</h3><div class="role">${m.r}</div><p>${m.p}</p></div>`).join("")}
function buildTL(){document.getElementById("tl").innerHTML=T[lang].a.mil.map(m=>`<div class="titem"><div class="tyear">${m.y}</div><div class="tcontent"><h3>${m.t}</h3><p>${m.p}</p></div></div>`).join("")}
function updateWA(){
  const msg=encodeURIComponent(lang==="hi"?"नमस्ते, साइलेज बेल चाहिए।":lang==="gu"?"નમસ્તે, સાઇલેજ બેલ જોઈએ.":"Hi, I want to order maize silage bales.");
  document.getElementById("wa-link").href=`https://wa.me/919727007431?text=${msg}`;
  document.getElementById("wa-tip").textContent=lang==="hi"?"WhatsApp पर चैट करें":lang==="gu"?"WhatsApp પર ચેટ કરો":"Chat on WhatsApp";
}
function render(){fill();buildVals();buildPills();buildTeam();buildTL();updateWA()}
function setLang(l){lang=l;saveLang(l);applyLang(l);document.body.classList.add("fade");setTimeout(()=>{render();updateLangButtons(l);document.body.classList.remove("fade")},150)}
document.getElementById("lang").onclick=e=>{const btn=e.target.closest("button");if(!btn)return;const idx=["EN","हिं","ગુ"].indexOf(btn.textContent.trim());if(idx>=0)setLang(["en","hi","gu"][idx])};
window.addEventListener("scroll",()=>document.getElementById("hdr").classList.toggle("scrolled",scrollY>12),{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(e=>io.observe(e));
applyLang(lang);
updateLangButtons(lang);
render();
initMobileNav();
