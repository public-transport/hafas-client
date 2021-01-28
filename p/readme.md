# `hafas-client` profiles

This directory contains specific customisations for each endpoint, called *profiles*. They **parse data from the API differently, add additional information, or add special methods specific to the endpoint** (such as [`journeysFromTrip`](https://github.com/public-transport/hafas-client/blob/453f4b0e1005ecb85569e1bd08096ed4c77f4184/docs/journeys-from-trip.md)).

## built-in profiles

There are built-in profiles for these public transportation networks:

HAFAS endpoint | wrapper library | docs | example code | source code
-|-|-|-|-
[Deutsche Bahn (DB)](https://en.wikipedia.org/wiki/Deutsche_Bahn) | [`db-hafas`](https://github.com/public-transport/db-hafas) | [docs](db/readme.md) | [example](db/example.js) | [src](db/index.js)
[Swiss Railways (SBB)](https://en.wikipedia.org/wiki/Swiss_Federal_Railways) | - | [docs](sbb/readme.md) | [example](sbb/example.js) | [src](sbb/index.js)
[Polskie Koleje Państwowe (PKP)](https://en.wikipedia.org/wiki/Polish_State_Railways) | [`pkp-hafas`](https://github.com/juliuste/pkp-hafas) | [docs](pkreadme.md) | [example](pkexample.js) | [src](pkindex.js)
[Belgian National Railways (SNCB/NMBS)](https://en.wikipedia.org/wiki/National_Railway_Company_of_Belgium) | - | [docs](sncb/readme.md) | [example](sncb/example.js) | [src](sncb/index.js)
[*Iarnród Éireann* (Irish Rail)](https://en.wikipedia.org/wiki/Iarnród_Éireann) | - | [docs](irish-rail/readme.md) | [example](irish-rail/example.js) | [src](irish-rail/index.js)
[Berlin & Brandenburg public transport (VBB)](https://en.wikipedia.org/wiki/Verkehrsverbund_Berlin-Brandenburg) | [`vbb-hafas`](https://github.com/public-transport/vbb-hafas) | [docs](vbb/readme.md) | [example](vbb/example.js) | [src](vbb/index.js)
[Berlin public transport (BVG)](https://en.wikipedia.org/wiki/Berliner_Verkehrsbetriebe) | [`bvg-hafas`](https://github.com/public-transport/bvg-hafas) | [docs](bvg/readme.md) | [example](bvg/example.js) | [src](bvg/index.js)
[Österreichische Bundesbahnen (ÖBB)](https://en.wikipedia.org/wiki/Austrian_Federal_Railways) | [`oebb-hafas`](https://github.com/juliuste/oebb-hafas) | [docs](oebb/readme.md) | [example](oebb/example.js) | [src](oebb/index.js)
[*Mobilitéitszentral* (Luxembourg)](https://www.mobiliteit.lu/) | - | [docs](mobiliteit-lu/readme.md) | [example](mobiliteit-lu/example.js) | [src](mobiliteit-lu/index.js)
[Bay Area Rapid Transit (BART)](https://en.wikipedia.org/wiki/Bay_Area_Rapid_Transit) | [docs](bart/readme.md) | [example](bart/example.js) | [src](bart/index.js)
[Nahverkehr Sachsen-Anhalt (NASA)](https://de.wikipedia.org/wiki/Nahverkehrsservice_Sachsen-Anhalt)/[INSA](https://insa.de) | [`insa-hafas`](https://github.com/public-transport/insa-hafas) | [docs](insa/readme.md) | [example](insa/example.js) | [src](insa/index.js)
[Nahverkehrsverbund Schleswig-Holstein (NAH.SH)](https://de.wikipedia.org/wiki/Nahverkehrsverbund_Schleswig-Holstein) | [`nahsh-hafas`](https://github.com/juliuste/nahsh-hafas) | [docs](nahsh/readme.md) | [example](nahsh/example.js) | [src](nahsh/index.js)
[Rhein-Main-Verkehrsverbund (RMV)](https://en.wikipedia.org/wiki/Rhein-Main-Verkehrsverbund) | - | [docs](rmv/readme.md) | [example](rmv/example.js) | [src](rmv/index.js)
[Austin, Texas (CMTA/*CapMetro*)](https://en.wikipedia.org/wiki/Capital_Metropolitan_Transportation_Authority) | - | [docs](cmta/readme.md) | [example](cmta/example.js) | [src](cmta/index.js)
[*S-Bahn München*](https://en.wikipedia.org/wiki/Munich_S-Bahn) | - | [docs](sbahn-muenchen/readme.md) | [example](sbahn-muenchen/example.js) | [src](sbahn-muenchen/index.js)
*Saarfahrplan*/VGS ([Saarland](https://en.wikipedia.org/wiki/Saarland)) | - | [docs](saarfahrplan/readme.md) | [example](saarfahrplan/example.js) | [src](saarfahrplan/index.js)
[Société Nationale des Chemins de Fer Luxembourgeois (CFL)](https://en.wikipedia.org/wiki/Société_Nationale_des_Chemins_de_Fer_Luxembourgeois) | - | [docs](cfl/readme.md) | [example](cfl/example.js) | [src](cfl/index.js)
[Hamburg public transport (HVV)](https://en.wikipedia.org/wiki/Hamburger_Verkehrsverbund) | - | [docs](hvv/readme.md) | [example](hvv/example.js) | [src](hvv/index.js)
[*Nordhessischer Verkehrsverbund (NVV)*](https://en.wikipedia.org/wiki/Nordhessischer_Verkehrsverbund) ([Hesse](https://en.wikipedia.org/wiki/Hesse)) | - | [docs](nvv/readme.md) | [example](nvv/example.js) | [src](nvv/index.js)
[*mobil.nrw*](https://www.mobil.nrw) | - | [docs](mobil-nrw/readme.md) | [example](mobil-nrw/example.js) | [src](mobil-nrw/index.js)
*DB Busradar NRW* ([DB Regio Bus](https://en.wikipedia.org/wiki/DB_Regio#Bus_division_(DB_Regio_Bus))) | - | [docs](db-busradar-nrw/readme.md) | [example](db-busradar-nrw/example.js) | [src](db-busradar-nrw/index.js)
[Verkehrsverbund Süd-Niedersachsen (VSN)](https://de.wikipedia.org/wiki/Verkehrsverbund_S%C3%BCd-Niedersachsen) | - | [docs](vsn/readme.md) | [example](vsn/example.js) | [src](vsn/index.js)
[Ingolstädter Verkehrsgesellschaft (INVG)](https://de.wikipedia.org/wiki/Ingolstädter_Verkehrsgesellschaft) | - | [docs](invg/readme.md) | [example](invg/example.js) | [src](invg/index.js)
[Verkehrsverbund Bremen/Niedersachsen (VBN)](https://de.wikipedia.org/wiki/Verkehrsverbund_Bremen/Niedersachsen) | - | [docs](vbn/readme.md) | [example](vbn/example.js) | [src](vbn/index.js)
[Verkehrsverbund Rhein-Neckar (VRN)](https://en.wikipedia.org/wiki/Verkehrsverbund_Rhein-Neckar) | - | [docs](vrn/readme.md) | [example](vrn/example.js) | [src](vrn/index.js)
[Rostocker Straßenbahn AG (RSAG)](https://de.wikipedia.org/wiki/Rostocker_Straßenbahn_AG) | - | [docs](rsag/readme.md) | [example](rsag/example.js) | [src](rsag/index.js)
[Verkehrsverbund Mittelthüringen (VMT)](https://en.wikipedia.org/wiki/Verkehrsverbund_Mittelthüringen) | - | [docs](vmt/readme.md) | [example](vmt/example.js) | [src](vmt/index.js)
[Verkehrsgemeinschaft Osnabrück (VOS)](https://de.wikipedia.org/wiki/Verkehrsgemeinschaft_Osnabrück) | - | [docs](vos/readme.md) | [example](vos/example.js) | [src](vos/index.js)
[Aachener Verkehrsverbund (AVV)](https://de.wikipedia.org/wiki/Verkehrsgemeinschaft_Osnabrück) | - | [docs](avv/readme.md) | [example](avv/example.js) | [src](avv/index.js)
[Salzburg public transport (SVV)](https://de.wikipedia.org/wiki/Salzburger_Verkehrsverbund) | - | [docs](svv/readme.md) | [example](svv/example.js) | [src](svv/index.js)
[Verkehrsverbund Tirol (VVT)](https://de.wikipedia.org/wiki/Verkehrsverbund_Tirol) | - | [docs](vvt/readme.md) | [example](vvt/example.js) | [src](vvt/index.js)
[*Kärntner Linien/Verkehrsverbund Kärnten (VKG/VVK)*](https://de.wikipedia.org/wiki/Verkehrsverbund_Kärnten) | - | [docs](vkg/readme.md) | [example](vkg/example.js) | [src](vkg/index.js)
[Zürich public transport (ZVV)](https://en.wikipedia.org/wiki/Zürcher_Verkehrsverbund) | - | [docs](zvv/readme.md) | [example](zvv/example.js) | [src](zvv/index.js)

## writing your own

If you want to write a profile for an endpoint, check out the [*writing a profile* guide](../docs/writing-a-profile.md).

Your profile must be passed into `createClient` and is expected to be in a certain structure:

```js
const createClient = require('hafas-client')

const myCustomProfile = {
	// …
}

// create a client with the profile
const client = createClient(myCustomProfile)

// use it to query data
await client.journeys('1234', '2345')
```
