نظام Extensions — COMFORT Série 300

إنشاء إضافة ZIP:
1) ضع manifest.json وملف index.html في جذر ZIP مباشرة (لا تضعهما داخل مجلد فرعي).
2) manifest.json مثال:
{
  "id": "com.example.myextension",
  "name": "اسم الإضافة",
  "version": "1.0.0",
  "description": "وصف مختصر",
  "entry": "index.html"
}
3) استورد ZIP من Menu > Extensions.

فهرس المتجر registry.json:
{
  "version": 1,
  "extensions": [
    {
      "id": "com.example.myextension",
      "name": "اسم الإضافة",
      "version": "1.0.0",
      "description": "وصف مختصر",
      "zipUrl": "./myextension.zip",
      "sha256": "اختياري: بصمة SHA-256 للملف ZIP"
    }
  ]
}

انشر registry.json وملفات ZIP في GitHub Pages. افتح Extensions واضغط تحديث المتجر.
الإضافات المثبتة تحفظ محلياً في IndexedDB وتبقى متاحة دون إنترنت.

الأمان: الإضافات تعمل داخل iframe معزول وبصلاحيات محدودة، ولا يمكنها قراءة بيانات التطبيق الأساسية أو التخزين المحلي الخاص به. استخدم إضافات من مصادر موثوقة فقط.

حساب بصمة SHA-256 على Windows PowerShell:
(Get-FileHash .\myextension.zip -Algorithm SHA256).Hash.ToLower()
ضع الناتج في الحقل sha256 داخل registry.json لتفعيل التحديث التلقائي الموثق.


إضافة مميزة مرفقة:
- SmartCut — مساعد القص الذكي: extensions/smartcut-extension.zip
- تحسب توزيع أطوال قطاعات الألمنيوم على القضبان، الهدر، ونسبة الاستغلال والتكلفة.
- متاحة في المتجر عبر registry.json، وتعمل دون إنترنت بعد التثبيت.


إضافة PanelCut — حاسبة ألواح الخشب والفورميكا والزجاج:
- الملف: extensions/panelcut-extension.zip (ومتاحة في المتجر عبر registry.json).
- وحدات mm / cm / m مع تحويل تلقائي دون تغيير المقاسات الفعلية، جدول قطع تفاعلي، مخطط قص لكل لوح، هدر وتكلفة لكل مادة، وتصدير PDF.
- حفظ PDF وحفظ بيانات المشروع يتطلبان نسخة مدير الإضافات المحدّثة (جسر comfort:save / comfort:state) الموجودة في هذه الحزمة.
- في Android: يُحفظ PDF في Downloads/COMFORT (Android 10 فما فوق)، أو في مجلد التنزيلات الخاص بالتطبيق في الإصدارات الأقدم.
