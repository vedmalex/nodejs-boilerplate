let config =  {
  HEADER_REPLACER: './textLab.headingsReplacer.js',
  COLLECTION_TTL: '24h',
  SITE_NAME: 'globes',
  TIMEOUT: 600,
  API: {
    TIMEOUT_REPORT_URL: '//46.101.166.248/timeout_report.php',
    NEW_USER_URL: '//46.101.166.248/timeout_report.php',
    IMPRESSION_REPORT: '//northern-shield-89107.appspot.com/incremettitlesimpressions',
    GET_JSON_POST: 'http://localhost:3000/getjson',
    // GET_JSON_POST: 'https://northern-shield-89107.appspot.com/getjson',
    TITLE_CLICK_INC: '//northern-shield-89107.appspot.com/incremettitlesclicks',
    TITLE_CLICK_REPORT: '//46.101.166.248/title_click_report.php',
    UPDATE_SEEN_TITLES: '//northern-shield-89107.appspot.com/updateseentitles'
  },
  COOKIE_NAME: 'RvTbYn',
  // regexp more powerfull than indexof
  HOME_PATERN: /^\/$/,
  ARTICLE_PATTERN: /news\/article/,
  VALID_REFERRER: /localhost\:3000/,
  ARTICLE_ID_PATTERN: /did=(\d{10})/,

  TITLES: [{
    regions: ['#ArticlesBlock','#MoreBox','#artPromosList'],
    selector: 'a',
    filters: [
      (item) => ~item.href.indexOf('fromelement=hp_morearticles') && ~item.href.indexOf('did=') && item.text && item.text.trim(),
    ]
  },{
    regions: ['#FoldersList'],
    selector: 'a',
    filters: [
      (item) => ~item.href.indexOf('fromelement=hp_folders') && ~item.href.indexOf('did=') && item.text && item.text.trim(),
    ]
  },{
    regions: ['#HomePagePromos'],
    selector: 'a',
    filters: [
      (item) => ~item.href.indexOf('fromelement=hp_daily_news') && ~item.href.indexOf('did=') && item.text && item.text.trim()
    ],
  },{
    regions: ['#DeotBox','#Idea_tab1_data','#Idea_tab2_data','#Idea_tab3_data'],
    selector: 'a',
    filters: [
      (item) => ~item.href.indexOf('fromelement=hp_deot') && ~item.href.indexOf('did=') && item.text && item.text.trim()
    ],
  },
  ],
};

function processConfig(config) {
  let hash = config.titlesHash = config.titlesHash || {};

  for (let index = 0, titles = config.TITLES, tLen = titles.length; index < tLen; index++) {
    for (let i = 0, list = titles[index].regions, len = list.length; i < len; i++) {
      hash[list[i]] = index;
    }
  }
  return config;
}

config.shown = {};

config.getTitles = function(...selectors) {
  if (selectors[0] !== '*') {
    let result = [];
    let done = {};
    for (let i = 0, len = selectors.length; i < len ; i++) {
      let index = this.titlesHash[selectors[i]];
      if (~index && !done[index]) {
        result.push(this.TITLES[index]);
        done[index] = true;
      }
    }
    return result;
  } else {
    return this.TITLES.slice();
  }
};

processConfig(config);

export default config;
