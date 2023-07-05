declare namespace jsb{
	namespace device{
		export function getDeviceModel(): string;
	}
	namespace fileUtils{
		export function getDataFromFile(filename:string):ArrayBuffer;
		export function renameFile(oldfullpath:string,newfullpath:string):boolean;
		export function writeDataToFile(data:any,fullPath:string):boolean;
	}

	export namespace reflection{
        /**
         * https://docs.cocos.com/creator/manual/zh/advanced-topics/java-reflection.html
         * call OBJC/Java static methods
         *
         * @param className
         * @param methodName
         * @param methodSignature
         * @param parameters
         */
        export function callStaticMethod (className: string, methodName: string, ...parameters:any): any;
    }
}
declare module 'pal/system-info'{
	interface SystemInfo{
		getDeviceModel (): string;
	}
}
