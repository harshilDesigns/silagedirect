import { getSavedLang, saveLang, applyLang, updateLangButtons } from "./lang.js";

const T={
en:{nav:{home:"Home",products:"Products",about:"About Us",contact:"Contact"},
c:{h1:"Get in Touch",sub:"We respond fast. Whether you want to place an order, check stock, or just ask a question — call, WhatsApp, or fill the form.",info:[{i:"📞",t:"Phone",v:"+91 97270 07431",href:"tel:+919727007431"},{i:"📧",t:"Email",v:"harshilbarot667@gmail.com",href:"mailto:harshilbarot667@gmail.com"},{i:"📍",t:"Location",v:"Mehsana, Gujarat\n384001",href:"#"}],mapLabel:"Mehsana, Gujarat",mapSub:"Serving Gujarat & Rajasthan",waT:"Chat on WhatsApp",waS:"Fastest response — reply within 30 minutes",hoursT:"Working Hours",hours:[["Monday – Friday","6:00 AM – 8:00 PM"],["Saturday","6:00 AM – 6:00 PM"],["Sunday","Closed"]],openNow:"Lines open Mon–Sat",formT:"Send an Enquiry",formS:"We'll call you back within 2 hours with availability and pricing.",fname:"Your Name",fphone:"Phone Number",fvillage:"Village / Town",fbales:"Bales Needed",ftype:"Bale Type",fsel:"Select quantity",fmsg:"Message (optional)",fsend:"Send Enquiry",ok:"✅ Sent! We'll call you back within 2 hours.",err:"Please enter your name and phone number.",faqT:"Quick Answers",faq:[["What is the minimum order?","Minimum 12 bales (Pro 100) or 3 bales (Max 700) based on your route."],["How fast can you deliver?","Typically 1–3 business days after confirmation, depending on your location."],["Can I get a lab report before ordering?","Yes. Share your contact and we'll send a sample report on WhatsApp."],["Do prices include GST?","No. GST is charged extra. Final price is confirmed during booking."]]},
f:{t:"Links & Contact",tag:"GauVardhan Feed by Gokul Biotech Pvt Ltd. Premium maize silage, direct to farms that care about consistency.",call:"Call: +91 97270 07431",mail:"Email: harshilbarot667@gmail.com",h:"Mon–Sat, 6:00 AM – 8:00 PM",c:"© 2026 GauVardhan Feed. A brand of Gokul Biotech Pvt Ltd."}},
hi:{nav:{home:"होम",products:"उत्पाद",about:"हमारे बारे में",contact:"संपर्क"},
c:{h1:"संपर्क करें",sub:"हम जल्दी जवाब देते हैं। ऑर्डर, स्टॉक या कोई भी सवाल — कॉल, WhatsApp या फॉर्म भरें।",info:[{i:"📞",t:"फोन",v:"+91 97270 07431",href:"tel:+919727007431"},{i:"📧",t:"ईमेल",v:"harshilbarot667@gmail.com",href:"mailto:harshilbarot667@gmail.com"},{i:"📍",t:"लोकेशन",v:"मेहसाणा, गुजरात\n384001",href:"#"}],mapLabel:"मेहसाणा, गुजरात",mapSub:"गुजरात और राजस्थान में सेवा",waT:"WhatsApp पर चैट करें",waS:"सबसे तेज़ जवाब — 30 मिनट में",hoursT:"काम के घंटे",hours:[["सोमवार – शुक्रवार","सुबह 6:00 – रात 8:00"],["शनिवार","सुबह 6:00 – शाम 6:00"],["रविवार","बंद"]],openNow:"सोम-शनि लाइन खुली है",formT:"एन्क्वायरी भेजें",formS:"हम 2 घंटे के अंदर उपलब्धता और कीमत बताकर कॉल करेंगे।",fname:"आपका नाम",fphone:"फोन नंबर",fvillage:"गाँव / शहर",fbales:"कितनी बेल चाहिए",ftype:"बेल प्रकार",fsel:"मात्रा चुनें",fmsg:"संदेश (वैकल्पिक)",fsend:"एन्क्वायरी भेजें",ok:"✅ भेज दिया! हम 2 घंटे में कॉल करेंगे।",err:"कृपया नाम और फोन नंबर भरें।",faqT:"जल्दी जवाब",faq:[["न्यूनतम ऑर्डर कितना है?","Pro 100 के लिए 12 बेल, Max 700 के लिए 3 बेल।"],["डिलीवरी कितनी जल्दी होती है?","कन्फर्मेशन के 1–3 कार्यदिवसों में।"],["ऑर्डर से पहले लैब रिपोर्ट मिल सकती है?","हाँ। अपना नंबर दें और हम WhatsApp पर सैंपल रिपोर्ट भेजेंगे।"],["क्या कीमत में GST शामिल है?","नहीं। GST अलग से लागू होता है।"]]},
f:{t:"लिंक्स और संपर्क",tag:"GauVardhan Feed, Gokul Biotech Pvt Ltd का ब्रांड है। स्थिर फीड के लिए प्रीमियम साइलेज।",call:"कॉल: +91 97270 07431",mail:"ईमेल: harshilbarot667@gmail.com",h:"सोम-शनि, 6:00 – 8:00 PM",c:"© 2026 GauVardhan Feed. Gokul Biotech Pvt Ltd का ब्रांड।"}},
gu:{nav:{home:"હોમ",products:"ઉત્પાદનો",about:"અમારા વિશે",contact:"સંપર્ક"},
  c:{
    h1:"ચાલો વાત કરીએ.\nઅમે ઝડપથી જવાબ આપીએ છીએ.",
    sub:"ઓર્ડર કરવો હોય, સ્પેક્સ જાણવા હોય, અથવા ફક્ત ડિલિવરી વિશે પૂછવું હોય — સંપર્ક કરો.",
    infoT:"અમારો સંપર્ક",
    info:[
      {i:"📞",t:"કૉલ કરો",v:"<a href='tel:+919727007431'>+91 97270 07431</a>"},
      {i:"📧",t:"ઈમેઈલ",v:"<a href='mailto:harshilbarot667@gmail.com'>harshilbarot667@gmail.com</a>"},
      {i:"📍",t:"ફાર્મ સ્થાન",v:"<span>મહેસાણા, ગુજરાત — 384001</span>"}
    ],
    waT:"સૌથી ઝડપી: WhatsApp પર સંપર્ક કરો",
    waS:"કામના સમયે મિનિટોમાં જવાબ.",
    hoursT:"કામના કલાકો",
    hours:[
      ["સોમવાર – શનિવાર","સવારે 6:00 – રાત્રે 8:00"],
      ["રવિવાર","બંધ"],
      ["કટોકટી ઓર્ડર","ગમે ત્યારે કૉલ કરો"]
    ],
    mapLabel:"મહેસાણા, ગુજરાત",
    mapSub:"ગુજરાત અને રાજસ્થાનમાં સેવા",
    formT:"તમારી જરૂરિયાત મોકલો",
    formS:"ફોર્મ ભરો અને અમે 2 કલાકમાં ભાવ અને ઉપલબ્ધતા સાથે સંપર્ક કરીશું.",
    fname:"તમારું નામ",
    fphone:"ફોન નંબર",
    fvillage:"ગામ / શહેર",
    fbales:"કેટલા બેલ જોઈએ",
    ftype:"બેલ પ્રકાર",
    fsel:"પસંદ કરો...",
    fmsg:"અન્ય વિગતો",
    fsend:"પૂછપરછ મોકલો",
    ok:"✅ પૂછપરછ મોકલી! અમે 2 કલાકમાં કૉલ કરીશું.",
    err:"કૃપા કરીને નામ અને ફોન નંબર ભરો.",
    faqT:"ઝડપી જવાબ",
    faq:[
      ["લઘુત્તમ ઓર્ડર કેટલો છે?","Pro 100 માટે 12 બેલ અથવા Max 700 માટે 3 બેલ, ડિલિવરી રૂટ મુજબ."],
      ["ડિલિવરી કેટલી ઝડપથી થાય?","અમારા નિયમિત રૂટ પર મોટાભાગના ફાર્મ કન્ફર્મેશન પછી 24–48 કલાકમાં."],
      ["શું તમે ગુજરાત બહાર ડિલિવરી કરો?","હા. અમે હાલ રાજસ્થાનના ભાગોમાં પણ સેવા આપીએ છીએ."],
      ["શું ઓર્ડર પહેલા ફાર્મ જોઈ શકાય?","બિલકુલ. ફાર્મ મુલાકાત માટે કૉલ કરો."]
    ]
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
function fill(){document.querySelectorAll("[data-i18n]").forEach(e=>{const v=G(e.dataset.i18n);if(typeof v==="string")e.textContent=v})}
function updateFormLabels(){
  const c=T[lang].c;
  document.getElementById("lbl-fname").textContent=c.fname;
  document.getElementById("lbl-fphone").textContent=c.fphone;
  document.getElementById("lbl-fvillage").textContent=c.fvillage;
  document.getElementById("lbl-fbales").textContent=c.fbales;
  document.getElementById("lbl-ftype").textContent=c.ftype;
  document.getElementById("lbl-fmsg").textContent=c.fmsg;
  document.getElementById("fsend-txt").textContent=c.fsend;
}
function buildInfo(){
  document.getElementById("infoCards").innerHTML=T[lang].c.info.map(c=>`
    <div class="cinfo-card">
      <div class="cinfo-icon">${c.i}</div>
      <div class="cinfo-body">
        <h3>${c.t}</h3>
        <p>${c.href!="#"?`<a href="${c.href}">${c.v.replace("\n","<br>")}</a>`:c.v.replace("\n","<br>")}</p>
      </div>
    </div>`).join("");
}
function buildHours(){document.getElementById("hourRows").innerHTML=T[lang].c.hours.map(h=>`<div class="hrow"><span>${h[0]}</span><strong>${h[1]}</strong></div>`).join("")}
function buildFAQ(){
  const box=document.getElementById("faq");
  box.innerHTML=T[lang].c.faq.map(v=>`<article class="fi"><button class="fq" type="button"><span>${v[0]}</span><span class="plus">+</span></button><div class="fa">${v[1]}</div></article>`).join("");
  box.querySelectorAll(".fi").forEach(it=>{
    it.querySelector(".fq").onclick=()=>{
      const o=it.classList.contains("open");
      box.querySelectorAll(".fi").forEach(x=>{x.classList.remove("open");x.querySelector(".plus").textContent="+"});
      if(!o){it.classList.add("open");it.querySelector(".plus").textContent="×"}
    };
  });
}
function updateWA(){
  const msg=encodeURIComponent(
    lang==="hi"?"नमस्ते, साइलेज बेल चाहिए।"
    : lang==="gu"?"નમસ્તે, સાઇલેજ બેલ જોઈએ."
    : "Hi, I want to order maize silage bales."
  );
  ["wa-link","wa-direct"].forEach(id=>{const el=document.getElementById(id);if(el)el.href=`https://wa.me/919727007431?text=${msg}`});
  document.getElementById("wa-tip").textContent=lang==="hi"?"WhatsApp पर चैट करें":lang==="gu"?"WhatsApp પર ચેટ કરો":"Chat on WhatsApp";
  const c=T[lang].c;
  document.getElementById("wa-big-title").textContent=c.waT;
  document.getElementById("wa-big-sub").textContent=c.waS;
  document.getElementById("map-label").textContent=c.mapLabel;
  document.getElementById("map-sub").textContent=c.mapSub;
}
document.getElementById("f-submit").onclick=()=>{
  const name=document.getElementById("f-name").value.trim();
  const phone=document.getElementById("f-phone").value.trim();
  const village=document.getElementById("f-village").value.trim();
  const bales=document.getElementById("f-bales").value;
  const msg=document.getElementById("f-msg").value.trim();
  const type=document.getElementById("f-type").value;
  const status=document.getElementById("fstatus");
  if(!name||!phone){status.className="form-msg error";status.textContent=T[lang].c.err;return}
  const waMsg=encodeURIComponent(`New Enquiry – GauVardhan Feed\nCompany: Gokul Biotech Pvt Ltd\nName: ${name}\nPhone: ${phone}\nVillage: ${village||"—"}\nBales: ${bales||"—"}\nBale Type: ${type||"—"}\nNote: ${msg||"—"}`);
  window.open(`https://wa.me/919727007431?text=${waMsg}`,"_blank");
  status.className="form-msg success";status.textContent=T[lang].c.ok;
  ["f-name","f-phone","f-village","f-msg"].forEach(id=>document.getElementById(id).value="");
  document.getElementById("f-bales").selectedIndex=0;
  document.getElementById("f-type").selectedIndex=0;
};
function render(){fill();updateFormLabels();buildInfo();buildHours();buildFAQ();updateWA()}
function setLang(l){lang=l;saveLang(l);applyLang(l);document.body.classList.add("fade");setTimeout(()=>{render();updateLangButtons(l);document.body.classList.remove("fade")},150)}
document.getElementById("lang").onclick=e=>{const btn=e.target.closest("button");if(!btn)return;const idx=["EN","हिं","ગુ"].indexOf(btn.textContent.trim());if(idx>=0)setLang(["en","hi","gu"][idx])};
window.addEventListener("scroll",()=>document.getElementById("hdr").classList.toggle("scrolled",scrollY>12),{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(e=>io.observe(e));
applyLang(lang);
updateLangButtons(lang);
render();
