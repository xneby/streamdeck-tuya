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

type CloseCurtainSettings = {}

@action({UUID: "pl.xneby.tuya.closecurtain"})
export class CloseCurtain extends TuyaDeviceAction<CloseCurtainSettings> {
    override performAction(action: KeyAction<TuyaDeviceActionSettings<CloseCurtainSettings>>, device: TuyaDevice, settings: CloseCurtainSettings): Promise<void> {
        return device.closeCurtain();
    }
}