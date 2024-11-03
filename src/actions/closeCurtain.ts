import {action, KeyAction} from "@elgato/streamdeck";
import {TuyaDevice} from "../tuyaDevice";
import {TuyaDeviceAction, TuyaDeviceActionSettings} from "./tuyaDeviceAction";

type CloseCurtainSettings = {}

@action({UUID: "pl.xneby.tuya.closecurtain"})
export class CloseCurtain extends TuyaDeviceAction<CloseCurtainSettings> {
    override performAction(action: KeyAction<TuyaDeviceActionSettings<CloseCurtainSettings>>, device: TuyaDevice, settings: CloseCurtainSettings): Promise<void> {
        return device.closeCurtain();
    }
}