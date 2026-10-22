<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const labels = {
    'justice-of-the-peace': '治安法院（vredegerecht / justice de paix）',
    'police-court': '违警法院（politierechtbank / tribunal de police）',
    'court-of-first-instance': '初审法院（rechtbank van eerste aanleg / tribunal de première instance）',
    'enterprise-court': '企业法院（ondernemingsrechtbank / tribunal de l\'entreprise）',
    'labour-court': '劳动法院（arbeidsrechtbank / tribunal du travail）',
    'court-of-appeal': '上诉法院（hof van beroep / cour d\'appel）',
    'labour-court-of-appeal': '劳动上诉法院（arbeidshof / cour du travail）',
    'court-of-assize': '重罪法院（hof van assisen / cour d\'assises）',
}

const areas = {
    'justice-of-the-peace': '一个 canton；Philippeville 在两处开庭',
    'police-court': '一个 arrondissement（布鲁塞尔按语言划分，另有 Halle、Vilvoorde）',
    'court-of-first-instance': '一个 arrondissement（布鲁塞尔按语言划分）',
    'enterprise-court': '一个 arrondissement，或一个上诉法院的辖区',
    'labour-court': '一个 arrondissement，或一个上诉法院的辖区',
    'court-of-appeal': '一个司法辖区',
    'labour-court-of-appeal': '一个司法辖区',
    'court-of-assize': '一个省，或布鲁塞尔首都',
}
</script>

# 法院 {#courts}

文件：`data/courts.json`。法院自己的门户网站 [tribunaux-rechtbanken.be](https://www.tribunaux-rechtbanken.be)
所列出的全部司法机构法院：今天适用的记录共 {{ stats.courts.total }} 条<span v-if="stats.courts.retired">，
另有 {{ stats.courts.retired }} 个门户网站已不再列出的已退役版本</span>。本页中的数字在构建站点时由数据计算得出。

<table>
<thead><tr><th>类型</th><th style="text-align:right">法院</th><th style="text-align:right">分部或开庭地点</th><th>辖区</th></tr></thead>
<tbody>
<tr v-for="t in stats.courts.byType" :key="t.type">
<td>{{ labels[t.type] }}</td><td style="text-align:right">{{ t.courts }}</td><td style="text-align:right">{{ t.divisions }}</td><td>{{ areas[t.type] }}</td>
</tr>
</tbody>
</table>

不在门户网站上、因此暂未收录的有：Hof van Cassatie / Cour de cassation（最高法院）、Grondwettelijk Hof /
Cour constitutionnelle（宪法法院）、Raad van State / Conseil d'État（国务委员会），以及各纪律法庭。

一个 canton 是比利时最小的司法辖区单位，每个设一个治安法院；司法 arrondissement 是由初审法院管辖的司法辖区。
两者均保留原文名称。

## 用途 {#why-it-s-useful}

- **文书抬头。** 传票、诉状和结论书中的法院名称应与法院自称的一致；信件和提交的材料寄往其地址处的
  书记处（griffie / greffe）。
- **联系正确的书记处。** 较大的法院按事务设有不同的书记处（民事、刑事、家事、法人登记册……），
  各有自己的电话、电子邮件，有时还有银行账户。数据把它们分开保存，并按法院自己的方式标注。
- **缴纳费用。** 凡公布了用于诉讼费和保证金的银行账户的书记处，数据中都包含该账户，且已通过校验和验证。
- **构建表单。** 法院选择器需要一份完整的列表，带稳定的 id，并关联到 canton、arrondissement 和司法辖区，
  以及分部所属的法院。
- **关联判例。** `ecli` 给出该法院判决在欧洲判例标识符（European Case Law Identifier，`ECLI:BE:HBGNT:…`）
  中使用的代码。

## 来源与更新 {#source-and-updates}

|          |                                                                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 来源     | [tribunaux-rechtbanken.be](https://www.tribunaux-rechtbanken.be)，College van de hoven en rechtbanken / Collège des cours et tribunaux 的门户网站 |
| 生成方式 | 由 `scripts/parse` 根据每个法院页面及其联系页面的每周快照生成                                                                                     |
| 何时变化 | 法院搬迁、更改联系方式或办公时间，或门户网站新增或更名某个法院时                                                                                  |
| 检查     | 每周一次，由 [sources workflow](/zh/guide/data-quality#how-the-data-is-built) 执行；变更以 pull request 的形式提交                                |

每条记录都列出了读取它的页面，以及每个页面内容首次被看到的日期（`sources`）。联系方式是本包中变化最频繁的数据：
在重要场合，请核对法院的页面（`website`）。

<CourtList />

## 字段 {#fields}

| 字段               | 类型                                  | 说明                                                                                                                                                                                |
| ------------------ | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `CourtId`                             | 稳定的 id：先是 `type`，再是法院自身语言中的地名：`justice-of-the-peace-gent-1`、`police-court-brussel-fr`、`enterprise-court-gent-brugge`。参见[标识符](/zh/guide/identifiers)     |
| `validFrom`        | string?                               | 记录开始适用的第一天，`YYYY-MM-DD`：门户网站首次列出它的那一天。缺省：自数据覆盖开始起                                                                                              |
| `validTo`          | string?                               | 记录适用的最后一天：每周检查发现它从门户网站消失的前一天。缺省：至今仍适用                                                                                                          |
| `type`             | `CourtType`                           | `justice-of-the-peace`、`police-court`、`court-of-first-instance`、`enterprise-court`、`labour-court`、`court-of-appeal`、`labour-court-of-appeal`、`court-of-assize`               |
| `kind`             | `'court'` \| `'division'` \| `'seat'` | 法院本身、其某个分部（afdeling、division、Abteilung），或治安法院的某个开庭地点                                                                                                     |
| `court`            | `CourtId`?                            | 对于分部或开庭地点：它所属的法院                                                                                                                                                    |
| `name`             | `{ nl?, fr?, de? }`                   | 法院公布的名称，按其有页面的每种语言提供：`Vredegerecht Gent 1`、`Tribunal de l'entreprise du Hainaut - division Mons`                                                              |
| `judicialArea`     | `JudicialAreaId`                      | 司法辖区                                                                                                                                                                            |
| `arrondissement`   | `ArrondissementId`?                   | arrondissement，适用于辖区恰为一个 arrondissement 或位于一个 arrondissement 之内的法院或分部                                                                                        |
| `canton`           | `CantonId`?                           | 对于治安法院：它所服务的 canton                                                                                                                                                     |
| `cantons`          | `CantonId[]`?                         | 对于其他所有法院（不含其分部）：它所覆盖的 canton，依据 Gerechtelijk Wetboek / Code judiciaire（司法法典）附件（第 3–5 条）及该法典第 114 条确定                                    |
| `ecli`             | `string[]`?                           | 法院的 ECLI 代码，每种审判语言一个；仅包括在已公布判决中出现过的代码                                                                                                                |
| `address`          | `Address`?                            | 书记处所在地，附带其邮政编码所属的市镇（`municipality`，以 REFNIS 代码表示）。法院未公布单一地址时缺省（例如各分部各有地址的法院）                                                  |
| `contacts`         | `Contact[]`                           | 电话、传真、电子邮件和银行账户，每项都带有所属书记处（`label`）和随之公布的文字（`note`）                                                                                           |
| `openingHours`     | string?                               | 书记处办公时间，采用 OpenStreetMap [`opening_hours`](https://wiki.openstreetmap.org/wiki/Key:opening_hours) 语法：`Mo-Fr 08:30-12:30,13:30-16:00`，仅当公布的文字恰好表达此意时提供 |
| `openingHoursText` | `{ nl?, fr?, de? }`?                  | 按语言提供的、原样公布的办公时间                                                                                                                                                    |
| `website`          | `{ nl?, fr?, de? }`                   | 法院在门户网站上的页面，按语言提供                                                                                                                                                  |
| `sources`          | `{ url, retrieved }[]`                | 读取该记录的页面，以及其内容首次被看到的时间                                                                                                                                        |

::: tip 新的法院类型
`type` 可能会增加新值（例如 Hof van Cassatie / Cour de cassation）。如果你对它使用 `switch`，请保留一个
`default` 分支，以免新类型导致代码出错。
:::

## 结构 {#shape}

```ts
interface Court {
    id: CourtId
    validFrom?: string
    validTo?: string
    type: CourtType
    kind: 'court' | 'division' | 'seat'
    court?: CourtId
    name: Partial<Translated>
    judicialArea: JudicialAreaId
    arrondissement?: ArrondissementId
    canton?: CantonId
    cantons?: CantonId[]
    ecli?: string[]
    address?: Address
    contacts: Contact[]
    openingHours?: string
    openingHoursText?: Partial<Translated>
    website: Partial<Record<Locale, string>>
    sources: SourceRef[]
}

interface Address {
    building?: string
    street: string // 原样公布，含门牌号、信箱号或楼层：'Beverstraat 7B (eerste verdieping)'
    postalCode: string
    city: string
    municipality?: MunicipalityId // 通过邮政编码确定；参见邮政编码页面
}

interface Contact {
    type: 'phone' | 'fax' | 'email' | 'bank-account'
    value: string // 规范形式：E.164、小写电子邮件、电子格式 IBAN
    label?: string // 书记处或服务部门：'Burgerlijke griffie'、'Greffe pénal'
    note?: string // 随该值公布的文字：'druk 1'、'tapez 2'
}
```

## 辅助函数 {#helpers}

```ts
getCourt('justice-of-the-peace-gent-1')
getJusticeOfThePeace('gent-1') // 同一个法院，通过 canton id 获取
getDivisions('enterprise-court-gent') // 它的八个分部
getCourtsForCanton('gent-1') // 它的治安法院，以及其他每种类型各一个法院
findCompetentCourts('23088', 'police-court') // [police-court-vilvoorde]，按 REFNIS 代码
findCourts({ type: 'police-court', kind: 'court', judicialArea: 'gent' })
getContact(court, 'email', 'Greffe pénal') // 第一个匹配联系方式的值
formatPhoneNumber('+3253820701') // '053 82 07 01'
formatIban('BE73679200844560') // 'BE73 6792 0084 4560'
```

## 数据如何读取 {#how-the-data-is-read}

门户网站为每个法院和每个分部各设一个页面，使用该法院的语言；布鲁塞尔的双语法院有一个荷兰语页面和一个法语页面，
Eupen 的法院则有一个法语页面和一个德语页面。解析器会：

1. 从法院名称（`Politierechtbank Limburg - afdeling Genk`）中读出其类型和地点，并从治安法院的名称和编号中
   读出其 canton；
2. 把同一法院的各语言版本合并为一条记录：名称、页面和办公时间按语言分别保存；地址和联系方式取自第一种语言
   （布鲁塞尔为荷兰语，Eupen 为德语），再补上只有另一语言页面才有的值；
3. 读取各书记处的联系信息块，让每个值都与其书记处对应；
4. 仅当每个词都能理解、且各语言表述一致时，才把公布的办公时间转换为 `opening_hours` 语法。带有备注或临时安排的文字
   （"OPGELET: tot 31 december…"）只保留原文；
5. 根据 `scripts/parse/jurisdictions.ts` 中 Gerechtelijk Wetboek / Code judiciaire 附件的对照表，为每个法院赋予法律
   分配给它的 canton（`cantons`），并由此推导出其 `arrondissement`。该对照表与门户网站相互校验：门户网站上有而法律对照表
   中没有的法院，或者反过来，都会使构建中止。

当某个页面无法归类（未知类型的法院、没有 canton 的治安法院）、某个 canton 没有法院，或法律对照表与门户网站对存在哪些法院
意见不一时，解析器拒绝写入任何内容。它无法读取的内容（没有区号的电话号码、写成一句话的地址）会在每周的 pull request 中
报告，并从数据中略去，而不是去猜测。

## 规范值 {#canonical-values}

| 值       | 存储形式                                         | 原因                                                                                                                                           |
| -------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 电话号码 | E.164：`+3253820701`                             | 每个号码只有一种形式，可从任何地方拨打，`tel:` 链接可直接使用                                                                                  |
| IBAN     | 电子格式：`BE73679200844560`                     | 支付系统接受的形式；读取时及测试中都会验证校验和                                                                                               |
| 电子邮件 | 小写                                             | 便于比较和去重                                                                                                                                 |
| 办公时间 | `opening_hours`：`Mo-Fr 08:30-12:30,13:30-16:00` | OpenStreetMap 标准，多种编程语言都有解析器（例如 [opening_hours.js](https://github.com/opening-hours/opening_hours.js)），且不依赖任何自然语言 |
| 街道     | 原样公布                                         | 门牌号、信箱号和楼层的写法太多（`Canadaplein ZN`、`Rue de Bruxelles 2 - 3`），无法不靠猜测就拆分                                               |
