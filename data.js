// نستخدم const لتعريف المتغير وجعله متاحاً في الملفات الأخرى
const ALL_TEMPLATES_DATA = [
// مثال لقالب في ملف data.js
  {
    "id": "Facture_a_maintenir_AR",
    "name": "Facture a maintenir AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب  
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        .جوابا على رسالتكم المشار إلى مرجعها اعلاه، نخبركم أن الفاتورة موضوع شكايتكم تتعلق باستهلاك غير قانوني، وأنها أعدت وفقا لمقتضيات دفتر التحملات للتدبير المفوض للتطهير السائل و توزيع الماء والكهرباء بولاية طنجة</div><div class="letter-foter">وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون
        .وتقبلوا سيدي فائق التقدير والاحترام</div>
        <div class="letter-footer">مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "Avoir_AR",
    "name": "Proposition d'avoir AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب  
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلاه، نخبركم أن شركة أمانديس بناء على المعطيات الجديدة المدلى بها من طرفكم سنقوم بدراسة إمكانية إعادة النظر في طلبكم، وإنها ستقوم باتخاذ الإجراءات وفقا لمقتضيات دفتر التحملات للتدبير المفوض للتطهير السائل وتوزيع الماء والكهرباء بولاية طنجة
        
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },
  {
    "id": "Redressement_AR",
    "name": "Redressement AR ",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلاه، نخبركم أن الفاتورة موضوع شكايتكم تتعلق بتسوية وضعية استهلاك غير مفوتر، وأنها أعدت وفقا لمقتضيات دفتر التحملات للتدبير المفوض للتطهير السائل وتوزيع الماء والكهرباء بولاية طنجة.
        
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "RAS_AR",
    "name": "RAS AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلاه، نخبركم أن شركة أمانديس انتقلت إلى عين المكان وقامت بفحص المنشآت موضوع الشكاية، فلم تتم ملاحظة وجود استهلاك غير قانوني في تلك اللحظة، هذا وستظل هذه الحالة تحت المراقبة

        .وتقبلوا سيدي فائق التقدير والاحترام</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "ne_répond_pas_AR",
    "name": "ne répond pas AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب  
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلاه، نخبركم أن الفاتورة موضوع شكايتكم تتعلق باستهلاك غير قانوني ، وأنها أعدت وفقا لمقتضيات دفتر التحملات للتدبير المفوض للتطهير السائل وتوزيع الماء والكهرباء بولاية طنجة.
        ونخبركم بأننا قمنا بمحاولة الاتصال بكم، ولكن لم نتلق أي رد منكم لذا لا يمكن مراجعة أو إلغاء الفاتورة.
                
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "Merci_d'homologer_tous_les_pièces_scanné_AR",
    "name": "Merci d'homologer tous les pièces scanné AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب  
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلاه، نخبركم أن الفاتورة موضوع شكايتكم تتعلق باستهلاك غير قانوني ، وأنها أعدت وفقا لمقتضيات دفتر التحملات للتدبير المفوض للتطهير السائل وتوزيع الماء والكهرباء بولاية طنجة.
        و نطلب منكم التوجه الى وكالة أمانديس الأقرب لكم لتقديم الوثائق الاثباثية الأصلية للمصادقة عليها قصد إعادة دراسة الملف وفقا للمساطر المعتمدة لدى الشركة.
               
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "Manque_doc_AR",
    "name": "Manque doc AR ",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب  
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلاه، نخبركم أن الفاتورة موضوع شكايتكم تتعلق باستهلاك غير قانوني ، وأنها أعدت وفقا لمقتضيات دفتر التحملات للتدبير المفوض للتطهير السائل وتوزيع الماء والكهرباء بولاية طنجة. 
        ونخبركم أنه نظرا لغياب الوثائق الإثباتية لا يمكن مراجعة أو إلغاء الفاتورة.
                        
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "inaccessible_AR",
    "name": "inaccessible AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلا الواردة علينا بتاريخ {{date}} ، بشرفنا إخباركم أنه تعذر علينا القيام بعمليات الفحص اللازمة نظرا لتواجد المنشآت الكهربائية بما فيها مكان العداد داخل محل مغلق بقفل خاص.
        و عليه نطلب منكم رفع هذه الحواجز والمعيقات قصد القيام بالمتعين.
                        
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "illesible_AR",
    "name": "illesible AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلاه، نخبركم أن الفاتورة موضوع شكايتكم تتعلق باستهلاك غير قانوني ، وأنها أعدت وفقا لمقتضيات دفتر التحملات للتدبير المفوض للتطهير السائل وتوزيع الماء والكهرباء بولاية طنجة 
        ونخبركم أن الوثائق المدلى بها يستحيل قراءتها، لذا لا يمكن مراجعة أو إلغاء الفاتورة.
                        
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "client_en_cours_AR",
    "name": "client en cours AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلاه، نخبركم اننا توصلنا بطلبكم، وهو الآن قيد الدراسة أخذا بعين الاعتبار كافة التفاصيل و الاثباتات المدلى بها. 
        في حال وجود أي استفسارات إضافية، لا تترددوا في التواصل معنا
                        
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "Facture_a_maintenir_enquete_AR",
    "name": "Facture a maintenir enquete AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلاه، وتبعا للمراقبة المنجزة من طرف عون أمانديس بحضوركم نخبركم انه قد تبين وجود استهلاك غير قانوني. و عليه فإن الفاتورة موضوع شكايتكم المتعلقة بالاستهلاك غير القانوني أعدت وفقا لمقتضيات دفتر التحملات للتدبير المفوض للتطهير السائل وتوزيع الماء والكهرباء بولاية طنجة

        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "client_doc_incomplet_AR",
    "name": "client doc incomplet AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلاه، نخبركم أن الفاتورة موضوع شكايتكم تتعلق باستهلاك غير قانوني ، وأنها أعدت وفقا لمقتضيات دفتر التحملات للتدبير المفوض للتطهير السائل وتوزيع الماء والكهرباء بولاية طنجة.
        ونخبركم بأنه نظرًا لعدم توفر الوثائق الإثباتية بشكل كافٍ، لا يمكن مراجعة أو إلغاء الفاتورة.
       
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "Facture_a_maintenir+avoir_AR",
    "name": "Facture a maintenir + avoir AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلاه، نحيطكم علمًا بأننا قد تلقينا شكايتكم وبأنها حظيت بكل العناية والاهتمام اللازمين.
        فيما يتعلق لفاتورة الماء، و بناء على المعطيات الجديدة المدلى بها من طرفكم سنقوم بدراسة إمكانية إعادة النظر في طلبكم. 
        أما بالنسبة لفاتورة الكهرباء، فنود إعلامكم بأن الفاتورة المسجلة صحيحة، وأنها أعدت وفقا لمقتضيات دفتر التحملات لتدبير المفوض لتطهير السائل وتوزيع الماء والكهرباء بولاية طنجة.
        
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "Adresse_AR",
    "name": "Adresse AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلاه، نخبركم اننا توصلنا بشكايتكم المتعلقة بالمخالفة المحتسبة في عقدة الاشتراك الخاصة بمادة الماء. نود إبلاغكم  أن هذه المخالفة تم معاينتها بتاريخ {{date}}، وهي تخص العقار الكائن بـ{{adresse}}.

        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "client_absent_AR",
    "name": "client absent AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        علاقة بمراسلتكم الواردة علينا بتاريخ: {{date}} و المسجلة تحت عدد: {{demande}} وتبعا للشروحات المقدمة لكم في عين المكان من طرفنا و حتى يتسنى لنا القيام بفحص منشآتكم من داخل العقار قصد التأكد من المعطيات التي صرحتم بها، نطلب منكم تحديد موعد للقاء بعين المكان.

        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "presence_de_fraude_AR_contrat_RS",
    "name": "presence de fraude AR contrat RS",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        علاقة بمراسلتكم الواردة علينا بتاريخ {{date}} و المسجلة تحت عدد : {{demande}} يشرفنا إخباركم أن طلبكم أخد منا كل العناية و الإهتمام.
        كما نعلمكم بأن شركة أمانديس وفي إطار مسؤولياتها حسب دفتر التحملات، تخبركم بأنها ستقوم بحذف كل الروابط الغير القانونية، و ذلك حماية للأشخاص و الممتلكات.
         كما سيتم احتساب الاستهلاك الغير قانوني في أسمكم، باعتباركم المسؤولون عن العقار موضوع الاستغلال الغير القانوني ، بناء على أن عقد الاشتراك الماء و الكهرباء المبرم بينكم و بين شركة أمانديس كان أو لايزال ساري المفعول لحظة معاينة الاختلاس. 
        و سنوافيكم مستقبلا بالمبلغ المحتسب وفقا لمقتضيات دفتر التحملات للتدبير المفوض للتطهير السائل و توزيع الماء و الكهرباء بولاية طنجة.
        
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "presence_de_fraude_AR",
    "name": "presence de fraude AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        علاقة بمراسلتكم الواردة علينا بتاريخ 2025-10-17 و المسجلة تحت عدد 21310498 يشرفنا إخباركم أن طلبكم أخد منا كل العناية و الإهتمام.

        واننا سنقوم باتخاذ الإجراءات المنصوص عليها في هذه الحالة وفقا لمقتضيات دفتر التحملات للتدبير المفوض للتطهير السائل وتوزيع الماء والكهرباء بولاية طنجة.
        
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "en_cours_de_traitement_AR",
    "name": "en cours de traitement AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلا الواردة علينا بتاريخ 2024-11-13، بشرفنا إخباركم أنه تعذر علينا القيام بعمليات الفحص اللازمة نظرا لتواجد العداد داخل محل مغلق بقفل خاص.
        و عليه نطلب منكم رفع هذه الحواجز والمعيقات قصد القيام بالمتعين.

        
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": "inaccessible_AR",
    "name": "inaccessible AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        يشرفنا اخباركم اننا توصلنا طلبكم، وهو الآن قيد الدراسة من قبل فريقنا المختص. نعمل جاهدين على مراجعة كافة التفاصيل. 
        في حال وجود أي استفسارات إضافية، لا تترددوا في التواصل معنا
        
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },

  {
    "id": " réponse_pas_de_tél_AR",
    "name": "réponse pas de tél AR",
    "lang": "ar",
    "content": `
        <div class="letter-header">
        طنجة في
        الى السيد(ة):{{nom}}
        العنوان:{{adresse}}  طنجة</div><div class="letter-title">
        مديرية حماية المبيعات 
        مرجعنا: {{demande}} / س ب 
        مرجعكم رسالتكم بتاريخ:{{date}}
        رقم تسجيلكم:{{demande}}</div><div class="letter-body">
        الموضوع: {{objet}}
        جوابا على رسالتكم المشار إلى مرجعها أعلاه، نخبركم أن الفاتورة موضوع شكايتكم تتعلق باستهلاك غير قانوني ، وأنها أعدت وفقا لمقتضيات دفتر التحملات للتدبير المفوض للتطهير السائل وتوزيع الماء والكهرباء بولاية طنجة. ونظرا لعدم توفرنا على رقم هاتفكم لم يتسنى لنا الاتصال بكم للمزيد من التوضيحات بخصوص طلبكم.
        
        وتبقى المصالح المختصة لشركة أمانديس رهن إشارتكم من أجل مزيد من التنسيق والتعاون.
        وتقبلوا سيدي فائق التقدير والاحترام.</div><div class="letter-footer">
         مديرية حماية المبيعات</div>
    `
  },








  {
      "id": "Facture_a_maintenir_FR",
      "name": "Facture a maintenir FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      En réponse à votre courrier cité en objet, nous vous informons que dans le cadre des visites de terrain pour la vérification des installations d’alimentation en eau et en électricité de nos clients, nos agents techniques assermentés ont constaté la présence de consommations illégales.Par ailleurs, nous tenons à porter à votre connaissance que les volumes de régularisation ont été estimés sur la base  des dispositions prévues dans notre Cahier Des Charges.
      
      Les services compétents de la société Amendis restent à votre disposition pour toute coordination et collaboration supplémentaires.
      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  {
      "id": "Presence_de_fraude_RS_FR",
      "name": "Presence de fraude RS FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      En réponse à votre courrier cité en objet, nous vous informons que dans le cadre de ses responsabilités selon le cahier des charges, vous informe qu'elle procédera à la suppression de toutes les branchements illégales, ceci afin de protéger les personnes et les biens.
      
      De plus, la consommation illégale sera imputée à votre nom, en tant que responsables du bien immobilier objet de l’exploitation illégale, conformément au contrat d’abonnement à l’eau et à l’électricité conclu entre vous et la société Amendis, qui était ou reste en vigueur au moment de la constatation du détournement.
      
      Nous vous communiquerons ultérieurement le montant calculé conformément aux dispositions du cahier des charges de la gestion déléguée de l’assainissement liquide et de la distribution d’eau et d’électricité dans la province de Tanger.
            
      Les services compétents de la société Amendis restent à votre disposition pour toute coordination et collaboration supplémentaires.
      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  {
      "id": "inaccessible_pour_vérification_FR",
      "name": "inaccessible pour vérification FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      En réponse à votre courrier reçu le 09/10/2025, enregistré sous le numéro 21281454, nous avons l'honneur de vous informer que votre demande a reçu toute notre attention.

      Par ailleurs, nous vous informons que nous n’avons pas pu accéder aux compteurs pour faire les vérifications nécessaires des compteurs du fait  que le local technique est fermé avec un cadenas. 

      Par conséquent, nous vous demandons de bien vouloir déposer le cadenas ainsi que les obstacles afin de nous permettre de faire le nécessaire.

      
      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  {
      "id": "inaccessible_pour_enquête_FR",
      "name": "inaccessible pour enquête FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      En réponse à votre courrier cité en objet, nous vous informons que dans le cadre des visites de terrain pour la vérification des installations d’alimentation en eau et en électricité de nos clients, nos agents techniques assermentés ont constaté la présence de consommations irrégulières.

      Nous tenons à porter à votre connaissance que les volumes des consommations irrégulières  ont été estimés sur la base  des dispositions prévues dans notre Cahier Des Charges.
      
      Par ailleurs, nous vous informons que nous n’avons pas pu accéder aux compteurs pour faire les vérifications nécessaires des compteurs du fait  que le local technique est fermé avec un cadenas. 
      
      Par conséquent, nous vous demandons de bien vouloir déposer le cadenas ainsi que les obstacles afin de nous permettre de faire le nécessaire.
            
      Les services compétents de la société Amendis restent à votre disposition pour toute coordination et collaboration supplémentaires.
      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  {
      "id": "Homologer_FR",
      "name": "Homologer FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      En réponse à votre courrier cité en objet, nous vous informons que dans le cadre des visites de terrain pour la vérification des installations d’alimentation en eau et en électricité de nos clients, nos agents techniques assermentés ont constaté la présence de consommations illégales.

      Par ailleurs, nous tenons à porter à votre connaissance que les volumes de régularisation ont été estimés sur la base  des dispositions prévues dans notre Cahier Des Charges.
      
      Nous vous prions de bien vouloir vous rendre à votre agence de rattachement Amendis  pour présenter les documents justificatifs  originaux en vue de leur certification de conformité à l’original.
            
      Les services compétents de la société Amendis restent à votre disposition pour toute coordination et collaboration supplémentaires.
      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  {
      "id": "Proposition_d'avoir_FR",
      "name": "Proposition d'avoir FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      En réponse à votre courrier cité en objet, nous vous informons que dans le cadre des visites de terrain pour la vérification des installations d’alimentation en eau et en électricité de nos clients, nos agents techniques assermentés ont constaté la présence de consommation anormale                               et la suite de laquelle une facture régularisation a été établie.

      Suite à votre réclamation et se basant sur les nouveaux documents remis par vos  soins , la possibilité d’établir un avoir conformément aux dispositions prévues dans notre Cahier Des Charges est en cours d’étude.
            
      Les services compétents de la société Amendis restent à votre disposition pour toute coordination et collaboration supplémentaires.
      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  {
      "id": "En_cours_FR",
      "name": "En cours FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      En réponse à votre courrier cité en objet, nous vous informons que votre réclamation a été prise en considération avec toute l’attention requise et qu’elle est actuellement à l’étude par les services compétents.

      Nous vous informons également que, si nécessaire, les services concernés pourront prendre contact directement avec vous pour plus d’information.

      Les services compétents de la société Amendis restent à votre disposition pour toute coordination et collaboration supplémentaires.
      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  {
      "id": "RAS_FR",
      "name": "RAS FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      En réponse à votre courrier cité en objet, nous vous informons que nos agents techniques assermentés se sont rendus sur place et ont mené une enquête sur les installations mentionnées dans votre réclamation. Aucune consommation illégale n'a été détectée à ce moment-là.

      Cette situation restera sous surveillance.
           
      Les services compétents de la société Amendis restent à votre disposition pour toute coordination et collaboration supplémentaires.
      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  {
      "id": "Manque_document_FR",
      "name": "Manque document FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      En réponse à votre courrier cité en objet, nous vous informons que dans le cadre des visites de terrain pour la vérification des installations d’alimentation en eau et en électricité de nos clients, nos agents techniques assermentés ont constaté la présence d’alimentation illégale.

      Par ailleurs, nous tenons à porter à votre connaissance que le volume de la Consommation illégale a été estimé sur la base  des dispositions prévues dans notre Cahier Des Charges.
      
      La révision de la facture de régularisation est tributaire de la présentation par vos soins de documents justificatifs authentiques permettant de reconsidérer les éléments de notre estimation.
            
      Les services compétents de la société Amendis restent à votre disposition pour toute coordination et collaboration supplémentaires.
      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  {
      "id": "Presence_de_fraude_FR",
      "name": "Presence de fraude FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      En réponse à votre courrier reçu le 09/10/2025, enregistré sous le numéro 21281454, nous avons l'honneur de vous informer que votre demande a reçu toute notre attention.

      Nous prendrons les dispositions nécessaires conformément aux dispositions du Cahier des Charges d'exploitation des services de l'assainissement liquide, de l'eau potable et de l'électricité.

      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  {
      "id": "Redressement_FR",
      "name": "Redressement FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      En réponse à votre courrier cité en objet, nous vous informons que dans le cadre des visites de terrain pour la vérification des installations d’alimentation en eau et en électricité de nos clients, nos agents techniques assermentés ont constaté la présence de consommations non comptabilisées .

      Par ailleurs, nous tenons à porter à votre connaissance que les volumes de régularisation ont été estimés sur la base  des dispositions prévues dans notre Cahier Des Charges.

      Les services compétents de la société Amendis restent à votre disposition pour toute coordination et collaboration supplémentaires.
      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  {
      "id": "En_cours_de_traitement_FR",
      "name": "En cours de traitement FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      Nous vous remercions pour votre confiance et l'intérêt que vous portez à nos services. Nous souhaitons vous informer que votre demande est actuellement en cours d'étude. Nous mettons tout en œuvre pour la traiter dans les meilleurs délais et nous vous tiendrons informé de toute mise à jour.

      N'hésitez pas à nous contacter pour toute question ou clarification supplémentaire.

      Les services compétents de la société Amendis restent à votre disposition pour toute coordination et collaboration supplémentaires.
      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  {
      "id": "Redressement_index_export_FR",
      "name": "Redressement index export FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      En réponse à votre courrier cité en objet, nous vous informons que dans le cadre des visites de terrain pour la vérification des installations d’alimentation en eau et en électricité de nos clients, nos agents techniques assermentés ont constaté la présence de consommations non comptabilisées.

      Par ailleurs, nous tenons à porter à votre connaissance que les volumes de régularisation ont été calculés sur la base des données réelles fournies par votre compteur intelligent 
      Ce dernier enregistre tous les détails de la consommation, ce qui nous permet de procéder à une facturation exacte et non estimée. Ainsi, que la facture a été établie conformément aux  dispositions prévues dans notre Cahier Des Charges.
      
      Les services compétents de la société Amendis restent à votre disposition pour toute coordination et collaboration supplémentaires.
      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  {
      "id": "Client_pas_de_tél_FR",
      "name": "Client pas de tél FR",
      "lang": "fr",
      "content": `
      <div class="letter-headerfr">
      Tanger, le 
      Société: {{nom}}
      Adresse: {{adresse}} Tanger</div><div class="letter-titlefr">
      Direction de sécurisation des ventes
      N/Réf:/SB: {{demande}}
      V/Réf:{{date}}
      N°d’arrivée: {{demande}}
      </div><div class="letter-bodyfr">
      Objet:{{objet}}
      En réponse à votre courrier cité en objet, nous vous informons que dans le cadre des visites de terrain pour la vérification des installations d’alimentation en eau et en électricité de nos clients, nos agents techniques assermentés ont constaté la présence de consommations frauduleuses.

      Nous tenons à porter à votre connaissance que les volumes des consommations frauduleuses ont été estimés sur la base  des dispositions prévues dans notre Cahier Des Charges.
      
      Par ailleurs, nous vous informons que nous ne sommes pas parvenus à vous contacter par téléphone pour avoir de plus amples informations concernant cette alimentation illégale. 
      
      Les services compétents de la société Amendis restent à votre disposition pour toute coordination et collaboration supplémentaires.
      Veuillez agréer, Monsieur, l'expression de notre haute considération et respect.</div>
      <div class="letter-footerfr">La Direction Sécurisation des Ventes </div>`
  },
  
  // أضف الـ 12 قالب هنا براحتك.. الملف سيتحمل آلاف الأسطر ولن يزعجك
];
