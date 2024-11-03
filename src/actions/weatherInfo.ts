import { TuyaDevice } from "../tuyaDevice";
import {TuyaDeviceAction, TuyaDeviceActionSettings} from "./tuyaDeviceAction";
import {action, KeyAction} from "@elgato/streamdeck";

type WeatherInfoSettings = {
    channelId: number;
}

@action({UUID: "pl.xneby.tuya.weatherinfo"})
export class WeatherInfo extends TuyaDeviceAction<WeatherInfoSettings> {
    override async performAction(action: KeyAction<TuyaDeviceActionSettings<WeatherInfoSettings>>, device: TuyaDevice, settings: WeatherInfoSettings): Promise<void> {
        const temperature = await device.getTemperature(settings.channelId);
        await action.setTitle(`${temperature}`);
    }
}