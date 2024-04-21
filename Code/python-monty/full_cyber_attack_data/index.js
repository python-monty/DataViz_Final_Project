import data from './data.csv';

const industryCodes = [
  11, 21, 22, 23, 33, 42, 44, 48, 51, 52, 53, 54, 55, 56,
  61, 62, 71, 72, 81, 92,
];

// // INDUSTRY LOOKUP TABLE
// const industryLookup = {
//   11: 'Agriculture',
//   21: 'Natural Resoure Extraction',
//   22: 'Utilities',
//   23: 'Construction',
//   33: 'Manufacturing',
//   42: 'Wholesale Trade',
//   44: 'Retail Trade',
//   48: 'Trans & Warehouse',
//   51: 'Information',
//   52: 'Finance & Insurance',
//   53: 'Real Estate',
//   54: 'Pro, Sci, Tech Services',
//   55: 'Enterprise Management',
//   56: 'Waste Management',
//   61: 'Education',
//   62: 'Heath Care',
//   71: 'Arts, Entertain, Recreation',
//   72: 'Food Services',
//   81: 'Other Services',
//   92: 'Public Administration',
// };

// INDUSTRY LOOKUP TABLE
const industryLookup = {
  11: 'Agriculture, Forestry, Fishing and Hunting',
  21: 'Mining, Quarrying, and Oil and Gas Extraction',
  22: 'Utilities',
  23: 'Construction',
  33: 'Manufacturing',
  42: 'Wholesale Trade',
  44: 'Retail Trade',
  48: 'Transportation and Warehousing',
  51: 'Information',
  52: 'Finance and Insurance',
  53: 'Real Estate and Rental and Leasing',
  54: 'Professional, Scientific, and Technical Services',
  55: 'Management of Companies and Enterprises',
  56: 'Administrative and Support and Waste Management and Remediation Services',
  61: 'Educational Services',
  62: 'Health Care and Social Assistance',
  71: 'Arts, Entertainment, and Recreation',
  72: 'Accommodation and Food Services',
  81: 'Other Services (except Public Administration)',
  92: 'Public Administration',
};

// FUNCTION TO EXTRACT THE INDUSTRY NAMES FROM DATA
function getIndustryName(code) {
  // console.log('Inside the getindustry name');
  if (industryLookup.hasOwnProperty(code)) {
    item = industryLookup[code];
    return item;
  }
}

var yearlyData = [];

let tempData = [];

let newData = [];

for (let i = 0; i < data.length; i++) {
  if (data[i].actor_type !== 'Undetermined') {
    // if (data[i].actor_type !== 'Undetermined' || data[i].event_type !== 'Undetermined') {
    tempData.push(data[i]);
  }
}

for (let i = 0; i < tempData.length; i++) {
  if (tempData[i].event_type !== 'Undetermined') {
    // if (data[i].actor_type !== 'Undetermined' || data[i].event_type !== 'Undetermined') {
    newData.push(tempData[i]);
  }
}

// newData.filter((d) => !(d.actor_type === 'Undetermined'));

for (let index = 0; index < industryCodes.length; index++) {
  var currentIndustryData = [];

  // CREATE A LOOP TO ITERATE THROUGH A YEAR RANGE
  for (let year = 2014; year <= 2023; year++) {
    // SET A COUNTER TO HOLD NUMBER OF EVENTS PER YEAR
    var yearlyCount = 0;

    // GET ALL THE CYBER EVENTS FOR THIS INDUSTRY, FOR THIS YEAR. ADD EACH EVENT TO THE ARRAY
    currentIndustryData = newData.filter((d) => {
      return (
        d.evtDate.includes(year) &&
        d.industry_code.includes(industryCodes[index])
      );
    });

    // COUNT THE NUMBER OF CYBER EVENTS IN THE ARRAY
    yearlyCount = currentIndustryData.length;

    // FIND THE INDUSTRY NAME FOR THIS INDUSTRY CODE
    var item = getIndustryName(industryCodes[index]);

    // ADD THE INFORMATION TO THE YEARLYDATA ARRAY
    yearlyData.push({
      industryCode: industryCodes[index],
      year: year,
      count: yearlyCount,
      industryName: item,
    });

    // console.log("Number of events for year {"+year+"} is "+yearlyCount);
    // console.log(currentIndustryData);
    // console.log(yearlyData);
  }
}

console.log(yearlyData);

for (const d of newData) {
  // console.log(d.actor_type);
  // console.log(d.event_type);
  // console.log(d.actor_type);
  d.industry_code = +d.industry_code;
  d.year = +d.evtDate.slice(0, 4);
  d.num_attacks = +d.num_attacks;
}

for (const d of yearlyData) {
  const UTCyear = +d.year;
  d.UTCyear = new Date(Date.UTC(UTCyear));
  // const UTCyear = +d.year;
  // d.UTCyear = new Date(Date.UTC(d.year));
}

export const main = (container) => {
  const fontSize = 17;

  const json = JSON.stringify(newData.slice(0, 1), null, 2);
  const jsonYrly = JSON.stringify(
    yearlyData.slice(0, 1),
    null,
    2,
  );

  container.innerHTML = `  
    <pre style="font-size: ${fontSize}px;">${json}</pre>
    <pre style="font-size: ${fontSize}px;">${jsonYrly}</pre>
    
  `;
};

export { newData, yearlyData };
