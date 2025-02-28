import documentsD from 'js/i18n/dictionary/operations/documents';
import validationD from 'js/i18n/dictionary/operations/validation';
const dictionary = {
	operationsTitle: {
		fr: 'Opérations',
		en: 'Operations',
	},
	familiesTitle: {
		fr: 'Familles',
		en: 'Families',
	},
	operationsContributorTitle: {
		fr: 'Gestionnaire',
		en: 'Administrator',
	},
	seriesTitle: {
		fr: 'Séries',
		en: 'Series',
	},
	indicatorsTitle: {
		fr: 'Indicateurs',
		en: 'Indicators',
	},
	operationsSearchTitle: {
		fr: 'Opérations - Recherche',
		en: 'Operations - Search',
	},
	familiesSearchTitle: {
		fr: 'Familles - Recherche',
		en: 'Families - Search',
	},
	documentsSearchTitle: {
		fr: 'Documents/Liens - Recherche',
		en: 'Documents/Links - Search',
	},
	seriesSearchTitle: {
		fr: 'Séries - Recherche',
		en: 'Series - Search',
	},
	indicatorsSearchTitle: {
		fr: 'Indicateurs - Recherche',
		en: 'Indicators - Search',
	},

	childrenSeries: {
		fr: 'Séries filles',
		en: 'Daughter series',
	},
	childrenOperations: {
		fr: 'Opérations filles',
		en: 'Daughter operations',
	},
	parentFamilly: {
		fr: 'Famille parente',
		en: 'Parent family',
	},
	parentSeries: {
		fr: 'Série parente',
		en: 'Parent series',
	},
	title: {
		fr: 'Intitulé',
		en: 'Title',
	},
	theme: {
		fr: 'Thème',
		en: 'Theme',
	},
	summary: {
		fr: 'Résumé',
		en: 'Summary',
	},
	history: {
		fr: 'Historique',
		en: 'History',
	},
	year: {
		fr: 'Millésime',
		en: 'Year',
	},
	dataCollector: {
		fr: 'Services collecteurs',
		en: 'Data collectors',
	},
	stakeholders: {
		fr: 'Partenaires',
		en: 'Stackeholders',
	},
	organisation: {
		fr: 'Organisme responsable',
		en: 'Legal owner',
	},
	indicatorDataCollectFrequency: {
		fr: 'Fréquence de diffusion',
		en: 'Frequency of dissemination',
	},
	dataCollectFrequency: {
		fr: 'Fréquence de collecte des données',
		en: 'Data collection frequency',
	},
	operationType: {
		fr: "Type d'opération",
		en: 'Operation type',
	},
	replaces: {
		fr: 'Succède à',
		en: 'Replaces',
	},
	replacedBy: {
		fr: 'Remplacée par',
		en: 'Replaced by',
	},
	indicators: {
		fr: 'Indicateurs produits',
		en: 'Indicators produced',
	},
	seeAlso: {
		fr: 'Séries ou Indicateurs liés',
		en: 'Related series or indicators',
	},
	generatedBy: {
		fr: 'Produit de',
		en: 'Produced from',
	},
	helpContent: {
		en: 'Content',
		fr: 'Contenu',
	},
	helpSummary: {
		en: 'Summary',
		fr: 'Sommaire',
	},
	helpRange: {
		en: 'Range',
		fr: 'Portée',
	},
	simsValue: {
		en: 'Value',
		fr: 'Valeur',
	},
	helpPresentational: {
		en: 'Presentational attribut',
		fr: 'Attribut présentationnel',
	},
	helpRICH_TEXT: {
		en: 'Rich text + URI',
		fr: 'Texte riche + URI',
	},
	helpTEXT: {
		en: 'Text',
		fr: 'Texte',
	},
	helpDATE: {
		en: 'Date',
		fr: 'Date',
	},
	helpCODE_LIST: {
		en: 'Code list',
		fr: 'Liste de codes',
	},
	helpORGANIZATION: {
		en: 'Organization',
		fr: 'Organisation',
	},
	btnSimsVisu: {
		en: 'Show the SIMS',
		fr: 'Voir le SIMS',
	},
	btnSimsCreate: {
		en: 'Create the SIMS',
		fr: 'Créer le SIMS',
	},
	simsLabel_operation: {
		en: '{{PARENT_LABEL}} SIMS',
		fr: "SIMS de l'opération {{PARENT_LABEL}}",
	},
	simsLabel_series: {
		en: '{{PARENT_LABEL}} SIMS',
		fr: 'SIMS de la série {{PARENT_LABEL}}',
	},
	simsLabel_indicator: {
		en: '{{PARENT_LABEL}} SIMS',
		fr: "SIMS de l'indicateur {{PARENT_LABEL}}",
	},
	...documentsD,
	...validationD,
};

export default dictionary;
