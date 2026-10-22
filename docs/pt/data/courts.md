<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const labels = {
    'justice-of-the-peace': 'Justice de paix / vredegerecht',
    'police-court': 'Tribunal de police / politierechtbank',
    'court-of-first-instance': 'Tribunal de première instance / rechtbank van eerste aanleg',
    'enterprise-court': "Tribunal de l'entreprise / ondernemingsrechtbank",
    'labour-court': 'Tribunal du travail / arbeidsrechtbank',
    'court-of-appeal': "Cour d'appel / hof van beroep",
    'labour-court-of-appeal': 'Cour du travail / arbeidshof',
    'court-of-assize': "Cour d'assises / hof van assisen",
}

const areas = {
    'justice-of-the-peace': 'Um cantão; Philippeville tem sede em dois locais',
    'police-court': 'Um arrondissement (Bruxelas dividida por língua, Halle, Vilvoorde)',
    'court-of-first-instance': 'Um arrondissement (Bruxelas dividida por língua)',
    'enterprise-court': "Um arrondissement, ou a área de uma cour d'appel",
    'labour-court': "Um arrondissement, ou a área de uma cour d'appel",
    'court-of-appeal': 'Uma área judicial',
    'labour-court-of-appeal': 'Uma área judicial',
    'court-of-assize': 'Uma província, ou Bruxelas-Capital',
}
</script>

# Tribunais {#courts}

Ficheiro: `data/courts.json`. Cada tribunal do poder judicial que o próprio portal dos tribunais,
[tribunaux-rechtbanken.be](https://www.tribunaux-rechtbanken.be), lista:
{{ stats.courts.total }} registos que se aplicam hoje<span v-if="stats.courts.retired">, e
{{ stats.courts.retired }} versões retiradas que o portal já não lista</span>. Os números desta
página são calculados a partir dos dados quando o site é gerado.

<table>
<thead><tr><th>Tipo</th><th style="text-align:right">Tribunais</th><th style="text-align:right">Divisões ou sedes</th><th>Área</th></tr></thead>
<tbody>
<tr v-for="t in stats.courts.byType" :key="t.type">
<td>{{ labels[t.type] }}</td><td style="text-align:right">{{ t.courts }}</td><td style="text-align:right">{{ t.divisions }}</td><td>{{ areas[t.type] }}</td>
</tr>
</tbody>
</table>

Não estão no portal, e por isso ainda não estão aqui: o Hof van Cassatie / Cour de cassation, o
Grondwettelijk Hof / Cour constitutionnelle e o Raad van State / Conseil d'État, e os tribunais
disciplinares.

## Porque é útil {#why-it-s-useful}

- **Endereçar documentos.** Citações, requerimentos e conclusões designam o tribunal tal como
  ele próprio se designa; as cartas e as peças vão para a secretaria (griffie, greffe) na sua
  morada.
- **Contactar a secretaria certa.** Os tribunais maiores têm uma secretaria por matéria (cível,
  penal, família, o registo das pessoas coletivas…), cada uma com o seu próprio telefone, e-mail
  e por vezes conta bancária. Os dados mantêm-nas separadas, com a etiqueta que o tribunal lhes
  dá.
- **Pagar custas.** As secretarias que publicam uma conta bancária para custas judiciais e
  depósitos têm-na nos dados, com o dígito de controlo verificado.
- **Construir formulários.** Os seletores de tribunais precisam de uma lista completa com ids
  estáveis, ligados a cantões, arrondissements e áreas judiciais, e ao tribunal a que uma divisão
  pertence.
- **Ligar à jurisprudência.** `ecli` dá o código que as decisões do tribunal têm no seu European
  Case Law Identifier (`ECLI:BE:HBGNT:…`).

## Fonte e atualizações {#source-and-updates}

|                |                                                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonte          | [tribunaux-rechtbanken.be](https://www.tribunaux-rechtbanken.be), o portal do College van de hoven en rechtbanken / Collège des cours et tribunaux |
| Construído por | `scripts/parse` a partir de snapshots semanais da página e da página de contactos de cada tribunal                                                 |
| Muda quando    | Um tribunal muda de instalações, de contactos ou de horário, ou o portal acrescenta ou renomeia um tribunal                                        |
| Verificado     | Todas as semanas, pelo [workflow sources](/pt/guide/data-quality#how-the-data-is-built); as alterações chegam como pull request                    |

Cada registo indica as páginas de onde foi lido e o dia em que o conteúdo de cada página foi visto
pela primeira vez (`sources`). Os dados de contacto mudam com mais frequência do que qualquer
outra coisa neste pacote: quando for importante, consulte a página do tribunal (`website`).

<CourtList />

## Campos {#fields}

| Campo              | Tipo                                  | Descrição                                                                                                                                                                                                              |
| ------------------ | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `CourtId`                             | Id estável: o `type`, depois o local na língua do próprio tribunal: `justice-of-the-peace-gent-1`, `police-court-brussel-fr`, `enterprise-court-gent-brugge`. Veja [identificadores](/pt/guide/identifiers)            |
| `validFrom`        | string?                               | Primeiro dia em que o registo se aplica, `YYYY-MM-DD`: o dia em que o portal o listou pela primeira vez. Nenhum: desde o início da cobertura                                                                           |
| `validTo`          | string?                               | Último dia em que o registo se aplica: o dia anterior à verificação semanal que deu pela sua ausência no portal. Nenhum: ainda se aplica                                                                               |
| `type`             | `CourtType`                           | `justice-of-the-peace`, `police-court`, `court-of-first-instance`, `enterprise-court`, `labour-court`, `court-of-appeal`, `labour-court-of-appeal`, `court-of-assize`                                                  |
| `kind`             | `'court'` \| `'division'` \| `'seat'` | O próprio tribunal, uma das suas divisões (afdeling, division, Abteilung), ou um dos locais onde um justice de paix tem sede                                                                                           |
| `court`            | `CourtId`?                            | Para uma divisão ou sede: o tribunal a que pertence                                                                                                                                                                    |
| `name`             | `{ nl?, fr?, de? }`                   | O nome tal como o tribunal o publica, em cada língua em que tem uma página: `Vredegerecht Gent 1`, `Tribunal de l'entreprise du Hainaut - division Mons`                                                               |
| `judicialArea`     | `JudicialAreaId`                      | A área judicial                                                                                                                                                                                                        |
| `arrondissement`   | `ArrondissementId`?                   | O arrondissement, para um tribunal ou divisão cuja área é um arrondissement ou fica dentro de um                                                                                                                       |
| `canton`           | `CantonId`?                           | Para um justice de paix: o cantão que serve                                                                                                                                                                            |
| `cantons`          | `CantonId[]`?                         | Para todos os outros tribunais (não as suas divisões): os cantões que abrange, tal como os fixam o anexo ao Gerechtelijk Wetboek / Code judiciaire (art. 3–5) e o art. 114 do mesmo código                             |
| `ecli`             | `string[]`?                           | Os códigos ECLI do tribunal, um por língua em que julga; só códigos vistos em decisões publicadas                                                                                                                      |
| `address`          | `Address`?                            | Onde fica a secretaria, com o município a que pertence o seu código postal (`municipality`, por código REFNIS). Ausente quando o tribunal não publica uma morada única (um tribunal cujas divisões têm cada uma a sua) |
| `contacts`         | `Contact[]`                           | Telefone, fax, e-mail e conta bancária, cada um com a secretaria a que pertence (`label`) e o texto publicado com ele (`note`)                                                                                         |
| `openingHours`     | string?                               | Horário da secretaria na sintaxe [`opening_hours`](https://wiki.openstreetmap.org/wiki/Key:opening_hours) do OpenStreetMap: `Mo-Fr 08:30-12:30,13:30-16:00`, só quando o texto publicado diz exatamente isso           |
| `openingHoursText` | `{ nl?, fr?, de? }`?                  | O horário tal como publicado, por língua                                                                                                                                                                               |
| `website`          | `{ nl?, fr?, de? }`                   | A página do tribunal no portal, por língua                                                                                                                                                                             |
| `sources`          | `{ url, retrieved }[]`                | As páginas de onde o registo foi lido, e quando o seu conteúdo foi visto pela primeira vez                                                                                                                             |

::: tip Novos tipos de tribunal
`type` pode ganhar valores (o Hof van Cassatie / Cour de cassation, por exemplo). Se fizer um
`switch` sobre ele, mantenha um ramo `default` para que um novo tipo não parta o seu código.
:::

## Forma {#shape}

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
    street: string // tal como publicado, com número, caixa ou andar: 'Beverstraat 7B (eerste verdieping)'
    postalCode: string
    city: string
    municipality?: MunicipalityId // através do código postal; veja a página Códigos postais
}

interface Contact {
    type: 'phone' | 'fax' | 'email' | 'bank-account'
    value: string // canónico: E.164, e-mail em minúsculas, IBAN eletrónico
    label?: string // a secretaria ou serviço: 'Burgerlijke griffie', 'Greffe pénal'
    note?: string // texto publicado com o valor: 'druk 1', 'tapez 2'
}
```

## Funções auxiliares {#helpers}

```ts
getCourt('justice-of-the-peace-gent-1')
getJusticeOfThePeace('gent-1') // o mesmo tribunal, pelo id do cantão
getDivisions('enterprise-court-gent') // as suas oito divisões
getCourtsForCanton('gent-1') // o seu justice de paix, e um tribunal de cada um dos outros tipos
findCompetentCourts('23088', 'police-court') // [police-court-vilvoorde], por código REFNIS
findCourts({ type: 'police-court', kind: 'court', judicialArea: 'gent' })
getContact(court, 'email', 'Greffe pénal') // o valor do primeiro contacto correspondente
formatPhoneNumber('+3253820701') // '053 82 07 01'
formatIban('BE73679200844560') // 'BE73 6792 0084 4560'
```

## Como os dados são lidos {#how-the-data-is-read}

O portal tem uma página por tribunal e por divisão, na língua do tribunal; os tribunais bilingues
de Bruxelas têm uma página em neerlandês e outra em francês, e os tribunais de Eupen uma em
francês e outra em alemão. O parser:

1. lê o tipo e o local do tribunal a partir do seu nome (`Politierechtbank Limburg - afdeling
Genk`), e o cantão de um justice de paix a partir do seu nome e número;
2. junta as versões linguísticas de um mesmo tribunal num único registo: nomes, páginas e
   horários por língua; morada e contactos da primeira língua (neerlandês em Bruxelas, alemão em
   Eupen), com qualquer valor que só a outra página tenha;
3. lê os blocos de contacto das secretarias, mantendo cada valor com a sua secretaria;
4. converte o horário publicado para a sintaxe `opening_hours` apenas quando todas as palavras são
   compreendidas e todas as línguas dizem o mesmo. Um texto com uma nota ou um regime temporário
   ("OPGELET: tot 31 december…") fica só com o texto publicado;
5. dá a cada tribunal os cantões que a lei lhe atribui (`cantons`), a partir de uma tabela do
   anexo ao Gerechtelijk Wetboek / Code judiciaire em `scripts/parse/jurisdictions.ts`, e deriva
   deles o seu `arrondissement`. A tabela e o portal verificam-se mutuamente: um tribunal no
   portal que falte na tabela da lei, ou o inverso, interrompe a build.

Recusa-se a escrever o que quer que seja quando uma página não pode ser situada (um tipo de
tribunal desconhecido, um justice de paix sem cantão), quando um cantão não tem tribunal, ou
quando a tabela da lei e o portal discordam sobre que tribunais existem. O que não consegue ler
(um número de telefone sem indicativo de zona, uma morada escrita como frase) é indicado no pull
request semanal, e fica fora dos dados em vez de ser adivinhado.

## Valores canónicos {#canonical-values}

| Valor              | Armazenado como                                  | Porquê                                                                                                                                                            |
| ------------------ | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Número de telefone | E.164: `+3253820701`                             | Uma forma por número, marcável de qualquer lado, os links `tel:` funcionam tal como estão                                                                         |
| IBAN               | Formato eletrónico: `BE73679200844560`           | A forma que os sistemas de pagamento aceitam; o dígito de controlo é verificado na leitura e nos testes                                                           |
| E-mail             | Minúsculas                                       | As comparações e a deduplicação funcionam                                                                                                                         |
| Horário            | `opening_hours`: `Mo-Fr 08:30-12:30,13:30-16:00` | O standard do OpenStreetMap, com parsers em muitas linguagens (p. ex. [opening_hours.js](https://github.com/opening-hours/opening_hours.js)) e sem língua própria |
| Rua                | Tal como publicada                               | Números, caixas e andares escrevem-se de demasiadas maneiras (`Canadaplein ZN`, `Rue de Bruxelles 2 - 3`) para os separar sem adivinhar                           |
