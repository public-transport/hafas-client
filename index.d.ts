// typescript declaration file for hafas-client, https://www.npmjs.com/package/hafas-client

// info: Leg, Trip and StopOver have no type members

export interface Location {
    type: 'location',
    id?: string,
    name?: string,
    poi?: boolean,
    address?: string,
    longitude?: number,
    latitude?: number,
    altitude?: number
}

export interface Products {
    nationalExpress?: boolean,
    national?: boolean,
    regionalExp?: boolean,
    regional?: boolean,
    suburban?: boolean,
    bus?: boolean,
    express?: boolean,
    ferry?: boolean,
    subway?: boolean,
    tram?: boolean,
    taxi?: boolean,
    "high-speed-train"?: boolean,
    "intercity-p"?: boolean,
    "local-train"?: boolean,
    metro?: boolean,
    "s-train"?: boolean,
}

export interface Station {
    type: 'station',
    id: string,
    name: string,
    station?: Station,
    location?: Location,
    products?: Products,
    regions?: string[] // region ids
}

export interface Stop {
    type: 'stop',
    id: string,
    station?: Station,
    name: string,
    location?: Location,
    products: Products
}

export interface Region {
    type: 'region',
    id: string,
    name: string,
    stations: string[] // station ids
}

export interface Line {
    type: 'line',
    id: string,
    name: string,
    adminCode?: string,
    fahrtNr?: string,
    additionalName?: string,
    product?: string,
    public?: boolean,
    mode: 'train' | 'bus' | 'watercraft' | 'taxi' | 'gondola' | 'aircraft' | 'car' | 'bicycle' | 'walking',
    routes?: string[] // routes ids
    operator?: Operator
}

export interface Route {
    type: 'route',
    id: string,
    line: string,
    mode: 'train' | 'bus' | 'watercraft' | 'taxi' | 'gondola' | 'aircraft' | 'car' | 'bicycle' | 'walking',
    stops: string[] // stop ids
}

export interface ArrivalDeparture {
    arrival?: number,
    departure?: number
}

export interface Schedule {
    type: 'schedule',
    id: string,
    route: string
    mode: 'train' | 'bus' | 'watercraft' | 'taxi' | 'gondola' | 'aircraft' | 'car' | 'bicycle' | 'walking',
    sequence: ArrivalDeparture[],
    starts: string[] // array of Unix timestamps
}

export interface Operator {
    type: 'operator',
    id: string,
    name: string
}

export interface Hint {
    type: 'hint',
    code: string,
    summary?: string,
    text: string,
}

export interface StopOver {
    stop: Station | Stop,
    departure?: string, // null, if last stopOver of trip
    departureDelay?: number,
    plannedDeparture?: string,
    departurePlatform?: string,
    plannedDeparturePlatform?: string,
    arrival?: string, // null, if first stopOver of trip
    arrivalDelay?: number,
    plannedArrival?: string,
    arrivalPlatform?: string,
    plannedArrivalPlatform?: string,
    remarks?: Hint[],
}

export interface Trip {
    id: string,
    origin: Stop,
    departure: string,
    departurePlatform?: string,
    plannedDeparture: string,
    plannedDeparturePlatform?: string,
    departureDelay?: number,
    destination: Stop,
    arrival: string,
    arrivalPlatform?: string,
    plannedArrival: string,
    plannedArrivalPlatform?: string,
    arrivalDelay?: number,
    stopovers: StopOver[],
    remarks?: Hint[],
    line?: Line,
    direction?: string,
    reachable?: boolean
}

export interface Price {
    amount: number,
    currency: string,
    hint?: string
}

export interface Leg {
    tripId?: string,
    origin: Station | Stop,
    destination: Station | Stop,
    departure: string,
    plannedDeparture: string,
    departureDelay?: number,
    departurePlatform?: string,
    plannedDeparturePlatform?: string,
    arrival?: string,
    plannedArrival: string,
    arrivalDelay?: number,
    arrivalPlatform?: string,
    plannedArrivalPlatform?: string,
    stopovers?: StopOver[],
    schedule?: number,
    price?: Price,
    operator?: number,
    direction?: string,
    line?: Line,
    reachable?: boolean,
    cancelled?: boolean,
    walking?: boolean,
    loadFactor?: string,
    distance?: number,
    public?: boolean,
    transfer?: boolean
}

export interface Journey {
    type: 'journey',
    legs: Leg[],
    refreshToken?: string,
    remarks?: Hint[],
    price?: Price
}

export interface Journeys {
    journeys: Journey[]
}

export interface Duration {
    duration: number,
    stations: (Station | Stop)[]
}

export interface JourneysOptions {
    departure?: Date,
    arrival?: Date,
    results?: number, // number of journeys 
    via?: string, // let journeys pass this station
    stopovers?: boolean // return stations on the way?
    transfers?: number, // Maximum nr of transfers. Default: Let HAFAS decide.
    transferTime?: number, // minimum time for a single transfer in minutes
    accessibility?: string, // 'none', 'partial' or 'complete'
    bike?: boolean, // only bike-friendly journeys
    products?: Products,
    tickets?: boolean, // return tickets? only available with some profiles
    polylines?: boolean, // return a shape for each leg?
    remarks?: boolean, // parse & expose hints & warnings?
    walkingSpeed?: string, // 'slow', 'normal', 'fast'
    startWithWalking?: boolean,
    language?: string, // language to get results in
    scheduledDays?: boolean // parse which days each journey is valid on
}

export interface LocationsOptions {
    fuzzy?: boolean, // find only exact matches?
    results?: number // how many search results?
    stops?: boolean // return stops/stations?
    addresses?: boolean
    poi?: boolean // points of interest
    linesOfStops?: boolean // parse & expose lines at each stop/station?
    language?: string
}

export interface TripOptions {
    stopovers?: boolean, // return stations on the way?
    polyline?: boolean, // return a shape for the trip?
    remarks?: boolean, // parse & expose hints & warnings?
    language?: string
}

export interface StopOptions {
    linesOfStops?: boolean, // parse & expose lines at the stop/station?
    language?: string
}

export interface DeparturesArrivalsOptions {
    when?: Date,
    direction?: string, // only show departures heading to this station
    duration?: number, // show departures for the next n minutes
    results?: number, // max. number of results; `null` means "whatever HAFAS wants"
    linesOfStops?: boolean, // parse & expose lines at the stop/station?
    remarks?: boolean, // parse & expose hints & warnings?
    stopovers?: boolean, // fetch & parse previous/next stopovers?
    includeRelatedStations?: boolean, // departures at related stations
    language?: string
}

export interface RefreshJourneyOptions {
    stopovers?: boolean, // return stations on the way?
    polylines?: boolean, // return a shape for each leg?
    tickets?: boolean, // return tickets? only available with some profiles
    remarks?: boolean, // parse & expose hints & warnings?
    language?: string
}

export interface NearByOptions {
    results?: number, // maximum number of results
    distance?: number, // maximum walking distance in meters
    poi?: boolean, // return points of interest?
    stops?: boolean, // return stops/stations?
    linesOfStops?: boolean, // parse & expose lines at each stop/station?
    language?: string
}

export interface ReachableFromOptions {
    when?: Date,
    maxTransfers?: number, // maximum of 5 transfers
    maxDuration?: number, // maximum travel duration in minutes, pass `null` for infinite
    products?: Products
}

export interface HafasClient {
    journeys: (from: string | Station | Location, to: string | Station | Location, options: JourneysOptions | undefined) => Promise<Journeys>,
    refreshJourney: (refreshToken: string, options: RefreshJourneyOptions | undefined) => Promise<Journey>,
    trip: (id: string, name: string, options: TripOptions | undefined) => Promise<Trip>
    departures: (station: string | Station, options: DeparturesArrivalsOptions | undefined) => Promise<Journeys>,
    arrivals: (station: string | Station, options: DeparturesArrivalsOptions | undefined) => Promise<Journeys>,
    locations: (from: string, options: LocationsOptions | undefined) => Promise<(Stop | Location)[]>,
    stop: (id: string, options: StopOptions | undefined) => Promise<Stop>
    nearBy: (location: Location, options: NearByOptions | undefined) => Promise<Stop>
    reachableFrom: (address: Location, options: ReachableFromOptions | undefined) => Promise<Duration[]>
}

export enum Profile {
    bvg = "bvg",
    cmta = "cmta",
    dbBusradarNrw = "dbBusradarNrw",
    insa = "insa",
    nahsh = "nahsh",
    oebb = "oebb",
    rsag = "rsag",
    sBahnMunich = "sBahnMunich",
    vbb = "vbb",
    vmt = "vmt",
    cfl = "cfl",
    db = "db",
    hvv = "hvv",
    invg = "invg",
    nvv = "nvv",
    pkp = "pkp",
    rmv = "rmv",
    saarfahrplan = "saarfahrplan",
    sncb = "sncb",
    vbn = "vbn",
    vsn = "vsn"
}

declare function createClient(profile: object, userAgent: string): HafasClient;

export default createClient;
