export enum TuyaDataCenter {
    CHINA,
    WESTERN_AMERICA,
    EASTERN_AMERICA,
    CENTRAL_EUROPE,
    WESTERN_EUROPE,
    INDIA
}

export function allDataCenters() {
    return [TuyaDataCenter.CHINA, TuyaDataCenter.WESTERN_AMERICA, TuyaDataCenter.EASTERN_AMERICA, TuyaDataCenter.CENTRAL_EUROPE, TuyaDataCenter.WESTERN_EUROPE, TuyaDataCenter.INDIA];
}

export function getPrettyName(dataCenter: TuyaDataCenter) {
    const name = PRETTY_NAMES.get(dataCenter);
    if (name === undefined) {
        throw new Error(`no such dataCenter: ${dataCenter}`);
    }
    return name;
}

export function getDataCenterUrl(dataCenter: TuyaDataCenter) {
    const name = URLS.get(dataCenter);
    if (name === undefined) {
        throw new Error(`no such dataCenter: ${dataCenter}`);
    }
    return name;
}

export function getDataCenterByName(name: string) {
    for (const [dataCenter, dataCenterName] of PRETTY_NAMES.entries()) {
        if (dataCenterName === name) return dataCenter;
    }
    throw new Error(`no such dataCenter: ${name}`);
}

const PRETTY_NAMES = Object.freeze(
    new Map([
        [TuyaDataCenter.CHINA, 'China'],
        [TuyaDataCenter.WESTERN_AMERICA, 'Western America'],
        [TuyaDataCenter.EASTERN_AMERICA, 'Eastern America'],
        [TuyaDataCenter.CENTRAL_EUROPE, 'Central Europe'],
        [TuyaDataCenter.WESTERN_EUROPE, 'Western Europe'],
        [TuyaDataCenter.INDIA, 'India'],
    ])
);

const URLS = Object.freeze(new Map([
    [TuyaDataCenter.CHINA, 'https://openapi.tuyacn.com'],
    [TuyaDataCenter.WESTERN_AMERICA, 'https://openapi.tuyaus.com'],
    [TuyaDataCenter.EASTERN_AMERICA, 'https://openapi-ueaz.tuyaus.com'],
    [TuyaDataCenter.CENTRAL_EUROPE, 'https://openapi.tuyaeu.com'],
    [TuyaDataCenter.WESTERN_EUROPE, 'https://openapi-weaz.tuyaeu.com'],
    [TuyaDataCenter.INDIA, 'https://openapi.tuyain.com'],
]));