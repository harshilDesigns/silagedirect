import { getSavedLang, saveLang, applyLang, updateLangButtons } from "./lang.js";

const data=[
  {n:"Pro 100",img:"images/Hand.png",w:"100 kg",dm:"34.8%",m:"65.2%",c:"Cut 2",h:"18 Sep 2025",wr:"6 Layers",p:950,s:240},
  {n:"Max 700",img:"images/Bale.png",w:"700 kg",dm:"35.1%",m:"64.9%",c:"Cut 2",h:"22 Sep 2025",wr:"8 Layers",p:5200,s:84}
];
const T={
en:{nav:{home:"Home",products:"Products",about:"About Us",contact:"Contact"},
p:{h1:"Two formats.\nEvery spec.\nZero guessing.",sub:"Choose the bale that fits your farm size and handling capacity. Full lab data. Live stock. Direct order via WhatsApp.",prodT:"Our Products",prodS:"Both formats are from the same batch — same quality, same harvest date, same lab report.",add:"Order on WhatsApp",l:{w:"Weight",dm:"Dry Matter %",m:"Moisture %",c:"Cut",h:"Harvest Date",wr:"Wrapping",p:"Price",s:"Stock Left"},ucT:"Who Uses Which Format",ucS:"A quick guide to help you choose the right bale for your operation.",uc:[{i:"🐄",t:"Small Dairy (10–30 cattle)",p:"Pro 100 is ideal. Easy to handle manually, no equipment needed, feeds a small herd without wastage."},{i:"🏗️",t:"Large Dairy (30–200+ cattle)",p:"Max 700 makes sense. One bale covers more days, fewer handling operations, better economics at scale."},{i:"🚜",t:"Mixed Cattle Farms",p:"Many farms use both — 700kg for main herd, 100kg for calves and sick animals needing precise portions."}],cmpT:"Pro 100 vs Max 700",cmpS:"Side-by-side so you can decide in 30 seconds.",cmp:{h:["Feature","Pro 100 (100kg)","Max 700 (700kg)"],rows:[["Weight","100 kg","700 kg"],["Best For","Small–medium herds","Large herds"],["Handling","Manual — no equipment","Tractor/loader needed"],["Price Per Kg","₹9.50 / kg","₹7.43 / kg"],["Wrapping","6 Layers","8 Layers"],["Lab Report","✓","✓"],["Minimum Order","12 bales","3 bales"]]},priceT:"Bulk Pricing",priceNote:"* GST extra. Prices valid for current season stock.",priceRows:{h:["Bale","Qty","Price","You Save"],r:[["Pro 100kg","1–11","₹950/bale","—"],["Pro 100kg","12–50","₹900/bale","₹50/bale"],["Pro 100kg","51+","₹860/bale","₹90/bale"],["Max 700kg","1–5","₹5,200/bale","—"],["Max 700kg","6–20","₹4,900/bale","₹300/bale"],["Max 700kg","21+","₹4,600/bale","₹600/bale"]]},ctaT:"Ready to order?",ctaS:"Tell us your bale type and quantity on WhatsApp. We'll confirm stock, price, and delivery slot within the hour.",ctaWa:"Order on WhatsApp",ctaForm:"Send an Enquiry"},
f:{t:"Links & Contact",tag:"GauVardhan Feed by Gokul Biotech Pvt Ltd. Premium maize silage, direct to farms.",call:"Call: +91 97270 07431",mail:"Email: harshilbarot667@gmail.com",h:"Mon–Sat, 6:00 AM – 8:00 PM",c:"© 2026 GauVardhan Feed. A brand of Gokul Biotech Pvt Ltd."}},
hi:{nav:{home:"होम",products:"उत्पाद",about:"हमारे बारे में",contact:"संपर्क"},
p:{h1:"दो फॉर्मेट.\nहर स्पेक.\nकोई अनुमान नहीं.",sub:"अपने फार्म के लिए सही बेल चुनें। पूरा लैब डेटा। लाइव स्टॉक। WhatsApp पर सीधे ऑर्डर।",prodT:"हमारे उत्पाद",prodS:"दोनों फॉर्मेट एक ही बैच से — एक ही क्वालिटी, एक ही लैब रिपोर्ट।",add:"WhatsApp पर ऑर्डर करें",l:{w:"वज़न",dm:"ड्राई मैटर %",m:"नमी %",c:"कट",h:"कटाई तारीख",wr:"रैपिंग",p:"कीमत",s:"स्टॉक बचा"},ucT:"कौन सा फॉर्मेट किसके लिए",ucS:"सही बेल चुनने में मदद।",uc:[{i:"🐄",t:"छोटी डेयरी (10–30 पशु)",p:"Pro 100 बेस्ट है। मैनुअल हैंडलिंग आसान, बिना उपकरण के।"},{i:"🏗️",t:"बड़ी डेयरी (30–200+ पशु)",p:"Max 700 बेहतर है। एक बेल से ज़्यादा दिन चलता है, बेहतर अर्थव्यवस्था।"},{i:"🚜",t:"मिश्रित पशु फार्म",p:"कई फार्म दोनों इस्तेमाल करते हैं — बड़े झुंड के लिए 700kg, बछड़ों के लिए 100kg।"}],cmpT:"Pro 100 बनाम Max 700",cmpS:"30 सेकंड में फैसला करें।",cmp:{h:["फीचर","Pro 100 (100kg)","Max 700 (700kg)"],rows:[["वज़न","100 kg","700 kg"],["सबसे अच्छा","छोटे-मध्यम झुंड","बड़े झुंड"],["हैंडलिंग","मैनुअल — बिना उपकरण","ट्रैक्टर/लोडर ज़रूरी"],["₹ प्रति kg","₹9.50 / kg","₹7.43 / kg"],["रैपिंग","6 परतें","8 परतें"],["लैब रिपोर्ट","✓","✓"],["न्यूनतम ऑर्डर","12 बेल","3 बेल"]]},priceT:"बल्क प्राइसिंग",priceNote:"* GST अलग। वर्तमान सीज़न के लिए।",priceRows:{h:["बेल","मात्रा","कीमत","बचत"],r:[["Pro 100kg","1–11","₹950/बेल","—"],["Pro 100kg","12–50","₹900/बेल","₹50/बेल"],["Pro 100kg","51+","₹860/बेल","₹90/बेल"],["Max 700kg","1–5","₹5,200/बेल","—"],["Max 700kg","6–20","₹4,900/बेल","₹300/बेल"],["Max 700kg","21+","₹4,600/बेल","₹600/बेल"]]},ctaT:"ऑर्डर करने के लिए तैयार?",ctaS:"WhatsApp पर बेल टाइप और मात्रा बताएं। एक घंटे में स्टॉक, कीमत और डिलीवरी स्लॉट कन्फर्म।",ctaWa:"WhatsApp पर ऑर्डर करें",ctaForm:"एन्क्वायरी भेजें"},
f:{t:"लिंक्स और संपर्क",tag:"GauVardhan Feed, Gokul Biotech Pvt Ltd का ब्रांड है। स्थिर फीड के लिए प्रीमियम साइलेज।",call:"कॉल: +91 97270 07431",mail:"ईमेल: harshilbarot667@gmail.com",h:"सोम-शनि, 6:00 AM – 8:00 PM",c:"© 2026 GauVardhan Feed. Gokul Biotech Pvt Ltd का ब्रांड।"}},
gu:{nav:{home:"હોમ",products:"ઉત્પાદનો",about:"અમારા વિશે",contact:"સંપર્ક"},
  p:{
    h1:"બે ફોર્મેટ.\nદરેક સ્પેક.\nકોઈ અનુમાન નહીં.",
    sub:"તમારા ફાર્મ માટે યોગ્ય બેલ પસંદ કરો. સંપૂર્ણ લેબ ડેટા. લાઈવ સ્ટોક. WhatsApp પર સીધો ઓર્ડર.",
    prodT:"અમારા ઉત્પાદનો",
    prodS:"બંને ફોર્મેટ એક જ બેચ — એ જ ગુણવત્તા, એ જ લણણી તારીખ, એ જ લેબ રિપોર્ટ.",
    add:"WhatsApp પર ઓર્ડર કરો",
    l:{w:"વજન",dm:"ડ્રાય મેટર %",m:"ભેજ %",c:"કટ",h:"લણણી તારીખ",wr:"રેપિંગ",p:"કિંમત",s:"સ્ટોક બાકી"},
    ucT:"કોણ કયો ફોર્મેટ વાપરે છે",
    ucS:"યોગ્ય બેલ પસંદ કરવા માટે ઝડપી માર્ગદર્શિકા.",
    uc:[
      {i:"🐄",t:"નાની ડેરી (10–30 પશુ)",p:"Pro 100 આદર્શ છે. હાથથી સરળ હેન્ડલિંગ, કોઈ સાધન જરૂરી નથી."},
      {i:"🏗️",t:"મોટી ડેરી (30–200+ પશુ)",p:"Max 700 વ્યાજબી છે. એક બેલ વધુ દિવસ ચાલે, ઓછી હેન્ડલિંગ, સારી બચત."},
      {i:"🚜",t:"મિશ્ર પશુ ફાર્મ",p:"ઘણા ફાર્મ બંને વાપરે — મુખ્ય ટોળા માટે 700kg, વાછરડા માટે 100kg."}
    ],
    cmpT:"Pro 100 vs Max 700",
    cmpS:"30 સેકન્ડમાં નિર્ણય કરો.",
    cmp:{
      h:["વિશેષતા","Pro 100 (100kg)","Max 700 (700kg)"],
      rows:[
        ["વજન","100 kg","700 kg"],
        ["સૌથી યોગ્ય","નાના-મધ્યમ ટોળા","મોટા ટોળા"],
        ["હેન્ડલિંગ","હાથ — કોઈ સાધન નહીં","ટ્રેક્ટર/લોડર જરૂરી"],
        ["₹ પ્રતિ kg","₹9.50 / kg","₹7.43 / kg"],
        ["રેપિંગ","6 સ્તર","8 સ્તર"],
        ["લેબ રિપોર્ટ","✓","✓"],
        ["લઘુત્તમ ઓર્ડર","12 બેલ","3 બેલ"]
      ]
    },
    priceT:"બલ્ક પ્રાઈસિંગ",
    priceNote:"* GST અલગ. કિંમતો વર્તમાન સિઝન સ્ટોક માટે.",
    priceRows:{
      h:["બેલ","જથ્થો","કિંમત","તમારી બચત"],
      r:[
        ["Pro 100kg","1–11","₹950/બેલ","—"],
        ["Pro 100kg","12–50","₹900/બેલ","₹50/બેલ"],
        ["Pro 100kg","51+","₹860/બેલ","₹90/બેલ"],
        ["Max 700kg","1–5","₹5,200/બેલ","—"],
        ["Max 700kg","6–20","₹4,900/બેલ","₹300/બેલ"],
        ["Max 700kg","21+","₹4,600/બેલ","₹600/બેલ"]
      ]
    },
    ctaT:"ઓર્ડર કરવા તૈયાર છો?",
    ctaS:"WhatsApp પર બેલ પ્રકાર અને જથ્થો જણાવો. અમે એક કલાકમાં સ્ટોક, કિંમત અને ડિલિવરી સ્લોટ કન્ફર્મ કરીશું.",
    ctaWa:"WhatsApp પર ઓર્ડર કરો",
    ctaForm:"પૂછપરછ મોકલો"
  },
  f:{
    t:"લિંક્સ અને સંપર્ક",
    tag:"ફાર્મ-ડાયરેક્ટ પ્રીમિયમ મકાઈ સાઈલેજ.",
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
function buildProds(){
  const L=T[lang].p.l;
  document.getElementById("prods").innerHTML=data.map(d=>`
    <article class="pcard">
      <img class="pcard-img" src="${d.img}" alt="${d.n}">
      <div class="pcard-body">
        <div class="pcard-top"><h2>${d.n}</h2><span class="badge-stock">${L.s}: ${d.s}</span></div>
        <div class="specs-full">
          <div class="sf"><b>${L.w}</b><span>${d.w}</span></div>
          <div class="sf"><b>${L.dm}</b><span>${d.dm}</span></div>
          <div class="sf"><b>${L.m}</b><span>${d.m}</span></div>
          <div class="sf"><b>${L.c}</b><span>${d.c}</span></div>
          <div class="sf"><b>${L.h}</b><span>${d.h}</span></div>
          <div class="sf"><b>${L.wr}</b><span>${d.wr}</span></div>
        </div>
        <div class="pcard-footer">
          <div><div class="price-big">₹${d.p.toLocaleString("en-IN")}</div><div class="price-small">${L.p} / bale</div></div>
          <div class="pcard-actions">
            <button class="btn add-cart-btn" data-name="${d.n}" data-weight="${d.w}" data-price="${d.p}">
              🛒 Add to Cart
            </button>
            <a href="https://wa.me/919727007431?text=${encodeURIComponent("Hi, I want to order "+d.n+" maize silage bales")}" 
               target="_blank" rel="noopener noreferrer" class="btn wa">
              📱 ${T[lang].p.add}
            </a>
          </div>
        </div>
      </div>
    </article>`).join("");

  // Wire up Add to Cart buttons
  document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.onclick = () => {
      // Dynamically import cart.js and add the item
      import("./cart.js").then(({ addToCart }) => {
        addToCart({
          name: btn.dataset.name,
          weight: btn.dataset.weight,
          price: Number(btn.dataset.price)
        });
        // Visual feedback
        const original = btn.textContent;
        btn.textContent = "✓ Added!";
        btn.style.background = "var(--lime)";
        btn.style.color = "var(--bg)";
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = "";
          btn.style.color = "";
        }, 1500);
      });
    };
  });
}
function buildUC(){document.getElementById("usecases").innerHTML=T[lang].p.uc.map(u=>`<div class="uc"><div class="uc-icon">${u.i}</div><h3>${u.t}</h3><p>${u.p}</p></div>`).join("")}
function buildCmp(){
  const c=T[lang].p.cmp;
  document.getElementById("cmptable").innerHTML=`<thead><tr>${c.h.map((h,i)=>`<th${i===0?' style="color:var(--muted)"':''}>${h}</th>`).join("")}</tr></thead><tbody>${c.rows.map(r=>`<tr>${r.map((v,i)=>`<td${i>0?` class="${v==="✓"?"check":v==="✗"?"cross":""}"`:''}>${v}</td>`).join("")}</tr>`).join("")}</tbody>`;
}
function buildPrice(){
  const pr=T[lang].p.priceRows;
  document.getElementById("ptable").innerHTML=`<thead><tr>${pr.h.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${pr.r.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td class="hi">${r[2]}</td><td style="color:${r[3]==="—"?"var(--muted)":"var(--lime)"}">${r[3]}</td></tr>`).join("")}</tbody>`;
}
function updateWA(){
  const msg=encodeURIComponent(lang==="hi"?"नमस्ते, साइलेज बेल चाहिए।":lang==="gu"?"નમસ્તે, સાઇલેજ બેલ જોઈએ.":"Hi, I want to order maize silage bales.");
  ["wa-link","wa-order"].forEach(id=>{const el=document.getElementById(id);if(el)el.href=`https://wa.me/919727007431?text=${msg}`});
  document.getElementById("wa-tip").textContent=lang==="hi"?"WhatsApp पर चैट करें":lang==="gu"?"WhatsApp પર ચૅટ કરો":"Chat on WhatsApp";
}
function render(){fill();buildProds();buildUC();buildCmp();buildPrice();updateWA()}
function setLang(l){lang=l;saveLang(l);applyLang(l);document.body.classList.add("fade");setTimeout(()=>{render();updateLangButtons(l);document.body.classList.remove("fade")},150)}
document.getElementById("lang").onclick=e=>{const btn=e.target.closest("button");if(!btn)return;const idx=["EN","हिं","ગુ"].indexOf(btn.textContent.trim());if(idx>=0)setLang(["en","hi","gu"][idx])};
window.addEventListener("scroll",()=>document.getElementById("hdr").classList.toggle("scrolled",scrollY>12),{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(e=>io.observe(e));
applyLang(lang);
updateLangButtons(lang);
render();
initMobileNav();
