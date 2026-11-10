/* ============================================================
   case-study.js — 2026 Trilingual Studio Case Study Engine
   Supports live language switching (EN · AR · zh-TW) & multi-dub video
   ============================================================ */

(function () {
  'use strict';

  var SLUG_MAP = {
    'hawk-of-quraysh': 'hawk',
    'taiwan-ai-twin': 'twre',
    'australia-real-estate': 'aure',
    'date-oasis': 'oasis',
    'jojoba': 'jojoba',
    'normandy-1944': 'normandy',
    'baghdad-1258': 'baghdad',
    'franklin': 'franklin',
    'titanic': 'titanic',
    'taipei-cafe-reel': 'twcafe',
    'neon-heartbeat': 'neon'
  };

  function L(en, ar, zh) {
    return { en: en, ar: ar, 'zh-TW': zh };
  }

  var CASE_STUDY_DATA = {
    hawk: {
      slug: 'hawk-of-quraysh',
      title: L(
        'Hawk of Quraysh (صقر قريش) — Trilingual Prestige Historical Drama',
        'مسلسل صقر قريش — دراما تاريخية سينمائية ثلاثية اللغات',
        '《古萊什之鷹》(صقر قريش) — 三語精品歷史劇集'
      ),
      tag: L(
        'Prestige Historical Drama · AR / EN / ZH-TW',
        'دراما تاريخية سينمائية · عربي / إنجليزي / صيني',
        '精品歷史劇集 · 阿 / 英 / 繁中三語'
      ),
      heroVideo: '../../assets/work-hawk-ar.mp4',
      heroPoster: '../../assets/work-hawk-poster.jpg',
      dubs: {
        ar: { label: 'العربية الفصحى', src: '../../assets/work-hawk-ar.mp4' },
        en: { label: 'English Dub', src: '../../assets/work-hawk-en.mp4' },
        'zh-TW': { label: '繁體中文配音', src: '../../assets/work-hawk-zh.mp4' }
      },
      stats: {
        views: L('Episodic Series', 'مسلسل درامي', '連載歷史劇'),
        duration: 'EP01–EP04+',
        episodes: 'AR · EN · ZH-TW',
        prodTime: '1080p · -14 LUFS'
      },
      challenge: L(
        'Directing a multi-episode 8th-century historical drama in Al-Andalus where multiple characters interact in the same palace frame without facial drift, wardrobe inconsistency, or listener lip-movement bleed—delivered simultaneously in Classical Arabic, English, and Traditional Chinese.',
        'إخراج مسلسل درامي تاريخي في الأندلس بالقرن الثامن الميلادي يتحدث فيه عدة أبطال داخل نفس الكادر في قصر قرطبة دون أي تغير في الملامح أو الأزياء، مع إغلاق تام لشفاه المستمعين، وتسليم الحلقات بالتزامن بالعربية الفصحى المشكولة والإنجليزية والصينية التقليدية.',
        '執導八世紀安達盧斯宮廷歷史劇，要求多角色於同一宮殿鏡頭內對戲時維持面孔與古裝 100% 一致、傾聽者嚴格閉唇，並同步交付標準阿語、英語與繁體中文對嘴母帶。'
      ),
      solution: L(
        'Built multi-angle 4K character identity cards in Nano Banana 2.1, directed unbroken 15-second continuous shots via Gemini Omni 1.2 Flash with ingredient binding, and executed 24fps 0-frame lip-sync dubbing with F5-TTS spectral mel-inpainting and Gemini 3.8 Flash TTS.',
        'بناء بطاقات هوية مرجعية بدقة 4K من زوايا متعددة عبر Nano Banana 2.1، وإخراج مشاهد متصلة بطول 15 ثانية عبر Gemini Omni 1.2 Flash بتقنية المكونات، ثم تنفيذ دبلجة تمثيلية مفحوصة بسرعة 24 إطاراً/ثانية عبر Gemini 3.8 Flash TTS والترميم الطيفي F5-TTS.',
        '以 Nano Banana 2.1 建立 4K 多視角角色卡，透過 Gemini Omni 1.2 Flash 結合組件綁定生成 15 秒一鏡到底戲劇鏡頭，並以 Gemini 3.8 Flash TTS 與 F5-TTS 頻譜修復完成 24fps 零誤差三語對嘴。'
      ),
      result: L(
        'Four full episodes mastered at 1080p HD and -14 LUFS broadcast loudness across three native languages—proving studio-grade serialized drama production at a fraction of traditional set costs.',
        'إنجاز أربع حلقات كاملة بدقة 1080p HD ومعايرة صوتية -14 LUFS بثلاث لغات أصيلة — مما يثبت قدرة الاستوديو على إنتاج مسلسلات درامية متكاملة بمستوى تلفزيوني عالمي.',
        '已完成四集 1080p HD 與 -14 LUFS 廣播級三語成片，證明一人 AI 影視工作室足以穩定交付電視台規格的古裝劇集。'
      ),
      pipeline: [
        {
          step: '01',
          title: L('100% Diacritized Script & Subtext', 'تشكيل إعرابي كامل وسيناريو نفسي', '全標音劇本與潛台詞調度'),
          desc: L('Every line is phonetically audited across Classical Arabic, dramatic English, and Mandarin with precise [0-12.2s] dialogue windows.', 'تدقيق لغوي وصوتي لكل جملة بالعربية الفصحى المشكولة والإنجليزية والصينية مع ضبط نوافذ الحوار والوقفات الدرامية.', '逐句審校標準阿語全標音、戲劇英語與中文台詞，精確控制對白時碼與停頓。')
        },
        {
          step: '02',
          title: L('4K Multi-Character Identity Lock', 'قفل هوية الأبطال وقصر قرطبة 4K', '4K 宮廷與多角色身份鎖定'),
          desc: L('Character cards for Abd al-Rahman I, Badr, and council nobles bound together with architectural palace ingredients.', 'ربط بطاقات شخصيات عبد الرحمن الداخل وبدر وقادة المجلس مع المرجع المعماري لقصر قرطبة لمنع أي انحراف بصري.', '將埃米爾與大臣角色設定卡連同科爾多瓦宮殿建築參考一併綁定生成。')
        },
        {
          step: '03',
          title: L('24fps Lip-Sync & Spectral Repair', 'فحص الشفاه 24fps والترميم الطيفي', '24fps 逐幀對嘴與頻譜修復'),
          desc: L('Frame-by-frame mouth-state verification ensuring 0 VAD mismatch frames and strict listener closed-lip discipline.', 'فحص إطاري يضمن صفر إطار خطأ بين الصوت وحركة الشفاه مع بقاء شفاه المستمعين مغلقة تماماً.', '逐幀驗證發聲者唇形與傾聽者閉唇狀態，實現零幀差對嘴同步。')
        },
        {
          step: '04',
          title: L('Orchestral Score & -14 LUFS Master', 'الموسيقى الأوركسترالية وماستر -14 LUFS', '交響配樂與 -14 LUFS 母帶'),
          desc: L('Scored with licensed Shutterstock Ultra & Lyria 3.5 Middle-Eastern orchestral stems calibrated to broadcast loudness.', 'تأليف ومزج أوركسترالي مرخص من مكتبة Shutterstock Ultra وLyria 3.5 بمعايرة بث قياسية -14 LUFS.', '採用 Shutterstock Ultra 與 Lyria 3.5 正版中東史詩配樂，完成廣播級混音。')
        }
      ],
      tech: [
        { category: 'Cinema Generation', items: ['Gemini Omni 1.2 Flash (15s Continuous)', 'Ingredient Asset Binding'] },
        { category: 'Identity Lock', items: ['Nano Banana 2.1 (4K Cards)', 'Sub-Shot Luminance Calibration'] },
        { category: 'Trilingual Voice & QC', items: ['Gemini 3.8 Flash TTS', 'F5-TTS MPS Mel-Inpainting', '24fps Lip-Sync Audit'] },
        { category: 'Post & Mastering', items: ['DaVinci Resolve', 'Shutterstock Ultra Score', 'FFmpeg -14 LUFS'] }
      ]
    },

    twre: {
      slug: 'taiwan-ai-twin',
      title: L(
        'Taiwan Pre-Sale Real Estate — AI Virtual Sample House (AI 虛擬樣品屋)',
        'التوأم الرقمي لعقارات تايوان قبل البناء — شقة العرض الافتراضية (AI 虛擬樣品屋)',
        '台灣預售屋行銷革新 — AI 虛擬樣品屋實境導覽'
      ),
      tag: L(
        'Real Estate AI Digital Twin · Taiwan (預售屋)',
        'توأم رقمي عقاري · تايوان (預售屋)',
        '房地產 AI 虛擬樣品屋 · 台灣建案'
      ),
      heroVideo: '../../assets/work-tw-realestate.mp4',
      heroPoster: '../../assets/work-tw-realestate-poster.jpg',
      stats: {
        views: L('Commercial Twin', 'توأم عقاري تجاري', '建案導覽商片'),
        duration: '28 sec',
        episodes: 'Taiwanese Mandarin',
        prodTime: '1080p · -14 LUFS'
      },
      challenge: L(
        'Property developers in Taiwan spend millions of TWD building temporary physical sample houses for pre-sale projects (預售屋). Static 3D renders alone fail to hold buyer attention on social feeds.',
        'تنفق شركات التطوير العقاري في تايوان ملايين الدولارات لبناء شقق عرض مؤقتة لمشاريع البيع على الخارطة، في حين تعجز الصور الهندسية الثابتة وحدها عن جذب المشترين في الإعلانات الرقمية.',
        '台灣建商在預售階段往往需耗資數百萬搭建臨時實體樣品屋，然而單靠靜態 3D 渲染圖卻難以在社群廣告中留住買家目光。'
      ),
      solution: L(
        'Converted interior architectural renders directly into a warm, presenter-led walkthrough spoken in authentic Taiwanese Mandarin (看屋、建案、樣品屋), maintaining exact spatial lighting, furniture geometry, and natural hand gestures.',
        'تحويل التصاميم الهندسية الداخلية مباشرة إلى جولة مرئية حية يقودها مقدم عقاري واقعي بصياغة تايوانية أصيلة، مع الحفاظ التام على هندسة الأثاث والإضاءة المعمارية وحركة اليدين الطبيعية.',
        '直接將室內 3D 設計圖轉化為親切專業的主持人帶看影片，採用道地台灣國語房產詞彙（看屋、建案、樣品屋），精準保留空間格局與自然光影。'
      ),
      result: L(
        'A high-converting pre-sale marketing asset delivered in days rather than months—allowing developers and agencies to launch buyer campaigns long before physical construction.',
        'أصل تسويقي عقاري عالي التحويل يُنجز في أيام بدلاً من شهور — مما يمكّن المطورين العقاريين من إطلاق حملات الحجز والبيع المسبق بأقل تكلفة وأعلى موثوقية.',
        '在數日內交付高轉換預售導覽影片，大幅節省實體樣品屋前期成本，協助建案提早啟動社群集客與預約看屋。'
      ),
      pipeline: [
        {
          step: '01',
          title: L('Taiwanese Real Estate Copywriting', 'صياغة عقارية تايوانية أصيلة', '道地台灣房產行銷腳本'),
          desc: L('Crafted specifically with authentic Taiwan real estate terminology and warm conversational pacing.', 'كتابة النص بمصطلحات السوق العقاري التايواني الأصيلة وإيقاع ترحيبي مقنع للمشترين.', '嚴格採用台灣在地買房語境與自然親切的導覽節奏。')
        },
        {
          step: '02',
          title: L('Architectural Render Lock', 'قفل المخطط والتصميم الداخلي', '3D 室內空間與材質鎖定'),
          desc: L('Preserving kitchen islands, window cityscapes, cabinetry, and warm daylight across camera angles.', 'الحفاظ على تفاصيل المطبخ والإطلالة البانورامية والخامات الخشبية عبر مختلف الزوايا.', '確保中島廚房、落地窗景與木質裝潢於不同運鏡下完全一致。')
        },
        {
          step: '03',
          title: L('Presenter Lip-Sync & Blocking', 'حركة المقدم وتطابق الشفاه', '主持人肢體調度與精準對嘴'),
          desc: L('Natural presenter walkthrough gestures synchronized frame-accurately to Mandarin voiceover.', 'حركات تقديم طبيعية داخل الغرف متزامنة بدقة الإطار مع الصوت التايواني.', '自然手勢帶看與流暢口條對嘴，消除傳統數位人的僵硬感。')
        },
        {
          step: '04',
          title: L('Clean Commercial Polish', 'الماستر الإعلاني النهائي', '商業級字幕與響度母帶'),
          desc: L('Crisp Traditional Chinese subtitles and -14 LUFS audio clarity tailored for Meta, LINE, and YouTube ads.', 'ترجمة صينية تقليدية واضحة وصوت نقي بمعيار -14 LUFS مهيأ لإعلانات السوشيال ميديا.', '搭配清晰繁中字幕與 -14 LUFS 混音，完美適配社群投放。')
        }
      ],
      tech: [
        { category: 'Spatial Video', items: ['Gemini Omni 1.2 Flash', 'Architectural Ingredient Lock'] },
        { category: 'Presenter & Voice', items: ['Nano Banana 2.1 Identity', 'Taiwanese Mandarin Voiceover'] },
        { category: 'Post-Production', items: ['Zero-Artifact Frame Cut', 'FFmpeg -14 LUFS Master'] }
      ]
    },

    aure: {
      slug: 'australia-real-estate',
      title: L(
        'Australian Property Market Intelligence — Sydney & Capital Cities',
        'تحليل وتسويق سوق العقارات الأسترالي — سيدني والعواصم الأسترالية',
        '澳洲房地產市場數據情報 — 雪梨與各大首府城市解析'
      ),
      tag: L(
        'Real Estate Market Intelligence · Australia',
        'تسويق وتحليل عقاري · أستراليا',
        '房地產市場行銷 · 澳洲雪梨'
      ),
      heroVideo: '../../assets/work-australia-realestate.mp4',
      heroPoster: '../../assets/work-australia-realestate-poster.jpg',
      stats: {
        views: L('Market Intelligence', 'تقرير عقاري مصور', '房市數據影片'),
        duration: '36 sec',
        episodes: 'EN + AR/ZH Subs',
        prodTime: '1080p · -14 LUFS'
      },
      challenge: L(
        'Drawing on my professional experience working in Australian real estate marketing, international investors and local buyers need complex housing data—Cotality capital-city price shifts, RBA cash-rate moves, and auction clearance trends—presented with institutional authority rather than dry spreadsheets.',
        'انطلاقاً من خبرتي العملية السابقة في تسويق العقارات في أستراليا، يحتاج المشترون والمستثمرون الدوليون إلى فهم مؤشرات السوق المعقدة — مثل تغيرات أسعار سيدني وملبورن وبريسبان وقرارات الفائدة الأسترالية — في قالب بصري مؤسسي موثوق بدلاً من الجداول الجامدة.',
        '結合我過往在澳洲房地產行銷的實務經驗，跨國買家與投資人需要以更具權威視覺感的方式，快速掌握雪梨、布里斯本、墨爾本房價指數（Cotality）與澳洲央行利率動向。'
      ),
      solution: L(
        'Combined watermark-free 1080p Sydney Harbour & Australian coastal aerials with programmatic Bloomberg-style glassmorphic data visualizations, authoritative Gemini 3.8 English narration, licensed acoustic orchestration, and simultaneous English, Arabic (Raqm SFArabic), and Traditional Chinese subtitles.',
        'دمج لقطات جوية سينمائية لخليج سيدني والسواحل الأسترالية بدقة 1080p مع بطاقات بيانات زجاجية مبرمجة بأسلوب بلومبيرغ، وتعليق صوتي إنجليزي احترافي عبر Gemini 3.8، وموسيقى مرخصة، وترجمة ثلاثية متزامنة (إنجليزي · عربي بخط SFArabic Raqm · صيني تقليدي).',
        '融合雪梨港與澳洲海岸高畫質空拍、程式化彭博風毛玻璃動態圖表、Gemini 3.8 專業英語旁白，以及英、阿、繁中三語同步字幕。'
      ),
      result: L(
        'An agency-grade property market intelligence brief ready for buyer advisories, LinkedIn thought leadership, and international investor portals across APAC and MENA.',
        'فيديو تحليلي وتسويقي بمستوى الوكالات العقارية الدولية، جاهز للاستخدام في استشارات المشترين ومنصة LinkedIn وبوابات الاستثمار العقاري العابرة للحدود.',
        '交付跨國房產顧問等級的市場分析成片，適用於國際買家說明會、LinkedIn 專業內容與亞太/中東投資人社群。'
      ),
      pipeline: [
        {
          step: '01',
          title: L('Australian Market Data Synthesis', 'تحليل مؤشرات السوق الأسترالي', '澳洲首府房市數據彙整'),
          desc: L('Structured verified Cotality monthly capital-city metrics (Sydney -1.4%, Brisbane -1.5%, Melbourne -0.7%, Darwin +0.4%) into a clear investor narrative.', 'تحويل مؤشرات Cotality الشهرية للعواصم الأسترالية وتوجهات الفائدة إلى سرد تحليلي واضح ومكثف للمستثمرين.', '將雪梨、布里斯本、墨爾本與達爾文最新月度漲跌幅轉化為精煉投資敘事。')
        },
        {
          step: '02',
          title: L('Glassmorphic Data Visualization', 'تصميم بطاقات البيانات الزجاجية', '彭博級毛玻璃動態圖表'),
          desc: L('Programmatic Pillow RGBA rendering with color-coded horizontal bar charts, RBA outlook cards, and TSC gold branding.', 'توليد برمجي عالي الدقة لرسوم الأعمدة البيانية وبطاقات التوقعات الزجاجية مع هوية استوديو TSC الذهبية.', '以 Python Pillow 逐幀渲染高解析毛玻璃橫條圖、利率展望卡與 TSC 金色徽章。')
        },
        {
          step: '03',
          title: L('Trilingual Raqm Typography', 'الطباعة الثلاثية بمحرك Raqm', '英阿繁中三語精準排版'),
          desc: L('Simultaneous EN, shaped Arabic (SFArabic + Raqm), and Traditional Chinese (STHeiti) captions with zero glyph defects.', 'عرض متزامن للإنجليزية والعربية المشكلة هندسياً عبر Raqm والصينية التقليدية بدون أي عيوب خطية.', '同屏呈現英語、Raqm 引擎塑形阿拉伯語與繁體中文字幕，字距清晰優雅。')
        },
        {
          step: '04',
          title: L('Spectral Gate & -14 LUFS Mix', 'البوابة الطيفية وماستر -14 LUFS', '頻譜品檢與廣播級混音'),
          desc: L('Paired Gemini 3.8 Flash TTS narration with spectral-verified orchestration (Top5Bin = 4.55%) normalized to -14.0 LUFS.', 'مزج التعليق الصوتي مع خلفية موسيقية اجتازت الفحص الطيفي الصارم ومعايرة نهائية عند -14.0 LUFS.', '旁白搭配通過頻譜門檻（Top5Bin = 4.55%）之正版配樂，精準校正至 -14.0 LUFS。')
        }
      ],
      tech: [
        { category: 'Market Domain', items: ['Australian Real Estate Marketing', 'Cotality Capital City Metrics'] },
        { category: 'Motion Graphics', items: ['Python Pillow RGBA Engine', 'SFArabic Raqm + STHeiti TC'] },
        { category: 'Voice & Score', items: ['Gemini 3.8 Flash TTS', 'Shutterstock Ultra Score (-14 LUFS)'] }
      ]
    },

    oasis: {
      slug: 'date-oasis',
      title: L(
        'Date Oasis (واحة التمر) — Luxury Arabian Medjool Commercial',
        'واحة التمر — إعلان سينمائي فاخر للتمور والضيافة العربية',
        '綠洲椰棗 (Date Oasis) — 中東皇室椰棗與咖啡奢華商業廣告'
      ),
      tag: L(
        'Luxury F&B Commercial · Classical Arabic',
        'إعلان علامة تجارية فاخرة · الضيافة العربية',
        '奢華食品商業廣告 · 阿拉伯待客文化'
      ),
      heroVideo: '../../assets/work-date-oasis.mp4',
      heroPoster: '../../assets/work-date-oasis-poster.jpg',
      stats: {
        views: L('Luxury Brand Ad', 'إعلان تجاري فاخر', '奢華品牌廣告'),
        duration: '29 sec',
        episodes: 'Classical Arabic + EN',
        prodTime: '1080p · -14 LUFS'
      },
      challenge: L(
        'Remastering an older low-resolution slideshow commercial into a true 1080p luxury Arabian hospitality spot—eliminating static frames, burned yellow captions, and AI packaging text distortions while preserving authentic product warmth.',
        'تحويل إعلان قديم منخفض الدقة ومعتمد على الصور الثابتة والنصوص المحروقة إلى إعلان سينمائي فاخر بدقة 1080p يبرز فخامة تمور المجدول والقهوة العربية بحركة حقيقية متصلة وصفر تشوهات نصية أو بصرية.',
        '將舊版低解析度靜態圖片輪播廣告全面重製為 1080p 奢華商業大片，徹底消除靜態縮放、亂碼包裝文字與粗糙黃色字幕。'
      ),
      solution: L(
        'Directed two unbroken 15-second 1080p takes in Gemini Omni 1.2 Flash using cleaned product ingredients (sunlit oasis palm harvest + golden dallah pouring steaming Arabic qahwa beside royal Medjool dates), paired with 100% diacritized Classical Arabic narration and licensed Middle-Eastern orchestration.',
        'إخراج مشهدين متصلين بدقة 1080p عبر Gemini Omni 1.2 Flash بتقنية المكونات النظيفة (واحة النخيل الذهبية + دلة القهوة العربية البخارية بجانب تمور المجدول الملكية)، مع تعليق صوتي فصيح مشكول بالكامل وموسيقى شرقية أوركسترالية مرخصة.',
        '運用乾淨產品組件於 Gemini Omni 1.2 Flash 生成兩鏡 15 秒一鏡到底 1080p 實境動態，搭配全標音標準阿拉伯語磁性旁白與正版中東交響配樂。'
      ),
      result: L(
        'A broadcast-ready 1080p MENA luxury F&B commercial mastered in 48kHz stereo at -14 LUFS with crisp Raqm Arabic glassmorphic typography.',
        'إعلان تجاري فاخر بمعايير البث التلفزيوني بدقة 1080p وتردد 48kHz استيريو (-14 LUFS) وبطاقات زجاجية عربية مرسومة بمحرك Raqm.',
        '交付 1080p 廣播級奢華食品商業廣告（48kHz 立體聲、-14 LUFS），展現中東高端品牌廣告製片實力。'
      ),
      pipeline: [
        { step: '01', title: L('Product Ingredient Isolation', 'عزل المكونات البصرية النظيفة', '產品視覺組件純化'), desc: L('Extracted clean botanical and brass-platter Medjool references free of legacy burned captions.', 'استخلاص مراجع النخيل وأطباق المجدول النحاسية الفاخرة بعد تنظيفها تماماً من النصوص القديمة.', '擷取無舊字幕干擾之椰棗林與雕花銅盤產品參考圖。') },
        { step: '02', title: L('Unbroken 15s Fluid Cinema', 'توليد سينمائي متصل 15s', '15 秒連續流體運鏡'), desc: L('Generated continuous oasis drone glides and steaming Arabic coffee pours via Gemini Omni 1.2 Flash.', 'توليد تحليق سلس وسط النخيل وسكب واقعي للقهوة العربية البخارية عبر Gemini Omni 1.2 Flash.', '以 Gemini Omni 1.2 Flash 生成椰棗林推進與熱咖啡傾注真實流體動態。') },
        { step: '03', title: L('Diacritized Arabic Brand Voice', 'تعليق إعلاني فصيح مشكول 100%', '全標音阿語奢華旁白'), desc: L('Synthesized warm prestige Arabic narration via Gemini 3.8 Flash TTS audited word-for-word.', 'تسجيل تعليق صوتي دافئ عبر Gemini 3.8 Flash TTS مع فحص نطقي كامل لكل كلمة.', '以 Gemini 3.8 Flash TTS 錄製溫潤磁性旁白並逐詞品檢。') },
        { step: '04', title: L('Raqm Typography & -14 LUFS Mix', 'بطاقات Raqm وماستر -14 LUFS', '毛玻璃字幕與 -14 LUFS 混音'), desc: L('Finished with SFArabic Raqm glassmorphic captions and Spectral-Gate-verified oud/orchestral score.', 'إضافة بطاقات زجاجية بخط SFArabic ومزج أوركسترالي شرقي مفحوص طيفياً بمعيار -14 LUFS.', '結合精緻雙語毛玻璃字卡與正版中東配樂完成母帶。') }
      ],
      tech: [
        { category: 'Cinema Generation', items: ['Gemini Omni 1.2 Flash (1080p)', 'Product Ingredient Binding'] },
        { category: 'Voice & Music', items: ['Gemini 3.8 Flash TTS (Arabic)', 'Licensed Middle-Eastern Score'] },
        { category: 'Post-Production', items: ['Pillow Raqm SFArabic', '48kHz Stereo · -14 LUFS'] }
      ]
    },

    jojoba: {
      slug: 'jojoba',
      title: L(
        'Pure Egyptian Jojoba Oil — Cold-Pressed Skincare Commercial',
        'زيت الجوجوبا المصري النقي — إعلان عناية بالبشرة للسوق التايواني',
        '埃及純天然荷荷芭油 — 第一道冷壓保養精品商業廣告'
      ),
      tag: L(
        'Luxury Skincare Ad · Authentic Taiwanese Mandarin',
        'إعلان تجميلي فاخر · موجه للسوق التايواني',
        '精品保養商業廣告 · 道地台灣國語文案與配音'
      ),
      heroVideo: '../../assets/work-jojoba.mp4',
      heroPoster: '../../assets/work-jojoba-poster.jpg',
      stats: {
        views: L('Skincare Commercial', 'إعلان عناية بالبشرة', '保養品牌廣告'),
        duration: '33 sec',
        episodes: '台灣國語 + EN',
        prodTime: '1080p · -14 LUFS'
      },
      challenge: L(
        'Replacing frozen static oil-pour images and low-bitrate 528p footage with genuine macro fluid physics—while crafting authentic Taipei agency copywriting (台灣國語) that resonates naturally with Taiwanese skincare consumers.',
        'استبدال صور سكب الزيت المتجمدة واللقطات منخفضة الدقة (528p) بتصوير ماكرو سينمائي حقيقي لحركة القطرات الذهبية بدقة 1080p، مع صياغة إعلانية تايوانية أصيلة تخاطب ذائقة مستهلكي العناية بالبشرة في تايوان.',
        '徹底淘汰舊版 528p 凍結油滴靜態圖與生硬字詞，改以真實微距慢動作金黃油滴漣漪與無標極簡瓶身攝影，並撰寫符合台北專櫃保養品語感的道地台灣國語文案。'
      ),
      solution: L(
        'Generated two continuous 15-second 1080p macro fluid & spa product takes in Gemini Omni 1.2 Flash bound to clean botanical and dropper-bottle ingredients, paired with refined Taiwanese Mandarin narration ("不是只做表面… 卻完全不黏膩").',
        'توليد مشهدين متصلين بدقة 1080p عبر Gemini Omni 1.2 Flash يجمعان بين انسياب الزيت المعصور على البارد وقطارة السبا الزجاجية الفاخرة، مع تعليق صوتي تايواني دافئ وموسيقى هادئة مرخصة.',
        '透過 Gemini Omni 1.2 Flash 結合植物與金領滴管瓶組件生成 1080p 微距慢動作油滴與芳療場景，搭配從容自然的台灣國語配音（「真正好的保養，不是只做表面… 卻完全不黏膩」）。'
      ),
      result: L(
        'A luminous 1080p luxury beauty commercial bridging Egyptian natural origin with Taipei prestige skincare branding.',
        'إعلان تجميلي فاخر بدقة 1080p يربط بين نقاء المصدر المصري الطبيعي ومعايير التسويق التجميلي الراقية في تايبيه.',
        '完成兼具天然產地故事與專櫃極簡美學的 1080p 保養品商業廣告，精準切中台灣美妝與芳療市場需求。'
      ),
      pipeline: [
        { step: '01', title: L('Taiwan Skincare Copywriting', 'صياغة تجميلية بأسلوب تايبيه الأصيل', '台北專櫃級台灣國語文案'), desc: L('Authored crisp 5–10 character Taiwanese Mandarin clauses using authentic phrasing (不黏膩, 從容的光澤).', 'كتابة أشطر رشيقة بمفردات العناية بالبشرة التايوانية الأصيلة وإيقاع هادئ واثق.', '採用「不是只做表面」、「不黏膩」、「從容的光澤」等道地台灣保養語彙。') },
        { step: '02', title: L('Macro Liquid Gold Physics', 'فيزياء السوائل الذهبية بالماكرو', '微距金黃流體物理生成'), desc: L('Replaced frozen pours with slow-motion cold-press oil streams and concentric pipette droplet ripples.', 'استبدال اللقطات المتجمدة بانسياب بطيء حقيقي وتموجات دائرية ناعمة لقطرات الزيت.', '以慢動作呈現冷壓油流與滴管釋放油滴之真實同心圓漣漪。') },
        { step: '03', title: L('Minimalist Bottle Lock', 'ثبات الزجاجة الفاخرة بلا تشوه نصي', '無標極簡金領滴管瓶鎖定'), desc: L('Preserved crystal-clear glass, gold collar, flickering spa candle, and marble reflections at 1080p.', 'الحفاظ على نقاء الزجاجة الذهبية والشمعة المشتعلة وانعكاسات الرخام بدقة 1080p نظيفة.', '鎖定透明玻璃瓶身、金色瓶領與燭光大理石質感，零亂碼標籤。') },
        { step: '04', title: L('48kHz Stereo Spa Master', 'ماستر صوتي هادئ بمعيار -14 LUFS', '48kHz 立體聲芳療級混音'), desc: L('Mixed audited Taiwanese voiceover over Spectral-Gate-verified gentle strings at -14.0 LUFS.', 'مزج التعليق الصوتي المفحوص مع وتريات هادئة مرخصة بمعايرة -14.0 LUFS.', '結合逐詞品檢配音與柔和弦樂配樂，完成 -14.0 LUFS 廣播級母帶。') }
      ],
      tech: [
        { category: 'Macro Cinema', items: ['Gemini Omni 1.2 Flash (1080p)', 'Slow-Motion Fluid Dynamics'] },
        { category: 'Taiwan Localization', items: ['Authentic 台灣國語 Copywriting', 'Gemini 3.8 Flash TTS'] },
        { category: 'Mastering', items: ['Traditional Chinese Glass Overlays', '48kHz Stereo · -14 LUFS'] }
      ]
    },

    normandy: {
      slug: 'normandy-1944',
      title: L(
        'D-Day Normandy 1944 — AI Face-Lock Action Cinema (Director\'s Cut)',
        'إنزال نورماندي ١٩٤٤ — نسخة المخرج بقفل الهوية البصرية للأكشن',
        '1944 諾曼第登陸 — AI 角色面孔鎖定戰爭動作短片（導演剪輯版）'
      ),
      tag: L(
        'Action Cinema · Face-Lock VFX',
        'سينما الأكشن التاريخية · ثبات الملامح VFX',
        '戰爭動作電影 · 面孔鎖定 VFX'
      ),
      heroVideo: '../../assets/work-normandy-1944.mp4',
      heroPoster: '../../assets/work-normandy-1944-poster.jpg',
      stats: {
        views: L('Director\'s Cut', 'نسخة المخرج', '導演剪輯版'),
        duration: '33 sec',
        episodes: 'Mandarin Dialogue',
        prodTime: '1080p · -14 LUFS'
      },
      challenge: L(
        'Maintaining 100% actor facial likeness during chaotic World War II beach landings—transitioning from wide aerial amphibious craft to handheld combat close-ups with smoke, water spray, and urgent emotional dialogue.',
        'الحفاظ على ثبات ملامح الممثلين بنسبة 100% وسط فوضى إنزال الحرب العالمية الثانية — بالانتقال من اللقطات الجوية الواسعة لقوارب الإنزال إلى اللقطات القريبة المحمولة باليد وسط الدخان والمياه والحوار الانفعالي.',
        '在二戰搶灘的劇烈爆破、煙塵與手持晃動特寫之間，維持兩名主角 100% 面孔特徵一致，並呈現緊湊自然的中文戰場對白。'
      ),
      solution: L(
        'Locked multi-angle actor face cards across period WWII uniforms and helmet states, tightened the pacing into a 33-second 4-scene Director\'s Cut, and layered spectral-verified suspense strings beneath the combat mix.',
        'قفل بطاقات وجوه الممثلين عبر زوايا متعددة بالزي العسكري التاريخي، ومونتاج إيقاعي مشدود في نسخة مخرج من ٣٣ ثانية مع موسيقى أوتار توتر درامية اجتازت الفحص الطيفي الصارم.',
        '建立穿戴鋼盔與戰損狀態的多視角演員面孔卡，精剪為毫無冷場的 33 秒導演版，並疊加通過頻譜檢驗的懸疑弦樂聲床。'
      ),
      result: L(
        'A visceral war-cinema proof of concept demonstrating that AI character lock survives extreme motion, pyrotechnics, and two-person dramatic framing.',
        'عمل سينمائي حربي يثبت قدرة منظومة قفل الهوية البصرية على الصمود في أقسى مشاهد الحركة والانفجارات والتمثيل الثنائي القريب.',
        '展現極端動作與爆破場面下依然穩如實拍的 AI 演員面孔一致性與戲劇張力。'
      ),
      pipeline: [
        {
          step: '01',
          title: L('Combat Blocking & Wardrobe Lock', 'تصميم الحركة الحربية وقفل الأزياء', '搶灘場面調度與軍裝鎖定'),
          desc: L('1944 Normandy beach topography, landing craft, and olive-drab uniforms locked via reference sheets.', 'تثبيت تضاريس شاطئ نورماندي ١٩٤٤ وقوارب الإنزال والتجهيزات العسكرية عبر مراجع بصرية دقيقة.', '鎖定 1944 年諾曼第灘頭地形、登陸艇與美軍裝備細節。')
        },
        {
          step: '02',
          title: L('Dual-Actor Face Consistency', 'ثبات ملامح الممثلين الثنائي', '雙人同框面孔一致性'),
          desc: L('Maintained distinct facial bone structure and battle-worn expressions for both soldiers across every cut.', 'الحفاظ على ملامح وتعبيرات كلا الجنديين بدقة تامة عبر جميع انتقالات الكاميرا.', '確保兩位士兵於遠景衝鋒與近景扶持鏡頭中面孔毫不混淆。')
        },
        {
          step: '03',
          title: L('Director\'s Cut Pacing', 'مونتاج نسخة المخرج المشدود', '高張力節奏精剪'),
          desc: L('Trimmed dead air to create a relentless 33-second dramatic arc from aerial beachhead to emotional rescue.', 'قص أي لحظات بطء لصناعة قوس درامي متلاحق في ٣٣ ثانية من الإنزال الجوي حتى لحظة الإنقاذ.', '剔除冗餘過渡，濃縮為從空拍搶灘到戰友救援的 33 秒精華。')
        },
        {
          step: '04',
          title: L('Suspense Strings & -14 LUFS Mix', 'موسيقى التوتر وماستر -14 LUFS', '懸疑弦樂與廣播混音'),
          desc: L('Mixed with licensed suspense strings (Top5Bin = 4.40%) and calibrated to -14.0 LUFS.', 'دمج أوتار سيمفونية مرخصة مفحوصة طيفياً ومعايرة المزيج النهائي عند -14.0 LUFS.', '融合正版懸疑弦樂（Top5Bin = 4.40%）並標準化至 -14.0 LUFS。')
        }
      ],
      tech: [
        { category: 'Visuals & VFX', items: ['Multi-Angle Face Lock', 'Aerial-to-Handheld Continuity'] },
        { category: 'Sound & Score', items: ['Shutterstock Ultra Suspense Strings', 'Pre-Mix Spectral Gate (4.40%)'] },
        { category: 'Post', items: ['Director\'s Cut Editorial', 'FFmpeg -14 LUFS Master'] }
      ]
    },

    baghdad: {
      slug: 'baghdad-1258',
      title: L(
        'The Fall of Baghdad 1258 — Remastered Historical Documentary',
        'سقوط بغداد ١٢٥٨ — وثائقي تاريخي مُرمَّم من قناة TSC',
        '1258 巴格達陷落 — TSC 頻道視覺重製歷史紀錄片'
      ),
      tag: L(
        'Remastered AI Documentary · TSC Official',
        'وثائقي تاريخي مُرمَّم · قناة TSC الرسمية',
        '重製歷史紀錄片 · TSC 官方頻道'
      ),
      heroVideo: '../../assets/work-baghdad-1258.mp4',
      heroPoster: '../../assets/work-baghdad-1258-poster.jpg',
      stats: {
        views: L('TSC Documentary', 'وثائقي قناة TSC', 'TSC 旗艦紀錄片'),
        duration: 'Full Episode + Short',
        episodes: 'EN · AR · ZH-Subs',
        prodTime: '1080p · -14 LUFS'
      },
      challenge: L(
        'Bringing the 13th-century Golden Age of Baghdad—its House of Wisdom scholars, brass astrolabes, and the 1258 siege—to life with museum-grade historical accuracy, zero burned-in caption artifacts, and immersive orchestral sound.',
        'إحياء العصر الذهبي لبغداد في القرن الثالث عشر — علماء بيت الحكمة، الإسطرلابات الفلكية، وحصار عام ١٢٥٨ — بدقة تاريخية رفيعة وخلو تام من أي نصوص قديمة مشوهة مع تصميم صوتي أوركسترالي غامر.',
        '以博物館級考據重現十三世紀巴格達黃金時代的智慧宮學者、星盤觀測與 1258 年圍城戰役，確保畫面純淨無舊字幕殘留並具備沉浸式交響音效。'
      ),
      solution: L(
        'Executed 0-frame-drift sequential visual cleaning, designed bespoke glassmorphic archival date/place cards with the golden TSC emblem, and layered verified Golden Age mystery strings with authentic acoustic siege atmosphere.',
        'تنفيذ تنظيف بصري تتابعي بدقة الإطار، وتصميم بطاقات توثيق زجاجية للتواريخ والأماكن مع شعار قناة TSC الذهبي، ومزج مقطوعات أوركسترالية ومؤثرات بيئية واقعية مفحوصة طيفياً.',
        '執行零幀差序列式畫面淨化，設計帶有 TSC 金色徽章的毛玻璃歷史字卡，並混入通過頻譜驗證的黃金時代神秘配樂與寫實環境音。'
      ),
      result: L(
        'Delivered in three synchronized flagship editions (Arabic dub, English master, and Bilibili EN+ZH-Subs) plus a high-retention 9:16 vertical Short.',
        'إنتاج ثلاث نسخ عرضية قياسية متكاملة (العربية، الإنجليزية، ونسخة Bilibili المترجمة للصينية) بالإضافة إلى نسخة شورت عمودية 9:16 عالية الاحتفاظ بالمشاهدين.',
        '同步交付阿拉伯語、英語原聲及 Bilibili 英音中字三大橫式母帶，以及高留存率 9:16 直式精華短片。'
      ),
      pipeline: [
        {
          step: '01',
          title: L('Historical Fact & Astrolabe Audit', 'تدقيق الوقائع التاريخية والعمران', '十三世紀建築與器物考據'),
          desc: L('Verified Abbasid architecture, scholarly dress, and siege chronology before visual generation.', 'مراجعة دقيقة للعمارة العباسية وأزياء العلماء وتسلسل الوقائع التاريخية لعام ١٢٥٨م.', '核實阿拔斯王朝觀象台、學者服飾與圍城時間線。')
        },
        {
          step: '02',
          title: L('0-Frame Sequential Clean Master', 'تنظيف تتابعي للإطارات بلا انحراف', '零幀差純淨母帶重建'),
          desc: L('Frame-accurate sequential pipeline ensuring pristine 1080p imagery and exact PTS synchronization.', 'معالجة تتابعية إطاراً بإطار تضمن نقاء الصورة بدقة 1080p وتطابق التوقيت الزمني.', '逐幀序列處理確保 1080p 畫面純淨且影音時間戳零漂移。')
        },
        {
          step: '03',
          title: L('Glassmorphic Cards & TSC Identity', 'البطاقات الزجاجية وهوية TSC', '毛玻璃歷史字卡與品牌識別'),
          desc: L('Localized date, character, and location overlays paired with the official golden TSC watermark.', 'بطاقات تعريف زجاجية للشخصيات والتواريخ بلغة كل نسخة مع الشعار المائي الذهبي للقناة.', '依語系客製化毛玻璃人物與紀年字卡，並嵌入官方 TSC 金色浮水印。')
        },
        {
          step: '04',
          title: L('Trilingual -14 LUFS Delivery', 'تسليم النسخ الثلاث بمعيار -14 LUFS', '三語版本 -14 LUFS 廣播交付'),
          desc: L('Mastered for YouTube Global, YouTube Arabic, and Bilibili with verified acoustic foley.', 'معايرة صوتية شاملة لمنصات يوتيوب العالمي والعربي وBilibili بجهارة -14 LUFS.', '針對全球 YouTube、阿語區與 Bilibili 完成廣播級響度標準化。')
        }
      ],
      tech: [
        { category: 'Visual Reconstruction', items: ['1080p Historical Cinema', '0-Frame Sequential Clean Engine'] },
        { category: 'Graphics & Branding', items: ['Pillow Raqm Glassmorphic Cards', 'TSC Official Channel Identity'] },
        { category: 'Audio Mastering', items: ['Vids Shutterstock Ultra Stems', 'ar_documentary_mix_engine (-14 LUFS)'] }
      ]
    },

    franklin: {
      slug: 'franklin',
      title: L(
        'Franklin Expedition 1845 — Lost in the Arctic Pack Ice',
        'بعثة فرانكلين ١٨٤٥ — سر السفينتين المفقودتين في جليد القطب الشمالي',
        '1845 富蘭克林遠征 — 消失於北極冰原的皇家艦隊'
      ),
      tag: L(
        'Remastered AI Documentary · Arctic Mystery',
        'وثائقي تاريخي مُرمَّم · ألغاز القطب الشمالي',
        '重製歷史紀錄片 · 北極懸案'
      ),
      heroVideo: '../../assets/work-franklin.mp4',
      heroPoster: '../../assets/work-franklin-poster.jpg',
      stats: {
        views: L('Feature Documentary', 'وثائقي طويل', '長篇紀錄片'),
        duration: 'Full Episode',
        episodes: 'EN · AR · ZH-Subs',
        prodTime: '1080p · -14 LUFS'
      },
      challenge: L(
        'Reconstructing the doomed 1845 voyage of HMS Erebus and HMS Terror—129 men vanished in the Victorian Arctic—with a cohesive 19th-century painterly realism that honors historical records without sensationalism.',
        'إعادة بناء الرحلة القطبية الغامضة لسفينتي إيربس وتيرور عام ١٨٤٥ — حيث اختفى ١٢٩ بحاراً في الجليد القطبي — بأسلوب بصري يحاكي اللوحات الزيتية الواقعية للقرن التاسع عشر ويحترم الوثائق التاريخية.',
        '重現 1845 年英國皇家海軍 Erebus 與 Terror 號全體 129 名船員失蹤於北極冰海的歷史懸案，視覺必須兼具十九世紀油畫寫實質感與歷史考據嚴謹度。'
      ),
      solution: L(
        'Locked Victorian naval uniforms, three-masted hull geometry, and Arctic aurora/pack-ice lighting palettes across every chapter, paired with animated expedition route maps and restrained atmospheric scoring.',
        'قفل هندسة السفن الشراعية الثلاثية وأزياء البحرية الفيكتورية وإضاءة الجليد القطبي عبر جميع الفصول، مع خرائط مسار متحركة بأسلوب الأرشيف وهندسة صوتية قطبية غامرة.',
        '鎖定維多利亞時代皇家海軍制服、三桅探險船結構與極地冰原光影色盤，輔以檔案風格航線動畫地圖與克制深沉的環境配樂。'
      ),
      result: L(
        'One of TSC Studio\'s signature long-form investigative documentaries—showcasing sustained visual discipline and atmospheric tension across an entire historical timeline.',
        'أحد أبرز الأعمال الوثائقية الطويلة في استوديو TSC — يجسد الانضباط البصري والسردي عبر خط زمني تاريخي متكامل.',
        'TSC 工作室代表性長篇歷史調查紀錄片，展現跨章節的高度視覺統一性與敘事張力。'
      ),
      pipeline: [
        {
          step: '01',
          title: L('Admiralty & Inuit Record Audit', 'تدقيق سجلات الأميرالية والإنويت', '皇家海軍檔案與口述史考據'),
          desc: L('Compiled ship plans, Victory Point note details, and Inuit testimonies into a locked visual bible.', 'جمع مخططات السفن ووثيقة فيكتوري بوينت وشهادات السكان الأصليين في دليل بصري موحد.', '彙整船體藍圖、勝利角遺書紀錄與因紐特人口述證詞。')
        },
        {
          step: '02',
          title: L('19th-Century Painterly LUT', 'الهوية اللونية التصويرية للقرن ١٩', '十九世紀油畫寫實色盤鎖定'),
          desc: L('Enforced a unified oil-canvas texture and cold Arctic cyan-amber contrast across all scenes.', 'تطبيق تدرج لوني موحد يجمع بين برودة الجليد القطبي ودفء فوانيس السفن الخشبية.', '全片統一極地冷藍與船艙油燈暖琥珀之油畫光影對比。')
        },
        {
          step: '03',
          title: L('Archival Map Choreography', 'تحريك خرائط المسار الأرشيفية', '古地圖航線視覺化'),
          desc: L('Animated King William Island and Northwest Passage coordinates synchronized to the narrator.', 'خرائط متحركة لمسار الممر الشمالي الغربي وجزيرة الملك ويليام متزامنة مع السرد.', '動態標示西北航道與威廉王島受困座標，強化地理臨場感。')
        },
        {
          step: '04',
          title: L('Broadcast Audio Remaster', 'الترميم الصوتي بمعيار -14 LUFS', '廣播級極地音效重製'),
          desc: L('Layered authentic ice-pack creaks, wind, and orchestral strings calibrated to -14.0 LUFS.', 'دمج أصوات تكسر الجليد والرياح القطبية مع الأوتار الموسيقية بمعايرة -14.0 LUFS.', '融合寫實冰層擠壓聲、極地寒風與交響弦樂，精準輸出 -14.0 LUFS 母帶。')
        }
      ],
      tech: [
        { category: 'Visual Style', items: ['19th-Century Painterly Realism', 'Vessel & Uniform Identity Lock'] },
        { category: 'Cartography & Overlays', items: ['Animated Arctic Route Maps', 'Glassmorphic Chapter Cards'] },
        { category: 'Post & Audio', items: ['DaVinci Resolve Color Grade', 'Shutterstock Ultra Score (-14 LUFS)'] }
      ]
    },

    titanic: {
      slug: 'titanic',
      title: L(
        'Titanic — April 14, 1912: First-Person Historical Reconstruction',
        'تيتانيك — ١٤ أبريل ١٩١٢: إعادة بناء تاريخية بمنظور الحدث',
        '鐵達尼號 — 1912 年 4 月 14 日：第一人稱歷史重現紀錄片'
      ),
      tag: L(
        'AI Documentary · Historical POV',
        'وثائقي بالذكاء الاصطناعي · منظور تاريخي',
        'AI 歷史紀錄片 · 第一人稱視角'
      ),
      heroVideo: '../../assets/work-titanic.mp4',
      heroPoster: '../../assets/work-titanic-poster.jpg',
      stats: {
        views: L('Historical POV', 'فيلم وثائقي', '歷史視角長片'),
        duration: '25 min Master',
        episodes: 'Feature + Shorts',
        prodTime: '1080p · -14 LUFS'
      },
      challenge: L(
        'Reconstructing RMS Titanic from daylight departure to the freezing North Atlantic night as an intimate historical POV film—keeping four-funnel ship proportions, Edwardian attire, and night lighting consistent.',
        'إعادة بناء رحلة سفينة تيتانيك من لحظة الإبحار نهاراً حتى ليلة المحيط الأطلسي المتجمدة بمنظور تاريخي قريب — مع الحفاظ الصارم على هندسة المداخن الأربع وأزياء العصر الإدواردي وإضاءة الليل.',
        '以第一人稱歷史視角重現鐵達尼號從白晝啟航至北大西洋冰海沉沒的全過程，嚴格維持四煙囪船體比例、1912 年愛德華時代服飾與夜間甲板光影一致。'
      ),
      solution: L(
        'Built a locked 1912 reference pack covering hull structure, bridge instruments, and deck lifeboats, directed restrained cinematic camera motion, and finished the film in DaVinci Resolve with licensed Atlantic voyage orchestration.',
        'إعداد ملف مرجعي مقفل لعام ١٩١٢ يغطي هيكل السفينة وغرفة القيادة وقوارب النجاة، مع حركة كاميرا سينمائية متزنة وتصحيح لوني في DaVinci Resolve وموسيقى أوركسترالية مرخصة.',
        '建立涵蓋船體結構、艦橋儀表與救生艇甲板的 1912 年鎖定參考包，搭配沉穩電影運鏡、DaVinci Resolve 冷調調色與正版航海交響配樂。'
      ),
      result: L(
        'A complete chronological documentary film with serialized vertical shorts cut from the clean master—demonstrating end-to-end historical storytelling.',
        'فيلم وثائقي متسلسل زمنياً مع مقاطع قصيرة مستخرجة من الماستر النظيف — يبرهن على إتقان السرد التاريخي المتكامل من البحث إلى الماستر النهائي.',
        '完成具備完整時間線的歷史紀錄長片與系列直式短片，展現從考據、生成到後期混音的端到端製片實力。'
      ),
      pipeline: [
        {
          step: '01',
          title: L('1912 Vessel & Wardrobe Bible', 'دليل هندسة السفينة وأزياء ١٩١٢', '1912 船舶與服裝視覺規範'),
          desc: L('Compiled archival blueprints for RMS Titanic\'s superstructure, funnels, and officer uniforms.', 'توثيق المخططات الأرشيفية لهيكل تيتانيك ومداخنها وأزياء الضباط والركاب.', '依據歷史藍圖鎖定船體甲板、四座煙囪與船員制服細節。')
        },
        {
          step: '02',
          title: L('Chronological Lighting Progression', 'التدرج الزمني للإضاءة', '依時序推進之光影設計'),
          desc: L('Transitioned seamlessly from crisp Southampton daylight to boiler-room glow and starlit Atlantic darkness.', 'انتقال بصري متدرج من ضوء نهار الإبحار إلى وهج غرف المحركات وظلام الأطلسي الليلي.', '從南安普敦啟航日光自然過渡至鍋爐房火光與星夜冰海。')
        },
        {
          step: '03',
          title: L('Restrained Cinematic Motion', 'حركة كاميرا سينمائية متزنة', '克制寫實的鏡頭運動'),
          desc: L('Prioritized realistic ocean swell, steam plumes, and subtle dolly pushes over exaggerated effects.', 'التركيز على واقعية أمواج المحيط وبخار المداخن وحركة الكاميرا الهادئة عالية المصداقية.', '強調真實海浪起伏、煙囪蒸汽與沉穩推進鏡頭，杜絕浮誇特效。')
        },
        {
          step: '04',
          title: L('Orchestral Mix & Multi-Format Cut', 'المزج الأوركسترالي وتعدد الصيغ', '交響混音與多規格輸出'),
          desc: L('Mastered at -14 LUFS with dedicated widescreen feature and vertical short deliverables.', 'معايرة صوتية عند -14 LUFS وتسليم النسخة العرضية الطويلة ومقاطع الشورتس العمودية.', '以 -14 LUFS 標準完成橫式正片與直式推廣短片交付。')
        }
      ],
      tech: [
        { category: 'Visual Consistency', items: ['1912 Maritime Reference Lock', 'Day-to-Night Grade Continuity'] },
        { category: 'Audio & Narration', items: ['Gemini 3.8 Narration', 'Atlantic Voyage Orchestral Score'] },
        { category: 'Post-Production', items: ['DaVinci Resolve', 'FFmpeg -14 LUFS Master'] }
      ]
    },

    twcafe: {
      slug: 'taipei-cafe-reel',
      title: L(
        'Taipei Cafe Twist — Expressive 9:16 Taiwanese Micro-Drama',
        'مفاجأة المقهى في تايبيه — دراما قصيرة 9:16 بتعبيرات تمثيلية فائقة الواقعية',
        '台北咖啡廳反轉微短劇 —「我以為是桃花運，原來是加班命」'
      ),
      tag: L(
        '9:16 Original Micro-Drama · Authentic Taiwanese Acting',
        'دراما قصيرة 9:16 · تمثيل ومشاعر بشرية صادقة',
        '9:16 原創微短劇 · 真人級細膩微表情演出'
      ),
      heroVideo: '../../assets/work-tw-cafe-reel.mp4',
      heroPoster: '../../assets/work-tw-cafe-reel-poster.jpg',
      isVertical: true,
      stats: {
        views: L('9:16 Micro-Drama', 'دراما قصيرة 9:16', '9:16 微短劇'),
        duration: '30 sec',
        episodes: '台灣國語 (Original)',
        prodTime: '1080×1920 · -14 LUFS'
      },
      challenge: L(
        'Overcoming the stiff "uncanny valley" look common in AI videos by directing a naturalistic Taipei cafe monologue where subtle eye shifts, hopeful micro-smiles, and comedic disappointment flow organically while speaking Taiwanese Mandarin.',
        'تجاوز المظهر الجامد الشائع في فيديوهات الذكاء الاصطناعي عبر إخراج مشهد تمثيلي واقعي في مقهى بتايبيه تتدفق فيه نظرات العيون وابتسامة الترقب ثم خيبة الأمل الكوميدية بعفوية بشرية كاملة أثناء الحديث بالصينية التايوانية.',
        '突破一般 AI 影片常見的僵硬表情，在台北木質咖啡廳自然光影下，執導一段說話同時兼具眼神流轉、期待微笑與反轉無奈感的道地台灣國語獨白。'
      ),
      solution: L(
        'Directed unbroken continuous emotional beats with locked natural skin texture, warm window daylight, and authentic Taiwanese phrasing ("我以為是桃花運，原來是加班命") synced frame-accurately to lip and brow micro-movements.',
        'إخراج نبضات تمثيلية متصلة بملامح بشرة طبيعية فائقة الدقة وإضاءة نهارية دافئة، مع صياغة تايوانية أصيلة رشيقة متطابقة تماماً مع حركة الشفاه والحاجبين ونبرة الصوت.',
        '透過連續鏡頭微表情調度鎖定真實膚質與窗邊自然光，結合道地台灣職場反轉金句「我以為是桃花運，原來是加班命」，達成唇形、眉眼與語氣的完美同步。'
      ),
      result: L(
        'A crisp 1080×1920 vertical micro-drama demonstrating broadcast-ready human emotion, comedic timing, and high mobile retention for Taiwanese brand and social campaigns.',
        'فيديو عمودي فائق النقاء بدقة 1080×1920 يبرهن على قدرة الاستوديو على إخراج مشاعر إنسانية صادقة وتوقيت كوميدي متقن لحملات العلامات التجارية في تايوان وآسيا.',
        '交付 1080×1920 高畫質直式微短劇，展現足以直接投入台灣品牌社群行銷的真人級演技感染力與高完播率節奏。'
      ),
      pipeline: [
        {
          step: '01',
          title: L('Taiwanese Mandarin Contrast Script', 'صياغة التضاد الذكية بالتايوانية', '道地台灣國語反轉腳本'),
          desc: L('Structured crisp 5–9 character spoken beats leading to the relatable workplace twist ("桃花運 vs. 加班命").', 'بناء جمل قصيرة رشيقة تقود المشاهد من توقع رومانسي إلى مفاجأة العمل الإضافي المألوفة.', '以精煉短句鋪陳咖啡廳邂逅氛圍，精準引爆「桃花運 vs. 加班命」反轉笑點。')
        },
        {
          step: '02',
          title: L('Natural Skin & Cafe Daylight Lock', 'واقعية البشرة وإضاءة المقهى الطبيعية', '真實膚質與咖啡廳自然光鎖定'),
          desc: L('Preserved organic skin pores, soft depth-of-field bokeh, and warm Taipei wooden cafe ambiance.', 'الحفاظ على مسام البشرة الطبيعية وعزل الخلفية السينمائي الدافئ دون أي مظهر بلاستيكي.', '保留真實肌膚紋理與溫暖散景，杜絕過度磨皮的塑膠感。')
        },
        {
          step: '03',
          title: L(' Emotional Acting & Lip-Sync', 'توجيه المشاعر أثناء الكلام وتطابق الشفاه', '說話情緒流動與逐幀對嘴'),
          desc: L('Synchronized subtle head tilts, eye movements, and emotional shifts directly with vocal prosody.', 'مزامنة ميلان الرأس ونظرات العيون وتحول المشاعر مع نبرة الصوت الطبيعية في كل جملة.', '讓眼神變化、嘴角弧度與語氣轉折自然合一。')
        },
        {
          step: '04',
          title: L('1080×1920 Mobile Master', 'ماستر عمودي 1080×1920 بمعيار -14 LUFS', '1080×1920 行動端母帶交付'),
          desc: L('Mastered in 48kHz stereo at -14 LUFS for instant clarity on Reels, Shorts, and TikTok.', 'معايرة صوتية بنقاء استيريو 48kHz وجهارة -14 LUFS لمنصات الهواتف الذكية.', '以 48kHz 立體聲與 -14 LUFS 標準輸出，確保手機播放清晰飽滿。')
        }
      ],
      tech: [
        { category: 'Acting Direction', items: ['Micro-Expression Choreography', 'Zero-Plastic Skin Realism'] },
        { category: 'Script & Voice', items: ['Authentic Taiwanese Mandarin (台灣國語)', '24fps Prosody-Synced Lip-Sync'] },
        { category: 'Mastering', items: ['Native 1080×1920 9:16', '48kHz Stereo · -14 LUFS'] }
      ]
    },

    neon: {
      slug: 'neon-heartbeat',
      title: L(
        'NEON_HEARTBEAT — Keep the Light On (9:16 Virtual Idol MV)',
        'NEON_HEARTBEAT — Keep the Light On (فيديو كليب آيدول افتراضي 9:16)',
        'NEON_HEARTBEAT — Keep the Light On（9:16 虛擬偶像官方 MV）'
      ),
      tag: L(
        '9:16 AI Music Video · Virtual Idol',
        'فيديو كليب 9:16 · آيدول افتراضي',
        '9:16 AI 音樂錄影帶 · 虛擬偶像'
      ),
      heroVideo: '../../assets/work-neon-vertical.mp4',
      heroPoster: '../../assets/work-neon-vertical-poster.jpg',
      isVertical: true,
      stats: {
        views: L('9:16 Vertical MV', 'كليب عمودي 9:16', '9:16 直式 MV'),
        duration: 'Full Track + Reel',
        episodes: '2 Singles Released',
        prodTime: '1080×1920 · -14 LUFS'
      },
      challenge: L(
        'Creating a K-pop virtual idol music video framed natively for 9:16 mobile audiences where the artist\'s facial identity, hairstyle, and stage charisma remain 100% consistent across rapid cyberpunk neon lighting shifts.',
        'ابتكار فيديو كليب K-pop بآيدول افتراضي مصمم خصيصاً لشاشات الهاتف العمودية 9:16، بحيث تبقى ملامح المغني وتسريحة شعره وحضوره المسرحي ثابتة بنسبة 100% عبر تغيرات إضاءة النيون السريعة.',
        '打造原生 9:16 手機滿版 K-pop 虛擬偶像 MV，挑戰在賽博霓虹燈光快速切換與唱跳運鏡之間，維持偶像面孔、髮型與造型 100% 一致。'
      ),
      solution: L(
        'Designed a multi-angle idol character sheet, locked facial geometry across every performance setup, and cut the choreography and lip-sync directly on the musical beat grid.',
        'تصميم ورقة شخصية متعددة الزوايا للآيدول الافتراضي، وقفل هندسة الملامح في جميع لقطات الأداء، ومونتاج الغناء وحركة الكاميرا على شبكة الإيقاع الموسيقي مباشرة.',
        '建立多視角虛擬偶像主設定表，於每個舞台鏡位鎖定五官特徵，並嚴格對齊音樂節拍網格進行對嘴與剪輯。'
      ),
      result: L(
        'A scroll-stopping 1080×1920 vertical music video proving that an AI production pipeline can sustain a cohesive virtual music artist brand.',
        'كليب عمودي خاطف للأنظار بدقة 1080×1920 يثبت قدرة الاستوديو على بناء هوية بصرية مستدامة لفنان افتراضي عبر عدة أغنيات.',
        '交付吸睛的 1080×1920 原生直式 MV，證明 AI 製片流程足以支撐音樂藝人的長期視覺品牌。'
      ),
      pipeline: [
        {
          step: '01',
          title: L('Virtual Idol Master Sheet', 'تصميم هوية الآيدول الافتراضي', '虛擬偶像多視角設定集'),
          desc: L('Locked facial proportions, blonde styling, and metallic stage jacket before generating motion.', 'تثبيت نسب الوجه وتصفيف الشعر والأزياء المعدنية قبل توليد أي لقطة متحركة.', '於動態生成前先行鎖定五官比例、金色髮型與舞台夾克細節。')
        },
        {
          step: '02',
          title: L('Native 9:16 Mobile Framing', 'تكوين عمودي أصيل 9:16', '原生 9:16 行動端構圖'),
          desc: L('Composed specifically for vertical screens with neon signage depth and zero pillarboxing.', 'تصميم الكادرات طولياً من الأساس لملء شاشة الهاتف بالكامل مع عمق بصري لإضاءات النيون.', '專為直式螢幕設計景深與霓虹招牌構圖，無黑邊滿版呈現。')
        },
        {
          step: '03',
          title: L('Beat-Grid Lip & Camera Sync', 'مزامنة الغناء والإيقاع الموسيقي', '節拍網格對嘴與剪輯'),
          desc: L('Performance cuts, lighting sweeps, and vocal lip-sync aligned to the track\'s BPM grid.', 'مطابقة حركة الشفاه وانتقالات الإضاءة واللقطات مع نبضات الموسيقى بدقة.', '將演唱唇形、燈光掃動與鏡頭切換精準踩在歌曲 BPM 拍點上。')
        },
        {
          step: '04',
          title: L('-14 LUFS Pop Master', 'ماستر موسيقي بمعيار -14 LUFS', '-14 LUFS 流行音樂母帶'),
          desc: L('Mastered for crisp mobile speaker playback across Instagram Reels, TikTok, and YouTube Shorts.', 'معايرة صوتية تضمن نقاء الإيقاع والغناء على سماعات الهواتف في Reels وTikTok وShorts.', '針對手機揚聲器與各大短影音平台優化動態與 -14 LUFS 響度。')
        }
      ],
      tech: [
        { category: 'Character Lock', items: ['4K Virtual Idol Identity Sheet', 'Cross-Lighting Face Consistency'] },
        { category: 'Format & Motion', items: ['Native 1080×1920 Vertical Cinema', 'BPM Beat-Matched Editorial'] },
        { category: 'Mastering', items: ['DaVinci Resolve Neon Grade', '-14 LUFS Streaming Audio'] }
      ]
    }
  };

  function getProjectId() {
    var parts = window.location.pathname.split('/').filter(Boolean);
    for (var i = parts.length - 1; i >= 0; i--) {
      if (parts[i] !== 'index.html' && SLUG_MAP[parts[i]]) {
        return SLUG_MAP[parts[i]];
      }
    }
    return null;
  }

  function getLang() {
    return document.documentElement.getAttribute('lang') || 'en';
  }

  function t(obj) {
    if (obj == null) {
      return '';
    }
    if (typeof obj === 'string') {
      return obj;
    }
    var lang = getLang();
    return obj[lang] || obj.en || '';
  }

  function renderCaseStudy() {
    var projectId = getProjectId();
    var data = projectId ? CASE_STUDY_DATA[projectId] : null;
    if (!data) {
      window.location.replace('../../index.html#work');
      return;
    }

    var titleText = t(data.title);
    var challengeText = t(data.challenge);
    document.title = titleText + ' — Abdalla Maher';

    var setMeta = function (id, attr, val) {
      var el = document.getElementById(id);
      if (el) {
        el.setAttribute(attr, val);
      }
    };
    var posterAbs = 'https://abdalla.design/' + data.heroPoster.replace(/^(\.\.\/)+/, '');
    var canonical = 'https://abdalla.design/work/' + data.slug + '/';

    setMeta('ogTitle', 'content', titleText);
    setMeta('ogDesc', 'content', challengeText.substring(0, 160));
    setMeta('ogImage', 'content', posterAbs);
    setMeta('ogUrl', 'content', canonical);
    setMeta('twTitle', 'content', titleText);
    setMeta('twDesc', 'content', challengeText.substring(0, 160));
    setMeta('twImage', 'content', posterAbs);
    setMeta('canonicalUrl', 'href', canonical);

    var setText = function (id, val) {
      var el = document.getElementById(id);
      if (el) {
        el.textContent = val;
      }
    };

    setText('caseBreadcrumbTitle', titleText);
    setText('caseTag', t(data.tag));
    setText('caseTitle', titleText);
    setText('statViews', t(data.stats.views));
    setText('statDuration', data.stats.duration);
    setText('statEpisodes', data.stats.episodes);
    setText('statProdTime', data.stats.prodTime);
    setText('caseChallenge', challengeText);
    setText('caseSolution', t(data.solution));
    setText('caseResult', t(data.result));

    var heroMedia = document.getElementById('caseHeroMedia');
    if (heroMedia) {
      var existingVideo = heroMedia.querySelector('video');
      var lang = getLang();
      var initialVideoSrc = (data.dubs && data.dubs[lang]) ? data.dubs[lang].src : data.heroVideo;

      if (!existingVideo) {
        var frameClass = data.isVertical ? 'case-video-frame case-video-frame--vertical' : 'case-video-frame';
        var dubHtml = '';
        if (data.dubs) {
          dubHtml = '<div class="case-dub-bar">' +
            Object.keys(data.dubs).map(function (k) {
              var activeCls = data.dubs[k].src === initialVideoSrc ? 'dub-btn active' : 'dub-btn';
              return '<button type="button" class="' + activeCls + '" data-case-dub="' + data.dubs[k].src + '">' + data.dubs[k].label + '</button>';
            }).join('') +
            '</div>';
        }
        var ytHtml = '';
        if (data.youtubeUrl) {
          var ytLabel = lang === 'ar'
            ? 'شاهد الحلقة كاملة على يوتيوب'
            : (lang === 'zh-TW' ? '在 YouTube 上觀看完整影片' : 'Watch the full episode on YouTube');
          ytHtml = '<p class="case-yt-note"><a id="caseYtLink" href="' + data.youtubeUrl + '" target="_blank" rel="noopener">' + ytLabel + '</a></p>';
        }
        heroMedia.innerHTML =
          '<div class="' + frameClass + '">' +
            '<video id="caseHeroVideo" controls playsinline preload="metadata" poster="' + data.heroPoster + '" src="' + initialVideoSrc + '"></video>' +
          '</div>' + dubHtml + ytHtml;

        var caseVideo = document.getElementById('caseHeroVideo');
        var caseDubBtns = heroMedia.querySelectorAll('[data-case-dub]');
        caseDubBtns.forEach(function (btn) {
          btn.addEventListener('click', function () {
            var targetSrc = this.getAttribute('data-case-dub');
            if (!caseVideo || !targetSrc || caseVideo.getAttribute('src') === targetSrc) {
              return;
            }
            var cur = caseVideo.currentTime || 0;
            caseDubBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
            caseVideo.setAttribute('src', targetSrc);
            caseVideo.load();
            var onLoaded = function () {
              caseVideo.removeEventListener('loadedmetadata', onLoaded);
              if (cur > 0 && cur < caseVideo.duration - 0.5) {
                caseVideo.currentTime = cur;
              }
              caseVideo.play().catch(function () {});
            };
            caseVideo.addEventListener('loadedmetadata', onLoaded);
          });
        });
      } else {
        var ytEl = document.getElementById('caseYtLink');
        if (ytEl) {
          ytEl.textContent = lang === 'ar'
            ? 'شاهد الحلقة كاملة على يوتيوب'
            : (lang === 'zh-TW' ? '在 YouTube 上觀看完整影片' : 'Watch the full episode on YouTube');
        }
      }
    }

    var stepsEl = document.getElementById('casePipelineSteps');
    if (stepsEl) {
      stepsEl.innerHTML = data.pipeline.map(function (step) {
        return '<div class="pipeline-step-detail">' +
          '<div class="case-step-header">' +
            '<span class="case-step-number">' + step.step + '</span>' +
            '<h3>' + t(step.title) + '</h3>' +
          '</div>' +
          '<p>' + t(step.desc) + '</p>' +
        '</div>';
      }).join('');
    }

    var techEl = document.getElementById('caseTechGrid');
    if (techEl) {
      techEl.innerHTML = data.tech.map(function (group) {
        return '<div class="tech-group">' +
          '<h4>' + group.category + '</h4>' +
          '<ul>' + group.items.map(function (item) { return '<li>' + item + '</li>'; }).join('') + '</ul>' +
        '</div>';
      }).join('');
    }

    var btsSection = document.querySelector('.case-bts');
    if (btsSection) {
      btsSection.hidden = true;
    }

    renderRelated(projectId);
  }

  function renderRelated(currentId) {
    var grid = document.getElementById('relatedGrid');
    if (!grid) {
      return;
    }
    var allKeys = Object.keys(CASE_STUDY_DATA).filter(function (k) { return k !== currentId; }).slice(0, 3);
    grid.innerHTML = allKeys.map(function (k) {
      var item = CASE_STUDY_DATA[k];
      return '<article class="related-item">' +
        '<a href="../' + item.slug + '/" class="related-link">' +
          '<img src="' + item.heroPoster + '" alt="' + t(item.title) + '" loading="lazy" decoding="async">' +
          '<h4>' + t(item.title) + '</h4>' +
        '</a>' +
      '</article>';
    }).join('');
  }

  window.__renderCaseStudy = renderCaseStudy;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCaseStudy);
  } else {
    renderCaseStudy();
  }
})();
