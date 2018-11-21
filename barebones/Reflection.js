export class Reflection {
    static getFuncParams(func) {
        if (typeof (func) !== 'function') {
            return [];
        }

        let fn = func.toString();

        const REGEX_WHITE_SPACE = /\s+/mg;
        const REGEX_FUNCTION_BODY = /{.*}/mg;
        const REGEX_FUNCTION_RESERVED_WORD = /function/;
        const REGEX_FUNCTION_PARAMETERS = /(?<=\()\S+(?=\))/;

        const FUNCTION_PARAMETER_SEPARATOR = ','

        let fn_Replaced_Regex_White_Space = fn
            .replace(REGEX_WHITE_SPACE, '');
        let fn_Replaced_Regex_Function_Body = fn_Replaced_Regex_White_Space
            .replace(REGEX_FUNCTION_BODY, '');
        let fn_Replaced_Regex_Function_Reserved_Word = fn_Replaced_Regex_Function_Body
            .replace(REGEX_FUNCTION_RESERVED_WORD, '');

        let fn_Match_Regex_Function_Parameters = REGEX_FUNCTION_PARAMETERS
            .exec(fn_Replaced_Regex_Function_Reserved_Word)
            .toString();

        let parameters = fn_Match_Regex_Function_Parameters
            .split(FUNCTION_PARAMETER_SEPARATOR);

        return parameters;
    }
}