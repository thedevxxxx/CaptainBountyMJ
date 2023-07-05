import pq_EventRepository from "../event/pq_EventRepository";
// @ts-ignore
import proto from "./proto/PQproto_msg.js"

export default class pq_HttpNetwork {

    private pq_Config: any;

    private pq_EventRepository: pq_EventRepository;

    private hostName: string;

    private httpRequestByCommand: Map<proto.SubCommand, HttpRequest>;

    private responseCommandByRequestCommand: Map<proto.SubCommand, proto.SubCommand>;

    private requestByCommand: Map<proto.SubCommand, Request>;

    private responseByCommand: Map<proto.SubCommand, Response>;
    
    XML_TYPE:string = 'json';

    protected static _instance:pq_HttpNetwork;

    public static getInstance(): pq_HttpNetwork {
        this._instance || (this._instance = new pq_HttpNetwork());
        return this._instance;
    }

    private static clearInstance(){
        this._instance = undefined;
    }
    public setRefer(config: any, pq_EventRepository: pq_EventRepository){
        this.pq_Config = config;
        this.pq_EventRepository = pq_EventRepository;
    }

    public init(pq_Config: any, pq_EventRepository: pq_EventRepository) {
        this.setRefer(pq_Config,pq_EventRepository);
        this.hostName = pq_Config.serverUrl;

        this.httpRequestByCommand = new Map();
        this.httpRequestByCommand.set(proto.SubCommand.EnumSubLoginReq, { url: "/api/v1/auth/login", method: "POST" });
        this.httpRequestByCommand.set(proto.SubCommand.EnumSubLogoutReq, { url: "/api/v1/game/logout", method: "POST" });
        this.httpRequestByCommand.set(proto.SubCommand.EnumSubUserRefreshTokenReq, { url: "/api/v1/game/refreshToken", method: "POST" });
        this.httpRequestByCommand.set(proto.SubCommand.EnumSubEnterGameReq, { url: "/api/v1/game/enter", method: "POST" });
        this.httpRequestByCommand.set(proto.SubCommand.EnumSubSpinReq, { url: "/api/v1/game/spin", method: "POST" });

        this.responseCommandByRequestCommand = new Map();
        this.responseCommandByRequestCommand.set(proto.SubCommand.EnumSubLoginReq, proto.SubCommand.EnumSubLoginResp);
        this.responseCommandByRequestCommand.set(proto.SubCommand.EnumSubLogoutReq, proto.SubCommand.EnumSubLogoutResp);
        this.responseCommandByRequestCommand.set(proto.SubCommand.EnumSubUserRefreshTokenReq, proto.SubCommand.EnumSubUserRefreshTokenResp);
        this.responseCommandByRequestCommand.set(proto.SubCommand.EnumSubEnterGameReq, proto.SubCommand.EnumSubEnterGameResp);
        this.responseCommandByRequestCommand.set(proto.SubCommand.EnumSubSpinReq, proto.SubCommand.EnumSubSpinResp);

        this.requestByCommand = new Map();
        this.requestByCommand.set(proto.SubCommand.EnumSubLoginReq, proto.UserLoginReq);
        this.requestByCommand.set(proto.SubCommand.EnumSubLogoutReq, proto.UserLogoutReq);
        this.requestByCommand.set(proto.SubCommand.EnumSubUserRefreshTokenReq, proto.UserRefreshTokenReq);
        this.requestByCommand.set(proto.SubCommand.EnumSubEnterGameReq, proto.UserEnterGameReq);
        this.requestByCommand.set(proto.SubCommand.EnumSubSpinReq, proto.UserSpinReq);

        this.responseByCommand = new Map();
        this.responseByCommand.set(proto.SubCommand.EnumSubLoginResp, proto.UserLoginResp);
        this.responseByCommand.set(proto.SubCommand.EnumSubLogoutResp, proto.UserLogoutResp);
        this.responseByCommand.set(proto.SubCommand.EnumSubUserRefreshTokenResp, proto.UserRefreshTokenResp);
        this.responseByCommand.set(proto.SubCommand.EnumSubEnterGameResp, proto.UserEnterGameResp);
        this.responseByCommand.set(proto.SubCommand.EnumSubSpinResp, proto.UserSpinResp);
    }

    public destroy() {
        this.httpRequestByCommand.clear();
        this.responseCommandByRequestCommand.clear();
        this.requestByCommand.clear();
        this.responseByCommand.clear();
        this.httpRequestByCommand = null;
        this.responseCommandByRequestCommand = null;
        this.requestByCommand = null;
        this.responseByCommand = null;
        pq_HttpNetwork.clearInstance();
    }

    public sendMessage(requestCommand: proto.SubCommand, httpRequestBody: IRequest): void {
        const httpRequest = this.httpRequestByCommand.get(requestCommand);
        if (httpRequest == null) {
            console.error(`🧧[HttpNetwork] sendMessage, protoCommand[${requestCommand}] not found in requestByCommand`);
            return;
        }
        const url = `${this.hostName}${httpRequest.url}`;

        const data: XMLHttpRequestData = {
            requestCommand: requestCommand,
            method: httpRequest.method,
            url: url,
            body: httpRequestBody,
            onResponse: (response) => {
                this.onReceiveMessage(requestCommand, response);
            },
            onFail: (result) => {
                console.log(`🧧[HttpNetwork] onFail, result:`, result);
                this.onReceiveMessage(requestCommand, { result: result });
            },
            timeout: 5000//??
        }
        this.sendXMLHttpRequest(data);
    }

    private onReceiveMessage(requestComand: proto.SubCommand, response: IResponse) {
        const responseCommand = this.responseCommandByRequestCommand?.get(requestComand);
        if (responseCommand == null) {
            console.log(`🧧[HttpNetwork] responseCommand null`);
            return;
        }
        console.log("🧧[HttpNetwork] onReceiveMessage responseCommand=", responseCommand, " response=", response)
        const receiveMessageDelegate = this.pq_EventRepository.receiveMessageByCommand.get(responseCommand);
        if (receiveMessageDelegate != null) {
            receiveMessageDelegate.Notify(response);
        }
    }

    private sendXMLHttpRequest(data: XMLHttpRequestData) {
        if (!data.url) {
            console.log(`🧧[HttpNetwork] sendXMLHttpRequest, url is empty`);
            return;
        }
        if (!data.method) {
            console.log(`🧧[HttpNetwork] sendXMLHttpRequest, method is empty`);
            return;
        }
        const url = data.url;
        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.timeout = (data.timeout) ? data.timeout : 3000;

        const onFail = (result: proto.ICommandResult) => {
            data.onFail?.(result);
            xmlHttpRequest.abort();
        };

        xmlHttpRequest.onreadystatechange = async () => {
            if (xmlHttpRequest.readyState === 4) {
                const releaseXMLHttpRequest = () => {
                    xmlHttpRequest.ontimeout = null;
                    xmlHttpRequest.onerror = null;
                    xmlHttpRequest.abort();
                }
                if (this.responseCommandByRequestCommand == null) {
                    console.log(`🧧[HttpNetwork] responseCommandByRequestCommand is null`);
                    releaseXMLHttpRequest();
                    return;
                }
                const response = xmlHttpRequest.response;
                if (response != null) {
                    let responseCommand: number;
                    let message:any;
                    if(this.XML_TYPE==='json'){
                        message = JSON.parse(response);
                    }else{
                        responseCommand = this.responseCommandByRequestCommand.get(data.requestCommand);
                        message = await this.decode(responseCommand, response);
                    }
                    data.onResponse?.(message);
                } else {
                    // @ts-ignore
                    const result: proto.ICommandResult = { resultCode: -3, message: `response null, readyState:${xmlHttpRequest.readyState}, status:${xmlHttpRequest.readyState}` };
                    onFail(result);
                }
                releaseXMLHttpRequest();
            }
        };
        xmlHttpRequest.ontimeout = (ev: ProgressEvent) => {
            // @ts-ignore
            const result: proto.ICommandResult = { resultCode: -1, message: `timeout, readyState:${xmlHttpRequest.readyState}, status:${xmlHttpRequest.readyState}` };
            onFail(result);
        };
        xmlHttpRequest.onerror = (ev: ProgressEvent) => {
            // @ts-ignore
            const result: proto.ICommandResult = { resultCode: -2, message: `error, readyState:${xmlHttpRequest.readyState}, status:${xmlHttpRequest.readyState}` };
            onFail(result);
        };

        xmlHttpRequest.open(data.method, encodeURI(url), true);

        xmlHttpRequest.setRequestHeader("Content-Type", this.XML_TYPE==='json'?"application/json":"application/octet-stream");
        xmlHttpRequest.setRequestHeader("Authorization", `Bearer ${this.pq_Config.pqItem.pqToken}`);


        xmlHttpRequest.responseType = this.XML_TYPE==='json'?"json":"arraybuffer";
        xmlHttpRequest.send(this.encode(data.requestCommand, data.body));
        console.log(`🧧[HttpNetwork] sendXMLHttpRequest, kind:${data.requestCommand} url:${data.url}, method:${data.method} body:`, data.body);
    }

    private encode(requestCommand: proto.SubCommand, httpRequestBody: IRequest): ArrayBuffer|string {
        if(this.XML_TYPE === 'json'){
            return JSON.stringify(httpRequestBody);
        }
        const bodyClass = this.requestByCommand.get(requestCommand);
        const message = bodyClass.create(httpRequestBody);
        const buffer = bodyClass.encode(message).finish();
        return buffer;
    }

    private async decode(responseCommand: proto.SubCommand, arrayBuffer: ArrayBuffer): Promise<IResponse> {
        const bodyClass = this.responseByCommand.get(responseCommand);
        if (bodyClass == null) {
            console.error(`🧧[HttpNetwork] decode kind:${responseCommand}, data:${arrayBuffer}`);
            return null;
        }
        const unit8Array = new Uint8Array(arrayBuffer);
        const message = bodyClass.decode(unit8Array) as IResponse;
        return message;
    }
}

interface XMLHttpRequestData {

    requestCommand: number;

    timeout: number;

    method: string;

    url: string;

    body: IRequest;

    onResponse: (response: IResponse) => void;

    onFail: (response: proto.ICommandResult) => void;
}

interface HttpRequest {

    url: string;

    method: string;
}

export type IResponse =
    proto.IUserLoginResp |
    proto.IUserLogoutResp |
    proto.IUserRefreshTokenResp |
    proto.IUserEnterGameResp |
    proto.IUserSpinResp ;

type IRequest =
    proto.IUserLoginReq |
    proto.IUserLogoutReq |
    proto.IUserRefreshTokenReq |
    proto.IUserEnterGameReq |
    proto.IUserSpinReq;

type Response =
    typeof proto.UserLoginResp |
    typeof proto.UserLogoutResp |
    typeof proto.UserRefreshTokenResp |
    typeof proto.UserEnterGameResp |
    typeof proto.UserSpinResp;

type Request =
    typeof proto.UserLoginReq |
    typeof proto.UserLogoutReq |
    typeof proto.UserRefreshTokenReq |
    typeof proto.UserEnterGameReq |
    typeof proto.UserSpinReq;