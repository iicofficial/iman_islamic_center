/**
 * Simple Arabic Reshaper
 * Handles basic ligatures for Arabic characters
 */
const ArabicReshaper = (() => {
    const chars = {
        '\u0621': ['\uFE80', '\uFE80', '\uFE80', '\uFE80'], // HAMZA
        '\u0622': ['\uFE81', '\uFE82', '\uFE81', '\uFE82'], // ALEF WITH MADDA ABOVE
        '\u0623': ['\uFE83', '\uFE84', '\uFE83', '\uFE84'], // ALEF WITH HAMZA ABOVE
        '\u0624': ['\uFE85', '\uFE86', '\uFE85', '\uFE86'], // WAW WITH HAMZA ABOVE
        '\u0625': ['\uFE87', '\uFE88', '\uFE87', '\uFE88'], // ALEF WITH HAMZA BELOW
        '\u0626': ['\uFE89', '\uFE8A', '\uFE8B', '\uFE8C'], // YEH WITH HAMZA ABOVE
        '\u0627': ['\uFE8D', '\uFE8E', '\uFE8D', '\uFE8E'], // ALEF
        '\u0628': ['\uFE8F', '\uFE90', '\uFE91', '\uFE92'], // BEH
        '\u0629': ['\uFE93', '\uFE94', '\uFE93', '\uFE94'], // TEH MARBUTA
        '\u062A': ['\uFE95', '\uFE96', '\uFE97', '\uFE98'], // TEH
        '\u062B': ['\uFE99', '\uFE9A', '\uFE9B', '\uFE9C'], // THEH
        '\u062C': ['\uFE9D', '\uFE9E', '\uFE9F', '\uFEA0'], // JEEM
        '\u062D': ['\uFEA1', '\uFEA2', '\uFEA3', '\uFEA4'], // HAH
        '\u062E': ['\uFEA5', '\uFEA6', '\uFEA7', '\uFEA8'], // KHAH
        '\u062F': ['\uFEA9', '\uFEAA', '\uFEA9', '\uFEAA'], // DAL
        '\u0630': ['\uFEAB', '\uFEAC', '\uFEAB', '\uFEAC'], // THAL
        '\u0631': ['\uFEAD', '\uFEAE', '\uFEAD', '\uFEAE'], // REH
        '\u0632': ['\uFEAF', '\uFEB0', '\uFEAF', '\uFEB0'], // ZAIN
        '\u0633': ['\uFEB1', '\uFEB2', '\uFEB3', '\uFEB4'], // SEEN
        '\u0634': ['\uFEB5', '\uFEB6', '\uFEB7', '\uFEB8'], // SHEEN
        '\u0635': ['\uFEB9', '\uFEBA', '\uFEBB', '\uFEBC'], // SAD
        '\u0636': ['\uFEBD', '\uFEBE', '\uFEBF', '\uFEC0'], // DAD
        '\u0637': ['\uFEC1', '\uFEC2', '\uFEC3', '\uFEC4'], // TAH
        '\u0638': ['\uFEC5', '\uFEC6', '\uFEC7', '\uFEC8'], // ZAH
        '\u0639': ['\uFEC9', '\uFECA', '\uFECB', '\uFECC'], // AIN
        '\u063A': ['\uFECD', '\uFECE', '\uFECF', '\uFED0'], // GHAIN
        '\u0641': ['\uFED1', '\uFED2', '\uFED3', '\uFED4'], // FEH
        '\u0642': ['\uFED5', '\uFED6', '\uFED7', '\uFED8'], // QAF
        '\u0643': ['\uFED9', '\uFEDA', '\uFEDB', '\uFEDC'], // KAF
        '\u0644': ['\uFEDD', '\uFEDE', '\uFEDF', '\uFEE0'], // LAM
        '\u0645': ['\uFEE1', '\uFEE2', '\uFEE3', '\uFEE4'], // MEEM
        '\u0646': ['\uFEE5', '\uFEE6', '\uFEE7', '\uFEE8'], // NOON
        '\u0647': ['\uFEE9', '\uFEEA', '\uFEEB', '\uFEEC'], // HEH
        '\u0648': ['\uFEED', '\uFEEE', '\uFEED', '\uFEEE'], // WAW
        '\u0649': ['\uFEEF', '\uFEF0', '\uFEEF', '\uFEF0'], // ALEF MAKSURA
        '\u064A': ['\uFEF1', '\uFEF2', '\uFEF3', '\uFEF4'], // YEH
    };

    const isConnectedToNext = (c) => {
        return chars[c] && (chars[c][2] !== chars[c][0] || chars[c][3] !== chars[c][1]);
    };

    const isConnectedToPrev = (c) => {
        return chars[c] && (chars[c][1] !== chars[c][0] || chars[c][3] !== chars[c][2]);
    };

    return {
        reshape: (text) => {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const c = text[i];
                if (chars[c]) {
                    const prev = text[i - 1];
                    const next = text[i + 1];
                    const prevConnected = isConnectedToNext(prev);
                    const nextConnected = isConnectedToPrev(next);

                    if (prevConnected && nextConnected) result += chars[c][3];
                    else if (prevConnected) result += chars[c][1];
                    else if (nextConnected) result += chars[c][2];
                    else result += chars[c][0];
                } else {
                    result += c;
                }
            }
            return result;
        }
    };
})();

export default ArabicReshaper;
