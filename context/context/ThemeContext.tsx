import { createContext, useState } from "react";

export interface IThemeContext {
    isModoOscuro: boolean;
    toggleModo: () => void;
    getPrimaryText: () => string;
    getSecondaryText: () => string;
    getCardBg: () => string;
    getCardBgBlur: () => string;
    getSeparator: () => string;
    getInfoText: () => string;
}

export const ThemeContext = createContext<IThemeContext>({
    isModoOscuro: false,
    toggleModo: () => { },
    getPrimaryText: () => "#000000",
    getSecondaryText: () => "#B1E6FF",
    getCardBg: () => "#317AC2",
    getCardBgBlur: () => "#317AC2",
    getSeparator: () => "#73A1DC",
    getInfoText: () => "#ffffff",
});

interface IThemeProvider {
    children: any;
}

export const ThemeProvider = ({ children }: IThemeProvider) => {
    const [isModoOscuro, setIsModoOscuro] = useState(false);

    const TEXT_ON_DARK = "#6A7293";
    const TEXT_ON_LIGHT = "#9DDFFF";
    const CARD_BG_LIGHT = "#317AC2";
    const CARD_BG_DARK = "#2C304E";
    const SEPARATOR_COLOR = "#73A1DC";
    const INFO_TEXT_DARK = "#7982a6";   
    const INFO_TEXT_LIGHT = "#a9c6eb";

    const getPrimaryText = () => (isModoOscuro ? TEXT_ON_DARK : TEXT_ON_LIGHT);
    const getSecondaryText = () => (isModoOscuro ? TEXT_ON_DARK : TEXT_ON_LIGHT);
    const getCardBg = () => (isModoOscuro ? CARD_BG_DARK : CARD_BG_LIGHT);
    const getCardBgBlur = () => (isModoOscuro ? "rgba(44, 48, 78, 0.8)" : "rgba(49, 122, 194, 0.8)");
    const getSeparator = () => SEPARATOR_COLOR;
    const getInfoText = () => (isModoOscuro ? INFO_TEXT_DARK : INFO_TEXT_LIGHT);

    const toggleModo = () => setIsModoOscuro((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ toggleModo, isModoOscuro, getPrimaryText, getSecondaryText, getCardBg, getCardBgBlur, getSeparator, getInfoText }}>

            {children}
        </ThemeContext.Provider>
    );
};
