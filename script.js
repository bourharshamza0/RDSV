// ============================================
// نظام إدارة المراسلات - النسخة الاحترافية الشاملة 
// ============================================

// ===== المتغيرات العالمية =====
let allData = [];          // مصفوفة لتخزين البيانات القادمة من Google Sheets محلياً
let allTemplates = [];     // مصفوفة لتخزين بيانات القوالب المحملة من ملف data.js
let selectedTemplate = null; // متغير لحفظ القالب الذي يختاره المستخدم حالياً

// ⚠️ ضع هنا الرابط الجديد الذي ستحصل عليه بعد عمل New Deployment
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxRKsgvCsscdDbYNc243g0lr50FOJshvMdCTHWQeYMvi8LbfmztYG3QQCSdT2i8Ut7D/exec';

// ===== 1. تهيئة النظام عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', async function() { 
    try {
        showLoading('...en cours'); 
        
        await Promise.all([
            loadDataFromGoogleSheets(),
            loadTemplates()
        ]);

        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('date');
        if (dateInput) dateInput.value = today; 
        
        addTableClickEvent(); 
        hideLoading(); 
        showAlert('✅ تم تشغيل النظام بنجاح', 'success'); 
    } catch (error) {
        console.error('❌ error :', error); 
        hideLoading(); 
        showAlert('حدث خطأ أثناء تحميل النظام', 'error'); 
    }
});

// ===== 2. نظام القوالب =====
function loadTemplates() {
    if (typeof ALL_TEMPLATES_DATA !== 'undefined') {
        allTemplates = ALL_TEMPLATES_DATA; 
        const select = document.getElementById('module');
        if (select) {
            select.innerHTML = '<option value="">-- اختر نوع المراسلة --</option>'; 
            allTemplates.forEach(temp => {
                const option = document.createElement('option'); 
                option.value = temp.id; 
                const langFlag = temp.lang === 'ar' ? ' (AR) 🇩🇿' : ' (FR) 🇫🇷'; 
                option.textContent = temp.name + langFlag; 
                select.appendChild(option); 
            });
        }
    } else {
        console.error("❌ فشل العثور على ALL_TEMPLATES_DATA في ملف data.js");
    }
}

function onTemplateChange() {
    const select = document.getElementById('module'); 
    const selectedId = select.value; 
    selectedTemplate = allTemplates.find(t => t.id === selectedId) || null;
    
    if (selectedTemplate) {
        showAlert(`تم اختيار: ${selectedTemplate.name}`, 'info'); 
    }
}

// ===== 3. جلب البيانات من جوجل شيت =====
async function loadDataFromGoogleSheets() {
    try {
        const response = await fetch(GOOGLE_SHEETS_URL); 
        if (!response.ok) throw new Error('Erreur dans la connexion avec Google Sheets');
        
        const data = await response.json(); 
        allData = Array.isArray(data) ? data : []; 
        displayDataTable(allData); 
    } catch (error) {
        console.error('❌ Erreur de récupération des données', error);
        showAlert('Impossible de récupérer les données du cloud', 'error');
    }
}

// ===== 4. حفظ البيانات في جوجل شيت =====
async function saveDataToGoogleSheets(userData) {
    try {
        console.log("Envoi des données en cours...", userData);
        
        const response = await fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(userData),
                headers: { 'Content-Type': 'application/json' }
        });

        console.log("✅ تم إرسال طلب التحديث للمركز");
        return true; 
    } catch (error) {
        console.error("❌ خطأ في الإرسال:", error);
        return false;
    }
}

// ===== 5. عرض البيانات في الجدول =====
function displayDataTable(data) {
    const tableBody = document.getElementById('data-table-body'); 
    if (!tableBody) return;

    tableBody.innerHTML = ''; 
    if (!data || data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7">لا توجد بيانات متاحة</td></tr>';
        return;
    }

    data.forEach(item => {
        const row = document.createElement('tr');
        const cleanDate = item.date ? item.date.split('T')[0] : ''; 

        // ترتيب الأعمدة هنا يجب أن يطابق ترتيب العناوين <th> في الـ HTML لديك
        row.innerHTML = `
            <td>${cleanDate}</td>
            <td style="font-weight: bold;">${item.demande || ''}</td>
            <td>${item.adresse || ''}</td>
            <td>${item.ville || ''}</td>
            <td>${item.nom || ''}</td>
            <td>${item.objet || ''}</td>
            <td>${item.destinataire || ''}</td>
        `;
        tableBody.appendChild(row); 
    });
}

// ===== 6. إنشاء المراسلة والطباعة =====
async function createLetter() {
    if (!selectedTemplate) {
        showAlert('يرجى اختيار نوع المراسلة من القائمة أولاً', 'error');
        return;
    }

    const userData = {
        destinataire: document.getElementById('destinataire') ? document.getElementById('destinataire').value.trim() : "",        
        nom: document.getElementById('nom') ? document.getElementById('nom').value.trim() : "",
        demande: document.getElementById('demande') ? document.getElementById('demande').value.toString().trim() : "",
        adresse: document.getElementById('adresse') ? document.getElementById('adresse').value.trim() : "",
        ville: document.getElementById('ville') ? document.getElementById('ville').value.trim() : "",
        objet: document.getElementById('objet') ? document.getElementById('objet').value.trim() : "",
        date: document.getElementById('date') ? document.getElementById('date').value : "",
        module: document.getElementById('module') ? document.getElementById('module').value : ""
    };

    if (!userData.nom || !userData.demande) {
        showAlert('يرجى إدخال الاسم ورقم الطلب بدقة', 'error');
        return;
    }

    showLoading('جاري تحديث البيانات في السحابة...');

    const success = await saveDataToGoogleSheets(userData);

    if (success) {
        // تحديث الجدول أمامك فوراً
        const existingIndex = allData.findIndex(d => d.demande && d.demande.toString().trim() === userData.demande);
        
        if (existingIndex !== -1) {
            allData[existingIndex] = { ...allData[existingIndex], ...userData };
        } else {
            allData.push(userData);
        }
        
        displayDataTable(allData);
        hideLoading();
        showAlert('✅ تم الحفظ بنجاح', 'success');

        // استبدال المتغيرات في القالب
        let content = selectedTemplate.content;
        content = content.replace(/{{destinataire}}/g, userData.destinataire);
        content = content.replace(/{{nom}}/g, userData.nom);
        content = content.replace(/{{demande}}/g, userData.demande);
        content = content.replace(/{{adresse}}/g, userData.adresse);
        content = content.replace(/{{ville}}/g, userData.ville);
        content = content.replace(/{{objet}}/g, userData.objet);
        content = content.replace(/{{date}}/g, userData.date);

        openPrintWindow(content, selectedTemplate.lang);
    } else {
        hideLoading();
        showAlert('❌ فشل الاتصال بالسحابة، حاول مرة أخرى', 'error');
    }
}

function openPrintWindow(content, lang) {
    const printWindow = window.open('', '_blank'); 
    
    printWindow.document.write(`
        <html>
            <head>
                <title>طباعة مراسلة</title>
		<style>

                    body { font-family: Arial, sans-serif; padding: 0px; white-space: pre-line; }

                    @media print { .no-print { display: none; } }

                    .letter-header { font-size: 14px; text-align: right; font-weight: bold; margin-bottom: 15px; margin-top: 50px; margin-left: auto; margin-right: 50%; width: 300px }

                    .letter-title { font-size: 14px; text-align: right; font-weight: bold; margin-bottom: 0px; text-decoration: none; }

                    .letter-body { font-size: 15px; white-space: pre-line; text-align: right; line-height: 2; margin-bottom: 0px; text-indent: 30px; }

                    .letter-foter { font-size: 15px; white-space: pre-line; text-align: right; line-height: 2; margin-bottom: 0px; text-indent: 30px;  }

                    .letter-footer { font-size: 15px; text-align: right; font-weight: bold; margin-bottom: 60px; margin-left: auto; margin-right: 60%; width: 300px }

                    .letter-headerfr { font-size: 15px; font-weight: bold; margin-bottom: 10px; margin-top: 10px; margin-left: auto; margin-right: 10%; width: 300px; text-align: left; }

                    .letter-titlefr { font-size: 15px; font-weight: bold; margin-bottom: 0px; text-align: left; }

                    .letter-bodyfr { font-size: 15px; white-space: pre-line; text-align: justify; line-height: 2; margin-bottom: 0px; text-indent: 30px; text-align: left; }

                    .letter-footerfr { font-size: 15px; font-weight: bold; margin-bottom: 60px; margin-top: 60px; margin-left: auto; margin-right: 10%; width: 300px; text-align: left; }

                </style>


           </head>
            <body>
                <div class="letter-body">${content}</div>
                <script>window.onload = function() { window.print(); }</script> 
            </body>
        </html>
    `);
    printWindow.document.close(); 
}

// ===== 7. وظائف مساعدة للواجهة =====
function searchData() {
    const searchTerm = document.getElementById('demande').value.trim().toLowerCase(); 
    if (!searchTerm) { displayDataTable(allData); return; } 
    
    const filtered = allData.filter(item => 
        String(item.demande || "").toLowerCase().includes(searchTerm) || 
        String(item.nom || "").toLowerCase().includes(searchTerm)
    );
    displayDataTable(filtered); 
}

function showLoading(message) {
    let loader = document.getElementById('global-loader'); 
    if (!loader) { 
        loader = document.createElement('div');
        loader.id = 'global-loader';
        loader.innerHTML = `<div class="loader-box"><div class="custom-spinner"></div><p class="loader-text">${message}</p></div>`;
        document.body.appendChild(loader);
    }
    loader.style.display = 'flex'; 
    document.body.style.overflow = 'hidden'; 
}

function hideLoading() {
    const loader = document.getElementById('global-loader');
    if (loader) {
        loader.style.display = 'none'; 
        document.body.style.overflow = 'auto'; 
    }
}

function showAlert(message, type) {
    let alert = document.getElementById('alert'); 
    if (!alert) {
        alert = document.createElement('div');
        alert.id = 'alert';
        document.body.appendChild(alert);
    }
    alert.className = `alert alert-${type} show`; 
    alert.textContent = message; 
    setTimeout(() => alert.classList.remove('show'), 3000); 
}

function clearForm() {
    const form = document.getElementById('letter-form');
    if (form) form.reset(); 
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today; 
    displayDataTable(allData); 
}

// ===== 8. الضغط على الجدول واستيراد البيانات =====
function addTableClickEvent() {
    document.addEventListener('click', function(e) {
        const row = e.target.closest('tr'); 
        if (!row || row.closest('thead')) return; 
        const cells = row.querySelectorAll('td'); 
        
        // أصبح الجدول الآن يعرض 7 أعمدة مرئية
        if (cells.length < 7) return;

        if (document.getElementById('date')) document.getElementById('date').value = cells[0].textContent.trim();
        if (document.getElementById('demande')) document.getElementById('demande').value = cells[1].textContent.trim();
        if (document.getElementById('adresse')) document.getElementById('adresse').value = cells[2].textContent.trim();
        if (document.getElementById('ville')) document.getElementById('ville').value = cells[3].textContent.trim(); // حقل المدينة
        if (document.getElementById('nom')) document.getElementById('nom').value = cells[4].textContent.trim();
        if (document.getElementById('objet')) document.getElementById('objet').value = cells[5].textContent.trim();
        
        // معالجة القائمة المنسدلة الخاصة بالمستلم
        const destSelect = document.getElementById('destinataire');
        if (destSelect) {
            const destValue = cells[6].textContent.trim();
            let optionExists = Array.from(destSelect.options).some(opt => opt.value === destValue);
            destSelect.value = optionExists ? destValue : "";
        }
        
        showAlert('✅ تم استيراد بيانات السجل', 'success');
    });
}

// ===== 9. تصدير النظام للواجهة =====
window.System = {
    onTemplateChange,
    createLetter,
    searchData,
    clearForm,
    reloadData: loadDataFromGoogleSheets
};