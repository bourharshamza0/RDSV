// ============================================
// نظام إدارة المراسلات - JavaScript الكامل
// الإصدار: 2.0
// التاريخ: 2024
// ============================================

// ===== متغيرات النظام الرئيسية =====
let currentLanguage = 'ar'; // اللغة الحالية للواجهة
let arTemplates = {};      // تخزين القوالب العربية
let frTemplates = {};      // تخزين القوالب الفرنسية
let selectedTemplate = null; // القالب المختار
let allData = [];          // جميع البيانات المسجلة
let isLoading = false;     // حالة التحميل

// ===== إعدادات التطبيق =====
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxXqeUQpIzMKydQTc1i8sw9A_RT-LHgsVuPpOBowCt6GZdMa1av7h2pVo5T7WM3el4y/exec';
const TEMPLATES_AR_URL = 'templates-ar.json';
const TEMPLATES_FR_URL = 'templates-fr.json';

// ===== تهيئة التطبيق عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 بدء تحميل نظام المراسلات...');
    
    try {
        // إظهار شاشة التحميل
        showLoading('جاري تهيئة النظام...');
        
        // 1. تحميل القوالب العربية
        console.log('📥 جاري تحميل القوالب العربية...');
        await loadTemplates('ar');
        
        // 2. تحميل القوالب الفرنسية
        console.log('📥 جاري تحميل القوالب الفرنسية...');
        await loadTemplates('fr');
        
        // 3. عرض القوالب العربية أولاً
        console.log('🔄 جاري عرض القوالب...');
        displayTemplates();
        
        // 4. تحميل البيانات من Google Sheets
        console.log('📊 جاري تحميل البيانات...');
        await loadDataFromGoogleSheets();
        
        // 5. ضبط تاريخ اليوم كافتراضي
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
        
        // 6. إخفاء شاشة التحميل
        setTimeout(() => {
            hideLoading();
            showAlert('✅ تم تحميل النظام بنجاح', 'success');
            console.log('🎉 تم تحميل النظام بنجاح!');
        }, 1000);
        
    } catch (error) {
        console.error('❌ خطأ في تحميل النظام:', error);
        hideLoading();
        showAlert('حدث خطأ في تحميل النظام. يرجى تحديث الصفحة.', 'error');
    }
});

// ===== دوال تحميل القوالب =====
async function loadTemplates(lang) {
    try {
        const url = lang === 'ar' ? TEMPLATES_AR_URL : TEMPLATES_FR_URL;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`خطأ في تحميل ${url}: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (lang === 'ar') {
            arTemplates = data.templates || {};
            console.log(`✅ تم تحميل ${Object.keys(arTemplates).length} قالب عربي`);
        } else {
            frTemplates = data.templates || {};
            console.log(`✅ تم تحميل ${Object.keys(frTemplates).length} قالب فرنسي`);
        }
        
    } catch (error) {
        console.error(`❌ خطأ في تحميل القوالب ${lang}:`, error);
        
        // استخدام قوالب افتراضية في حالة الخطأ
        const defaultTemplates = lang === 'ar' ? {
            "AR_01": {
                id: "AR_01",
                name: "رسالة رسمية عربية",
                category: "عام",
                content: "السادة الأفاضل،\n\nنود إحاطتكم علماً بالموضوع المذكور أعلاه.\n\nوتفضلوا بقبول فائق الاحترام والتقدير."
            }
        } : {
            "FR_01": {
                id: "FR_01",
                name: "Lettre Officielle Française",
                category: "Général",
                content: "Madame, Monsieur,\n\nNous vous informons concernant le sujet mentionné ci-dessus.\n\nVeuillez agréer nos salutations distinguées."
            }
        };
        
        if (lang === 'ar') {
            arTemplates = defaultTemplates;
        } else {
            frTemplates = defaultTemplates;
        }
        
        showAlert(`تم تحميل قوالب ${lang === 'ar' ? 'عربية' : 'فرنسية'} افتراضية`, 'info');
    }
}

// ===== دوال واجهة المستخدم =====
function switchLanguage(lang) {
    if (currentLanguage === lang || isLoading) return;
    
    currentLanguage = lang;
    
    // تحديث أزرار اللغة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(lang === 'ar' ? 'العربية' : 'Français')) {
            btn.classList.add('active');
        }
    });
    
    // عرض القوالب الجديدة
    displayTemplates();
    
    // تحديث العناوين
    updateInterfaceLanguage();
    
    console.log(`🌐 تم التبديل إلى اللغة: ${lang === 'ar' ? 'العربية' : 'الفرنسية'}`);
}

function updateInterfaceLanguage() {
    // يمكن تحديث نصوص الواجهة هنا إذا لزم الأمر
    const titles = {
        'ar': {
            search: 'ابحث عن نموذج...',
            recipient: 'المستلم',
            subject: 'الموضوع',
            name: 'الاسم',
            address: 'العنوان',
            reference: 'المرجع',
            date: 'التاريخ'
        },
        'fr': {
            search: 'Rechercher un modèle...',
            recipient: 'Destinataire',
            subject: 'Objet',
            name: 'Nom',
            address: 'Adresse',
            reference: 'Référence',
            date: 'Date'
        }
    };
    
    // تحديث مكان البحث
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.placeholder = `${titles[currentLanguage].search}`;
    }
    
    // تحديث عناوين الحقول
    document.querySelectorAll('.form-label').forEach((label, index) => {
        const spans = label.querySelectorAll('span');
        if (spans.length >= 2) {
            const titlesArr = Object.values(titles[currentLanguage]);
            if (titlesArr[index]) {
                spans[0].textContent = titlesArr[index];
            }
        }
    });
}

function displayTemplates() {
    const container = document.getElementById('template-list');
    const templates = currentLanguage === 'ar' ? arTemplates : frTemplates;
    
    if (!templates || Object.keys(templates).length === 0) {
        container.innerHTML = `
            <div class="no-templates">
                <div style="font-size: 48px; margin-bottom: 10px;">📭</div>
                <p>لا توجد قوالب ${currentLanguage === 'ar' ? 'عربية' : 'فرنسية'} متاحة</p>
            </div>
        `;
        document.getElementById('template-count').textContent = '0';
        return;
    }
    
    let html = '';
    let count = 0;
    
    Object.values(templates).forEach(template => {
        count++;
        const isActive = selectedTemplate && selectedTemplate.id === template.id ? 'active' : '';
        
        html += `
            <div class="template-card ${isActive}" 
                 onclick="selectTemplate('${currentLanguage}', '${template.id}')">
                <div class="template-title">${template.name}</div>
                <div style="color: #6c757d; font-size: 13px; margin: 5px 0;">
                    ${template.content.substring(0, 80)}...
                </div>
                <div class="template-meta">
                    <span class="template-category">${template.category}</span>
                    <span class="template-lang ${currentLanguage}">
                        ${currentLanguage === 'ar' ? 'عربي' : 'Français'}
                    </span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    document.getElementById('template-count').textContent = count;
    
    console.log(`📋 تم عرض ${count} قالب ${currentLanguage === 'ar' ? 'عربي' : 'فرنسي'}`);
}

function searchTemplates() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    const templates = currentLanguage === 'ar' ? arTemplates : frTemplates;
    const container = document.getElementById('template-list');
    
    if (!templates || Object.keys(templates).length === 0) {
        container.innerHTML = `
            <div class="no-templates">
                <div style="font-size: 48px; margin-bottom: 10px;">🔍</div>
                <p>لا توجد قوالب للبحث فيها</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    let foundCount = 0;
    
    Object.values(templates).forEach(template => {
        const matches = template.name.toLowerCase().includes(searchTerm) || 
                       template.category.toLowerCase().includes(searchTerm) ||
                       template.content.toLowerCase().includes(searchTerm);
        
        if (matches || searchTerm === '') {
            foundCount++;
            const isActive = selectedTemplate && selectedTemplate.id === template.id ? 'active' : '';
            
            html += `
                <div class="template-card ${isActive}" 
                     onclick="selectTemplate('${currentLanguage}', '${template.id}')">
                    <div class="template-title">${template.name}</div>
                    <div style="color: #6c757d; font-size: 13px; margin: 5px 0;">
                        ${template.content.substring(0, 80)}...
                    </div>
                    <div class="template-meta">
                        <span class="template-category">${template.category}</span>
                        <span class="template-lang ${currentLanguage}">
                            ${currentLanguage === 'ar' ? 'عربي' : 'Français'}
                        </span>
                    </div>
                </div>
            `;
        }
    });
    
    if (html === '') {
        html = `
            <div class="no-templates">
                <div style="font-size: 48px; margin-bottom: 10px;">🔍</div>
                <p>لم يتم العثور على قوالب تطابق البحث</p>
            </div>
        `;
    }
    
    container.innerHTML = html;
    document.getElementById('template-count').textContent = foundCount;
    
    if (searchTerm) {
        console.log(`🔍 تم العثور على ${foundCount} نتيجة للبحث: "${searchTerm}"`);
    }
}

function selectTemplate(lang, templateId) {
    if (isLoading) return;
    
    const templates = lang === 'ar' ? arTemplates : frTemplates;
    
    if (!templates[templateId]) {
        showAlert('القالب المحدد غير موجود', 'error');
        return;
    }
    
    selectedTemplate = {
        ...templates[templateId],
        lang: lang
    };
    
    // تحديث عرض القوالب
    displayTemplates();
    
    // تحديث عرض القالب المختار
    updateSelectedTemplateDisplay();
    
    console.log(`✅ تم اختيار القالب: ${selectedTemplate.name} (${lang})`);
    showAlert(`تم اختيار القالب: ${selectedTemplate.name}`, 'success');
}

function updateSelectedTemplateDisplay() {
    const panel = document.getElementById('selected-template-panel');
    const preview = document.getElementById('template-preview');
    
    if (selectedTemplate) {
        panel.style.display = 'block';
        preview.innerHTML = `
            <div style="margin-bottom: 10px;">
                <strong style="color: #2c3e50; font-size: 16px;">${selectedTemplate.name}</strong>
                <span class="template-category" style="margin-right: 10px; font-size: 12px;">${selectedTemplate.category}</span>
                <span class="template-lang ${selectedTemplate.lang}" style="font-size: 12px;">
                    ${selectedTemplate.lang === 'ar' ? 'عربي' : 'Français'}
                </span>
            </div>
            <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin-top: 10px; border-right: 3px solid #4a6fa5;">
                <p style="margin: 0; color: #495057; line-height: 1.6; font-size: 14px;">
                    ${selectedTemplate.content.substring(0, 180)}...
                </p>
            </div>
        `;
    } else {
        panel.style.display = 'none';
    }
}

function clearSelectedTemplate() {
    selectedTemplate = null;
    displayTemplates();
    updateSelectedTemplateDisplay();
    showAlert('تم إلغاء اختيار القالب', 'info');
    console.log('🗑️ تم مسح القالب المختار');
}

// ===== دوال إدارة النموذج =====
function validateForm() {
    const requiredFields = ['reclament', 'objet', 'nom', 'adresse', 'demande', 'date'];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            const fieldNames = {
                'reclament': 'المستلم',
                'objet': 'الموضوع',
                'nom': 'الاسم',
                'adresse': 'العنوان',
                'demande': 'المرجع',
                'date': 'التاريخ'
            };
            
            const fieldName = fieldNames[fieldId] || fieldId;
            const message = currentLanguage === 'ar' 
                ? `الرجاء ملء حقل ${fieldName}` 
                : `Veuillez remplir le champ ${fieldName}`;
            
            showAlert(message, 'error');
            field?.focus();
            return false;
        }
    }
    
    if (!selectedTemplate) {
        const message = currentLanguage === 'ar' 
            ? 'الرجاء اختيار قالب الرسالة' 
            : 'Veuillez sélectionner un modèle de lettre';
        showAlert(message, 'error');
        return false;
    }
    
    // التحقق من صحة التاريخ
    const dateField = document.getElementById('date');
    const selectedDate = new Date(dateField.value);
    const today = new Date();
    
    if (selectedDate > today) {
        const message = currentLanguage === 'ar' 
            ? 'التاريخ لا يمكن أن يكون في المستقبل' 
            : 'La date ne peut pas être dans le futur';
        showAlert(message, 'error');
        dateField.focus();
        return false;
    }
    
    return true;
}

function collectFormData() {
    return {
        reclament: document.getElementById('reclament').value.trim(),
        objet: document.getElementById('objet').value.trim(),
        nom: document.getElementById('nom').value.trim(),
        adresse: document.getElementById('adresse').value.trim(),
        demande: document.getElementById('demande').value.trim(),
        date: document.getElementById('date').value,
        template_id: selectedTemplate.id,
        template_name: selectedTemplate.name,
        template_content: selectedTemplate.content,
        language: selectedTemplate.lang,
        created_at: new Date().toISOString()
    };
}

function clearForm() {
    if (isLoading) return;
    
    // مسح حقول النموذج
    document.getElementById('letter-form').reset();
    
    // ضبط تاريخ اليوم
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
    
    // مسح القالب المختار
    selectedTemplate = null;
    updateSelectedTemplateDisplay();
    
    // إعادة عرض جميع البيانات
    displayDataTable(allData);
    
    showAlert('تم مسح النموذج بنجاح', 'info');
    console.log('🧹 تم مسح النموذج');
}

// ===== دوال إنشاء الرسالة =====
async function createLetter() {
    if (isLoading) return;
    
    // التحقق من صحة البيانات
    if (!validateForm()) return;
    
    isLoading = true;
    showLoading(currentLanguage === 'ar' ? 'جاري إنشاء الرسالة...' : 'Création de la lettre...');
    
    try {
        // جمع البيانات
        const formData = collectFormData();
        
        console.log('📝 بيانات النموذج:', formData);
        
        // 1. إرسال البيانات إلى Google Sheets
        console.log('📤 جاري إرسال البيانات إلى Google Sheets...');
        await sendToGoogleSheets(formData);
        
        // 2. إنشاء الرسالة
        console.log('🖨️ جاري إنشاء الرسالة...');
        generateLetter(formData);
        
        // 3. إضافة البيانات إلى الجدول المحلي
        console.log('📊 جاري تحديث الجدول...');
        addDataToTable(formData);
        
        // 4. إظهار رسالة النجاح
        const successMessage = currentLanguage === 'ar' 
            ? '✅ تم إنشاء الرسالة بنجاح' 
            : '✅ Lettre créée avec succès';
        
        showAlert(successMessage, 'success');
        console.log('🎉 تم إنشاء الرسالة بنجاح!');
        
        // 5. مسح النموذج بعد إنشاء الرسالة (اختياري)
        // clearForm();
        
    } catch (error) {
        console.error('❌ خطأ في إنشاء الرسالة:', error);
        
        const errorMessage = currentLanguage === 'ar' 
            ? '❌ حدث خطأ في إنشاء الرسالة' 
            : '❌ Erreur lors de la création de la lettre';
        
        showAlert(errorMessage, 'error');
    } finally {
        isLoading = false;
        hideLoading();
    }
}

async function sendToGoogleSheets(formData) {
    return new Promise((resolve, reject) => {
        const form = document.getElementById('letter-form');
        const formDataObj = new FormData(form);
        
        // إضافة البيانات الإضافية
        formDataObj.append('template_id', formData.template_id);
        formDataObj.append('template_name', formData.template_name);
        formDataObj.append('language', formData.language);
        formDataObj.append('created_at', formData.created_at);
        
        fetch(form.action, {
            method: 'POST',
            body: formDataObj,
            mode: 'no-cors'
        })
        .then(() => {
            console.log('📨 تم إرسال البيانات إلى Google Sheets');
            resolve();
        })
        .catch(error => {
            console.error('❌ خطأ في إرسال البيانات إلى Google Sheets:', error);
            // نرفض الوعد فقط إذا أردنا إيقاف العملية عند الخطأ
            // للآن نكتفي بالتسجيل فقط
            resolve();
        });
    });
}

function generateLetter(formData) {
    // إنشاء نافذة جديدة
    const newWindow = window.open('', '_blank', 'width=1000,height=700,scrollbars=yes,resizable=yes');
    
    if (!newWindow) {
        showAlert('تم حظر النافذة المنبثقة. يرجى السماح بالنوافذ المنبثقة.', 'error');
        throw new Error('تم حظر النافذة المنبثقة');
    }
    
    // تنسيق التاريخ
    const dateObj = new Date(formData.date);
    let formattedDate;
    
    if (formData.language === 'ar') {
        formattedDate = dateObj.toLocaleDateString('ar-MA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    } else {
        formattedDate = dateObj.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    }
    
    // إنشاء محتوى الرسالة
    const letterContent = createLetterContent(formData, formattedDate);
    
    // إنشاء صفحة كاملة
    const letterHTML = createLetterHTML(formData, formattedDate, letterContent);
    
    // كتابة الصفحة في النافذة الجديدة
    newWindow.document.write(letterHTML);
    newWindow.document.close();
    
    // التركيز على النافذة الجديدة
    setTimeout(() => {
        newWindow.focus();
    }, 100);
    
    console.log('📄 تم إنشاء الرسالة في نافذة جديدة');
}

function createLetterContent(formData, formattedDate) {
    let content = selectedTemplate.content;
    
    // استبدال العناصر النائبة إذا وجدت
    content = content
        .replace(/{{اسم}}/g, formData.nom)
        .replace(/{{اسم المستلم}}/g, formData.reclament)
        .replace(/{{عنوان}}/g, formData.adresse)
        .replace(/{{مرجع}}/g, formData.demande)
        .replace(/{{تاريخ}}/g, formattedDate)
        .replace(/{{موضوع}}/g, formData.objet);
    
    return content;
}

function createLetterHTML(formData, formattedDate, content) {
    const lang = formData.language;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    const fontFamily = lang === 'ar' ? "'Arial', 'Segoe UI', sans-serif" : "'Arial', 'Helvetica Neue', sans-serif";
    
    return `
        <!DOCTYPE html>
        <html lang="${lang}" dir="${dir}">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${formData.template_name} - ${formData.demande}</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: ${fontFamily};
                    direction: ${dir};
                    line-height: 1.8;
                    background: #f5f5f5;
                    padding: 40px;
                    color: #333;
                }
                
                .letter-container {
                    max-width: 800px;
                    margin: 0 auto;
                    background: white;
                    padding: 50px;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    position: relative;
                    border: 1px solid #ddd;
                }
                
                .letter-header {
                    text-align: center;
                    margin-bottom: 40px;
                    padding-bottom: 20px;
                    border-bottom: 3px solid #4a6fa5;
                }
                
                .letter-header h1 {
                    color: #2c3e50;
                    margin-bottom: 10px;
                    font-size: 28px;
                }
                
                .template-name {
                    color: #666;
                    font-size: 18px;
                    font-style: italic;
                }
                
                .letter-info {
                    background: #f8f9fa;
                    padding: 25px;
                    border-radius: 10px;
                    margin-bottom: 35px;
                    border: 1px solid #e9ecef;
                }
                
                .info-row {
                    margin: 12px 0;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: baseline;
                }
                
                .info-label {
                    font-weight: bold;
                    color: #4a6fa5;
                    min-width: ${lang === 'ar' ? '120px' : '150px'};
                    margin-${dir === 'rtl' ? 'left' : 'right'}: 15px;
                }
                
                .info-value {
                    flex: 1;
                    color: #2c3e50;
                }
                
                .letter-body {
                    margin: 35px 0;
                    text-align: justify;
                    line-height: 2;
                    font-size: ${lang === 'ar' ? '18px' : '16px'};
                }
                
                .letter-body p {
                    margin-bottom: 20px;
                    text-indent: ${lang === 'ar' ? '40px' : '50px'};
                }
                
                .letter-footer {
                    margin-top: 60px;
                    padding-top: 30px;
                    border-top: 2px solid #dee2e6;
                    text-align: ${dir === 'rtl' ? 'left' : 'right'};
                }
                
                .signature {
                    display: inline-block;
                    padding: 20px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                }
                
                .signature p {
                    margin: 8px 0;
                }
                
                .print-actions {
                    text-align: center;
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                }
                
                .print-btn {
                    padding: 12px 30px;
                    background: #4a6fa5;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 16px;
                    margin: 0 10px;
                    transition: all 0.3s;
                }
                
                .print-btn:hover {
                    background: #2c3e50;
                    transform: translateY(-2px);
                }
                
                .watermark {
                    position: absolute;
                    opacity: 0.1;
                    font-size: 120px;
                    font-weight: bold;
                    color: #4a6fa5;
                    ${dir === 'rtl' ? 'left: 50px;' : 'right: 50px;'}
                    top: 50%;
                    transform: translateY(-50%) rotate(-45deg);
                    z-index: 0;
                    pointer-events: none;
                }
                
                @media print {
                    body {
                        padding: 0;
                        background: white;
                    }
                    
                    .letter-container {
                        box-shadow: none;
                        border: none;
                        max-width: 100%;
                        padding: 20px;
                    }
                    
                    .print-actions {
                        display: none;
                    }
                    
                    .watermark {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="letter-container">
                <div class="watermark">${lang === 'ar' ? 'رسالة' : 'LETTRE'}</div>
                
                <div class="letter-header">
                    <h1>${lang === 'ar' ? '📄 رسالة رسمية' : '📄 LETTRE OFFICIELLE'}</h1>
                    <p class="template-name">${formData.template_name}</p>
                </div>
                
                <div class="letter-info">
                    <div class="info-row">
                        <span class="info-label">${lang === 'ar' ? 'التاريخ:' : 'Date:'}</span>
                        <span class="info-value">${formattedDate}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">${lang === 'ar' ? 'إلى:' : 'À:'}</span>
                        <span class="info-value">${formData.reclament}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">${lang === 'ar' ? 'الاسم:' : 'Nom:'}</span>
                        <span class="info-value">${formData.nom}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">${lang === 'ar' ? 'العنوان:' : 'Adresse:'}</span>
                        <span class="info-value">${formData.adresse}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">${lang === 'ar' ? 'الموضوع:' : 'Objet:'}</span>
                        <span class="info-value">${formData.objet}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">${lang === 'ar' ? 'المرجع:' : 'Référence:'}</span>
                        <span class="info-value">${formData.demande}</span>
                    </div>
                </div>
                
                <div class="letter-body">
                    ${content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
                </div>
                
                <div class="letter-footer">
                    <div class="signature">
                        <p>${lang === 'ar' ? 'وتفضلوا بقبول فائق الاحترام والتقدير،' : 'Veuillez agréer, Madame, Monsieur, nos salutations distinguées.'}</p>
                        <p><strong>${lang === 'ar' ? 'مدير الإدارة' : 'Directeur du Service'}</strong></p>
                        <p>${lang === 'ar' ? 'شركة النموذج' : 'Société Modèle'}</p>
                        <p>${new Date().getFullYear()} ©</p>
                    </div>
                </div>
                
                <div class="print-actions">
                    <button class="print-btn" onclick="window.print()">
                        ${lang === 'ar' ? '🖨️ طباعة' : '🖨️ Imprimer'}
                    </button>
                    <button class="print-btn" onclick="window.close()">
                        ${lang === 'ar' ? '❌ إغلاق' : '❌ Fermer'}
                    </button>
                </div>
            </div>
            
            <script>
                // طباعة تلقائية بعد تحميل الصفحة
                window.addEventListener('load', function() {
                    setTimeout(function() {
                        // window.print(); // إلغاء التعليق للطباعة التلقائية
                    }, 1000);
                });
            <\/script>
        </body>
        </html>
    `;
}

// ===== دوال إدارة البيانات =====
async function loadDataFromGoogleSheets() {
    try {
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbyxwuZuhrzooCAfrmnpMV6gopyMpZ0-KBz9INZx65wc4ajHXQB9qExFVBDuWwT0vg9A/exec';
        const response = await fetch(scriptUrl);
        
        if (!response.ok) {
            throw new Error(`خطأ في تحميل البيانات: ${response.status}`);
        }
        
        const data = await response.json();
        allData = Array.isArray(data) ? data : [];
        
        console.log(`📊 تم تحميل ${allData.length} سجل من Google Sheets`);
        
        // عرض البيانات في الجدول
        displayDataTable(allData);
        
    } catch (error) {
        console.error('❌ خطأ في تحميل البيانات:', error);
        
        // استخدام بيانات تجريبية في حالة الخطأ
        allData = [
            {
                date: new Date().toISOString().split('T')[0],
                demande: 'REF001',
                adresse: 'شارع النموذج، المدينة',
                nom: 'أحمد محمد',
                objet: 'طلب توضيح',
                language: 'ar'
            },
            {
                date: new Date().toISOString().split('T')[0],
                demande: 'REF002',
                adresse: '123 Rue Modèle, Paris',
                nom: 'Jean Dupont',
                objet: 'Demande d\'information',
                language: 'fr'
            }
        ];
        
        displayDataTable(allData);
        showAlert('تم تحميل بيانات تجريبية', 'info');
    }
}

function displayDataTable(data) {
    const tableBody = document.getElementById('data-table-body');
    
    if (!data || data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px;">
                    <div style="color: #6c757d;">
                        <div style="font-size: 48px; margin-bottom: 10px;">📭</div>
                        <p>لا توجد بيانات متاحة</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    
    data.forEach((item, index) => {
        // تنسيق التاريخ
        let formattedDate = item.date;
        try {
            if (formattedDate) {
                const dateObj = new Date(formattedDate);
                formattedDate = dateObj.toLocaleDateString('ar-MA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
            }
        } catch (e) {
            formattedDate = item.date;
        }
        
        html += `
            <tr onclick="fillFormFromTable('${item.demande}')" style="cursor: pointer;">
                <td>${formattedDate || item.date}</td>
                <td><strong>${item.demande || ''}</strong></td>
                <td>${item.adresse || ''}</td>
                <td>${item.nom || ''}</td>
                <td>${item.objet || ''}</td>
                <td>
                    <span class="template-lang ${item.language || 'ar'}" style="display: inline-block; padding: 3px 10px;">
                        ${item.language === 'fr' ? 'Français' : 'عربي'}
                    </span>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

function addDataToTable(formData) {
    // إضافة البيانات الجديدة إلى بداية المصفوفة
    allData.unshift({
        date: formData.date,
        demande: formData.demande,
        adresse: formData.adresse,
        nom: formData.nom,
        objet: formData.objet,
        language: formData.language,
        template_name: formData.template_name,
        created_at: new Date().toISOString()
    });
    
    // تحديث الجدول
    displayDataTable(allData);
    
    console.log('📝 تمت إضافة سجل جديد إلى الجدول');
}

function searchData() {
    if (isLoading) return;
    
    const searchTerm = document.getElementById('demande').value.trim();
    
    if (!searchTerm) {
        displayDataTable(allData);
        showAlert('أدخل رقم المرجع للبحث', 'info');
        return;
    }
    
    const filteredData = allData.filter(item => 
        item.demande && item.demande.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    displayDataTable(filteredData);
    
    if (filteredData.length === 0) {
        showAlert('لا توجد سجلات تطابق البحث', 'info');
    } else {
        showAlert(`تم العثور على ${filteredData.length} نتيجة`, 'success');
    }
    
    console.log(`🔍 تم البحث عن: "${searchTerm}" - النتائج: ${filteredData.length}`);
}

function fillFormFromTable(demande) {
    const item = allData.find(d => d.demande === demande);
    
    if (!item) {
        showAlert('لم يتم العثور على السجل', 'error');
        return;
    }
    
    // ملء حقول النموذج
    document.getElementById('demande').value = item.demande;
    document.getElementById('adresse').value = item.adresse;
    document.getElementById('nom').value = item.nom;
    document.getElementById('objet').value = item.objet;
    document.getElementById('date').value = item.date;
    
    // البحث عن القالب المناسب
    const templates = item.language === 'ar' ? arTemplates : frTemplates;
    const template = Object.values(templates).find(t => 
        t.name === item.template_name || t.content.includes(item.objet)
    );
    
    if (template) {
        selectTemplate(item.language, template.id);
        switchLanguage(item.language);
    }
    
    showAlert('تم ملء النموذج من السجل', 'success');
    console.log(`📋 تم ملء النموذج من السجل: ${demande}`);
}

// ===== دوال مساعدة =====
function showAlert(message, type = 'info') {
    const alert = document.getElementById('alert');
    
    // إزالة أي تنبيهات سابقة
    alert.className = 'alert';
    
    // إضافة الرسالة والنوع
    alert.textContent = message;
    alert.classList.add(`alert-${type}`, 'show');
    
    // إخفاء التنبيه بعد 3 ثوانٍ
    setTimeout(() => {
        alert.classList.remove('show');
    }, 3000);
}

function showLoading(message = 'جاري المعالجة...') {
    isLoading = true;
    
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) {
        // إنشاء عنصر التحميل إذا لم يكن موجوداً
        const newOverlay = document.createElement('div');
        newOverlay.id = 'loading-overlay';
        newOverlay.className = 'loading-overlay active';
        newOverlay.innerHTML = `
            <div class="spinner"></div>
            <p style="margin-top: 20px; color: #4a6fa5; font-weight: 600;">${message}</p>
        `;
        document.body.appendChild(newOverlay);
    } else {
        overlay.classList.add('active');
        const messageElement = overlay.querySelector('p');
        if (messageElement) {
            messageElement.textContent = message;
        }
    }
}

function hideLoading() {
    isLoading = false;
    
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// ===== دوال الأمان والتحقق =====
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    // إزالة علامات HTML الخطيرة
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9\s\-\+\(\)]{8,20}$/;
    return re.test(phone);
}

// ===== دوال النسخ الاحتياطي =====
function backupData() {
    try {
        const backup = {
            timestamp: new Date().toISOString(),
            templates_ar: arTemplates,
            templates_fr: frTemplates,
            data: allData
        };
        
        const backupStr = JSON.stringify(backup, null, 2);
        const blob = new Blob([backupStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('💾 تم إنشاء نسخة احتياطية');
        showAlert('تم إنشاء نسخة احتياطية بنجاح', 'success');
        
    } catch (error) {
        console.error('❌ خطأ في إنشاء النسخة الاحتياطية:', error);
        showAlert('حدث خطأ في إنشاء النسخة الاحتياطية', 'error');
    }
}

// ===== دوال استعادة النسخ الاحتياطي =====
function restoreData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const backup = JSON.parse(event.target.result);
                
                if (backup.templates_ar) arTemplates = backup.templates_ar;
                if (backup.templates_fr) frTemplates = backup.templates_fr;
                if (backup.data) allData = backup.data;
                
                // تحديث الواجهة
                displayTemplates();
                displayDataTable(allData);
                
                console.log('🔄 تم استعادة النسخة الاحتياطية');
                showAlert('تم استعادة النسخة الاحتياطية بنجاح', 'success');
                
            } catch (error) {
                console.error('❌ خطأ في استعادة النسخة الاحتياطية:', error);
                showAlert('ملف النسخة الاحتياطية غير صالح', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// ===== تصدير البيانات =====
function exportData(format = 'csv') {
    if (!allData.length) {
        showAlert('لا توجد بيانات للتصدير', 'info');
        return;
    }
    
    try {
        let content = '';
        let filename = '';
        
        if (format === 'csv') {
            // رأس CSV
            const headers = ['التاريخ', 'المرجع', 'العنوان', 'الاسم', 'الموضوع', 'اللغة'];
            content = headers.join(',') + '\n';
            
            // البيانات
            allData.forEach(item => {
                const row = [
                    `"${item.date || ''}"`,
                    `"${item.demande || ''}"`,
                    `"${item.adresse || ''}"`,
                    `"${item.nom || ''}"`,
                    `"${item.objet || ''}"`,
                    `"${item.language === 'fr' ? 'فرنسي' : 'عربي'}"`
                ];
                content += row.join(',') + '\n';
            });
            
            filename = `export_${new Date().toISOString().split('T')[0]}.csv`;
            
        } else if (format === 'json') {
            content = JSON.stringify(allData, null, 2);
            filename = `export_${new Date().toISOString().split('T')[0]}.json`;
        }
        
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log(`📤 تم تصدير ${allData.length} سجل`);
        showAlert(`تم تصدير ${allData.length} سجل`, 'success');
        
    } catch (error) {
        console.error('❌ خطأ في تصدير البيانات:', error);
        showAlert('حدث خطأ في تصدير البيانات', 'error');
    }
}

// ===== تصفية البيانات =====
function filterDataByLanguage(lang) {
    if (!allData.length) return;
    
    const filtered = allData.filter(item => item.language === lang);
    displayDataTable(filtered);
    
    const message = lang === 'ar' 
        ? `تم عرض ${filtered.length} سجل عربي` 
        : `تم عرض ${filtered.length} سجل فرنسي`;
    
    showAlert(message, 'info');
}

function filterDataByDate(startDate, endDate) {
    if (!allData.length) return;
    
    const filtered = allData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
    
    displayDataTable(filtered);
    showAlert(`تم عرض ${filtered.length} سجل بين ${startDate} و ${endDate}`, 'info');
}

// ===== الإحصائيات =====
function showStatistics() {
    if (!allData.length) {
        showAlert('لا توجد بيانات لعرض الإحصائيات', 'info');
        return;
    }
    
    const stats = {
        total: allData.length,
        arabic: allData.filter(item => item.language === 'ar').length,
        french: allData.filter(item => item.language === 'fr').length,
        today: allData.filter(item => {
            const today = new Date().toISOString().split('T')[0];
            return item.date === today;
        }).length,
        thisMonth: allData.filter(item => {
            const itemDate = new Date(item.date);
            const now = new Date();
            return itemDate.getMonth() === now.getMonth() && 
                   itemDate.getFullYear() === now.getFullYear();
        }).length
    };
    
    const message = `
        📊 إحصائيات النظام:
        • إجمالي السجلات: ${stats.total}
        • الرسائل العربية: ${stats.arabic}
        • الرسائل الفرنسية: ${stats.french}
        • اليوم: ${stats.today}
        • هذا الشهر: ${stats.thisMonth}
    `;
    
    showAlert(message, 'info');
}

// ===== إعادة التعيين =====
function resetSystem() {
    if (!confirm('هل أنت متأكد من إعادة تعيين النظام؟ سيتم حذف جميع البيانات المحلية.')) {
        return;
    }
    
    showLoading('جاري إعادة التعيين...');
    
    setTimeout(() => {
        // إعادة تعيين المتغيرات
        allData = [];
        selectedTemplate = null;
        
        // إعادة تعيين النموذج
        clearForm();
        
        // إعادة تعيين الجدول
        displayDataTable([]);
        
        hideLoading();
        showAlert('تم إعادة تعيين النظام بنجاح', 'success');
        console.log('🔄 تم إعادة تعيين النظام');
    }, 1500);
}

// ===== الأحداث العالمية =====
// منع إغلاق النافذة إذا كان هناك عملية جارية
window.addEventListener('beforeunload', function(e) {
    if (isLoading) {
        e.preventDefault();
        e.returnValue = 'هناك عملية قيد التنفيذ. هل تريد المغادرة؟';
    }
});

// دعم لوحة المفاتيح
document.addEventListener('keydown', function(e) {
    // Ctrl + S لحفظ الرسالة
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        createLetter();
    }
    
    // Ctrl + F للبحث
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        document.querySelector('.search-input').focus();
    }
    
    // Escape لمسح النموذج
    if (e.key === 'Escape') {
        clearForm();
    }
});

// ===== التهيئة النهائية =====
console.log('✅ تم تحميل script.js بنجاح');
console.log('📌 الإصدار: 2.0 | التاريخ: ' + new Date().toISOString().split('T')[0]);
console.log('👤 نظام إدارة المراسلات متعدد اللغات');

// ===== تصدير الوظائف للاستخدام العالمي =====
window.System = {
    switchLanguage,
    selectTemplate,
    createLetter,
    clearForm,
    searchData,
    fillFormFromTable,
    backupData,
    restoreData,
    exportData,
    filterDataByLanguage,
    filterDataByDate,
    showStatistics,
    resetSystem,
    
    // معلومات النظام
    get version() { return '2.0'; },
    get dataCount() { return allData.length; },
    get templatesCount() { 
        return Object.keys(arTemplates).length + Object.keys(frTemplates).length;
    },
    get currentLanguage() { return currentLanguage; }
};