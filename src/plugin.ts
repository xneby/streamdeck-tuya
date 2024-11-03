import streamDeck, {LogLevel} from "@elgato/streamdeck";

import {OpenCurtain} from "./actions/openCurtain";
import {CloseCurtain} from "./actions/closeCurtain";
import {WeatherInfo} from "./actions/weatherInfo";

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.TRACE);
streamDeck.logger.debug(`Args: ${process.execArgv}`);

streamDeck.actions.registerAction(new OpenCurtain());
streamDeck.actions.registerAction(new CloseCurtain());
streamDeck.actions.registerAction(new WeatherInfo());

// Finally, connect to the Stream Deck.
await streamDeck.connect();
