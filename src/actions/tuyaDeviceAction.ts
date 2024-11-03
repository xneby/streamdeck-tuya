import streamDeck, {
    JsonObject,
    JsonValue,
    KeyAction,
    KeyDownEvent,
    SendToPluginEvent,
    SingletonAction
} from "@elgato/streamdeck";
import {allDataCenters, getDataCenterByName, getDataCenterUrl, getPrettyName} from "../tuyaDataCenter";
import {TuyaState} from "../tuyaState";
import {TuyaDevice} from "../tuyaDevice";

type TuyaDeviceCommonSettings = {
    dataCenterName: string;
    accessKey: string;
    secretKey: string;
    deviceId: string;
};

export type TuyaDeviceActionSettings<SettingsT> = TuyaDeviceCommonSettings & SettingsT;

export abstract class TuyaDeviceAction<SettingsT extends JsonObject> extends SingletonAction<TuyaDeviceActionSettings<SettingsT>> {
    abstract performAction(action: KeyAction<TuyaDeviceActionSettings<SettingsT>>, device: TuyaDevice, settings: SettingsT): Promise<void>;

    override async onKeyDown(ev: KeyDownEvent<TuyaDeviceActionSettings<SettingsT>>): Promise<void> {
        const {settings} = ev.payload;
        const baseUrl = getDataCenterUrl(getDataCenterByName(settings.dataCenterName));
        const tuya = new TuyaState({accessKey: settings.accessKey, baseUrl, secretKey: settings.secretKey});
        const device = await tuya.getDevice(settings.deviceId);
        await this.performAction(ev.action, device, settings);
    }

    override async onSendToPlugin(ev: SendToPluginEvent<JsonValue, TuyaDeviceActionSettings<SettingsT>>): Promise<void> {
        const ui = streamDeck.ui.current;
        if (ui !== undefined) {
            const dataCenterItems = allDataCenters().map(dc =>
                ({
                    value: getPrettyName(dc),
                    label: getPrettyName(dc),
                }))
            await ui.sendToPropertyInspector(
                {
                    event: "getDataCenters",
                    items: dataCenterItems
                }
            );
        }
    }
}