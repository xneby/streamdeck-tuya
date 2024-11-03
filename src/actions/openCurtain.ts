import streamDeck, {
    action,
    JsonValue, KeyAction,
    KeyDownEvent,
    SendToPluginEvent,
    SingletonAction
} from "@elgato/streamdeck";
import {allDataCenters, getDataCenterByName, getDataCenterUrl, getPrettyName} from "../tuyaDataCenter";
import {TuyaState} from "../tuyaState";
import {TuyaDevice} from "../tuyaDevice";
import {TuyaDeviceAction, TuyaDeviceActionSettings} from "./tuyaDeviceAction";

type OpenCurtainSettings = {}

@action({UUID: "pl.xneby.tuya.opencurtain"})
export class OpenCurtain extends TuyaDeviceAction<OpenCurtainSettings> {
    override performAction(action: KeyAction<TuyaDeviceActionSettings<OpenCurtainSettings>>, device: TuyaDevice, settings: OpenCurtainSettings): Promise<void> {
        return device.openCurtain();
    }
}