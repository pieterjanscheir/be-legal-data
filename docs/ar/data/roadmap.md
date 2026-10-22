# خارطة الطريق {#roadmap}

مجموعات البيانات المخطط لها، مع الـissue الذي يحدد كلًا منها. يسرد كل issue المصادر الرسمية،
والحقول المقترحة، وما يعنيه «الإنجاز». المساعدة مرحَّب بها: اختر واحدة واتبع
[الأعراف](/ar/guide/contributing#adding-a-dataset).

## المخطط له {#planned}

| مجموعة البيانات                                                                                                                                              | لماذا هي مفيدة                                                                                        | الـissue                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **المحاكم الأخرى**: Hof van Cassatie / Cour de cassation، وGrondwettelijk Hof / Cour constitutionnelle، وRaad van State / Conseil d'État، والمحاكم التأديبية | المحاكم العليا ليست على بوابة المحاكم، فهي تحتاج إلى مصادرها الخاصة                                   | [#4](https://github.com/pieterjanscheir/belgica/issues/4)   |
| **الـJustizhaus في Eupen** (المجموعة الناطقة بالألمانية)                                                                                                     | الـjustitiehuis / maison de justice الوحيدة التي لا تتضمنها البيانات بعد                              | [#3](https://github.com/pieterjanscheir/belgica/issues/3)   |
| **التاريخ**: متى تغيرت الكانتونات والبلديات والمحاكم                                                                                                         | للنموذج فترات سريان وبحث حسب اليوم؛ والنسخ الأقدم لا تزال تحتاج إلى البيانات                          | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| **العنوان → الإحداثيات**                                                                                                                                     | تجد [حدود الكانتونات](./canton-boundaries) كانتون نقطة؛ وتحويل العنوان إلى إحداثيات هو الخطوة الناقصة | [#28](https://github.com/pieterjanscheir/belgica/issues/28) |
| **مكاتب المحضرين القضائيين** (gerechtsdeurwaarders / huissiers de justice)                                                                                   | إيجاد محضر في دائرة قضائية للتبليغ أو التنفيذ                                                         | [#6](https://github.com/pieterjanscheir/belgica/issues/6)   |
| **مناطق الشرطة** (politiezones / zones de police)                                                                                                            | أي منطقة تتولى بلدية ما: الشكاوى، ونسخ المحاضر                                                        | [#7](https://github.com/pieterjanscheir/belgica/issues/7)   |
| **مكاتب السجل العقاري والأمن القانوني** (kadaster، والـhypotheekkantoren سابقًا)                                                                             | طلب شهادات الرهن ومستخرجات السجل العقاري من المكتب المختص                                             | [#8](https://github.com/pieterjanscheir/belgica/issues/8)   |

## جدير بالنظر {#worth-considering}

مجموعة في [#9](https://github.com/pieterjanscheir/belgica/issues/9)، مرتبة تقريبًا بحسب كثرة
استخدامها المتوقعة:

- **البلديات الفرعية** (deelgemeenten / sections de commune) لكل رمز بريدي. تتوقف
  [الرموز البريدية](./postal-codes) عند البلدية؛ وقائمة bpost تسمّي المحليات لكن بلا رمز REFNIS
  وبلا ترخيص مفتوح.
- **رسوم المحاكم** (rolrechten / griffierechten) وشرائح **التعويض الإجرائي**
  (rechtsplegingsvergoeding)، مع فترات سريانها وربطها بالمؤشر، على غرار أسعار الفائدة.
- **العطل القضائية والعطل الرسمية** لكل سنة، لحساب المواعيد الإجرائية.
- **النيابات العامة** (parketten، arbeidsauditoraten) لكل دائرة قضائية.
- **الموثقون والغرف التوثيقية**، و**نقابات المحامين** (balies / barreaux).
- **اندماجات البلديات**: رموز REFNIS القديمة ← الجديدة لعامي 2019 و2025، حتى يمكن تحويل البيانات
  الأقدم.
- **المؤشر الصحي** (gezondheidsindex) لربط الإيجارات بالمؤشر.

## لماذا لا توجد بعض مجموعات البيانات هنا بعد {#why-some-datasets-aren-t-here-yet}

لا تكون مجموعة البيانات القانونية مفيدة إلا إذا جاءت كل قيمة من مصدر رسمي، لذا لا يُضاف شيء يدويًا
من الذاكرة. كل مجموعة بيانات يبنيها سكربت من لقطات لمصدرها، ومعظم المصادر يجلبها GitHub Actions كل
أسبوع. اثنان لا يمكن ذلك معهما حاليًا: موقع Belgisch Staatsblad / Moniteur belge (ejustice)، الذي
تأتي منه الكانتونات، وpolice.be، كلاهما يرفض الاتصالات من خوادم GitHub؛ فيُجلبان من جهاز عادي
بدلًا من ذلك ([#24](https://github.com/pieterjanscheir/belgica/issues/24)). ودليل المحضرين القضائيين
يُبنى في المتصفح، فيحتاج إلى متصفح لقراءته، أو إلى بيانات الغرفة الوطنية (Nationale Kamer van
Gerechtsdeurwaarders / Chambre nationale des huissiers de justice)
([#6](https://github.com/pieterjanscheir/belgica/issues/6)).
