function _() {
    return {
        defaultToken: 'invalid',
        tokenPostfix: '.rice',

        keywords: [
            "var", "const", "if", "else", "func", "for", "in", "continue", "break", "return"
        ],

        literals: [
            "true", "false", "null"
        ],

        operators: [
            '=', '>', '<', '!', '==', '<=', '>=', '!=', '&&', '||', '++', '--',
            '+', '-', '*', '/', '%', '...', ':'
        ],

        symbols: /\.\.\.|--|\+\+|&&|\|\||==|!=|>=|<=|[=><!+\-*/(){}\[\]\.:]/,

        escapes: /\\(?:[bfnrt\\"']|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

        tokenizer: {
            root: [
                // Identifiers and keywords
                [/[a-zA-Z_][\w_]*/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@literals': 'keyword.literal',
                        '@default': 'identifier'
                    }
                }],

                // Whitespace and comments
                {include: '@whitespace'},

                // Object literals
                [/\{/, '@brackets', '@object_literal'],

                // Delimiters (comma, semicolon)
                [/[;,]/, 'delimiter'],

                // Other brackets
                [/[()\[\]]/, '@brackets'],

                // Operators and symbols
                [/@symbols/, {
                    cases: {
                        '@operators': 'operator',
                        '@default': ''
                    }
                }],

                // Numbers
                // 1. Floats (must contain a dot or an exponent)
                [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                [/\d+[eE][\-+]?\d+/, 'number.float'],
                // 2. Integers
                [/\d+/, 'number'],

                // Strings
                [/"/, 'string', '@string'],
            ],

            object_literal: [
                // Whitespace and comments
                {include: '@whitespace'},

                // End of object literal
                [/\}/, '@brackets', '@pop'],

                // String keys
                [/"/, 'string.key', '@string_in_object'],

                // Identifiers (keys) and keywords
                [/[a-zA-Z_][\w_]*/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@literals': 'keyword.literal',
                        '@default': 'key'
                    }
                }],

                // Nested object literals
                [/\{/, '@brackets', '@object_literal'],

                // Other brackets
                [/[()\[\]]/, '@brackets'],

                // Delimiters (comma)
                [/,/, 'delimiter'],

                // Operators and symbols
                [/@symbols/, {
                    cases: {
                        '@operators': 'operator',
                        '@default': ''
                    }
                }],

                // Numbers
                [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                [/\d+[eE][\-+]?\d+/, 'number.float'],
                [/\d+/, 'number'],

                // Strings (value strings - fallback)
                [/"/, 'string', '@string'],
            ],

            string_in_object: [
                [/[^\\"]+/, 'string.key'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"/, 'string.key', '@pop']
            ],

            whitespace: [
                [/[ \t\r\n]+/, ''], // White space
                [/#.*$/, 'comment'], // Comments start with #
            ],

            string: [
                [/[^\\"]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"/, 'string', '@pop']
            ],
        },
    };
}
