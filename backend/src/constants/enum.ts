export enum Environment {
  LOCAL = 'LOCAL',
  PROD = 'PRODUCTION',
  STAGING = 'STAGING',
  DEV = 'DEVELOP',
  TEST = 'TEST',
}

export enum Scopes {
  ADMIN = 'ADMIN',
  USER = 'USER',
  EDITOR = 'EDITOR',
  ALL = 'ALL',
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  EDITOR = 'EDITOR',
}

export enum LanguageCode {
  EN = 'EN',
  VI = 'VI',
}

export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum PermissionAction {
  VIEW = 'VIEW',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  EXPORT = 'EXPORT',
}

export enum PartType {
  LISTEN_UNDERSTAND = 'listen_understand',
  READ_UNDERSTAND = 'read_understand',
}

export enum QuestionType {
  CHOOSE_CORRECT_WORD = 'choose_correct_word',
  CHOOSE_CORRECT_ANSWER = 'choose_correct_answer',
  COMPOUND_WORDS = 'compound_words',
  FILL_MISSING_WORD = 'fill_missing_word',
  REMOVE_REDUDANT_WORD = 'remove_redudant_word',
}

export enum QuestionTargetType {
  EXAM = 'exam',
  PRACTICE = 'practice',
}

export enum UserState {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum UploadType {
  IMAGE = 'image',
  AUDIO = 'audio',
}

export enum LessionType {
  THEORY = 'theory',
  PRACTICE = 'practice',
  REVIEW = 'review',
}

export enum TheoryType {
  GRAMMAR = 'grammar',
  VOCABULARY = 'vocabulary',
}

export enum StageStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum TopicStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum TopicLevel {
  EASY = 0,
  MEDIUM = 1,
  HARD = 2,
}

export enum ProgressStatus {
  INPROGRESS = 'inprogress',
  DONE = 'done',
}

export enum SocialPlatform {
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  THREAD = 'thread',
  LINKED_IN = 'linked_in',
}

export enum Nationality {
  Afghanistan = 'Afghanistan',
  Albania = 'Albania',
  Algeria = 'Algeria',
  Andorra = 'Andorra',
  Angola = 'Angola',
  AntiguaAndBarbuda = 'Antigua and Barbuda',
  Argentina = 'Argentina',
  Armenia = 'Armenia',
  Australia = 'Australia',
  Austria = 'Austria',
  Azerbaijan = 'Azerbaijan',
  Bahamas = 'Bahamas',
  Bahrain = 'Bahrain',
  Bangladesh = 'Bangladesh',
  Barbados = 'Barbados',
  Belarus = 'Belarus',
  Belgium = 'Belgium',
  Belize = 'Belize',
  Benin = 'Benin',
  Bhutan = 'Bhutan',
  Bolivia = 'Bolivia',
  BosniaAndHerzegovina = 'Bosnia and Herzegovina',
  Botswana = 'Botswana',
  Brazil = 'Brazil',
  Brunei = 'Brunei',
  Bulgaria = 'Bulgaria',
  BurkinaFaso = 'Burkina Faso',
  Burundi = 'Burundi',
  CaboVerde = 'Cabo Verde',
  Cambodia = 'Cambodia',
  Cameroon = 'Cameroon',
  Canada = 'Canada',
  CentralAfricanRepublic = 'Central African Republic',
  Chad = 'Chad',
  Chile = 'Chile',
  China = 'China',
  Colombia = 'Colombia',
  Comoros = 'Comoros',
  Congo = 'Congo',
  CostaRica = 'Costa Rica',
  Croatia = 'Croatia',
  Cuba = 'Cuba',
  Cyprus = 'Cyprus',
  CzechRepublic = 'Czech Republic',
  DemocraticRepublicOfCongo = 'Democratic Republic of the Congo',
  Denmark = 'Denmark',
  Djibouti = 'Djibouti',
  Dominica = 'Dominica',
  DominicanRepublic = 'Dominican Republic',
  Ecuador = 'Ecuador',
  Egypt = 'Egypt',
  ElSalvador = 'El Salvador',
  EquatorialGuinea = 'Equatorial Guinea',
  Eritrea = 'Eritrea',
  Estonia = 'Estonia',
  Eswatini = 'Eswatini',
  Ethiopia = 'Ethiopia',
  Fiji = 'Fiji',
  Finland = 'Finland',
  France = 'France',
  Gabon = 'Gabon',
  Gambia = 'Gambia',
  Georgia = 'Georgia',
  Germany = 'Germany',
  Ghana = 'Ghana',
  Greece = 'Greece',
  Grenada = 'Grenada',
  Guatemala = 'Guatemala',
  Guinea = 'Guinea',
  GuineaBissau = 'Guinea-Bissau',
  Guyana = 'Guyana',
  Haiti = 'Haiti',
  Honduras = 'Honduras',
  Hungary = 'Hungary',
  Iceland = 'Iceland',
  India = 'India',
  Indonesia = 'Indonesia',
  Iran = 'Iran',
  Iraq = 'Iraq',
  Ireland = 'Ireland',
  Israel = 'Israel',
  Italy = 'Italy',
  Jamaica = 'Jamaica',
  Japan = 'Japan',
  Jordan = 'Jordan',
  Kazakhstan = 'Kazakhstan',
  Kenya = 'Kenya',
  Kiribati = 'Kiribati',
  KoreaNorth = 'North Korea',
  KoreaSouth = 'South Korea',
  Kosovo = 'Kosovo',
  Kuwait = 'Kuwait',
  Kyrgyzstan = 'Kyrgyzstan',
  Laos = 'Laos',
  Latvia = 'Latvia',
  Lebanon = 'Lebanon',
  Lesotho = 'Lesotho',
  Liberia = 'Liberia',
  Libya = 'Libya',
  Liechtenstein = 'Liechtenstein',
  Lithuania = 'Lithuania',
  Luxembourg = 'Luxembourg',
  Madagascar = 'Madagascar',
  Malawi = 'Malawi',
  Malaysia = 'Malaysia',
  Maldives = 'Maldives',
  Mali = 'Mali',
  Malta = 'Malta',
  MarshallIslands = 'Marshall Islands',
  Mauritania = 'Mauritania',
  Mauritius = 'Mauritius',
  Mexico = 'Mexico',
  Micronesia = 'Micronesia',
  Moldova = 'Moldova',
  Monaco = 'Monaco',
  Mongolia = 'Mongolia',
  Montenegro = 'Montenegro',
  Morocco = 'Morocco',
  Mozambique = 'Mozambique',
  Myanmar = 'Myanmar',
  Namibia = 'Namibia',
  Nauru = 'Nauru',
  Nepal = 'Nepal',
  Netherlands = 'Netherlands',
  NewZealand = 'New Zealand',
  Nicaragua = 'Nicaragua',
  Niger = 'Niger',
  Nigeria = 'Nigeria',
  NorthMacedonia = 'North Macedonia',
  Norway = 'Norway',
  Oman = 'Oman',
  Pakistan = 'Pakistan',
  Palau = 'Palau',
  Panama = 'Panama',
  PapuaNewGuinea = 'Papua New Guinea',
  Paraguay = 'Paraguay',
  Peru = 'Peru',
  Philippines = 'Philippines',
  Poland = 'Poland',
  Portugal = 'Portugal',
  Qatar = 'Qatar',
  Romania = 'Romania',
  Russia = 'Russia',
  Rwanda = 'Rwanda',
  SaintKittsAndNevis = 'Saint Kitts and Nevis',
  SaintLucia = 'Saint Lucia',
  SaintVincentAndTheGrenadines = 'Saint Vincent and the Grenadines',
  Samoa = 'Samoa',
  SanMarino = 'San Marino',
  SaoTomeAndPrincipe = 'Sao Tome and Principe',
  SaudiArabia = 'Saudi Arabia',
  Senegal = 'Senegal',
  Serbia = 'Serbia',
  Seychelles = 'Seychelles',
  SierraLeone = 'Sierra Leone',
  Singapore = 'Singapore',
  Slovakia = 'Slovakia',
  Slovenia = 'Slovenia',
  SolomonIslands = 'Solomon Islands',
  Somalia = 'Somalia',
  SouthAfrica = 'South Africa',
  Spain = 'Spain',
  SriLanka = 'Sri Lanka',
  Sudan = 'Sudan',
  Suriname = 'Suriname',
  Sweden = 'Sweden',
  Switzerland = 'Switzerland',
  Syria = 'Syria',
  Taiwan = 'Taiwan',
  Tajikistan = 'Tajikistan',
  Tanzania = 'Tanzania',
  Thailand = 'Thailand',
  Togo = 'Togo',
  Tonga = 'Tonga',
  TrinidadAndTobago = 'Trinidad and Tobago',
  Tunisia = 'Tunisia',
  Turkey = 'Turkey',
  Turkmenistan = 'Turkmenistan',
  Tuvalu = 'Tuvalu',
  Uganda = 'Uganda',
  Ukraine = 'Ukraine',
  UnitedArabEmirates = 'United Arab Emirates',
  UnitedKingdom = 'United Kingdom',
  UnitedStates = 'United States',
  Uruguay = 'Uruguay',
  Uzbekistan = 'Uzbekistan',
  Vanuatu = 'Vanuatu',
  VaticanCity = 'Vatican City',
  Venezuela = 'Venezuela',
  Vietnam = 'Vietnam',
  Yemen = 'Yemen',
  Zambia = 'Zambia',
  Zimbabwe = 'Zimbabwe',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum EnglishProficiencyType {
  IELTS = 'IELTS',
  PTE = 'PTE',
  TOEFLPaper = 'TOEFLPaper',
  DuolingoEnglishTest = 'DuolingoEnglishTest',
  TOEFLiBT = 'TOEFLiBT',
}

export enum IBExamLevel {
  HL = 'HL',
  SL = 'SL',
}

export enum SchedulerStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  SCHEDULED = 'SCHEDULED',
  GOING_ON = 'GOING_ON',
  ENDED = 'ENDED',
}

export enum PricingPlan {
  INDIVIDUAL = 'INDIVIDUAL',
  PACKAGE_STARTER = 'PACKAGE_STARTER',
  PACKAGE_NAVIGATOR = 'PACKAGE_NAVIGATOR',
  PACKAGE_PINNACLE = 'PACKAGE_PINNACLE',
}

export enum Pricing {
  INDIVIDUAL = 35,
  PACKAGE_STARTER = 80,
  PACKAGE_NAVIGATOR = 120,
  PACKAGE_PINNACLE = 150,
}
