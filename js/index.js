import { getSavedLang, saveLang, applyLang, updateLangButtons } from "./lang.js";

import { addToCart, updateCartBadge } from "./cart.js";

const t = {
      en: {
        nav: { home: "Home", products: "Products", about: "About Us", contact: "Contact", cart: "Cart" },
        hero: { title: "Premium Maize Silage Bales. Clean Nutrition, Delivered Right.", sub: "Luxury-grade maize silage for serious dairy farmers with consistent dry matter, clear lab values, and dependable farm-gate delivery.", cta1: "Order on WhatsApp", cta2: "See Products", price: "Starting at ₹950 per bale.", badge: "Fresh Cut. Tight Wrap.", sideT: "Built for yield-focused farms", sideP: "Packed for intake consistency, milk response, and cleaner stack management.", labT: "Lab report for this batch", labPreview: "Preview report", labDownload: "Download PDF", labModalT: "Lab Report Preview", labNewTab: "Open in new tab" },
        trust: ["Lab Tested", "Direct Farm", "GPS Delivery", "10+ Years"],
        prod: { t: "Choose Your Bale Format", s: "Two formats. Full specs. Live stock. Direct order.", add: "Add to Order", l: { w: "Weight", dm: "Dry Matter %", m: "Moisture %", c: "Cut", h: "Harvest Date", wr: "Wrapping", pr: "Price", st: "Stock" } },
        price: { t: "Bulk Pricing — The More You Order, The More You Save", note: "* GST extra. Prices valid for current season stock. Call to confirm availability for orders above 100 bales.", rows: [["Pro 100kg", "1–11 bales", "₹950 / bale", "—"], ["Pro 100kg", "12–50 bales", "₹900 / bale", "Save ₹50/bale"], ["Pro 100kg", "51+ bales", "₹860 / bale", "Save ₹90/bale"], ["Max 700kg", "1–5 bales", "₹5,200 / bale", "—"], ["Max 700kg", "6–20 bales", "₹4,900 / bale", "Save ₹300/bale"], ["Max 700kg", "21+ bales", "₹4,600 / bale", "Save ₹600/bale"]], h: ["Bale Type", "Quantity", "Price", "Saving"] },
        stats: [{ l: "Farms", v: 500, s: "+" }, { l: "On-Time", v: 98, s: "%" }, { l: "Extra Milk/Day", v: 7, s: "L" }, { l: "Years", v: 10, s: "+" }],
        q: { t: "Every Batch Verified Before Dispatch.", s: "No vague claims. You get measurable feed quality that supports stable ration planning.", card: "Nutritional Breakdown", dl: "Download Lab Report (PDF)", i: [["Energy", "11.4 MJ/kg DM"], ["Protein", "8.9%"], ["Starch", "33.1%"], ["pH", "3.9"], ["DM", "35.0%"]] },
        how: { t: "Simple, Fast, Field-Ready", i: [["Share Need", "Tell us bale type and quantity."], ["Confirm Slot", "Get price, stock lock, and delivery window."], ["Receive & Feed", "Unload at farm and feed same day."]] },
        tes: { t: "Trusted by Progressive Farmers", i: [["Ramesh Patel", "Patel Dairy, Anand", "Delivery timing is exact. Milk response improved in one week."], ["Sandeep Yadav", "Balaji Farm, Alwar", "Specs match what was promised. No moisture surprises."], ["Manoj Chauhan", "Shiv Cattle Unit, Mehsana", "We shifted fully to 700kg bales. Operations are smoother now."]] },
        faq: { t: "Frequently Asked Questions", i: [["What is the minimum order?", "Minimum dispatch starts from 12 bales, based on route."], ["Can I schedule split deliveries?", "Yes. We stagger drop-offs to match your feed cycle."], ["100kg vs 700kg, what should I choose?", "100kg fits manual handling; 700kg suits bigger daily consumption."], ["Do you provide lab report for each lot?", "Yes, lot-linked nutritional summary is shared with each confirmed order."]] },
        form: { t: "Get in Touch. We'll Call You Back.", sub: "Fill the form and we'll get back to you within 2 hours. Or just tap WhatsApp below for an instant reply.", wa: "Chat Directly on WhatsApp", boxT: "Send Us Your Requirement", fname: "Your Name", fphone: "Phone Number", fvillage: "Village / Town", fbales: "How Many Bales?", fsel: "Select quantity", fmsg: "Any message (optional)", fsend: "Send Enquiry", ok: "✅ Sent! We'll call you back within 2 hours.", err: "Please fill in your name and phone number." },
        f: { t: "Links & Contact", tag: "Premium maize silage, direct to farms that care about consistency.", call: "Call: +91 97270 07431", mail: "Email: harshilbarot667@gmail.com", h: "Mon–Sat, 6:00 AM – 8:00 PM", c: "© 2026 SilageDirect. All rights reserved." }
      },
      hi: {
        nav: { home: "होम", products: "उत्पाद", about: "हमारे बारे में", contact: "संपर्क", cart: "कार्ट" },
        hero: { title: "प्रीमियम मकई साइलेज बेल। साफ पोषण, सही डिलीवरी।", sub: "गंभीर डेयरी किसानों के लिए फार्म-डायरेक्ट मकई साइलेज। स्थिर ड्राई मैटर, स्पष्ट लैब मान, और भरोसेमंद फार्म-गेट डिलीवरी।", cta1: "WhatsApp पर ऑर्डर करें", cta2: "उत्पाद देखें", price: "शुरुआत ₹950 प्रति बेल से।", badge: "ताज़ा कट। कसी रैप।", sideT: "उपज-केंद्रित फार्मों के लिए बना", sideP: "सेवन की स्थिरता, दूध प्रतिक्रिया और साफ स्टैक प्रबंधन के लिए।", labT: "इस बैच की लैब रिपोर्ट", labPreview: "रिपोर्ट देखें", labDownload: "PDF डाउनलोड करें", labModalT: "लैब रिपोर्ट प्रीव्यू", labNewTab: "नए टैब में खोलें" },
        trust: ["लैब परीक्षित", "सीधा फार्म", "GPS डिलीवरी", "10+ साल"],
        prod: { t: "अपना बेल फॉर्मेट चुनें", s: "दो फॉर्मेट। पूरी स्पेक। लाइव स्टॉक। सीधा ऑर्डर।", add: "कार्ट में जोड़ें", l: { w: "वज़न", dm: "ड्राई मैटर %", m: "नमी %", c: "कट", h: "कटाई तारीख", wr: "रैपिंग", pr: "कीमत", st: "स्टॉक" } },
        price: { t: "बल्क प्राइसिंग — जितना ज़्यादा ऑर्डर, उतनी बचत", note: "* GST अलग। कीमतें मौजूदा सीज़न स्टॉक के लिए।", rows: [["Pro 100kg", "1–11 बेल", "₹950 / बेल", "—"], ["Pro 100kg", "12–50 बेल", "₹900 / बेल", "₹50/बेल बचत"], ["Pro 100kg", "51+ बेल", "₹860 / बेल", "₹90/बेल बचत"], ["Max 700kg", "1–5 बेल", "₹5,200 / बेल", "—"], ["Max 700kg", "6–20 बेल", "₹4,900 / बेल", "₹300/बेल बचत"], ["Max 700kg", "21+ बेल", "₹4,600 / बेल", "₹600/बेल बचत"]], h: ["बेल प्रकार", "मात्रा", "कीमत", "बचत"] },
        stats: [{ l: "फार्म", v: 500, s: "+" }, { l: "समय पर", v: 98, s: "%" }, { l: "अतिरिक्त दूध/दिन", v: 7, s: "L" }, { l: "साल", v: 10, s: "+" }],
        q: { t: "हर बैच डिस्पैच से पहले वेरिफाइड।", s: "कोई अस्पष्ट दावे नहीं। आपको मापने योग्य फीड क्वालिटी मिलती है।", card: "पोषण विवरण", dl: "लैब रिपोर्ट डाउनलोड करें (PDF)", i: [["ऊर्जा", "11.4 MJ/kg DM"], ["प्रोटीन", "8.9%"], ["स्टार्च", "33.1%"], ["pH", "3.9"], ["DM", "35.0%"]] },
        how: { t: "सरल, तेज़, फील्ड-रेडी", i: [["ज़रूरत बताएं", "बेल प्रकार और मात्रा बताएं।"], ["स्लॉट कन्फर्म करें", "कीमत, स्टॉक लॉक और डिलीवरी विंडो पाएं।"], ["प्राप्त करें और खिलाएं", "फार्म पर उतारें और उसी दिन खिलाएं।"]] },
        tes: { t: "प्रगतिशील किसानों का भरोसा", i: [["रमेश पटेल", "पटेल डेयरी, आनंद", "डिलीवरी समय बिल्कुल सही। एक हफ्ते में दूध उत्पादन बेहतर हुआ।"], ["संदीप यादव", "बालाजी फार्म, अलवर", "स्पेक्स वैसे ही मिले जैसे वादा था। नमी में कोई चौंक नहीं।"], ["मनोज चौहान", "शिव कैटल यूनिट, मेहसाणा", "हम पूरी तरह 700kg बेल पर शिफ्ट हो गए। काम आसान हो गया।"]] },
        faq: { t: "अक्सर पूछे जाने वाले सवाल", i: [["न्यूनतम ऑर्डर क्या है?", "न्यूनतम डिस्पैच 12 बेल से शुरू होता है, रूट के आधार पर।"], ["क्या मैं स्प्लिट डिलीवरी शेड्यूल कर सकता हूं?", "हाँ। हम आपके फीड साइकिल के अनुसार डिलीवरी करते हैं।"], ["100kg या 700kg, क्या चुनूं?", "100kg मैनुअल हैंडलिंग के लिए; 700kg बड़ी दैनिक खपत के लिए।"], ["क्या हर लॉट के लिए लैब रिपोर्ट मिलती है?", "हाँ, हर कन्फर्म्ड ऑर्डर के साथ लॉट-लिंक्ड रिपोर्ट शेयर की जाती है।"]] },
        form: { t: "संपर्क करें। हम कॉल करेंगे।", sub: "फॉर्म भरें और हम 2 घंटे में वापस आएंगे। या नीचे WhatsApp टैप करें।", wa: "WhatsApp पर सीधे चैट करें", boxT: "अपनी ज़रूरत भेजें", fname: "आपका नाम", fphone: "फोन नंबर", fvillage: "गाँव / शहर", fbales: "कितनी बेल चाहिए?", fsel: "मात्रा चुनें", fmsg: "कोई संदेश (वैकल्पिक)", fsend: "एन्क्वायरी भेजें", ok: "✅ भेज दिया! हम 2 घंटे में कॉल करेंगे।", err: "कृपया नाम और फोन नंबर भरें।" },
        f: { t: "लिंक्स और संपर्क", tag: "स्थिरता को प्राथमिकता देने वाले फार्म के लिए प्रीमियम मकई साइलेज।", call: "कॉल: +91 97270 07431", mail: "ईमेल: harshilbarot667@gmail.com", h: "सोम–शनि, सुबह 6:00 – रात 8:00", c: "© 2026 SilageDirect. सर्वाधिकार सुरक्षित।" }
      },
      gu: {
        nav: { home: "હોમ", products: "ઉત્પાદનો", about: "અમારા વિશે", contact: "સંપર્ક", cart: "કાર્ટ" },
        hero: { title: "પ્રીમિયમ મકાઈ સાઈલેજ બેલ. સ્વચ્છ પોષણ, સાચી ડિલિવરી.", sub: "ગંભીર ડેરી ખેડૂતો માટે ફાર્મ-ડાયરેક્ટ મકાઈ સાઈલેજ. સ્થિર ડ્રાય મેટર, સ્પષ્ટ લેબ મૂલ્યો અને ભરોસાપાત્ર ફાર્મ-ગેટ ડિલિવરી.", cta1: "WhatsApp પર ઓર્ડર કરો", cta2: "ઉત્પાદનો જુઓ", price: "શરૂઆત ₹950 પ્રતિ બેલ.", badge: "તાજું કટ. ચુસ્ત રેપ.", sideT: "ઉત્પાદન-કેન્દ્રિત ફાર્મો માટે", sideP: "સેવન સ્થિરતા, દૂધ પ્રતિભાવ અને સ્વચ્છ સ્ટેક વ્યવસ્થાપન માટે.", labT: "આ બેચ માટે લેબ રિપોર્ટ", labPreview: "રિપોર્ટ જુઓ", labDownload: "PDF ડાઉનલોડ કરો", labModalT: "લેબ રિપોર્ટ પ્રિવ્યુ", labNewTab: "નવા ટેબમાં ખોલો" },
        trust: ["લેબ પરીક્ષિત", "સીધું ફાર્મ", "GPS ડિલિવરી", "10+ વર્ષ"],
        prod: { t: "તમારું બેલ ફોર્મેટ પસંદ કરો", s: "બે ફોર્મેટ. સંપૂર્ણ સ્પેક. લાઈવ સ્ટોક. સીધો ઓર્ડર.", add: "કાર્ટમાં ઉમેરો", l: { w: "વજન", dm: "ડ્રાય મેટર %", m: "ભેજ %", c: "કટ", h: "લણણી તારીખ", wr: "રેપિંગ", pr: "કિંમત", st: "સ્ટોક" } },
        price: { t: "બલ્ક પ્રાઈસિંગ — જેટલો વધુ ઓર્ડર, તેટલી બચત", note: "* GST અલગ. કિંમતો વર્તમાન સિઝન સ્ટોક માટે.", rows: [["Pro 100kg", "1–11 બેલ", "₹950 / બેલ", "—"], ["Pro 100kg", "12–50 બેલ", "₹900 / બેલ", "₹50/બેલ બચત"], ["Pro 100kg", "51+ બેલ", "₹860 / બેલ", "₹90/બેલ બચત"], ["Max 700kg", "1–5 બેલ", "₹5,200 / બેલ", "—"], ["Max 700kg", "6–20 બેલ", "₹4,900 / બેલ", "₹300/બેલ બચત"], ["Max 700kg", "21+ બેલ", "₹4,600 / બેલ", "₹600/બેલ બચત"]], h: ["બેલ પ્રકાર", "જથ્થો", "કિંમત", "બચત"] },
        stats: [{ l: "ફાર્મ", v: 500, s: "+" }, { l: "સમયસર", v: 98, s: "%" }, { l: "વધારાનું દૂધ/દિવસ", v: 7, s: "L" }, { l: "વર્ષ", v: 10, s: "+" }],
        q: { t: "દરેક બેચ ડિસ્પેચ પહેલા ચકાસાયેલ.", s: "કોઈ અસ્પષ્ટ દાવા નહીં. માપી શકાય તેવી ફીડ ગુણવત્તા.", card: "પોષણ વિગત", dl: "લેબ રિપોર્ટ ડાઉનલોડ કરો (PDF)", i: [["ઊર્જા", "11.4 MJ/kg DM"], ["પ્રોટીન", "8.9%"], ["સ્ટાર્ચ", "33.1%"], ["pH", "3.9"], ["DM", "35.0%"]] },
        how: { t: "સરળ, ઝડપી, ફીલ્ડ-રેડી", i: [["જરૂર જણાવો", "બેલ પ્રકાર અને જથ્થો જણાવો."], ["સ્લોટ કન્ફર્મ કરો", "કિંમત, સ્ટોક લોક અને ડિલિવરી વિન્ડો મેળવો."], ["મેળવો અને ખવડાવો", "ફાર્મ પર ઉતારો અને તે જ દિવસે ખવડાવો."]] },
        tes: { t: "પ્રગતિશીલ ખેડૂતો દ્વારા વિશ્વાસપાત્ર", i: [["રમેશ પટેલ", "પટેલ ડેરી, આણંદ", "ડિલિવરી સમય એકદમ સચોટ. એક અઠવાડિયામાં દૂધ ઉત્પાદન સુધર્યું."], ["સંદીપ યાદવ", "બાલાજી ફાર્મ, અલ્વર", "સ્પેક્સ વચન મુજબ. ભેજમાં કોઈ આશ્ચર્ય નહીં."], ["મનોજ ચૌહાણ", "શિવ કેટલ યુનિટ, મહેસાણા", "અમે સંપૂર્ણ 700kg બેલ પર શિફ્ટ થઈ ગયા. ઓપરેશન સરળ થઈ ગયું."]] },
        faq: { t: "વારંવાર પૂછાતા પ્રશ્નો", i: [["લઘુત્તમ ઓર્ડર શું છે?", "લઘુત્તમ ડિસ્પેચ 12 બેલથી શરૂ થાય છે, રૂટ પ્રમાણે."], ["શું હું સ્પ્લિટ ડિલિવરી શેડ્યૂલ કરી શકું?", "હા. અમે તમારા ફીડ સાઈકલ અનુસાર ડિલિવરી ગોઠવીએ છીએ."], ["100kg કે 700kg, શું પસંદ કરું?", "100kg મેન્યુઅલ હેન્ડલિંગ માટે; 700kg મોટી દૈનિક વપરાશ માટે."], ["શું દરેક લોટ માટે લેબ રિપોર્ટ મળે છે?", "હા, દરેક કન્ફર્મ્ડ ઓર્ડર સાથે લોટ-લિંક્ડ રિપોર્ટ શેર થાય છે."]] },
        form: { t: "સંપર્ક કરો. અમે કૉલ કરીશું.", sub: "ફોર્મ ભરો અને અમે 2 કલાકમાં પાછા આવીશું. અથવા નીચે WhatsApp ટૅપ કરો.", wa: "WhatsApp પર સીધી ચેટ કરો", boxT: "તમારી જરૂરિયાત મોકલો", fname: "તમારું નામ", fphone: "ફોન નંબર", fvillage: "ગામ / શહેર", fbales: "કેટલા બેલ જોઈએ?", fsel: "જથ્થો પસંદ કરો", fmsg: "કોઈ સંદેશ (વૈકલ્પિક)", fsend: "પૂછપરછ મોકલો", ok: "✅ મોકલ્યું! અમે 2 કલાકમાં કૉલ કરીશું.", err: "કૃપા કરીને નામ અને ફોન નંબર ભરો." },
        f: { t: "લિંક્સ અને સંપર્ક", tag: "સ્થિરતાને પ્રાધાન્ય આપતા ફાર્મો માટે પ્રીમિયમ મકાઈ સાઈલેજ.", call: "કૉલ: +91 97270 07431", mail: "ઈમેઈલ: harshilbarot667@gmail.com", h: "સોમ–શનિ, સવારે 6:00 – રાત્રે 8:00", c: "© 2026 SilageDirect. બધા અધિકારો સુરક્ષિત." }
      }
    };

    const data = [{ n: "Pro 100", img: "images/Hand.png", w: "100 kg", dm: "34.8%", m: "65.2%", c: "Cut 2", h: "18 Sep 2025", wr: "6 Layers", p: 950, s: 240 }, { n: "Max 700", img: "images/Bale.png", w: "700 kg", dm: "35.1%", m: "64.9%", c: "Cut 2", h: "22 Sep 2025", wr: "8 Layers", p: 5200, s: 84 }];
    let lang = getSavedLang(), cart = 0, counted = false;
    const app = document.getElementById("app"), hdr = document.getElementById("hdr");
    const G = (p) => p.split(".").reduce((a, k) => a?.[k], t[lang]);

    function initMobileNav() {
      const toggle = document.getElementById("nav-toggle");
      const menu = document.getElementById("mobile-nav");
      if (!toggle || !menu) return;
      const close = () => { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false") };
      toggle.onclick = () => {
        const open = !menu.classList.contains("open");
        menu.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
      };
      menu.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
      window.addEventListener("resize", () => { if (window.innerWidth > 980) close() });
    }

    function initLabModal() {
      const btn = document.getElementById("lab-preview-btn");
      const modal = document.getElementById("lab-modal");
      const close = document.getElementById("lab-close");
      if (!btn || !modal || !close) return;
      const open = () => {
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      };
      const shut = () => {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      };
      btn.addEventListener("click", open);
      close.addEventListener("click", shut);
      modal.addEventListener("click", (e) => { if (e.target === modal) shut() });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("open")) shut();
      });
    }

    function fillStatic() { document.querySelectorAll("[data-i18n]").forEach(e => { const v = G(e.dataset.i18n); if (typeof v === "string") e.textContent = v }) }
    function trust() { const arr = [...t[lang].trust, ...t[lang].trust]; document.getElementById("trust").innerHTML = arr.map(i => `<span class=t><b>★</b> ${i}</span>`).join("") }
    function products() { const L = t[lang].prod.l; document.getElementById("productsGrid").innerHTML = data.map((d, i) => `<article class=card><img class=card-img src="${d.img}" alt="${d.n}"><div class=ph><h3>${d.n}</h3><span class=stock>${L.st}: ${d.s}</span></div><div class=specs><div class=spec><b>${L.w}</b><span>${d.w}</span></div><div class=spec><b>${L.dm}</b><span>${d.dm}</span></div><div class=spec><b>${L.m}</b><span>${d.m}</span></div><div class=spec><b>${L.c}</b><span>${d.c}</span></div><div class=spec><b>${L.h}</b><span>${d.h}</span></div><div class=spec><b>${L.wr}</b><span>${d.wr}</span></div></div><div class=row><div><small>${L.pr}</small><div class=p>₹${d.p.toLocaleString("en-IN")}</div></div><button class="btn primary add" data-i=${i} ${d.s ? "" : "disabled"}>${t[lang].prod.add}<span class=ar>→</span></button></div></article>`).join(""); document.querySelectorAll(".add").forEach(b => b.onclick = () => { const i = +b.dataset.i; if (!data[i].s) return; addToCart({ name: data[i].n, weight: data[i].w, price: data[i].p }); data[i].s--; updateCartBadge(); products() }) }
    function pricing() { const pd = t[lang].price; const tbl = document.getElementById("pricingTable"); tbl.innerHTML = `<thead><tr>${pd.h.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${pd.rows.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td class=hi>${r[2]}</td><td style="color:${r[3] === '—' ? 'var(--muted)' : 'var(--lime)'}">${r[3]}</td></tr>`).join("")}</tbody>`; }
    function stats() { document.getElementById("stats").innerHTML = t[lang].stats.map(s => `<article class=s><div class=sv data-v=${s.v} data-s="${s.s}">0${s.s}</div><div class=sl>${s.l}</div></article>`).join("") }
    function countStats() { if (counted) return; counted = true; document.querySelectorAll(".sv").forEach(el => { const v = +el.dataset.v, s = el.dataset.s, st = performance.now(), dur = 1300; const run = n => { const p = Math.min(1, (n - st) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.floor(v * e) + s; if (p < 1) requestAnimationFrame(run) }; requestAnimationFrame(run) }) }
    function lab() { document.getElementById("lab").innerHTML = t[lang].q.i.map(r => `<div class=lr><span>${r[0]}</span><strong>${r[1]}</strong></div>`).join("") }
    function how() { document.getElementById("steps").innerHTML = t[lang].how.i.map((s, i) => `<article class=step><div class=n>${i + 1}</div><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join("") }
    function tes() { const pics = ["images/ChatGPT Image Mar 4, 2026, 04_58_16 PM.png", "images/Hand.png", "images/Bale.png"]; document.getElementById("tes").innerHTML = t[lang].tes.i.map((v, i) => `<article class=tc><img class=face src="${pics[i % pics.length]}" alt="${v[0]} farm"><div class=st>★★★★★</div><q>${v[2]}</q><div class=meta><strong>${v[0]}</strong><br>${v[1]}</div></article>`).join("") }
    function faq() { const box = document.getElementById("faq"); box.innerHTML = t[lang].faq.i.map(v => `<article class=fi><button class=fq type=button><span>${v[0]}</span><span class=plus>+</span></button><div class=fa>${v[1]}</div></article>`).join(""); box.querySelectorAll(".fi").forEach(it => { it.querySelector(".fq").onclick = () => { const o = it.classList.contains("open"); box.querySelectorAll(".fi").forEach(x => { x.classList.remove("open"); x.querySelector(".plus").textContent = "+" }); if (!o) { it.classList.add("open"); it.querySelector(".plus").textContent = "-" } } }) }
    function updateWALinks() { const msg = encodeURIComponent(lang === "hi" ? "नमस्ते, मुझे मकई साइलेज बेल ऑर्डर करना है।" : lang === "gu" ? "નમસ્તે, મને મકાઈ સાઈલેજ બેલ ઓર્ડર કરવા છે." : "Hi, I want to order maize silage bales."); const base = `https://wa.me/919727007431?text=${msg}`; document.querySelectorAll("#wa-float-link,#hero-wa,#wa-direct-link").forEach(el => el.href = base); const tip = document.getElementById("wa-tip"); if (tip) tip.textContent = lang === "hi" ? "WhatsApp पर चैट करें" : lang === "gu" ? "WhatsApp પર ચેટ કરો" : "Chat on WhatsApp"; }

    document.getElementById("f-submit").onclick = () => {
      const name = document.getElementById("f-name").value.trim();
      const phone = document.getElementById("f-phone").value.trim();
      const village = document.getElementById("f-village").value.trim();
      const bales = document.getElementById("f-bales").value;
      const msg = document.getElementById("f-msg").value.trim();
      const status = document.getElementById("f-msg-status");
      if (!name || !phone) { status.className = "form-msg error"; status.textContent = t[lang].form.err; return }
      const waMsg = encodeURIComponent(`New Enquiry from SilageDirect website:\nName: ${name}\nPhone: ${phone}\nVillage: ${village || "—"}\nBales Needed: ${bales || "—"}\nMessage: ${msg || "—"}`);
      window.open(`https://wa.me/919727007431?text=${waMsg}`, "_blank");
      status.className = "form-msg success"; status.textContent = t[lang].form.ok;
      document.getElementById("f-name").value = ""; document.getElementById("f-phone").value = ""; document.getElementById("f-village").value = ""; document.getElementById("f-bales").value = ""; document.getElementById("f-msg").value = "";
    };

    function render() { fillStatic(); trust(); products(); pricing(); stats(); lab(); how(); tes(); faq(); updateWALinks(); counted = false }
    function setLang(l) { lang = l; saveLang(l); applyLang(l); app.classList.add("fade"); setTimeout(() => { render(); updateLangButtons(l); app.classList.remove("fade") }, 150) }
    document.getElementById("lang").onclick = () => { const c = ["en", "hi", "gu"]; setLang(c[(c.indexOf(lang) + 1) % 3]) };
    window.onscroll = () => hdr.classList.toggle("scrolled", scrollY > 12);
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); if (e.target.classList.contains("stats")) countStats() } }), { threshold: .18 });
    document.querySelectorAll(".reveal").forEach(e => io.observe(e));
    initMobileNav();
    initLabModal();
    applyLang(lang);
    updateLangButtons(lang);
    render();

    // ── Corn Parallax Effect ───────────────────────
    // LEARNING: We use requestAnimationFrame + scroll
    // for smooth 60fps animation. transform: translate()
    // is GPU-accelerated — much better than changing
    // top/left positions which causes layout reflow.

    (function initCornParallax() {
      const cornTR = document.querySelector(".corn-tr");
      const cornBL = document.querySelector(".corn-bl");

      if (!cornTR && !cornBL) return; // exit if corn not found

      // Check if user prefers reduced motion (accessibility)
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      // Check if mobile — use lighter effect on mobile
      const isMobile = () => window.innerWidth < 980;

      let ticking = false;
      let lastScrollY = 0;

      function updateParallax() {
        const scrollY = window.scrollY;

        // Only animate while hero is in view
        // Hero is roughly 0 to window.innerHeight
        if (scrollY > window.innerHeight * 1.2) {
          ticking = false;
          return;
        }

        // Parallax multipliers
        // Higher = more movement. Keep subtle for "balance both" mode.
        const speedTR = isMobile() ? 0.12 : 0.18; // top-right corn
        const speedBL = isMobile() ? 0.06 : 0.10; // bottom-left corn (subtler)

        // Top-right corn: drifts up and slightly right as user scrolls down
        if (cornTR) {
          const yTR = -(scrollY * speedTR);
          const xTR = scrollY * (speedTR * 0.3);
          cornTR.style.transform = `translate(${xTR}px, ${yTR}px)`;
        }

        // Bottom-left corn: drifts down and slightly left
        if (cornBL) {
          const yBL = scrollY * speedBL;
          const xBL = -(scrollY * (speedBL * 0.4));
          cornBL.style.transform = `translate(${xBL}px, ${yBL}px)`;
        }

        ticking = false;
      }

      // Use requestAnimationFrame for smooth 60fps
      // LEARNING: ticking prevents multiple RAF calls
      // per scroll event — only one frame update at a time
      window.addEventListener("scroll", () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }, { passive: true });

      // Run once on load to set initial position
      updateParallax();
    })();

