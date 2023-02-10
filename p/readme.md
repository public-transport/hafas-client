# `hafas-client` profiles

This directory contains specific customisations for each endpoint, called *profiles*. They **parse data from the API differently, add additional information, or add special methods specific to the endpoint** (such as [`journeysFromTrip`](https://github.com/public-transport/hafas-client/blob/453f4b0e1005ecb85569e1bd08096ed4c77f4184/docs/journeys-from-trip.md)).

## built-in profiles

There are built-in profiles for these public transportation networks:

HAFAS endpoint | wrapper library | docs | example code | profile name
-|-|-|-|-
[Deutsche Bahn (DB)](https://en.wikipedia.org/wiki/Deutsche_Bahn) | [`db-hafas`](https://github.com/public-transport/db-hafas) | [docs](db/readme.md) | [example](db/example.js) | [`db`](db)
[Polskie Koleje Państwowe (PKP)](https://en.wikipedia.org/wiki/Polish_State_Railways) | [`pkp-hafas`](https://github.com/juliuste/pkp-hafas) | [docs](pkp/readme.md) | [example](pkp/example.js) | [`pkp`](pkp)
[Belgian National Railways (SNCB/NMBS)](https://en.wikipedia.org/wiki/National_Railway_Company_of_Belgium) | - | [docs](sncb/readme.md) | [example](sncb/example.js) | [`sncb`](sncb) (currently broken)
[*Iarnród Éireann* (Irish Rail)](https://en.wikipedia.org/wiki/Iarnród_Éireann) | - | [docs](irish-rail/readme.md) | [example](irish-rail/example.js) | [`irish-rail`](irish-rail)
[Berlin & Brandenburg public transport (VBB)](https://en.wikipedia.org/wiki/Verkehrsverbund_Berlin-Brandenburg) | [`vbb-hafas`](https://github.com/public-transport/vbb-hafas) | [docs](vbb/readme.md) | [example](vbb/example.js) | [`vbb`](vbb)
[Berlin public transport (BVG)](https://en.wikipedia.org/wiki/Berliner_Verkehrsbetriebe) | [`bvg-hafas`](https://github.com/public-transport/bvg-hafas) | [docs](bvg/readme.md) | [example](bvg/example.js) | [`bvg`](bvg)
[Österreichische Bundesbahnen (ÖBB)](https://en.wikipedia.org/wiki/Austrian_Federal_Railways) | [`oebb-hafas`](https://github.com/juliuste/oebb-hafas) | [docs](oebb/readme.md) | [example](oebb/example.js) | [`oebb`](oebb)
[*Mobilitéitszentral* (Luxembourg)](https://www.mobiliteit.lu/) | - | [docs](mobiliteit-lu/readme.md) | [example](mobiliteit-lu/example.js) | [`mobiliteit-lu`](mobiliteit-lu)
[Bay Area Rapid Transit (BART)](https://en.wikipedia.org/wiki/Bay_Area_Rapid_Transit) | - | [docs](bart/readme.md) | [example](bart/example.js) | [`bart`](bart)
[Des Moines Area Rapid Transit (DART)](https://en.wikipedia.org/wiki/Des_Moines_metropolitan_area) | - | [docs](dart/readme.md) | [example](dart/example.js) | [`dart`](dart)
[Nahverkehr Sachsen-Anhalt (NASA)](https://de.wikipedia.org/wiki/Nahverkehrsservice_Sachsen-Anhalt)/[INSA](https://insa.de) | [`insa-hafas`](https://github.com/public-transport/insa-hafas) | [docs](insa/readme.md) | [example](insa/example.js) | [`insa`](insa)
[Nahverkehrsverbund Schleswig-Holstein (NAH.SH)](https://de.wikipedia.org/wiki/Nahverkehrsverbund_Schleswig-Holstein) | [`nahsh-hafas`](https://github.com/juliuste/nahsh-hafas) | [docs](nahsh/readme.md) | [example](nahsh/example.js) | [`nahsh`](nahsh)
[Rhein-Main-Verkehrsverbund (RMV)](https://en.wikipedia.org/wiki/Rhein-Main-Verkehrsverbund) | - | [docs](rmv/readme.md) | [example](rmv/example.js) | [`rmv`](rmv)
[Austin, Texas (CMTA/*CapMetro*)](https://en.wikipedia.org/wiki/Capital_Metropolitan_Transportation_Authority) | - | [docs](cmta/readme.md) | [example](cmta/example.js) | [`cmta`](cmta)
[*S-Bahn München*](https://en.wikipedia.org/wiki/Munich_S-Bahn) | - | [docs](sbahn-muenchen/readme.md) | [example](sbahn-muenchen/example.js) | [`sbahn-muenchen`](sbahn-muenchen)
*Saarfahrplan*/VGS ([Saarland](https://en.wikipedia.org/wiki/Saarland)) | - | [docs](saarfahrplan/readme.md) | [example](saarfahrplan/example.js) | [`saarfahrplan`](saarfahrplan)
[Société Nationale des Chemins de Fer Luxembourgeois (CFL)](https://en.wikipedia.org/wiki/Société_Nationale_des_Chemins_de_Fer_Luxembourgeois) | - | [docs](cfl/readme.md) | [example](cfl/example.js) | [`cfl`](cfl)
[*Nordhessischer Verkehrsverbund (NVV)*](https://en.wikipedia.org/wiki/Nordhessischer_Verkehrsverbund) ([Hesse](https://en.wikipedia.org/wiki/Hesse)) | - | [docs](nvv/readme.md) | [example](nvv/example.js) | [`nvv`](nvv)
[*mobil.nrw*](https://www.mobil.nrw) | - | [docs](mobil-nrw/readme.md) | [example](mobil-nrw/example.js) | [`mobil-nrw`](mobil-nrw)
*DB Busradar NRW* ([DB Regio Bus](https://en.wikipedia.org/wiki/DB_Regio#Bus_division_(DB_Regio_Bus))) | - | [docs](db-busradar-nrw/readme.md) | [example](db-busradar-nrw/example.js) | [`db-busradar-nrw`](db-busradar-nrw)
[Verkehrsverbund Süd-Niedersachsen (VSN)](https://de.wikipedia.org/wiki/Verkehrsverbund_S%C3%BCd-Niedersachsen) | - | [docs](vsn/readme.md) | [example](vsn/example.js) | [`vsn`](vsn)
[Ingolstädter Verkehrsgesellschaft (INVG)](https://de.wikipedia.org/wiki/Ingolstädter_Verkehrsgesellschaft) | - | [docs](invg/readme.md) | [example](invg/example.js) | [`invg`](invg)
[Verkehrsverbund Bremen/Niedersachsen (VBN)](https://de.wikipedia.org/wiki/Verkehrsverbund_Bremen/Niedersachsen) | - | [docs](vbn/readme.md) | [example](vbn/example.js) | [`vbn`](vbn)
[Verkehrsverbund Rhein-Neckar (VRN)](https://en.wikipedia.org/wiki/Verkehrsverbund_Rhein-Neckar) | - | [docs](vrn/readme.md) | [example](vrn/example.js) | [`vrn`](vrn)
[Rostocker Straßenbahn AG (RSAG)](https://de.wikipedia.org/wiki/Rostocker_Straßenbahn_AG) | - | [docs](rsag/readme.md) | [example](rsag/example.js) | [`rsag`](rsag)
[Verkehrsverbund Mittelthüringen (VMT)](https://en.wikipedia.org/wiki/Verkehrsverbund_Mittelthüringen) | - | [docs](vmt/readme.md) | [example](vmt/example.js) | [`vmt`](vmt)
[Verkehrsgemeinschaft Osnabrück (VOS)](https://de.wikipedia.org/wiki/Verkehrsgemeinschaft_Osnabrück) | - | [docs](vos/readme.md) | [example](vos/example.js) | [`vos`](vos)
[Aachener Verkehrsverbund (AVV)](https://de.wikipedia.org/wiki/Verkehrsgemeinschaft_Osnabrück) | - | [docs](avv/readme.md) | [example](avv/example.js) | [`avv`](avv)
[Kölner Verkehrs-Betriebe (KVB)](https://de.wikipedia.org/wiki/Kölner_Verkehrs-Betriebe) | - | [docs](kvb/readme.md) | [example](kvb/example.js) | [`kvb`](kvb)
[Rejseplanen in Denmark](http://www.rejseplanen.dk) | - | [docs](rejseplanen/readme.md) | [example](rejseplanen/example.js) | [`rejseplanen`](rejseplanen)
[Innsbrucker Verkehrsbetriebe (IVB)](https://de.wikipedia.org/wiki/Innsbrucker_Verkehrsbetriebe_und_Stubaitalbahn) | - | [docs](ivb/readme.md) | [example](ivb/example.js) | [`ivb`](ivb)
[Oberösterreichischer Verkehrsverbund (OÖVV)](https://de.wikipedia.org/wiki/Oberösterreichischer_Verkehrsverbund) | - | [docs](ooevv/readme.md) | [example](ooevv/example.js) | [`ooevv`](ooevv)
[Salzburg](https://en.wikipedia.org/wiki/Salzburg) | - | [docs](salzburg/readme.md) | [example](salzburg/example.js) | [`salzburg`](salzburg)
[Steirischer Verkehrsverbund (STV)](https://de.wikipedia.org/wiki/Steirischer_Verkehrsverbund) | - | [docs](stv/readme.md) | [example](stv/example.js) | [`stv`](stv)
[Salzburger Verkehrsverbund (SVV)](https://de.wikipedia.org/wiki/Salzburger_Verkehrsverbund) | - | [docs](svv/readme.md) | [example](svv/example.js) | [`svv`](svv)
[Verkehrsverbund Tirol (VVT)](https://de.wikipedia.org/wiki/Verkehrsverbund_Tirol) | - | [docs](vvt/readme.md) | [example](vvt/example.js) | [`vvt`](vvt)
[Verkehrsverbund Ost-Region (VOR)](https://de.wikipedia.org/wiki/Verkehrsverbund_Ost-Region) | - | [docs](vor/readme.md) | [example](vor/example.js) | [`vor`](vor)
[*Kärntner Linien/Verkehrsverbund Kärnten (VKG/VVK)*](https://de.wikipedia.org/wiki/Verkehrsverbund_Kärnten) | - | [docs](vkg/readme.md) | [example](vkg/example.js) | [`vkg`](vkg)
[Verkehrsverbund Vorarlberg (VVV)](https://de.wikipedia.org/wiki/Verkehrsverbund_Vorarlberg) | - | [docs](vvv/readme.md) | [example](vvv/example.js) | [`vvv`](vvv)
[*Transports publics genevois (TPG)*](https://en.wikipedia.org/wiki/Geneva_Public_Transport) (Geneva) | - | [docs](tpg/readme.md) | [example](tpg/example.js) | [`tpg`](tpg)
[*BLS AG*](https://en.wikipedia.org/wiki/BLS_AG) (Bern) | - | [docs](bls/readme.md) | [example](bls/example.js) | [`bls`](bls)
[Zürich public transport (ZVV)](https://en.wikipedia.org/wiki/Zürcher_Verkehrsverbund) | - | [docs](zvv/readme.md) | [example](zvv/example.js) | [`zvv`](zvv)

## writing your own

If you want to write a profile for an endpoint, check out the [*writing a profile* guide](../docs/writing-a-profile.md).

Your profile must be passed into `createClient` and is expected to be in a certain structure:

```js
import {createClient} from 'hafas-client'

const myCustomProfile = {
	// …
}

// create a client with the profile
const client = createClient(myCustomProfile)

// use it to query data
await client.journeys('1234', '2345')
```

