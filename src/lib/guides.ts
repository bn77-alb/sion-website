// Guide articles (Ratgeber) for employers. Texts in German and English.
// Legal facts: keep "updated" current and re-check the quota and regulations when they change.
import type { Lang, PageKey } from '../i18n';

export type GuideKey = 'rgAusland' | 'rgFuehrerschein' | 'rgVermittlung';
type Section = { h: string; p?: string[]; list?: string[] };
type Content = {
  title: string; description: string; h1: string; lead: string; card: string;
  sections: Section[];
  faq: { q: string; a: string }[];
};
export type Guide = { key: GuideKey; icon: string; updated: string; related: PageKey[]; de: Content; en: Content };

export const guideKeys: GuideKey[] = ['rgAusland', 'rgFuehrerschein', 'rgVermittlung'];

export const guideUi = {
  de: {
    eyebrow: 'Ratgeber für Arbeitgeber', updated: 'Stand', faqH2: 'Häufige Fragen', moreH2: 'Weitere Ratgeber', relatedH2: 'Passende Leistungen',
    note: 'Dieser Ratgeber gibt einen allgemeinen Überblick und ersetzt keine Rechtsberatung. Verbindlich entscheiden die zuständigen Behörden im Einzelfall.',
    indexTitle: 'Ratgeber: Personal aus dem Ausland einstellen | SION',
    indexDescription: 'Ratgeber für Arbeitgeber: LKW-Fahrer aus dem Ausland einstellen, Führerschein und Code 95, Personalvermittlung oder Zeitarbeit – verständlich erklärt.',
    indexH1: 'Ratgeber für Arbeitgeber',
    indexLead: 'Wie stellen Sie Fahrer und Mitarbeiter aus dem Ausland ein? Welche Wege gibt es, was ist mit Führerschein und Qualifikation, und worin unterscheiden sich Personalvermittlung und Zeitarbeit? Hier finden Sie die wichtigsten Antworten.',
    read: 'Ratgeber lesen',
    months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  },
  en: {
    eyebrow: 'Guides for employers', updated: 'Last updated', faqH2: 'Frequently asked questions', moreH2: 'More guides', relatedH2: 'Related services',
    note: 'This guide gives a general overview and is not legal advice. The competent authorities make the binding decision in each individual case.',
    indexTitle: 'Guides: Hiring Staff from Abroad in Germany | SION',
    indexDescription: 'Guides for employers in Germany: hiring truck drivers from abroad, licence conversion and Code 95, recruitment versus temporary staffing – clearly explained.',
    indexH1: 'Guides for employers',
    indexLead: 'How do you hire drivers and staff from abroad? Which routes exist, what about the driving licence and qualification, and how does recruitment differ from temporary staffing? Here are the most important answers.',
    read: 'Read the guide',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  },
};

export const relatedLabels: Record<Lang, Partial<Record<PageKey, string>>> = {
  de: { lkw: 'Personalvermittlung LKW-Fahrer', westbalkan: 'LKW-Fahrer über die Westbalkanregelung', personalvermittlung: 'Personalvermittlung für Unternehmen', unternehmen: 'Zusammenarbeit und Konditionen', saison: 'Saisonarbeit' },
  en: { lkw: 'Truck driver recruitment', westbalkan: 'Truck drivers under the Western Balkans regulation', personalvermittlung: 'Recruitment for companies', unternehmen: 'Working with us and terms', saison: 'Seasonal work' },
};

export const guides: Record<GuideKey, Guide> = {
  rgAusland: {
    key: 'rgAusland', icon: 'globe', updated: '2026-11-24', related: ['lkw', 'westbalkan', 'unternehmen'],
    de: {
      title: 'LKW-Fahrer aus dem Ausland einstellen: 4 Wege | SION',
      description: 'LKW-Fahrer aus dem Ausland einstellen: vier Wege im Vergleich – EU-Bürger, Fahrer mit Aufenthalt in der EU, Westbalkanregelung und § 24a BeschV.',
      h1: 'LKW-Fahrer aus dem Ausland einstellen: vier Wege im Überblick',
      lead: 'Welcher Weg für Ihr Unternehmen passt, hängt vor allem von zwei Fragen ab: Welche Staatsangehörigkeit hat der Fahrer – und hat er bereits einen EU-Führerschein mit Berufskraftfahrer-Qualifikation?',
      card: 'Vier Wege im Vergleich: EU-Bürger, Fahrer mit Aufenthalt in der EU, Westbalkanregelung und § 24a BeschV.',
      sections: [
        { h: '1. Fahrer mit EU-Staatsangehörigkeit', p: [
          'Bürgerinnen und Bürger der EU genießen Arbeitnehmerfreizügigkeit. Sie brauchen weder ein Visum noch eine Zustimmung der Bundesagentur für Arbeit und können sofort eingestellt werden.',
          'Ein Führerschein aus einem EU- oder EWR-Staat wird in Deutschland anerkannt. Für die Klassen C und CE gilt eine Besonderheit: Nach dem Umzug nach Deutschland gilt die Fahrerlaubnis höchstens bis fünf Jahre nach ihrer Erteilung. Die in einem EU-Staat erworbene Berufskraftfahrer-Qualifikation (Code 95) gilt auch hier.',
        ] },
        { h: '2. Fahrer aus Drittstaaten, die bereits in der EU fahren', p: [
          'Viele Fahrer aus Drittstaaten arbeiten bereits für Speditionen in anderen EU-Ländern. Sie bringen in der Regel einen EU-Führerschein, Code 95 und Erfahrung im europäischen Fernverkehr mit.',
          'Wichtig: Der Aufenthaltstitel eines anderen EU-Staates erlaubt keine Beschäftigung in Deutschland. Der Fahrer braucht einen deutschen Aufenthaltstitel, dem die Bundesagentur für Arbeit zustimmen muss. Weil Fahrerlaubnis und Qualifikation schon vorhanden sind, kommt dafür § 24a Abs. 1 Beschäftigungsverordnung in Betracht.',
          'Ob Fahrerlaubnis und Qualifikation tatsächlich vorliegen, prüfen die Behörden grundsätzlich nicht mehr selbst – das ist Aufgabe des Arbeitgebers. Wir prüfen die Unterlagen deshalb vor der Vorstellung.',
        ] },
        { h: '3. Fahrer aus dem Westbalkan (Westbalkanregelung)', p: [
          'Staatsangehörige aus Albanien, Bosnien und Herzegowina, Kosovo, Montenegro, Nordmazedonien und Serbien können über die Westbalkanregelung (§ 26 Abs. 2 Beschäftigungsverordnung) in Deutschland arbeiten – auch ohne anerkannte Berufsausbildung. Voraussetzung sind ein konkretes Arbeitsplatzangebot und die Zustimmung der Bundesagentur für Arbeit. Zeitarbeit ist ausgeschlossen.',
          'Die Zahl der Zustimmungen ist begrenzt: derzeit bis zu 50.000 pro Jahr. Die Bundesregierung hat im November 2026 beschlossen, das Kontingent ab 2027 auf 25.000 zu halbieren; die Zustimmung des Bundesrats stand zu diesem Zeitpunkt noch aus. Wer über diesen Weg einstellen will, sollte früh planen.',
        ] },
        { h: '4. Fahrer aus Drittstaaten ohne EU-Führerschein oder Grundqualifikation', p: [
          'Fehlen EU-Fahrerlaubnis, Grundqualifikation oder beides, kann die Bundesagentur für Arbeit nach § 24a Abs. 2 Beschäftigungsverordnung trotzdem zustimmen. Der Arbeitsvertrag muss den Fahrer dann verpflichten, an den Maßnahmen teilzunehmen, mit denen er die fehlenden Voraussetzungen in Deutschland erwirbt.',
          'Dieser Weg dauert am längsten und verlangt vom Arbeitgeber die meiste Organisation, weil der Fahrer zunächst nicht als Berufskraftfahrer eingesetzt werden kann.',
        ] },
        { h: 'Was Sie als Arbeitgeber in jedem Fall brauchen', list: [
          'Ein konkretes Arbeitsplatzangebot mit Touren, Fahrzeug, Einsatzort und Starttermin',
          'Arbeitsbedingungen und Lohn, wie sie in Deutschland für vergleichbare Fahrer üblich sind',
          'Einen Arbeitsvertrag direkt mit Ihrem Unternehmen',
          'Vollständige Unterlagen für die Bundesagentur für Arbeit und die Auslandsvertretung',
          'Zeit: bei Fahrern aus Drittstaaten oft mehrere Wochen bis Monate, je nach Behörde und Einzelfall',
        ] },
        { h: 'Welcher Weg ist der schnellste?', p: [
          'Am schnellsten sind Fahrer verfügbar, die bereits in Deutschland leben, sowie EU-Bürger. Danach folgen Fahrer aus Drittstaaten, die schon mit EU-Führerschein und Code 95 in der EU fahren. Die Westbalkanregelung dauert wegen Kontingent und Visumterminen oft mehrere Monate.',
          'SION Consulting sucht passende CE-Fahrer, prüft Unterlagen vorab und begleitet die administrativen Schritte bis zum ersten Arbeitstag.',
        ] },
      ],
      faq: [
        { q: 'Darf ein Fahrer mit polnischem oder litauischem Aufenthaltstitel in Deutschland arbeiten?', a: 'Nicht ohne Weiteres. Der Aufenthaltstitel eines anderen EU-Staates erlaubt keine Beschäftigung in Deutschland. Der Fahrer braucht einen deutschen Aufenthaltstitel, dem die Bundesagentur für Arbeit zustimmt.' },
        { q: 'Können ausländische Fahrer über Zeitarbeit beschäftigt werden?', a: 'Bei der Westbalkanregelung ist Zeitarbeit ausgeschlossen. Auch sonst wird die Zustimmung der Bundesagentur für Arbeit bei Leiharbeit in der Regel versagt. Wir vermitteln ausschließlich in direkte Anstellung.' },
        { q: 'Muss der Fahrer Deutsch sprechen?', a: 'Das hängt vom gewählten Weg und von Ihren Anforderungen ab. Die Prüfung zur Grundqualifikation bei der IHK wird auf Deutsch abgelegt. Wir sagen Ihnen vorab ehrlich, welche Sprachkenntnisse ein Kandidat mitbringt.' },
        { q: 'Was kostet die Vermittlung?', a: 'Sie zahlen eine einmalige Vermittlungsprämie je Fahrer, ohne Anzahlung. Die Rechnung kommt erst nach 30 Arbeitstagen; scheidet der Fahrer vorher aus, zahlen Sie nichts.' },
      ],
    },
    en: {
      title: 'Hiring Truck Drivers from Abroad: 4 Routes | SION',
      description: 'Hiring truck drivers from abroad for Germany: four routes compared – EU citizens, drivers living in the EU, the Western Balkans regulation and Section 24a.',
      h1: 'Hiring truck drivers from abroad: four routes at a glance',
      lead: 'Which route suits your company depends mainly on two questions: what is the driver\'s nationality – and does he already hold an EU licence with the professional driver qualification?',
      card: 'Four routes compared: EU citizens, drivers living in the EU, the Western Balkans regulation and Section 24a.',
      sections: [
        { h: '1. Drivers with EU citizenship', p: [
          'EU citizens enjoy freedom of movement for workers. They need neither a visa nor approval from the Federal Employment Agency and can be hired straight away.',
          'A licence from an EU or EEA country is recognised in Germany. Classes C and CE have a special rule: after the move to Germany the licence is valid for at most five years from the date of issue. The professional driver qualification (Code 95) obtained in an EU country is valid here as well.',
        ] },
        { h: '2. Non-EU drivers who already drive in the EU', p: [
          'Many drivers from non-EU countries already work for hauliers in other EU countries. They usually bring an EU licence, Code 95 and experience in European long-haul transport.',
          'Important: a residence permit from another EU country does not allow employment in Germany. The driver needs a German residence permit, which the Federal Employment Agency must approve. Because the licence and qualification already exist, Section 24a(1) of the German Employment Ordinance can apply.',
          'The authorities generally no longer check themselves whether the licence and qualification are in place – that is the employer\'s responsibility. We therefore check the documents before we introduce a driver.',
        ] },
        { h: '3. Drivers from the Western Balkans', p: [
          'Citizens of Albania, Bosnia and Herzegovina, Kosovo, Montenegro, North Macedonia and Serbia can work in Germany under the Western Balkans regulation (Section 26(2) of the Employment Ordinance) – even without a recognised vocational qualification. A concrete job offer and the approval of the Federal Employment Agency are required. Temporary agency work is excluded.',
          'The number of approvals is capped: currently up to 50,000 per year. In November 2026 the German government decided to halve the quota to 25,000 from 2027; the approval of the Bundesrat was still pending at that time. Employers who want to use this route should plan early.',
        ] },
        { h: '4. Non-EU drivers without an EU licence or initial qualification', p: [
          'If the EU licence, the initial qualification or both are missing, the Federal Employment Agency can still approve under Section 24a(2) of the Employment Ordinance. The employment contract must then oblige the driver to take part in the measures through which he obtains the missing requirements in Germany.',
          'This route takes the longest and demands the most organisation from the employer, because the driver cannot work as a professional driver at first.',
        ] },
        { h: 'What you need as an employer in every case', list: [
          'A concrete job offer with routes, vehicle, location and start date',
          'Working conditions and pay that are customary in Germany for comparable drivers',
          'An employment contract directly with your company',
          'Complete documents for the Federal Employment Agency and the German mission abroad',
          'Time: for non-EU drivers often several weeks to months, depending on the authority and the individual case',
        ] },
        { h: 'Which route is the fastest?', p: [
          'Drivers who already live in Germany and EU citizens are available fastest. Next come non-EU drivers who already drive in the EU with an EU licence and Code 95. The Western Balkans regulation often takes several months because of the quota and visa appointments.',
          'SION Consulting finds suitable CE drivers, checks documents in advance and supports the administrative steps up to the first working day.',
        ] },
      ],
      faq: [
        { q: 'May a driver with a Polish or Lithuanian residence permit work in Germany?', a: 'Not automatically. A residence permit from another EU country does not allow employment in Germany. The driver needs a German residence permit approved by the Federal Employment Agency.' },
        { q: 'Can foreign drivers be employed through a temporary agency?', a: 'Under the Western Balkans regulation, temporary agency work is excluded. In other cases too, the Federal Employment Agency generally refuses approval for agency work. We place into direct employment only.' },
        { q: 'Does the driver have to speak German?', a: 'That depends on the route and on your requirements. The initial qualification exam at the Chamber of Industry and Commerce (IHK) is taken in German. We tell you honestly in advance which language skills a candidate has.' },
        { q: 'What does recruitment cost?', a: 'You pay a one-off placement fee per driver, with no deposit. The invoice only comes after 30 working days; if the driver leaves before then, you pay nothing.' },
      ],
    },
  },

  rgFuehrerschein: {
    key: 'rgFuehrerschein', icon: 'idcard', updated: '2026-11-24', related: ['lkw', 'westbalkan'],
    de: {
      title: 'Führerschein umschreiben & Code 95: Fahrer aus dem Ausland',
      description: 'Ausländischer LKW-Führerschein in Deutschland: Sechs-Monats-Frist, prüfungsfreie Umschreibung nach Anlage 11 FeV, Code 95 und Fahrerqualifizierungsnachweis.',
      h1: 'Führerschein umschreiben und Code 95: Was für ausländische LKW-Fahrer gilt',
      lead: 'Ein Fahrer aus dem Ausland braucht in Deutschland zwei Dinge: eine hier gültige Fahrerlaubnis der Klasse C oder CE und die Berufskraftfahrer-Qualifikation. Dieser Ratgeber erklärt beide Themen für Arbeitgeber.',
      card: 'Sechs-Monats-Frist, prüfungsfreie Umschreibung, Code 95 und Fahrerqualifizierungsnachweis.',
      sections: [
        { h: 'Führerschein aus einem EU- oder EWR-Staat', p: [
          'Ein gültiger Führerschein aus einem EU- oder EWR-Staat muss grundsätzlich nicht umgeschrieben werden. Für die LKW-Klassen C und CE gilt eine Einschränkung: Nach der Wohnsitznahme in Deutschland gilt die Fahrerlaubnis nur bis fünf Jahre nach ihrer Erteilung, auch wenn der Ausstellungsstaat eine längere Gültigkeit eingetragen hat.',
          'Prüfen Sie deshalb bei der Einstellung das Erteilungsdatum der Klassen C und CE und planen Sie die Verlängerung rechtzeitig.',
        ] },
        { h: 'Führerschein aus einem Drittstaat: sechs Monate Frist', p: [
          'Mit einem Führerschein aus einem Staat außerhalb von EU und EWR darf der Fahrer nach Anmeldung seines Wohnsitzes in Deutschland noch sechs Monate fahren. Danach wird die Fahrerlaubnis nicht mehr anerkannt; er braucht einen deutschen Führerschein.',
          'Der Antrag auf Umschreibung sollte deshalb direkt nach der Einreise gestellt werden. Die Bearbeitung bei der Fahrerlaubnisbehörde kann je nach Stadt mehrere Wochen dauern.',
        ] },
        { h: 'Umschreibung ohne Prüfung: Anlage 11 FeV', p: [
          'Für Staaten, die in Anlage 11 der Fahrerlaubnis-Verordnung aufgeführt sind, entfällt die theoretische und praktische Prüfung ganz oder teilweise – allerdings nur für die dort genannten Klassen.',
          'Für den Westbalkan gilt: Führerscheine aus Albanien, Kosovo, Nordmazedonien, Serbien und Montenegro können auch in den Klassen C und CE ohne Prüfung umgeschrieben werden. Für Führerscheine aus Bosnien und Herzegowina gilt das bei den Klassen C und CE nicht.',
          'Stammt der Führerschein aus einem Staat, der nicht in Anlage 11 steht, muss der Fahrer die theoretische und die praktische Prüfung in Deutschland ablegen.',
        ] },
        { h: 'Unterlagen für die Klassen C und CE', list: [
          'Ausländischer Führerschein im Original, meist mit Übersetzung',
          'Bescheinigung über die augenärztliche Untersuchung',
          'Bescheinigung über die ärztliche Untersuchung zur gesundheitlichen Eignung',
          'Biometrisches Passfoto, Ausweisdokument und Meldebestätigung',
          'Je nach Behörde und Herkunftsstaat weitere Nachweise, zum Beispiel ein Erste-Hilfe-Kurs',
        ] },
        { h: 'Code 95: die Berufskraftfahrer-Qualifikation', p: [
          'Wer gewerblich LKW fährt, braucht neben dem Führerschein die Grundqualifikation. Der übliche Weg für erfahrene Fahrer ist die beschleunigte Grundqualifikation: eine Schulung von 140 Stunden bei einer anerkannten Ausbildungsstätte und eine 90-minütige theoretische Prüfung bei der IHK. Die Prüfung wird auf Deutsch abgelegt.',
          'Danach folgt alle fünf Jahre eine Weiterbildung von 35 Stunden. Eine in einem anderen EU-Staat erworbene Qualifikation mit Code 95 wird in Deutschland anerkannt.',
        ] },
        { h: 'Fahrerqualifizierungsnachweis statt Eintrag im Führerschein', p: [
          'Seit Mai 2021 wird die Schlüsselzahl 95 in Deutschland nicht mehr in den Führerschein eingetragen. Stattdessen stellt die Fahrerlaubnisbehörde den Fahrerqualifizierungsnachweis (FQN) aus – eine Karte im Format des Führerscheins, die der Fahrer mitführen muss.',
        ] },
        { h: 'So unterstützen wir', p: [
          'Wir klären vor der Einstellung, welche Schritte im Einzelfall nötig sind, bereiten mit dem Fahrer die Unterlagen vor und begleiten Termine organisatorisch. Die Entscheidung trifft die zuständige Fahrerlaubnisbehörde.',
        ] },
      ],
      faq: [
        { q: 'Wie lange darf ein Fahrer mit ausländischem Führerschein in Deutschland fahren?', a: 'Mit einem Führerschein aus einem Drittstaat sechs Monate ab Wohnsitznahme in Deutschland. Ein EU-Führerschein bleibt gültig; die Klassen C und CE gelten nach dem Umzug jedoch höchstens bis fünf Jahre nach ihrer Erteilung.' },
        { q: 'Kann ein LKW-Führerschein aus Albanien oder dem Kosovo ohne Prüfung umgeschrieben werden?', a: 'Ja. Führerscheine aus Albanien, Kosovo, Nordmazedonien, Serbien und Montenegro können auch in den Klassen C und CE ohne theoretische und praktische Prüfung umgeschrieben werden. Für Bosnien und Herzegowina gilt das bei C und CE nicht.' },
        { q: 'Was ist der Unterschied zwischen Code 95 und dem Fahrerqualifizierungsnachweis?', a: 'Beides weist die Berufskraftfahrer-Qualifikation nach. In Deutschland wird seit Mai 2021 statt des Eintrags der Schlüsselzahl 95 im Führerschein der Fahrerqualifizierungsnachweis als eigene Karte ausgestellt.' },
        { q: 'Wie lange dauert die beschleunigte Grundqualifikation?', a: 'Die Schulung umfasst im Regelfall 140 Stunden, dazu kommt die 90-minütige Prüfung bei der IHK. Mit Vorbereitung und Prüfungstermin sollten Sie mehrere Wochen einplanen.' },
      ],
    },
    en: {
      title: 'Licence Conversion & Code 95 for Foreign Truck Drivers',
      description: 'Foreign truck licences in Germany: the six-month rule, conversion without a test under Annex 11, Code 95 and the driver qualification card explained.',
      h1: 'Licence conversion and Code 95: what applies to foreign truck drivers',
      lead: 'A driver from abroad needs two things in Germany: a class C or CE licence that is valid here, and the professional driver qualification. This guide explains both topics for employers.',
      card: 'The six-month rule, conversion without a test, Code 95 and the driver qualification card.',
      sections: [
        { h: 'Licence from an EU or EEA country', p: [
          'A valid licence from an EU or EEA country generally does not have to be converted. There is one restriction for truck classes C and CE: once the driver lives in Germany, the licence is only valid until five years after it was issued, even if the issuing country entered a longer validity.',
          'So check the date of issue for classes C and CE when hiring, and plan the renewal in good time.',
        ] },
        { h: 'Licence from a non-EU country: six months', p: [
          'With a licence from a country outside the EU and EEA, the driver may drive for six more months after registering his residence in Germany. After that the licence is no longer recognised and he needs a German licence.',
          'The application for conversion should therefore be made right after arrival. Processing at the licensing authority can take several weeks, depending on the city.',
        ] },
        { h: 'Conversion without a test: Annex 11', p: [
          'For countries listed in Annex 11 of the German Driving Licence Regulation, the theory and practical tests are waived in full or in part – but only for the classes named there.',
          'For the Western Balkans: licences from Albania, Kosovo, North Macedonia, Serbia and Montenegro can be converted without a test, including classes C and CE. For licences from Bosnia and Herzegovina this does not apply to classes C and CE.',
          'If the licence comes from a country that is not listed in Annex 11, the driver has to pass the theory and practical tests in Germany.',
        ] },
        { h: 'Documents for classes C and CE', list: [
          'Original foreign licence, usually with a translation',
          'Certificate of the eye examination by an ophthalmologist',
          'Certificate of the medical examination of fitness to drive',
          'Biometric passport photo, identity document and proof of registered address',
          'Depending on the authority and country of origin, further proof such as a first-aid course',
        ] },
        { h: 'Code 95: the professional driver qualification', p: [
          'Anyone driving a truck commercially needs the initial qualification in addition to the licence. The usual route for experienced drivers is the accelerated initial qualification: 140 hours of training at a recognised training centre and a 90-minute theory exam at the Chamber of Industry and Commerce (IHK). The exam is taken in German.',
          'After that, 35 hours of periodic training are due every five years. A qualification with Code 95 obtained in another EU country is recognised in Germany.',
        ] },
        { h: 'Driver qualification card instead of an entry on the licence', p: [
          'Since May 2021, Germany no longer enters code 95 on the driving licence. Instead, the licensing authority issues the driver qualification card (Fahrerqualifizierungsnachweis) – a card in the format of the licence that the driver must carry.',
        ] },
        { h: 'How we help', p: [
          'Before hiring, we clarify which steps are needed in the individual case, prepare the documents with the driver and help organise appointments. The decision is made by the competent licensing authority.',
        ] },
      ],
      faq: [
        { q: 'How long may a driver with a foreign licence drive in Germany?', a: 'With a licence from a non-EU country, six months from taking up residence in Germany. An EU licence stays valid; however, classes C and CE are valid for at most five years from the date of issue once the driver has moved.' },
        { q: 'Can a truck licence from Albania or Kosovo be converted without a test?', a: 'Yes. Licences from Albania, Kosovo, North Macedonia, Serbia and Montenegro can be converted without a theory or practical test, including classes C and CE. For Bosnia and Herzegovina this does not apply to C and CE.' },
        { q: 'What is the difference between Code 95 and the driver qualification card?', a: 'Both prove the professional driver qualification. Since May 2021, Germany issues the driver qualification card as a separate card instead of entering code 95 on the licence.' },
        { q: 'How long does the accelerated initial qualification take?', a: 'The training normally comprises 140 hours, plus the 90-minute exam at the IHK. Including preparation and the exam date you should allow several weeks.' },
      ],
    },
  },

  rgVermittlung: {
    key: 'rgVermittlung', icon: 'handshake', updated: '2026-11-24', related: ['personalvermittlung', 'unternehmen', 'lkw'],
    de: {
      title: 'Personalvermittlung oder Zeitarbeit? Unterschiede | SION',
      description: 'Personalvermittlung oder Zeitarbeit: Unterschiede bei Arbeitsvertrag, Kosten und Bindung – und was für Arbeitskräfte aus dem Ausland gilt.',
      h1: 'Personalvermittlung oder Zeitarbeit: die Unterschiede für Arbeitgeber',
      lead: 'Beide Modelle bringen Personal ins Unternehmen – aber auf sehr unterschiedliche Weise. Entscheidend ist, wer der Arbeitgeber ist, wie abgerechnet wird und wie lange der Mitarbeiter bleiben soll.',
      card: 'Arbeitsvertrag, Kosten und Bindung im Vergleich – und was für Arbeitskräfte aus dem Ausland gilt.',
      sections: [
        { h: 'Personalvermittlung: Der Mitarbeiter wird bei Ihnen angestellt', p: [
          'Bei der Personalvermittlung sucht und prüft der Vermittler passende Kandidaten. Den Arbeitsvertrag schließt der Mitarbeiter direkt mit Ihrem Unternehmen. Sie zahlen ein einmaliges Vermittlungshonorar; danach fallen nur noch Lohn und Lohnnebenkosten an.',
          'Der Mitarbeiter gehört von Anfang an zu Ihrer Belegschaft. Das Modell passt, wenn Sie Stellen dauerhaft besetzen wollen.',
        ] },
        { h: 'Zeitarbeit: Der Mitarbeiter bleibt beim Verleiher angestellt', p: [
          'Bei der Zeitarbeit (Arbeitnehmerüberlassung) bleibt der Mitarbeiter beim Personaldienstleister angestellt und wird Ihrem Betrieb überlassen. Sie zahlen einen Stundenverrechnungssatz, der Lohn, Nebenkosten und die Marge des Verleihers enthält.',
          'Der Verleiher braucht eine Erlaubnis nach dem Arbeitnehmerüberlassungsgesetz. Derselbe Mitarbeiter darf grundsätzlich höchstens 18 Monate an denselben Betrieb überlassen werden, und nach neun Monaten hat er in der Regel Anspruch auf das gleiche Arbeitsentgelt wie vergleichbare Stammbeschäftigte.',
        ] },
        { h: 'Die Unterschiede auf einen Blick', list: [
          'Arbeitgeber: bei Personalvermittlung Ihr Unternehmen, bei Zeitarbeit der Personaldienstleister',
          'Kosten: einmaliges Honorar gegenüber laufendem Stundensatz',
          'Dauer: unbefristet planbar gegenüber zeitlich begrenzter Überlassung',
          'Flexibilität: Zeitarbeit lässt sich kurzfristig beenden, Personalvermittlung ist auf Dauer angelegt',
          'Bindung: Direkt angestellte Mitarbeiter identifizieren sich meist stärker mit dem Betrieb',
        ] },
        { h: 'Wann passt welches Modell?', p: [
          'Zeitarbeit eignet sich für Auftragsspitzen, Vertretungen und Einsätze, deren Ende absehbar ist. Über viele Monate ist sie wegen des laufenden Stundensatzes meist die teurere Lösung.',
          'Personalvermittlung eignet sich, wenn Sie eine Stelle dauerhaft besetzen und den Mitarbeiter im Unternehmen aufbauen wollen – zum Beispiel feste Fahrer für Ihre Touren.',
        ] },
        { h: 'Besonderheit bei Arbeitskräften aus dem Ausland', p: [
          'Für Arbeitskräfte aus Drittstaaten, deren Beschäftigung die Zustimmung der Bundesagentur für Arbeit braucht, ist Zeitarbeit in der Regel ausgeschlossen: Die Zustimmung wird versagt, wenn die Person als Leiharbeitnehmer tätig werden soll. Das gilt auch für die Westbalkanregelung.',
          'Wer Fahrer, Lager- oder Reinigungskräfte aus dem Westbalkan oder anderen Drittstaaten einstellen will, braucht deshalb die direkte Anstellung – also Personalvermittlung.',
        ] },
        { h: 'So rechnet SION Consulting ab', list: [
          'Einmalige Vermittlungsprämie je Mitarbeiter',
          'Keine Anzahlung',
          'Rechnung erst nach 30 Arbeitstagen',
          'Scheidet der Mitarbeiter vorher aus, zahlen Sie nichts',
        ] },
      ],
      faq: [
        { q: 'Was ist günstiger: Personalvermittlung oder Zeitarbeit?', a: 'Für kurze Einsätze oft die Zeitarbeit, für dauerhafte Stellen in der Regel die Personalvermittlung, weil nach dem einmaligen Honorar nur noch der normale Lohn anfällt.' },
        { q: 'Wer ist bei der Personalvermittlung der Arbeitgeber?', a: 'Ihr Unternehmen. Der Mitarbeiter schließt den Arbeitsvertrag direkt mit Ihnen; der Vermittler ist nicht Vertragspartei.' },
        { q: 'Können Arbeitskräfte aus dem Westbalkan über Zeitarbeit kommen?', a: 'Nein. Bei der Westbalkanregelung ist Zeitarbeit ausgeschlossen. Der Mitarbeiter wird direkt beim Arbeitgeber angestellt.' },
        { q: 'Was passiert, wenn der vermittelte Mitarbeiter schnell wieder geht?', a: 'Bei SION Consulting kommt die Rechnung erst nach 30 Arbeitstagen. Scheidet der Mitarbeiter vorher aus, zahlen Sie nichts.' },
      ],
    },
    en: {
      title: 'Recruitment vs Temporary Staffing in Germany | SION',
      description: 'Recruitment or temporary staffing in Germany: the differences in contract, cost and retention – and what applies to workers from abroad.',
      h1: 'Recruitment or temporary staffing: the differences for employers',
      lead: 'Both models bring staff into your company – but in very different ways. What matters is who the employer is, how you are billed and how long the employee is meant to stay.',
      card: 'Contract, cost and retention compared – and what applies to workers from abroad.',
      sections: [
        { h: 'Recruitment: the employee is employed by you', p: [
          'In recruitment, the agency finds and screens suitable candidates. The employee signs the employment contract directly with your company. You pay a one-off placement fee; after that only wages and non-wage labour costs arise.',
          'The employee belongs to your workforce from day one. The model fits when you want to fill positions permanently.',
        ] },
        { h: 'Temporary staffing: the employee stays with the agency', p: [
          'In temporary staffing (Arbeitnehmerüberlassung), the employee remains employed by the staffing agency and is assigned to your business. You pay an hourly rate that includes the wage, on-costs and the agency\'s margin.',
          'The agency needs a licence under the German Temporary Employment Act. The same employee may generally be assigned to the same business for a maximum of 18 months, and after nine months he is usually entitled to the same pay as comparable permanent staff.',
        ] },
        { h: 'The differences at a glance', list: [
          'Employer: your company in recruitment, the staffing agency in temporary staffing',
          'Cost: a one-off fee versus an ongoing hourly rate',
          'Duration: open-ended versus a time-limited assignment',
          'Flexibility: temporary staffing can be ended at short notice, recruitment is designed for the long term',
          'Retention: directly employed staff usually identify more strongly with the business',
        ] },
        { h: 'Which model fits when?', p: [
          'Temporary staffing suits peaks in orders, cover for absences and assignments with a foreseeable end. Over many months it is usually the more expensive solution because of the ongoing hourly rate.',
          'Recruitment suits you when you want to fill a position permanently and develop the employee within the company – for example permanent drivers for your routes.',
        ] },
        { h: 'A special point for workers from abroad', p: [
          'For workers from non-EU countries whose employment needs the approval of the Federal Employment Agency, temporary staffing is generally excluded: approval is refused if the person is to work as an agency worker. This also applies to the Western Balkans regulation.',
          'Anyone who wants to hire drivers, warehouse or cleaning staff from the Western Balkans or other non-EU countries therefore needs direct employment – that is, recruitment.',
        ] },
        { h: 'How SION Consulting bills', list: [
          'One-off placement fee per employee',
          'No deposit',
          'Invoice only after 30 working days',
          'If the employee leaves before then, you pay nothing',
        ] },
      ],
      faq: [
        { q: 'Which is cheaper: recruitment or temporary staffing?', a: 'For short assignments often temporary staffing; for permanent positions usually recruitment, because after the one-off fee only the normal wage arises.' },
        { q: 'Who is the employer in recruitment?', a: 'Your company. The employee signs the employment contract directly with you; the agency is not a party to the contract.' },
        { q: 'Can workers from the Western Balkans come through temporary staffing?', a: 'No. Under the Western Balkans regulation, temporary agency work is excluded. The employee is employed directly by the employer.' },
        { q: 'What happens if the placed employee leaves quickly?', a: 'With SION Consulting the invoice only comes after 30 working days. If the employee leaves before then, you pay nothing.' },
      ],
    },
  },
};
