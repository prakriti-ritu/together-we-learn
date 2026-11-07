/**
 * Privacy Policy text (English + Hindi), structured to meet the notice
 * requirements of India's Digital Personal Data Protection Act, 2023.
 * Keep it factual: every statement must match what the code actually does
 * (see lib/analytics.ts, app/api/track, app/api/contact).
 * NOT legal advice - have it reviewed before relying on it.
 */
export const PRIVACY_UPDATED = "2026-11-07";

type Section = { h: string; p?: string[]; ul?: string[] };
type Content = {
  title: string;
  subtitle: string;
  updatedLabel: string;
  sections: Section[];
  contactHeading: string;
  contactIntro: string;
  phoneLabel: string;
  emailLabel: string;
};

export const privacyContent: Record<"en" | "hi", Content> = {
  en: {
    title: "Privacy Policy",
    subtitle: "What personal data we collect, why, and the choices and rights you have.",
    updatedLabel: "Last updated",
    sections: [
      {
        h: "1. Who we are",
        p: [
          "A Carrier to Career (Spoken English Academy, Ambikapur, Chhattisgarh, India) runs this website and decides why and how your personal data is used. Under the Digital Personal Data Protection Act, 2023 (DPDP Act) we are the “Data Fiduciary”.",
        ],
      },
      {
        h: "2. What data we collect",
        ul: [
          "When you send the Contact or Free Demo form: your name, phone/WhatsApp number, the course you are interested in, your message and preferred time (if you fill them in).",
          "Only if you click “Accept analytics”: a random ID stored in your browser, the pages you view, the website you came from, your language, device type, browser and operating system, and your approximate location (city and country, worked out by our host from your connection).",
          "Like every website, our hosting and content-delivery providers receive your IP address and browser details whenever your browser loads a page or image (including images from Sanity's CDN and, on pages with videos, thumbnails from YouTube's image servers). This is technically unavoidable; we do not use it to identify you. When you send a form, a spam-protection counter tied to your IP address is kept for about 1 hour.",
          "We do NOT store your IP address in our analytics, and we do not collect your precise location, contacts, payment details or government IDs.",
          "Essential preferences (theme, whether you closed a notice or pop-up, your analytics choice) are saved in your browser only. They are not used to track you.",
        ],
      },
      {
        h: "3. Why we use it (purpose)",
        ul: [
          "Form details: to call, WhatsApp or email you about your enquiry or demo class, and to enrol you if you wish. Nothing else.",
          "Analytics (optional): to count visits and understand which pages and languages are useful, so we can improve the site. We receive a weekly summary report; the pages you viewed before sending a form may be shown to us with your enquiry, so we can help you better.",
          "We do not sell your data, and we do not show advertising or build advertising profiles.",
        ],
      },
      {
        h: "4. Your consent",
        p: [
          "We process your data only with your consent. For forms, you give it by ticking the consent box before sending. For analytics, you give it by choosing “Accept analytics”; nothing is tracked before that. You can withdraw consent at any time, as easily as you gave it, using the “Your analytics choice” box below or by contacting us. Withdrawing does not affect anything done before, and we will delete the data that depends on your consent unless the law requires us to keep it.",
        ],
      },
      {
        h: "5. How long we keep it",
        ul: [
          "Form details reach us by email. We keep them only as long as needed to respond and run your classes, and delete them on request or when you are no longer in touch with us for 12 months.",
          "Analytics page-view records are deleted automatically after 8 days; your page trail is deleted after 30 days (or immediately when you turn analytics off). The random ID stays in your browser until you turn analytics off or clear your browser data.",
        ],
      },
      {
        h: "6. Who processes it for us",
        p: [
          "We use these service providers, who handle data only on our instructions: Vercel (website hosting, and aggregate site statistics if you accept analytics), Upstash (database for analytics and spam protection), Resend (sending us the form emails) and Sanity (website content and images). If you press play on a video, it loads from YouTube (privacy-enhanced mode) and YouTube's own policy applies; the same goes for WhatsApp if you tap a WhatsApp button. Some of these providers keep data on servers outside India, which the DPDP Act allows except to countries the Government restricts.",
        ],
      },
      {
        h: "7. Children (under 18)",
        p: [
          "If you are under 18, a parent or guardian must give consent for you — please ask them to submit the form, and choose “Decline” on the analytics banner. We do not knowingly track or profile children, and we do not target advertising at them.",
        ],
      },
      {
        h: "8. Your rights",
        ul: [
          "Know what personal data we hold about you and how it is used.",
          "Ask us to correct or complete it, or to erase it.",
          "Withdraw your consent at any time.",
          "Get your grievance resolved by us — contact us below; we will reply as soon as possible and within 30 days.",
          "Nominate another person to exercise these rights for you if you die or cannot do so yourself.",
          "If we do not resolve your complaint, you may complain to the Data Protection Board of India.",
        ],
      },
      {
        h: "9. Security and changes",
        p: [
          "The site uses HTTPS, we keep stored data to the minimum above, and access is limited to the academy owner and the providers listed. If we change this policy we will update the date at the top; for significant changes we will ask for your consent again.",
        ],
      },
    ],
    contactHeading: "Contact / grievance",
    contactIntro: "To use any right above, withdraw consent, or raise a complaint, contact us:",
    phoneLabel: "Phone / WhatsApp",
    emailLabel: "Email",
  },
  hi: {
    title: "प्राइवेसी पॉलिसी",
    subtitle: "हम कौन सा निजी डेटा लेते हैं, क्यों लेते हैं, और आपके पास कौन से विकल्प और अधिकार हैं।",
    updatedLabel: "अंतिम अपडेट",
    sections: [
      {
        h: "1. हम कौन हैं",
        p: [
          "A Carrier to Career (स्पोकन इंग्लिश अकादमी, अंबिकापुर, छत्तीसगढ़, भारत) यह वेबसाइट चलाती है और तय करती है कि आपका निजी डेटा क्यों और कैसे उपयोग होगा। डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (DPDP Act) के अनुसार हम “डेटा फिड्यूशरी” हैं।",
        ],
      },
      {
        h: "2. हम कौन सा डेटा लेते हैं",
        ul: [
          "जब आप संपर्क या फ्री डेमो फ़ॉर्म भेजते हैं: आपका नाम, फ़ोन/व्हाट्सऐप नंबर, रुचि का कोर्स, संदेश और पसंदीदा समय (यदि आप भरें)।",
          "केवल यदि आप “एनालिटिक्स स्वीकारें” दबाते हैं: आपके ब्राउज़र में रखा एक रैंडम ID, आपके देखे गए पेज, आप किस वेबसाइट से आए, भाषा, डिवाइस का प्रकार, ब्राउज़र और ऑपरेटिंग सिस्टम, तथा आपका अनुमानित स्थान (शहर और देश, जो हमारे होस्ट द्वारा आपके कनेक्शन से पता चलता है)।",
          "हर वेबसाइट की तरह, जब आपका ब्राउज़र कोई पेज या इमेज लोड करता है तो हमारे होस्टिंग और कंटेंट-डिलीवरी प्रदाताओं को आपका IP एड्रेस और ब्राउज़र की जानकारी मिलती है (Sanity के CDN की इमेज और, वीडियो वाले पेज पर, YouTube के इमेज सर्वर से थंबनेल सहित)। यह तकनीकी रूप से अनिवार्य है; हम इससे आपकी पहचान नहीं करते। फ़ॉर्म भेजने पर स्पैम-सुरक्षा के लिए आपके IP से जुड़ा एक काउंटर लगभग 1 घंटे तक रहता है।",
          "हम अपने एनालिटिक्स में आपका IP एड्रेस सेव नहीं करते, और आपका सटीक लोकेशन, कॉन्टैक्ट्स, पेमेंट विवरण या सरकारी पहचान-पत्र नहीं लेते।",
          "ज़रूरी पसंद (थीम, नोटिस/पॉप-अप बंद किया या नहीं, आपका एनालिटिक्स विकल्प) केवल आपके ब्राउज़र में सेव होती है। इनसे आपको ट्रैक नहीं किया जाता।",
        ],
      },
      {
        h: "3. हम इसका उपयोग क्यों करते हैं (उद्देश्य)",
        ul: [
          "फ़ॉर्म की जानकारी: आपकी पूछताछ या डेमो क्लास के बारे में आपको कॉल, व्हाट्सऐप या ईमेल करने और, आप चाहें तो, प्रवेश देने के लिए। इसके अलावा कुछ नहीं।",
          "एनालिटिक्स (वैकल्पिक): विज़िट गिनने और यह समझने के लिए कि कौन से पेज और भाषाएँ उपयोगी हैं, ताकि हम साइट बेहतर बना सकें। हमें साप्ताहिक सारांश रिपोर्ट मिलती है; फ़ॉर्म भेजने से पहले आपके देखे पेज आपकी पूछताछ के साथ हमें दिख सकते हैं, ताकि हम आपकी बेहतर मदद कर सकें।",
          "हम आपका डेटा बेचते नहीं हैं, और न विज्ञापन दिखाते हैं, न विज्ञापन प्रोफ़ाइल बनाते हैं।",
        ],
      },
      {
        h: "4. आपकी सहमति",
        p: [
          "हम आपका डेटा केवल आपकी सहमति से उपयोग करते हैं। फ़ॉर्म में आप भेजने से पहले सहमति-बॉक्स पर टिक करके सहमति देते हैं। एनालिटिक्स के लिए आप “एनालिटिक्स स्वीकारें” चुनकर सहमति देते हैं; उससे पहले कुछ भी ट्रैक नहीं होता। आप जब चाहें, उतनी ही आसानी से सहमति वापस ले सकते हैं — नीचे “आपका एनालिटिक्स विकल्प” बॉक्स से या हमसे संपर्क करके। वापसी से पहले किए गए कार्य प्रभावित नहीं होते, और जब तक कानून आवश्यक न करे, हम आपकी सहमति पर आधारित डेटा हटा देंगे।",
        ],
      },
      {
        h: "5. हम इसे कितने समय रखते हैं",
        ul: [
          "फ़ॉर्म की जानकारी हमें ईमेल से मिलती है। हम उसे केवल जवाब देने और आपकी क्लास चलाने तक रखते हैं, और अनुरोध पर या 12 महीने तक संपर्क न रहने पर हटा देते हैं।",
          "एनालिटिक्स पेज-व्यू रिकॉर्ड 8 दिन बाद अपने-आप हट जाते हैं; आपका पेज-ट्रेल 30 दिन बाद हटता है (या एनालिटिक्स बंद करते ही तुरंत)। रैंडम ID आपके ब्राउज़र में तब तक रहती है जब तक आप एनालिटिक्स बंद न करें या ब्राउज़र डेटा साफ़ न करें।",
        ],
      },
      {
        h: "6. हमारी ओर से डेटा कौन प्रोसेस करता है",
        p: [
          "हम इन सेवा-प्रदाताओं का उपयोग करते हैं, जो केवल हमारे निर्देश पर डेटा संभालते हैं: Vercel (वेबसाइट होस्टिंग, और एनालिटिक्स स्वीकारने पर कुल साइट आँकड़े), Upstash (एनालिटिक्स और स्पैम-सुरक्षा का डेटाबेस), Resend (हमें फ़ॉर्म ईमेल भेजने के लिए) और Sanity (वेबसाइट कंटेंट और इमेज)। वीडियो पर प्ले दबाने पर वह YouTube (प्राइवेसी-एन्हांस्ड मोड) से लोड होता है और YouTube की अपनी पॉलिसी लागू होती है; व्हाट्सऐप बटन दबाने पर व्हाट्सऐप पर भी यही बात लागू है। इनमें से कुछ प्रदाताओं के सर्वर भारत से बाहर हैं, जिसकी DPDP Act उन देशों को छोड़कर अनुमति देता है जिन्हें सरकार प्रतिबंधित करे।",
        ],
      },
      {
        h: "7. बच्चे (18 वर्ष से कम)",
        p: [
          "यदि आप 18 वर्ष से कम के हैं, तो आपकी ओर से माता-पिता या अभिभावक को सहमति देनी होगी — कृपया उनसे फ़ॉर्म भरवाएँ, और एनालिटिक्स बैनर पर “मना करें” चुनें। हम जानबूझकर बच्चों को ट्रैक या प्रोफ़ाइल नहीं करते, और उन्हें विज्ञापन-लक्षित नहीं करते।",
        ],
      },
      {
        h: "8. आपके अधिकार",
        ul: [
          "जानना कि हमारे पास आपका कौन सा निजी डेटा है और उसका उपयोग कैसे होता है।",
          "उसे सुधारने/पूरा करने या मिटाने को कहना।",
          "किसी भी समय अपनी सहमति वापस लेना।",
          "अपनी शिकायत का समाधान पाना — नीचे हमसे संपर्क करें; हम जल्द से जल्द और 30 दिनों के भीतर उत्तर देंगे।",
          "अपनी मृत्यु या असमर्थता की स्थिति में अपने अधिकार प्रयोग करने के लिए किसी अन्य व्यक्ति को नामित करना।",
          "यदि हम आपकी शिकायत का समाधान न करें, तो आप भारतीय डेटा संरक्षण बोर्ड में शिकायत कर सकते हैं।",
        ],
      },
      {
        h: "9. सुरक्षा और बदलाव",
        p: [
          "साइट HTTPS का उपयोग करती है, हम ऊपर बताए अनुसार न्यूनतम डेटा रखते हैं, और पहुँच केवल अकादमी के संचालक और सूचीबद्ध प्रदाताओं तक सीमित है। यदि हम यह पॉलिसी बदलेंगे तो ऊपर की तारीख अपडेट करेंगे; बड़े बदलावों पर आपसे फिर सहमति माँगेंगे।",
        ],
      },
    ],
    contactHeading: "संपर्क / शिकायत",
    contactIntro: "ऊपर के किसी अधिकार का उपयोग करने, सहमति वापस लेने या शिकायत करने के लिए हमसे संपर्क करें:",
    phoneLabel: "फ़ोन / व्हाट्सऐप",
    emailLabel: "ईमेल",
  },
};
