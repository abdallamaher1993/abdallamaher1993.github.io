/* ============================================================
   case-study.js — Case study page loader (2026 rebuild)
   Local video heroes only — no external embeds.
   ============================================================ */

(function () {
  'use strict';

  const SLUG_MAP = {
    'titanic': 'titanic',
    'dyatlov': 'dyatlov',
    'franklin': 'franklin',
    'jojoba': 'jojoba',
    'neon-heartbeat': 'neon',
    'island-courier': 'ebb'
  };

  const L = (en, ar, zh) => ({ en, ar, 'zh-TW': zh });

  const CASE_STUDY_DATA = {
    /* ---------------- 1. Titanic ---------------- */
    titanic: {
      slug: 'titanic',
      title: L('Titanic — April 14, 1912: A Historical POV Film',
        'التيتانيك — 14 أبريل 1912: فيلم بمنظور تاريخي',
        '鐵達尼號 — 1912 年 4 月 14 日：歷史 POV 影片'),
      tag: L('AI Documentary · Historical POV', 'وثائقي بالذكاء الاصطناعي · منظور تاريخي', 'AI 紀錄片 · 歷史 POV'),
      heroVideo: '../assets/work-titanic.mp4',
      heroPoster: '../assets/work-titanic-poster.jpg',
      stats: { views: L('Feature film', 'فيلم كامل', '長片'), duration: '25 min', episodes: '1 + shorts', prodTime: '4K master' },
      challenge: L(
        'Reconstructing the sinking of the Titanic as a first-person historical experience — photoreal interiors, period-accurate costumes and night-time North Atlantic lighting, all generated with AI while keeping a consistent look across every shot.',
        'إعادة بناء غرق التيتانيك كتجربة تاريخية بمنظور شخصي أول — مداخل فوتورياليستية، أزياء دقيقة العصر وإضاءة ليلية لشمال الأطلسي، كلها مولّدة بالذكاء الاصطناعي مع الحفاظ على مظهر متسق في كل لقطة.',
        '以第一人稱歷史視角重建鐵達尼號沉沒 — 寫實船艙、符合時代的服裝與北大西洋夜間照明，全部由 AI 生成，同時保持每鏡頭視覺一致。'),
      solution: L(
        'Built the film on a locked visual bible: SDXL reference frames for every set and costume, I2V animation via RunPod Wan 2.2, then a frame-level QC pass for identity and lighting drift. Serialized vertical shorts were cut from the same master for channel promotion.',
        'بُني الفيلم على كتاب بصري مقفل: إطارات مرجعية SDXL لكل ديكور وزي، تحريك I2V عبر RunPod Wan 2.2، ثم فحص جودة على مستوى الإطار لانحراف الهوية والإضاءة. قُصّت مقاطع قصيرة عمودية مسلسلة من النسخة الأم نفسها للترويج للقناة.',
        '影片建立在鎖定的視覺規範上：每個場景與服裝的 SDXL 參考幀、透過 RunPod Wan 2.2 的 I2V 動畫，再進行幀級身份與照明漂移品檢。系列直式短片由同一母帶剪出，用於頻道宣傳。'),
      result: L(
        'A complete historical POV film with a full post pipeline — edit, sound design, narration and grade — demonstrating end-to-end AI filmmaking, not just clip generation.',
        'فيلم تاريخي كامل بمنظور شخصي بخط إنتاج كامل — مونتاج وتصميم صوتي وتعليق ودرجة لونية — يُثبت صناعة فيلم متكاملة بالذكاء الاصطناعي، لا مجرد توليد مقاطع.',
        '一部具備完整後期流程（剪輯、音效設計、旁白、調色）的歷史 POV 影片，證明端到端的 AI 電影製作能力，而不只是片段生成。'),
      pipeline: [
        { step: 1, title: L('Research & Visual Bible', 'البحث والكتاب البصري', '研究與視覺規範'), desc: L('Period references for 1912 interiors, costumes and ship layouts compiled into a locked reference pack used for every generation.', 'مراجع العصر لديكورات 1912 وأزياء وتخطيط السفينة جُمعت في حزمة مرجعية مقفلة استُخدمت في كل توليد.', '蒐集 1912 年船艙、服裝與船舶佈局的時代參考，彙編為鎖定參考包，用於每次生成。') },
        { step: 2, title: L('Image Generation & Consistency', 'توليد الصور والثبات', '圖像生成與一致性'), desc: L('SDXL keyframes in Draw Things with ControlNet composition control; IP-Adapter keeps faces and costumes stable across scenes.', 'إطارات مفتاحية SDXL في Draw Things مع تحكم بالتكوين عبر ControlNet؛ IP-Adapter يحافظ على ثبات الوجوه والأزياء عبر المشاهد.', '於 Draw Things 生成 SDXL 關鍵幀，以 ControlNet 控制構圖；IP-Adapter 確保跨場景面孔與服裝穩定。') },
        { step: 3, title: L('I2V Animation', 'التحريك من صورة إلى فيديو', 'I2V 動畫'), desc: L('RunPod Wan 2.2 animates approved stills with restrained motion — subtle camera drift, water, smoke and character micro-movements.', 'RunPod Wan 2.2 يحرّك الصور المعتمدة بحركة متحفظة — انجراف كاميرا خفيف، ماء ودخان وحركات دقيقة للشخصيات.', 'RunPod Wan 2.2 以克制的運動幅度為核准靜幀加入動態 — 細微鏡頭漂移、水、煙與角色微動作。') },
        { step: 4, title: L('Edit, Sound & Grade', 'المونتاج والصوت والدرجة اللونية', '剪輯、聲音與調色'), desc: L('DaVinci Resolve edit with AI-narration timing passes, layered foley and a cold North-Atlantic grade; 4K master delivered with serialized shorts.', 'مونتاج في DaVinci Resolve مع جولات مزامنة للتعليق الصوتي، مؤثرات فولي متعددة الطبقات ودرجة باردة لشمال الأطلسي؛ سُلّم ماستر 4K مع مقاطع قصيرة مسلسلة.', 'DaVinci Resolve 剪輯，含 AI 旁白對時、多層擬音與冷色調北大西洋調色；交付 4K 母帶與系列短片。') }
      ],
      tech: [
        { category: 'Visual Generation', items: ['Draw Things (SDXL)', 'ControlNet Depth', 'IP-Adapter'] },
        { category: 'Video', items: ['RunPod Wan 2.2', 'FFmpeg'] },
        { category: 'Audio', items: ['Kokoro / Higgs TTS', 'Custom foley layers'] },
        { category: 'Post', items: ['DaVinci Resolve', '4K master'] },
        { category: 'Distribution', items: ['Serialized shorts cut', 'n8n publish workflow'] }
      ],
      bts: [],
      youtubeUrl: ''
    },

    /* ---------------- 2. Dyatlov Pass ---------------- */
    dyatlov: {
      slug: 'dyatlov',
      title: L('The Dyatlov Pass — 9 Hikers, One Tent Slashed From the Inside',
        'ممر دياتلوف — 9 متنزهين وخيمة مُزقت من الداخل',
        '佳特洛夫山口 — 9 名登山者，一頂從內部被割開的帳篷'),
      tag: L('AI Documentary', 'وثائقي بالذكاء الاصطناعي', 'AI 紀錄片'),
      heroVideo: '../assets/work-dyatlov.mp4',
      heroPoster: '../assets/work-dyatlov-poster.jpg',
      stats: { views: L('Documentary', 'وثائقي', '紀錄片'), duration: '10 min', episodes: '1', prodTime: '4K master' },
      challenge: L(
        'Telling a true mystery without sensationalizing it — the film had to feel like a cold case file: credible reenactments of the snow-field, the tent and the final hike, with tension built from editing and sound rather than effects.',
        'سرد لغز حقيقي دون تهويل — كان على الفيلم أن يبدو كملف قضية باردة: مشاهد تمثيلية مقنعة للحقل الثلجي والخيمة والرحلة الأخيرة، بتوتر مبني من المونتاج والصوت لا من المؤثرات.',
        '在不聳動的前提下講述真實謎團 — 影片需要像一份冷案檔案：可信的雪原、帳篷與最後徒步重演，張力來自剪輯與聲音，而非特效。'),
      solution: L(
        'A desaturated winter LUT and low, wide compositions keep the film forensic. AI reenactments were kept restrained — breath, footsteps, fabric — and the narration follows the real investigation timeline, letting facts carry the tension.',
        'LUT شتوي منخفض التشبع وتكوينات منخفضة واسعة تحافظ على الطابع الشرعي. أُبقيت المشاهد التمثيلية بالذكاء الاصطناعي متحفظة — أنفاس، خطوات، قماش — ويتبع التعليق الصوتي خط الزمن الحقيقي للتحقيق، لتنقل الحقائق التوتر.',
        '低飽和冬季 LUT 與低角度寬構圖保持鑑識感。AI 重演保持克制 — 呼吸、腳步、布料 — 旁白跟隨真實調查時間線，讓事實承載張力。'),
      result: L(
        'A documentary-grade mystery film with cinematic snow reenactments and a tension-driven narrative cut — an example of AI used in service of journalism-style storytelling.',
        'فيلم غموض بمستوى وثائقي بمشاهد تمثيلية ثلجية سينمائية ومونتاج سردي مبني على التوتر — نموذج لاستخدام الذكاء الاصطناعي في خدمة السرد الصحفي.',
        '一部紀錄片級謎團影片，具備電影感雪地重演與張力驅動的敘事剪輯 — AI 用於服務新聞式敘事的範例。'),
      pipeline: [
        { step: 1, title: L('Case-File Research', 'بحث ملف القضية', '案卷研究'), desc: L('Timeline reconstruction from the official investigation, maps of the hike route and weather records for February 1959.', 'إعادة بناء خط الزمن من التحقيق الرسمي وخرائط مسار الرحلة وسجلات الطقس لشهر فبراير 1959.', '依官方調查重建時間線，含徒步路線地圖與 1959 年 2 月氣象記錄。') },
        { step: 2, title: L('Restrained Reenactments', 'مشاهد تمثيلية متحفظة', '克制重演'), desc: L('Ural mountain landscapes generated as stills first, then animated with minimal motion — priority on credibility over spectacle.', 'مناظر جبال الأورال وُلّدت كصور ثابتة أولاً ثم حُرّكت بأدنى حركة — الأولوية للمصداقية لا للمشهد الباهر.', '烏拉爾山景先以靜幀生成，再以最小動態製作動畫 — 可信度高於視覺奇观。') },
        { step: 3, title: L('Cold Grade & Sound', 'الدرجة الباردة والصوت', '冷調與聲音'), desc: L('Desaturated winter LUT, sub-bass drone beds and sparse foley — wind, fabric, breath — mixed to keep the viewer uneasy without music cues.', 'LUT شتوي منخفض التشبع، طبقات درونز باص واضحة ومؤثرات شحيحة — رياح، قماش، أنفاس — لمزج يُبقي المشاهد قلقاً دون إشارات موسيقية.', '去飽和冬季 LUT、低頻無人機聲床與稀疏擬音 — 風、布料、呼吸 — 混音讓觀眾不安而不依賴音樂提示。') },
        { step: 4, title: L('Fact-Led Edit', 'مونتاج يقوده السرد', '事實主導剪輯'), desc: L('The cut follows the investigation chronologically — no dramatized detours — with each reenactment anchored to a documented event.', 'يتبع المونتاج التحقيق زمنياً — دون انحرافات درامية — وكل مشهد تمثيلي مرتبط بوثائق موثقة.', '剪輯依調查時序推進 — 無戲劇化岔路 — 每段重演都對應有記錄的事件。') }
      ],
      tech: [
        { category: 'Visual Generation', items: ['Draw Things (SDXL)', 'Winter LUT', 'ControlNet Depth'] },
        { category: 'Video', items: ['RunPod Wan 2.2', 'FFmpeg'] },
        { category: 'Audio', items: ['Kokoro / Higgs TTS', 'Sub-bass drone beds', 'Sparse foley'] },
        { category: 'Post', items: ['DaVinci Resolve', '4K master'] },
        { category: 'Distribution', items: ['n8n publish workflow', 'Trilingual metadata'] }
      ],
      bts: [],
      youtubeUrl: ''
    },

    /* ---------------- 3. Franklin Expedition ---------------- */
    franklin: {
      slug: 'franklin',
      title: L('Franklin Expedition 1845 — The Arctic’s Greatest Mystery',
        'بعثة فرانكلين 1845 — أعظم ألغاز القطب الشمالي',
        '富蘭克林遠征 1845 — 北極最偉大的謎團'),
      tag: L('AI Documentary', 'وثائقي بالذكاء الاصطناعي', 'AI 紀錄片'),
      heroVideo: '../assets/work-franklin.mp4',
      heroPoster: '../assets/work-franklin-poster.jpg',
      stats: { views: L('Feature-length', 'طويل', '長片'), duration: 'Full film', episodes: '1', prodTime: '4K master' },
      challenge: L(
        'Reconstructing the final voyage of HMS Erebus and Terror — two ships lost in the ice with all 129 crew — as a feature-length documentary. The look had to sit between painterly illustration and archival footage to respect the 1845 period.',
        'إعادة بناء الرحلة الأخيرة لسفينتي إيربس وتيرور — سفينتان فقدتا في الجليد مع طاقم من 129 بحاراً — كوثائقي طويل. كان على المظهر أن يقع بين الرسم التصويري ولقطات الأرشيف احتراماً لعام 1845.',
        '以長片紀錄片重現 HMS Erebus 與 Terror 號的最後航程 — 兩艘船與全體 129 名船員葬身冰海。視覺必須介於繪畫插畫與檔案影像之間，以尊重 1845 年的年代感。'),
      solution: L(
        'A painterly-realism style frame: oil-painting reference stills with consistent ship designs locked via ControlNet, archival-style map animations for the route, and a fully narrated timeline from departure to the ice entrapment.',
        'إطار واقعية تصويرية: صور ثابتة مرجعية بأسلوب اللوحة الزيتية مع تصاميم سفن ثابتة مقفلة عبر ControlNet، رسوم خرائط بأسلوب الأرشيف للمسار، وسرد زمني كامل بالتعليق الصوتي من الإبحار حتى الحبس في الجليد.',
        '繪畫寫實風格：油畫質感參考靜幀，船體設計以 ControlNet 鎖定一致，路線輔以檔案風格地圖動畫，並以完整旁白敘述從啟航到冰封的時間線。'),
      result: L(
        'A feature-length AI documentary with a controlled, period-consistent look — the strongest demonstration on this portfolio of long-form narrative discipline.',
        'وثائقي طويل بالذكاء الاصطناعي بمظهر متسق مع العصر — أقوى إثبات في هذا الملف على الانضباط السردي الطويل.',
        '一部風格受控、符合時代的長片 AI 紀錄片 — 此作品集中最能證明長篇敘事掌控力的作品。'),
      pipeline: [
        { step: 1, title: L('Historical Reference', 'المرجعية التاريخية', '歷史參考'), desc: L('Ship plans, expedition letters and Inuit oral histories compiled into a reference pack covering vessels, uniforms and Arctic light.', 'مخططات السفن ورسائل البعثة والسرد الشفهي الإنويتي جُمعت في حزمة مرجعية تغطي السفن والأزياء وضوء القطب.', '彙整船體圖、遠征書信與因紐特口述歷史為參考包，涵蓋船隻、制服與北極光線。') },
        { step: 2, title: L('Painterly Style Lock', 'قفل الأسلوب التصويري', '繪畫風格鎖定'), desc: L('Oil-painting LUT and palette defined once, then enforced on every generated frame via a shared style reference and CLIP-based check.', 'LUT ولوحة ألوان بأسلوب اللوحة الزيتية عُرّفتا مرة واحدة ثم فُرضتا على كل إطار مولّد عبر مرجع أسلوب مشترك وفحص CLIP.', '油畫 LUT 與色板一次定義，透過共享風格參考與 CLIP 檢查強制套用於每幀。') },
        { step: 3, title: L('Ice & Ship Consistency', 'ثبات الجليد والسفن', '冰面與船體一致性'), desc: L('Ship geometry locked with depth maps; ice fields generated in layers so lighting stays coherent from open sea to pack ice.', 'هندسة السفن قُفلت بخرائط العمق؛ حقول الجليد وُلّدت بطبقات ليبقى الضوء متماسكاً من البحر المفتوح إلى الجليد المتراكم.', '船體幾何以深度圖鎖定；冰原分層生成，確保從開闊海域到密集冰區的照明連貫。') },
        { step: 4, title: L('Narration & Maps', 'التعليق والخرائط', '旁白與地圖'), desc: L('Fully narrated timeline with archival-style animated maps marking each known position of the expedition, mixed under a restrained score.', 'خط زمني مسرود كامل بخرائط متحركة بأسلوب الأرشيف تعلّم كل موقع معروف للبعثة، تحت موسيقى متحفظة.', '完整旁白時間線，輔以檔案風格動畫地圖標記遠征隊每個已知位置，配樂克制。') }
      ],
      tech: [
        { category: 'Visual Generation', items: ['Draw Things (SDXL)', 'Oil-painting LUT', 'ControlNet Depth'] },
        { category: 'Video', items: ['RunPod Wan 2.2', 'FFmpeg'] },
        { category: 'Audio', items: ['Kokoro / Higgs TTS', 'Restrained score mix'] },
        { category: 'Post', items: ['DaVinci Resolve', '4K master'] },
        { category: 'Distribution', items: ['n8n publish workflow', 'Chaptered delivery'] }
      ],
      bts: [],
      youtubeUrl: ''
    },

    /* ---------------- 4. Jojoba Oil ad ---------------- */
    jojoba: {
      slug: 'jojoba',
      title: L('Jojoba Oil — The Golden Treasure of the Desert (Branded Commercial)',
        'زيت الجوجوبا — كنز الصحراء الذهبي (إعلان تجاري)',
        '荷荷巴油 — 沙漠中的金色寶藏（品牌廣告）'),
      tag: L('Branded Ad', 'إعلان تجاري', '品牌廣告'),
      heroVideo: '../assets/work-jojoba.mp4',
      heroPoster: '../assets/work-jojoba-poster.jpg',
      stats: { views: L('Commercial', 'إعلان', '廣告'), duration: '30–60s cuts', episodes: 'AR + EN', prodTime: '4K master' },
      challenge: L(
        'Producing a product commercial for jojoba oil with the polish of a desert-location shoot — macro droplets, golden-hour dunes and a clean benefits-driven edit — without a physical shoot, in two languages.',
        'إنتاج إعلان تجاري لزيت الجوجوبا ببهرجة تصوير مواقع صحراوية — قطرات ماكرو، كثبان الساعة الذهبية ومونتاج نظيف يركّز على الفوائد — دون تصوير فعلي، وبلغتين.',
        '為荷荷巴油製作媲美沙漠實景拍攝的產品廣告 — 微距油滴、黃金時刻沙丘與聚焦賣點的乾淨剪輯 — 無實際拍攝，雙語版本。'),
      solution: L(
        'Macro product shots were generated with controlled lighting references so the oil reads as liquid gold; desert cinematics establish origin; the edit leads with benefits and ends on the pack shot and call to action.',
        'لقطات ماكرو للمنتج وُلّدت بمراجع إضاءة مضبوطة لتقرأ الزيت كالذهب السائل؛ مشاهد صحراوية تؤسس للمنشأ؛ يقود المونتاج بالفوائد ويختم بلقطة العبوة والدعوة للشراء.',
        '微距產品鏡頭以受控照明參考生成，讓油體呈現液態金質感；沙漠畫面建立產地印象；剪輯以賣點開場，以包裝與行動呼籲收尾。'),
      result: L(
        'A dual-language commercial (Arabic & English) delivered with product, pack-shot and CTA variants — ready for paid social and e-commerce placement.',
        'إعلان ثنائي اللغة (عربي وإنجليزي) سُلّم بنسخ للمنتج ولقطة العبوة والدعوة للشراء — جاهز للإعلانات المدفوعة والتجارة الإلكترونية.',
        '交付雙語（阿拉伯語與英語）廣告，含產品、包裝與 CTA 版本 — 可直接用於付費社交與電商投放。'),
      pipeline: [
        { step: 1, title: L('Product Reference', 'مرجع المنتج', '產品參考'), desc: L('Pack shots and label details captured into a reference sheet so the generated product always matches the real packaging.', 'صور العبوة وتفاصيل الملصق وُثقت في ورقة مرجعية ليطابق المنتج المولّد العبوة الحقيقية دائماً.', '拍攝包裝與標籤細節製成參考表，確保生成的產品與實物包裝一致。') },
        { step: 2, title: L('Macro & Desert Cinematics', 'لقطات الماكرو والمشاهد الصحراوية', '微距與沙漠攝影'), desc: L('Controlled-lighting macro passes for the oil, plus golden-hour dune cinematics for origin storytelling.', 'لقطات ماكرو بإضاءة مضبوطة للزيت، إضافة إلى مشاهد كثبان بالساعة الذهبية لسرد المنشأ.', '受控照明微距拍攝呈現油體，輔以黃金時刻沙丘畫面講述產地故事。') },
        { step: 3, title: L('Benefits-Led Edit', 'مونتاج يقوده البيع', '賣點主導剪輯'), desc: L('Pace matched to paid-social conventions: hook in the first second, benefit beats, pack shot and CTA close.', 'إيقاع مطابق لأعراف الإعلانات المدفوعة: خطاف في الثانية الأولى، نقاط فائدة، لقطة عبوة وخاتمة بدعوة للشراء.', '節奏符合付費社交慣例：首秒鉤子、賣點節拍、包裝鏡頭與 CTA 收尾。') },
        { step: 4, title: L('Localization', 'التعريب والتوطين', '本地化'), desc: L('Arabic and English versions with localized typography, voiceover and on-screen text from a single master timeline.', 'نسختان عربية وإنجليزية بخطوط وأصوات ونصوص شاشة موطّنة من خط زمني أم واحد.', '阿拉伯語與英語版本，以同一母時間線製作在地化字體、配音與螢幕文字。') }
      ],
      tech: [
        { category: 'Visual Generation', items: ['Draw Things (SDXL)', 'Controlled lighting refs', 'Macro passes'] },
        { category: 'Video', items: ['RunPod Wan 2.2', 'FFmpeg'] },
        { category: 'Audio', items: ['Bilingual voiceover TTS', 'Music licensing-ready mix'] },
        { category: 'Post', items: ['DaVinci Resolve', 'Paid-social cut variants'] },
        { category: 'Delivery', items: ['AR + EN masters', 'CTA / pack-shot variants'] }
      ],
      bts: [],
      youtubeUrl: ''
    },

    /* ---------------- 5. NEON_HEARTBEAT ---------------- */
    neon: {
      slug: 'neon-heartbeat',
      title: L('NEON_HEARTBEAT — Keep the Light On (Official AI Music Video)',
        'NEON_HEARTBEAT — Keep the Light On (فيديو كليب رسمي)',
        'NEON_HEARTBEAT — Keep the Light On（官方 AI 音樂錄影帶）'),
      tag: L('AI Music Video', 'فيديو كليب بالذكاء الاصطناعي', 'AI 音樂錄影帶'),
      heroVideo: '../assets/work-neon-light.mp4',
      heroPoster: '../assets/work-neon-light-poster.jpg',
      stats: { views: L('Music video', 'فيديو كليب', '音樂錄影帶'), duration: 'Full track', episodes: '2 released', prodTime: '4K master' },
      challenge: L(
        'Creating a K-pop music video with a virtual idol who must stay the same person across performance shots, lighting changes and camera angles — the hardest consistency problem in AI video.',
        'إنشاء فيديو كليب K-pop بآيدول افتراضي يجب أن يبقى الشخص نفسه عبر لقطات الأداء وتغيرات الإضاءة وزوايا الكاميرا — أصعب مشكلة ثبات في فيديوهات الذكاء الاصطناعي.',
        '打造 K-pop 音樂錄影帶，虛擬偶像必須在表演鏡頭、燈光變化與不同運鏡角度中保持同一個人 — 這是 AI 影片中最困難的一致性難題。'),
      solution: L(
        'A character master sheet with multi-angle references, face-locked generation via IP-Adapter, and performance shots animated to the track so lip-sync, stage lighting and crowd VFX land on the beat.',
        'ورقة شخصية رئيسية بمراجع متعددة الزوايا، توليد مقفول الوجه عبر IP-Adapter، ولقطات أداء مُحرّكة على الموسيقى لتصب كلًا من مزامنة الشفاه وإضاءة المسرح ومؤثرات الجمهور على الإيقاع.',
        '以多角度參考製作角色主設定表，透過 IP-Adapter 鎖定面孔生成，並依曲目製作表演鏡頭動畫，使對嘴、舞台燈光與人群特效全部踩在拍點上。'),
      result: L(
        'Two released singles with a locked virtual-idol identity across every shot — proof that an AI pipeline can carry a music artist’s visual brand.',
        'أغنيتان منشورتان بهوية آيدول افتراضية ثابتة في كل لقطة — إثبات أن خط إنتاج الذكاء الاصطناعي يمكنه حمل الهوية البصرية لفنان موسيقي.',
        '已發行兩支單曲，虛擬偶像身份跨每個鏡頭保持一致 — 證明 AI 流程足以承載音樂藝人的視覺品牌。'),
      pipeline: [
        { step: 1, title: L('Idol Character Design', 'تصميم شخصية الآيدول', '偶像角色設計'), desc: L('Multi-angle master sheet: face, hair, styling and stage outfits locked before any performance footage was generated.', 'ورقة رئيسية متعددة الزوايا: الوجه والشعر والإطلالة وأزياء المسرح قُفلت قبل توليد أي لقطة أداء.', '多角度主設定表：先生成並鎖定面孔、髮型、造型與舞台服裝，才開始任何表演畫面。') },
        { step: 2, title: L('Face-Locked Generation', 'توليد مقفول الوجه', '面孔鎖定生成'), desc: L('IP-Adapter face reference on every pass; frames failing the identity check were regenerated before animation.', 'مرجع وجه IP-Adapter في كل جولة؛ الإطارات الراسلة في فحص الهوية أُعيد توليدها قبل التحريك.', '每輪生成皆使用 IP-Adapter 面孔參考；未通過身份檢查的幀在動畫化前重新生成。') },
        { step: 3, title: L('Beat-Matched Performance', 'أداء مزامن على الإيقاع', '節拍同步表演'), desc: L('Performance shots animated to the track, with lip-sync, lighting sweeps and crowd VFX timed to the music’s beat grid.', 'لقطات الأداء حُرّكت على الموسيقى، مع مزامنة شفاه ومساحات إضاءة ومؤثرات جمهور موقوتة على شبكة الإيقاع.', '表演鏡頭依曲目製作動畫，對嘴、燈光掃動與人群特效全部對齊音樂節拍網格。') },
        { step: 4, title: L('MV Edit & Grade', 'مونتاج ودرجة الفيديو كليب', 'MV 剪輯與調色'), desc: L('Cut to the song structure — verse, chorus, bridge — with neon grades that shift per section while the idol’s skin and styling stay consistent.', 'مونتاج على بنية الأغنية — مقطع، لازمة، جسر — بدرجات نيون تتبدل مع كل مقطع بينما تبقى بشرة الآيدول وإطلالته ثابتة.', '依歌曲結構（主歌、副歌、橋段）剪輯，各段落霓虹色調轉換，偶像膚色與造型保持一致。') }
      ],
      tech: [
        { category: 'Character', items: ['Multi-angle master sheet', 'IP-Adapter FaceID', 'Identity QC loop'] },
        { category: 'Video', items: ['RunPod Wan 2.2', 'Beat-grid timing', 'FFmpeg'] },
        { category: 'Audio', items: ['Track-synced lip performance', 'Stems-based mix'] },
        { category: 'Post', items: ['DaVinci Resolve', 'Neon section grades', '4K master'] },
        { category: 'Series', items: ['2 singles released', 'Locked artist identity'] }
      ],
      bts: [],
      youtubeUrl: ''
    },

    /* ---------------- 6. The Island Courier ---------------- */
    ebb: {
      slug: 'island-courier',
      title: L('The Island Courier — Narrated Manga Series',
        'The Island Courier — سلسلة مانغا مسرودة',
        'The Island Courier — 有聲漫畫系列'),
      tag: L('Narrated Manga · Series', 'مانغا مسرودة · مسلسل', '有聲漫畫 · 系列'),
      heroVideo: '../assets/work-ebb1.mp4',
      heroPoster: '../assets/work-ebb1-poster.jpg',
      stats: { views: L('Series', 'مسلسل', '系列'), duration: 'Episodic', episodes: '2 live', prodTime: 'Trilingual' },
      challenge: L(
        'Turning a watercolor manga into a moving series without losing the book’s charm — characters, color palette and panel composition had to survive the jump from page to screen, with narration in three languages.',
        'تحويل مانغا بألوان مائية إلى سلسلة متحركة دون فقدان سحر الكتاب — شخصياته ولوحة ألوانه وتكوين لوحاته كان يجب أن تصمد في الانتقال من الصفحة إلى الشاشة، بسرد بثلاث لغات.',
        '將水彩漫畫轉化為動態系列而不失去書籍魅力 — 角色、色板與分鏡構圖必須在從紙頁到螢幕的跳躍中存活，並以三種語言配音。'),
      solution: L(
        'The manga’s own panels became the style reference: characters regenerated to match the original linework and washes, animated with gentle camera moves only — pans, pushes, breathing motion — then narrated in Arabic, English and Chinese.',
        'لوحات المانغا نفسها صارت المرجع الأسلوبي: أُعيد توليد الشخصيات لتطابق الخط والغسل اللوني الأصليين، وحُرّكت بحركات كاميرا هادئة فقط — تحريك، دفع، حركة تنفس — ثم سُرّدت بالعربية والإنجليزية والصينية.',
        '以漫畫原稿分鏡作為風格參考：重新生成角色以貼合原始線稿與水彩筆觸，僅以柔和鏡頭運動（平移、推進、呼吸感）製作動畫，再錄製阿拉伯語、英語與中文旁白。'),
      result: L(
        'Two episodes live on the channel with the watercolor world intact — a format that scales to full seasons without a traditional animation budget.',
        'حلقتان منشورتان على القناة والعالم المائي سليم — صيغة قابلة للتوسع إلى مواسم كاملة دون ميزانية أنمي تقليدي.',
        '兩集已於頻道上線，水彩世界完整保留 — 此格式可在無傳統動畫預算下擴展為完整季度。'),
      pipeline: [
        { step: 1, title: L('Source Panel Analysis', 'تحليل اللوحات المصدر', '原稿分鏡分析'), desc: L('Panels deconstructed into character sheets, palette swatches and composition rules that define the series look.', 'جُزّأت اللوحات إلى أوراق شخصيات وعينات لون وقواعد تكوين تُعرّف مظهر السلسلة.', '將分鏡拆解為角色表、色票與構圖規則，定義全系列視覺。') },
        { step: 2, title: L('Style-Matched Generation', 'توليد مطابق للأسلوب', '風格匹配生成'), desc: L('Characters and environments regenerated to match the manga’s linework and watercolor washes, checked per frame.', 'أُعيد توليد الشخصيات والبيئات لتطابق خط المانغا وغسلها اللوني، مع فحص لكل إطار.', '重新生成角色與環境以貼合漫畫線稿與水彩筆觸，逐幀檢查。') },
        { step: 3, title: L('Gentle Motion Pass', 'جولة الحركة الهادئة', '柔和動態處理'), desc: L('Only restrained camera moves — pans, slow pushes, ambient motion — so the image keeps its illustrated stillness.', 'حركات كاميرا متحفظة فقط — تحريك ودفع بطيء وحركة محيطة — لتبقى الصورة على سكونها التوضيحي.', '僅使用克制鏡頭運動 — 平移、緩慢推進、環境動態 — 讓畫面保留插畫般的靜謐。') },
        { step: 4, title: L('Trilingual Narration', 'السرد الثلاثي اللغات', '三語旁白'), desc: L('Narration recorded in Arabic, English and Chinese with per-language timing passes, so each version breathes at its own pace.', 'سُجّل التعليق بالعربية والإنجليزية والصينية مع جولات توقيت لكل لغة، لتتنفس كل نسخة بإيقاعها.', '以阿拉伯語、英語與中文錄製旁白，各語言獨立對時，讓每個版本以自己的節奏呼吸。') }
      ],
      tech: [
        { category: 'Style', items: ['Manga panel references', 'Watercolor palette lock', 'Character sheets'] },
        { category: 'Video', items: ['Restrained camera moves', 'FFmpeg'] },
        { category: 'Audio', items: ['AR / EN / ZH narration', 'Per-language timing passes'] },
        { category: 'Post', items: ['DaVinci Resolve', 'Episodic masters'] },
        { category: 'Distribution', items: ['2 episodes live on YouTube', 'Season-ready format'] }
      ],
      bts: [],
      youtubeUrl: 'https://www.youtube.com/watch?v=t9iwian6RVA'
    }
  };

  function getProjectId() {
    const path = window.location.pathname;
    const slug = path.split('/').filter(Boolean).pop();
    return SLUG_MAP[slug] || null;
  }

  function getLang() {
    return document.documentElement.getAttribute('lang') || 'en';
  }

  function t(obj) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    const lang = getLang();
    return obj[lang] || obj.en || '';
  }

  async function renderCaseStudy() {
    const projectId = getProjectId();
    const data = projectId && CASE_STUDY_DATA[projectId];
    if (!data) { window.location.href = '../index.html#work'; return; }

    document.title = t(data.title) + ' — Abdalla Maher';
    document.getElementById('ogTitle').setAttribute('content', t(data.title));
    document.getElementById('ogDesc').setAttribute('content', t(data.challenge).substring(0, 160));
    document.getElementById('ogImage').setAttribute('content', window.location.origin + '/' + data.heroPoster.replace(/^\.\.\//, ''));
    document.getElementById('ogUrl').setAttribute('content', window.location.href);
    document.getElementById('twTitle').setAttribute('content', t(data.title));
    document.getElementById('twDesc').setAttribute('content', t(data.challenge).substring(0, 160));
    document.getElementById('twImage').setAttribute('content', window.location.origin + '/' + data.heroPoster.replace(/^\.\.\//, ''));
    document.getElementById('canonicalUrl').setAttribute('href', window.location.href);

    document.getElementById('caseBreadcrumbTitle').textContent = t(data.title);
    document.getElementById('caseTag').textContent = t(data.tag);
    document.getElementById('caseTitle').textContent = t(data.title);
    document.getElementById('statViews').textContent = t(data.stats.views);
    document.getElementById('statDuration').textContent = data.stats.duration;
    document.getElementById('statEpisodes').textContent = data.stats.episodes;
    document.getElementById('statProdTime').textContent = data.stats.prodTime;

    // Local video hero (no external embeds)
    const heroMedia = document.getElementById('caseHeroMedia');
    heroMedia.innerHTML = `
      <div class="case-video-frame">
        <video controls playsinline preload="metadata" poster="${data.heroPoster}" src="${data.heroVideo}" title="${t(data.title)}" style="width:100%;height:100%;object-fit:cover;display:block;background:#000;"></video>
      </div>`;

    document.getElementById('caseChallenge').textContent = t(data.challenge);
    document.getElementById('caseSolution').textContent = t(data.solution);
    document.getElementById('caseResult').textContent = t(data.result);

    document.getElementById('casePipelineSteps').innerHTML = data.pipeline.map(step => `
      <div class="pipeline-step-detail">
        <div class="step-header">
          <span class="step-number">${step.step}</span>
          <h3>${t(step.title)}</h3>
        </div>
        <p>${t(step.desc)}</p>
      </div>`).join('');

    document.getElementById('caseTechGrid').innerHTML = data.tech.map(group => `
      <div class="tech-group">
        <h4>${group.category}</h4>
        <ul>${group.items.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>`).join('');

    const btsSection = document.querySelector('.case-bts');
    if (data.bts && data.bts.length) {
      document.getElementById('caseBtsGrid').innerHTML = data.bts.map(item => `
        <figure class="bts-item">
          <figcaption>${t(item.caption)}</figcaption>
        </figure>`).join('');
    } else if (btsSection) {
      btsSection.style.display = 'none';
    }

    // Optional YouTube link under the hero video
    if (data.youtubeUrl) {
      const wrap = document.createElement('p');
      wrap.style.cssText = 'text-align:center;margin:1rem 0 0;';
      wrap.innerHTML = `<a href="${data.youtubeUrl}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;">${getLang() === 'ar' ? 'شاهد الحلقة كاملة على يوتيوب' : (getLang() === 'zh-TW' ? '在 YouTube 上觀看完整影片' : 'Watch the full episode on YouTube')}</a>`;
      heroMedia.appendChild(wrap);
    }
  }

  async function loadRelatedProjects() {
    try {
      const res = await fetch('../content.json', { cache: 'no-store' });
      const content = await res.json();
      const projects = content.site.projects || {};
      const currentId = getProjectId();
      const relatedIds = Object.keys(projects).filter(id => id !== currentId).slice(0, 3);
      const grid = document.getElementById('relatedGrid');
      grid.innerHTML = relatedIds.map(id => {
        const p = projects[id];
        return `
          <article class="related-item">
            <a href="./${p.slug}/" class="related-link">
              <img src="../${p.image}" alt="" loading="lazy" decoding="async">
              <h4>${p.case_study ? p.case_study.title : id}</h4>
            </a>
          </article>`;
      }).join('');
    } catch (e) {
      console.warn('Could not load related projects:', e);
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    await renderCaseStudy();
    await loadRelatedProjects();
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.pageYOffset > 600);
      }, { passive: true });
      backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  });
})();
