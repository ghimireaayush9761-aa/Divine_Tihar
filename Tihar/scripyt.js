'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
let lang='en', day=0;
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;

const UI={en:{nav1:'The Five Days',nav2:'Make It Special',nav3:'Deusi-Bhailo',nav4:'Gallery',nav5:'Culture',tag:'Five Days. Endless Traditions. One Beautiful Celebration.',h1b:'THE FESTIVAL OF LIGHTS',sub:'Tihar honours crows, dogs, cows, oxen and the bond of brothers and sisters. Lamps are lit so light can drive out darkness from every home.',enter:'ENTER THE CELEBRATION',jt:'The Five-Day Journey',prev:'← Previous',next:'Next →',st:'How to Make Every Day Special',dt:'Deusi-Bhailo',gt:'Gallery of Light',ct:'Nepali Culture & Tradition',fq:'Crafted with love, culture, and creativity.',fw:'Shubha Deepawali — may your home glow with joy.',lbl:['Significance & why','Worshipped','Puja materials','Procedure','How families celebrate','Make it special','Did you know?'],lang:'नेपाली',all:'All',tikaH:'Try the tika ceremony: tap each colour',tikaDone:'Beyond the colors of tika and the beauty of flowers, Bhai Tika celebrates a bond that lasts a lifetime.',play:'Open the player and press play to begin.',noaudio:'Audio is not supported in this browser.'},
ne:{nav1:'पाँच दिन',nav2:'विशेष बनाऔँ',nav3:'देउसी-भैलो',nav4:'ग्यालरी',nav5:'संस्कृति',tag:'पाँच दिन। अनगिन्ती परम्परा। एउटै सुन्दर उत्सव।',h1b:'ज्योतिको पर्व',sub:'तिहारले कागकुकुर, गाई, गोरु र दाजुभाइ–दिदीबहिनीको सम्बन्धलाई सम्मान गर्छ। हरेक घरबाट अन्धकार हटाउन दीप बालिन्छ।',enter:'उत्सवमा प्रवेश गर्नुहोस्',jt:'पाँच दिनको यात्रा',prev:'← अघिल्लो',next:'अर्को →',st:'हरेक दिनलाई विशेष बनाऔँ',dt:'देउसी-भैलो',gt:'ज्योतिको ग्यालरी',ct:'नेपाली संस्कृति र परम्परा',fq:'माया, संस्कृति र सिर्जनशीलताका साथ तयार पारिएको।',fw:'शुभ दीपावली — तपाईंको घर खुशीले झलमल होस्।',lbl:['महत्व र किन मनाइन्छ','पूजा गरिने','पूजा सामग्री','पूजा विधि','परिवारले कसरी मनाउँछन्','विशेष बनाउने तरिका','के तपाईंलाई थाहा छ?'],lang:'English',all:'सबै',tikaH:'टीका लगाउने प्रयास गर्नुहोस्: रङ थिच्नुहोस्',tikaDone:'टीकाका रङ र फूलको सुन्दरताभन्दा पर, भाइटीकाले जीवनभर टिक्ने सम्बन्धको उत्सव मनाउँछ।',play:'प्लेयर खोलेर प्ले थिच्नुहोस्।',noaudio:'यो ब्राउजरमा अडियो समर्थित छैन।'}};

const DAYS=[
{e:'🐦‍⬛',c:'#2b1b3a',en:{n:'Day 1 — Kaag Tihar',t:'Crow worship',w:'Crows, regarded as messengers of Yama, the god of death.',s:'Crows are seen as messengers; cawing near a home is said to signal news or sorrow. Offering food is a prayer for peace and for the family to be spared grief. This is a religious belief and folk tradition.',m:'Sel roti or rice, sweets, a leaf plate, tika, flowers, a lit lamp.',p:['Clean a spot on the roof or courtyard.','Place food on leaf plates.','Offer a little tika and flowers.','Call softly and pray for peace.'],c:'Families offer sweets and grains at dawn. Keep offerings natural and avoid plastic or salty foods.',k:'Feed birds gently, keep water out for them, and never frighten or harm any bird.',f:'Different communities place the offering at different times and places.'},ne:{n:'पहिलो दिन — काग तिहार',t:'काग पूजा',w:'यमराजका दूत मानिने काग।',s:'काकलाई दूत मानिन्छ; घरनजिक काग कराउनु समाचार वा शोकको संकेत ठानिन्छ। खाना चढाउनु शान्ति र शोकबाट बच्ने प्रार्थना हो। यो धार्मिक विश्वास र लोक परम्परा हो।',m:'सेल रोटी वा भात, मिठाई, पातको थाल, टीका, फूल, दियो।',p:['छत वा आँगनको ठाउँ सफा गर्नुहोस्।','पातमा खाना राख्नुहोस्।','अलिकति टीका र फूल चढाउनुहोस्।','विस्तारै बोलाएर शान्तिको प्रार्थना गर्नुहोस्।'],c:'बिहानै परिवारले मिठाई र अन्न चढाउँछन्। प्लास्टिक र धेरै नुनिलो खाना नचढाऔँ।',k:'चराहरूलाई पानी राखिदिऔँ, कसैलाई नडराऔँ र हानि नगरौँ।',f:'समुदायअनुसार चढाउने समय र ठाउँ फरक हुन्छ।'}},
{e:'🐕',c:'#3a2b12',en:{n:'Day 2 — Kukur Tihar',t:'Dog worship',w:'Dogs, companions of Bhairava and guardians of the home; also linked with Yama’s watchdogs.',s:'Dogs are honoured for loyalty, protection and friendship. The day thanks them and reminds us that kindness to animals is a duty.',m:'Marigold garland, tika, tasty food (egg, milk, meat or rice), a lit lamp.',p:['Wash and gently groom the dog.','Place a marigold garland around its neck.','Apply tika on the forehead.','Offer food with kind words.'],c:'Families, and many neighbourhoods, honour stray dogs too with garlands and food.',k:'Use soft hands, avoid loud firecrackers, and give strays safe food and shelter.',f:'Some communities also remember it with Nepali folk rituals of their own.'},ne:{n:'दोस्रो दिन — कुकुर तिहार',t:'कुकुर पूजा',w:'भैरवका साथी र घरका रक्षक मानिने कुकुर; यमका रक्षकसँग पनि जोडिन्छ।',s:'वफादारी, सुरक्षा र मित्रताका लागि कुकुरलाई सम्मान गरिन्छ। यो दिनले जनावरप्रति दया देखाउने कर्तव्य सम्झाउँछ।',m:'सयपत्री माला, टीका, मिठो खाना, दियो।',p:['कुकुरलाई नुहाई विस्तारै सजाउनुहोस्।','सयपत्री माला लगाइदिनुहोस्।','निधारमा टीका लगाउनुहोस्।','माया र खानासहित पुजा गर्नुहोस्।'],c:'परिवार र धेरै टोलले सडकका कुकुरलाई पनि माला र खाना दिन्छन्।',k:'कोमल व्यवहार गरौँ, ठूलो पटाका नफोरौँ, सडकका कुकुरलाई सुरक्षित खाना र आश्रय दिऔँ।',f:'केही समुदायमा आफ्नै लोक रीतिरिवाज पनि हुन्छन्।'}},
{e:'🪔',c:'#5a1a0a',en:{n:'Day 3 — Gai Tihar & Laxmi Puja',t:'Cow and the Goddess of wealth',w:'Cow (Gau Mata) in the morning; Goddess Laxmi in the evening.',s:'The cow gives milk and is a symbol of Laxmi in Hindu belief. Homes are cleaned and lit so that the goddess of prosperity may enter.',m:'Marigold garlands, grass, tika, lamps and candles, rangoli colours, rice, fruit, sweets, a coin or money, incense.',p:['Clean and decorate the house and shop.','Honour the cow with garland, tika and grass.','Draw rangoli and little footprints from the door inward.','Light lamps at every door and window.','In the evening, offer flowers, fruit and incense to Laxmi and pray.'],c:'Neighbourhoods glow with lamps; children go Bhailo singing at night. Sweet dishes like sel roti are shared.',k:'Use clay diyas and natural colour for rangoli, and share some sweets with a neighbour in need.',f:'The footprints point inward to show the goddess is welcome.'},ne:{n:'तेस्रो दिन — गाई तिहार तथा लक्ष्मी पूजा',t:'गाई र धनकी देवी',w:'बिहान गाई (गौमाता); साँझ लक्ष्मी देवी।',s:'गाईले दूध दिन्छ र हिन्दू विश्वासमा लक्ष्मीको प्रतीक हो। समृद्धिकी देवी भित्र आऊन् भनेर घर सफा गरी बत्ती बालिन्छ।',m:'सयपत्री माला, घाँस, टीका, दियो–बत्ती, रङ्गोली रङ, चामल, फलफूल, मिठाई, सिक्का, धूप।',p:['घर र पसल सफा गरेर सजाउनुहोस्।','गाईलाई माला, टीका र घाँस दिनुहोस्।','ढोकादेखि भित्रसम्म रङ्गोली र पाइला बनाउनुहोस्।','ढोका र झ्यालमा दियो बाल्नुहोस्।','साँझ लक्ष्मीलाई फूल, फल र धूप चढाएर प्रार्थना गर्नुहोस्।'],c:'टोल झलमल हुन्छ; राति केटाकेटी भैलो खेल्छन्। सेल रोटी जस्ता परिकार बाँडिन्छ।',k:'माटाका दियो र प्राकृतिक रङ प्रयोग गरौँ, अनि खाँचोमा परेको छिमेकीसँग मिठाई बाँडौँ।',f:'पाइला भित्रतिर देखाइन्छ — देवीलाई स्वागत छ भनेर।'}},
{e:'🐂',c:'#2a2a0f',en:{n:'Day 4 — Govardhan / Goru Tihar / Mha Puja',t:'Three traditions of one day',w:'Govardhan mountain and Krishna; oxen (Goru); and the self (Mha) in Newar culture.',s:'Govardhan Puja recalls Krishna lifting Govardhan hill to protect villagers. Goru Tihar honours oxen that plough the fields. Mha Puja, among Newars, is worship of one’s own body and soul, and marks the Nepal Sambat new year.',m:'Govardhan: cow-dung hill, flowers, rice. Goru: tika, garland, grass, grains. Mha: mandala, lamps, fruit, sagun, feast.',p:['Govardhan: make a small hill, offer flowers and food.','Goru: garland, tika and feed the oxen.','Mha: draw a mandala; each person is blessed by family.'],c:'Feasts, family gatherings and for Newars, the colourful Mha Puja procession and feast.',k:'Visit the family farm or care for working animals; share a meal with the elders.',f:'Exact dates and observances vary by community and by year — not every region does all three.'},ne:{n:'चौथो दिन — गोवर्धन / गोरु तिहार / म्ह पूजा',t:'एकै दिनका तीन परम्परा',w:'गोवर्धन पर्वत र कृष्ण; गोरु; र नेवार संस्कृतिमा आफ्नो आत्मा (म्ह)।',s:'गोवर्धन पूजाले कृष्णले गोवर्धन पर्वत उठाएर गाउँलेलाई जोगाएको सम्झन्छ। गोरु तिहारमा खेत जोत्ने गोरुलाई सम्मान गरिन्छ। नेवारहरूमा म्ह पूजा आफ्नै शरीर र आत्माको पूजा हो र नेपाल संवत् नयाँ वर्ष पनि हो।',m:'गोवर्धन: गोबरको डाँडा, फूल, चामल। गोरु: टीका, माला, घाँस, अन्न। म्ह: मण्डल, दियो, फलफूल, सगुन, भोज।',p:['गोवर्धन: सानो डाँडा बनाई फूल र खाना चढाउनुहोस्।','गोरु: माला, टीका र खुवाउनुहोस्।','म्ह: मण्डल बनाउनुहोस्; परिवारले हरेकलाई आशीर्वाद दिन्छ।'],c:'भोज, पारिवारिक भेला, र नेवारहरूमा रंगीन म्ह पूजा तथा भोज।',k:'खेतबारी गई काम गर्ने जनावरको हेरचाह गरौँ; ज्येष्ठ नागरिकसँग भोजन गरौँ।',f:'मिति र रीति समुदाय र वर्षअनुसार फरक पर्छ — सबै ठाउँमा तीनवटै हुँदैनन्।'}},
{e:'🧑‍🤝‍🧑',c:'#4a0f2a',en:{n:'Day 5 — Bhai Tika',t:'Sisters bless brothers',w:'Yama, Yamuna and the brother–sister bond.',s:'In the story, Yamuna invited her brother Yama and applied tika, garlanded him and prayed for his long life; he blessed all brothers who receive tika from sisters. Seven colours are used in many Nepali traditions.',m:'Seven-colour tika, marigold and makhamali garlands, oil lamp, sweets, fruit, nuts, rice, dry fruits, gifts.',p:['Sister prepares the thali with tika, flowers and lamps.','Brother sits facing her on a clean mat.','She draws a line of oil around him and prays for his long life.','Seven-colour tika is applied; a garland is placed.','She gives sweets and nuts; he gives a gift and blessings.'],c:'Siblings eat a family feast; gifts, hugs and long calls from those far away.',k:'Write a note, call the sibling who is abroad, and honour cousins too.',f:'Practices differ across families and communities.'},ne:{n:'पाँचौँ दिन — भाइटीका',t:'बहिनीले भाइलाई आशीर्वाद',w:'यम, यमुना र दाजुभाइ–दिदीबहिनीको सम्बन्ध।',s:'कथामा यमुनाले दाजु यमराजलाई बोलाई टीका र माला लगाइदिई दीर्घायुको प्रार्थना गरिन्; यमराजले बहिनीबाट टीका लगाउने सबै दाजुभाइलाई आशीर्वाद दिए। धेरै नेपाली परम्परामा सात रंगको टीका लगाइन्छ।',m:'सात रङको टीका, सयपत्री र मखमली माला, तेलको दियो, मिठाई, फलफूल, मेवा, चामल, उपहार।',p:['बहिनीले टीका, फूल र दियोसहित थाली तयार गर्छिन्।','भाइ सफा आसनमा अगाडि बस्छ।','तेलको धर्सो तानी दीर्घायुको प्रार्थना गर्छिन्।','सात रङको टीका र माला लगाइदिन्छिन्।','बहिनीले मिठाई दिन्छिन्; भाइले उपहार र आशीर्वाद दिन्छ।'],c:'परिवारसँग भोज, उपहार, अँगालो र टाढाबाट फोन।',k:'चिठी लेखौँ, विदेशमा रहेका दाजुभाइलाई फोन गरौँ र चचेरा दाजुभाइलाई पनि सम्मान गरौँ।',f:'परिवार र समुदायअनुसार रीति फरक हुन्छ।'}}
];
const TIKA=[['#d62828','Red','रातो'],['#f4d03f','Yellow','पहेँलो'],['#2e8b57','Green','हरियो'],['#2a62c9','Blue','निलो'],['#f5f5f5','White','सेतो'],['#f28c28','Orange','सुन्तला'],['#7b3fa0','Purple','बैजनी']];
const IDEAS={en:[['Home','Decorate with clay diyas and marigolds; make natural rangoli.'],['Food','Cook sel roti, anarasa and festive dishes together.'],['Family','Visit relatives, exchange blessings and take family photos.'],['Animals','Care for crows, dogs, cows and oxen with kindness.'],['Deusi-Bhailo','Join the singing; keep it respectful and friendly.'],['Giving','Share food or clothes with someone who needs support.'],['Kids','Make a paper-lamp craft; learn a Tihar story.'],['Green Tihar','Skip loud firecrackers and plastic; choose reusable decor.']],ne:[['घर','माटाका दियो र सयपत्रीले सजाऔँ; प्राकृतिक रङ्गोली बनाऔँ।'],['खाना','सेल रोटी, अनरसा र परिकार सँगै पकाऔँ।'],['परिवार','आफन्तकहाँ जाऔँ, आशीर्वाद लेऔँ र फोटो खिचौँ।'],['जनावर','काग, कुकुर, गाई–गोरुलाई माया गरौँ।'],['देउसी–भैलो','सहभागी भई सम्मानजनक रूपमा गाऔँ।'],['दान','खाँचोमा परेकासँग खाना वा लुगा बाँडौँ।'],['बालबालिका','कागजको दियो बनाऔँ; तिहारका कथा सिकौँ।'],['हरित तिहार','पटाका र प्लास्टिक त्यागौँ; पुनःप्रयोग हुने सजावट रोजौँ।']]};
const DEUSI={en:'<p><b>Deusi</b> is sung by groups of men, often in the evenings of Tihar. A leader sings a line, the group answers “Deusire!”, then blessings are given to the host. <b>Bhailo</b> is similar but is sung mostly by girls and women on Laxmi Puja night.</p><p>Singers visit homes with madal, flute and harmonium, bringing blessings of health and prosperity. The host thanks them with money, food or fruit, often used for community projects. It is a way to spread joy, unity and gratitude. Songs are traditional and often improvised; this site does not reproduce any song lyrics.</p>',ne:'<p><b>देउसी</b> मुख्यतः तिहारको साँझ पुरुषहरूको समूहले गाउँछन्। एकजनाले पङ्क्ति गाउँछन्, समूहले “देउसीरे!” भन्छन् र घरधनीलाई आशीर्वाद दिइन्छ। <b>भैलो</b> पनि यस्तै हो र प्रायः लक्ष्मी पूजाको रात केटी र महिलाले गाउँछन्।</p><p>मादल, बाँसुरी र हार्मोनियमसहित घरघर गई स्वास्थ्य र समृद्धिको आशीर्वाद दिइन्छ। घरधनीले पैसा, खाना वा फलफूल दिन्छन्, जुन प्रायः सामुदायिक काममा प्रयोग हुन्छ। यो खुशी, एकता र कृतज्ञता फैलाउने तरिका हो। गीतहरू परम्परागत र प्रायः तत्काल रचित हुन्छन्; यहाँ कुनै गीतको शब्द प्रस्तुत गरिएको छैन।</p>'};
const CULT={en:[['Why it matters','Tihar (Yamapanchak) is the second-largest Nepali festival after Dashain.'],['Religious belief','Linked to Yama, Laxmi, Krishna and Hindu traditions, with Buddhist-Newar variations.'],['Humans & nature','Animals and farm life are honoured, teaching gratitude and respect.'],['Regional variety','Observances and calendar vary: hills, Terai and valleys all celebrate differently.'],['Newar traditions','Mha Puja, Nepal Sambat new year and Kija Puja are Newar forms of Tihar.'],['Food & decor','Sel roti, anarasa, fruits, marigold, makhamali, lamps, rangoli and lights.']],ne:[['किन महत्वपूर्ण','तिहार (यमपञ्चक) दशैँपछिको दोस्रो ठूलो नेपाली चाड हो।'],['धार्मिक विश्वास','यम, लक्ष्मी, कृष्ण र हिन्दू परम्परासँग जोडिन्छ; नेवार–बौद्ध रूपहरू पनि छन्।'],['मानव र प्रकृति','जनावर र कृषि जीवनको सम्मान गरेर कृतज्ञता सिकाउँछ।'],['क्षेत्रीय विविधता','पहाड, तराई र उपत्यकामा रीति र मिति फरक हुन्छन्।'],['नेवार परम्परा','म्ह पूजा, नेपाल संवत् नयाँ वर्ष र कि पूजा नेवारी रूपहरू हुन्।'],['खाना र सजावट','सेल रोटी, अनरसा, फलफूल, सयपत्री, मखमली, दियो, रङ्गोली र बत्ती।']]};
const GAL=[['home','🏠','Decorated Home','सजिएको घर','#7a2a14'],['diya','🪔','Clay Diyas','माटोका दियो','#8a4a10'],['flower','🌼','Marigold Garlands','सयपत्री माला','#8a6a10'],['rangoli','🎨','Rangoli','रङ्गोली','#6a1a4a'],['deusi','🥁','Deusi-Bhailo','देउसी–भैलो','#4a2a6a'],['pet','🐕','Kukur Tihar','कुकुर तिहार','#3a5a2a'],['pet','🐄','Gai Puja','गाई पूजा','#2a5a4a'],['laxmi','🪷','Laxmi Puja','लक्ष्मी पूजा','#8a2a2a'],['tika','🎀','Bhai Tika','भाइटीका','#6a1a2a'],['home','👨‍👩‍👧','Family Celebration','पारिवारिक उत्सव','#5a3a1a']];
const CATS={home:['Homes','घर'],diya:['Lights','बत्ती'],flower:['Flowers','फूल'],rangoli:['Rangoli','रङ्गोली'],deusi:['Deusi-Bhailo','देउसी'],pet:['Animals','जनावर'],laxmi:['Laxmi','लक्ष्मी'],tika:['Bhai Tika','भाइटीका']};
let gcat='all';

const li=a=>'<ol>'+a.map(x=>`<li>${x}</li>`).join('')+'</ol>';
function renderDay(){
  const d=DAYS[day], x=d[lang], u=UI[lang], p=$('#panel');
  p.style.setProperty('--c1',d.c);
  let h=`<div class="art" aria-hidden="true">${d.e}</div><h3>${x.n}</h3><p><i>${x.t}</i></p>`;
  [[0,x.s],[1,x.w],[2,x.m],[3,li(x.p)],[4,x.c],[5,x.k]].forEach(([i,t])=>h+=`<h4>${u.lbl[i]}</h4>${i==3?t:'<p>'+t+'</p>'}`);
  h+=`<div class="note"><b>${u.lbl[6]}</b> ${x.f}</div>`;
  if(day==3||day==4)h+=lang=='en'?'<p class="note">Note: practices and dates differ across communities and years.</p>':'<p class="note">नोट: रीति र मिति समुदाय र वर्षअनुसार फरक पर्न सक्छ।</p>';
  if(day==4)h+=`<h4>${u.tikaH}</h4><div class="tika" id="tikaBtns">${TIKA.map((t,i)=>`<button style="background:${t[0]}" data-i="${i}" aria-label="${t[lang=='en'?1:2]}" title="${t[lang=='en'?1:2]}"></button>`).join('')}</div><div id="tikaShow" class="art" aria-live="polite"></div>`;
  p.innerHTML=h;
  $$('.tabs button').forEach((b,i)=>b.setAttribute('aria-selected',i==day));
  $('#dayBar').style.width=((day+1)*20)+'%';
  $('#prev').disabled=!day; $('#next').disabled=day==4;
  const tb=$('#tikaBtns');
  if(tb){let n=0;tb.onclick=e=>{const b=e.target.closest('button');if(!b||n>=7)return;n++;$('#tikaShow').innerHTML+=`<span style="color:${TIKA[b.dataset.i][0]}">●</span>`;if(n==7){$('#tikaShow').insertAdjacentHTML('afterend',`<p class="note">${u.tikaDone}</p>`)}}}
}
function buildTabs(){$('#tabs').innerHTML=DAYS.map((d,i)=>`<button role="tab" data-i="${i}">${d.e} ${d[lang].n.split('—')[0]}</button>`).join('')}
function renderAll(){
  const u=UI[lang]; document.documentElement.lang=lang=='en'?'en':'ne';
  $$('[data-i18n]').forEach(e=>e.textContent=u[e.dataset.i18n]); $('#lang').textContent=u.lang;
  buildTabs(); renderDay();
  $('#ideas').innerHTML=IDEAS[lang].map(i=>`<div><h3>${i[0]}</h3><p>${i[1]}</p></div>`).join('');
  $('#deusiText').innerHTML=DEUSI[lang];
  $('#cultureGrid').innerHTML=CULT[lang].map(i=>`<div><h3>${i[0]}</h3><p>${i[1]}</p></div>`).join('');
  $('#filters').innerHTML=`<button data-c="all" class="${gcat=='all'?'on':''}">${u.all}</button>`+Object.entries(CATS).map(([k,v])=>`<button data-c="${k}" class="${gcat==k?'on':''}">${v[lang=='en'?0:1]}</button>`).join('');
  renderGal(); renderPlayerNames();
}
function renderGal(){
  $('#gal').innerHTML=GAL.map((g,i)=>[g,i]).filter(([g])=>gcat=='all'||g[0]==gcat).map(([g,i])=>`<button data-i="${i}" style="background:linear-gradient(145deg,${g[4]},#150608)"><span>${g[1]}</span><small>${g[lang=='en'?2:3]}</small></button>`).join('');
}
$('#tabs').onclick=e=>{const b=e.target.closest('button');if(b){day=+b.dataset.i;renderDay()}};
$('#prev').onclick=()=>{if(day>0){day--;renderDay()}};
$('#next').onclick=()=>{if(day<4){day++;renderDay()}};
$('#lang').onclick=()=>{lang=lang=='en'?'ne':'en';renderAll()};
$('#filters').onclick=e=>{const b=e.target.closest('button');if(b){gcat=b.dataset.c;renderAll()}};
$('#gal').onclick=e=>{const b=e.target.closest('button');if(!b)return;const g=GAL[b.dataset.i];$('#lbBody').style.background=`linear-gradient(145deg,${g[4]},#150608)`;$('#lbBody').innerHTML=`${g[1]}<br><small>${g[lang=='en'?2:3]}</small>`;$('#lightbox').hidden=false;$('#lbClose').focus()};
$('#lbClose').onclick=()=>$('#lightbox').hidden=true;
$('#lightbox').onclick=e=>{if(e.target.id=='lightbox')$('#lightbox').hidden=true};
addEventListener('keydown',e=>{if(e.key=='Escape')$('#lightbox').hidden=true});
$('#menuBtn').onclick=()=>{const o=$('#menu').classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',o)};
$$('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));
$('#top-btn').onclick=()=>scrollTo({top:0,behavior:RM?'auto':'smooth'});
$('#yr').textContent=new Date().getFullYear();
addEventListener('scroll',()=>{const h=document.documentElement,s=h.scrollTop/(h.scrollHeight-h.clientHeight);$('#progress').style.width=(s*100)+'%';$('#top-btn').classList.toggle('show',h.scrollTop>600);$('.house').style.transform=RM?'':`translateY(${h.scrollTop*.15}px)`},{passive:true});
addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('off'),700));

// scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.transition='opacity .9s, transform .9s';e.target.style.opacity=1;e.target.style.transform='none';io.unobserve(e.target)}}),{threshold:.1});
if(!RM)$$('section>h2,.grid,.two,.gal').forEach(e=>{e.style.opacity=0;e.style.transform='translateY(28px)';io.observe(e)});

// particles: golden sparks + petals
(function(){if(RM)return;const c=$('#fx'),x=c.getContext('2d');let P=[];
const size=()=>{c.width=innerWidth;c.height=innerHeight};size();addEventListener('resize',size);
const n=innerWidth<700?25:50;
for(let i=0;i<n;i++)P.push({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*2+1,v:Math.random()*.4+.15,p:i%5==0});
(function f(){x.clearRect(0,0,c.width,c.height);P.forEach(q=>{q.y-=q.p?-q.v*.8:q.v;q.x+=Math.sin(q.y/40)*.3;if(q.y<-5)q.y=c.height+5;if(q.y>c.height+5)q.y=-5;x.fillStyle=q.p?'rgba(243,154,30,.55)':'rgba(233,180,58,.65)';x.beginPath();q.p?x.ellipse(q.x,q.y,5,2.5,q.y/30,0,7):x.arc(q.x,q.y,q.r,0,7);x.fill()});requestAnimationFrame(f)})()})();

// music — original tones synthesised live (madal, flute, harmonium style); no recordings used
const TR=[
 {en:'Tihar Instrumental',ne:'तिहार वाद्य',bpm:96,sc:[0,2,4,7,9],root:57,wave:'triangle',dr:1},
 {en:'Deusi-Bhailo Festive',ne:'देउसी–भैलो उत्सव',bpm:120,sc:[0,2,5,7,9],root:60,wave:'square',dr:2},
 {en:'Laxmi Puja Calm',ne:'लक्ष्मी पूजा शान्ति',bpm:60,sc:[0,2,4,7,9],root:55,wave:'sine',dr:0},
 {en:'Folk Instrumental',ne:'लोक वाद्य',bpm:104,sc:[0,3,5,7,10],root:57,wave:'triangle',dr:1},
 {en:'Bhai Tika Emotional',ne:'भाइटीका भावुक',bpm:72,sc:[0,2,3,7,9],root:60,wave:'sine',dr:0},
 {en:'Evening Diya Ambience',ne:'साँझको दियो',bpm:50,sc:[0,4,7,9],root:52,wave:'sine',dr:0}];
let ac,gain,an,ti=0,playing=false,timer,step=0,t0=0,muted=false;
const mtof=m=>440*Math.pow(2,(m-69)/12);
function renderPlayerNames(){$('#pSel').innerHTML=TR.map((t,i)=>`<option value="${i}" ${i==ti?'selected':''}>${t[lang=='en'?'en':'ne']}</option>`).join('');$('#pName').textContent=TR[ti][lang=='en'?'en':'ne']}
function note(f,t,d,type,v){const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.04);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(gain);o.start(t);o.stop(t+d+.05)}
function drum(t,hi){const o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(hi?200:110,t);o.frequency.exponentialRampToValueAtTime(hi?110:55,t+.12);g.gain.setValueAtTime(.5,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(g);g.connect(gain);o.start(t);o.stop(t+.25)}
function sched(){const T=TR[ti],b=60/T.bpm/2;
 while(nextT<ac.currentTime+.4){
  if(T.dr&&step%2==0)drum(nextT,step%4==2);
  if(T.dr==2&&step%2==1)drum(nextT,true);
  if(step%4==0)note(mtof(T.root-12+T.sc[(step/4|0)%T.sc.length]%12),nextT,b*4,'sine',.12); // drone/harmonium bass
  if(Math.random()<.65||step%4==0){const d=T.sc[Math.floor(Math.random()*T.sc.length)]+(Math.random()<.3?12:0);note(mtof(T.root+12+d),nextT,b*(1+Math.random()*2),T.wave,.08)}
  nextT+=b;step++}
}
let nextT=0;
function play(){
 const AC=window.AudioContext||window.webkitAudioContext; if(!AC){$('#pMsg').textContent=UI[lang].noaudio;return}
 if(!ac){ac=new AC();gain=ac.createGain();gain.gain.value=muted?0:+$('#pVol').value;an=ac.createAnalyser();an.fftSize=64;gain.connect(an);an.connect(ac.destination)}
 ac.resume();playing=true;nextT=ac.currentTime+.05;step=0;t0=ac.currentTime;clearInterval(timer);timer=setInterval(sched,100);
 $('#pPlay').textContent='⏸';$('#pPlay').setAttribute('aria-label','Pause');draw();
}
function pause(){playing=false;clearInterval(timer);$('#pPlay').textContent='▶';$('#pPlay').setAttribute('aria-label','Play')}
function go(i){ti=(i+TR.length)%TR.length;$('#pSel').value=ti;renderPlayerNames();if(playing){pause();play()}}
function draw(){if(!playing)return;const c=$('#viz'),x=c.getContext('2d'),d=new Uint8Array(an.frequencyBinCount);an.getByteFrequencyData(d);x.clearRect(0,0,c.width,c.height);d.forEach((v,i)=>{x.fillStyle='#e9b43a';const h=v/255*c.height;x.fillRect(i*5,c.height-h,3,h)});$('#pBar').style.width=(((ac.currentTime-t0)%90)/90*100)+'%';requestAnimationFrame(draw)}
$('#pToggle').onclick=()=>{const b=$('#pBody');b.hidden=!b.hidden;$('#pToggle').setAttribute('aria-expanded',!b.hidden);if(!b.hidden&&!playing)$('#pMsg').textContent=UI[lang].play};
$('#pPlay').onclick=()=>playing?pause():play();
$('#pNext').onclick=()=>go(ti+1);$('#pPrev').onclick=()=>go(ti-1);
$('#pSel').onchange=e=>go(+e.target.value);
$('#pVol').oninput=e=>{if(gain&&!muted)gain.gain.value=+e.target.value};
$('#pMute').onclick=()=>{muted=!muted;if(gain)gain.gain.value=muted?0:+$('#pVol').value;$('#pMute').textContent=muted?'🔇':'🔊'};

renderAll();