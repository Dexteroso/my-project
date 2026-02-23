import { createContext, useState } from "react";

export interface IAppContext {
    isModoOscuro: boolean;
    toggleModo: () => void;
    getPrimaryText: () => string;
    getSecondaryText: () => string;
    getCardBg: () => string;
    getCardBgBlur: () => string;
    getAccent: () => string;
}

export const AppContext = createContext<IAppContext>({
    isModoOscuro: false,
    toggleModo: () => { },
    getPrimaryText: () => "#000000",
    getSecondaryText: () => "#54bdf2",
    getCardBg: () => "#317AC2",
    getCardBgBlur: () => "#317AC2",
    getAccent: () => "#73A1DC",
});

interface IAppProvider {
    children: any;
}

export const AppProvider = ({ children }: IAppProvider) => {
    const [isModoOscuro, setIsModoOscuro] = useState(false);

    const TEXT_ON_DARK = "#6A7293";
    const TEXT_ON_LIGHT = "#54bdf2";
    const CARD_BG_LIGHT = "#317AC2";
    const CARD_BG_DARK = "#2C304E";
    const ACCENT_COLOR = "#73A1DC";

    const getPrimaryText = () => (isModoOscuro ? TEXT_ON_DARK : TEXT_ON_LIGHT);
    const getSecondaryText = () => (isModoOscuro ? TEXT_ON_DARK : TEXT_ON_LIGHT);
    const getCardBg = () => (isModoOscuro ? CARD_BG_DARK : CARD_BG_LIGHT);
    const getCardBgBlur = () => (isModoOscuro ? "rgba(44, 48, 78, 0.8)" : "rgba(49, 122, 194, 0.8)");
    const getAccent = () => ACCENT_COLOR;

    const toggleModo = () => setIsModoOscuro((prev) => !prev);

    return (
        <AppContext.Provider value={{ toggleModo, isModoOscuro, getPrimaryText, getSecondaryText, getCardBg, getCardBgBlur, getAccent }}>

            {children}
        </AppContext.Provider>
    );
};
