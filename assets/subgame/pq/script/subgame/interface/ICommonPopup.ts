export interface IPopup {

    title: string;

    content: string;

    buttons: Array<IPopupButton>;
}

export  interface IPopupButton {

    title?: string;

    onClicked?: Function;
}