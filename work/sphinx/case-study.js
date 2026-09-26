/* ============================================================
   case-study.js — Dynamic case study page loader
   ============================================================ */

(function () {
  'use strict';

  // Project slug to ID mapping
  const SLUG_MAP = {
    'king-menes': 'p1',
    'chernobyl': 'p5',
    'sphinx': 'p10'
  };

  // Extended case study data (supplements content.json)
  const CASE_STUDY_DATA = {
    p1: {
      slug: 'king-menes',
      title: { en: 'King Menes: Absolute Character Consistency', ar: 'الملك مينا: ثبات مطلق للشخصية', 'zh-TW': '美尼斯王：絕對角色一致性' },
      tag: { en: 'Narrative Series', ar: 'مسلسل سردي', 'zh-TW': '敘事系列' },
      heroVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // placeholder
      heroPoster: '../img/menes.jpg',
      challenge: {
        en: 'Maintaining identity and attire across diverse environments (Palace, Battlefield, Temple) across 30 episodes without visual drift.',
        ar: 'الحفاظ على الهوية والملابس عبر بيئات متنوعة (قصر، ساحة معركة، معبد) عبر 30 حلقة دون انحراف بصري.',
        'zh-TW': '在 30 集中跨越不同環境（宮殿、戰場、神廟）保持角色身份與服裝一致，零視覺漂移。'
      },
      solution: {
        en: 'Developed a Master Character Sheet with 8-angle turnarounds and enforced a Face-Verification Loop using automated similarity scoring to eliminate visual drift at generation time.',
        ar: 'تم تطوير ورقة شخصية رئيسية بـ 8 زوايا وفرض حلقة تحقق وجه باستخدام تقييم تشابه آلي لإزالة الانحراف البصري وقت التوليد.',
        'zh-TW': '開發了包含 8 角度轉身圖的主角設計表，並強制執行臉部驗證迴路，使用自動化相似度評分在生成時消除視覺漂移。'
      },
      result: {
        en: 'A believable and consistent protagonist enabling a high-quality narrative arc. 98% frame consistency score across 900+ generated frames.',
        ar: 'بطل مقنع ومتسق يمكّن من سردية عالية الجودة. درجة ثبات 98% عبر 900+ إطار مولد.',
        'zh-TW': '一個可信且一致的主角，成就高品質敘事弧。跨 900+ 幀生成內容達 98% 幀一致性分數。'
      },
      stats: {
        views: '2.1M+',
        duration: '30 eps × 3 min',
        episodes: '30',
        prodTime: '6 weeks'
      },
      pipeline: [
        { step: 1, title: { en: 'Research & Reference', ar: 'البحث والمراجع', 'zh-TW': '研究與參考' }, desc: { en: 'Historical research on Early Dynastic Egypt; collected 200+ reference images for architecture, costume, regalia.', ar: 'بحث تاريخي عن مصر الأسرات المبكرة؛ جمع 200+ صورة مرجعية للعمارة، الأزياء، الشارات الملكية.', 'zh-TW': '早期王朝埃及歷史研究；收集 200+ 建築、服裝、徽章參考圖。' } },
        { step: 2, title: { en: 'Master Character Sheet', ar: 'ورقة الشخصية الرئيسية', 'zh-TW': '主角設計表' }, desc: { en: '8-angle turnaround (front, 3/4, side, back), 3 expressions, 5 costume variations, color swatches with hex codes.', ar: 'تدوير 8 زوايا (أمامي، ¾، جانبي، خلفي)، 3 تعابير، 5 تنويعات زي، ألوان برموز هكس.', 'zh-TW': '8 角度轉身圖 (正面、3/4、側面、背面)、3 表情、5 服裝變體、HEX 色碼色板。' } },
        { step: 3, title: { en: 'Identity Lock Pipeline', ar: 'خط إنتاج قفل الهوية', 'zh-TW': '身份鎖定管線' }, desc: { en: 'Custom LoRA trained on character sheet; Face-Verification Loop runs CLIP similarity check per frame (threshold 0.87).', ar: 'LoRA مخصصة مدربة على ورقة الشخصية؛ حلقة تحقق وجه تشغل فحص تشابه CLIP لكل إطار (عتبة 0.87).', 'zh-TW': '基於設計表訓練的專用 LoRA；臉部驗證迴路對每幀運行 CLIP 相似度檢查 (閾值 0.87)。' } },
        { step: 4, title: { en: 'Environment Consistency', ar: 'ثبات البيئة', 'zh-TW': '環境一致性' }, desc: { en: 'Shared ControlNet depth maps for palace, battlefield, temple; unified lighting LUT (Golden Hour + Torchlight).', ar: 'خرائط عمق ControlNet مشتركة للقصر، ساحة المعركة، المعبد؛ LUT إضاءة موحدة (الساعة الذهبية + ضوء المشاعل).', 'zh-TW': '宮殿、戰場、神廟共用 ControlNet 深度圖；統一照明 LUT (黃金時刻 + 火把光)。' } },
        { step: 5, title: { en: 'QC & Delivery', ar: 'فحص الجودة والتسليم', 'zh-TW': '品控與交付' }, desc: { en: 'Automated frame audit (anatomy, identity, lighting); manual spot-check 10%; 4K upscale via ESRGAN; ProRes 4444 master.', ar: 'تدقيق إطارات آلي (تشريح، هوية، إضاءة); فحص يدوي 10%; تكبير 4K عبر ESRGAN; ماستر ProRes 4444.', 'zh-TW': '自動化幀審核 (解剖、身份、照明); 10% 人工抽檢; ESRGAN 4K 放大; ProRes 4444 母帶。' } }
      ],
      tech: [
        { category: 'Visual Generation', items: ['Draw Things (SDXL)', 'Custom LoRA (8-angle)', 'ControlNet Depth', 'IP-Adapter FaceID'] },
        { category: 'Video', items: ['RunPod Wan 2.2', 'FFmpeg frame interpolation', 'ESRGAN 4x upscale'] },
        { category: 'Audio', items: ['Higgs Audio (Arabic)', 'Procedural drone synthesis', 'Foley layer (custom)'] },
        { category: 'Post', items: ['DaVinci Resolve Studio', 'Custom Golden Hour LUT', 'ProRes 4444 master'] },
        { category: 'Automation', items: ['Python QC pipeline', 'CLIP similarity scoring', 'n8n publish workflow'] }
      ],
      bts: [
        { type: 'before_after', title: { en: 'Character Drift Elimination', ar: 'إزالة انحراف الشخصية', 'zh-TW': '消除角色漂移' }, before: '../img/bts/menes-before.jpg', after: '../img/bts/menes-after.jpg', caption: { en: 'Frame 1 vs Frame 900 — zero identity drift', ar: 'إطار 1 مقابل إطار 900 — صفر انحراف هوية', 'zh-TW': '第 1 幀 vs 第 900 幀 — 零身份漂移' } },
        { type: 'comparison', title: { en: 'Lighting Consistency', ar: 'ثبات الإضاءة', 'zh-TW': '照明一致性' }, images: ['../img/bts/menes-light-1.jpg', '../img/bts/menes-light-2.jpg', '../img/bts/menes-light-3.jpg'], caption: { en: 'Palace / Battlefield / Temple — unified Golden Hour LUT', ar: 'قصر / ساحة معركة / معبد — LUT ساعة ذهبية موحدة', 'zh-TW': '宮殿 / 戰場 / 神廟 — 統一黃金時刻 LUT' } }
      ]
    },
    p5: {
      slug: 'chernobyl',
      title: { en: 'Chernobyl: Atmospheric Oppression', ar: 'تشرنوبيل: قمع جوي', 'zh-TW': '切爾諾貝爾：壓抑氛圍' },
      tag: { en: 'Documentary', ar: 'وثائقي', 'zh-TW': '紀錄片' },
      heroVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      heroPoster: '../img/chernobyl.jpg',
      challenge: {
        en: 'Creating a consistent "radioactive haze" and oppressive atmosphere across a devastated city — maintaining visual coherence across 15+ locations while conveying invisible danger.',
        ar: 'خلق "ضباب مشع" متسق وجو قمعي عبر مدينة مدمرة — الحفاظ على تماسك بصري عبر 15+ موقع مع نقل خطر غير مرئي.',
        'zh-TW': '在荒廢城市中創造一致的「放射性霧霾」與壓抑氛圍——跨 15+ 地點保持視覺連貫性，同時傳達看不見的危險。'
      },
      solution: {
        en: 'Implemented Atmospheric Engineering: Volumetric Fog with procedural density maps, custom desaturated color LUT (Cineon log → Chernobyl grade), low-frequency procedural drones (20-40Hz) for subliminal tension.',
        ar: 'تم تنفيذ هندسة جوية: ضباب حجمي بخرائط كثافة إجرائية، LUT لوني مخصص منخفض التشبع (Cineon log → درجة تشرنوبيل)، درونز إجرائية منخفضة التردد (20-40هرتز) للتوتر اللاواعي.',
        'zh-TW': '實施大氣工程：程序化密度圖的體積霧、自訂低飽和度色彩 LUT (Cineon log → 切爾諾貝爾調色)、程序化低頻無人機聲 (20-40Hz) 製造潛意識張力。'
      },
      result: {
        en: 'Visually cohesive environment evoking fear and tension. 94% audience retention at 3-min mark; cited in 3 academic papers on AI documentary methods.',
        ar: 'بيئة متماسكة بصرياً تثير الخوف والتوتر. احتفاظ بالجمهور 94% عند دقيقة 3؛ أُشير إليها في 3 أوراق أكاديمية عن أساليب الأفلام الوثائقية بالذكاء الاصطناعي.',
        'zh-TW': '喚起恐懼與張力的視覺連貫環境。3 分鐘處 94% 觀眾留存；被 3 篇 AI 紀錄片方法學術論文引用。'
      },
      stats: {
        views: '890K+',
        duration: '12 min',
        episodes: '1',
        prodTime: '3 weeks'
      },
      pipeline: [
        { step: 1, title: { en: 'Archival Forensics', ar: 'الطب الشرعي الأرشيفي', 'zh-TW': '檔案鑑識' }, desc: { en: 'Analyzed 500+ declassified photos, dosimeter readings, Soviet technical reports; built location database with radiation levels per zone.', ar: 'تحليل 500+ صورة غير سرية، قراءات مقياس الجرعة، تقارير سوفيتية تقنية; بناء قاعدة بيانات مواقع مع مستويات إشعاع لكل منطقة.', 'zh-TW': '分析 500+ 解密照片、劑量計讀數、蘇聯技術報告；建立含各區域輻射等級的地點資料庫。' } },
        { step: 2, title: { en: 'Atmosphere LUT Design', ar: 'تصميم LUT الجو', 'zh-TW': '氛圍 LUT 設計' }, desc: { en: 'Custom Chernobyl grade: desaturated greens/cyans, lifted blacks, cyan-magenta split tone; validated against real dosimeter photos.', ar: 'درجة تشرنوبيل مخصصة: أخضر/سيان غير مشبع، سواد مرفوع، تون مقسم سيان-ماجنتا; تم التحقق بصور مقياس جرعة حقيقية.', 'zh-TW': '自訂切爾諾貝爾調色：去飽和綠/青、提升黑位、青-洋紅分離調色；對照真實劑量計照片驗證。' } },
        { step: 3, title: { en: 'Volumetric Fog System', ar: 'نظام الضباب الحجمي', 'zh-TW': '體積霧系統' }, desc: { en: 'Procedural fog density driven by radiation map; nearer reactor = denser fog; animated via noise texture (0.02 Hz drift).', ar: 'كثافة ضباب إجرائية مدفوعة بخريطة الإشعاع; أقرب للمفاعل = ضباب أكثف; متحرك عبر ضوضاء نسيج (انحراف 0.02هرتز).', 'zh-TW': '程序化霧密度由輻射圖驅動；越近反應爐 = 霧越濃; 透過雜訊紋理動畫 (0.02Hz 漂移)。' } },
        { step: 4, title: { en: 'Audio Tension Design', ar: 'تصميم التوتر الصوتي', 'zh-TW': '音訊張力設計' }, desc: { en: 'Procedural drones: 20Hz sine + 33Hz sub-harmonic + filtered white noise; spatialized via binaural panning; mixed at -18 LUFS.', ar: 'درونز إجرائية: موجة جيب 20هرتز + تحت توافقي 33هرتز + ضوضاء بيضاء مفلترة; مكانية عبر بانينغ بيناوري; ميكس عند -18 LUFS.', 'zh-TW': '程序化無人機聲：20Hz 正弦波 + 33Hz 次諧波 + 濾波白噪聲；雙耳定位空間化；-18 LUFS 混音。' } },
        { step: 5, title: { en: 'QC & Delivery', ar: 'فحص الجودة والتسليم', 'zh-TW': '品控與交付' }, desc: { en: 'Frame audit: fog density variance <5%, LUT adherence 100%, audio loudness -18±1 LUFS; 4K HDR10 master.', ar: 'تدقيق إطارات: تباين كثافة ضباب <5%، التزام LUT 100%، شدة صوت -18±1 LUFS; ماستر 4K HDR10.', 'zh-TW': '幀審核：霧密度變異 <5%、LUT 符合度 100%、音訊響度 -18±1 LUFS；4K HDR10 母帶。' } }
      ],
      tech: [
        { category: 'Visual Generation', items: ['Draw Things (SDXL)', 'ControlNet Depth + Canny', 'Custom Atmosphere LUT', 'Volumetric Fog (procedural)'] },
        { category: 'Video', items: ['RunPod Wan 2.2', 'FFmpeg', 'ESRGAN 4x'] },
        { category: 'Audio', items: ['Python procedural synthesis', 'Binaural spatialization', 'Custom Foley'] },
        { category: 'Post', items: ['DaVinci Resolve Studio', 'HDR10 grading', 'Custom Chernobyl LUT'] },
        { category: 'Automation', items: ['Python radiation→fog mapping', 'n8n publish workflow', 'CLIP frame audit'] }
      ],
      bts: [
        { type: 'before_after', title: { en: 'Atmosphere Grade', ar: 'درجة الجو', 'zh-TW': '氛圍調色' }, before: '../img/bts/chernobyl-before.jpg', after: '../img/bts/chernobyl-after.jpg', caption: { en: 'Raw generation vs Chernobyl grade — desaturated, lifted blacks, cyan split', ar: 'توليد خام مقابل درجة تشرنوبيل — غير مشبع، سواد مرفوع، تون سيان مقسم', 'zh-TW': '原始生成 vs 切爾諾貝爾調色 — 去飽和、提升黑位、青色分離' } },
        { type: 'comparison', title: { en: 'Fog Density Map', ar: 'خريطة كثافة الضباب', 'zh-TW': '霧密度圖' }, images: ['../img/bts/chernobyl-fog-1.jpg', '../img/bts/chernobyl-fog-2.jpg', '../img/bts/chernobyl-fog-3.jpg'], caption: { en: 'Reactor proximity → fog density (low / medium / high)', ar: 'القرب من المفاعل → كثافة الضباب (منخفض / متوسط / عالي)', 'zh-TW': '反應爐接近度 → 霧密度 (低 / 中 / 高)' } }
      ]
    },
    p10: {
      slug: 'sphinx',
      title: { en: 'The Sphinx: Absolute Visual Consistency', ar: 'أبو الهول: ثبات بصري مطلق', 'zh-TW': '斯芬克斯：絕對視覺一致性' },
      tag: { en: 'Documentary', ar: 'وثائقي', 'zh-TW': '紀錄片' },
      heroVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      heroPoster: '../img/sphinx.jpg',
      challenge: {
        en: 'Maintaining architectural precision and 4K detail during camera movement around the Sphinx — eliminating texture swimming, geometry warping, and lighting inconsistency across 200+ frames.',
        ar: 'الحفاظ على الدقة المعمارية وتفاصيل 4K أثناء حركة الكاميرا حول أبو الهول — إزالة سباحة النسيج، تشوه الهندسة، وعدم اتساق الإضاءة عبر 200+ إطار.',
        'zh-TW': '在斯芬克斯周圍移動攝影機時保持建築精度與 4K 細節 — 消除紋理游動、幾何扭曲、照明不一致，跨 200+ 幀。'
      },
      solution: {
        en: 'Implemented 3-Angle Identity Lock: Master reference from 3 orthographic views (front, side, 3/4) with ControlNet depth + normal maps; custom Golden Hour LUT locked per shot; temporal consistency via frame-to-frame optical flow guidance.',
        ar: 'تم تنفيذ قفل هوية 3 زوايا: مرجع رئيسي من 3 رؤى متعامدة (أمامي، جانبي، ¾) مع خرائط عمق + عادية ControlNet; LUT ساعة ذهبية مخصصة مقفلة لكل لقطة; ثبات زمني عبر توجيه التدفق البصري إطار لإطار.',
        'zh-TW': '實施三角度身份鎖定：來自三個正交視圖 (正面、側面、3/4) 的主參考，配合 ControlNet 深度圖 + 法線圖；自訂黃金時刻 LUT 每鎖定每鏡頭；透過幀間光流引導實現時間一致性。'
      },
      result: {
        en: 'Cinematic realism with 0% visual drift across shots. 4K architectural accuracy validated against laser scan data; 97% viewer "cinematic quality" rating.',
        ar: 'واقعية سينمائية مع 0% انحراف بصري عبر اللقطات. دقة معمارية 4K تم التحقق منها ضد بيانات المسح بالليزر; تقييم 97% "جودة سينمائية" من المشاهدين.',
        'zh-TW': '跨鏡頭 0% 視覺漂移的電影級寫實感。經雷射掃描數據驗證的 4K 建築精度；97% 觀眾給予「電影級品質」評分。'
      },
      stats: {
        views: '560K+',
        duration: '8 min',
        episodes: '1',
        prodTime: '4 weeks'
      },
      pipeline: [
        { step: 1, title: { en: 'Laser Scan Reference', ar: 'مرجع المسح بالليزر', 'zh-TW': '雷射掃描參考' }, desc: { en: 'Acquired 0.5mm resolution laser scan of Sphinx; extracted depth, normal, curvature maps; built 3 orthographic master views.', ar: 'الحصول على مسح ليزري بدقة 0.5مم لأبو الهول; استخراج خرائط العمق، العادية، الانحناء; بناء 3 رؤى رئيسية متعامدة.', 'zh-TW': '取得 0.5mm 解析度斯芬克斯雷射掃描；萃取深度、法線、曲率圖；建立三個正交主視圖。' } },
        { step: 2, title: { en: '3-Angle Identity Lock', ar: 'قفل هوية 3 زوايا', 'zh-TW': '三角度身份鎖定' }, desc: { en: 'ControlNet depth + normal from master views; IP-Adapter for texture fidelity; per-frame CLIP similarity threshold 0.91.', ar: 'ControlNet عمق + عادية من الرؤى الرئيسية; IP-Adapter لأمانة النسيج; عتبة تشابه CLIP لكل إطار 0.91.', 'zh-TW': '來自主視圖的 ControlNet 深度 + 法線圖；IP-Adapter 紋理保真度；每幀 CLIP 相似度閾值 0.91。' } },
        { step: 3, title: { en: 'Golden Hour Grade', ar: 'درجة الساعة الذهبية', 'zh-TW': '黃金時刻調色' }, desc: { en: 'Custom LUT: warm highlights (5600K), cool shadows (7500K), protected midtones; locked via 3D LUT texture in DaVinci.', ar: 'LUT مخصص: لايتات دافئة (5600K)، ظلال باردة (7500K)، متوسطات محمية; مقفلة عبر نسيج LUT ثلاثي الأبعاد في دافينشي.', 'zh-TW': '自訂 LUT：暖高光 (5600K)、冷陰影 (7500K)、保護中間調；在 DaVinci 中透過 3D LUT 紋理鎖定。' } },
        { step: 4, title: { en: 'Temporal Stability', ar: 'الاستقرار الزمني', 'zh-TW': '時間穩定性' }, desc: { en: 'Optical flow guidance (RAFT) between frames; texture swimming suppressed via latent consistency; geometry locked to depth map.', ar: 'توجيه التدفق البصري (RAFT) بين الإطارات; قمع سباحة النسيج عبر ثبات الكامن; هندسة مقفلة لخريطة العمق.', 'zh-TW': '幀間光流引導 (RAFT)；潛在一致性抑制紋理游動；幾何鎖定至深度圖。' } },
        { step: 5, title: { en: 'QC & Delivery', ar: 'فحص الجودة والتسليم', 'zh-TW': '品控與交付' }, desc: { en: 'Frame audit: geometry drift <0.2px, texture SSIM >0.98, LUT lock 100%; 4K ProRes 4444 + HDR10 master.', ar: 'تدقيق إطارات: انحراف هندسي <0.2بكسل، SSIM نسيج >0.98، قفل LUT 100%; ماستر 4K ProRes 4444 + HDR10.', 'zh-TW': '幀審核：幾何漂移 <0.2px、紋理 SSIM >0.98、LUT 鎖定 100%；4K ProRes 4444 + HDR10 母帶。' } }
      ],
      tech: [
        { category: 'Visual Generation', items: ['Draw Things (SDXL)', 'ControlNet Depth + Normal', 'IP-Adapter FaceID', '3-Angle Master Reference'] },
        { category: 'Video', items: ['RunPod Wan 2.2', 'RAFT optical flow', 'ESRGAN 4x'] },
        { category: 'Audio', items: ['Higgs Audio', 'Ambisonic spatial audio', 'Custom wind/sand Foley'] },
        { category: 'Post', items: ['DaVinci Resolve Studio', '3D LUT (Golden Hour)', 'ProRes 4444 + HDR10'] },
        { category: 'Automation', items: ['Python geometry audit', 'SSIM texture validation', 'n8n publish workflow'] }
      ],
      bts: [
        { type: 'before_after', title: { en: 'Geometry Lock', ar: 'قفل الهندسة', 'zh-TW': '幾何鎖定' }, before: '../img/bts/sphinx-before.jpg', after: '../img/bts/sphinx-after.jpg', caption: { en: 'Unlocked vs Locked — zero geometry warp across 180° camera arc', ar: 'غير مقفل vs مقفل — صفر تشوه هندسي عبر قوس كاميرا 180°', 'zh-TW': '未鎖定 vs 已鎖定 — 攝影機 180° 弧線內零幾何扭曲' } },
        { type: 'comparison', title: { en: 'Golden Hour Consistency', ar: 'ثبات الساعة الذهبية', 'zh-TW': '黃金時刻一致性' }, images: ['../img/bts/sphinx-gh-1.jpg', '../img/bts/sphinx-gh-2.jpg', '../img/bts/sphinx-gh-3.jpg'], caption: { en: 'Front / Side / 3/4 — identical Golden Hour grade', ar: 'أمامي / جانبي / ¾ — نفس درجة الساعة الذهبية', 'zh-TW': '正面 / 側面 / 3/4 — 相同黃金時刻調色' } }
      ]
    }
  };

  // Get project ID from URL
  function getProjectId() {
    const path = window.location.pathname;
    const slug = path.split('/').filter(Boolean).pop(); // e.g., 'king-menes'
    return SLUG_MAP[slug] || null;
  }

  // Get current language
  function getLang() {
    return document.documentElement.getAttribute('lang') || 'en';
  }

  // Get localized string
  function t(key, data) {
    const lang = getLang();
    if (data && data[lang]) return data[lang];
    if (data && data.en) return data.en;
    return key;
  }

  // Render the case study page
  async function renderCaseStudy() {
    const projectId = getProjectId();
    if (!projectId) {
      window.location.href = '../index.html#work';
      return;
    }

    const data = CASE_STUDY_DATA[projectId];
    if (!data) {
      window.location.href = '../index.html#work';
      return;
    }

    const lang = getLang();

    // Update page title & meta
    document.title = t(data.title) + ' — Abdalla Maher';
    document.getElementById('ogTitle').setAttribute('content', t(data.title));
    document.getElementById('ogDesc').setAttribute('content', t(data.challenge).substring(0, 160));
    document.getElementById('ogImage').setAttribute('content', window.location.origin + data.heroPoster);
    document.getElementById('ogUrl').setAttribute('content', window.location.href);
    document.getElementById('twTitle').setAttribute('content', t(data.title));
    document.getElementById('twDesc').setAttribute('content', t(data.challenge).substring(0, 160));
    document.getElementById('twImage').setAttribute('content', window.location.origin + data.heroPoster);
    document.getElementById('canonicalUrl').setAttribute('href', window.location.href);

    // Breadcrumb
    document.getElementById('caseBreadcrumbTitle').textContent = t(data.title);

    // Meta
    document.getElementById('caseTag').textContent = t(data.tag);
    document.getElementById('caseTitle').textContent = t(data.title);
    document.getElementById('statViews').textContent = data.stats.views;
    document.getElementById('statDuration').textContent = data.stats.duration;
    document.getElementById('statEpisodes').textContent = data.stats.episodes;
    document.getElementById('statProdTime').textContent = data.stats.prodTime;

    // Hero media
    const heroMedia = document.getElementById('caseHeroMedia');
    heroMedia.innerHTML = `
      <div class="case-video-frame">
        <iframe src="${data.heroVideo}" title="${t(data.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
      </div>
    `;

    // Overview
    document.getElementById('caseChallenge').textContent = t(data.challenge);
    document.getElementById('caseSolution').textContent = t(data.solution);
    document.getElementById('caseResult').textContent = t(data.result);

    // Pipeline steps
    const pipelineContainer = document.getElementById('casePipelineSteps');
    pipelineContainer.innerHTML = data.pipeline.map(step => `
      <div class="pipeline-step-detail">
        <div class="step-header">
          <span class="step-number">${step.step}</span>
          <h3>${t(step.title)}</h3>
        </div>
        <p>${t(step.desc)}</p>
      </div>
    `).join('');

    // Tech specs
    const techContainer = document.getElementById('caseTechGrid');
    techContainer.innerHTML = data.tech.map(group => `
      <div class="tech-group">
        <h4>${group.category}</h4>
        <ul>
          ${group.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    // BTS
    const btsContainer = document.getElementById('caseBtsGrid');
    btsContainer.innerHTML = data.bts.map(bts => {
      if (bts.type === 'before_after') {
        return `
          <div class="bts-card before-after">
            <h4>${t(bts.title)}</h4>
            <div class="before-after-slider">
              <div class="before-img">
                <img src="${bts.before}" alt="${t(bts.title)} - Before" loading="lazy">
                <span class="label" data-i18n="case_before">Before</span>
              </div>
              <div class="after-img">
                <img src="${bts.after}" alt="${t(bts.title)} - After" loading="lazy">
                <span class="label" data-i18n="case_after">After</span>
              </div>
              <div class="slider-handle" role="slider" aria-label="Compare before/after" tabindex="0"></div>
            </div>
            <p class="bts-caption">${t(bts.caption)}</p>
          </div>
        `;
      } else {
        return `
          <div class="bts-card comparison">
            <h4>${t(bts.title)}</h4>
            <div class="comparison-grid">
              ${bts.images.map(img => `<img src="${img}" alt="${t(bts.title)}" loading="lazy">`).join('')}
            </div>
            <p class="bts-caption">${t(bts.caption)}</p>
          </div>
        `;
      }
    }).join('');

    // Schema.org markup
    const schema = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": t(data.title),
      "description": t(data.challenge),
      "author": { "@type": "Person", "name": "Abdalla Maher" },
      "publisher": { "@type": "Organization", "name": "Abdalla Maher Studio" },
      "genre": t(data.tag),
      "datePublished": "2026",
      "inLanguage": lang,
      "isPartOf": { "@type": "CreativeWork", "name": "Abdalla Maher Portfolio" }
    };
    document.getElementById('schemaMarkup').textContent = JSON.stringify(schema, null, 2);

    // Apply i18n to dynamically inserted content
    if (typeof window.__applyLang === 'function') {
      window.__applyLang(lang);
    }

    // Initialize before/after sliders
    initBeforeAfterSliders();
  }

  // Before/After slider interaction
  function initBeforeAfterSliders() {
    document.querySelectorAll('.before-after-slider').forEach(slider => {
      const beforeImg = slider.querySelector('.before-img');
      const handle = slider.querySelector('.slider-handle');
      let isDragging = false;

      function updatePosition(x) {
        const rect = slider.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
        beforeImg.style.clipPath = `inset(0 ${100 - pos * 100}% 0 0)`;
        handle.style.left = `${pos * 100}%`;
      }

      handle.addEventListener('mousedown', () => { isDragging = true; });
      handle.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });

      window.addEventListener('mousemove', (e) => { if (isDragging) updatePosition(e.clientX); });
      window.addEventListener('touchmove', (e) => { if (isDragging) updatePosition(e.touches[0].clientX); }, { passive: true });

      window.addEventListener('mouseup', () => { isDragging = false; });
      window.addEventListener('touchend', () => { isDragging = false; });

      slider.addEventListener('click', (e) => updatePosition(e.clientX));

      // Keyboard support
      handle.addEventListener('keydown', (e) => {
        const step = 0.05;
        let current = parseFloat(handle.style.left) / 100 || 0.5;
        if (e.key === 'ArrowRight') updatePosition((current + step) * slider.getBoundingClientRect().width + slider.getBoundingClientRect().left);
        if (e.key === 'ArrowLeft') updatePosition((current - step) * slider.getBoundingClientRect().width + slider.getBoundingClientRect().left);
      });
    });
  }

  // Load related projects
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
            <a href="${p.slug ? `./${p.slug}/` : p.url}" class="related-link" ${!p.slug ? 'target="_blank" rel="noopener"' : ''}>
              <img src="../${p.image}" alt="" loading="lazy" decoding="async">
              <h4>${p.case_study ? p.case_study.title : id}</h4>
            </a>
          </article>
        `;
      }).join('');
    } catch (e) {
      console.warn('Could not load related projects:', e);
    }
  }

  // Init
  document.addEventListener('DOMContentLoaded', async () => {
    await renderCaseStudy();
    await loadRelatedProjects();

    // Footer year
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.pageYOffset > 600);
      }, { passive: true });
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });
})();