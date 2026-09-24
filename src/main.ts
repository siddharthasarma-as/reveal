import './styles.css';

type Problem = {
  id: string;
  title: string;
  issuer: string;
  sector: string;
  type: 'industry' | 'department';
};

const problems: Problem[] = [
  { id: 'IND-01', title: 'Improving Medicine Demand Forecasting and Inventory Availability Across Northeast India', issuer: 'GR Dhanuka Group', sector: 'Pharmaceuticals', type: 'industry' },
  { id: 'IND-02', title: 'Low-Temperature Flow Assurance for High-Wax North-East Crude - Next-Generation Pour Point Depressants and Energy-Efficient Demulsifiers', issuer: 'MC² Foundation', sector: 'Oil & Gas', type: 'industry' },
  { id: 'IND-03', title: 'Real-Time Pipeline Integrity Intelligence for Waxy-Crude Networks - Continuous Wax Deposition Monitoring with Early Bio-Corrosion Detection', issuer: 'MC² Foundation', sector: 'Oil & Gas', type: 'industry' },
  { id: 'IND-04', title: 'Modular Monetisation of Stranded and Marginal Gas in the North-East - Small-Scale Liquefaction and Micro-Conversion for Fields Without Pipeline Connectivity', issuer: 'MC² Foundation', sector: 'Oil & Gas', type: 'industry' },
  { id: 'IND-05', title: 'Securing the North-East Bioenergy Feedstock Chain - Biomass Preservation Through the Monsoon and Valorisation of Bio-Refinery Waste Streams', issuer: 'MC² Foundation', sector: 'Bioenergy', type: 'industry' },
  { id: 'IND-06', title: "Creating Real-Time Intelligence Across Assam's Waste Value Chain", issuer: 'PRIDE Cooperative', sector: 'Waste Management', type: 'industry' },
  { id: 'IND-07', title: 'Low-Cost AI-Enabled Selective Plucking Solution', issuer: 'Tea Research Association (TRA), Tocklai', sector: 'Tea Plantation', type: 'industry' },
  { id: 'IND-08', title: 'Smart Monitoring of Manual / Operator-Carried Spraying', issuer: 'Tea Research Association (TRA), Tocklai', sector: 'Tea Plantation', type: 'industry' },
  { id: 'IND-09', title: 'AI-Driven Drone-Based Pest Detection & Targeted Spot-Spraying', issuer: 'Tea Research Association (TRA), Tocklai', sector: 'Tea Plantation', type: 'industry' },
  { id: 'IND-10', title: 'End-to-End Digital Traceability of Tea Across the Assam Tea Value Chain', issuer: 'Tea Research Association (TRA), Tocklai', sector: 'Tea Plantation', type: 'industry' },

  { id: 'DPS-1', title: 'Irrigation Water Demand Forecasting & Smarter Scheduling', issuer: 'Irrigation Department', sector: 'Agriculture & Irrigation', type: 'department' },
  { id: 'DPS-2', title: 'Irrigation Canals Condition Monitoring & Predictive Maintenance', issuer: 'Irrigation Department', sector: 'Agriculture & Irrigation', type: 'department' },
  { id: 'DPS-3', title: 'Smart Pumping & Energy Optimisation for Lift Irrigation Schemes', issuer: 'Irrigation Department', sector: 'Agriculture & Irrigation', type: 'department' },
  { id: 'DPS-4', title: 'GIS-Based Monitoring of Irrigation Potential, Command Areas & Water Use', issuer: 'Irrigation Department', sector: 'Agriculture & Irrigation', type: 'department' },
  { id: 'DPS-5', title: 'Road Surface Defect Detection & Maintenance Prioritisation', issuer: 'Public Works Department', sector: 'Urban Infrastructure', type: 'department' },
  { id: 'DPS-6', title: 'Integrated Road & Bridge Alignment Planning Support', issuer: 'Public Works Department', sector: 'Urban Infrastructure', type: 'department' },
  { id: 'DPS-7', title: 'Soil Erosion Risk Mapping & Monitoring', issuer: 'Soil Conservation Department', sector: 'Public Administration', type: 'department' },
  { id: 'DPS-8', title: 'Recovery of Value from Multi-Layer Plastic Waste', issuer: 'Housing & Urban Affairs Department', sector: 'Urban Infrastructure', type: 'department' },
  { id: 'DPS-9', title: 'Automated Detection and Clearing of Blocked Culverts for Urban Drainage', issuer: 'Housing & Urban Affairs Department', sector: 'Urban Infrastructure', type: 'department' },
  { id: 'DPS-10', title: 'Real-Time Monitoring of Decentralised Planning Schemes', issuer: 'Transformation & Development Department', sector: 'Public Administration', type: 'department' },
  { id: 'DPS-11', title: 'Crop Health Monitoring, Pest & Disease Forecasting and Location-Specific Advisory', issuer: 'Science & Technology Department', sector: 'Agriculture & Irrigation', type: 'department' },
  { id: 'DPS-12', title: 'Crop Yield & Production Estimation Using Satellite/UAV and Field Data', issuer: 'Science & Technology Department', sector: 'Agriculture & Irrigation', type: 'department' },
  { id: 'DPS-13', title: 'Geospatial Identification of Cultivable & Fertile Agricultural Potential Lands', issuer: 'Science & Technology Department', sector: 'Agriculture & Irrigation', type: 'department' },
  { id: 'DPS-14', title: 'Wetland Mapping & Seasonal Monitoring for Irrigation and Fisheries', issuer: 'Science & Technology Department', sector: 'Fishing & Aquaculture', type: 'department' },
  { id: 'DPS-15', title: 'Forest & Tree Plantation Monitoring for Growth, Biomass and Carbon Assessment', issuer: 'Science & Technology Department', sector: 'Forestry', type: 'department' },
  { id: 'DPS-16', title: 'Integrated Urban Geospatial Intelligence for Waste, Drainage, Transport and Encroachment Management', issuer: 'Science & Technology Department', sector: 'Urban Infrastructure', type: 'department' },
  { id: 'DPS-17', title: 'Integrated Government Land & Wetland Encroachment Monitoring', issuer: 'Science & Technology Department', sector: 'Public Administration', type: 'department' },
  { id: 'DPS-18', title: 'Digital Twin for Flood Management, Simulation and Early Warning Using Space Technology', issuer: 'Science & Technology Department', sector: 'Public Administration', type: 'department' },
  { id: 'DPS-19', title: 'AI-Enabled Integrated Border Surveillance and Illegal Intrusion Detection Using Satellite, UAV and Ground-Based Sensors', issuer: 'Science & Technology Department', sector: 'Public Administration', type: 'department' },
  { id: 'DPS-20', title: 'Satellite and Mobile Broadband Solutions for Remote Education and Healthcare Connectivity', issuer: 'Science & Technology Department', sector: 'Telecommunications', type: 'department' },
  { id: 'DPS-21', title: 'AI-Based Automated Land Use / Land Cover Change Detection and Monitoring System', issuer: 'Science & Technology Department', sector: 'Public Administration', type: 'department' },
  { id: 'DPS-22', title: 'AI-Based Smart Transport Monitoring and Traffic Decision-Support for Urban Areas', issuer: 'Science & Technology Department', sector: 'Public Administration', type: 'department' },
  { id: 'DPS-23', title: 'Early Detection of Pregnancy-Induced Hypertension', issuer: 'Health & Family Welfare Department', sector: 'Human Health', type: 'department' },
  { id: 'DPS-24', title: 'Expanding Access to Obstetric Ultrasound Screening', issuer: 'Health & Family Welfare Department', sector: 'Human Health', type: 'department' },
  { id: 'DPS-25', title: 'Monitoring Infection Prevention & Control Compliance in Labour Rooms and Maternity OTs', issuer: 'Health & Family Welfare Department', sector: 'Human Health', type: 'department' },
  { id: 'DPS-26', title: 'Timely Identification, Referral & Follow-up of Sick Newborns', issuer: 'Health & Family Welfare Department', sector: 'Human Health', type: 'department' },
  { id: 'DPS-27', title: 'Earlier Identification of Congenital Deformities for Timely Care', issuer: 'Health & Family Welfare Department', sector: 'Human Health', type: 'department' },
  { id: 'DPS-28', title: 'Cross-Programme NCD Analytics for Better Planning and Case Identification', issuer: 'Health & Family Welfare Department', sector: 'Human Health', type: 'department' },
  { id: 'DPS-29', title: 'Earlier Identification & Service Planning Support for Mental Health Needs', issuer: 'Health & Family Welfare Department', sector: 'Human Health', type: 'department' },
  { id: 'DPS-30', title: 'TB Risk Stratification & Programme Decision Support', issuer: 'Health & Family Welfare Department', sector: 'Human Health', type: 'department' },
  { id: 'DPS-31', title: 'Current Geospatial Register of Fishery Resources for Production Estimation', issuer: 'Fishery Department', sector: 'Fishing & Aquaculture', type: 'department' },
  { id: 'DPS-32', title: 'Scientific Sample Survey for Pond and Tank Aquaculture Production Estimation', issuer: 'Fishery Department', sector: 'Fishing & Aquaculture', type: 'department' },
  { id: 'DPS-33', title: 'Scientific Estimation of Fish Catch from Beels, Rivers and Other Open Waters', issuer: 'Fishery Department', sector: 'Fishing & Aquaculture', type: 'department' },
  { id: 'DPS-34', title: 'Fish-Flow and Market Data for Independent Validation of Annual Fish Production Estimates', issuer: 'Fishery Department', sector: 'Fishing & Aquaculture', type: 'department' },
  { id: 'DPS-35', title: 'Agricultural Commodity Price Intelligence and Forecasting for Farmer Decisions', issuer: 'Agriculture Department', sector: 'Agriculture & Irrigation', type: 'department' },
  { id: 'DPS-36', title: 'Trusted Government Knowledge, Rules & Document Assistant', issuer: 'Administrative Reforms, Training, Pension & Public Grievances Department', sector: 'Public Administration', type: 'department' },
  { id: 'DPS-37', title: 'Continuous RTPS Service Delivery Performance & SLA Monitoring', issuer: 'Administrative Reforms, Training, Pension & Public Grievances Department', sector: 'Public Administration', type: 'department' },
  { id: 'DPS-38', title: 'Faster, More Consistent Multilingual Proofreading of Government Documents', issuer: 'Information & Public Relations, Printing & Stationery Department', sector: 'Government Printing', type: 'department' },
  { id: 'DPS-39', title: 'Digital Inventory & Movement Tracking for Government Press and Stationery', issuer: 'Information & Public Relations, Printing & Stationery Department', sector: 'Government Printing', type: 'department' },
  { id: 'DPS-40', title: 'Improving Folding Productivity in Government Press Operations', issuer: 'Information & Public Relations, Printing & Stationery Department', sector: 'Government Printing', type: 'department' }
];


const featuredIds = [
  'IND-01', 'IND-02', 'IND-03', 'IND-04', 'IND-05',
  'IND-06', 'IND-07', 'IND-08', 'IND-09', 'IND-10',
  'DPS-01', 'DPS-02', 'DPS-05', 'DPS-08', 'DPS-11',
  'DPS-12', 'DPS-16', 'DPS-18', 'DPS-20', 'DPS-22',
  'DPS-23', 'DPS-30', 'DPS-31', 'DPS-36'
];

const featuredProblems = featuredIds
  .map(id => problems.find(problem => problem.id === id))
  .filter((problem): problem is Problem => Boolean(problem));

const sectorGroups = [
  [
    ['Pharmaceuticals', 'INDUSTRY'],
    ['Oil & Gas', 'INDUSTRY'],
    ['Bioenergy', 'INDUSTRY'],
    ['Waste Management', 'INDUSTRY']
  ],
  [
    ['Tea Plantation', 'INDUSTRY'],
    ['Agriculture & Irrigation', 'DEPARTMENT'],
    ['Urban Infrastructure', 'DEPARTMENT']
  ],
  [
    ['Public Administration', 'DEPARTMENT'],
    ['Fishing & Aquaculture', 'DEPARTMENT'],
    ['Forestry', 'DEPARTMENT']
  ],
  [
    ['Telecommunications', 'DEPARTMENT'],
    ['Human Health', 'DEPARTMENT'],
    ['Government Printing', 'DEPARTMENT']
  ]
];

const count = document.querySelector<HTMLDivElement>('#countdown')!;
const scene = document.querySelector<HTMLElement>('#scene')!;
const ribbon = document.querySelector<HTMLDivElement>('#ribbon')!;
const box = document.querySelector<HTMLDivElement>('#box')!;
const cards = document.querySelector<HTMLDivElement>('#cards')!;
const replay = document.querySelector<HTMLButtonElement>('#replay')!;
const scissor = document.querySelector<HTMLDivElement>('#scissor-cursor')!;
const logoReveal = document.querySelector<HTMLDivElement>('#logo-reveal')!;

const sleep = (ms: number) => new Promise<void>(resolve => window.setTimeout(resolve, ms));

let ribbonCut = false;

function moveScissors(event: MouseEvent) {
  if (ribbonCut) return;
  scissor.style.left = `${event.clientX}px`;
  scissor.style.top = `${event.clientY}px`;
}

function moveScissorsTouch(event: TouchEvent) {
  if (ribbonCut || !event.touches[0]) return;
  scissor.style.left = `${event.touches[0].clientX}px`;
  scissor.style.top = `${event.touches[0].clientY}px`;
}

window.addEventListener('mousemove', moveScissors);
window.addEventListener('touchmove', moveScissorsTouch, { passive: true });

function makeCard(problem: Problem, index: number): HTMLElement {
  const card = document.createElement('article');
  card.className = 'card ' + problem.type;
  card.style.setProperty('--r', String((index % 5 - 2) * 3) + 'deg');

  const id = document.createElement('div');
  id.className = 'id';
  id.textContent = problem.id;

  const type = document.createElement('div');
  type.className = 'type';
  type.textContent = problem.type === 'industry' ? 'INDUSTRY' : 'DEPARTMENT';

  const title = document.createElement('h3');
  title.textContent = problem.title;

  const sector = document.createElement('p');
  sector.textContent = problem.sector;

  const issuer = document.createElement('div');
  issuer.className = 'issuer';
  issuer.textContent = problem.issuer;

  card.append(id, type, title, sector, issuer);
  return card;
}

function waitForRibbonCut(): Promise<void> {
  return new Promise(resolve => {
    const cut = () => {
      if (ribbonCut) return;
      ribbonCut = true;
      ribbon.classList.add('cut');
      scene.classList.remove('cutting');
      scissor.classList.add('hide');
      scene.classList.add('logo-only');
      ribbon.removeEventListener('click', cut);
      ribbon.removeEventListener('keydown', onKeyCut);
      resolve();
    };

    onKeyCut = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        cut();
      }
    };

    ribbon.addEventListener('click', cut);
    ribbon.addEventListener('keydown', onKeyCut);
  });
}

let onKeyCut: (event: KeyboardEvent) => void;

async function start() {
  replay.classList.remove('show');
  scene.classList.add('hidden');
  scene.classList.remove('cutting', 'logo-only');
  count.classList.remove('hidden');
  box.classList.remove('open', 'ready', 'disperse');
  ribbon.classList.remove('cut');
  logoReveal.classList.remove('show');
  scissor.classList.remove('hide');
  scissor.style.left = '50%';
  scissor.style.top = '50%';
  cards.innerHTML = '';
  ribbonCut = false;

  for (let n = 5; n >= 0; n -= 1) {
    count.textContent = String(n);
    count.style.animation = 'none';
    void count.offsetWidth;
    count.style.animation = 'countPulse .7s cubic-bezier(.2,.8,.2,1)';
    await sleep(720);
  }

  count.classList.add('hidden');
  scene.classList.remove('hidden');

  scene.classList.add('cutting');
  await sleep(350);
  await waitForRibbonCut();

  await sleep(1050);
  logoReveal.classList.add('show');
  await sleep(2000);
  logoReveal.classList.remove('show');
  scene.classList.remove('logo-only');

  await sleep(500);
  box.classList.add('ready');

  await sleep(750);
  box.classList.add('open');

  await sleep(450);
  box.classList.add('disperse');

  featuredProblems.forEach((problem, index) => {
    if (index === 12) {
      const logoCell = document.createElement('div');
      logoCell.className = 'grid-logo';
      logoCell.setAttribute('aria-hidden', 'true');
      const image = document.createElement('img');
      image.src = './public/resources/logo.png';
      image.alt = '';
      logoCell.appendChild(image);
      cards.appendChild(logoCell);
    }

    const card = makeCard(problem, index);
    cards.appendChild(card);
    window.setTimeout(() => card.classList.add('show'), index * 70 + 120);
  });

  window.setTimeout(() => replay.classList.add('show'), featuredProblems.length * 70 + 1450);
}

replay.addEventListener('click', () => void start());
void start();
