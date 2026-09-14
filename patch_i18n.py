import re

with open('js/i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()

# English pricing translations
pricing_en = '''
    /* Pricing */
    pricing_title: 'Packages & Pricing',
    pricing_subtitle: 'Choose the package that fits your project — all include AI video production, voiceover, and delivery within 48 hours.',
    pricing_currency: 'TWD',
    pricing_cta: 'Order Now',
    pricing_cta_monthly: 'Subscribe Now',
    pricing_popular: 'Most Popular',
    pricing_period: '/month',
    pricing_basic_title: 'Basic',
    pricing_basic_f1: '1 AI video (30 seconds)',
    pricing_basic_f2: 'Script & concept development',
    pricing_basic_f3: 'AI voiceover (Arabic/English/Chinese)',
    pricing_basic_f4: 'Music & sound design',
    pricing_basic_f5: 'Delivery within 3 days',
    pricing_basic_f6: '2 revision rounds',
    pricing_standard_title: 'Standard',
    pricing_standard_f1: '3 AI videos (30 sec each)',
    pricing_standard_f2: 'Full script & storyboard',
    pricing_standard_f3: 'AI voiceover + custom music',
    pricing_standard_f4: 'Multi-language subtitles',
    pricing_standard_f5: 'Delivery within 5 days',
    pricing_standard_f6: '4 revision rounds',
    pricing_standard_f7: 'Commercial usage rights',
    pricing_pro_title: 'Professional',
    pricing_pro_f1: '5 AI videos (60 sec each)',
    pricing_pro_f2: 'Premium script & art direction',
    pricing_pro_f3: 'Studio AI voiceover',
    pricing_pro_f4: 'Full post-production & grading',
    pricing_pro_f5: 'Delivery within 7 days',
    pricing_pro_f6: 'Unlimited revisions',
    pricing_pro_f7: 'Full commercial rights',
    pricing_pro_f8: 'Rush delivery available',
    pricing_monthly_title: 'Monthly Subscription',
    pricing_monthly_f1: '10 AI videos / month',
    pricing_monthly_f2: 'Unlimited concepts & scripts',
    pricing_monthly_f3: 'Priority support 24/7',
    pricing_monthly_f4: 'Dedicated account manager',
    pricing_monthly_f5: 'Full commercial rights',
    pricing_monthly_f6: 'Unused videos roll over',
    pricing_monthly_f7: 'Cancel anytime',
    pricing_note: 'Need something custom? Contact us for a tailored quote.',
    /* Order */
    order_title: 'Place Your Order',
    order_subtitle: 'Fill the form below and we\'ll get back to you within 24 hours.',
    order_name_label: 'Full Name',
    order_name_placeholder: 'Your full name',
    order_email_label: 'Email Address',
    order_email_placeholder: 'your@email.com',
    order_package_label: 'Select Package',
    order_package_default: 'Choose a package...',
    order_package_basic: 'Basic — 1,000 TWD',
    order_package_standard: 'Standard — 2,500 TWD',
    order_package_pro: 'Professional — 4,500–6,000 TWD',
    order_package_monthly: 'Monthly — 8,000 TWD/month',
    order_message_label: 'Project Description',
    order_message_placeholder: 'Tell us about your project, style preferences, target audience...',
    order_submit: 'Send Order Request',
    order_success: 'Thank you! We\'ll contact you within 24 hours.',
'''

# Insert English translations before Work section
content = content.replace(
    '\n    /* Work */\n',
    pricing_en + '\n    /* Work */\n'
)

# Arabic pricing translations
pricing_ar = '''
    /* Pricing */
    pricing_title: 'الباقات والأسعار',
    pricing_subtitle: 'اختر الباقة المناسبة لمشروعك — كلها تشمل إنتاج فيديو AI، تعليق صوتي، وتسليم خلال ٤٨ ساعة.',
    pricing_currency: 'د.تايواني',
    pricing_cta: 'اطلب الآن',
    pricing_cta_monthly: 'اشترك الآن',
    pricing_popular: 'الأكثر شعبية',
    pricing_period: '/شهر',
    pricing_basic_title: 'أساسية',
    pricing_basic_f1: '١ فيديو AI (٣٠ ثانية)',
    pricing_basic_f2: 'سيناريو وتطوير فكرة',
    pricing_basic_f3: 'تعليق صوتي AI (عربي/إنجليزي/صيني)',
    pricing_basic_f4: 'موسيقى وتصميم صوتي',
    pricing_basic_f5: 'تسليم خلال ٣ أيام',
    pricing_basic_f6: 'جولتي تعديل',
    pricing_standard_title: 'قياسية',
    pricing_standard_f1: '٣ فيديوهات AI (٣٠ ثانية لكل منها)',
    pricing_standard_f2: 'سيناريو ولوحة قصصية كاملة',
    pricing_standard_f3: 'تعليق صوتي AI + موسيقى مخصصة',
    pricing_standard_f4: 'ترجمة متعددة اللغات',
    pricing_standard_f5: 'تسليم خلال ٥ أيام',
    pricing_standard_f6: '٤ جولات تعديل',
    pricing_standard_f7: 'حقوق استخدام تجاري',
    pricing_pro_title: 'احترافية',
    pricing_pro_f1: '٥ فيديوهات AI (٦٠ ثانية لكل منها)',
    pricing_pro_f2: 'سيناريو وإخراج فني متميز',
    pricing_pro_f3: 'تعليق صوتي احترافي',
    pricing_pro_f4: 'إنتاج كامل وتدرج ألوان',
    pricing_pro_f5: 'تسليم خلال ٧ أيام',
    pricing_pro_f6: 'تعديلات غير محدودة',
    pricing_pro_f7: 'حقوق تجارية كاملة',
    pricing_pro_f8: 'تسليم سريع متاح',
    pricing_monthly_title: 'اشتراك شهري',
    pricing_monthly_f1: '١٠ فيديوهات AI / شهر',
    pricing_monthly_f2: 'مفاهيم وسيناريوهات غير محدودة',
    pricing_monthly_f3: 'دعم أولوي ٢٤/٧',
    pricing_monthly_f4: 'مدير حساب مخصص',
    pricing_monthly_f5: 'حقوق تجارية كاملة',
    pricing_monthly_f6: 'الفيديوهات غير المستخدمة تتراكم',
    pricing_monthly_f7: 'إلغاء في أي وقت',
    pricing_note: 'تحتاج شيء مخصص؟ تواصل معنا للحصول على عرض سعر مخصص.',
    /* Order */
    order_title: 'قدّم طلبك',
    order_subtitle: 'املأ النموذج أدناه وسنتواصل معك خلال ٢٤ ساعة.',
    order_name_label: 'الاسم الكامل',
    order_name_placeholder: 'اسمك الكامل',
    order_email_label: 'البريد الإلكتروني',
    order_email_placeholder: 'your@email.com',
    order_package_label: 'اختر الباقة',
    order_package_default: 'اختر باقة...',
    order_package_basic: 'أساسية — ١,٠٠٠ د.تايواني',
    order_package_standard: 'قياسية — ٢,٥٠٠ د.تايواني',
    order_package_pro: 'احترافية — ٤,٥٠٠–٦,٠٠٠ د.تايواني',
    order_package_monthly: 'اشتراك شهري — ٨,٠٠٠ د.تايواني/شهر',
    order_message_label: 'وصف المشروع',
    order_message_placeholder: 'أخبرنا عن مشروعك، الأسلوب المفضل، الجمهور المستهدف...',
    order_submit: 'إرسال طلب الشراء',
    order_success: 'شكراً لك! سنتواصل معك خلال ٢٤ ساعة.',
'''

# Insert Arabic translations before Work section in ar block
content = content.replace(
    '\n    /* Work */\n',
    pricing_ar + '\n    /* Work */\n',
    1  # Only second occurrence (Arabic block)
)

with open('js/i18n.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("i18n.js patched with pricing + order translations")
