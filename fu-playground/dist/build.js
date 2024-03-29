window.libfutVersion = '3.0.1-development (2d8f3fc)';
var build = (function (exports) {
    'use strict';

    // #region JSX Pragma

    /** @typedef {((props: any, ...children: any[]) => Node) | string} Tag */
    /** @typedef {Record<string, string | Function | number | boolean | null | undefined>} Props */
    /** @typedef {string | Node} Child */

    /**
     * @param {Tag} tag
     * @param {Props} props
     * @param {...Child} children
     * @returns {Node}
     */
    function h(tag, props, ...children) {
      const {
        ref,
        ..._props
      } = props || {};
      if (typeof tag === 'function') {
        return tag({
          ref,
          ...props
        }, ...children);
      }
      let element;
      let indexOfColon = tag.indexOf(':');
      if (indexOfColon !== -1 && tag.slice(0, indexOfColon) === 'svg') {
        element = document.createElementNS('http://www.w3.org/2000/svg', tag.slice(indexOfColon + 1));
      } else {
        element = document.createElement(tag);
      }
      for (let key of Object.keys(_props)) {
        const propVal = _props[key];
        if (key.startsWith('on')) {
          const capture = key.endsWith('Capture');
          const _key = capture ? key.slice(2, -7) : key.slice(2);
          element.addEventListener(_key.toLowerCase(), /** @type {EventListenerOrEventListenerObject} */propVal, capture);
        } else if (propVal != null) {
          if (key === 'className') {
            const classes = (propVal.toString(10) || '').trim().split(' ');
            for (let className of classes) {
              if (className) {
                element.classList.add(className);
              }
            }
          } else if (key === 'style') {
            if (typeof propVal === 'object') {
              for (let styleProp of Object.keys(propVal)) {
                if (propVal[styleProp]) {
                  element.style.setProperty(styleProp, propVal[styleProp]);
                }
              }
            } else {
              element.setAttribute(key, propVal.toString() || '');
            }
          } else if (typeof propVal !== 'boolean' || propVal === true) {
            element.setAttribute(key, propVal.toString() || '');
          }
        }
      }
      const _children = children && children.length > 0 && children.flat().filter(c => c instanceof Node || typeof c === 'string');
      if (_children && _children.length > 0) {
        element.append(..._children);
      }
      if (typeof ref === 'function') {
        ref(element);
      }
      return element;
    }

    // #endregion JSX Pragma

    // Generated automatically with "fut". Do not edit.
    const RegexOptions={NONE:0,IGNORE_CASE:1,MULTILINE:2,SINGLELINE:16};class FuParserHost{}const FuToken={END_OF_FILE:0,ID:1,LITERAL_LONG:2,LITERAL_DOUBLE:3,LITERAL_CHAR:4,LITERAL_STRING:5,INTERPOLATED_STRING:6,SEMICOLON:7,DOT:8,COMMA:9,LEFT_PARENTHESIS:10,RIGHT_PARENTHESIS:11,LEFT_BRACKET:12,RIGHT_BRACKET:13,LEFT_BRACE:14,RIGHT_BRACE:15,PLUS:16,MINUS:17,ASTERISK:18,SLASH:19,MOD:20,AND:21,OR:22,XOR:23,TILDE:24,SHIFT_LEFT:25,SHIFT_RIGHT:26,EQUAL:27,NOT_EQUAL:28,LESS:29,LESS_OR_EQUAL:30,GREATER:31,GREATER_OR_EQUAL:32,RIGHT_ANGLE:33,COND_AND:34,COND_OR:35,EXCLAMATION_MARK:36,HASH:37,ASSIGN:38,ADD_ASSIGN:39,SUB_ASSIGN:40,MUL_ASSIGN:41,DIV_ASSIGN:42,MOD_ASSIGN:43,AND_ASSIGN:44,OR_ASSIGN:45,XOR_ASSIGN:46,SHIFT_LEFT_ASSIGN:47,SHIFT_RIGHT_ASSIGN:48,INCREMENT:49,DECREMENT:50,QUESTION_MARK:51,COLON:52,FAT_ARROW:53,RANGE:54,DOC_REGULAR:55,DOC_BULLET:56,DOC_BLANK:57,ABSTRACT:58,ASSERT:59,BREAK:60,CASE:61,CLASS:62,CONST:63,CONTINUE:64,DEFAULT:65,DO:66,ELSE:67,ENUM:68,FALSE:69,FOR:70,FOREACH:71,IF:72,IN:73,INTERNAL:74,IS:75,LOCK_:76,NATIVE:77,NEW:78,NULL:79,OVERRIDE:80,PROTECTED:81,PUBLIC:82,RESOURCE:83,RETURN:84,SEALED:85,STATIC:86,SWITCH:87,THROW:88,THROWS:89,TRUE:90,VIRTUAL:91,VOID:92,WHEN:93,WHILE:94,END_OF_LINE:95,PRE_UNKNOWN:96,PRE_IF:97,PRE_EL_IF:98,PRE_ELSE:99,PRE_END_IF:100};const FuPreState={NOT_YET:0,ALREADY:1,ALREADY_ELSE:2};class FuLexer{#inputLength;#nextOffset;#nextChar;#host;#preSymbols=new Set();#atLineStart=true;#lineMode=false;#enableDocComments=true;parsingTypeArg=false;#preElseStack=[];setHost(host){this.#host=host;}addPreSymbol(symbol){this.#preSymbols.add(symbol);}open(filename,input,inputLength){this.filename=filename;this.input=input;this.#inputLength=inputLength;this.#nextOffset=0;this.line=1;this.column=1;this.#fillNextChar();if(this.#nextChar==65279)this.#fillNextChar();this.nextToken();}reportError(message){this.#host.reportError(this.filename,this.line,this.tokenColumn,this.line,this.column,message);}#readByte(){if(this.#nextOffset>=this.#inputLength)return -1;return this.input[this.#nextOffset++];}#readContinuationByte(hi){let b=this.#readByte();if(hi!=65533){if(b>=128&&b<=191)return (hi<<6)+b-128;this.reportError("Invalid UTF-8");}return 65533;}#fillNextChar(){this.charOffset=this.#nextOffset;let b=this.#readByte();if(b>=128){if(b<194||b>244){this.reportError("Invalid UTF-8");b=65533;}else if(b<224)b=this.#readContinuationByte(b-192);else if(b<240){b=this.#readContinuationByte(b-224);b=this.#readContinuationByte(b);}else {b=this.#readContinuationByte(b-240);b=this.#readContinuationByte(b);b=this.#readContinuationByte(b);}}this.#nextChar=b;}peekChar(){return this.#nextChar;}static isLetterOrDigit(c){if(c>=97&&c<=122)return true;if(c>=65&&c<=90)return true;if(c>=48&&c<=57)return true;return c==95;}readChar(){let c=this.#nextChar;switch(c){case 9:case 32:this.column++;break;case 10:this.line++;this.column=1;this.#atLineStart=true;break;default:this.column++;this.#atLineStart=false;break;}this.#fillNextChar();return c;}#eatChar(c){if(this.peekChar()==c){this.readChar();return true;}return false;}#skipWhitespace(){while(this.peekChar()==9||this.peekChar()==32||this.peekChar()==13)this.readChar();}#readIntegerLiteral(bits){let invalidDigit=false;let tooBig=false;let needDigit=true;for(let i=0n;;this.readChar()){let c=this.peekChar();if(c>=48&&c<=57)c-=48;else if(c>=65&&c<=90)c-=55;else if(c>=97&&c<=122)c-=87;else if(c==95){needDigit=true;continue;}else {this.longValue=i;if(invalidDigit||needDigit)this.reportError("Invalid integer");else if(tooBig)this.reportError("Integer too big");return FuToken.LITERAL_LONG;}if(c>=1<<bits)invalidDigit=true;else if(i>>BigInt(64-bits)!=0)tooBig=true;else i=(i<<BigInt(bits))+BigInt(c);needDigit=false;}}#readFloatLiteral(needDigit){let underscoreE=false;let exponent=false;for(;;){let c=this.peekChar();switch(c){case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:this.readChar();needDigit=false;break;case 69:case 101:if(exponent){this.reportError("Invalid floating-point number");return FuToken.LITERAL_DOUBLE;}if(needDigit)underscoreE=true;this.readChar();c=this.peekChar();if(c==43||c==45)this.readChar();exponent=true;needDigit=true;break;case 95:this.readChar();needDigit=true;break;default:if(underscoreE||needDigit||c>=65&&c<=90||c>=97&&c<=122)this.reportError("Invalid floating-point number");return FuToken.LITERAL_DOUBLE;}}}#readNumberLiteral(i){let leadingZero=false;let tooBig=false;for(let needDigit=false;;this.readChar()){let c=this.peekChar();switch(c){case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:c-=48;break;case 46:this.readChar();return this.#readFloatLiteral(true);case 101:case 69:return this.#readFloatLiteral(needDigit);case 95:needDigit=true;continue;default:this.longValue=i;if(leadingZero)this.reportError("Leading zeros are not permitted, octal numbers must begin with 0o");if(needDigit||c>=65&&c<=90||c>=97&&c<=122)this.reportError("Invalid integer");else if(tooBig)this.reportError("Integer too big");return FuToken.LITERAL_LONG;}if(i==0)leadingZero=true;if(i>(c<8?922337203685477580n:922337203685477579n))tooBig=true;else i=10n*i+BigInt(c);needDigit=false;}}static getEscapedChar(c){switch(c){case 34:return 34;case 39:return 39;case 92:return 92;case 110:return 10;case 114:return 13;case 116:return 9;default:return -1;}}#readCharLiteral(){let c=this.readChar();if(c<32){this.reportError("Invalid character in literal");return 65533;}if(c!=92)return c;c=FuLexer.getEscapedChar(this.readChar());if(c<0){this.reportError("Unknown escape sequence");return 65533;}return c;}readString(interpolated){for(let offset=this.charOffset;;this.#readCharLiteral()){switch(this.peekChar()){case-1:this.reportError("Unterminated string literal");return FuToken.END_OF_FILE;case 10:this.reportError("Unterminated string literal");this.stringValue="";return FuToken.LITERAL_STRING;case 34:{let endOffset=this.charOffset;this.readChar();this.stringValue=new TextDecoder().decode(this.input.subarray(offset,offset+endOffset-offset));}return FuToken.LITERAL_STRING;case 123:if(interpolated){let endOffset=this.charOffset;this.readChar();if(this.peekChar()!=123){this.stringValue=new TextDecoder().decode(this.input.subarray(offset,offset+endOffset-offset));return FuToken.INTERPOLATED_STRING;}}break;}}}getLexeme(){return new TextDecoder().decode(this.input.subarray(this.lexemeOffset,this.lexemeOffset+this.charOffset-this.lexemeOffset));}#readPreToken(){for(;;){let atLineStart=this.#atLineStart;this.tokenColumn=this.column;this.lexemeOffset=this.charOffset;let c=this.readChar();switch(c){case-1:return FuToken.END_OF_FILE;case 9:case 13:case 32:break;case 10:if(this.#lineMode)return FuToken.END_OF_LINE;break;case 35:if(!atLineStart)return FuToken.HASH;switch(this.peekChar()){case 105:this.readChar();return this.#eatChar(102)?FuToken.PRE_IF:FuToken.PRE_UNKNOWN;case 101:this.readChar();switch(this.peekChar()){case 108:this.readChar();switch(this.peekChar()){case 105:this.readChar();return this.#eatChar(102)?FuToken.PRE_EL_IF:FuToken.PRE_UNKNOWN;case 115:this.readChar();return this.#eatChar(101)?FuToken.PRE_ELSE:FuToken.PRE_UNKNOWN;default:return FuToken.PRE_UNKNOWN;}case 110:this.readChar();return this.#eatChar(100)&&this.#eatChar(105)&&this.#eatChar(102)?FuToken.PRE_END_IF:FuToken.PRE_UNKNOWN;default:return FuToken.PRE_UNKNOWN;}default:return FuToken.PRE_UNKNOWN;}case 59:return FuToken.SEMICOLON;case 46:if(this.#eatChar(46))return FuToken.RANGE;return FuToken.DOT;case 44:return FuToken.COMMA;case 40:return FuToken.LEFT_PARENTHESIS;case 41:return FuToken.RIGHT_PARENTHESIS;case 91:return FuToken.LEFT_BRACKET;case 93:return FuToken.RIGHT_BRACKET;case 123:return FuToken.LEFT_BRACE;case 125:return FuToken.RIGHT_BRACE;case 126:return FuToken.TILDE;case 63:return FuToken.QUESTION_MARK;case 58:return FuToken.COLON;case 43:if(this.#eatChar(43))return FuToken.INCREMENT;if(this.#eatChar(61))return FuToken.ADD_ASSIGN;return FuToken.PLUS;case 45:if(this.#eatChar(45))return FuToken.DECREMENT;if(this.#eatChar(61))return FuToken.SUB_ASSIGN;return FuToken.MINUS;case 42:if(this.#eatChar(61))return FuToken.MUL_ASSIGN;return FuToken.ASTERISK;case 47:if(this.#eatChar(47)){c=this.readChar();if(c==47&&this.#enableDocComments){this.#skipWhitespace();switch(this.peekChar()){case 10:return FuToken.DOC_BLANK;case 42:this.readChar();this.#skipWhitespace();return FuToken.DOC_BULLET;default:return FuToken.DOC_REGULAR;}}while(c!=10&&c>=0)c=this.readChar();if(c==10&&this.#lineMode)return FuToken.END_OF_LINE;break;}if(this.#eatChar(42)){let startLine=this.line;do{c=this.readChar();if(c<0){this.reportError(`Unterminated multi-line comment, started in line ${startLine}`);return FuToken.END_OF_FILE;}}while(c!=42||this.peekChar()!=47);this.readChar();break;}if(this.#eatChar(61))return FuToken.DIV_ASSIGN;return FuToken.SLASH;case 37:if(this.#eatChar(61))return FuToken.MOD_ASSIGN;return FuToken.MOD;case 38:if(this.#eatChar(38))return FuToken.COND_AND;if(this.#eatChar(61))return FuToken.AND_ASSIGN;return FuToken.AND;case 124:if(this.#eatChar(124))return FuToken.COND_OR;if(this.#eatChar(61))return FuToken.OR_ASSIGN;return FuToken.OR;case 94:if(this.#eatChar(61))return FuToken.XOR_ASSIGN;return FuToken.XOR;case 61:if(this.#eatChar(61))return FuToken.EQUAL;if(this.#eatChar(62))return FuToken.FAT_ARROW;return FuToken.ASSIGN;case 33:if(this.#eatChar(61))return FuToken.NOT_EQUAL;return FuToken.EXCLAMATION_MARK;case 60:if(this.#eatChar(60)){if(this.#eatChar(61))return FuToken.SHIFT_LEFT_ASSIGN;return FuToken.SHIFT_LEFT;}if(this.#eatChar(61))return FuToken.LESS_OR_EQUAL;return FuToken.LESS;case 62:if(this.parsingTypeArg)return FuToken.RIGHT_ANGLE;if(this.#eatChar(62)){if(this.#eatChar(61))return FuToken.SHIFT_RIGHT_ASSIGN;return FuToken.SHIFT_RIGHT;}if(this.#eatChar(61))return FuToken.GREATER_OR_EQUAL;return FuToken.GREATER;case 39:if(this.peekChar()==39){this.reportError("Empty character literal");this.longValue=0n;}else this.longValue=BigInt(this.#readCharLiteral());if(!this.#eatChar(39))this.reportError("Unterminated character literal");return FuToken.LITERAL_CHAR;case 34:return this.readString(false);case 36:if(this.#eatChar(34))return this.readString(true);this.reportError("Expected interpolated string");break;case 48:switch(this.peekChar()){case 66:case 98:this.readChar();return this.#readIntegerLiteral(1);case 79:case 111:this.readChar();return this.#readIntegerLiteral(3);case 88:case 120:this.readChar();return this.#readIntegerLiteral(4);default:return this.#readNumberLiteral(0n);}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.#readNumberLiteral(BigInt(c-48));default:if(!FuLexer.isLetterOrDigit(c)){this.reportError("Invalid character");continue;}while(FuLexer.isLetterOrDigit(this.peekChar()))this.readChar();this.stringValue=this.getLexeme();switch(this.stringValue){case"abstract":return FuToken.ABSTRACT;case"assert":return FuToken.ASSERT;case"break":return FuToken.BREAK;case"case":return FuToken.CASE;case"class":return FuToken.CLASS;case"const":return FuToken.CONST;case"continue":return FuToken.CONTINUE;case"default":return FuToken.DEFAULT;case"do":return FuToken.DO;case"else":return FuToken.ELSE;case"enum":return FuToken.ENUM;case"false":return FuToken.FALSE;case"for":return FuToken.FOR;case"foreach":return FuToken.FOREACH;case"if":return FuToken.IF;case"in":return FuToken.IN;case"internal":return FuToken.INTERNAL;case"is":return FuToken.IS;case"lock":return FuToken.LOCK_;case"native":return FuToken.NATIVE;case"new":return FuToken.NEW;case"null":return FuToken.NULL;case"override":return FuToken.OVERRIDE;case"protected":return FuToken.PROTECTED;case"public":return FuToken.PUBLIC;case"resource":return FuToken.RESOURCE;case"return":return FuToken.RETURN;case"sealed":return FuToken.SEALED;case"static":return FuToken.STATIC;case"switch":return FuToken.SWITCH;case"throw":return FuToken.THROW;case"throws":return FuToken.THROWS;case"true":return FuToken.TRUE;case"virtual":return FuToken.VIRTUAL;case"void":return FuToken.VOID;case"when":return FuToken.WHEN;case"while":return FuToken.WHILE;default:return FuToken.ID;}}}}#nextPreToken(){this.currentToken=this.#readPreToken();}see(token){return this.currentToken==token;}static tokenToString(token){switch(token){case FuToken.END_OF_FILE:return "end-of-file";case FuToken.ID:return "identifier";case FuToken.LITERAL_LONG:return "integer constant";case FuToken.LITERAL_DOUBLE:return "floating-point constant";case FuToken.LITERAL_CHAR:return "character constant";case FuToken.LITERAL_STRING:return "string constant";case FuToken.INTERPOLATED_STRING:return "interpolated string";case FuToken.SEMICOLON:return "';'";case FuToken.DOT:return "'.'";case FuToken.COMMA:return "','";case FuToken.LEFT_PARENTHESIS:return "'('";case FuToken.RIGHT_PARENTHESIS:return "')'";case FuToken.LEFT_BRACKET:return "'['";case FuToken.RIGHT_BRACKET:return "']'";case FuToken.LEFT_BRACE:return "'{'";case FuToken.RIGHT_BRACE:return "'}'";case FuToken.PLUS:return "'+'";case FuToken.MINUS:return "'-'";case FuToken.ASTERISK:return "'*'";case FuToken.SLASH:return "'/'";case FuToken.MOD:return "'%'";case FuToken.AND:return "'&'";case FuToken.OR:return "'|'";case FuToken.XOR:return "'^'";case FuToken.TILDE:return "'~'";case FuToken.SHIFT_LEFT:return "'<<'";case FuToken.SHIFT_RIGHT:return "'>>'";case FuToken.EQUAL:return "'=='";case FuToken.NOT_EQUAL:return "'!='";case FuToken.LESS:return "'<'";case FuToken.LESS_OR_EQUAL:return "'<='";case FuToken.GREATER:return "'>'";case FuToken.GREATER_OR_EQUAL:return "'>='";case FuToken.RIGHT_ANGLE:return "'>'";case FuToken.COND_AND:return "'&&'";case FuToken.COND_OR:return "'||'";case FuToken.EXCLAMATION_MARK:return "'!'";case FuToken.HASH:return "'#'";case FuToken.ASSIGN:return "'='";case FuToken.ADD_ASSIGN:return "'+='";case FuToken.SUB_ASSIGN:return "'-='";case FuToken.MUL_ASSIGN:return "'*='";case FuToken.DIV_ASSIGN:return "'/='";case FuToken.MOD_ASSIGN:return "'%='";case FuToken.AND_ASSIGN:return "'&='";case FuToken.OR_ASSIGN:return "'|='";case FuToken.XOR_ASSIGN:return "'^='";case FuToken.SHIFT_LEFT_ASSIGN:return "'<<='";case FuToken.SHIFT_RIGHT_ASSIGN:return "'>>='";case FuToken.INCREMENT:return "'++'";case FuToken.DECREMENT:return "'--'";case FuToken.QUESTION_MARK:return "'?'";case FuToken.COLON:return "':'";case FuToken.FAT_ARROW:return "'=>'";case FuToken.RANGE:return "'..'";case FuToken.DOC_REGULAR:case FuToken.DOC_BULLET:case FuToken.DOC_BLANK:return "'///'";case FuToken.ABSTRACT:return "'abstract'";case FuToken.ASSERT:return "'assert'";case FuToken.BREAK:return "'break'";case FuToken.CASE:return "'case'";case FuToken.CLASS:return "'class'";case FuToken.CONST:return "'const'";case FuToken.CONTINUE:return "'continue'";case FuToken.DEFAULT:return "'default'";case FuToken.DO:return "'do'";case FuToken.ELSE:return "'else'";case FuToken.ENUM:return "'enum'";case FuToken.FALSE:return "'false'";case FuToken.FOR:return "'for'";case FuToken.FOREACH:return "'foreach'";case FuToken.IF:return "'if'";case FuToken.IN:return "'in'";case FuToken.INTERNAL:return "'internal'";case FuToken.IS:return "'is'";case FuToken.LOCK_:return "'lock'";case FuToken.NATIVE:return "'native'";case FuToken.NEW:return "'new'";case FuToken.NULL:return "'null'";case FuToken.OVERRIDE:return "'override'";case FuToken.PROTECTED:return "'protected'";case FuToken.PUBLIC:return "'public'";case FuToken.RESOURCE:return "'resource'";case FuToken.RETURN:return "'return'";case FuToken.SEALED:return "'sealed'";case FuToken.STATIC:return "'static'";case FuToken.SWITCH:return "'switch'";case FuToken.THROW:return "'throw'";case FuToken.THROWS:return "'throws'";case FuToken.TRUE:return "'true'";case FuToken.VIRTUAL:return "'virtual'";case FuToken.VOID:return "'void'";case FuToken.WHEN:return "'when'";case FuToken.WHILE:return "'while'";case FuToken.END_OF_LINE:return "end-of-line";case FuToken.PRE_UNKNOWN:return "unknown preprocessor directive";case FuToken.PRE_IF:return "'#if'";case FuToken.PRE_EL_IF:return "'#elif'";case FuToken.PRE_ELSE:return "'#else'";case FuToken.PRE_END_IF:return "'#endif'";default:throw new Error();}}check(expected){if(this.see(expected))return true;this.reportError(`Expected ${FuLexer.tokenToString(expected)}, got ${FuLexer.tokenToString(this.currentToken)}`);return false;}#eatPre(token){if(this.see(token)){this.#nextPreToken();return true;}return false;}#parsePrePrimary(){if(this.#eatPre(FuToken.EXCLAMATION_MARK))return !this.#parsePrePrimary();if(this.#eatPre(FuToken.LEFT_PARENTHESIS)){let result=this.#parsePreOr();this.check(FuToken.RIGHT_PARENTHESIS);this.#nextPreToken();return result;}if(this.see(FuToken.ID)){let result=this.#preSymbols.has(this.stringValue);this.#nextPreToken();return result;}if(this.#eatPre(FuToken.FALSE))return false;if(this.#eatPre(FuToken.TRUE))return true;this.reportError("Invalid preprocessor expression");return false;}#parsePreEquality(){let result=this.#parsePrePrimary();for(;;){if(this.#eatPre(FuToken.EQUAL))result=result==this.#parsePrePrimary();else if(this.#eatPre(FuToken.NOT_EQUAL))result=result!=this.#parsePrePrimary();else return result;}}#parsePreAnd(){let result=this.#parsePreEquality();while(this.#eatPre(FuToken.COND_AND))if(!this.#parsePreEquality())result=false;return result;}#parsePreOr(){let result=this.#parsePreAnd();while(this.#eatPre(FuToken.COND_OR))if(this.#parsePreAnd())result=true;return result;}#parsePreExpr(){this.#lineMode=true;this.#nextPreToken();let result=this.#parsePreOr();this.check(FuToken.END_OF_LINE);this.#lineMode=false;return result;}#expectEndOfLine(directive){this.#lineMode=true;let token=this.#readPreToken();if(token!=FuToken.END_OF_LINE&&token!=FuToken.END_OF_FILE)this.reportError(`Unexpected characters after '${directive}'`);this.#lineMode=false;}#popPreElse(directive){if(this.#preElseStack.length==0){this.reportError(`'${directive}' with no matching '#if'`);return false;}if(this.#preElseStack.pop()&&directive!="#endif")this.reportError(`'${directive}' after '#else'`);return true;}#skipUnmet(state){this.#enableDocComments=false;for(;;){switch(this.#readPreToken()){case FuToken.END_OF_FILE:this.reportError("Expected '#endif', got end-of-file");return;case FuToken.PRE_IF:this.#parsePreExpr();this.#skipUnmet(FuPreState.ALREADY);break;case FuToken.PRE_EL_IF:if(state==FuPreState.ALREADY_ELSE)this.reportError("'#elif' after '#else'");if(this.#parsePreExpr()&&state==FuPreState.NOT_YET){this.#preElseStack.push(false);return;}break;case FuToken.PRE_ELSE:if(state==FuPreState.ALREADY_ELSE)this.reportError("'#else' after '#else'");this.#expectEndOfLine("#else");if(state==FuPreState.NOT_YET){this.#preElseStack.push(true);return;}state=FuPreState.ALREADY_ELSE;break;case FuToken.PRE_END_IF:this.#expectEndOfLine("#endif");return;}}}#readToken(){for(;;){this.#enableDocComments=true;let token=this.#readPreToken();let matched;switch(token){case FuToken.END_OF_FILE:if(this.#preElseStack.length!=0)this.reportError("Expected '#endif', got end-of-file");return FuToken.END_OF_FILE;case FuToken.PRE_IF:if(this.#parsePreExpr())this.#preElseStack.push(false);else this.#skipUnmet(FuPreState.NOT_YET);break;case FuToken.PRE_EL_IF:matched=this.#popPreElse("#elif");this.#parsePreExpr();if(matched)this.#skipUnmet(FuPreState.ALREADY);break;case FuToken.PRE_ELSE:matched=this.#popPreElse("#else");this.#expectEndOfLine("#else");if(matched)this.#skipUnmet(FuPreState.ALREADY_ELSE);break;case FuToken.PRE_END_IF:this.#popPreElse("#endif");this.#expectEndOfLine("#endif");break;default:return token;}}}nextToken(){let token=this.currentToken;this.currentToken=this.#readToken();return token;}eat(token){if(this.see(token)){this.nextToken();return true;}return false;}expect(expected){let found=this.check(expected);this.nextToken();return found;}expectOrSkip(expected){if(this.check(expected))this.nextToken();else {do this.nextToken();while(!this.see(FuToken.END_OF_FILE)&&!this.eat(expected));}}}const FuVisibility={PRIVATE:0,INTERNAL:1,PROTECTED:2,PUBLIC:3,NUMERIC_ELEMENT_TYPE:4,FINAL_VALUE_TYPE:5};const FuCallType={STATIC:0,NORMAL:1,ABSTRACT:2,VIRTUAL:3,OVERRIDE:4,SEALED:5};const FuPriority={STATEMENT:0,ARGUMENT:1,ASSIGN:2,SELECT:3,SELECT_COND:4,COND_OR:5,COND_AND:6,OR:7,XOR:8,AND:9,EQUALITY:10,REL:11,SHIFT:12,ADD:13,MUL:14,PRIMARY:15};const FuId={NONE:0,VOID_TYPE:1,NULL_TYPE:2,BASE_PTR:3,TYPE_PARAM0:4,TYPE_PARAM0_NOT_FINAL:5,TYPE_PARAM0_PREDICATE:6,S_BYTE_RANGE:7,BYTE_RANGE:8,SHORT_RANGE:9,U_SHORT_RANGE:10,INT_TYPE:11,LONG_TYPE:12,FLOAT_TYPE:13,DOUBLE_TYPE:14,FLOAT_INT_TYPE:15,BOOL_TYPE:16,STRING_CLASS:17,STRING_PTR_TYPE:18,STRING_STORAGE_TYPE:19,ARRAY_PTR_CLASS:20,ARRAY_STORAGE_CLASS:21,LIST_CLASS:22,QUEUE_CLASS:23,STACK_CLASS:24,HASH_SET_CLASS:25,SORTED_SET_CLASS:26,DICTIONARY_CLASS:27,SORTED_DICTIONARY_CLASS:28,ORDERED_DICTIONARY_CLASS:29,TEXT_WRITER_CLASS:30,STRING_WRITER_CLASS:31,REGEX_OPTIONS_ENUM:32,REGEX_CLASS:33,MATCH_CLASS:34,LOCK_CLASS:35,STRING_LENGTH:36,ARRAY_LENGTH:37,CONSOLE_ERROR:38,CLASS_TO_STRING:39,MATCH_START:40,MATCH_END:41,MATCH_LENGTH:42,MATCH_VALUE:43,MATH_NA_N:44,MATH_NEGATIVE_INFINITY:45,MATH_POSITIVE_INFINITY:46,ENUM_FROM_INT:47,ENUM_HAS_FLAG:48,INT_TRY_PARSE:49,LONG_TRY_PARSE:50,DOUBLE_TRY_PARSE:51,STRING_CONTAINS:52,STRING_ENDS_WITH:53,STRING_INDEX_OF:54,STRING_LAST_INDEX_OF:55,STRING_REPLACE:56,STRING_STARTS_WITH:57,STRING_SUBSTRING:58,ARRAY_BINARY_SEARCH_ALL:59,ARRAY_BINARY_SEARCH_PART:60,ARRAY_CONTAINS:61,ARRAY_COPY_TO:62,ARRAY_FILL_ALL:63,ARRAY_FILL_PART:64,ARRAY_SORT_ALL:65,ARRAY_SORT_PART:66,LIST_ADD:67,LIST_ADD_RANGE:68,LIST_ALL:69,LIST_ANY:70,LIST_CLEAR:71,LIST_CONTAINS:72,LIST_COPY_TO:73,LIST_COUNT:74,LIST_INDEX_OF:75,LIST_INSERT:76,LIST_LAST:77,LIST_REMOVE_AT:78,LIST_REMOVE_RANGE:79,LIST_SORT_ALL:80,LIST_SORT_PART:81,QUEUE_CLEAR:82,QUEUE_COUNT:83,QUEUE_DEQUEUE:84,QUEUE_ENQUEUE:85,QUEUE_PEEK:86,STACK_CLEAR:87,STACK_COUNT:88,STACK_PEEK:89,STACK_PUSH:90,STACK_POP:91,HASH_SET_ADD:92,HASH_SET_CLEAR:93,HASH_SET_CONTAINS:94,HASH_SET_COUNT:95,HASH_SET_REMOVE:96,SORTED_SET_ADD:97,SORTED_SET_CLEAR:98,SORTED_SET_CONTAINS:99,SORTED_SET_COUNT:100,SORTED_SET_REMOVE:101,DICTIONARY_ADD:102,DICTIONARY_CLEAR:103,DICTIONARY_CONTAINS_KEY:104,DICTIONARY_COUNT:105,DICTIONARY_REMOVE:106,SORTED_DICTIONARY_CLEAR:107,SORTED_DICTIONARY_CONTAINS_KEY:108,SORTED_DICTIONARY_COUNT:109,SORTED_DICTIONARY_REMOVE:110,ORDERED_DICTIONARY_CLEAR:111,ORDERED_DICTIONARY_CONTAINS_KEY:112,ORDERED_DICTIONARY_COUNT:113,ORDERED_DICTIONARY_REMOVE:114,TEXT_WRITER_WRITE:115,TEXT_WRITER_WRITE_CHAR:116,TEXT_WRITER_WRITE_CODE_POINT:117,TEXT_WRITER_WRITE_LINE:118,CONSOLE_WRITE:119,CONSOLE_WRITE_LINE:120,STRING_WRITER_CLEAR:121,STRING_WRITER_TO_STRING:122,U_T_F8_GET_BYTE_COUNT:123,U_T_F8_GET_BYTES:124,U_T_F8_GET_STRING:125,ENVIRONMENT_GET_ENVIRONMENT_VARIABLE:126,REGEX_COMPILE:127,REGEX_ESCAPE:128,REGEX_IS_MATCH_STR:129,REGEX_IS_MATCH_REGEX:130,MATCH_FIND_STR:131,MATCH_FIND_REGEX:132,MATCH_GET_CAPTURE:133,MATH_METHOD:134,MATH_ABS:135,MATH_CEILING:136,MATH_CLAMP:137,MATH_FUSED_MULTIPLY_ADD:138,MATH_IS_FINITE:139,MATH_IS_INFINITY:140,MATH_IS_NA_N:141,MATH_LOG2:142,MATH_MAX_INT:143,MATH_MAX_DOUBLE:144,MATH_MIN_INT:145,MATH_MIN_DOUBLE:146,MATH_ROUND:147,MATH_TRUNCATE:148};class FuDocInline{}class FuDocText extends FuDocInline{}class FuDocCode extends FuDocInline{}class FuDocLine extends FuDocInline{}class FuDocBlock{}class FuDocPara extends FuDocBlock{children=[];}class FuDocList extends FuDocBlock{items=[];}class FuCodeDoc{summary=new FuDocPara();details=[];}class FuVisitor{visitOptionalStatement(statement){if(statement!=null)statement.acceptStatement(this);}}class FuStatement{}class FuExpr extends FuStatement{completesNormally(){return true;}toString(){throw new Error();}isIndexing(){return false;}isLiteralZero(){return false;}isConstEnum(){return false;}intValue(){throw new Error();}accept(visitor,parent){throw new Error();}acceptStatement(visitor){visitor.visitExpr(this);}isReferenceTo(symbol){return false;}}class FuSymbol extends FuExpr{id=FuId.NONE;documentation=null;toString(){return this.name;}}class FuScope extends FuSymbol{dict={};first=null;#last;count(){return Object.keys(this.dict).length;}firstParameter(){const result=this.first;return result;}getContainer(){for(let scope=this;scope!=null;scope=scope.parent){let container;if((container=scope)instanceof FuContainerType)return container;}throw new Error();}contains(symbol){return this.dict.hasOwnProperty(symbol.name);}tryLookup(name,global){for(let scope=this;scope!=null&&(global||!(scope instanceof FuProgram||scope instanceof FuSystem));scope=scope.parent){if(scope.dict.hasOwnProperty(name))return scope.dict[name];}return null;}add(symbol){this.dict[symbol.name]=symbol;symbol.next=null;symbol.parent=this;if(this.first==null)this.first=symbol;else this.#last.next=symbol;this.#last=symbol;}encloses(symbol){for(let scope=symbol.parent;scope!=null;scope=scope.parent){if(scope==this)return true;}return false;}}class FuAggregateInitializer extends FuExpr{items=[];accept(visitor,parent){visitor.visitAggregateInitializer(this);}}class FuLiteral extends FuExpr{getLiteralString(){throw new Error();}}class FuLiteralNull extends FuLiteral{isDefaultValue(){return true;}accept(visitor,parent){visitor.visitLiteralNull();}toString(){return "null";}}class FuLiteralFalse extends FuLiteral{isDefaultValue(){return true;}accept(visitor,parent){visitor.visitLiteralFalse();}toString(){return "false";}}class FuLiteralTrue extends FuLiteral{isDefaultValue(){return false;}accept(visitor,parent){visitor.visitLiteralTrue();}toString(){return "true";}}class FuLiteralLong extends FuLiteral{isLiteralZero(){return this.value==0;}intValue(){return Number(this.value);}isDefaultValue(){return this.value==0;}accept(visitor,parent){visitor.visitLiteralLong(this.value);}getLiteralString(){return `${this.value}`;}toString(){return `${this.value}`;}}class FuLiteralChar extends FuLiteralLong{static new(value,line){return Object.assign(new FuLiteralChar(),{line:line,type:FuRangeType.new(value,value),value:BigInt(value)});}accept(visitor,parent){visitor.visitLiteralChar(Number(this.value));}}class FuLiteralDouble extends FuLiteral{isDefaultValue(){return this.value==0&&1.0/this.value>0;}accept(visitor,parent){visitor.visitLiteralDouble(this.value);}getLiteralString(){return `${this.value}`;}toString(){return `${this.value}`;}}class FuLiteralString extends FuLiteral{isDefaultValue(){return false;}accept(visitor,parent){visitor.visitLiteralString(this.value);}getLiteralString(){return this.value;}toString(){return `\"${this.value}\"`;}getAsciiLength(){let length=0;let escaped=false;for(const c of this.value){if(c.codePointAt(0)<0||c.codePointAt(0)>127)return -1;if(!escaped&&c.codePointAt(0)==92)escaped=true;else {length++;escaped=false;}}return length;}getAsciiAt(i){let escaped=false;for(const c of this.value){if(c.codePointAt(0)<0||c.codePointAt(0)>127)return -1;if(!escaped&&c.codePointAt(0)==92)escaped=true;else if(i==0)return escaped?FuLexer.getEscapedChar(c.codePointAt(0)):c.codePointAt(0);else {i--;escaped=false;}}return -1;}getOneAscii(){switch(this.value.length){case 1:let c=this.value.charCodeAt(0);return c>=0&&c<=127?c:-1;case 2:return this.value.charCodeAt(0)==92?FuLexer.getEscapedChar(this.value.charCodeAt(1)):-1;default:return -1;}}}class FuInterpolatedPart{}class FuInterpolatedString extends FuExpr{parts=[];addPart(prefix,arg,widthExpr=null,format=32,precision=-1){this.parts.push(new FuInterpolatedPart());let part=this.parts.at(-1);part.prefix=prefix;part.argument=arg;part.widthExpr=widthExpr;part.format=format;part.precision=precision;}accept(visitor,parent){visitor.visitInterpolatedString(this,parent);}}class FuImplicitEnumValue extends FuExpr{intValue(){return this.value;}}class FuSymbolReference extends FuExpr{isConstEnum(){return this.symbol.parent instanceof FuEnum;}intValue(){const konst=this.symbol;return konst.value.intValue();}accept(visitor,parent){visitor.visitSymbolReference(this,parent);}isReferenceTo(symbol){return this.symbol==symbol;}toString(){return this.left!=null?`${this.left}.${this.name}`:this.name;}}class FuUnaryExpr extends FuExpr{}class FuPrefixExpr extends FuUnaryExpr{isConstEnum(){return this.type instanceof FuEnumFlags&&this.inner.isConstEnum();}intValue(){console.assert(this.op==FuToken.TILDE);return ~this.inner.intValue();}accept(visitor,parent){visitor.visitPrefixExpr(this,parent);}}class FuPostfixExpr extends FuUnaryExpr{accept(visitor,parent){visitor.visitPostfixExpr(this,parent);}}class FuBinaryExpr extends FuExpr{isIndexing(){return this.op==FuToken.LEFT_BRACKET;}isConstEnum(){switch(this.op){case FuToken.AND:case FuToken.OR:case FuToken.XOR:return this.type instanceof FuEnumFlags&&this.left.isConstEnum()&&this.right.isConstEnum();default:return false;}}intValue(){switch(this.op){case FuToken.AND:return this.left.intValue()&this.right.intValue();case FuToken.OR:return this.left.intValue()|this.right.intValue();case FuToken.XOR:return this.left.intValue()^this.right.intValue();default:throw new Error();}}accept(visitor,parent){visitor.visitBinaryExpr(this,parent);}isRel(){switch(this.op){case FuToken.EQUAL:case FuToken.NOT_EQUAL:case FuToken.LESS:case FuToken.LESS_OR_EQUAL:case FuToken.GREATER:case FuToken.GREATER_OR_EQUAL:return true;default:return false;}}isAssign(){switch(this.op){case FuToken.ASSIGN:case FuToken.ADD_ASSIGN:case FuToken.SUB_ASSIGN:case FuToken.MUL_ASSIGN:case FuToken.DIV_ASSIGN:case FuToken.MOD_ASSIGN:case FuToken.SHIFT_LEFT_ASSIGN:case FuToken.SHIFT_RIGHT_ASSIGN:case FuToken.AND_ASSIGN:case FuToken.OR_ASSIGN:case FuToken.XOR_ASSIGN:return true;default:return false;}}getOpString(){switch(this.op){case FuToken.PLUS:return "+";case FuToken.MINUS:return "-";case FuToken.ASTERISK:return "*";case FuToken.SLASH:return "/";case FuToken.MOD:return "%";case FuToken.SHIFT_LEFT:return "<<";case FuToken.SHIFT_RIGHT:return ">>";case FuToken.LESS:return "<";case FuToken.LESS_OR_EQUAL:return "<=";case FuToken.GREATER:return ">";case FuToken.GREATER_OR_EQUAL:return ">=";case FuToken.EQUAL:return "==";case FuToken.NOT_EQUAL:return "!=";case FuToken.AND:return "&";case FuToken.OR:return "|";case FuToken.XOR:return "^";case FuToken.COND_AND:return "&&";case FuToken.COND_OR:return "||";case FuToken.ASSIGN:return "=";case FuToken.ADD_ASSIGN:return "+=";case FuToken.SUB_ASSIGN:return "-=";case FuToken.MUL_ASSIGN:return "*=";case FuToken.DIV_ASSIGN:return "/=";case FuToken.MOD_ASSIGN:return "%=";case FuToken.SHIFT_LEFT_ASSIGN:return "<<=";case FuToken.SHIFT_RIGHT_ASSIGN:return ">>=";case FuToken.AND_ASSIGN:return "&=";case FuToken.OR_ASSIGN:return "|=";case FuToken.XOR_ASSIGN:return "^=";default:throw new Error();}}toString(){return this.op==FuToken.LEFT_BRACKET?`${this.left}[${this.right}]`:`(${this.left} ${this.getOpString()} ${this.right})`;}}class FuSelectExpr extends FuExpr{accept(visitor,parent){visitor.visitSelectExpr(this,parent);}toString(){return `(${this.cond} ? ${this.onTrue} : ${this.onFalse})`;}}class FuCallExpr extends FuExpr{arguments=[];accept(visitor,parent){visitor.visitCallExpr(this,parent);}}class FuLambdaExpr extends FuScope{accept(visitor,parent){visitor.visitLambdaExpr(this);}}class FuCondCompletionStatement extends FuScope{#completesNormallyValue;completesNormally(){return this.#completesNormallyValue;}setCompletesNormally(value){this.#completesNormallyValue=value;}}class FuBlock extends FuCondCompletionStatement{statements=[];acceptStatement(visitor){visitor.visitBlock(this);}}class FuAssert extends FuStatement{message=null;completesNormally(){return !(this.cond instanceof FuLiteralFalse);}acceptStatement(visitor){visitor.visitAssert(this);}}class FuLoop extends FuCondCompletionStatement{hasBreak=false;}class FuBreak extends FuStatement{completesNormally(){return false;}acceptStatement(visitor){visitor.visitBreak(this);}}class FuContinue extends FuStatement{completesNormally(){return false;}acceptStatement(visitor){visitor.visitContinue(this);}}class FuDoWhile extends FuLoop{acceptStatement(visitor){visitor.visitDoWhile(this);}}class FuFor extends FuLoop{isRange=false;acceptStatement(visitor){visitor.visitFor(this);}}class FuForeach extends FuLoop{acceptStatement(visitor){visitor.visitForeach(this);}getVar(){return this.firstParameter();}getValueVar(){return this.firstParameter().nextParameter();}}class FuIf extends FuCondCompletionStatement{acceptStatement(visitor){visitor.visitIf(this);}}class FuLock extends FuStatement{completesNormally(){return this.body.completesNormally();}acceptStatement(visitor){visitor.visitLock(this);}}class FuNative extends FuStatement{completesNormally(){return true;}acceptStatement(visitor){visitor.visitNative(this);}}class FuReturn extends FuStatement{completesNormally(){return false;}acceptStatement(visitor){visitor.visitReturn(this);}}class FuCase{values=[];body=[];}class FuSwitch extends FuCondCompletionStatement{cases=[];defaultBody=[];acceptStatement(visitor){visitor.visitSwitch(this);}isTypeMatching(){let klass;return (klass=this.value.type)instanceof FuClassType&&klass.class.id!=FuId.STRING_CLASS;}hasWhen(){return this.cases.some(kase=>kase.values.some(value=>{let when1;return (when1=value)instanceof FuBinaryExpr&&when1.op==FuToken.WHEN;}));}static lengthWithoutTrailingBreak(body){let length=body.length;if(length>0&&body[length-1]instanceof FuBreak)length--;return length;}hasDefault(){return FuSwitch.lengthWithoutTrailingBreak(this.defaultBody)>0;}static#hasBreak(statement){if(statement instanceof FuBreak)return true;else if(statement instanceof FuIf){const ifStatement=statement;return FuSwitch.#hasBreak(ifStatement.onTrue)||ifStatement.onFalse!=null&&FuSwitch.#hasBreak(ifStatement.onFalse);}else if(statement instanceof FuBlock){const block=statement;return block.statements.some(child=>FuSwitch.#hasBreak(child));}else return false;}static hasEarlyBreak(body){let length=FuSwitch.lengthWithoutTrailingBreak(body);for(let i=0;i<length;i++){if(FuSwitch.#hasBreak(body[i]))return true;}return false;}static#listHasContinue(statements){return statements.some(statement=>FuSwitch.#hasContinue(statement));}static#hasContinue(statement){if(statement instanceof FuContinue)return true;else if(statement instanceof FuIf){const ifStatement=statement;return FuSwitch.#hasContinue(ifStatement.onTrue)||ifStatement.onFalse!=null&&FuSwitch.#hasContinue(ifStatement.onFalse);}else if(statement instanceof FuSwitch){const switchStatement=statement;return switchStatement.cases.some(kase=>FuSwitch.#listHasContinue(kase.body))||FuSwitch.#listHasContinue(switchStatement.defaultBody);}else if(statement instanceof FuBlock){const block=statement;return FuSwitch.#listHasContinue(block.statements);}else return false;}static hasEarlyBreakAndContinue(body){return FuSwitch.hasEarlyBreak(body)&&FuSwitch.#listHasContinue(body);}}class FuThrow extends FuStatement{completesNormally(){return false;}acceptStatement(visitor){visitor.visitThrow(this);}}class FuWhile extends FuLoop{acceptStatement(visitor){visitor.visitWhile(this);}}class FuParameters extends FuScope{}class FuType extends FuScope{nullable=false;getArraySuffix(){return "";}isAssignableFrom(right){return this==right;}equalsType(right){return this==right;}isArray(){return false;}isFinal(){return false;}getBaseType(){return this;}getStorageType(){return this;}asClassType(){const klass=this;return klass;}}class FuNumericType extends FuType{}class FuIntegerType extends FuNumericType{isAssignableFrom(right){return right instanceof FuIntegerType||right.id==FuId.FLOAT_INT_TYPE;}}class FuRangeType extends FuIntegerType{static#addMinMaxValue(target,name,value){let type=target.min==target.max?target:Object.assign(new FuRangeType(),{min:value,max:value});target.add(Object.assign(new FuConst(),{visibility:FuVisibility.PUBLIC,name:name,value:Object.assign(new FuLiteralLong(),{type:type,value:BigInt(value)}),visitStatus:FuVisitStatus.DONE}));}static new(min,max){console.assert(min<=max);let result=Object.assign(new FuRangeType(),{id:min>=0&&max<=255?FuId.BYTE_RANGE:min>=-128&&max<=127?FuId.S_BYTE_RANGE:min>=-32768&&max<=32767?FuId.SHORT_RANGE:min>=0&&max<=65535?FuId.U_SHORT_RANGE:FuId.INT_TYPE,min:min,max:max});FuRangeType.#addMinMaxValue(result,"MinValue",min);FuRangeType.#addMinMaxValue(result,"MaxValue",max);return result;}toString(){return this.min==this.max?`${this.min}`:`(${this.min} .. ${this.max})`;}isAssignableFrom(right){if(right instanceof FuRangeType){const range=right;return this.min<=range.max&&this.max>=range.min;}else if(right instanceof FuIntegerType)return true;else return right.id==FuId.FLOAT_INT_TYPE;}equalsType(right){let that;return (that=right)instanceof FuRangeType&&this.min==that.min&&this.max==that.max;}static getMask(v){v|=v>>1;v|=v>>2;v|=v>>4;v|=v>>8;v|=v>>16;return v;}getVariableBits(){return FuRangeType.getMask(this.min^this.max);}}class FuFloatingType extends FuNumericType{isAssignableFrom(right){return right instanceof FuNumericType;}}class FuNamedValue extends FuSymbol{isAssignableStorage(){return this.type instanceof FuStorageType&&!(this.type instanceof FuArrayStorageType)&&this.value instanceof FuLiteralNull;}}class FuMember extends FuNamedValue{constructor(){super();}}class FuVar extends FuNamedValue{isAssigned=false;static new(type,name,defaultValue=null){return Object.assign(new FuVar(),{type:type,name:name,value:defaultValue});}accept(visitor,parent){visitor.visitVar(this);}nextParameter(){const def=this.next;return def;}}const FuVisitStatus={NOT_YET:0,IN_PROGRESS:1,DONE:2};class FuConst extends FuMember{acceptStatement(visitor){visitor.visitConst(this);}isStatic(){return true;}}class FuField extends FuMember{isStatic(){return false;}}class FuProperty extends FuMember{isStatic(){return false;}static new(type,id,name){return Object.assign(new FuProperty(),{visibility:FuVisibility.PUBLIC,type:type,id:id,name:name});}}class FuStaticProperty extends FuMember{isStatic(){return true;}static new(type,id,name){return Object.assign(new FuStaticProperty(),{visibility:FuVisibility.PUBLIC,type:type,id:id,name:name});}}class FuMethodBase extends FuMember{isMutator=false;isLive=false;calls=new Set();isStatic(){return false;}}class FuMethod extends FuMethodBase{parameters=new FuParameters();methodScope=new FuScope();static new(visibility,type,id,name,param0=null,param1=null,param2=null,param3=null){let result=Object.assign(new FuMethod(),{visibility:visibility,callType:FuCallType.NORMAL,type:type,id:id,name:name});if(param0!=null){result.parameters.add(param0);if(param1!=null){result.parameters.add(param1);if(param2!=null){result.parameters.add(param2);if(param3!=null)result.parameters.add(param3);}}}return result;}static newStatic(type,id,name,param0,param1=null,param2=null){let result=FuMethod.new(FuVisibility.PUBLIC,type,id,name,param0,param1,param2);result.callType=FuCallType.STATIC;return result;}static newMutator(visibility,type,id,name,param0=null,param1=null,param2=null){let result=FuMethod.new(visibility,type,id,name,param0,param1,param2);result.isMutator=true;return result;}isStatic(){return this.callType==FuCallType.STATIC;}isAbstractOrVirtual(){return this.callType==FuCallType.ABSTRACT||this.callType==FuCallType.VIRTUAL;}getDeclaringMethod(){let method=this;while(method.callType==FuCallType.OVERRIDE){const baseMethod=method.parent.parent.tryLookup(method.name,false);method=baseMethod;}return method;}isToString(){return this.name=="ToString"&&this.callType!=FuCallType.STATIC&&this.parameters.count()==0;}}class FuMethodGroup extends FuMember{constructor(){super();}methods=new Array(2);isStatic(){throw new Error();}static new(method0,method1){let result=Object.assign(new FuMethodGroup(),{visibility:method0.visibility,name:method0.name});result.methods[0]=method0;result.methods[1]=method1;return result;}}class FuContainerType extends FuType{}class FuEnum extends FuContainerType{hasExplicitValue=false;getFirstValue(){let symbol=this.first;while(!(symbol instanceof FuConst))symbol=symbol.next;return symbol;}acceptValues(visitor){let previous=null;for(let symbol=this.first;symbol!=null;symbol=symbol.next){let konst;if((konst=symbol)instanceof FuConst){visitor.visitEnumValue(konst,previous);previous=konst;}}}}class FuEnumFlags extends FuEnum{}class FuClass extends FuContainerType{constructor(){super();this.add(FuVar.new(Object.assign(new FuReadWriteClassType(),{class:this}),"this"));}typeParameterCount=0;hasSubclasses=false;baseClassName="";constArrays=[];hasBaseClass(){return this.baseClassName.length>0;}addsVirtualMethods(){for(let symbol=this.first;symbol!=null;symbol=symbol.next){let method;if((method=symbol)instanceof FuMethod&&method.isAbstractOrVirtual())return true;}return false;}static new(callType,id,name,typeParameterCount=0){return Object.assign(new FuClass(),{callType:callType,id:id,name:name,typeParameterCount:typeParameterCount});}isSameOrBaseOf(derived){while(derived!=this){let parent;if((parent=derived.parent)instanceof FuClass)derived=parent;else return false;}return true;}hasToString(){let method;return (method=this.tryLookup("ToString",false))instanceof FuMethod&&method.isToString();}addsToString(){let method;return this.dict.hasOwnProperty("ToString")&&(method=this.dict["ToString"])instanceof FuMethod&&method.isToString()&&method.callType!=FuCallType.OVERRIDE&&method.callType!=FuCallType.SEALED;}}class FuClassType extends FuType{getElementType(){return this.typeArg0;}getKeyType(){return this.typeArg0;}getValueType(){return this.typeArg1;}isArray(){return this.class.id==FuId.ARRAY_PTR_CLASS;}getBaseType(){return this.isArray()?this.getElementType().getBaseType():this;}equalTypeArguments(right){switch(this.class.typeParameterCount){case 0:return true;case 1:return this.typeArg0.equalsType(right.typeArg0);case 2:return this.typeArg0.equalsType(right.typeArg0)&&this.typeArg1.equalsType(right.typeArg1);default:throw new Error();}}isAssignableFromClass(right){return this.class.isSameOrBaseOf(right.class)&&this.equalTypeArguments(right);}isAssignableFrom(right){let rightClass;return this.nullable&&right.id==FuId.NULL_TYPE||(rightClass=right)instanceof FuClassType&&this.isAssignableFromClass(rightClass);}equalsTypeInternal(that){return this.nullable==that.nullable&&this.class==that.class&&this.equalTypeArguments(that);}equalsType(right){let that;return (that=right)instanceof FuClassType&&!(right instanceof FuReadWriteClassType)&&this.equalsTypeInternal(that);}getArraySuffix(){return this.isArray()?"[]":"";}getClassSuffix(){return "";}#getNullableSuffix(){return this.nullable?"?":"";}toString(){if(this.isArray())return `${this.getElementType().getBaseType()}${this.getArraySuffix()}${this.#getNullableSuffix()}${this.getElementType().getArraySuffix()}`;switch(this.class.typeParameterCount){case 0:return `${this.class.name}${this.getClassSuffix()}${this.#getNullableSuffix()}`;case 1:return `${this.class.name}<${this.typeArg0}>${this.getClassSuffix()}${this.#getNullableSuffix()}`;case 2:return `${this.class.name}<${this.typeArg0}, ${this.typeArg1}>${this.getClassSuffix()}${this.#getNullableSuffix()}`;default:throw new Error();}}}class FuReadWriteClassType extends FuClassType{isAssignableFrom(right){let rightClass;return this.nullable&&right.id==FuId.NULL_TYPE||(rightClass=right)instanceof FuReadWriteClassType&&this.isAssignableFromClass(rightClass);}equalsType(right){let that;return (that=right)instanceof FuReadWriteClassType&&!(right instanceof FuStorageType)&&!(right instanceof FuDynamicPtrType)&&this.equalsTypeInternal(that);}getArraySuffix(){return this.isArray()?"[]!":"";}getClassSuffix(){return "!";}}class FuStorageType extends FuReadWriteClassType{isFinal(){return this.class.id!=FuId.MATCH_CLASS;}isAssignableFrom(right){let rightClass;return (rightClass=right)instanceof FuStorageType&&this.class==rightClass.class&&this.equalTypeArguments(rightClass);}equalsType(right){let that;return (that=right)instanceof FuStorageType&&this.equalsTypeInternal(that);}getClassSuffix(){return "()";}}class FuDynamicPtrType extends FuReadWriteClassType{isAssignableFrom(right){let rightClass;return this.nullable&&right.id==FuId.NULL_TYPE||(rightClass=right)instanceof FuDynamicPtrType&&this.isAssignableFromClass(rightClass);}equalsType(right){let that;return (that=right)instanceof FuDynamicPtrType&&this.equalsTypeInternal(that);}getArraySuffix(){return this.isArray()?"[]#":"";}getClassSuffix(){return "#";}}class FuArrayStorageType extends FuStorageType{ptrTaken=false;getBaseType(){return this.getElementType().getBaseType();}isArray(){return true;}getArraySuffix(){return `[${this.length}]`;}equalsType(right){let that;return (that=right)instanceof FuArrayStorageType&&this.getElementType().equalsType(that.getElementType())&&this.length==that.length;}getStorageType(){return this.getElementType().getStorageType();}}class FuStringType extends FuClassType{}class FuStringStorageType extends FuStringType{isAssignableFrom(right){return right instanceof FuStringType;}getClassSuffix(){return "()";}}class FuPrintableType extends FuType{isAssignableFrom(right){if(right instanceof FuNumericType||right instanceof FuStringType)return true;else if(right instanceof FuClassType){const klass=right;return klass.class.hasToString();}else return false;}}class FuSystem extends FuScope{constructor(){super();this.parent=null;let basePtr=FuVar.new(null,"base");basePtr.id=FuId.BASE_PTR;this.add(basePtr);this.#addMinMaxValue(this.intType,-2147483648n,2147483647n);this.intType.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.boolType,FuId.INT_TRY_PARSE,"TryParse",FuVar.new(this.stringPtrType,"value"),FuVar.new(this.intType,"radix",this.newLiteralLong(0n))));this.add(this.intType);this.#uIntType.name="uint";this.add(this.#uIntType);this.#addMinMaxValue(this.longType,-9223372036854775808n,9223372036854775807n);this.longType.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.boolType,FuId.LONG_TRY_PARSE,"TryParse",FuVar.new(this.stringPtrType,"value"),FuVar.new(this.intType,"radix",this.newLiteralLong(0n))));this.add(this.longType);this.byteType.name="byte";this.add(this.byteType);let shortType=FuRangeType.new(-32768,32767);shortType.name="short";this.add(shortType);let ushortType=FuRangeType.new(0,65535);ushortType.name="ushort";this.add(ushortType);let minus1Type=FuRangeType.new(-1,2147483647);this.add(this.#floatType);this.doubleType.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.boolType,FuId.DOUBLE_TRY_PARSE,"TryParse",FuVar.new(this.stringPtrType,"value")));this.add(this.doubleType);this.add(this.boolType);this.#stringClass.add(FuMethod.new(FuVisibility.PUBLIC,this.boolType,FuId.STRING_CONTAINS,"Contains",FuVar.new(this.stringPtrType,"value")));this.#stringClass.add(FuMethod.new(FuVisibility.PUBLIC,this.boolType,FuId.STRING_ENDS_WITH,"EndsWith",FuVar.new(this.stringPtrType,"value")));this.#stringClass.add(FuMethod.new(FuVisibility.PUBLIC,minus1Type,FuId.STRING_INDEX_OF,"IndexOf",FuVar.new(this.stringPtrType,"value")));this.#stringClass.add(FuMethod.new(FuVisibility.PUBLIC,minus1Type,FuId.STRING_LAST_INDEX_OF,"LastIndexOf",FuVar.new(this.stringPtrType,"value")));this.#stringClass.add(FuProperty.new(this.#uIntType,FuId.STRING_LENGTH,"Length"));this.#stringClass.add(FuMethod.new(FuVisibility.PUBLIC,this.stringStorageType,FuId.STRING_REPLACE,"Replace",FuVar.new(this.stringPtrType,"oldValue"),FuVar.new(this.stringPtrType,"newValue")));this.#stringClass.add(FuMethod.new(FuVisibility.PUBLIC,this.boolType,FuId.STRING_STARTS_WITH,"StartsWith",FuVar.new(this.stringPtrType,"value")));this.#stringClass.add(FuMethod.new(FuVisibility.PUBLIC,this.stringStorageType,FuId.STRING_SUBSTRING,"Substring",FuVar.new(this.intType,"offset"),FuVar.new(this.intType,"length",this.newLiteralLong(-1n))));this.stringPtrType.class=this.#stringClass;this.add(this.stringPtrType);this.stringNullablePtrType.class=this.#stringClass;this.stringStorageType.class=this.#stringClass;let arrayBinarySearchPart=FuMethod.new(FuVisibility.NUMERIC_ELEMENT_TYPE,this.intType,FuId.ARRAY_BINARY_SEARCH_PART,"BinarySearch",FuVar.new(this.#typeParam0,"value"),FuVar.new(this.intType,"startIndex"),FuVar.new(this.intType,"count"));this.arrayPtrClass.add(arrayBinarySearchPart);this.arrayPtrClass.add(FuMethod.new(FuVisibility.PUBLIC,this.voidType,FuId.ARRAY_COPY_TO,"CopyTo",FuVar.new(this.intType,"sourceIndex"),FuVar.new(Object.assign(new FuReadWriteClassType(),{class:this.arrayPtrClass,typeArg0:this.#typeParam0}),"destinationArray"),FuVar.new(this.intType,"destinationIndex"),FuVar.new(this.intType,"count")));let arrayFillPart=FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.ARRAY_FILL_PART,"Fill",FuVar.new(this.#typeParam0,"value"),FuVar.new(this.intType,"startIndex"),FuVar.new(this.intType,"count"));this.arrayPtrClass.add(arrayFillPart);let arraySortPart=FuMethod.newMutator(FuVisibility.NUMERIC_ELEMENT_TYPE,this.voidType,FuId.ARRAY_SORT_PART,"Sort",FuVar.new(this.intType,"startIndex"),FuVar.new(this.intType,"count"));this.arrayPtrClass.add(arraySortPart);this.arrayStorageClass.parent=this.arrayPtrClass;this.arrayStorageClass.add(FuMethodGroup.new(FuMethod.new(FuVisibility.NUMERIC_ELEMENT_TYPE,this.intType,FuId.ARRAY_BINARY_SEARCH_ALL,"BinarySearch",FuVar.new(this.#typeParam0,"value")),arrayBinarySearchPart));this.arrayStorageClass.add(FuMethod.new(FuVisibility.PUBLIC,this.boolType,FuId.ARRAY_CONTAINS,"Contains",FuVar.new(this.#typeParam0,"value")));this.arrayStorageClass.add(FuMethodGroup.new(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.ARRAY_FILL_ALL,"Fill",FuVar.new(this.#typeParam0,"value")),arrayFillPart));this.arrayStorageClass.add(FuProperty.new(this.#uIntType,FuId.ARRAY_LENGTH,"Length"));this.arrayStorageClass.add(FuMethodGroup.new(FuMethod.newMutator(FuVisibility.NUMERIC_ELEMENT_TYPE,this.voidType,FuId.ARRAY_SORT_ALL,"Sort"),arraySortPart));let typeParam0NotFinal=Object.assign(new FuType(),{id:FuId.TYPE_PARAM0_NOT_FINAL,name:"T"});let typeParam0Predicate=Object.assign(new FuType(),{id:FuId.TYPE_PARAM0_PREDICATE,name:"Predicate<T>"});let listClass=this.#addCollection(FuId.LIST_CLASS,"List",1,FuId.LIST_CLEAR,FuId.LIST_COUNT);listClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.LIST_ADD,"Add",FuVar.new(typeParam0NotFinal,"value")));listClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.LIST_ADD_RANGE,"AddRange",FuVar.new(Object.assign(new FuClassType(),{class:listClass,typeArg0:this.#typeParam0}),"source")));listClass.add(FuMethod.new(FuVisibility.PUBLIC,this.boolType,FuId.LIST_ALL,"All",FuVar.new(typeParam0Predicate,"predicate")));listClass.add(FuMethod.new(FuVisibility.PUBLIC,this.boolType,FuId.LIST_ANY,"Any",FuVar.new(typeParam0Predicate,"predicate")));listClass.add(FuMethod.new(FuVisibility.PUBLIC,this.boolType,FuId.LIST_CONTAINS,"Contains",FuVar.new(this.#typeParam0,"value")));listClass.add(FuMethod.new(FuVisibility.PUBLIC,this.voidType,FuId.LIST_COPY_TO,"CopyTo",FuVar.new(this.intType,"sourceIndex"),FuVar.new(Object.assign(new FuReadWriteClassType(),{class:this.arrayPtrClass,typeArg0:this.#typeParam0}),"destinationArray"),FuVar.new(this.intType,"destinationIndex"),FuVar.new(this.intType,"count")));listClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.intType,FuId.LIST_INDEX_OF,"IndexOf",FuVar.new(this.#typeParam0,"value")));listClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.LIST_INSERT,"Insert",FuVar.new(this.#uIntType,"index"),FuVar.new(typeParam0NotFinal,"value")));listClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.#typeParam0,FuId.LIST_LAST,"Last"));listClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.LIST_REMOVE_AT,"RemoveAt",FuVar.new(this.intType,"index")));listClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.LIST_REMOVE_RANGE,"RemoveRange",FuVar.new(this.intType,"index"),FuVar.new(this.intType,"count")));listClass.add(FuMethodGroup.new(FuMethod.newMutator(FuVisibility.NUMERIC_ELEMENT_TYPE,this.voidType,FuId.LIST_SORT_ALL,"Sort"),FuMethod.newMutator(FuVisibility.NUMERIC_ELEMENT_TYPE,this.voidType,FuId.LIST_SORT_PART,"Sort",FuVar.new(this.intType,"startIndex"),FuVar.new(this.intType,"count"))));let queueClass=this.#addCollection(FuId.QUEUE_CLASS,"Queue",1,FuId.QUEUE_CLEAR,FuId.QUEUE_COUNT);queueClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.#typeParam0,FuId.QUEUE_DEQUEUE,"Dequeue"));queueClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.QUEUE_ENQUEUE,"Enqueue",FuVar.new(this.#typeParam0,"value")));queueClass.add(FuMethod.new(FuVisibility.PUBLIC,this.#typeParam0,FuId.QUEUE_PEEK,"Peek"));let stackClass=this.#addCollection(FuId.STACK_CLASS,"Stack",1,FuId.STACK_CLEAR,FuId.STACK_COUNT);stackClass.add(FuMethod.new(FuVisibility.PUBLIC,this.#typeParam0,FuId.STACK_PEEK,"Peek"));stackClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.STACK_PUSH,"Push",FuVar.new(this.#typeParam0,"value")));stackClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.#typeParam0,FuId.STACK_POP,"Pop"));this.#addSet(FuId.HASH_SET_CLASS,"HashSet",FuId.HASH_SET_ADD,FuId.HASH_SET_CLEAR,FuId.HASH_SET_CONTAINS,FuId.HASH_SET_COUNT,FuId.HASH_SET_REMOVE);this.#addSet(FuId.SORTED_SET_CLASS,"SortedSet",FuId.SORTED_SET_ADD,FuId.SORTED_SET_CLEAR,FuId.SORTED_SET_CONTAINS,FuId.SORTED_SET_COUNT,FuId.SORTED_SET_REMOVE);this.#addDictionary(FuId.DICTIONARY_CLASS,"Dictionary",FuId.DICTIONARY_CLEAR,FuId.DICTIONARY_CONTAINS_KEY,FuId.DICTIONARY_COUNT,FuId.DICTIONARY_REMOVE);this.#addDictionary(FuId.SORTED_DICTIONARY_CLASS,"SortedDictionary",FuId.SORTED_DICTIONARY_CLEAR,FuId.SORTED_DICTIONARY_CONTAINS_KEY,FuId.SORTED_DICTIONARY_COUNT,FuId.SORTED_DICTIONARY_REMOVE);this.#addDictionary(FuId.ORDERED_DICTIONARY_CLASS,"OrderedDictionary",FuId.ORDERED_DICTIONARY_CLEAR,FuId.ORDERED_DICTIONARY_CONTAINS_KEY,FuId.ORDERED_DICTIONARY_COUNT,FuId.ORDERED_DICTIONARY_REMOVE);let textWriterClass=FuClass.new(FuCallType.NORMAL,FuId.TEXT_WRITER_CLASS,"TextWriter");textWriterClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.TEXT_WRITER_WRITE,"Write",FuVar.new(this.printableType,"value")));textWriterClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.TEXT_WRITER_WRITE_CHAR,"WriteChar",FuVar.new(this.intType,"c")));textWriterClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.TEXT_WRITER_WRITE_CODE_POINT,"WriteCodePoint",FuVar.new(this.intType,"c")));textWriterClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.TEXT_WRITER_WRITE_LINE,"WriteLine",FuVar.new(this.printableType,"value",this.newLiteralString(""))));this.add(textWriterClass);let consoleClass=FuClass.new(FuCallType.STATIC,FuId.NONE,"Console");consoleClass.add(FuMethod.newStatic(this.voidType,FuId.CONSOLE_WRITE,"Write",FuVar.new(this.printableType,"value")));consoleClass.add(FuMethod.newStatic(this.voidType,FuId.CONSOLE_WRITE_LINE,"WriteLine",FuVar.new(this.printableType,"value",this.newLiteralString(""))));consoleClass.add(FuStaticProperty.new(Object.assign(new FuStorageType(),{class:textWriterClass}),FuId.CONSOLE_ERROR,"Error"));this.add(consoleClass);let stringWriterClass=FuClass.new(FuCallType.SEALED,FuId.STRING_WRITER_CLASS,"StringWriter");stringWriterClass.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,FuId.STRING_WRITER_CLEAR,"Clear"));stringWriterClass.add(FuMethod.new(FuVisibility.PUBLIC,this.stringPtrType,FuId.STRING_WRITER_TO_STRING,"ToString"));this.add(stringWriterClass);stringWriterClass.parent=textWriterClass;let utf8EncodingClass=FuClass.new(FuCallType.SEALED,FuId.NONE,"UTF8Encoding");utf8EncodingClass.add(FuMethod.new(FuVisibility.PUBLIC,this.intType,FuId.U_T_F8_GET_BYTE_COUNT,"GetByteCount",FuVar.new(this.stringPtrType,"str")));utf8EncodingClass.add(FuMethod.new(FuVisibility.PUBLIC,this.voidType,FuId.U_T_F8_GET_BYTES,"GetBytes",FuVar.new(this.stringPtrType,"str"),FuVar.new(Object.assign(new FuReadWriteClassType(),{class:this.arrayPtrClass,typeArg0:this.byteType}),"bytes"),FuVar.new(this.intType,"byteIndex")));utf8EncodingClass.add(FuMethod.new(FuVisibility.PUBLIC,this.stringStorageType,FuId.U_T_F8_GET_STRING,"GetString",FuVar.new(Object.assign(new FuClassType(),{class:this.arrayPtrClass,typeArg0:this.byteType}),"bytes"),FuVar.new(this.intType,"offset"),FuVar.new(this.intType,"length")));let encodingClass=FuClass.new(FuCallType.STATIC,FuId.NONE,"Encoding");encodingClass.add(FuStaticProperty.new(utf8EncodingClass,FuId.NONE,"UTF8"));this.add(encodingClass);let environmentClass=FuClass.new(FuCallType.STATIC,FuId.NONE,"Environment");environmentClass.add(FuMethod.newStatic(this.stringNullablePtrType,FuId.ENVIRONMENT_GET_ENVIRONMENT_VARIABLE,"GetEnvironmentVariable",FuVar.new(this.stringPtrType,"name")));this.add(environmentClass);this.regexOptionsEnum=this.newEnum(true);this.regexOptionsEnum.isPublic=true;this.regexOptionsEnum.id=FuId.REGEX_OPTIONS_ENUM;this.regexOptionsEnum.name="RegexOptions";let regexOptionsNone=this.#newConstLong("None",0n);FuSystem.#addEnumValue(this.regexOptionsEnum,regexOptionsNone);FuSystem.#addEnumValue(this.regexOptionsEnum,this.#newConstLong("IgnoreCase",1n));FuSystem.#addEnumValue(this.regexOptionsEnum,this.#newConstLong("Multiline",2n));FuSystem.#addEnumValue(this.regexOptionsEnum,this.#newConstLong("Singleline",16n));this.add(this.regexOptionsEnum);let regexClass=FuClass.new(FuCallType.SEALED,FuId.REGEX_CLASS,"Regex");regexClass.add(FuMethod.newStatic(this.stringStorageType,FuId.REGEX_ESCAPE,"Escape",FuVar.new(this.stringPtrType,"str")));regexClass.add(FuMethodGroup.new(FuMethod.newStatic(this.boolType,FuId.REGEX_IS_MATCH_STR,"IsMatch",FuVar.new(this.stringPtrType,"input"),FuVar.new(this.stringPtrType,"pattern"),FuVar.new(this.regexOptionsEnum,"options",regexOptionsNone)),FuMethod.new(FuVisibility.PUBLIC,this.boolType,FuId.REGEX_IS_MATCH_REGEX,"IsMatch",FuVar.new(this.stringPtrType,"input"))));regexClass.add(FuMethod.newStatic(Object.assign(new FuDynamicPtrType(),{class:regexClass}),FuId.REGEX_COMPILE,"Compile",FuVar.new(this.stringPtrType,"pattern"),FuVar.new(this.regexOptionsEnum,"options",regexOptionsNone)));this.add(regexClass);let matchClass=FuClass.new(FuCallType.SEALED,FuId.MATCH_CLASS,"Match");matchClass.add(FuMethodGroup.new(FuMethod.newMutator(FuVisibility.PUBLIC,this.boolType,FuId.MATCH_FIND_STR,"Find",FuVar.new(this.stringPtrType,"input"),FuVar.new(this.stringPtrType,"pattern"),FuVar.new(this.regexOptionsEnum,"options",regexOptionsNone)),FuMethod.newMutator(FuVisibility.PUBLIC,this.boolType,FuId.MATCH_FIND_REGEX,"Find",FuVar.new(this.stringPtrType,"input"),FuVar.new(Object.assign(new FuClassType(),{class:regexClass}),"pattern"))));matchClass.add(FuProperty.new(this.intType,FuId.MATCH_START,"Start"));matchClass.add(FuProperty.new(this.intType,FuId.MATCH_END,"End"));matchClass.add(FuMethod.new(FuVisibility.PUBLIC,this.stringStorageType,FuId.MATCH_GET_CAPTURE,"GetCapture",FuVar.new(this.#uIntType,"group")));matchClass.add(FuProperty.new(this.#uIntType,FuId.MATCH_LENGTH,"Length"));matchClass.add(FuProperty.new(this.stringStorageType,FuId.MATCH_VALUE,"Value"));this.add(matchClass);let floatIntType=Object.assign(new FuFloatingType(),{id:FuId.FLOAT_INT_TYPE,name:"float"});let mathClass=FuClass.new(FuCallType.STATIC,FuId.NONE,"Math");mathClass.add(FuMethodGroup.new(FuMethod.newStatic(this.intType,FuId.MATH_ABS,"Abs",FuVar.new(this.longType,"a")),FuMethod.newStatic(this.#floatType,FuId.MATH_ABS,"Abs",FuVar.new(this.doubleType,"a"))));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Acos",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Asin",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Atan",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Atan2",FuVar.new(this.doubleType,"y"),FuVar.new(this.doubleType,"x")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Cbrt",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(floatIntType,FuId.MATH_CEILING,"Ceiling",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethodGroup.new(FuMethod.newStatic(this.intType,FuId.MATH_CLAMP,"Clamp",FuVar.new(this.longType,"value"),FuVar.new(this.longType,"min"),FuVar.new(this.longType,"max")),FuMethod.newStatic(this.#floatType,FuId.MATH_CLAMP,"Clamp",FuVar.new(this.doubleType,"value"),FuVar.new(this.doubleType,"min"),FuVar.new(this.doubleType,"max"))));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Cos",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Cosh",FuVar.new(this.doubleType,"a")));mathClass.add(this.#newConstDouble("E",2.718281828459045));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Exp",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(floatIntType,FuId.MATH_METHOD,"Floor",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_FUSED_MULTIPLY_ADD,"FusedMultiplyAdd",FuVar.new(this.doubleType,"x"),FuVar.new(this.doubleType,"y"),FuVar.new(this.doubleType,"z")));mathClass.add(FuMethod.newStatic(this.boolType,FuId.MATH_IS_FINITE,"IsFinite",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.boolType,FuId.MATH_IS_INFINITY,"IsInfinity",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.boolType,FuId.MATH_IS_NA_N,"IsNaN",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Log",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_LOG2,"Log2",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Log10",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethodGroup.new(FuMethod.newStatic(this.intType,FuId.MATH_MAX_INT,"Max",FuVar.new(this.longType,"a"),FuVar.new(this.longType,"b")),FuMethod.newStatic(this.#floatType,FuId.MATH_MAX_DOUBLE,"Max",FuVar.new(this.doubleType,"a"),FuVar.new(this.doubleType,"b"))));mathClass.add(FuMethodGroup.new(FuMethod.newStatic(this.intType,FuId.MATH_MIN_INT,"Min",FuVar.new(this.longType,"a"),FuVar.new(this.longType,"b")),FuMethod.newStatic(this.#floatType,FuId.MATH_MIN_DOUBLE,"Min",FuVar.new(this.doubleType,"a"),FuVar.new(this.doubleType,"b"))));mathClass.add(FuStaticProperty.new(this.#floatType,FuId.MATH_NA_N,"NaN"));mathClass.add(FuStaticProperty.new(this.#floatType,FuId.MATH_NEGATIVE_INFINITY,"NegativeInfinity"));mathClass.add(this.#newConstDouble("PI",3.141592653589793));mathClass.add(FuStaticProperty.new(this.#floatType,FuId.MATH_POSITIVE_INFINITY,"PositiveInfinity"));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Pow",FuVar.new(this.doubleType,"x"),FuVar.new(this.doubleType,"y")));mathClass.add(FuMethod.newStatic(floatIntType,FuId.MATH_ROUND,"Round",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Sin",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Sinh",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Sqrt",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Tan",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(this.#floatType,FuId.MATH_METHOD,"Tanh",FuVar.new(this.doubleType,"a")));mathClass.add(FuMethod.newStatic(floatIntType,FuId.MATH_TRUNCATE,"Truncate",FuVar.new(this.doubleType,"a")));this.add(mathClass);let lockClass=FuClass.new(FuCallType.SEALED,FuId.LOCK_CLASS,"Lock");this.add(lockClass);this.lockPtrType.class=lockClass;}voidType=Object.assign(new FuType(),{id:FuId.VOID_TYPE,name:"void"});nullType=Object.assign(new FuType(),{id:FuId.NULL_TYPE,name:"null",nullable:true});#typeParam0=Object.assign(new FuType(),{id:FuId.TYPE_PARAM0,name:"T"});intType=Object.assign(new FuIntegerType(),{id:FuId.INT_TYPE,name:"int"});#uIntType=FuRangeType.new(0,2147483647);longType=Object.assign(new FuIntegerType(),{id:FuId.LONG_TYPE,name:"long"});byteType=FuRangeType.new(0,255);#floatType=Object.assign(new FuFloatingType(),{id:FuId.FLOAT_TYPE,name:"float"});doubleType=Object.assign(new FuFloatingType(),{id:FuId.DOUBLE_TYPE,name:"double"});charType=FuRangeType.new(-128,65535);boolType=Object.assign(new FuEnum(),{id:FuId.BOOL_TYPE,name:"bool"});#stringClass=FuClass.new(FuCallType.NORMAL,FuId.STRING_CLASS,"string");stringPtrType=Object.assign(new FuStringType(),{id:FuId.STRING_PTR_TYPE,name:"string"});stringNullablePtrType=Object.assign(new FuStringType(),{id:FuId.STRING_PTR_TYPE,name:"string",nullable:true});stringStorageType=Object.assign(new FuStringStorageType(),{id:FuId.STRING_STORAGE_TYPE});printableType=Object.assign(new FuPrintableType(),{name:"printable"});arrayPtrClass=FuClass.new(FuCallType.NORMAL,FuId.ARRAY_PTR_CLASS,"ArrayPtr",1);arrayStorageClass=FuClass.new(FuCallType.NORMAL,FuId.ARRAY_STORAGE_CLASS,"ArrayStorage",1);lockPtrType=new FuReadWriteClassType();newLiteralLong(value,line=0){let type=value>=-2147483648&&value<=2147483647?FuRangeType.new(Number(value),Number(value)):this.longType;return Object.assign(new FuLiteralLong(),{line:line,type:type,value:value});}newLiteralString(value,line=0){return Object.assign(new FuLiteralString(),{line:line,type:this.stringPtrType,value:value});}promoteIntegerTypes(left,right){return left==this.longType||right==this.longType?this.longType:this.intType;}promoteFloatingTypes(left,right){if(left.id==FuId.DOUBLE_TYPE||right.id==FuId.DOUBLE_TYPE)return this.doubleType;if(left.id==FuId.FLOAT_TYPE||right.id==FuId.FLOAT_TYPE||left.id==FuId.FLOAT_INT_TYPE||right.id==FuId.FLOAT_INT_TYPE)return this.#floatType;return null;}promoteNumericTypes(left,right){let result=this.promoteFloatingTypes(left,right);return result!=null?result:this.promoteIntegerTypes(left,right);}newEnum(flags){let enu=flags?new FuEnumFlags():new FuEnum();enu.add(FuMethod.newStatic(enu,FuId.ENUM_FROM_INT,"FromInt",FuVar.new(this.intType,"value")));if(flags)enu.add(FuMethod.new(FuVisibility.PUBLIC,this.boolType,FuId.ENUM_HAS_FLAG,"HasFlag",FuVar.new(enu,"flag")));return enu;}#addCollection(id,name,typeParameterCount,clearId,countId){let result=FuClass.new(FuCallType.NORMAL,id,name,typeParameterCount);result.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,clearId,"Clear"));result.add(FuProperty.new(this.#uIntType,countId,"Count"));this.add(result);return result;}#addSet(id,name,addId,clearId,containsId,countId,removeId){let set=this.#addCollection(id,name,1,clearId,countId);set.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,addId,"Add",FuVar.new(this.#typeParam0,"value")));set.add(FuMethod.new(FuVisibility.PUBLIC,this.boolType,containsId,"Contains",FuVar.new(this.#typeParam0,"value")));set.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,removeId,"Remove",FuVar.new(this.#typeParam0,"value")));}#addDictionary(id,name,clearId,containsKeyId,countId,removeId){let dict=this.#addCollection(id,name,2,clearId,countId);dict.add(FuMethod.newMutator(FuVisibility.FINAL_VALUE_TYPE,this.voidType,FuId.DICTIONARY_ADD,"Add",FuVar.new(this.#typeParam0,"key")));dict.add(FuMethod.new(FuVisibility.PUBLIC,this.boolType,containsKeyId,"ContainsKey",FuVar.new(this.#typeParam0,"key")));dict.add(FuMethod.newMutator(FuVisibility.PUBLIC,this.voidType,removeId,"Remove",FuVar.new(this.#typeParam0,"key")));}static#addEnumValue(enu,value){value.type=enu;enu.add(value);}#newConstLong(name,value){let result=Object.assign(new FuConst(),{visibility:FuVisibility.PUBLIC,name:name,value:this.newLiteralLong(value),visitStatus:FuVisitStatus.DONE});result.type=result.value.type;return result;}#newConstDouble(name,value){return Object.assign(new FuConst(),{visibility:FuVisibility.PUBLIC,name:name,value:Object.assign(new FuLiteralDouble(),{value:value,type:this.doubleType}),type:this.doubleType,visitStatus:FuVisitStatus.DONE});}#addMinMaxValue(target,min,max){target.add(this.#newConstLong("MinValue",min));target.add(this.#newConstLong("MaxValue",max));}static new(){return new FuSystem();}}class FuProgram extends FuScope{topLevelNatives=[];classes=[];resources={};regexOptionsEnum=false;}class FuParser extends FuLexer{#xcrementParent=null;#currentLoop=null;#currentLoopOrSwitch=null;#docParseLine(para){if(para.children.length>0)para.children.push(new FuDocLine());this.lexemeOffset=this.charOffset;for(let lastNonWhitespace=0;;){switch(this.peekChar()){case-1:case 10:case 13:para.children.push(Object.assign(new FuDocText(),{text:this.getLexeme()}));return lastNonWhitespace==46;case 9:case 32:this.readChar();break;case 96:if(this.charOffset>this.lexemeOffset)para.children.push(Object.assign(new FuDocText(),{text:this.getLexeme()}));this.readChar();this.lexemeOffset=this.charOffset;for(;;){let c=this.peekChar();if(c==96){para.children.push(Object.assign(new FuDocCode(),{text:this.getLexeme()}));this.readChar();break;}if(c<0||c==10){this.reportError("Unterminated code in documentation comment");break;}this.readChar();}this.lexemeOffset=this.charOffset;lastNonWhitespace=96;break;default:lastNonWhitespace=this.readChar();break;}}}#docParsePara(para){do{this.#docParseLine(para);this.nextToken();}while(this.see(FuToken.DOC_REGULAR));}#parseDoc(){if(!this.see(FuToken.DOC_REGULAR))return null;let doc=new FuCodeDoc();let period;do{period=this.#docParseLine(doc.summary);this.nextToken();}while(!period&&this.see(FuToken.DOC_REGULAR));for(;;){switch(this.currentToken){case FuToken.DOC_REGULAR:let para=new FuDocPara();this.#docParsePara(para);doc.details.push(para);break;case FuToken.DOC_BULLET:let list=new FuDocList();do{list.items.push(new FuDocPara());this.#docParsePara(list.items.at(-1));}while(this.see(FuToken.DOC_BULLET));doc.details.push(list);break;case FuToken.DOC_BLANK:this.nextToken();break;default:return doc;}}}#checkXcrementParent(){if(this.#xcrementParent!=null){let op=this.see(FuToken.INCREMENT)?"++":"--";this.reportError(`${op} not allowed on the right side of ${this.#xcrementParent}`);}}#parseDouble(){let d;if(!!isNaN(d=parseFloat(this.getLexeme().replaceAll("_",""))))this.reportError("Invalid floating-point number");let result=Object.assign(new FuLiteralDouble(),{line:this.line,type:this.program.system.doubleType,value:d});this.nextToken();return result;}#seeDigit(){let c=this.peekChar();return c>=48&&c<=57;}#parseInterpolatedString(){let result=Object.assign(new FuInterpolatedString(),{line:this.line});do{let prefix=this.stringValue.replaceAll("{{","{");this.nextToken();let arg=this.#parseExpr();let width=this.eat(FuToken.COMMA)?this.#parseExpr():null;let format=32;let precision=-1;if(this.see(FuToken.COLON)){format=this.readChar();if(this.#seeDigit()){precision=this.readChar()-48;if(this.#seeDigit())precision=precision*10+this.readChar()-48;}this.nextToken();}result.addPart(prefix,arg,width,format,precision);this.check(FuToken.RIGHT_BRACE);}while(this.readString(true)==FuToken.INTERPOLATED_STRING);result.suffix=this.stringValue.replaceAll("{{","{");this.nextToken();return result;}#parseParenthesized(){this.expect(FuToken.LEFT_PARENTHESIS);let result=this.#parseExpr();this.expect(FuToken.RIGHT_PARENTHESIS);return result;}#parseSymbolReference(left){this.check(FuToken.ID);let result=Object.assign(new FuSymbolReference(),{line:this.line,left:left,name:this.stringValue});this.nextToken();return result;}#parseCollection(result,closing){if(!this.see(closing)){do result.push(this.#parseExpr());while(this.eat(FuToken.COMMA));}this.expectOrSkip(closing);}#parsePrimaryExpr(type){let result;switch(this.currentToken){case FuToken.INCREMENT:case FuToken.DECREMENT:this.#checkXcrementParent();return Object.assign(new FuPrefixExpr(),{line:this.line,op:this.nextToken(),inner:this.#parsePrimaryExpr(false)});case FuToken.MINUS:case FuToken.TILDE:case FuToken.EXCLAMATION_MARK:return Object.assign(new FuPrefixExpr(),{line:this.line,op:this.nextToken(),inner:this.#parsePrimaryExpr(false)});case FuToken.NEW:let newResult=Object.assign(new FuPrefixExpr(),{line:this.line,op:this.nextToken()});result=this.#parseType();if(this.eat(FuToken.LEFT_BRACE))result=Object.assign(new FuBinaryExpr(),{line:this.line,left:result,op:FuToken.LEFT_BRACE,right:this.#parseObjectLiteral()});newResult.inner=result;return newResult;case FuToken.LITERAL_LONG:result=this.program.system.newLiteralLong(this.longValue,this.line);this.nextToken();break;case FuToken.LITERAL_DOUBLE:result=this.#parseDouble();break;case FuToken.LITERAL_CHAR:result=FuLiteralChar.new(Number(this.longValue),this.line);this.nextToken();break;case FuToken.LITERAL_STRING:result=this.program.system.newLiteralString(this.stringValue,this.line);this.nextToken();break;case FuToken.FALSE:result=Object.assign(new FuLiteralFalse(),{line:this.line,type:this.program.system.boolType});this.nextToken();break;case FuToken.TRUE:result=Object.assign(new FuLiteralTrue(),{line:this.line,type:this.program.system.boolType});this.nextToken();break;case FuToken.NULL:result=Object.assign(new FuLiteralNull(),{line:this.line,type:this.program.system.nullType});this.nextToken();break;case FuToken.INTERPOLATED_STRING:result=this.#parseInterpolatedString();break;case FuToken.LEFT_PARENTHESIS:result=this.#parseParenthesized();break;case FuToken.ID:let symbol=this.#parseSymbolReference(null);if(this.eat(FuToken.FAT_ARROW)){let lambda=Object.assign(new FuLambdaExpr(),{line:symbol.line});lambda.add(FuVar.new(null,symbol.name));lambda.body=this.#parseExpr();return lambda;}if(type&&this.eat(FuToken.LESS)){let typeArgs=new FuAggregateInitializer();let saveTypeArg=this.parsingTypeArg;this.parsingTypeArg=true;do typeArgs.items.push(this.#parseType());while(this.eat(FuToken.COMMA));this.expect(FuToken.RIGHT_ANGLE);this.parsingTypeArg=saveTypeArg;symbol.left=typeArgs;}result=symbol;break;case FuToken.RESOURCE:this.nextToken();if(this.eat(FuToken.LESS)&&this.stringValue=="byte"&&this.eat(FuToken.ID)&&this.eat(FuToken.LEFT_BRACKET)&&this.eat(FuToken.RIGHT_BRACKET)&&this.eat(FuToken.GREATER))result=Object.assign(new FuPrefixExpr(),{line:this.line,op:FuToken.RESOURCE,inner:this.#parseParenthesized()});else {this.reportError("Expected 'resource<byte[]>'");result=null;}break;default:this.reportError("Invalid expression");result=null;break;}for(;;){switch(this.currentToken){case FuToken.DOT:this.nextToken();result=this.#parseSymbolReference(result);break;case FuToken.LEFT_PARENTHESIS:this.nextToken();let method;if((method=result)instanceof FuSymbolReference){let call=Object.assign(new FuCallExpr(),{line:this.line,method:method});this.#parseCollection(call.arguments,FuToken.RIGHT_PARENTHESIS);result=call;}else this.reportError("Expected a method");break;case FuToken.LEFT_BRACKET:result=Object.assign(new FuBinaryExpr(),{line:this.line,left:result,op:this.nextToken(),right:this.see(FuToken.RIGHT_BRACKET)?null:this.#parseExpr()});this.expect(FuToken.RIGHT_BRACKET);break;case FuToken.INCREMENT:case FuToken.DECREMENT:this.#checkXcrementParent();result=Object.assign(new FuPostfixExpr(),{line:this.line,inner:result,op:this.nextToken()});break;case FuToken.EXCLAMATION_MARK:case FuToken.HASH:result=Object.assign(new FuPostfixExpr(),{line:this.line,inner:result,op:this.nextToken()});break;case FuToken.QUESTION_MARK:if(!type)return result;result=Object.assign(new FuPostfixExpr(),{line:this.line,inner:result,op:this.nextToken()});break;default:return result;}}}#parseMulExpr(){let left=this.#parsePrimaryExpr(false);for(;;){switch(this.currentToken){case FuToken.ASTERISK:case FuToken.SLASH:case FuToken.MOD:left=Object.assign(new FuBinaryExpr(),{line:this.line,left:left,op:this.nextToken(),right:this.#parsePrimaryExpr(false)});break;default:return left;}}}#parseAddExpr(){let left=this.#parseMulExpr();while(this.see(FuToken.PLUS)||this.see(FuToken.MINUS))left=Object.assign(new FuBinaryExpr(),{line:this.line,left:left,op:this.nextToken(),right:this.#parseMulExpr()});return left;}#parseShiftExpr(){let left=this.#parseAddExpr();while(this.see(FuToken.SHIFT_LEFT)||this.see(FuToken.SHIFT_RIGHT))left=Object.assign(new FuBinaryExpr(),{line:this.line,left:left,op:this.nextToken(),right:this.#parseAddExpr()});return left;}#parseRelExpr(){let left=this.#parseShiftExpr();for(;;){switch(this.currentToken){case FuToken.LESS:case FuToken.LESS_OR_EQUAL:case FuToken.GREATER:case FuToken.GREATER_OR_EQUAL:left=Object.assign(new FuBinaryExpr(),{line:this.line,left:left,op:this.nextToken(),right:this.#parseShiftExpr()});break;case FuToken.IS:let isExpr=Object.assign(new FuBinaryExpr(),{line:this.line,left:left,op:this.nextToken(),right:this.#parsePrimaryExpr(false)});if(this.see(FuToken.ID)){isExpr.right=Object.assign(new FuVar(),{line:this.line,typeExpr:isExpr.right,name:this.stringValue});this.nextToken();}return isExpr;default:return left;}}}#parseEqualityExpr(){let left=this.#parseRelExpr();while(this.see(FuToken.EQUAL)||this.see(FuToken.NOT_EQUAL))left=Object.assign(new FuBinaryExpr(),{line:this.line,left:left,op:this.nextToken(),right:this.#parseRelExpr()});return left;}#parseAndExpr(){let left=this.#parseEqualityExpr();while(this.see(FuToken.AND))left=Object.assign(new FuBinaryExpr(),{line:this.line,left:left,op:this.nextToken(),right:this.#parseEqualityExpr()});return left;}#parseXorExpr(){let left=this.#parseAndExpr();while(this.see(FuToken.XOR))left=Object.assign(new FuBinaryExpr(),{line:this.line,left:left,op:this.nextToken(),right:this.#parseAndExpr()});return left;}#parseOrExpr(){let left=this.#parseXorExpr();while(this.see(FuToken.OR))left=Object.assign(new FuBinaryExpr(),{line:this.line,left:left,op:this.nextToken(),right:this.#parseXorExpr()});return left;}#parseCondAndExpr(){let left=this.#parseOrExpr();while(this.see(FuToken.COND_AND)){let saveXcrementParent=this.#xcrementParent;this.#xcrementParent="&&";left=Object.assign(new FuBinaryExpr(),{line:this.line,left:left,op:this.nextToken(),right:this.#parseOrExpr()});this.#xcrementParent=saveXcrementParent;}return left;}#parseCondOrExpr(){let left=this.#parseCondAndExpr();while(this.see(FuToken.COND_OR)){let saveXcrementParent=this.#xcrementParent;this.#xcrementParent="||";left=Object.assign(new FuBinaryExpr(),{line:this.line,left:left,op:this.nextToken(),right:this.#parseCondAndExpr()});this.#xcrementParent=saveXcrementParent;}return left;}#parseExpr(){let left=this.#parseCondOrExpr();if(this.see(FuToken.QUESTION_MARK)){let result=Object.assign(new FuSelectExpr(),{line:this.line,cond:left});this.nextToken();let saveXcrementParent=this.#xcrementParent;this.#xcrementParent="?";result.onTrue=this.#parseExpr();this.expect(FuToken.COLON);result.onFalse=this.#parseExpr();this.#xcrementParent=saveXcrementParent;return result;}return left;}#parseType(){let left=this.#parsePrimaryExpr(true);if(this.eat(FuToken.RANGE))return Object.assign(new FuBinaryExpr(),{line:this.line,left:left,op:FuToken.RANGE,right:this.#parsePrimaryExpr(true)});return left;}#parseConstInitializer(){if(this.eat(FuToken.LEFT_BRACE)){let result=Object.assign(new FuAggregateInitializer(),{line:this.line});this.#parseCollection(result.items,FuToken.RIGHT_BRACE);return result;}return this.#parseExpr();}#parseObjectLiteral(){let result=Object.assign(new FuAggregateInitializer(),{line:this.line});do{let line=this.line;let field=this.#parseSymbolReference(null);this.expect(FuToken.ASSIGN);result.items.push(Object.assign(new FuBinaryExpr(),{line:line,left:field,op:FuToken.ASSIGN,right:this.#parseExpr()}));}while(this.eat(FuToken.COMMA));this.expect(FuToken.RIGHT_BRACE);return result;}#parseInitializer(){if(!this.eat(FuToken.ASSIGN))return null;if(this.eat(FuToken.LEFT_BRACE))return this.#parseObjectLiteral();return this.#parseExpr();}#addSymbol(scope,symbol){if(scope.contains(symbol))this.reportError("Duplicate symbol");else scope.add(symbol);}#parseVar(type){let result=Object.assign(new FuVar(),{line:this.line,typeExpr:type,name:this.stringValue});this.nextToken();result.value=this.#parseInitializer();return result;}#parseConst(visibility){this.expect(FuToken.CONST);let konst=Object.assign(new FuConst(),{line:this.line,visibility:visibility,typeExpr:this.#parseType(),name:this.stringValue});this.nextToken();this.expect(FuToken.ASSIGN);konst.value=this.#parseConstInitializer();this.expect(FuToken.SEMICOLON);return konst;}#parseAssign(allowVar){let left=allowVar?this.#parseType():this.#parseExpr();switch(this.currentToken){case FuToken.ASSIGN:case FuToken.ADD_ASSIGN:case FuToken.SUB_ASSIGN:case FuToken.MUL_ASSIGN:case FuToken.DIV_ASSIGN:case FuToken.MOD_ASSIGN:case FuToken.AND_ASSIGN:case FuToken.OR_ASSIGN:case FuToken.XOR_ASSIGN:case FuToken.SHIFT_LEFT_ASSIGN:case FuToken.SHIFT_RIGHT_ASSIGN:return Object.assign(new FuBinaryExpr(),{line:this.line,left:left,op:this.nextToken(),right:this.#parseAssign(false)});case FuToken.ID:if(allowVar)return this.#parseVar(left);return left;default:return left;}}#parseBlock(){let result=Object.assign(new FuBlock(),{line:this.line});this.expect(FuToken.LEFT_BRACE);while(!this.see(FuToken.RIGHT_BRACE)&&!this.see(FuToken.END_OF_FILE))result.statements.push(this.#parseStatement());this.expect(FuToken.RIGHT_BRACE);return result;}#parseAssert(){let result=Object.assign(new FuAssert(),{line:this.line});this.expect(FuToken.ASSERT);result.cond=this.#parseExpr();if(this.eat(FuToken.COMMA))result.message=this.#parseExpr();this.expect(FuToken.SEMICOLON);return result;}#parseBreak(){if(this.#currentLoopOrSwitch==null)this.reportError("break outside loop or switch");let result=Object.assign(new FuBreak(),{line:this.line,loopOrSwitch:this.#currentLoopOrSwitch});this.expect(FuToken.BREAK);this.expect(FuToken.SEMICOLON);let loop;if((loop=this.#currentLoopOrSwitch)instanceof FuLoop)loop.hasBreak=true;return result;}#parseContinue(){if(this.#currentLoop==null)this.reportError("continue outside loop");let result=Object.assign(new FuContinue(),{line:this.line,loop:this.#currentLoop});this.expect(FuToken.CONTINUE);this.expect(FuToken.SEMICOLON);return result;}#parseLoopBody(loop){let outerLoop=this.#currentLoop;let outerLoopOrSwitch=this.#currentLoopOrSwitch;this.#currentLoop=loop;this.#currentLoopOrSwitch=loop;loop.body=this.#parseStatement();this.#currentLoopOrSwitch=outerLoopOrSwitch;this.#currentLoop=outerLoop;}#parseDoWhile(){let result=Object.assign(new FuDoWhile(),{line:this.line});this.expect(FuToken.DO);this.#parseLoopBody(result);this.expect(FuToken.WHILE);result.cond=this.#parseParenthesized();this.expect(FuToken.SEMICOLON);return result;}#parseFor(){let result=Object.assign(new FuFor(),{line:this.line});this.expect(FuToken.FOR);this.expect(FuToken.LEFT_PARENTHESIS);if(!this.see(FuToken.SEMICOLON))result.init=this.#parseAssign(true);this.expect(FuToken.SEMICOLON);if(!this.see(FuToken.SEMICOLON))result.cond=this.#parseExpr();this.expect(FuToken.SEMICOLON);if(!this.see(FuToken.RIGHT_PARENTHESIS))result.advance=this.#parseAssign(false);this.expect(FuToken.RIGHT_PARENTHESIS);this.#parseLoopBody(result);return result;}#parseForeachIterator(result){this.#addSymbol(result,Object.assign(new FuVar(),{line:this.line,typeExpr:this.#parseType(),name:this.stringValue}));this.nextToken();}#parseForeach(){let result=Object.assign(new FuForeach(),{line:this.line});this.expect(FuToken.FOREACH);this.expect(FuToken.LEFT_PARENTHESIS);if(this.eat(FuToken.LEFT_PARENTHESIS)){this.#parseForeachIterator(result);this.expect(FuToken.COMMA);this.#parseForeachIterator(result);this.expect(FuToken.RIGHT_PARENTHESIS);}else this.#parseForeachIterator(result);this.expect(FuToken.IN);result.collection=this.#parseExpr();this.expect(FuToken.RIGHT_PARENTHESIS);this.#parseLoopBody(result);return result;}#parseIf(){let result=Object.assign(new FuIf(),{line:this.line});this.expect(FuToken.IF);result.cond=this.#parseParenthesized();result.onTrue=this.#parseStatement();if(this.eat(FuToken.ELSE))result.onFalse=this.#parseStatement();return result;}#parseLock(){let result=Object.assign(new FuLock(),{line:this.line});this.expect(FuToken.LOCK_);result.lock=this.#parseParenthesized();result.body=this.#parseStatement();return result;}#parseNative(){let result=Object.assign(new FuNative(),{line:this.line});this.expect(FuToken.NATIVE);if(this.see(FuToken.LITERAL_STRING))result.content=this.stringValue;else {let offset=this.charOffset;this.expect(FuToken.LEFT_BRACE);let nesting=1;for(;;){if(this.see(FuToken.END_OF_FILE)){this.expect(FuToken.RIGHT_BRACE);return result;}if(this.see(FuToken.LEFT_BRACE))nesting++;else if(this.see(FuToken.RIGHT_BRACE)){if(--nesting==0)break;}this.nextToken();}console.assert(this.input[this.charOffset-1]==125);result.content=new TextDecoder().decode(this.input.subarray(offset,offset+this.charOffset-1-offset));}this.nextToken();return result;}#parseReturn(){let result=Object.assign(new FuReturn(),{line:this.line});this.nextToken();if(!this.see(FuToken.SEMICOLON))result.value=this.#parseExpr();this.expect(FuToken.SEMICOLON);return result;}#parseSwitch(){let result=Object.assign(new FuSwitch(),{line:this.line});this.expect(FuToken.SWITCH);result.value=this.#parseParenthesized();this.expect(FuToken.LEFT_BRACE);let outerLoopOrSwitch=this.#currentLoopOrSwitch;this.#currentLoopOrSwitch=result;while(this.eat(FuToken.CASE)){result.cases.push(new FuCase());let kase=result.cases.at(-1);do{let expr=this.#parseExpr();if(this.see(FuToken.ID))expr=this.#parseVar(expr);if(this.eat(FuToken.WHEN))expr=Object.assign(new FuBinaryExpr(),{line:this.line,left:expr,op:FuToken.WHEN,right:this.#parseExpr()});kase.values.push(expr);this.expect(FuToken.COLON);}while(this.eat(FuToken.CASE));if(this.see(FuToken.DEFAULT)){this.reportError("Please remove 'case' before 'default'");break;}while(!this.see(FuToken.END_OF_FILE)){kase.body.push(this.#parseStatement());switch(this.currentToken){case FuToken.CASE:case FuToken.DEFAULT:case FuToken.RIGHT_BRACE:break;default:continue;}break;}}if(result.cases.length==0)this.reportError("Switch with no cases");if(this.eat(FuToken.DEFAULT)){this.expect(FuToken.COLON);do{if(this.see(FuToken.END_OF_FILE))break;result.defaultBody.push(this.#parseStatement());}while(!this.see(FuToken.RIGHT_BRACE));}this.expect(FuToken.RIGHT_BRACE);this.#currentLoopOrSwitch=outerLoopOrSwitch;return result;}#parseThrow(){let result=Object.assign(new FuThrow(),{line:this.line});this.expect(FuToken.THROW);result.message=this.#parseExpr();this.expect(FuToken.SEMICOLON);return result;}#parseWhile(){let result=Object.assign(new FuWhile(),{line:this.line});this.expect(FuToken.WHILE);result.cond=this.#parseParenthesized();this.#parseLoopBody(result);return result;}#parseStatement(){switch(this.currentToken){case FuToken.LEFT_BRACE:return this.#parseBlock();case FuToken.ASSERT:return this.#parseAssert();case FuToken.BREAK:return this.#parseBreak();case FuToken.CONST:return this.#parseConst(FuVisibility.PRIVATE);case FuToken.CONTINUE:return this.#parseContinue();case FuToken.DO:return this.#parseDoWhile();case FuToken.FOR:return this.#parseFor();case FuToken.FOREACH:return this.#parseForeach();case FuToken.IF:return this.#parseIf();case FuToken.LOCK_:return this.#parseLock();case FuToken.NATIVE:return this.#parseNative();case FuToken.RETURN:return this.#parseReturn();case FuToken.SWITCH:return this.#parseSwitch();case FuToken.THROW:return this.#parseThrow();case FuToken.WHILE:return this.#parseWhile();default:let expr=this.#parseAssign(true);this.expect(FuToken.SEMICOLON);return expr;}}#parseCallType(){switch(this.currentToken){case FuToken.STATIC:this.nextToken();return FuCallType.STATIC;case FuToken.ABSTRACT:this.nextToken();return FuCallType.ABSTRACT;case FuToken.VIRTUAL:this.nextToken();return FuCallType.VIRTUAL;case FuToken.OVERRIDE:this.nextToken();return FuCallType.OVERRIDE;case FuToken.SEALED:this.nextToken();return FuCallType.SEALED;default:return FuCallType.NORMAL;}}#parseMethod(method){method.isMutator=this.eat(FuToken.EXCLAMATION_MARK);this.expect(FuToken.LEFT_PARENTHESIS);if(!this.see(FuToken.RIGHT_PARENTHESIS)){do{let doc=this.#parseDoc();let param=this.#parseVar(this.#parseType());param.documentation=doc;this.#addSymbol(method.parameters,param);}while(this.eat(FuToken.COMMA));}this.expect(FuToken.RIGHT_PARENTHESIS);method.throws=this.eat(FuToken.THROWS);if(method.callType==FuCallType.ABSTRACT)this.expect(FuToken.SEMICOLON);else if(this.see(FuToken.FAT_ARROW))method.body=this.#parseReturn();else if(this.check(FuToken.LEFT_BRACE))method.body=this.#parseBlock();}static#callTypeToString(callType){switch(callType){case FuCallType.STATIC:return "static";case FuCallType.NORMAL:return "normal";case FuCallType.ABSTRACT:return "abstract";case FuCallType.VIRTUAL:return "virtual";case FuCallType.OVERRIDE:return "override";case FuCallType.SEALED:return "sealed";default:throw new Error();}}#parseClass(doc,isPublic,callType){this.expect(FuToken.CLASS);let klass=Object.assign(new FuClass(),{filename:this.filename,line:this.line,documentation:doc,isPublic:isPublic,callType:callType,name:this.stringValue});if(this.expect(FuToken.ID))this.#addSymbol(this.program,klass);if(this.eat(FuToken.COLON)){klass.baseClassName=this.stringValue;this.expect(FuToken.ID);}this.expect(FuToken.LEFT_BRACE);while(!this.see(FuToken.RIGHT_BRACE)&&!this.see(FuToken.END_OF_FILE)){doc=this.#parseDoc();let visibility;switch(this.currentToken){case FuToken.INTERNAL:visibility=FuVisibility.INTERNAL;this.nextToken();break;case FuToken.PROTECTED:visibility=FuVisibility.PROTECTED;this.nextToken();break;case FuToken.PUBLIC:visibility=FuVisibility.PUBLIC;this.nextToken();break;default:visibility=FuVisibility.PRIVATE;break;}if(this.see(FuToken.CONST)){let konst=this.#parseConst(visibility);konst.documentation=doc;this.#addSymbol(klass,konst);continue;}callType=this.#parseCallType();let type=this.eat(FuToken.VOID)?this.program.system.voidType:this.#parseType();let call;if(this.see(FuToken.LEFT_BRACE)&&(call=type)instanceof FuCallExpr){if(call.method.name!=klass.name)this.reportError("Method with no return type");else {if(klass.callType==FuCallType.STATIC)this.reportError("Constructor in a static class");if(callType!=FuCallType.NORMAL)this.reportError(`Constructor cannot be ${FuParser.#callTypeToString(callType)}`);if(call.arguments.length!=0)this.reportError("Constructor parameters not supported");if(klass.constructor_!=null)this.reportError(`Duplicate constructor, already defined in line ${klass.constructor_.line}`);}if(visibility==FuVisibility.PRIVATE)visibility=FuVisibility.INTERNAL;klass.constructor_=Object.assign(new FuMethodBase(),{line:call.line,documentation:doc,visibility:visibility,parent:klass,type:this.program.system.voidType,name:klass.name,isMutator:true,body:this.#parseBlock()});continue;}let line=this.line;let name=this.stringValue;if(!this.expect(FuToken.ID))continue;if(this.see(FuToken.LEFT_PARENTHESIS)||this.see(FuToken.EXCLAMATION_MARK)){if(callType==FuCallType.STATIC||klass.callType==FuCallType.ABSTRACT);else if(klass.callType==FuCallType.STATIC)this.reportError("Only static methods allowed in a static class");else if(callType==FuCallType.ABSTRACT)this.reportError("Abstract methods allowed only in an abstract class");else if(klass.callType==FuCallType.SEALED&&callType==FuCallType.VIRTUAL)this.reportError("Virtual methods disallowed in a sealed class");if(visibility==FuVisibility.PRIVATE&&callType!=FuCallType.STATIC&&callType!=FuCallType.NORMAL)this.reportError(`${FuParser.#callTypeToString(callType)} method cannot be private`);let method=Object.assign(new FuMethod(),{line:line,documentation:doc,visibility:visibility,callType:callType,typeExpr:type,name:name});this.#addSymbol(klass,method);method.parameters.parent=klass;this.#parseMethod(method);continue;}if(visibility==FuVisibility.PUBLIC)this.reportError("Field cannot be public");if(callType!=FuCallType.NORMAL)this.reportError(`Field cannot be ${FuParser.#callTypeToString(callType)}`);if(type==this.program.system.voidType)this.reportError("Field cannot be void");let field=Object.assign(new FuField(),{line:line,documentation:doc,visibility:visibility,typeExpr:type,name:name,value:this.#parseInitializer()});this.#addSymbol(klass,field);this.expect(FuToken.SEMICOLON);}this.expect(FuToken.RIGHT_BRACE);}#parseEnum(doc,isPublic){this.expect(FuToken.ENUM);let flags=this.eat(FuToken.ASTERISK);let enu=this.program.system.newEnum(flags);enu.filename=this.filename;enu.line=this.line;enu.documentation=doc;enu.isPublic=isPublic;enu.name=this.stringValue;if(this.expect(FuToken.ID))this.#addSymbol(this.program,enu);this.expect(FuToken.LEFT_BRACE);do{let konst=Object.assign(new FuConst(),{visibility:FuVisibility.PUBLIC,documentation:this.#parseDoc(),line:this.line,name:this.stringValue,type:enu});this.expect(FuToken.ID);if(this.eat(FuToken.ASSIGN))konst.value=this.#parseExpr();else if(flags)this.reportError("enum* symbol must be assigned a value");this.#addSymbol(enu,konst);}while(this.eat(FuToken.COMMA));this.expect(FuToken.RIGHT_BRACE);}parse(filename,input,inputLength){this.open(filename,input,inputLength);while(!this.see(FuToken.END_OF_FILE)){let doc=this.#parseDoc();let isPublic=this.eat(FuToken.PUBLIC);switch(this.currentToken){case FuToken.CLASS:this.#parseClass(doc,isPublic,FuCallType.NORMAL);break;case FuToken.STATIC:case FuToken.ABSTRACT:case FuToken.SEALED:this.#parseClass(doc,isPublic,this.#parseCallType());break;case FuToken.ENUM:this.#parseEnum(doc,isPublic);break;case FuToken.NATIVE:this.program.topLevelNatives.push(this.#parseNative().content);break;default:this.reportError("Expected class or enum");this.nextToken();break;}}}}class FuSemaHost extends FuParserHost{}class GenHost extends FuSemaHost{}class FuConsoleHost extends GenHost{hasErrors=false;reportError(filename,startLine,startColumn,endLine,endColumn,message){this.hasErrors=true;console.error(`${filename}(${startLine}): ERROR: ${message}`);}}class FuSema{#host;#currentMethod=null;#currentScope;#currentPureMethods=new Set();#currentPureArguments={};#poison=Object.assign(new FuType(),{name:"poison"});setHost(host){this.#host=host;}#getCurrentContainer(){return this.#currentScope.getContainer();}reportError(statement,message){this.#host.reportError(this.#getCurrentContainer().filename,statement.line,1,statement.line,1,message);}#poisonError(statement,message){this.reportError(statement,message);return this.#poison;}#resolveBase(klass){if(klass.hasBaseClass()){this.#currentScope=klass;let baseClass;if((baseClass=this.program.tryLookup(klass.baseClassName,true))instanceof FuClass){if(klass.isPublic&&!baseClass.isPublic)this.reportError(klass,"Public class cannot derive from an internal class");baseClass.hasSubclasses=true;klass.parent=baseClass;}else this.reportError(klass,`Base class ${klass.baseClassName} not found`);}this.program.classes.push(klass);}#checkBaseCycle(klass){let hare=klass;let tortoise=klass;do{hare=hare.parent;if(hare==null)return;hare=hare.parent;if(hare==null)return;tortoise=tortoise.parent;}while(tortoise!=hare);this.#currentScope=klass;this.reportError(klass,`Circular inheritance for class ${klass.name}`);}static#takePtr(expr){let arrayStg;if((arrayStg=expr.type)instanceof FuArrayStorageType)arrayStg.ptrTaken=true;}#coerce(expr,type){if(expr==this.#poison)return false;if(!type.isAssignableFrom(expr.type)){this.reportError(expr,`Cannot coerce ${expr.type} to ${type}`);return false;}let prefix;if((prefix=expr)instanceof FuPrefixExpr&&prefix.op==FuToken.NEW&&!(type instanceof FuDynamicPtrType)){const newType=expr.type;let kind=newType.class.id==FuId.ARRAY_PTR_CLASS?"array":"object";this.reportError(expr,`Dynamically allocated ${kind} must be assigned to a ${expr.type} reference`);return false;}FuSema.#takePtr(expr);return true;}#visitInterpolatedString(expr){let partsCount=0;let s="";for(let partsIndex=0;partsIndex<expr.parts.length;partsIndex++){let part=expr.parts[partsIndex];s+=part.prefix;let arg=this.#visitExpr(part.argument);this.#coerce(arg,this.program.system.printableType);if(arg.type instanceof FuIntegerType){switch(part.format){case 32:let literalLong;if((literalLong=arg)instanceof FuLiteralLong&&part.widthExpr==null){s+=`${literalLong.value}`;continue;}break;case 68:case 100:case 88:case 120:if(part.widthExpr!=null&&part.precision>=0)this.reportError(part.widthExpr,"Cannot format an integer with both width and precision");break;default:this.reportError(arg,"Invalid format");break;}}else if(arg.type instanceof FuFloatingType){switch(part.format){case 32:case 70:case 102:case 69:case 101:break;default:this.reportError(arg,"Invalid format");break;}}else {if(part.format!=32)this.reportError(arg,"Invalid format");else {let literalString;if((literalString=arg)instanceof FuLiteralString&&part.widthExpr==null){s+=literalString.value;continue;}}}let targetPart=expr.parts[partsCount++];targetPart.prefix=s;targetPart.argument=arg;targetPart.widthExpr=part.widthExpr;targetPart.width=part.widthExpr!=null?this.#foldConstInt(part.widthExpr):0;targetPart.format=part.format;targetPart.precision=part.precision;s="";}s+=expr.suffix;if(partsCount==0)return this.program.system.newLiteralString(s,expr.line);expr.type=this.program.system.stringStorageType;expr.parts.splice(partsCount,expr.parts.length-partsCount);expr.suffix=s;return expr;}#lookup(expr,scope){if(expr.symbol==null){expr.symbol=scope.tryLookup(expr.name,expr.left==null);if(expr.symbol==null)return this.#poisonError(expr,`${expr.name} not found`);expr.type=expr.symbol.type;}let konst;if(!(scope instanceof FuEnum)&&(konst=expr.symbol)instanceof FuConst){this.#resolveConst(konst);if(konst.value instanceof FuLiteral||konst.value instanceof FuSymbolReference){let intValue;if(konst.type instanceof FuFloatingType&&(intValue=konst.value)instanceof FuLiteralLong)return this.#toLiteralDouble(expr,Number(intValue.value));return konst.value;}}return expr;}#visitSymbolReference(expr){if(expr.left==null){let resolved=this.#lookup(expr,this.#currentScope);let nearMember;if((nearMember=expr.symbol)instanceof FuMember){let memberClass;if(nearMember.visibility==FuVisibility.PRIVATE&&(memberClass=nearMember.parent)instanceof FuClass&&memberClass!=this.#getCurrentContainer())this.reportError(expr,`Cannot access private member ${expr.name}`);if(!nearMember.isStatic()&&(this.#currentMethod==null||this.#currentMethod.isStatic()))this.reportError(expr,`Cannot use instance member ${expr.name} from static context`);}let symbol;if((symbol=resolved)instanceof FuSymbolReference){let v;if((v=symbol.symbol)instanceof FuVar){let loop;if((loop=v.parent)instanceof FuFor)loop.isIteratorUsed=true;else if(this.#currentPureArguments.hasOwnProperty(v))return this.#currentPureArguments[v];}else if(symbol.symbol.id==FuId.REGEX_OPTIONS_ENUM)this.program.regexOptionsEnum=true;}return resolved;}let left=this.#visitExpr(expr.left);if(left==this.#poison)return left;let scope;let baseSymbol;let isBase=(baseSymbol=left)instanceof FuSymbolReference&&baseSymbol.symbol.id==FuId.BASE_PTR;if(isBase){let baseClass;if(this.#currentMethod==null||!((baseClass=this.#currentMethod.parent.parent)instanceof FuClass))return this.#poisonError(expr,"No base class");scope=baseClass;}else {let leftSymbol;let obj;if((leftSymbol=left)instanceof FuSymbolReference&&(obj=leftSymbol.symbol)instanceof FuScope)scope=obj;else {scope=left.type;let klass;if((klass=scope)instanceof FuClassType)scope=klass.class;}}let result=this.#lookup(expr,scope);if(result!=expr)return result;let member;if((member=expr.symbol)instanceof FuMember){switch(member.visibility){case FuVisibility.PRIVATE:if(member.parent!=this.#currentMethod.parent||this.#currentMethod.parent!=scope)this.reportError(expr,`Cannot access private member ${expr.name}`);break;case FuVisibility.PROTECTED:if(isBase)break;const currentClass=this.#currentMethod.parent;const scopeClass=scope;if(!currentClass.isSameOrBaseOf(scopeClass))this.reportError(expr,`Cannot access protected member ${expr.name}`);break;case FuVisibility.NUMERIC_ELEMENT_TYPE:let klass;if((klass=left.type)instanceof FuClassType&&!(klass.getElementType()instanceof FuNumericType))this.reportError(expr,"Method restricted to collections of numbers");break;case FuVisibility.FINAL_VALUE_TYPE:if(!left.type.asClassType().getValueType().isFinal())this.reportError(expr,"Method restricted to dictionaries with storage values");break;default:switch(expr.symbol.id){case FuId.ARRAY_LENGTH:const arrayStorage=left.type;return this.#toLiteralLong(expr,BigInt(arrayStorage.length));case FuId.STRING_LENGTH:let leftLiteral;if((leftLiteral=left)instanceof FuLiteralString){let length=leftLiteral.getAsciiLength();if(length>=0)return this.#toLiteralLong(expr,BigInt(length));}break;}break;}if(!(member instanceof FuMethodGroup)){let leftContainer;if((leftContainer=left)instanceof FuSymbolReference&&leftContainer.symbol instanceof FuContainerType){if(!member.isStatic())this.reportError(expr,`Cannot use instance member ${expr.name} without an object`);}else if(member.isStatic())this.reportError(expr,`${expr.name} is static`);}}return Object.assign(new FuSymbolReference(),{line:expr.line,left:left,name:expr.name,symbol:expr.symbol,type:expr.type});}static#union(left,right){if(right==null)return left;if(right.min<left.min){if(right.max>=left.max)return right;return FuRangeType.new(right.min,left.max);}if(right.max>left.max)return FuRangeType.new(left.min,right.max);return left;}#getIntegerType(left,right){let type=this.program.system.promoteIntegerTypes(left.type,right.type);this.#coerce(left,type);this.#coerce(right,type);return type;}#getShiftType(left,right){let intType=this.program.system.intType;this.#coerce(right,intType);if(left.type.id==FuId.LONG_TYPE){const longType=left.type;return longType;}this.#coerce(left,intType);return intType;}#getNumericType(left,right){let type=this.program.system.promoteNumericTypes(left.type,right.type);this.#coerce(left,type);this.#coerce(right,type);return type;}static#saturatedNeg(a){if(a==-2147483648)return 2147483647;return -a;}static#saturatedAdd(a,b){let c=a+b;if(c>=0){if(a<0&&b<0)return -2147483648;}else if(a>0&&b>0)return 2147483647;return c;}static#saturatedSub(a,b){if(b==-2147483648)return a<0?a^b:2147483647;return FuSema.#saturatedAdd(a,-b);}static#saturatedMul(a,b){if(a==0||b==0)return 0;if(a==-2147483648)return b>>31^a;if(b==-2147483648)return a>>31^b;if((2147483647/Math.abs(a)|0)<Math.abs(b))return (a^b)>>31^2147483647;return a*b;}static#saturatedDiv(a,b){if(a==-2147483648&&b==-1)return 2147483647;return a/b|0;}static#saturatedShiftRight(a,b){return a>>(b>=31||b<0?31:b);}static#bitwiseUnsignedOp(left,op,right){let leftVariableBits=left.getVariableBits();let rightVariableBits=right.getVariableBits();let min;let max;switch(op){case FuToken.AND:min=left.min&right.min&~FuRangeType.getMask(~left.min&~right.min&(leftVariableBits|rightVariableBits));max=(left.max|leftVariableBits)&(right.max|rightVariableBits);if(max>left.max)max=left.max;if(max>right.max)max=right.max;break;case FuToken.OR:min=left.min&~leftVariableBits|right.min&~rightVariableBits;max=left.max|right.max|FuRangeType.getMask(left.max&right.max&FuRangeType.getMask(leftVariableBits|rightVariableBits));if(min<left.min)min=left.min;if(min<right.min)min=right.min;break;case FuToken.XOR:let variableBits=leftVariableBits|rightVariableBits;min=(left.min^right.min)&~variableBits;max=left.max^right.max|variableBits;break;default:throw new Error();}if(min>max)return FuRangeType.new(max,min);return FuRangeType.new(min,max);}#isEnumOp(left,right){if(left.type instanceof FuEnum){if(left.type.id!=FuId.BOOL_TYPE&&!(left.type instanceof FuEnumFlags))this.reportError(left,`Define flags enumeration as: enum* ${left.type}`);this.#coerce(right,left.type);return true;}return false;}#bitwiseOp(left,op,right){let leftRange;let rightRange;if((leftRange=left.type)instanceof FuRangeType&&(rightRange=right.type)instanceof FuRangeType){let range=null;let rightNegative;let rightPositive;if(rightRange.min>=0){rightNegative=null;rightPositive=rightRange;}else if(rightRange.max<0){rightNegative=rightRange;rightPositive=null;}else {rightNegative=FuRangeType.new(rightRange.min,-1);rightPositive=FuRangeType.new(0,rightRange.max);}if(leftRange.min<0){let leftNegative=leftRange.max<0?leftRange:FuRangeType.new(leftRange.min,-1);if(rightNegative!=null)range=FuSema.#bitwiseUnsignedOp(leftNegative,op,rightNegative);if(rightPositive!=null)range=FuSema.#union(FuSema.#bitwiseUnsignedOp(leftNegative,op,rightPositive),range);}if(leftRange.max>=0){let leftPositive=leftRange.min>=0?leftRange:FuRangeType.new(0,leftRange.max);if(rightNegative!=null)range=FuSema.#union(FuSema.#bitwiseUnsignedOp(leftPositive,op,rightNegative),range);if(rightPositive!=null)range=FuSema.#union(FuSema.#bitwiseUnsignedOp(leftPositive,op,rightPositive),range);}return range;}if(this.#isEnumOp(left,right))return left.type;return this.#getIntegerType(left,right);}static#newRangeType(a,b,c,d){if(a>b){let t=a;a=b;b=t;}if(c>d){let t=c;c=d;d=t;}return FuRangeType.new(a<=c?a:c,b>=d?b:d);}#toLiteralBool(expr,value){let result=value?new FuLiteralTrue():new FuLiteralFalse();result.line=expr.line;result.type=this.program.system.boolType;return result;}#toLiteralLong(expr,value){return this.program.system.newLiteralLong(value,expr.line);}#toLiteralDouble(expr,value){return Object.assign(new FuLiteralDouble(),{line:expr.line,type:this.program.system.doubleType,value:value});}#checkLValue(expr){let indexing;if(expr instanceof FuSymbolReference){const symbol=expr;if(symbol.symbol instanceof FuVar){const def=symbol.symbol;def.isAssigned=true;if(symbol.symbol.parent instanceof FuFor){const forLoop=symbol.symbol.parent;forLoop.isRange=false;}else if(symbol.symbol.parent instanceof FuForeach)this.reportError(expr,"Cannot assign a foreach iteration variable");for(let scope=this.#currentScope;!(scope instanceof FuClass);scope=scope.parent){let forLoop;let binaryCond;if((forLoop=scope)instanceof FuFor&&forLoop.isRange&&(binaryCond=forLoop.cond)instanceof FuBinaryExpr&&binaryCond.right.isReferenceTo(symbol.symbol))forLoop.isRange=false;}}else if(symbol.symbol instanceof FuField){if(symbol.left==null){if(!this.#currentMethod.isMutator)this.reportError(expr,"Cannot modify field in a non-mutating method");}else {if(symbol.left.type instanceof FuStorageType);else if(symbol.left.type instanceof FuReadWriteClassType);else if(symbol.left.type instanceof FuClassType)this.reportError(expr,"Cannot modify field through a read-only reference");else throw new Error();}}else this.reportError(expr,"Cannot modify this");}else if((indexing=expr)instanceof FuBinaryExpr&&indexing.op==FuToken.LEFT_BRACKET){if(indexing.left.type instanceof FuStorageType);else if(indexing.left.type instanceof FuReadWriteClassType);else if(indexing.left.type instanceof FuClassType)this.reportError(expr,"Cannot modify array through a read-only reference");else throw new Error();}else this.reportError(expr,"Cannot modify this");}#concatenate(left,right){let result=Object.assign(new FuInterpolatedString(),{line:left.line,type:this.program.system.stringStorageType});result.parts.push(...left.parts);if(right.parts.length==0)result.suffix=left.suffix+right.suffix;else {result.parts.push(...right.parts);let middle=result.parts[left.parts.length];middle.prefix=left.suffix+middle.prefix;result.suffix=right.suffix;}return result;}#toInterpolatedString(expr){let interpolated;if((interpolated=expr)instanceof FuInterpolatedString)return interpolated;let result=Object.assign(new FuInterpolatedString(),{line:expr.line,type:this.program.system.stringStorageType});let literal;if((literal=expr)instanceof FuLiteral)result.suffix=literal.getLiteralString();else {result.addPart("",expr);result.suffix="";}return result;}#checkComparison(left,right){if(left.type instanceof FuEnum)this.#coerce(right,left.type);else {let doubleType=this.program.system.doubleType;this.#coerce(left,doubleType);this.#coerce(right,doubleType);}}#openScope(scope){scope.parent=this.#currentScope;this.#currentScope=scope;}#closeScope(){this.#currentScope=this.#currentScope.parent;}#resolveNew(expr){if(expr.type!=null)return expr;let type;let binaryNew;if((binaryNew=expr.inner)instanceof FuBinaryExpr&&binaryNew.op==FuToken.LEFT_BRACE){type=this.#toType(binaryNew.left,true);let klass;if(!((klass=type)instanceof FuClassType)||klass instanceof FuReadWriteClassType)return this.#poisonError(expr,"Invalid argument to new");const init=binaryNew.right;this.#resolveObjectLiteral(klass,init);expr.type=Object.assign(new FuDynamicPtrType(),{line:expr.line,class:klass.class});expr.inner=init;return expr;}type=this.#toType(expr.inner,true);if(type instanceof FuArrayStorageType){const array=type;expr.type=Object.assign(new FuDynamicPtrType(),{line:expr.line,class:this.program.system.arrayPtrClass,typeArg0:array.getElementType()});expr.inner=array.lengthExpr;return expr;}else if(type instanceof FuStorageType){const klass=type;expr.type=Object.assign(new FuDynamicPtrType(),{line:expr.line,class:klass.class,typeArg0:klass.typeArg0,typeArg1:klass.typeArg1});expr.inner=null;return expr;}else return this.#poisonError(expr,"Invalid argument to new");}getResourceLength(name,expr){return 0;}#visitPrefixExpr(expr){let inner;let type;switch(expr.op){case FuToken.INCREMENT:case FuToken.DECREMENT:inner=this.#visitExpr(expr.inner);this.#checkLValue(inner);this.#coerce(inner,this.program.system.doubleType);let xcrementRange;if((xcrementRange=inner.type)instanceof FuRangeType){let delta=expr.op==FuToken.INCREMENT?1:-1;type=FuRangeType.new(xcrementRange.min+delta,xcrementRange.max+delta);}else type=inner.type;expr.inner=inner;expr.type=type;return expr;case FuToken.MINUS:inner=this.#visitExpr(expr.inner);this.#coerce(inner,this.program.system.doubleType);let negRange;if((negRange=inner.type)instanceof FuRangeType){if(negRange.min==negRange.max)return this.#toLiteralLong(expr,BigInt(-negRange.min));type=FuRangeType.new(FuSema.#saturatedNeg(negRange.max),FuSema.#saturatedNeg(negRange.min));}else {let d;if((d=inner)instanceof FuLiteralDouble)return this.#toLiteralDouble(expr,-d.value);else {let l;if((l=inner)instanceof FuLiteralLong)return this.#toLiteralLong(expr,-l.value);else type=inner.type;}}break;case FuToken.TILDE:inner=this.#visitExpr(expr.inner);if(inner.type instanceof FuEnumFlags)type=inner.type;else {this.#coerce(inner,this.program.system.intType);let notRange;if((notRange=inner.type)instanceof FuRangeType)type=FuRangeType.new(~notRange.max,~notRange.min);else type=inner.type;}break;case FuToken.EXCLAMATION_MARK:inner=this.#resolveBool(expr.inner);return Object.assign(new FuPrefixExpr(),{line:expr.line,op:FuToken.EXCLAMATION_MARK,inner:inner,type:this.program.system.boolType});case FuToken.NEW:return this.#resolveNew(expr);case FuToken.RESOURCE:let resourceName;if(!((resourceName=this.#foldConst(expr.inner))instanceof FuLiteralString))return this.#poisonError(expr,"Resource name must be a string");inner=resourceName;type=Object.assign(new FuArrayStorageType(),{class:this.program.system.arrayStorageClass,typeArg0:this.program.system.byteType,length:this.getResourceLength(resourceName.value,expr)});break;default:throw new Error();}return Object.assign(new FuPrefixExpr(),{line:expr.line,op:expr.op,inner:inner,type:type});}#visitPostfixExpr(expr){expr.inner=this.#visitExpr(expr.inner);switch(expr.op){case FuToken.INCREMENT:case FuToken.DECREMENT:this.#checkLValue(expr.inner);this.#coerce(expr.inner,this.program.system.doubleType);expr.type=expr.inner.type;return expr;default:return this.#poisonError(expr,`Unexpected ${FuLexer.tokenToString(expr.op)}`);}}static#canCompareEqual(left,right){if(left instanceof FuNumericType)return right instanceof FuNumericType;else if(left instanceof FuEnum)return left==right;else if(left instanceof FuClassType){const leftClass=left;if(left.nullable&&right.id==FuId.NULL_TYPE)return true;if(left instanceof FuStorageType&&(right instanceof FuStorageType||right instanceof FuDynamicPtrType)||left instanceof FuDynamicPtrType&&right instanceof FuStorageType)return false;let rightClass;return (rightClass=right)instanceof FuClassType&&(leftClass.class.isSameOrBaseOf(rightClass.class)||rightClass.class.isSameOrBaseOf(leftClass.class))&&leftClass.equalTypeArguments(rightClass);}else return left.id==FuId.NULL_TYPE&&right.nullable;}#resolveEquality(expr,left,right){if(!FuSema.#canCompareEqual(left.type,right.type))return this.#poisonError(expr,`Cannot compare ${left.type} with ${right.type}`);let leftRange;let rightRange;if((leftRange=left.type)instanceof FuRangeType&&(rightRange=right.type)instanceof FuRangeType){if(leftRange.min==leftRange.max&&leftRange.min==rightRange.min&&leftRange.min==rightRange.max)return this.#toLiteralBool(expr,expr.op==FuToken.EQUAL);if(leftRange.max<rightRange.min||leftRange.min>rightRange.max)return this.#toLiteralBool(expr,expr.op==FuToken.NOT_EQUAL);}else {let leftLong;let rightLong;let leftDouble;let rightDouble;let leftString;let rightString;if((leftLong=left)instanceof FuLiteralLong&&(rightLong=right)instanceof FuLiteralLong)return this.#toLiteralBool(expr,expr.op==FuToken.NOT_EQUAL!=(leftLong.value==rightLong.value));else if((leftDouble=left)instanceof FuLiteralDouble&&(rightDouble=right)instanceof FuLiteralDouble)return this.#toLiteralBool(expr,expr.op==FuToken.NOT_EQUAL!=(leftDouble.value==rightDouble.value));else if((leftString=left)instanceof FuLiteralString&&(rightString=right)instanceof FuLiteralString)return this.#toLiteralBool(expr,expr.op==FuToken.NOT_EQUAL!=(leftString.value==rightString.value));else if(left instanceof FuLiteralNull&&right instanceof FuLiteralNull||left instanceof FuLiteralFalse&&right instanceof FuLiteralFalse||left instanceof FuLiteralTrue&&right instanceof FuLiteralTrue)return this.#toLiteralBool(expr,expr.op==FuToken.EQUAL);else if(left instanceof FuLiteralFalse&&right instanceof FuLiteralTrue||left instanceof FuLiteralTrue&&right instanceof FuLiteralFalse)return this.#toLiteralBool(expr,expr.op==FuToken.NOT_EQUAL);if(left.isConstEnum()&&right.isConstEnum())return this.#toLiteralBool(expr,expr.op==FuToken.NOT_EQUAL!=(left.intValue()==right.intValue()));}FuSema.#takePtr(left);FuSema.#takePtr(right);return Object.assign(new FuBinaryExpr(),{line:expr.line,left:left,op:expr.op,right:right,type:this.program.system.boolType});}#resolveIs(expr,left,right){let leftPtr;if(!((leftPtr=left.type)instanceof FuClassType)||left.type instanceof FuStorageType)return this.#poisonError(expr,"Left hand side of the 'is' operator must be an object reference");let klass;if(right instanceof FuSymbolReference){const symbol=right;let klass2;if((klass2=symbol.symbol)instanceof FuClass)klass=klass2;else return this.#poisonError(expr,"Right hand side of the 'is' operator must be a class name");}else if(right instanceof FuVar){const def=right;let rightPtr;if(!((rightPtr=def.type)instanceof FuClassType))return this.#poisonError(expr,"Right hand side of the 'is' operator must be an object reference definition");if(rightPtr instanceof FuReadWriteClassType&&!(leftPtr instanceof FuDynamicPtrType)&&(rightPtr instanceof FuDynamicPtrType||!(leftPtr instanceof FuReadWriteClassType)))return this.#poisonError(expr,`${leftPtr} cannot be casted to ${rightPtr}`);klass=rightPtr.class;}else return this.#poisonError(expr,"Right hand side of the 'is' operator must be a class name");if(klass.isSameOrBaseOf(leftPtr.class))return this.#poisonError(expr,`${leftPtr} is ${klass.name}, the 'is' operator would always return 'true'`);if(!leftPtr.class.isSameOrBaseOf(klass))return this.#poisonError(expr,`${leftPtr} is not base class of ${klass.name}, the 'is' operator would always return 'false'`);expr.left=left;expr.type=this.program.system.boolType;return expr;}#visitBinaryExpr(expr){let left=this.#visitExpr(expr.left);let right=this.#visitExpr(expr.right);if(left==this.#poison||right==this.#poison)return this.#poison;let type;switch(expr.op){case FuToken.LEFT_BRACKET:let klass;if(!((klass=left.type)instanceof FuClassType))return this.#poisonError(expr,"Cannot index this object");switch(klass.class.id){case FuId.STRING_CLASS:this.#coerce(right,this.program.system.intType);let stringLiteral;let indexLiteral;if((stringLiteral=left)instanceof FuLiteralString&&(indexLiteral=right)instanceof FuLiteralLong){let i=indexLiteral.value;if(i>=0&&i<=2147483647){let c=stringLiteral.getAsciiAt(Number(i));if(c>=0)return FuLiteralChar.new(c,expr.line);}}type=this.program.system.charType;break;case FuId.ARRAY_PTR_CLASS:case FuId.ARRAY_STORAGE_CLASS:case FuId.LIST_CLASS:this.#coerce(right,this.program.system.intType);type=klass.getElementType();break;case FuId.DICTIONARY_CLASS:case FuId.SORTED_DICTIONARY_CLASS:case FuId.ORDERED_DICTIONARY_CLASS:this.#coerce(right,klass.getKeyType());type=klass.getValueType();break;default:return this.#poisonError(expr,"Cannot index this object");}break;case FuToken.PLUS:let leftAdd;let rightAdd;if((leftAdd=left.type)instanceof FuRangeType&&(rightAdd=right.type)instanceof FuRangeType){type=FuRangeType.new(FuSema.#saturatedAdd(leftAdd.min,rightAdd.min),FuSema.#saturatedAdd(leftAdd.max,rightAdd.max));}else if(left.type instanceof FuStringType){this.#coerce(right,this.program.system.stringPtrType);let leftLiteral;let rightLiteral;if((leftLiteral=left)instanceof FuLiteral&&(rightLiteral=right)instanceof FuLiteral)return this.program.system.newLiteralString(leftLiteral.getLiteralString()+rightLiteral.getLiteralString(),expr.line);if(left instanceof FuInterpolatedString||right instanceof FuInterpolatedString)return this.#concatenate(this.#toInterpolatedString(left),this.#toInterpolatedString(right));type=this.program.system.stringStorageType;}else type=this.#getNumericType(left,right);break;case FuToken.MINUS:let leftSub;let rightSub;if((leftSub=left.type)instanceof FuRangeType&&(rightSub=right.type)instanceof FuRangeType){type=FuRangeType.new(FuSema.#saturatedSub(leftSub.min,rightSub.max),FuSema.#saturatedSub(leftSub.max,rightSub.min));}else type=this.#getNumericType(left,right);break;case FuToken.ASTERISK:let leftMul;let rightMul;if((leftMul=left.type)instanceof FuRangeType&&(rightMul=right.type)instanceof FuRangeType){type=FuSema.#newRangeType(FuSema.#saturatedMul(leftMul.min,rightMul.min),FuSema.#saturatedMul(leftMul.min,rightMul.max),FuSema.#saturatedMul(leftMul.max,rightMul.min),FuSema.#saturatedMul(leftMul.max,rightMul.max));}else type=this.#getNumericType(left,right);break;case FuToken.SLASH:let leftDiv;let rightDiv;if((leftDiv=left.type)instanceof FuRangeType&&(rightDiv=right.type)instanceof FuRangeType){let denMin=rightDiv.min;if(denMin==0)denMin=1;let denMax=rightDiv.max;if(denMax==0)denMax=-1;type=FuSema.#newRangeType(FuSema.#saturatedDiv(leftDiv.min,denMin),FuSema.#saturatedDiv(leftDiv.min,denMax),FuSema.#saturatedDiv(leftDiv.max,denMin),FuSema.#saturatedDiv(leftDiv.max,denMax));}else type=this.#getNumericType(left,right);break;case FuToken.MOD:let leftMod;let rightMod;if((leftMod=left.type)instanceof FuRangeType&&(rightMod=right.type)instanceof FuRangeType){let den=~Math.min(rightMod.min,-rightMod.max);if(den<0)return this.#poisonError(expr,"Mod zero");type=FuRangeType.new(leftMod.min>=0?0:Math.max(leftMod.min,-den),leftMod.max<0?0:Math.min(leftMod.max,den));}else type=this.#getIntegerType(left,right);break;case FuToken.AND:case FuToken.OR:case FuToken.XOR:type=this.#bitwiseOp(left,expr.op,right);break;case FuToken.SHIFT_LEFT:let leftShl;let rightShl;if((leftShl=left.type)instanceof FuRangeType&&(rightShl=right.type)instanceof FuRangeType&&leftShl.min==leftShl.max&&rightShl.min==rightShl.max){let result=leftShl.min<<rightShl.min;type=FuRangeType.new(result,result);}else type=this.#getShiftType(left,right);break;case FuToken.SHIFT_RIGHT:let leftShr;let rightShr;if((leftShr=left.type)instanceof FuRangeType&&(rightShr=right.type)instanceof FuRangeType){if(rightShr.min<0)rightShr=FuRangeType.new(0,32);type=FuRangeType.new(FuSema.#saturatedShiftRight(leftShr.min,leftShr.min<0?rightShr.min:rightShr.max),FuSema.#saturatedShiftRight(leftShr.max,leftShr.max<0?rightShr.max:rightShr.min));}else type=this.#getShiftType(left,right);break;case FuToken.EQUAL:case FuToken.NOT_EQUAL:return this.#resolveEquality(expr,left,right);case FuToken.LESS:let leftLess;let rightLess;if((leftLess=left.type)instanceof FuRangeType&&(rightLess=right.type)instanceof FuRangeType){if(leftLess.max<rightLess.min)return this.#toLiteralBool(expr,true);if(leftLess.min>=rightLess.max)return this.#toLiteralBool(expr,false);}else this.#checkComparison(left,right);type=this.program.system.boolType;break;case FuToken.LESS_OR_EQUAL:let leftLeq;let rightLeq;if((leftLeq=left.type)instanceof FuRangeType&&(rightLeq=right.type)instanceof FuRangeType){if(leftLeq.max<=rightLeq.min)return this.#toLiteralBool(expr,true);if(leftLeq.min>rightLeq.max)return this.#toLiteralBool(expr,false);}else this.#checkComparison(left,right);type=this.program.system.boolType;break;case FuToken.GREATER:let leftGreater;let rightGreater;if((leftGreater=left.type)instanceof FuRangeType&&(rightGreater=right.type)instanceof FuRangeType){if(leftGreater.min>rightGreater.max)return this.#toLiteralBool(expr,true);if(leftGreater.max<=rightGreater.min)return this.#toLiteralBool(expr,false);}else this.#checkComparison(left,right);type=this.program.system.boolType;break;case FuToken.GREATER_OR_EQUAL:let leftGeq;let rightGeq;if((leftGeq=left.type)instanceof FuRangeType&&(rightGeq=right.type)instanceof FuRangeType){if(leftGeq.min>=rightGeq.max)return this.#toLiteralBool(expr,true);if(leftGeq.max<rightGeq.min)return this.#toLiteralBool(expr,false);}else this.#checkComparison(left,right);type=this.program.system.boolType;break;case FuToken.COND_AND:this.#coerce(left,this.program.system.boolType);this.#coerce(right,this.program.system.boolType);if(left instanceof FuLiteralTrue)return right;if(left instanceof FuLiteralFalse||right instanceof FuLiteralTrue)return left;type=this.program.system.boolType;break;case FuToken.COND_OR:this.#coerce(left,this.program.system.boolType);this.#coerce(right,this.program.system.boolType);if(left instanceof FuLiteralTrue||right instanceof FuLiteralFalse)return left;if(left instanceof FuLiteralFalse)return right;type=this.program.system.boolType;break;case FuToken.ASSIGN:this.#checkLValue(left);this.#coerce(right,left.type);expr.left=left;expr.right=right;expr.type=left.type;return expr;case FuToken.ADD_ASSIGN:this.#checkLValue(left);if(left.type.id==FuId.STRING_STORAGE_TYPE)this.#coerce(right,this.program.system.stringPtrType);else {this.#coerce(left,this.program.system.doubleType);this.#coerce(right,left.type);}expr.left=left;expr.right=right;expr.type=left.type;return expr;case FuToken.SUB_ASSIGN:case FuToken.MUL_ASSIGN:case FuToken.DIV_ASSIGN:this.#checkLValue(left);this.#coerce(left,this.program.system.doubleType);this.#coerce(right,left.type);expr.left=left;expr.right=right;expr.type=left.type;return expr;case FuToken.MOD_ASSIGN:case FuToken.SHIFT_LEFT_ASSIGN:case FuToken.SHIFT_RIGHT_ASSIGN:this.#checkLValue(left);this.#coerce(left,this.program.system.intType);this.#coerce(right,this.program.system.intType);expr.left=left;expr.right=right;expr.type=left.type;return expr;case FuToken.AND_ASSIGN:case FuToken.OR_ASSIGN:case FuToken.XOR_ASSIGN:this.#checkLValue(left);if(!this.#isEnumOp(left,right)){this.#coerce(left,this.program.system.intType);this.#coerce(right,this.program.system.intType);}expr.left=left;expr.right=right;expr.type=left.type;return expr;case FuToken.IS:return this.#resolveIs(expr,left,right);case FuToken.RANGE:return this.#poisonError(expr,"Range within an expression");default:throw new Error();}let range;if((range=type)instanceof FuRangeType&&range.min==range.max)return this.#toLiteralLong(expr,BigInt(range.min));return Object.assign(new FuBinaryExpr(),{line:expr.line,left:left,op:expr.op,right:right,type:type});}#tryGetPtr(type,nullable){if(type.id==FuId.STRING_STORAGE_TYPE)return nullable?this.program.system.stringNullablePtrType:this.program.system.stringPtrType;let storage;if((storage=type)instanceof FuStorageType)return Object.assign(new FuReadWriteClassType(),{class:storage.class.id==FuId.ARRAY_STORAGE_CLASS?this.program.system.arrayPtrClass:storage.class,nullable:nullable,typeArg0:storage.typeArg0,typeArg1:storage.typeArg1});let ptr;if(nullable&&(ptr=type)instanceof FuClassType&&!ptr.nullable){let result;if(type instanceof FuDynamicPtrType)result=new FuDynamicPtrType();else if(type instanceof FuReadWriteClassType)result=new FuReadWriteClassType();else result=new FuClassType();result.class=ptr.class;result.nullable=true;result.typeArg0=ptr.typeArg0;result.typeArg1=ptr.typeArg1;return result;}return type;}static#getLowestCommonAncestor(left,right){for(;;){if(left.isSameOrBaseOf(right))return left;let parent;if((parent=left.parent)instanceof FuClass)left=parent;else return null;}}#getCommonType(left,right){let leftRange;let rightRange;if((leftRange=left.type)instanceof FuRangeType&&(rightRange=right.type)instanceof FuRangeType)return FuSema.#union(leftRange,rightRange);let nullable=left.type.nullable||right.type.nullable;let ptr=this.#tryGetPtr(left.type,nullable);if(ptr.isAssignableFrom(right.type))return ptr;ptr=this.#tryGetPtr(right.type,nullable);if(ptr.isAssignableFrom(left.type))return ptr;let leftClass;let rightClass;if((leftClass=left.type)instanceof FuClassType&&(rightClass=right.type)instanceof FuClassType&&leftClass.equalTypeArguments(rightClass)){let klass=FuSema.#getLowestCommonAncestor(leftClass.class,rightClass.class);if(klass!=null){let result;if(!(leftClass instanceof FuReadWriteClassType)||!(rightClass instanceof FuReadWriteClassType))result=new FuClassType();else if(leftClass instanceof FuDynamicPtrType&&rightClass instanceof FuDynamicPtrType)result=new FuDynamicPtrType();else result=new FuReadWriteClassType();result.class=klass;result.nullable=nullable;result.typeArg0=leftClass.typeArg0;result.typeArg1=leftClass.typeArg1;return result;}}return this.#poisonError(left,`Incompatible types: ${left.type} and ${right.type}`);}#visitSelectExpr(expr){let cond=this.#resolveBool(expr.cond);let onTrue=this.#visitExpr(expr.onTrue);let onFalse=this.#visitExpr(expr.onFalse);if(onTrue==this.#poison||onFalse==this.#poison)return this.#poison;let type=this.#getCommonType(onTrue,onFalse);this.#coerce(onTrue,type);this.#coerce(onFalse,type);if(cond instanceof FuLiteralTrue)return onTrue;if(cond instanceof FuLiteralFalse)return onFalse;return Object.assign(new FuSelectExpr(),{line:expr.line,cond:cond,onTrue:onTrue,onFalse:onFalse,type:type});}#evalType(generic,type){if(type.id==FuId.TYPE_PARAM0)return generic.typeArg0;if(type.id==FuId.TYPE_PARAM0_NOT_FINAL)return generic.typeArg0.isFinal()?null:generic.typeArg0;let collection;if((collection=type)instanceof FuClassType&&collection.class.typeParameterCount==1&&collection.typeArg0.id==FuId.TYPE_PARAM0){let result=type instanceof FuReadWriteClassType?new FuReadWriteClassType():new FuClassType();result.class=collection.class;result.typeArg0=generic.typeArg0;return result;}return type;}#canCall(obj,method,arguments_){let param=method.parameters.firstParameter();for(const arg of arguments_){if(param==null)return false;let type=param.type;let generic;if(obj!=null&&(generic=obj.type)instanceof FuClassType)type=this.#evalType(generic,type);if(!type.isAssignableFrom(arg.type))return false;param=param.nextParameter();}return param==null||param.value!=null;}#resolveCallWithArguments(expr,arguments_){let symbol;if(!((symbol=this.#visitExpr(expr.method))instanceof FuSymbolReference))return this.#poison;let method;if(symbol.symbol==null)return this.#poison;else if(symbol.symbol instanceof FuMethod){const m=symbol.symbol;method=m;}else if(symbol.symbol instanceof FuMethodGroup){const group=symbol.symbol;method=group.methods[0];if(!this.#canCall(symbol.left,method,arguments_))method=group.methods[1];}else return this.#poisonError(symbol,"Expected a method");let i=0;for(let param=method.parameters.firstParameter();param!=null;param=param.nextParameter()){let type=param.type;let generic;if(symbol.left!=null&&(generic=symbol.left.type)instanceof FuClassType){type=this.#evalType(generic,type);if(type==null)continue;}if(i>=arguments_.length){if(param.value!=null)break;return this.#poisonError(expr,`Too few arguments for '${method.name}'`);}let arg=arguments_[i++];let lambda;if(type.id==FuId.TYPE_PARAM0_PREDICATE&&(lambda=arg)instanceof FuLambdaExpr){lambda.first.type=symbol.left.type.asClassType().typeArg0;this.#openScope(lambda);lambda.body=this.#visitExpr(lambda.body);this.#closeScope();this.#coerce(lambda.body,this.program.system.boolType);}else this.#coerce(arg,type);}if(i<arguments_.length)return this.#poisonError(arguments_[i],`Too many arguments for '${method.name}'`);if(method.throws){if(this.#currentMethod==null)return this.#poisonError(expr,`Cannot call method '${method.name}' here because it is marked 'throws'`);if(!this.#currentMethod.throws)return this.#poisonError(expr,"Method marked 'throws' called from a method not marked 'throws'");}symbol.symbol=method;let ret;if(method.callType==FuCallType.STATIC&&(ret=method.body)instanceof FuReturn&&arguments_.every(arg=>arg instanceof FuLiteral)&&!this.#currentPureMethods.has(method)){this.#currentPureMethods.add(method);i=0;for(let param=method.parameters.firstParameter();param!=null;param=param.nextParameter()){if(i<arguments_.length)this.#currentPureArguments[param]=arguments_[i++];else this.#currentPureArguments[param]=param.value;}let result=this.#visitExpr(ret.value);for(let param=method.parameters.firstParameter();param!=null;param=param.nextParameter())delete this.#currentPureArguments[param];this.#currentPureMethods.delete(method);if(result instanceof FuLiteral)return result;}if(this.#currentMethod!=null)this.#currentMethod.calls.add(method);if(Object.keys(this.#currentPureArguments).length==0){expr.method=symbol;let type=method.type;let generic;if(symbol.left!=null&&(generic=symbol.left.type)instanceof FuClassType)type=this.#evalType(generic,type);expr.type=type;}return expr;}#visitCallExpr(expr){if(Object.keys(this.#currentPureArguments).length==0){let arguments_=expr.arguments;for(let i=0;i<arguments_.length;i++){if(!(arguments_[i]instanceof FuLambdaExpr))arguments_[i]=this.#visitExpr(arguments_[i]);}return this.#resolveCallWithArguments(expr,arguments_);}else {const arguments_=[];for(const arg of expr.arguments)arguments_.push(this.#visitExpr(arg));return this.#resolveCallWithArguments(expr,arguments_);}}#resolveObjectLiteral(klass,init){for(const item of init.items){const field=item;console.assert(field.op==FuToken.ASSIGN);const symbol=field.left;this.#lookup(symbol,klass.class);if(symbol.symbol instanceof FuField){field.right=this.#visitExpr(field.right);this.#coerce(field.right,symbol.type);}else this.reportError(field,"Expected a field");}}#visitVar(expr){let type=this.#resolveType(expr);if(expr.value!=null){let storage;let init;if((storage=type)instanceof FuStorageType&&(init=expr.value)instanceof FuAggregateInitializer)this.#resolveObjectLiteral(storage,init);else {expr.value=this.#visitExpr(expr.value);if(!expr.isAssignableStorage()){let array;if((array=type)instanceof FuArrayStorageType){type=array.getElementType();let literal;if(!((literal=expr.value)instanceof FuLiteral)||!literal.isDefaultValue())this.reportError(expr.value,"Only null, zero and false supported as an array initializer");}this.#coerce(expr.value,type);}}}this.#currentScope.add(expr);}#visitExpr(expr){if(expr instanceof FuAggregateInitializer){const aggregate=expr;let items=aggregate.items;for(let i=0;i<items.length;i++)items[i]=this.#visitExpr(items[i]);return expr;}else if(expr instanceof FuLiteral)return expr;else if(expr instanceof FuInterpolatedString){const interpolated=expr;return this.#visitInterpolatedString(interpolated);}else if(expr instanceof FuSymbolReference){const symbol=expr;return this.#visitSymbolReference(symbol);}else if(expr instanceof FuPrefixExpr){const prefix=expr;return this.#visitPrefixExpr(prefix);}else if(expr instanceof FuPostfixExpr){const postfix=expr;return this.#visitPostfixExpr(postfix);}else if(expr instanceof FuBinaryExpr){const binary=expr;return this.#visitBinaryExpr(binary);}else if(expr instanceof FuSelectExpr){const select=expr;return this.#visitSelectExpr(select);}else if(expr instanceof FuCallExpr){const call=expr;return this.#visitCallExpr(call);}else if(expr instanceof FuLambdaExpr){this.reportError(expr,"Unexpected lambda expression");return expr;}else if(expr instanceof FuVar){const def=expr;this.#visitVar(def);return expr;}else throw new Error();}#resolveBool(expr){expr=this.#visitExpr(expr);this.#coerce(expr,this.program.system.boolType);return expr;}static#createClassPtr(klass,ptrModifier,nullable){let ptr;switch(ptrModifier){case FuToken.END_OF_FILE:ptr=new FuClassType();break;case FuToken.EXCLAMATION_MARK:ptr=new FuReadWriteClassType();break;case FuToken.HASH:ptr=new FuDynamicPtrType();break;default:throw new Error();}ptr.class=klass;ptr.nullable=nullable;return ptr;}#fillGenericClass(result,klass,typeArgExprs){const typeArgs=[];for(const typeArgExpr of typeArgExprs.items)typeArgs.push(this.#toType(typeArgExpr,false));if(typeArgs.length!=klass.typeParameterCount){this.reportError(result,`Expected ${klass.typeParameterCount} type arguments for ${klass.name}, got ${typeArgs.length}`);return;}result.class=klass;result.typeArg0=typeArgs[0];if(typeArgs.length==2)result.typeArg1=typeArgs[1];}#expectNoPtrModifier(expr,ptrModifier,nullable){if(ptrModifier!=FuToken.END_OF_FILE)this.reportError(expr,`Unexpected ${FuLexer.tokenToString(ptrModifier)} on a non-reference type`);if(nullable)this.reportError(expr,"Nullable value types not supported");}#toBaseType(expr,ptrModifier,nullable){if(expr instanceof FuSymbolReference){const symbol=expr;let type;if((type=this.program.tryLookup(symbol.name,true))instanceof FuType){let klass;if((klass=type)instanceof FuClass){if(klass.id==FuId.MATCH_CLASS&&ptrModifier!=FuToken.END_OF_FILE)this.reportError(expr,"Read-write references to the built-in class Match are not supported");let ptr=FuSema.#createClassPtr(klass,ptrModifier,nullable);let typeArgExprs;if((typeArgExprs=symbol.left)instanceof FuAggregateInitializer)this.#fillGenericClass(ptr,klass,typeArgExprs);else if(symbol.left!=null)return this.#poisonError(expr,"Invalid type");else ptr.name=klass.name;return ptr;}else if(symbol.left!=null)return this.#poisonError(expr,"Invalid type");if(type.id==FuId.STRING_PTR_TYPE&&nullable){type=this.program.system.stringNullablePtrType;nullable=false;}this.#expectNoPtrModifier(expr,ptrModifier,nullable);return type;}return this.#poisonError(expr,`Type ${symbol.name} not found`);}else if(expr instanceof FuCallExpr){const call=expr;this.#expectNoPtrModifier(expr,ptrModifier,nullable);if(call.arguments.length!=0)this.reportError(call,"Expected empty parentheses for storage type");let typeArgExprs2;if((typeArgExprs2=call.method.left)instanceof FuAggregateInitializer){let storage=Object.assign(new FuStorageType(),{line:call.line});let klass;if((klass=this.program.tryLookup(call.method.name,true))instanceof FuClass){this.#fillGenericClass(storage,klass,typeArgExprs2);return storage;}return this.#poisonError(typeArgExprs2,`${call.method.name} is not a class`);}else if(call.method.left!=null)return this.#poisonError(expr,"Invalid type");if(call.method.name=="string")return this.program.system.stringStorageType;let klass2;if((klass2=this.program.tryLookup(call.method.name,true))instanceof FuClass)return Object.assign(new FuStorageType(),{class:klass2});return this.#poisonError(expr,`Class ${call.method.name} not found`);}else return this.#poisonError(expr,"Invalid type");}#toType(expr,dynamic){let minExpr=null;let range;if((range=expr)instanceof FuBinaryExpr&&range.op==FuToken.RANGE){minExpr=range.left;expr=range.right;}let nullable;let ptrModifier;let outerArray=null;let innerArray=null;for(;;){let question;if((question=expr)instanceof FuPostfixExpr&&question.op==FuToken.QUESTION_MARK){expr=question.inner;nullable=true;}else nullable=false;let postfix;if((postfix=expr)instanceof FuPostfixExpr&&(postfix.op==FuToken.EXCLAMATION_MARK||postfix.op==FuToken.HASH)){expr=postfix.inner;ptrModifier=postfix.op;}else ptrModifier=FuToken.END_OF_FILE;let binary;if((binary=expr)instanceof FuBinaryExpr&&binary.op==FuToken.LEFT_BRACKET){if(binary.right!=null){this.#expectNoPtrModifier(expr,ptrModifier,nullable);let lengthExpr=this.#visitExpr(binary.right);let arrayStorage=Object.assign(new FuArrayStorageType(),{class:this.program.system.arrayStorageClass,typeArg0:outerArray,lengthExpr:lengthExpr,length:0});if(this.#coerce(lengthExpr,this.program.system.intType)&&(!dynamic||binary.left.isIndexing())){let literal;if((literal=lengthExpr)instanceof FuLiteralLong){let length=literal.value;if(length<0)this.reportError(expr,"Expected non-negative integer");else if(length>2147483647)this.reportError(expr,"Integer too big");else arrayStorage.length=Number(length);}else this.reportError(lengthExpr,"Expected constant value");}outerArray=arrayStorage;}else {let elementType=outerArray;outerArray=FuSema.#createClassPtr(this.program.system.arrayPtrClass,ptrModifier,nullable);outerArray.typeArg0=elementType;}if(innerArray==null)innerArray=outerArray;expr=binary.left;}else break;}let baseType;if(minExpr!=null){this.#expectNoPtrModifier(expr,ptrModifier,nullable);let min=this.#foldConstInt(minExpr);let max=this.#foldConstInt(expr);if(min>max)return this.#poisonError(expr,"Range min greater than max");baseType=FuRangeType.new(min,max);}else baseType=this.#toBaseType(expr,ptrModifier,nullable);baseType.line=expr.line;if(outerArray==null)return baseType;innerArray.typeArg0=baseType;return outerArray;}#resolveType(def){def.type=this.#toType(def.typeExpr,false);return def.type;}#visitAssert(statement){statement.cond=this.#resolveBool(statement.cond);if(statement.message!=null){statement.message=this.#visitExpr(statement.message);if(!(statement.message.type instanceof FuStringType))this.reportError(statement,"The second argument of 'assert' must be a string");}}#resolveStatements(statements){let reachable=true;for(const statement of statements){let konst;if((konst=statement)instanceof FuConst){this.#resolveConst(konst);this.#currentScope.add(konst);if(konst.type instanceof FuArrayStorageType){const klass=this.#currentScope.getContainer();klass.constArrays.push(konst);}}else this.#visitStatement(statement);if(!reachable){this.reportError(statement,"Unreachable statement");return false;}reachable=statement.completesNormally();}return reachable;}#visitBlock(statement){this.#openScope(statement);statement.setCompletesNormally(this.#resolveStatements(statement.statements));this.#closeScope();}#resolveLoopCond(statement){if(statement.cond!=null){statement.cond=this.#resolveBool(statement.cond);statement.setCompletesNormally(!(statement.cond instanceof FuLiteralTrue));}else statement.setCompletesNormally(false);}#visitDoWhile(statement){this.#openScope(statement);this.#resolveLoopCond(statement);this.#visitStatement(statement.body);this.#closeScope();}#visitFor(statement){this.#openScope(statement);if(statement.init!=null)this.#visitStatement(statement.init);this.#resolveLoopCond(statement);if(statement.advance!=null)this.#visitStatement(statement.advance);let iter;let cond;let limitSymbol;if((iter=statement.init)instanceof FuVar&&iter.type instanceof FuIntegerType&&iter.value!=null&&(cond=statement.cond)instanceof FuBinaryExpr&&cond.left.isReferenceTo(iter)&&(cond.right instanceof FuLiteral||(limitSymbol=cond.right)instanceof FuSymbolReference&&limitSymbol.symbol instanceof FuVar)){let step=0n;let unary;let binary;let literalStep;if((unary=statement.advance)instanceof FuUnaryExpr&&unary.inner!=null&&unary.inner.isReferenceTo(iter)){switch(unary.op){case FuToken.INCREMENT:step=1n;break;case FuToken.DECREMENT:step=-1n;break;}}else if((binary=statement.advance)instanceof FuBinaryExpr&&binary.left.isReferenceTo(iter)&&(literalStep=binary.right)instanceof FuLiteralLong){switch(binary.op){case FuToken.ADD_ASSIGN:step=literalStep.value;break;case FuToken.SUB_ASSIGN:step=-literalStep.value;break;}}if(step>0&&(cond.op==FuToken.LESS||cond.op==FuToken.LESS_OR_EQUAL)||step<0&&(cond.op==FuToken.GREATER||cond.op==FuToken.GREATER_OR_EQUAL)){statement.isRange=true;statement.rangeStep=step;}statement.isIteratorUsed=false;}this.#visitStatement(statement.body);this.#closeScope();}#visitForeach(statement){this.#openScope(statement);let element=statement.getVar();this.#resolveType(element);this.#visitExpr(statement.collection);let klass;if((klass=statement.collection.type)instanceof FuClassType){switch(klass.class.id){case FuId.STRING_CLASS:if(statement.count()!=1||!element.type.isAssignableFrom(this.program.system.intType))this.reportError(statement,"Expected int iterator variable");break;case FuId.ARRAY_STORAGE_CLASS:case FuId.LIST_CLASS:case FuId.HASH_SET_CLASS:case FuId.SORTED_SET_CLASS:if(statement.count()!=1)this.reportError(statement,"Expected one iterator variable");else if(!element.type.isAssignableFrom(klass.getElementType()))this.reportError(statement,`Cannot coerce ${klass.getElementType()} to ${element.type}`);break;case FuId.DICTIONARY_CLASS:case FuId.SORTED_DICTIONARY_CLASS:case FuId.ORDERED_DICTIONARY_CLASS:if(statement.count()!=2)this.reportError(statement,"Expected (TKey key, TValue value) iterator");else {let value=statement.getValueVar();this.#resolveType(value);if(!element.type.isAssignableFrom(klass.getKeyType()))this.reportError(statement,`Cannot coerce ${klass.getKeyType()} to ${element.type}`);else if(!value.type.isAssignableFrom(klass.getValueType()))this.reportError(statement,`Cannot coerce ${klass.getValueType()} to ${value.type}`);}break;default:this.reportError(statement,`'foreach' invalid on ${klass.class.name}`);break;}}else this.reportError(statement,`'foreach' invalid on ${statement.collection.type}`);statement.setCompletesNormally(true);this.#visitStatement(statement.body);this.#closeScope();}#visitIf(statement){statement.cond=this.#resolveBool(statement.cond);this.#visitStatement(statement.onTrue);if(statement.onFalse!=null){this.#visitStatement(statement.onFalse);statement.setCompletesNormally(statement.onTrue.completesNormally()||statement.onFalse.completesNormally());}else statement.setCompletesNormally(true);}#visitLock(statement){statement.lock=this.#visitExpr(statement.lock);this.#coerce(statement.lock,this.program.system.lockPtrType);this.#visitStatement(statement.body);}#visitReturn(statement){if(this.#currentMethod.type.id==FuId.VOID_TYPE){if(statement.value!=null)this.reportError(statement,"Void method cannot return a value");}else if(statement.value==null)this.reportError(statement,"Missing return value");else {statement.value=this.#visitExpr(statement.value);this.#coerce(statement.value,this.#currentMethod.type);let symbol;let local;if((symbol=statement.value)instanceof FuSymbolReference&&(local=symbol.symbol)instanceof FuVar&&(local.type.isFinal()&&!(this.#currentMethod.type instanceof FuStorageType)||local.type.id==FuId.STRING_STORAGE_TYPE&&this.#currentMethod.type.id!=FuId.STRING_STORAGE_TYPE))this.reportError(statement,"Returning dangling reference to local storage");}}#visitSwitch(statement){this.#openScope(statement);statement.value=this.#visitExpr(statement.value);let i;let klass;if((i=statement.value.type)instanceof FuIntegerType&&i.id!=FuId.LONG_TYPE||statement.value.type instanceof FuEnum);else if((klass=statement.value.type)instanceof FuClassType&&!(klass instanceof FuStorageType));else {this.reportError(statement.value,`Switch on type ${statement.value.type} - expected int, enum, string or object reference`);return;}statement.setCompletesNormally(false);for(const kase of statement.cases){for(let i=0;i<kase.values.length;i++){let switchPtr;if((switchPtr=statement.value.type)instanceof FuClassType&&switchPtr.class.id!=FuId.STRING_CLASS){let value=kase.values[i];let when1;if((when1=value)instanceof FuBinaryExpr&&when1.op==FuToken.WHEN)value=when1.left;if(value instanceof FuLiteralNull);else {let def;if(!((def=value)instanceof FuVar)||def.value!=null)this.reportError(kase.values[i],"Expected 'case Type name'");else {let casePtr;if(!((casePtr=this.#resolveType(def))instanceof FuClassType)||casePtr instanceof FuStorageType)this.reportError(def,"'case' with non-reference type");else if(casePtr instanceof FuReadWriteClassType&&!(switchPtr instanceof FuDynamicPtrType)&&(casePtr instanceof FuDynamicPtrType||!(switchPtr instanceof FuReadWriteClassType)))this.reportError(def,`${switchPtr} cannot be casted to ${casePtr}`);else if(casePtr.class.isSameOrBaseOf(switchPtr.class))this.reportError(def,`${statement.value} is ${switchPtr}, 'case ${casePtr}' would always match`);else if(!switchPtr.class.isSameOrBaseOf(casePtr.class))this.reportError(def,`${switchPtr} is not base class of ${casePtr.class.name}, 'case ${casePtr}' would never match`);else {statement.add(def);let when2;if((when2=kase.values[i])instanceof FuBinaryExpr&&when2.op==FuToken.WHEN)when2.right=this.#resolveBool(when2.right);}}}}else {let when1;if((when1=kase.values[i])instanceof FuBinaryExpr&&when1.op==FuToken.WHEN){when1.left=this.#foldConst(when1.left);this.#coerce(when1.left,statement.value.type);when1.right=this.#resolveBool(when1.right);}else {kase.values[i]=this.#foldConst(kase.values[i]);this.#coerce(kase.values[i],statement.value.type);}}}if(this.#resolveStatements(kase.body))this.reportError(kase.body.at(-1),"Case must end with break, continue, return or throw");}if(statement.defaultBody.length>0){let reachable=this.#resolveStatements(statement.defaultBody);if(reachable)this.reportError(statement.defaultBody.at(-1),"Default must end with break, continue, return or throw");}this.#closeScope();}#visitThrow(statement){if(!this.#currentMethod.throws)this.reportError(statement,"'throw' in a method not marked 'throws'");statement.message=this.#visitExpr(statement.message);if(!(statement.message.type instanceof FuStringType))this.reportError(statement,"The argument of 'throw' must be a string");}#visitWhile(statement){this.#openScope(statement);this.#resolveLoopCond(statement);this.#visitStatement(statement.body);this.#closeScope();}#visitStatement(statement){if(statement instanceof FuAssert){const asrt=statement;this.#visitAssert(asrt);}else if(statement instanceof FuBlock){const block=statement;this.#visitBlock(block);}else if(statement instanceof FuBreak){const brk=statement;brk.loopOrSwitch.setCompletesNormally(true);}else if(statement instanceof FuContinue||statement instanceof FuNative);else if(statement instanceof FuDoWhile){const doWhile=statement;this.#visitDoWhile(doWhile);}else if(statement instanceof FuFor){const forLoop=statement;this.#visitFor(forLoop);}else if(statement instanceof FuForeach){const foreachLoop=statement;this.#visitForeach(foreachLoop);}else if(statement instanceof FuIf){const ifStatement=statement;this.#visitIf(ifStatement);}else if(statement instanceof FuLock){const lockStatement=statement;this.#visitLock(lockStatement);}else if(statement instanceof FuReturn){const ret=statement;this.#visitReturn(ret);}else if(statement instanceof FuSwitch){const switchStatement=statement;this.#visitSwitch(switchStatement);}else if(statement instanceof FuThrow){const throwStatement=statement;this.#visitThrow(throwStatement);}else if(statement instanceof FuWhile){const whileStatement=statement;this.#visitWhile(whileStatement);}else if(statement instanceof FuExpr){const expr=statement;this.#visitExpr(expr);}else throw new Error();}#foldConst(expr){expr=this.#visitExpr(expr);if(expr instanceof FuLiteral||expr.isConstEnum())return expr;this.reportError(expr,"Expected constant value");return expr;}#foldConstInt(expr){let literal;if((literal=this.#foldConst(expr))instanceof FuLiteralLong){let l=literal.value;if(l<-2147483648||l>2147483647){this.reportError(expr,"Only 32-bit ranges supported");return 0;}return Number(l);}this.reportError(expr,"Expected integer");return 0;}#resolveConst(konst){switch(konst.visitStatus){case FuVisitStatus.NOT_YET:break;case FuVisitStatus.IN_PROGRESS:konst.value=this.#poisonError(konst,`Circular dependency in value of constant ${konst.name}`);konst.visitStatus=FuVisitStatus.DONE;return;case FuVisitStatus.DONE:return;}konst.visitStatus=FuVisitStatus.IN_PROGRESS;if(!(this.#currentScope instanceof FuEnum))this.#resolveType(konst);konst.value=this.#visitExpr(konst.value);let coll;if((coll=konst.value)instanceof FuAggregateInitializer){let array;if((array=konst.type)instanceof FuClassType){let elementType=array.getElementType();let arrayStg;if((arrayStg=array)instanceof FuArrayStorageType){if(arrayStg.length!=coll.items.length)this.reportError(konst,`Declared ${arrayStg.length} elements, initialized ${coll.items.length}`);}else if(array instanceof FuReadWriteClassType)this.reportError(konst,"Invalid constant type");else konst.type=Object.assign(new FuArrayStorageType(),{class:this.program.system.arrayStorageClass,typeArg0:elementType,length:coll.items.length});coll.type=konst.type;for(const item of coll.items)this.#coerce(item,elementType);}else this.reportError(konst,`Array initializer for scalar constant ${konst.name}`);}else if(this.#currentScope instanceof FuEnum&&konst.value.type instanceof FuRangeType&&konst.value instanceof FuLiteral);else if(konst.value instanceof FuLiteral||konst.value.isConstEnum())this.#coerce(konst.value,konst.type);else if(konst.value!=this.#poison)this.reportError(konst.value,`Value for constant ${konst.name} is not constant`);konst.inMethod=this.#currentMethod;konst.visitStatus=FuVisitStatus.DONE;}#resolveConsts(container){this.#currentScope=container;if(container instanceof FuClass){const klass=container;for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let konst;if((konst=symbol)instanceof FuConst)this.#resolveConst(konst);}}else if(container instanceof FuEnum){const enu=container;let previous=null;for(let symbol=enu.first;symbol!=null;symbol=symbol.next){let konst;if((konst=symbol)instanceof FuConst){if(konst.value!=null){this.#resolveConst(konst);enu.hasExplicitValue=true;}else konst.value=Object.assign(new FuImplicitEnumValue(),{value:previous==null?0:previous.value.intValue()+1});previous=konst;}}}else throw new Error();}#resolveTypes(klass){this.#currentScope=klass;for(let symbol=klass.first;symbol!=null;symbol=symbol.next){if(symbol instanceof FuField){const field=symbol;let type=this.#resolveType(field);if(field.value!=null){field.value=this.#visitExpr(field.value);if(!field.isAssignableStorage()){let array;this.#coerce(field.value,(array=type)instanceof FuArrayStorageType?array.getElementType():type);}}}else if(symbol instanceof FuMethod){const method=symbol;if(method.typeExpr==this.program.system.voidType)method.type=this.program.system.voidType;else this.#resolveType(method);for(let param=method.parameters.firstParameter();param!=null;param=param.nextParameter()){this.#resolveType(param);if(param.value!=null){param.value=this.#foldConst(param.value);this.#coerce(param.value,param.type);}}}}}#resolveCode(klass){if(klass.constructor_!=null){this.#currentScope=klass;this.#currentMethod=klass.constructor_;this.#visitStatement(klass.constructor_.body);this.#currentMethod=null;}for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let method;if((method=symbol)instanceof FuMethod){if(method.name=="ToString"&&method.callType!=FuCallType.STATIC&&method.parameters.count()==0)method.id=FuId.CLASS_TO_STRING;if(method.body!=null){if(method.callType==FuCallType.OVERRIDE||method.callType==FuCallType.SEALED){let baseMethod;if((baseMethod=klass.parent.tryLookup(method.name,false))instanceof FuMethod){switch(baseMethod.callType){case FuCallType.ABSTRACT:case FuCallType.VIRTUAL:case FuCallType.OVERRIDE:break;default:this.reportError(method,"Base method is not abstract or virtual");break;}if(!method.type.equalsType(baseMethod.type))this.reportError(method,"Base method has a different return type");if(method.isMutator!=baseMethod.isMutator){if(method.isMutator)this.reportError(method,"Mutating method cannot override a non-mutating method");else this.reportError(method,"Non-mutating method cannot override a mutating method");}let baseParam=baseMethod.parameters.firstParameter();for(let param=method.parameters.firstParameter();;param=param.nextParameter()){if(param==null){if(baseParam!=null)this.reportError(method,"Fewer parameters than the overridden method");break;}if(baseParam==null){this.reportError(method,"More parameters than the overridden method");break;}if(!param.type.equalsType(baseParam.type)){this.reportError(method,"Base method has a different parameter type");break;}baseParam=baseParam.nextParameter();}baseMethod.calls.add(method);}else this.reportError(method,"No method to override");}this.#currentScope=method.parameters;this.#currentMethod=method;if(!(method.body instanceof FuScope))this.#openScope(method.methodScope);this.#visitStatement(method.body);if(method.type.id!=FuId.VOID_TYPE&&method.body.completesNormally())this.reportError(method.body,"Method can complete without a return value");this.#currentMethod=null;}}}}static#markMethodLive(method){if(method.isLive)return;method.isLive=true;for(const called of method.calls)FuSema.#markMethodLive(called);}static#markClassLive(klass){if(klass.isPublic){for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let method;if((method=symbol)instanceof FuMethod&&(method.visibility==FuVisibility.PUBLIC||method.visibility==FuVisibility.PROTECTED))FuSema.#markMethodLive(method);}}if(klass.constructor_!=null)FuSema.#markMethodLive(klass.constructor_);}process(program){this.program=program;for(let type=program.first;type!=null;type=type.next){let klass;if((klass=type)instanceof FuClass)this.#resolveBase(klass);}for(const klass of program.classes)this.#checkBaseCycle(klass);for(let type=program.first;type!=null;type=type.next){const container=type;this.#resolveConsts(container);}for(const klass of program.classes)this.#resolveTypes(klass);for(const klass of program.classes)this.#resolveCode(klass);for(const klass of program.classes)FuSema.#markClassLive(klass);}}class GenBase extends FuVisitor{#host;#writer;#stringWriter=new StringWriter();indent=0;atLineStart=true;#atChildStart=false;#inChildBlock=false;inHeaderFile=false;#includes={};currentMethod=null;writtenClasses=new Set();currentTemporaries=[];setHost(host){this.#host=host;}getCurrentContainer(){const klass=this.currentMethod.parent;return klass;}#reportError(statement,message){this.#host.reportError(this.getCurrentContainer().filename,statement.line,1,statement.line,1,message);}notSupported(statement,feature){this.#reportError(statement,`${feature} not supported when targeting ${this.getTargetName()}`);}notYet(statement,feature){this.#reportError(statement,`${feature} not supported yet when targeting ${this.getTargetName()}`);}startLine(){if(this.atLineStart){if(this.#atChildStart){this.#atChildStart=false;this.#writer.write(String.fromCharCode(10));this.indent++;}for(let i=0;i<this.indent;i++)this.#writer.write(String.fromCharCode(9));this.atLineStart=false;}}writeChar(c){this.startLine();this.#writer.write(String.fromCodePoint(c));}write(s){this.startLine();this.#writer.write(s);}visitLiteralNull(){this.write("null");}visitLiteralFalse(){this.write("false");}visitLiteralTrue(){this.write("true");}visitLiteralLong(i){this.#writer.write(String(i));}getLiteralChars(){return 0;}visitLiteralChar(c){if(c<this.getLiteralChars()){this.writeChar(39);switch(c){case 10:this.write("\\n");break;case 13:this.write("\\r");break;case 9:this.write("\\t");break;case 39:this.write("\\'");break;case 92:this.write("\\\\");break;default:this.writeChar(c);break;}this.writeChar(39);}else this.#writer.write(String(c));}visitLiteralDouble(value){let s=`${value}`;this.write(s);for(const c of s){switch(c.codePointAt(0)){case 45:case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:break;default:return;}}this.write(".0");}visitLiteralString(value){this.writeChar(34);this.write(value);this.writeChar(34);}#writeLowercaseChar(c){if(c>=65&&c<=90)c+=32;this.#writer.write(String.fromCharCode(c));}#writeUppercaseChar(c){if(c>=97&&c<=122)c-=32;this.#writer.write(String.fromCharCode(c));}writeLowercase(s){this.startLine();for(const c of s)this.#writeLowercaseChar(c.codePointAt(0));}writeCamelCase(s){this.startLine();this.#writeLowercaseChar(s.charCodeAt(0));this.#writer.write(s.substring(1));}writePascalCase(s){this.startLine();this.#writeUppercaseChar(s.charCodeAt(0));this.#writer.write(s.substring(1));}writeUppercaseWithUnderscores(s){this.startLine();let first=true;for(const c of s){if(!first&&c.codePointAt(0)>=65&&c.codePointAt(0)<=90){this.#writer.write(String.fromCharCode(95));this.#writer.write(String.fromCharCode(c.codePointAt(0)));}else this.#writeUppercaseChar(c.codePointAt(0));first=false;}}writeLowercaseWithUnderscores(s){this.startLine();let first=true;for(const c of s){if(c.codePointAt(0)>=65&&c.codePointAt(0)<=90){if(!first)this.#writer.write(String.fromCharCode(95));this.#writeLowercaseChar(c.codePointAt(0));}else this.#writer.write(String.fromCharCode(c.codePointAt(0)));first=false;}}writeNewLine(){this.#writer.write(String.fromCharCode(10));this.atLineStart=true;}writeCharLine(c){this.writeChar(c);this.writeNewLine();}writeLine(s){this.write(s);this.writeNewLine();}writeBanner(){this.writeLine("// Generated automatically with \"fut\". Do not edit.");}createFile(directory,filename){this.#writer=this.#host.createFile(directory,filename);this.writeBanner();}createOutputFile(){this.createFile(null,this.outputFile);}closeFile(){this.#host.closeFile();}openStringWriter(){this.#writer=this.#stringWriter;}closeStringWriter(){this.#writer.write(this.#stringWriter.toString());this.#stringWriter.clear();}include(name){if(!this.#includes.hasOwnProperty(name))this.#includes[name]=this.inHeaderFile;}writeIncludes(prefix,suffix){for(const[name,inHeaderFile]of Object.entries(this.#includes).sort((a,b)=>a[0].localeCompare(b[0]))){if(inHeaderFile==this.inHeaderFile){this.write(prefix);this.write(name);this.writeLine(suffix);}}if(!this.inHeaderFile)for(const key in this.#includes)delete this.#includes[key];}startDocLine(){this.write(" * ");}writeXmlDoc(text){for(const c of text){switch(c.codePointAt(0)){case 38:this.write("&amp;");break;case 60:this.write("&lt;");break;case 62:this.write("&gt;");break;default:this.writeChar(c.codePointAt(0));break;}}}writeDocPara(para,many){if(many){this.writeNewLine();this.write(" * <p>");}for(const inline of para.children){if(inline instanceof FuDocText){const text=inline;this.writeXmlDoc(text.text);}else if(inline instanceof FuDocCode){const code=inline;this.write("<code>");this.writeXmlDoc(code.text);this.write("</code>");}else if(inline instanceof FuDocLine){this.writeNewLine();this.startDocLine();}else throw new Error();}}writeDocList(list){this.writeNewLine();this.writeLine(" * <ul>");for(const item of list.items){this.write(" * <li>");this.writeDocPara(item,false);this.writeLine("</li>");}this.write(" * </ul>");}writeDocBlock(block,many){if(block instanceof FuDocPara){const para=block;this.writeDocPara(para,many);}else if(block instanceof FuDocList){const list=block;this.writeDocList(list);}else throw new Error();}writeContent(doc){this.startDocLine();this.writeDocPara(doc.summary,false);this.writeNewLine();if(doc.details.length>0){this.startDocLine();if(doc.details.length==1)this.writeDocBlock(doc.details[0],false);else {for(const block of doc.details)this.writeDocBlock(block,true);}this.writeNewLine();}}writeDoc(doc){if(doc!=null){this.writeLine("/**");this.writeContent(doc);this.writeLine(" */");}}writeSelfDoc(method){}writeParameterDoc(param,first){this.write(" * @param ");this.writeName(param);this.writeChar(32);this.writeDocPara(param.documentation.summary,false);this.writeNewLine();}writeParametersDoc(method){let first=true;for(let param=method.parameters.firstParameter();param!=null;param=param.nextParameter()){if(param.documentation!=null){this.writeParameterDoc(param,first);first=false;}}}writeMethodDoc(method){if(method.documentation==null)return;this.writeLine("/**");this.writeContent(method.documentation);this.writeSelfDoc(method);this.writeParametersDoc(method);this.writeLine(" */");}writeTopLevelNatives(program){for(const content of program.topLevelNatives)this.write(content);}openBlock(){this.writeCharLine(123);this.indent++;}closeBlock(){this.indent--;this.writeCharLine(125);}endStatement(){this.writeCharLine(59);}writeComma(i){if(i>0){if((i&15)==0){this.writeCharLine(44);this.writeChar(9);}else this.write(", ");}}writeBytes(content){let i=0;for(const b of content){this.writeComma(i++);this.visitLiteralLong(BigInt(b));}}getTypeId(type,promote){return promote&&type instanceof FuRangeType?FuId.INT_TYPE:type.id;}writeLocalName(symbol,parent){if(symbol instanceof FuField)this.write("this.");this.writeName(symbol);}writeDoubling(s,doubled){for(const c of s){if(c.codePointAt(0)==doubled)this.writeChar(c.codePointAt(0));this.writeChar(c.codePointAt(0));}}writePrintfWidth(part){if(part.widthExpr!=null)this.visitLiteralLong(BigInt(part.width));if(part.precision>=0){this.writeChar(46);this.visitLiteralLong(BigInt(part.precision));}}static#getPrintfFormat(type,format){if(type instanceof FuIntegerType)return format==120||format==88?format:100;else if(type instanceof FuNumericType){switch(format){case 69:case 101:case 102:case 71:case 103:return format;case 70:return 102;default:return 103;}}else if(type instanceof FuClassType)return 115;else throw new Error();}writePrintfFormat(expr){for(const part of expr.parts){this.writeDoubling(part.prefix,37);this.writeChar(37);this.writePrintfWidth(part);this.writeChar(GenBase.#getPrintfFormat(part.argument.type,part.format));}this.writeDoubling(expr.suffix,37);}writePyFormat(part){if(part.widthExpr!=null||part.precision>=0||part.format!=32&&part.format!=68)this.writeChar(58);if(part.widthExpr!=null){if(part.width>=0){if(!(part.argument.type instanceof FuNumericType))this.writeChar(62);this.visitLiteralLong(BigInt(part.width));}else {this.writeChar(60);this.visitLiteralLong(BigInt(-part.width));}}if(part.precision>=0){this.writeChar(part.argument.type instanceof FuIntegerType?48:46);this.visitLiteralLong(BigInt(part.precision));}if(part.format!=32&&part.format!=68)this.writeChar(part.format);this.writeChar(125);}writeInterpolatedStringArg(expr){expr.accept(this,FuPriority.ARGUMENT);}writeInterpolatedStringArgs(expr){for(const part of expr.parts){this.write(", ");this.writeInterpolatedStringArg(part.argument);}}writePrintf(expr,newLine){this.writeChar(34);this.writePrintfFormat(expr);if(newLine)this.write("\\n");this.writeChar(34);this.writeInterpolatedStringArgs(expr);this.writeChar(41);}writePostfix(obj,s){obj.accept(this,FuPriority.PRIMARY);this.write(s);}writeCall(function_,arg0,arg1=null,arg2=null){this.write(function_);this.writeChar(40);arg0.accept(this,FuPriority.ARGUMENT);if(arg1!=null){this.write(", ");arg1.accept(this,FuPriority.ARGUMENT);if(arg2!=null){this.write(", ");arg2.accept(this,FuPriority.ARGUMENT);}}this.writeChar(41);}writeMemberOp(left,symbol){this.writeChar(46);}writeMethodCall(obj,method,arg0,arg1=null){obj.accept(this,FuPriority.PRIMARY);this.writeMemberOp(obj,null);this.writeCall(method,arg0,arg1);}writeSelectValues(type,expr){this.writeCoerced(type,expr.onTrue,FuPriority.SELECT);this.write(" : ");this.writeCoerced(type,expr.onFalse,FuPriority.SELECT);}writeCoercedSelect(type,expr,parent){if(parent>FuPriority.SELECT)this.writeChar(40);expr.cond.accept(this,FuPriority.SELECT_COND);this.write(" ? ");this.writeSelectValues(type,expr);if(parent>FuPriority.SELECT)this.writeChar(41);}writeCoercedInternal(type,expr,parent){expr.accept(this,parent);}writeCoerced(type,expr,parent){let select;if((select=expr)instanceof FuSelectExpr)this.writeCoercedSelect(type,select,parent);else this.writeCoercedInternal(type,expr,parent);}writeCoercedExpr(type,expr){this.writeCoerced(type,expr,FuPriority.ARGUMENT);}writeStronglyCoerced(type,expr){this.writeCoerced(type,expr,FuPriority.ARGUMENT);}writeCoercedLiteral(type,expr){expr.accept(this,FuPriority.ARGUMENT);}writeCoercedLiterals(type,exprs){for(let i=0;i<exprs.length;i++){this.writeComma(i);this.writeCoercedLiteral(type,exprs[i]);}}writeArgs(method,args){let param=method.parameters.firstParameter();let first=true;for(const arg of args){if(!first)this.write(", ");first=false;this.writeStronglyCoerced(param.type,arg);param=param.nextParameter();}}writeArgsInParentheses(method,args){this.writeChar(40);this.writeArgs(method,args);this.writeChar(41);}writeNewArrayStorage(array){this.writeNewArray(array.getElementType(),array.lengthExpr,FuPriority.ARGUMENT);}writeNewStorage(type){if(type instanceof FuArrayStorageType){const array=type;this.writeNewArrayStorage(array);}else if(type instanceof FuStorageType){const storage=type;this.writeNew(storage,FuPriority.ARGUMENT);}else throw new Error();}writeArrayStorageInit(array,value){this.write(" = ");this.writeNewArrayStorage(array);}writeNewWithFields(type,init){this.writeNew(type,FuPriority.ARGUMENT);}writeStorageInit(def){this.write(" = ");let init;if((init=def.value)instanceof FuAggregateInitializer){const klass=def.type;this.writeNewWithFields(klass,init);}else this.writeNewStorage(def.type);}writeVarInit(def){if(def.isAssignableStorage());else {let array;if((array=def.type)instanceof FuArrayStorageType)this.writeArrayStorageInit(array,def.value);else if(def.value!=null&&!(def.value instanceof FuAggregateInitializer)){this.write(" = ");this.writeCoercedExpr(def.type,def.value);}else if(def.type.isFinal()&&!(def.parent instanceof FuParameters))this.writeStorageInit(def);}}writeVar(def){this.writeTypeAndName(def);this.writeVarInit(def);}visitVar(expr){this.writeVar(expr);}writeObjectLiteral(init,separator){let prefix=" { ";for(const item of init.items){this.write(prefix);const assign=item;const field=assign.left;this.writeName(field.symbol);this.write(separator);this.writeCoerced(assign.left.type,assign.right,FuPriority.ARGUMENT);prefix=", ";}this.write(" }");}static#getAggregateInitializer(def){let expr=def.value;let unary;if((unary=expr)instanceof FuPrefixExpr)expr=unary.inner;let init;return (init=expr)instanceof FuAggregateInitializer?init:null;}#writeAggregateInitField(obj,item){const assign=item;const field=assign.left;this.writeMemberOp(obj,field);this.writeName(field.symbol);this.write(" = ");this.writeCoerced(field.type,assign.right,FuPriority.ARGUMENT);this.endStatement();}writeInitCode(def){let init=GenBase.#getAggregateInitializer(def);if(init!=null){for(const item of init.items){this.writeLocalName(def,FuPriority.PRIMARY);this.#writeAggregateInitField(def,item);}}}defineIsVar(binary){let def;if((def=binary.right)instanceof FuVar){this.ensureChildBlock();this.writeVar(def);this.endStatement();}}writeArrayElement(def,nesting){this.writeLocalName(def,FuPriority.PRIMARY);for(let i=0;i<nesting;i++){this.write("[_i");this.visitLiteralLong(BigInt(i));this.writeChar(93);}}openLoop(intString,nesting,count){this.write("for (");this.write(intString);this.write(" _i");this.visitLiteralLong(BigInt(nesting));this.write(" = 0; _i");this.visitLiteralLong(BigInt(nesting));this.write(" < ");this.visitLiteralLong(BigInt(count));this.write("; _i");this.visitLiteralLong(BigInt(nesting));this.write("++) ");this.openBlock();}writeResourceName(name){for(const c of name)this.writeChar(FuLexer.isLetterOrDigit(c.codePointAt(0))?c.codePointAt(0):95);}visitPrefixExpr(expr,parent){switch(expr.op){case FuToken.INCREMENT:this.write("++");break;case FuToken.DECREMENT:this.write("--");break;case FuToken.MINUS:this.writeChar(45);let inner;if((inner=expr.inner)instanceof FuPrefixExpr&&(inner.op==FuToken.MINUS||inner.op==FuToken.DECREMENT))this.writeChar(32);break;case FuToken.TILDE:this.writeChar(126);break;case FuToken.EXCLAMATION_MARK:this.writeChar(33);break;case FuToken.NEW:const dynamic=expr.type;if(dynamic.class.id==FuId.ARRAY_PTR_CLASS)this.writeNewArray(dynamic.getElementType(),expr.inner,parent);else {let init;if((init=expr.inner)instanceof FuAggregateInitializer){let tempId=this.currentTemporaries.indexOf(expr);if(tempId>=0){this.write("futemp");this.visitLiteralLong(BigInt(tempId));}else this.writeNewWithFields(dynamic,init);}else this.writeNew(dynamic,parent);}return;case FuToken.RESOURCE:const name=expr.inner;const array=expr.type;this.writeResource(name.value,array.length);return;default:throw new Error();}expr.inner.accept(this,FuPriority.PRIMARY);}visitPostfixExpr(expr,parent){expr.inner.accept(this,FuPriority.PRIMARY);switch(expr.op){case FuToken.INCREMENT:this.write("++");break;case FuToken.DECREMENT:this.write("--");break;default:throw new Error();}}startAdd(expr){if(!expr.isLiteralZero()){expr.accept(this,FuPriority.ADD);this.write(" + ");}}writeAdd(left,right){let leftLiteral;if((leftLiteral=left)instanceof FuLiteralLong){let leftValue=leftLiteral.value;if(leftValue==0){right.accept(this,FuPriority.ARGUMENT);return;}let rightLiteral;if((rightLiteral=right)instanceof FuLiteralLong){this.visitLiteralLong(leftValue+rightLiteral.value);return;}}else if(right.isLiteralZero()){left.accept(this,FuPriority.ARGUMENT);return;}left.accept(this,FuPriority.ADD);this.write(" + ");right.accept(this,FuPriority.ADD);}writeStartEnd(startIndex,length){startIndex.accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeAdd(startIndex,length);}static#isBitOp(parent){switch(parent){case FuPriority.OR:case FuPriority.XOR:case FuPriority.AND:case FuPriority.SHIFT:return true;default:return false;}}writeBinaryOperand(expr,parent,binary){expr.accept(this,parent);}writeBinaryExpr(expr,parentheses,left,op,right){if(parentheses)this.writeChar(40);this.writeBinaryOperand(expr.left,left,expr);this.write(op);this.writeBinaryOperand(expr.right,right,expr);if(parentheses)this.writeChar(41);}writeBinaryExpr2(expr,parent,child,op){this.writeBinaryExpr(expr,parent>child,child,op,child);}static getEqOp(not){return not?" != ":" == ";}writeEqualOperand(expr,other){expr.accept(this,FuPriority.EQUALITY);}writeEqualExpr(left,right,parent,op){if(parent>FuPriority.COND_AND)this.writeChar(40);this.writeEqualOperand(left,right);this.write(op);this.writeEqualOperand(right,left);if(parent>FuPriority.COND_AND)this.writeChar(41);}writeEqual(left,right,parent,not){this.writeEqualExpr(left,right,parent,GenBase.getEqOp(not));}writeRel(expr,parent,op){this.writeBinaryExpr(expr,parent>FuPriority.COND_AND,FuPriority.REL,op,FuPriority.REL);}writeAnd(expr,parent){this.writeBinaryExpr(expr,parent>FuPriority.COND_AND&&parent!=FuPriority.AND,FuPriority.AND," & ",FuPriority.AND);}writeAssignRight(expr){this.writeCoerced(expr.left.type,expr.right,FuPriority.ARGUMENT);}writeAssign(expr,parent){if(parent>FuPriority.ASSIGN)this.writeChar(40);expr.left.accept(this,FuPriority.ASSIGN);this.write(" = ");this.writeAssignRight(expr);if(parent>FuPriority.ASSIGN)this.writeChar(41);}writeIndexing(collection,index){collection.accept(this,FuPriority.PRIMARY);this.writeChar(91);index.accept(this,FuPriority.ARGUMENT);this.writeChar(93);}writeIndexingExpr(expr,parent){this.writeIndexing(expr.left,expr.right);}getIsOperator(){return " is ";}visitBinaryExpr(expr,parent){switch(expr.op){case FuToken.PLUS:this.writeBinaryExpr(expr,parent>FuPriority.ADD||GenBase.#isBitOp(parent),FuPriority.ADD," + ",FuPriority.ADD);break;case FuToken.MINUS:this.writeBinaryExpr(expr,parent>FuPriority.ADD||GenBase.#isBitOp(parent),FuPriority.ADD," - ",FuPriority.MUL);break;case FuToken.ASTERISK:this.writeBinaryExpr(expr,parent>FuPriority.MUL,FuPriority.MUL," * ",FuPriority.PRIMARY);break;case FuToken.SLASH:this.writeBinaryExpr(expr,parent>FuPriority.MUL,FuPriority.MUL," / ",FuPriority.PRIMARY);break;case FuToken.MOD:this.writeBinaryExpr(expr,parent>FuPriority.MUL,FuPriority.MUL," % ",FuPriority.PRIMARY);break;case FuToken.SHIFT_LEFT:this.writeBinaryExpr(expr,parent>FuPriority.SHIFT,FuPriority.SHIFT," << ",FuPriority.MUL);break;case FuToken.SHIFT_RIGHT:this.writeBinaryExpr(expr,parent>FuPriority.SHIFT,FuPriority.SHIFT," >> ",FuPriority.MUL);break;case FuToken.EQUAL:this.writeEqual(expr.left,expr.right,parent,false);break;case FuToken.NOT_EQUAL:this.writeEqual(expr.left,expr.right,parent,true);break;case FuToken.LESS:this.writeRel(expr,parent," < ");break;case FuToken.LESS_OR_EQUAL:this.writeRel(expr,parent," <= ");break;case FuToken.GREATER:this.writeRel(expr,parent," > ");break;case FuToken.GREATER_OR_EQUAL:this.writeRel(expr,parent," >= ");break;case FuToken.AND:this.writeAnd(expr,parent);break;case FuToken.OR:this.writeBinaryExpr2(expr,parent,FuPriority.OR," | ");break;case FuToken.XOR:this.writeBinaryExpr(expr,parent>FuPriority.XOR||parent==FuPriority.OR,FuPriority.XOR," ^ ",FuPriority.XOR);break;case FuToken.COND_AND:this.writeBinaryExpr(expr,parent>FuPriority.COND_AND||parent==FuPriority.COND_OR,FuPriority.COND_AND," && ",FuPriority.COND_AND);break;case FuToken.COND_OR:this.writeBinaryExpr2(expr,parent,FuPriority.COND_OR," || ");break;case FuToken.ASSIGN:this.writeAssign(expr,parent);break;case FuToken.ADD_ASSIGN:case FuToken.SUB_ASSIGN:case FuToken.MUL_ASSIGN:case FuToken.DIV_ASSIGN:case FuToken.MOD_ASSIGN:case FuToken.SHIFT_LEFT_ASSIGN:case FuToken.SHIFT_RIGHT_ASSIGN:case FuToken.AND_ASSIGN:case FuToken.OR_ASSIGN:case FuToken.XOR_ASSIGN:if(parent>FuPriority.ASSIGN)this.writeChar(40);expr.left.accept(this,FuPriority.ASSIGN);this.writeChar(32);this.write(expr.getOpString());this.writeChar(32);expr.right.accept(this,FuPriority.ARGUMENT);if(parent>FuPriority.ASSIGN)this.writeChar(41);break;case FuToken.LEFT_BRACKET:if(expr.left.type instanceof FuStringType)this.writeCharAt(expr);else this.writeIndexingExpr(expr,parent);break;case FuToken.IS:if(parent>FuPriority.REL)this.writeChar(40);expr.left.accept(this,FuPriority.REL);this.write(this.getIsOperator());if(expr.right instanceof FuSymbolReference){const symbol=expr.right;this.writeName(symbol.symbol);}else if(expr.right instanceof FuVar){const def=expr.right;this.writeTypeAndName(def);}else throw new Error();if(parent>FuPriority.REL)this.writeChar(41);break;case FuToken.WHEN:expr.left.accept(this,FuPriority.ARGUMENT);this.write(" when ");expr.right.accept(this,FuPriority.ARGUMENT);break;default:throw new Error();}}static isReferenceTo(expr,id){let symbol;return (symbol=expr)instanceof FuSymbolReference&&symbol.symbol.id==id;}writeJavaMatchProperty(expr,parent){switch(expr.symbol.id){case FuId.MATCH_START:this.writePostfix(expr.left,".start()");return true;case FuId.MATCH_END:this.writePostfix(expr.left,".end()");return true;case FuId.MATCH_LENGTH:if(parent>FuPriority.ADD)this.writeChar(40);this.writePostfix(expr.left,".end() - ");this.writePostfix(expr.left,".start()");if(parent>FuPriority.ADD)this.writeChar(41);return true;case FuId.MATCH_VALUE:this.writePostfix(expr.left,".group()");return true;default:return false;}}visitSymbolReference(expr,parent){if(expr.left==null)this.writeLocalName(expr.symbol,parent);else if(expr.symbol.id==FuId.STRING_LENGTH)this.writeStringLength(expr.left);else {expr.left.accept(this,FuPriority.PRIMARY);this.writeMemberOp(expr.left,expr);this.writeName(expr.symbol);}}writeNotPromoted(type,expr){expr.accept(this,FuPriority.ARGUMENT);}writeEnumAsInt(expr,parent){expr.accept(this,parent);}writeEnumHasFlag(obj,args,parent){if(parent>FuPriority.EQUALITY)this.writeChar(40);let i=args[0].intValue();if((i&i-1)==0&&i!=0){this.writeChar(40);this.writeEnumAsInt(obj,FuPriority.AND);this.write(" & ");this.writeEnumAsInt(args[0],FuPriority.AND);this.write(") != 0");}else {this.write("(~");this.writeEnumAsInt(obj,FuPriority.PRIMARY);this.write(" & ");this.writeEnumAsInt(args[0],FuPriority.AND);this.write(") == 0");}if(parent>FuPriority.EQUALITY)this.writeChar(41);}writeTryParseRadix(args){this.write(", ");if(args.length==2)args[1].accept(this,FuPriority.ARGUMENT);else this.write("10");}writeListAdd(obj,method,args){obj.accept(this,FuPriority.PRIMARY);this.writeChar(46);this.write(method);this.writeChar(40);let elementType=obj.type.asClassType().getElementType();if(args.length==0)this.writeNewStorage(elementType);else this.writeNotPromoted(elementType,args[0]);this.writeChar(41);}writeListInsert(obj,method,args,separator=", "){obj.accept(this,FuPriority.PRIMARY);this.writeChar(46);this.write(method);this.writeChar(40);args[0].accept(this,FuPriority.ARGUMENT);this.write(separator);let elementType=obj.type.asClassType().getElementType();if(args.length==1)this.writeNewStorage(elementType);else this.writeNotPromoted(elementType,args[1]);this.writeChar(41);}writeDictionaryAdd(obj,args){this.writeIndexing(obj,args[0]);this.write(" = ");this.writeNewStorage(obj.type.asClassType().getValueType());}writeClampAsMinMax(args){args[0].accept(this,FuPriority.ARGUMENT);this.write(", ");args[1].accept(this,FuPriority.ARGUMENT);this.write("), ");args[2].accept(this,FuPriority.ARGUMENT);this.writeChar(41);}getRegexOptions(args){let expr=args.at(-1);if(expr.type instanceof FuEnum)return expr.intValue();return RegexOptions.NONE;}writeRegexOptions(args,prefix,separator,suffix,i,m,s){let options=this.getRegexOptions(args);if(options==RegexOptions.NONE)return false;this.write(prefix);if((options&RegexOptions.IGNORE_CASE)!=0)this.write(i);if((options&RegexOptions.MULTILINE)!=0){if((options&RegexOptions.IGNORE_CASE)!=0)this.write(separator);this.write(m);}if((options&RegexOptions.SINGLELINE)!=0){if(options!=RegexOptions.SINGLELINE)this.write(separator);this.write(s);}this.write(suffix);return true;}visitCallExpr(expr,parent){const method=expr.method.symbol;this.writeCallExpr(expr.method.left,method,expr.arguments,parent);}visitSelectExpr(expr,parent){this.writeCoercedSelect(expr.type,expr,parent);}ensureChildBlock(){if(this.#atChildStart){this.atLineStart=false;this.#atChildStart=false;this.writeChar(32);this.openBlock();this.#inChildBlock=true;}}static hasTemporaries(expr){if(expr instanceof FuAggregateInitializer){const init=expr;return init.items.some(item=>GenBase.hasTemporaries(item));}else if(expr instanceof FuLiteral||expr instanceof FuLambdaExpr)return false;else if(expr instanceof FuInterpolatedString){const interp=expr;return interp.parts.some(part=>GenBase.hasTemporaries(part.argument));}else if(expr instanceof FuSymbolReference){const symbol=expr;return symbol.left!=null&&GenBase.hasTemporaries(symbol.left);}else if(expr instanceof FuUnaryExpr){const unary=expr;return unary.inner!=null&&(GenBase.hasTemporaries(unary.inner)||unary.inner instanceof FuAggregateInitializer);}else if(expr instanceof FuBinaryExpr){const binary=expr;if(GenBase.hasTemporaries(binary.left))return true;if(binary.op==FuToken.IS)return binary.right instanceof FuVar;return GenBase.hasTemporaries(binary.right);}else if(expr instanceof FuSelectExpr){const select=expr;return GenBase.hasTemporaries(select.cond)||GenBase.hasTemporaries(select.onTrue)||GenBase.hasTemporaries(select.onFalse);}else if(expr instanceof FuCallExpr){const call=expr;return GenBase.hasTemporaries(call.method)||call.arguments.some(arg=>GenBase.hasTemporaries(arg));}else throw new Error();}defineObjectLiteralTemporary(expr){let init;if((init=expr.inner)instanceof FuAggregateInitializer){this.ensureChildBlock();let id=this.currentTemporaries.indexOf(expr.type);if(id<0){id=this.currentTemporaries.length;this.startTemporaryVar(expr.type);this.currentTemporaries.push(expr);}else this.currentTemporaries[id]=expr;this.write("futemp");this.visitLiteralLong(BigInt(id));this.write(" = ");const dynamic=expr.type;this.writeNew(dynamic,FuPriority.ARGUMENT);this.endStatement();for(const item of init.items){this.write("futemp");this.visitLiteralLong(BigInt(id));this.#writeAggregateInitField(expr,item);}}}writeTemporaries(expr){if(expr instanceof FuVar){const def=expr;if(def.value!=null){let unary;if((unary=def.value)instanceof FuUnaryExpr&&unary.inner instanceof FuAggregateInitializer)this.writeTemporaries(unary.inner);else this.writeTemporaries(def.value);}}else if(expr instanceof FuAggregateInitializer){const init=expr;for(const item of init.items){const assign=item;this.writeTemporaries(assign.right);}}else if(expr instanceof FuLiteral||expr instanceof FuLambdaExpr);else if(expr instanceof FuInterpolatedString){const interp=expr;for(const part of interp.parts)this.writeTemporaries(part.argument);}else if(expr instanceof FuSymbolReference){const symbol=expr;if(symbol.left!=null)this.writeTemporaries(symbol.left);}else if(expr instanceof FuUnaryExpr){const unary=expr;if(unary.inner!=null){this.writeTemporaries(unary.inner);this.defineObjectLiteralTemporary(unary);}}else if(expr instanceof FuBinaryExpr){const binary=expr;this.writeTemporaries(binary.left);if(binary.op==FuToken.IS)this.defineIsVar(binary);else this.writeTemporaries(binary.right);}else if(expr instanceof FuSelectExpr){const select=expr;this.writeTemporaries(select.cond);this.writeTemporaries(select.onTrue);this.writeTemporaries(select.onFalse);}else if(expr instanceof FuCallExpr){const call=expr;this.writeTemporaries(call.method);for(const arg of call.arguments)this.writeTemporaries(arg);}else throw new Error();}cleanupTemporary(i,temp){}cleanupTemporaries(){for(let i=this.currentTemporaries.length;--i>=0;){let temp=this.currentTemporaries[i];if(!(temp instanceof FuType)){this.cleanupTemporary(i,temp);this.currentTemporaries[i]=temp.type;}}}visitExpr(statement){this.writeTemporaries(statement);statement.accept(this,FuPriority.STATEMENT);this.writeCharLine(59);let def;if((def=statement)instanceof FuVar)this.writeInitCode(def);this.cleanupTemporaries();}visitConst(statement){}visitAssert(statement){let binary;if((binary=statement.cond)instanceof FuBinaryExpr&&binary.op==FuToken.IS&&binary.right instanceof FuVar)this.writeAssertCast(binary);else this.writeAssert(statement);}writeFirstStatements(statements,count){for(let i=0;i<count;i++)statements[i].acceptStatement(this);}writeStatements(statements){this.writeFirstStatements(statements,statements.length);}cleanupBlock(statement){}visitBlock(statement){if(this.#atChildStart){this.atLineStart=false;this.#atChildStart=false;this.writeChar(32);}this.openBlock();let temporariesCount=this.currentTemporaries.length;this.writeStatements(statement.statements);this.cleanupBlock(statement);this.currentTemporaries.splice(temporariesCount,this.currentTemporaries.length-temporariesCount);this.closeBlock();}writeChild(statement){let wasInChildBlock=this.#inChildBlock;this.atLineStart=true;this.#atChildStart=true;this.#inChildBlock=false;statement.acceptStatement(this);if(this.#inChildBlock)this.closeBlock();else if(!(statement instanceof FuBlock))this.indent--;this.#inChildBlock=wasInChildBlock;}visitBreak(statement){this.writeLine("break;");}visitContinue(statement){this.writeLine("continue;");}visitDoWhile(statement){this.write("do");this.writeChild(statement.body);this.write("while (");statement.cond.accept(this,FuPriority.ARGUMENT);this.writeLine(");");}visitFor(statement){if(statement.cond!=null)this.writeTemporaries(statement.cond);this.write("for (");if(statement.init!=null)statement.init.accept(this,FuPriority.STATEMENT);this.writeChar(59);if(statement.cond!=null){this.writeChar(32);statement.cond.accept(this,FuPriority.ARGUMENT);}this.writeChar(59);if(statement.advance!=null){this.writeChar(32);statement.advance.accept(this,FuPriority.STATEMENT);}this.writeChar(41);this.writeChild(statement.body);}embedIfWhileIsVar(expr,write){return false;}#startIfWhile(expr){this.embedIfWhileIsVar(expr,true);expr.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}#writeIf(statement){this.write("if (");this.#startIfWhile(statement.cond);this.writeChild(statement.onTrue);if(statement.onFalse!=null){this.write("else");let elseIf;if((elseIf=statement.onFalse)instanceof FuIf){let wasInChildBlock=this.#inChildBlock;this.atLineStart=true;this.#atChildStart=true;this.#inChildBlock=false;if(!this.embedIfWhileIsVar(elseIf.cond,false))this.writeTemporaries(elseIf.cond);if(this.#inChildBlock){this.#writeIf(elseIf);this.closeBlock();}else {this.atLineStart=false;this.#atChildStart=false;this.writeChar(32);this.#writeIf(elseIf);}this.#inChildBlock=wasInChildBlock;}else this.writeChild(statement.onFalse);}}visitIf(statement){if(!this.embedIfWhileIsVar(statement.cond,false))this.writeTemporaries(statement.cond);this.#writeIf(statement);}visitNative(statement){this.write(statement.content);}visitReturn(statement){if(statement.value==null)this.writeLine("return;");else {this.writeTemporaries(statement.value);this.write("return ");this.writeStronglyCoerced(this.currentMethod.type,statement.value);this.writeCharLine(59);this.cleanupTemporaries();}}defineVar(value){let def;if((def=value)instanceof FuVar&&def.name!="_"){this.writeVar(def);this.endStatement();}}writeSwitchCaseTypeVar(value){}writeSwitchValue(expr){expr.accept(this,FuPriority.ARGUMENT);}writeSwitchCaseValue(statement,value){this.writeCoercedLiteral(statement.value.type,value);}writeSwitchCaseBody(statements){this.writeStatements(statements);}writeSwitchCase(statement,kase){for(const value of kase.values){this.write("case ");this.writeSwitchCaseValue(statement,value);this.writeCharLine(58);}this.indent++;this.writeSwitchCaseBody(kase.body);this.indent--;}startSwitch(statement){this.write("switch (");this.writeSwitchValue(statement.value);this.writeLine(") {");for(const kase of statement.cases)this.writeSwitchCase(statement,kase);}writeSwitchCaseCond(statement,value,parent){let when1;if((when1=value)instanceof FuBinaryExpr&&when1.op==FuToken.WHEN){if(parent>FuPriority.SELECT_COND)this.writeChar(40);this.writeSwitchCaseCond(statement,when1.left,FuPriority.COND_AND);this.write(" && ");when1.right.accept(this,FuPriority.COND_AND);if(parent>FuPriority.SELECT_COND)this.writeChar(41);}else this.writeEqual(statement.value,value,parent,false);}writeIfCaseBody(body,doWhile,statement,kase){let length=FuSwitch.lengthWithoutTrailingBreak(body);if(doWhile&&FuSwitch.hasEarlyBreak(body)){this.indent++;this.writeNewLine();this.write("do ");this.openBlock();this.writeFirstStatements(body,length);this.closeBlock();this.writeLine("while (0);");this.indent--;}else if(length!=1||body[0]instanceof FuIf||body[0]instanceof FuSwitch){this.writeChar(32);this.openBlock();this.writeFirstStatements(body,length);this.closeBlock();}else this.writeChild(body[0]);}writeSwitchAsIfs(statement,doWhile){for(const kase of statement.cases){for(const value of kase.values){let when1;if((when1=value)instanceof FuBinaryExpr&&when1.op==FuToken.WHEN){this.defineVar(when1.left);this.writeTemporaries(when1);}else this.writeSwitchCaseTypeVar(value);}}let op="if (";for(const kase of statement.cases){let parent=kase.values.length==1?FuPriority.ARGUMENT:FuPriority.COND_OR;for(const value of kase.values){this.write(op);this.writeSwitchCaseCond(statement,value,parent);op=" || ";}this.writeChar(41);this.writeIfCaseBody(kase.body,doWhile,statement,kase);op="else if (";}if(statement.hasDefault()){this.write("else");this.writeIfCaseBody(statement.defaultBody,doWhile,statement,null);}}visitSwitch(statement){this.writeTemporaries(statement.value);this.startSwitch(statement);if(statement.defaultBody.length>0){this.writeLine("default:");this.indent++;this.writeSwitchCaseBody(statement.defaultBody);this.indent--;}this.writeCharLine(125);}visitWhile(statement){if(!this.embedIfWhileIsVar(statement.cond,false))this.writeTemporaries(statement.cond);this.write("while (");this.#startIfWhile(statement.cond);this.writeChild(statement.body);}flattenBlock(statement){let block;if((block=statement)instanceof FuBlock)this.writeStatements(block.statements);else statement.acceptStatement(this);}hasInitCode(def){return GenBase.#getAggregateInitializer(def)!=null;}needsConstructor(klass){for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let field;if((field=symbol)instanceof FuField&&this.hasInitCode(field))return true;}return klass.constructor_!=null;}writeInitField(field){this.writeInitCode(field);}writeConstructorBody(klass){for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let field;if((field=symbol)instanceof FuField)this.writeInitField(field);}if(klass.constructor_!=null){this.currentMethod=klass.constructor_;const block=klass.constructor_.body;this.writeStatements(block.statements);this.currentMethod=null;}this.currentTemporaries.length=0;}writeParameter(param){this.writeTypeAndName(param);}writeRemainingParameters(method,first,defaultArguments){for(let param=method.parameters.firstParameter();param!=null;param=param.nextParameter()){if(!first)this.write(", ");first=false;this.writeParameter(param);if(defaultArguments)this.writeVarInit(param);}this.writeChar(41);}writeParameters(method,defaultArguments){this.writeChar(40);this.writeRemainingParameters(method,true,defaultArguments);}writeBody(method){if(method.callType==FuCallType.ABSTRACT)this.writeCharLine(59);else {this.writeNewLine();this.currentMethod=method;this.openBlock();this.flattenBlock(method.body);this.closeBlock();this.currentMethod=null;}}writePublic(container){if(container.isPublic)this.write("public ");}writeEnumValue(konst){this.writeDoc(konst.documentation);this.writeName(konst);if(!(konst.value instanceof FuImplicitEnumValue)){this.write(" = ");konst.value.accept(this,FuPriority.ARGUMENT);}}visitEnumValue(konst,previous){if(previous!=null)this.writeCharLine(44);this.writeEnumValue(konst);}writeRegexOptionsEnum(program){if(program.regexOptionsEnum)this.writeEnum(program.system.regexOptionsEnum);}startClass(klass,suffix,extendsClause){this.write("class ");this.write(klass.name);this.write(suffix);if(klass.hasBaseClass()){this.write(extendsClause);this.write(klass.baseClassName);}}openClass(klass,suffix,extendsClause){this.startClass(klass,suffix,extendsClause);this.writeNewLine();this.openBlock();}writeMembers(klass,constArrays){for(let symbol=klass.first;symbol!=null;symbol=symbol.next){if(symbol instanceof FuConst){const konst=symbol;this.writeConst(konst);}else if(symbol instanceof FuField){const field=symbol;this.writeField(field);}else if(symbol instanceof FuMethod){const method=symbol;this.writeMethod(method);this.currentTemporaries.length=0;}else if(symbol instanceof FuVar);else throw new Error();}if(constArrays){for(const konst of klass.constArrays)this.writeConst(konst);}}writeBaseClass(klass,program){if(this.writtenClasses.has(klass))return false;this.writtenClasses.add(klass);let baseClass;if((baseClass=klass.parent)instanceof FuClass)this.writeClass(baseClass,program);return true;}writeTypes(program){this.writeRegexOptionsEnum(program);for(let type=program.first;type!=null;type=type.next){if(type instanceof FuClass){const klass=type;this.writeClass(klass,program);}else if(type instanceof FuEnum){const enu=type;this.writeEnum(enu);}else throw new Error();}}}class GenTyped extends GenBase{writeCoercedLiteral(type,expr){expr.accept(this,FuPriority.ARGUMENT);if(type!=null&&type.id==FuId.FLOAT_TYPE&&expr instanceof FuLiteralDouble)this.writeChar(102);}writeTypeAndName(value){this.writeType(value.type,true);this.writeChar(32);this.writeName(value);}visitAggregateInitializer(expr){this.write("{ ");this.writeCoercedLiterals(expr.type.asClassType().getElementType(),expr.items);this.write(" }");}writeArrayStorageLength(expr){const array=expr.type;this.visitLiteralLong(BigInt(array.length));}writeNewArray(elementType,lengthExpr,parent){this.write("new ");this.writeType(elementType.getBaseType(),false);this.writeChar(91);lengthExpr.accept(this,FuPriority.ARGUMENT);this.writeChar(93);while(elementType.isArray()){this.writeChar(91);let arrayStorage;if((arrayStorage=elementType)instanceof FuArrayStorageType)arrayStorage.lengthExpr.accept(this,FuPriority.ARGUMENT);this.writeChar(93);elementType=elementType.asClassType().getElementType();}}getOneAscii(expr){let literal;return (literal=expr)instanceof FuLiteralString?literal.getOneAscii():-1;}writeCharMethodCall(obj,method,arg){obj.accept(this,FuPriority.PRIMARY);this.writeChar(46);this.write(method);this.writeChar(40);if(!(arg instanceof FuLiteralChar))this.write("(char) ");arg.accept(this,FuPriority.PRIMARY);this.writeChar(41);}static isNarrower(left,right){switch(left){case FuId.S_BYTE_RANGE:switch(right){case FuId.BYTE_RANGE:case FuId.SHORT_RANGE:case FuId.U_SHORT_RANGE:case FuId.INT_TYPE:case FuId.LONG_TYPE:return true;default:return false;}case FuId.BYTE_RANGE:switch(right){case FuId.S_BYTE_RANGE:case FuId.SHORT_RANGE:case FuId.U_SHORT_RANGE:case FuId.INT_TYPE:case FuId.LONG_TYPE:return true;default:return false;}case FuId.SHORT_RANGE:switch(right){case FuId.U_SHORT_RANGE:case FuId.INT_TYPE:case FuId.LONG_TYPE:return true;default:return false;}case FuId.U_SHORT_RANGE:switch(right){case FuId.SHORT_RANGE:case FuId.INT_TYPE:case FuId.LONG_TYPE:return true;default:return false;}case FuId.INT_TYPE:return right==FuId.LONG_TYPE;default:return false;}}getStaticCastInner(type,expr){let binary;let rightMask;if((binary=expr)instanceof FuBinaryExpr&&binary.op==FuToken.AND&&(rightMask=binary.right)instanceof FuLiteralLong&&type instanceof FuIntegerType){let mask;switch(type.id){case FuId.BYTE_RANGE:case FuId.S_BYTE_RANGE:mask=255n;break;case FuId.SHORT_RANGE:case FuId.U_SHORT_RANGE:mask=65535n;break;case FuId.INT_TYPE:mask=4294967295n;break;default:return expr;}if((rightMask.value&mask)==mask)return binary.left;}return expr;}writeStaticCastType(type){this.writeChar(40);this.writeType(type,false);this.write(") ");}writeStaticCast(type,expr){this.writeStaticCastType(type);this.getStaticCastInner(type,expr).accept(this,FuPriority.PRIMARY);}writeNotPromoted(type,expr){if(type instanceof FuIntegerType&&GenTyped.isNarrower(type.id,this.getTypeId(expr.type,true)))this.writeStaticCast(type,expr);else this.writeCoercedLiteral(type,expr);}isPromoted(expr){let binary;return !((binary=expr)instanceof FuBinaryExpr&&(binary.op==FuToken.LEFT_BRACKET||binary.isAssign()));}writeAssignRight(expr){if(expr.left.isIndexing()){if(expr.right instanceof FuLiteralLong){this.writeCoercedLiteral(expr.left.type,expr.right);return;}let leftTypeId=expr.left.type.id;let rightTypeId=this.getTypeId(expr.right.type,this.isPromoted(expr.right));if(leftTypeId==FuId.S_BYTE_RANGE&&rightTypeId==FuId.S_BYTE_RANGE){expr.right.accept(this,FuPriority.ASSIGN);return;}if(GenTyped.isNarrower(leftTypeId,rightTypeId)){this.writeStaticCast(expr.left.type,expr.right);return;}}super.writeAssignRight(expr);}writeCoercedInternal(type,expr,parent){if(type instanceof FuIntegerType&&type.id!=FuId.LONG_TYPE&&expr.type.id==FuId.LONG_TYPE)this.writeStaticCast(type,expr);else if(type.id==FuId.FLOAT_TYPE&&expr.type.id==FuId.DOUBLE_TYPE){let literal;if((literal=expr)instanceof FuLiteralDouble){this.visitLiteralDouble(literal.value);this.writeChar(102);}else this.writeStaticCast(type,expr);}else if(type instanceof FuIntegerType&&expr.type.id==FuId.FLOAT_INT_TYPE){let call;if((call=expr)instanceof FuCallExpr&&call.method.symbol.id==FuId.MATH_TRUNCATE){expr=call.arguments[0];let literal;if((literal=expr)instanceof FuLiteralDouble){this.visitLiteralLong(BigInt(Math.trunc(literal.value)));return;}}this.writeStaticCast(type,expr);}else super.writeCoercedInternal(type,expr,parent);}writeCharAt(expr){this.writeIndexing(expr.left,expr.right);}startTemporaryVar(type){this.writeType(type,true);this.writeChar(32);}writeAssertCast(expr){const def=expr.right;this.writeTypeAndName(def);this.write(" = ");this.writeStaticCast(def.type,expr.left);this.writeCharLine(59);}}class GenCCppD extends GenTyped{switchesWithGoto=[];visitLiteralLong(i){if(i==-9223372036854775808)this.write("(-9223372036854775807 - 1)");else super.visitLiteralLong(i);}static#isPtrTo(ptr,other){let klass;return (klass=ptr.type)instanceof FuClassType&&klass.class.id!=FuId.STRING_CLASS&&klass.isAssignableFrom(other.type);}writeEqual(left,right,parent,not){let coercedType;if(GenCCppD.#isPtrTo(left,right))coercedType=left.type;else if(GenCCppD.#isPtrTo(right,left))coercedType=right.type;else {super.writeEqual(left,right,parent,not);return;}if(parent>FuPriority.EQUALITY)this.writeChar(40);this.writeCoerced(coercedType,left,FuPriority.EQUALITY);this.write(GenCCppD.getEqOp(not));this.writeCoerced(coercedType,right,FuPriority.EQUALITY);if(parent>FuPriority.EQUALITY)this.writeChar(41);}visitConst(statement){if(statement.type instanceof FuArrayStorageType)this.writeConst(statement);}visitBreak(statement){let switchStatement;if((switchStatement=statement.loopOrSwitch)instanceof FuSwitch){let gotoId=this.switchesWithGoto.indexOf(switchStatement);if(gotoId>=0){this.write("goto fuafterswitch");this.visitLiteralLong(BigInt(gotoId));this.writeCharLine(59);return;}}super.visitBreak(statement);}writeSwitchAsIfsWithGoto(statement){if(statement.cases.some(kase=>FuSwitch.hasEarlyBreakAndContinue(kase.body))||FuSwitch.hasEarlyBreakAndContinue(statement.defaultBody)){let gotoId=this.switchesWithGoto.length;this.switchesWithGoto.push(statement);this.writeSwitchAsIfs(statement,false);this.write("fuafterswitch");this.visitLiteralLong(BigInt(gotoId));this.writeLine(": ;");}else this.writeSwitchAsIfs(statement,true);}}class GenCCpp extends GenCCppD{#writeCIncludes(){this.writeIncludes("#include <",">");}getLiteralChars(){return 127;}writeNumericType(id){switch(id){case FuId.S_BYTE_RANGE:this.includeStdInt();this.write("int8_t");break;case FuId.BYTE_RANGE:this.includeStdInt();this.write("uint8_t");break;case FuId.SHORT_RANGE:this.includeStdInt();this.write("int16_t");break;case FuId.U_SHORT_RANGE:this.includeStdInt();this.write("uint16_t");break;case FuId.INT_TYPE:this.write("int");break;case FuId.LONG_TYPE:this.includeStdInt();this.write("int64_t");break;case FuId.FLOAT_TYPE:this.write("float");break;case FuId.DOUBLE_TYPE:this.write("double");break;default:throw new Error();}}visitSymbolReference(expr,parent){switch(expr.symbol.id){case FuId.MATH_NA_N:this.includeMath();this.write("NAN");break;case FuId.MATH_NEGATIVE_INFINITY:this.includeMath();this.write("-INFINITY");break;case FuId.MATH_POSITIVE_INFINITY:this.includeMath();this.write("INFINITY");break;default:super.visitSymbolReference(expr,parent);break;}}static isStringEmpty(expr){let symbol;if((symbol=expr.left)instanceof FuSymbolReference&&symbol.symbol.id==FuId.STRING_LENGTH&&expr.right.isLiteralZero())return symbol.left;return null;}writeArrayPtrAdd(array,index){if(index.isLiteralZero())this.writeArrayPtr(array,FuPriority.ARGUMENT);else {this.writeArrayPtr(array,FuPriority.ADD);this.write(" + ");index.accept(this,FuPriority.MUL);}}static isStringSubstring(expr){let call;if((call=expr)instanceof FuCallExpr){let id=call.method.symbol.id;if(id==FuId.STRING_SUBSTRING&&call.arguments.length==2||id==FuId.U_T_F8_GET_STRING)return call;}return null;}static isUTF8GetString(call){return call.method.symbol.id==FuId.U_T_F8_GET_STRING;}static getStringSubstringPtr(call){return GenCCpp.isUTF8GetString(call)?call.arguments[0]:call.method.left;}static getStringSubstringOffset(call){return call.arguments[GenCCpp.isUTF8GetString(call)?1:0];}static getStringSubstringLength(call){return call.arguments[GenCCpp.isUTF8GetString(call)?2:1];}writeStringPtrAdd(call){this.writeArrayPtrAdd(GenCCpp.getStringSubstringPtr(call),GenCCpp.getStringSubstringOffset(call));}static isTrimSubstring(expr){let call=GenCCpp.isStringSubstring(expr.right);let leftSymbol;if(call!=null&&!GenCCpp.isUTF8GetString(call)&&(leftSymbol=expr.left)instanceof FuSymbolReference&&GenCCpp.getStringSubstringPtr(call).isReferenceTo(leftSymbol.symbol)&&GenCCpp.getStringSubstringOffset(call).isLiteralZero())return GenCCpp.getStringSubstringLength(call);return null;}writeStringLiteralWithNewLine(s){this.writeChar(34);this.write(s);this.write("\\n\"");}writeUnreachable(statement){this.write("abort();");if(statement.message!=null){this.write(" // ");statement.message.accept(this,FuPriority.ARGUMENT);}this.writeNewLine();}writeAssert(statement){if(statement.completesNormally()){this.writeTemporaries(statement.cond);this.includeAssert();this.write("assert(");if(statement.message==null)statement.cond.accept(this,FuPriority.ARGUMENT);else {statement.cond.accept(this,FuPriority.COND_AND);this.write(" && ");statement.message.accept(this,FuPriority.ARGUMENT);}this.writeLine(");");}else this.writeUnreachable(statement);}visitSwitch(statement){if(statement.value.type instanceof FuStringType||statement.hasWhen())this.writeSwitchAsIfsWithGoto(statement);else super.visitSwitch(statement);}writeMethods(klass){for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let method;if((method=symbol)instanceof FuMethod){this.writeMethod(method);this.currentTemporaries.length=0;}}}writeClass(klass,program){if(!this.writeBaseClass(klass,program))return;for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let field;let storage;if((field=symbol)instanceof FuField&&(storage=field.type.getBaseType())instanceof FuStorageType&&storage.class.id==FuId.NONE)this.writeClass(storage.class,program);}this.writeClassInternal(klass);}static#changeExtension(path,ext){let extIndex=path.length;for(let i=extIndex;--i>=0&&path.charCodeAt(i)!=47&&path.charCodeAt(i)!=92;){if(path.charCodeAt(i)==46){extIndex=i;break;}}return path.substring(0,extIndex)+ext;}createHeaderFile(headerExt){this.createFile(null,GenCCpp.#changeExtension(this.outputFile,headerExt));this.writeLine("#pragma once");this.#writeCIncludes();}static#getFilenameWithoutExtension(path){let pathLength=path.length;let extIndex=pathLength;let i=pathLength;while(--i>=0&&path.charCodeAt(i)!=47&&path.charCodeAt(i)!=92){if(path.charCodeAt(i)==46&&extIndex==pathLength)extIndex=i;}i++;return path.substring(i,i+extIndex-i);}createImplementationFile(program,headerExt){this.createOutputFile();this.writeTopLevelNatives(program);this.#writeCIncludes();this.write("#include \"");this.write(GenCCpp.#getFilenameWithoutExtension(this.outputFile));this.write(headerExt);this.writeCharLine(34);}}class GenC extends GenCCpp{#intTryParse;#longTryParse;#doubleTryParse;#stringAssign;#stringSubstring;#stringAppend;#stringIndexOf;#stringLastIndexOf;#stringEndsWith;#stringReplace;#stringFormat;#matchFind;#matchPos;#ptrConstruct;#sharedMake;#sharedAddRef;#sharedRelease;#sharedAssign;#listFrees={};#treeCompareInteger;#treeCompareString;#compares=new Set();#contains=new Set();#varsToDestruct=[];getCurrentContainer(){return this.currentClass;}getTargetName(){return "C";}writeSelfDoc(method){if(method.callType==FuCallType.STATIC)return;this.write(" * @param self This <code>");this.writeName(method.parent);this.writeLine("</code>.");}includeStdInt(){this.include("stdint.h");}includeAssert(){this.include("assert.h");}includeMath(){this.include("math.h");}includeStdBool(){this.include("stdbool.h");}visitLiteralNull(){this.write("NULL");}writePrintfLongPrefix(){this.write("ll");}writePrintfWidth(part){super.writePrintfWidth(part);if(GenC.isStringSubstring(part.argument)!=null){console.assert(part.precision<0);this.write(".*");}if(part.argument.type.id==FuId.LONG_TYPE)this.writePrintfLongPrefix();}writeInterpolatedStringArgBase(expr){if(expr.type.id==FuId.LONG_TYPE){this.write("(long long) ");expr.accept(this,FuPriority.PRIMARY);}else expr.accept(this,FuPriority.ARGUMENT);}#writeStringPtrAddCast(call){if(GenC.isUTF8GetString(call))this.write("(const char *) ");this.writeStringPtrAdd(call);}static#isDictionaryClassStgIndexing(expr){let indexing;let dict;return (indexing=expr)instanceof FuBinaryExpr&&indexing.op==FuToken.LEFT_BRACKET&&(dict=indexing.left.type)instanceof FuClassType&&dict.class.typeParameterCount==2&&dict.getValueType()instanceof FuStorageType;}#writeTemporaryOrExpr(expr,parent){let tempId=this.currentTemporaries.indexOf(expr);if(tempId>=0){this.write("futemp");this.visitLiteralLong(BigInt(tempId));}else expr.accept(this,parent);}#writeUpcast(resultClass,klass){for(;klass!=resultClass;klass=klass.parent)this.write(".base");}#writeClassPtr(resultClass,expr,parent){let storage;let ptr;if((storage=expr.type)instanceof FuStorageType&&storage.class.id==FuId.NONE&&!GenC.#isDictionaryClassStgIndexing(expr)){this.writeChar(38);this.#writeTemporaryOrExpr(expr,FuPriority.PRIMARY);this.#writeUpcast(resultClass,storage.class);}else if((ptr=expr.type)instanceof FuClassType&&ptr.class!=resultClass){this.writeChar(38);this.writePostfix(expr,"->base");this.#writeUpcast(resultClass,ptr.class.parent);}else expr.accept(this,parent);}writeInterpolatedStringArg(expr){let call=GenC.isStringSubstring(expr);if(call!=null){GenC.getStringSubstringLength(call).accept(this,FuPriority.ARGUMENT);this.write(", ");this.#writeStringPtrAddCast(call);}else {let klass;if((klass=expr.type)instanceof FuClassType&&klass.class.id!=FuId.STRING_CLASS){this.write(this.namespace);this.write(klass.class.name);this.write("_ToString(");this.#writeClassPtr(klass.class,expr,FuPriority.ARGUMENT);this.writeChar(41);}else this.writeInterpolatedStringArgBase(expr);}}visitInterpolatedString(expr,parent){this.include("stdarg.h");this.include("stdio.h");this.#stringFormat=true;this.write("FuString_Format(");this.writePrintf(expr,false);}writeCamelCaseNotKeyword(name){switch(name){case"this":this.write("self");break;case"Asm":case"Assert":case"Auto":case"Bool":case"Break":case"Byte":case"Case":case"Char":case"Class":case"Const":case"Continue":case"Default":case"Do":case"Double":case"Else":case"Enum":case"Extern":case"False":case"Float":case"For":case"Foreach":case"Goto":case"If":case"Inline":case"Int":case"Long":case"Register":case"Restrict":case"Return":case"Short":case"Signed":case"Sizeof":case"Static":case"Struct":case"Switch":case"True":case"Typedef":case"Typeof":case"Union":case"Unsigned":case"Void":case"Volatile":case"While":case"asm":case"auto":case"char":case"extern":case"goto":case"inline":case"register":case"restrict":case"signed":case"sizeof":case"struct":case"typedef":case"typeof":case"union":case"unsigned":case"volatile":this.writeCamelCase(name);this.writeChar(95);break;default:this.writeCamelCase(name);break;}}writeName(symbol){if(symbol instanceof FuContainerType){this.write(this.namespace);this.write(symbol.name);}else if(symbol instanceof FuMethod){this.write(this.namespace);this.write(symbol.parent.name);this.writeChar(95);this.write(symbol.name);}else if(symbol instanceof FuConst){if(symbol.parent instanceof FuContainerType){this.write(this.namespace);this.write(symbol.parent.name);this.writeChar(95);}this.writeUppercaseWithUnderscores(symbol.name);}else this.writeCamelCaseNotKeyword(symbol.name);}#writeForeachArrayIndexing(forEach,symbol){forEach.collection.accept(this,FuPriority.PRIMARY);this.writeChar(91);this.writeCamelCaseNotKeyword(symbol.name);this.writeChar(93);}#writeSelfForField(fieldClass){this.write("self->");for(let klass=this.currentClass;klass!=fieldClass;klass=klass.parent)this.write("base.");}writeLocalName(symbol,parent){let forEach;if((forEach=symbol.parent)instanceof FuForeach){const klass=forEach.collection.type;switch(klass.class.id){case FuId.STRING_CLASS:case FuId.LIST_CLASS:if(parent==FuPriority.PRIMARY)this.writeChar(40);this.writeChar(42);this.writeCamelCaseNotKeyword(symbol.name);if(parent==FuPriority.PRIMARY)this.writeChar(41);return;case FuId.ARRAY_STORAGE_CLASS:if(klass.getElementType()instanceof FuStorageType){if(parent>FuPriority.ADD)this.writeChar(40);forEach.collection.accept(this,FuPriority.ADD);this.write(" + ");this.writeCamelCaseNotKeyword(symbol.name);if(parent>FuPriority.ADD)this.writeChar(41);}else this.#writeForeachArrayIndexing(forEach,symbol);return;}}if(symbol instanceof FuField)this.#writeSelfForField(symbol.parent);this.writeName(symbol);}#writeMatchProperty(expr,which){this.#matchPos=true;this.write("FuMatch_GetPos(");expr.left.accept(this,FuPriority.ARGUMENT);this.write(", ");this.visitLiteralLong(BigInt(which));this.writeChar(41);}visitSymbolReference(expr,parent){switch(expr.symbol.id){case FuId.STRING_LENGTH:this.writeStringLength(expr.left);break;case FuId.CONSOLE_ERROR:this.include("stdio.h");this.write("stderr");break;case FuId.LIST_COUNT:case FuId.STACK_COUNT:this.writePostfix(expr.left,"->len");break;case FuId.QUEUE_COUNT:expr.left.accept(this,FuPriority.PRIMARY);if(expr.left.type instanceof FuStorageType)this.writeChar(46);else this.write("->");this.write("length");break;case FuId.HASH_SET_COUNT:case FuId.DICTIONARY_COUNT:this.writeCall("g_hash_table_size",expr.left);break;case FuId.SORTED_SET_COUNT:case FuId.SORTED_DICTIONARY_COUNT:this.writeCall("g_tree_nnodes",expr.left);break;case FuId.MATCH_START:this.#writeMatchProperty(expr,0);break;case FuId.MATCH_END:this.#writeMatchProperty(expr,1);break;case FuId.MATCH_LENGTH:this.#writeMatchProperty(expr,2);break;case FuId.MATCH_VALUE:this.write("g_match_info_fetch(");expr.left.accept(this,FuPriority.ARGUMENT);this.write(", 0)");break;default:if(expr.left==null||expr.symbol instanceof FuConst)this.writeLocalName(expr.symbol,parent);else if(GenC.#isDictionaryClassStgIndexing(expr.left)){this.writePostfix(expr.left,"->");this.writeName(expr.symbol);}else {let symbol;let forEach;let array;if((symbol=expr.left)instanceof FuSymbolReference&&(forEach=symbol.symbol.parent)instanceof FuForeach&&(array=forEach.collection.type)instanceof FuArrayStorageType){this.#writeForeachArrayIndexing(forEach,symbol.symbol);this.#writeMemberAccess(array.getElementType(),expr.symbol.parent);this.writeName(expr.symbol);}else super.visitSymbolReference(expr,parent);}break;}}#writeGlib(s){this.include("glib.h");this.write(s);}writeStringPtrType(){this.write("const char *");}writeClassType(klass,space){switch(klass.class.id){case FuId.NONE:if(!(klass instanceof FuReadWriteClassType))this.write("const ");this.writeName(klass.class);if(!(klass instanceof FuStorageType))this.write(" *");else if(space)this.writeChar(32);break;case FuId.STRING_CLASS:if(klass.id==FuId.STRING_STORAGE_TYPE)this.write("char *");else this.writeStringPtrType();break;case FuId.LIST_CLASS:case FuId.STACK_CLASS:this.#writeGlib("GArray *");break;case FuId.QUEUE_CLASS:this.#writeGlib("GQueue ");if(!(klass instanceof FuStorageType))this.writeChar(42);break;case FuId.HASH_SET_CLASS:case FuId.DICTIONARY_CLASS:this.#writeGlib("GHashTable *");break;case FuId.SORTED_SET_CLASS:case FuId.SORTED_DICTIONARY_CLASS:this.#writeGlib("GTree *");break;case FuId.TEXT_WRITER_CLASS:this.include("stdio.h");this.write("FILE *");break;case FuId.REGEX_CLASS:if(!(klass instanceof FuReadWriteClassType))this.write("const ");this.#writeGlib("GRegex *");break;case FuId.MATCH_CLASS:if(!(klass instanceof FuReadWriteClassType))this.write("const ");this.#writeGlib("GMatchInfo *");break;case FuId.LOCK_CLASS:this.notYet(klass,"Lock");this.include("threads.h");this.write("mtx_t ");break;default:this.notSupported(klass,klass.class.name);break;}}#writeArrayPrefix(type){let array;if((array=type)instanceof FuClassType&&array.isArray()){this.#writeArrayPrefix(array.getElementType());if(!(type instanceof FuArrayStorageType)){if(array.getElementType()instanceof FuArrayStorageType)this.writeChar(40);if(!(type instanceof FuReadWriteClassType))this.write("const ");this.writeChar(42);}}}#startDefinition(type,promote,space){let baseType=type.getBaseType();if(baseType instanceof FuIntegerType){this.writeNumericType(this.getTypeId(baseType,promote&&type==baseType));if(space)this.writeChar(32);}else if(baseType instanceof FuEnum){if(baseType.id==FuId.BOOL_TYPE){this.includeStdBool();this.write("bool");}else this.writeName(baseType);if(space)this.writeChar(32);}else if(baseType instanceof FuClassType){const klass=baseType;this.writeClassType(klass,space);}else {this.write(baseType.name);if(space)this.writeChar(32);}this.#writeArrayPrefix(type);}#endDefinition(type){while(type.isArray()){let elementType=type.asClassType().getElementType();let arrayStorage;if((arrayStorage=type)instanceof FuArrayStorageType){this.writeChar(91);this.visitLiteralLong(BigInt(arrayStorage.length));this.writeChar(93);}else if(elementType instanceof FuArrayStorageType)this.writeChar(41);type=elementType;}}#writeReturnType(method){if(method.type.id==FuId.VOID_TYPE&&method.throws){this.includeStdBool();this.write("bool ");}else this.#startDefinition(method.type,true,true);}writeType(type,promote){let arrayPtr;this.#startDefinition(type,promote,(arrayPtr=type)instanceof FuClassType&&arrayPtr.class.id==FuId.ARRAY_PTR_CLASS);this.#endDefinition(type);}writeTypeAndName(value){this.#startDefinition(value.type,true,true);this.writeName(value);this.#endDefinition(value.type);}#writeDynamicArrayCast(elementType){this.writeChar(40);this.#startDefinition(elementType,false,true);this.write(elementType.isArray()?"(*)":"*");this.#endDefinition(elementType);this.write(") ");}#writeXstructorPtr(need,klass,name){if(need){this.write("(FuMethodPtr) ");this.writeName(klass);this.writeChar(95);this.write(name);}else this.write("NULL");}static#isHeapAllocated(type){return type.id==FuId.STRING_STORAGE_TYPE||type instanceof FuDynamicPtrType;}static#needToDestructType(type){if(GenC.#isHeapAllocated(type))return true;let storage;if((storage=type)instanceof FuStorageType){switch(storage.class.id){case FuId.LIST_CLASS:case FuId.STACK_CLASS:case FuId.HASH_SET_CLASS:case FuId.SORTED_SET_CLASS:case FuId.DICTIONARY_CLASS:case FuId.SORTED_DICTIONARY_CLASS:case FuId.MATCH_CLASS:case FuId.LOCK_CLASS:return true;default:return GenC.#needsDestructor(storage.class);}}return false;}static#needToDestruct(symbol){let type=symbol.type;let array;while((array=type)instanceof FuArrayStorageType)type=array.getElementType();return GenC.#needToDestructType(type);}static#needsDestructor(klass){for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let field;if((field=symbol)instanceof FuField&&GenC.#needToDestruct(field))return true;}let baseClass;return (baseClass=klass.parent)instanceof FuClass&&GenC.#needsDestructor(baseClass);}#writeXstructorPtrs(klass){this.#writeXstructorPtr(this.needsConstructor(klass),klass,"Construct");this.write(", ");this.#writeXstructorPtr(GenC.#needsDestructor(klass),klass,"Destruct");}writeNewArray(elementType,lengthExpr,parent){this.#sharedMake=true;if(parent>FuPriority.MUL)this.writeChar(40);this.#writeDynamicArrayCast(elementType);this.write("FuShared_Make(");lengthExpr.accept(this,FuPriority.ARGUMENT);this.write(", sizeof(");this.writeType(elementType,false);this.write("), ");if(elementType instanceof FuStringStorageType){this.#ptrConstruct=true;this.#listFrees["String"]="free(*(void **) ptr)";this.write("(FuMethodPtr) FuPtr_Construct, FuList_FreeString");}else if(elementType instanceof FuStorageType){const storage=elementType;this.#writeXstructorPtrs(storage.class);}else if(elementType instanceof FuDynamicPtrType){this.#ptrConstruct=true;this.#sharedRelease=true;this.#listFrees["Shared"]="FuShared_Release(*(void **) ptr)";this.write("(FuMethodPtr) FuPtr_Construct, FuList_FreeShared");}else this.write("NULL, NULL");this.writeChar(41);if(parent>FuPriority.MUL)this.writeChar(41);}static#isNewString(expr){let binary;let call;let symbol;return expr instanceof FuInterpolatedString||(binary=expr)instanceof FuBinaryExpr&&binary.op==FuToken.PLUS&&binary.type.id==FuId.STRING_STORAGE_TYPE||(call=expr)instanceof FuCallExpr&&expr.type.id==FuId.STRING_STORAGE_TYPE&&(call.method.symbol.id!=FuId.STRING_SUBSTRING||call.arguments.length==2)||(symbol=expr)instanceof FuSymbolReference&&symbol.symbol.id==FuId.MATCH_VALUE;}#writeStringStorageValue(expr){let call=GenC.isStringSubstring(expr);if(call!=null){this.include("string.h");this.#stringSubstring=true;this.write("FuString_Substring(");this.#writeStringPtrAddCast(call);this.write(", ");GenC.getStringSubstringLength(call).accept(this,FuPriority.ARGUMENT);this.writeChar(41);}else if(GenC.#isNewString(expr))expr.accept(this,FuPriority.ARGUMENT);else {this.include("string.h");this.writeCall("strdup",expr);}}writeArrayStorageInit(array,value){let literal;if(value==null){if(GenC.#isHeapAllocated(array.getStorageType()))this.write(" = { NULL }");}else if((literal=value)instanceof FuLiteral&&literal.isDefaultValue()){this.write(" = { ");literal.accept(this,FuPriority.ARGUMENT);this.write(" }");}else throw new Error();}#getDictionaryDestroy(type){if(type instanceof FuStringStorageType||type instanceof FuArrayStorageType)return "free";else if(type instanceof FuStorageType){const storage=type;switch(storage.class.id){case FuId.LIST_CLASS:case FuId.STACK_CLASS:return "(GDestroyNotify) g_array_unref";case FuId.HASH_SET_CLASS:case FuId.DICTIONARY_CLASS:return "(GDestroyNotify) g_hash_table_unref";case FuId.SORTED_SET_CLASS:case FuId.SORTED_DICTIONARY_CLASS:return "(GDestroyNotify) g_tree_unref";default:return GenC.#needsDestructor(storage.class)?`(GDestroyNotify) ${storage.class.name}_Delete`:"free";}}else if(type instanceof FuDynamicPtrType){this.#sharedRelease=true;return "FuShared_Release";}else return "NULL";}#writeHashEqual(keyType){this.write(keyType instanceof FuStringType?"g_str_hash, g_str_equal":"NULL, NULL");}#writeNewHashTable(keyType,valueDestroy){this.write("g_hash_table_new");let keyDestroy=this.#getDictionaryDestroy(keyType);if(keyDestroy=="NULL"&&valueDestroy=="NULL"){this.writeChar(40);this.#writeHashEqual(keyType);}else {this.write("_full(");this.#writeHashEqual(keyType);this.write(", ");this.write(keyDestroy);this.write(", ");this.write(valueDestroy);}this.writeChar(41);}#writeNewTree(keyType,valueDestroy){if(keyType.id==FuId.STRING_PTR_TYPE&&valueDestroy=="NULL")this.write("g_tree_new((GCompareFunc) strcmp");else {this.write("g_tree_new_full(FuTree_Compare");if(keyType instanceof FuIntegerType){this.#treeCompareInteger=true;this.write("Integer");}else if(keyType instanceof FuStringType){this.#treeCompareString=true;this.write("String");}else this.notSupported(keyType,keyType.toString());this.write(", NULL, ");this.write(this.#getDictionaryDestroy(keyType));this.write(", ");this.write(valueDestroy);}this.writeChar(41);}writeNew(klass,parent){switch(klass.class.id){case FuId.LIST_CLASS:case FuId.STACK_CLASS:this.write("g_array_new(FALSE, FALSE, sizeof(");this.writeType(klass.getElementType(),false);this.write("))");break;case FuId.QUEUE_CLASS:this.write("G_QUEUE_INIT");break;case FuId.HASH_SET_CLASS:this.#writeNewHashTable(klass.getElementType(),"NULL");break;case FuId.SORTED_SET_CLASS:this.#writeNewTree(klass.getElementType(),"NULL");break;case FuId.DICTIONARY_CLASS:this.#writeNewHashTable(klass.getKeyType(),this.#getDictionaryDestroy(klass.getValueType()));break;case FuId.SORTED_DICTIONARY_CLASS:this.#writeNewTree(klass.getKeyType(),this.#getDictionaryDestroy(klass.getValueType()));break;default:this.#sharedMake=true;if(parent>FuPriority.MUL)this.writeChar(40);this.writeStaticCastType(klass);this.write("FuShared_Make(1, sizeof(");this.writeName(klass.class);this.write("), ");this.#writeXstructorPtrs(klass.class);this.writeChar(41);if(parent>FuPriority.MUL)this.writeChar(41);break;}}writeStorageInit(def){if(def.type.asClassType().class.typeParameterCount>0)super.writeStorageInit(def);}writeVarInit(def){if(def.value==null&&GenC.#isHeapAllocated(def.type))this.write(" = NULL");else super.writeVarInit(def);}#writeAssignTemporary(type,expr){this.write(" = ");if(expr!=null)this.writeCoerced(type,expr,FuPriority.ARGUMENT);else this.writeNewStorage(type);}#writeCTemporary(type,expr){this.ensureChildBlock();let klass;let assign=expr!=null||(klass=type)instanceof FuClassType&&(klass.class.id==FuId.LIST_CLASS||klass.class.id==FuId.DICTIONARY_CLASS||klass.class.id==FuId.SORTED_DICTIONARY_CLASS);let id=this.currentTemporaries.indexOf(type);if(id<0){id=this.currentTemporaries.length;this.#startDefinition(type,false,true);this.write("futemp");this.visitLiteralLong(BigInt(id));this.#endDefinition(type);if(assign)this.#writeAssignTemporary(type,expr);this.writeCharLine(59);this.currentTemporaries.push(expr);}else if(assign){this.write("futemp");this.visitLiteralLong(BigInt(id));this.#writeAssignTemporary(type,expr);this.writeCharLine(59);this.currentTemporaries[id]=expr;}return id;}#writeStorageTemporary(expr){if(GenC.#isNewString(expr)||expr instanceof FuCallExpr&&expr.type instanceof FuStorageType)this.#writeCTemporary(expr.type,expr);}#writeCTemporaries(expr){if(expr instanceof FuVar){const def=expr;if(def.value!=null)this.#writeCTemporaries(def.value);}else if(expr instanceof FuAggregateInitializer){const init=expr;for(const item of init.items){const assign=item;this.#writeCTemporaries(assign.right);}}else if(expr instanceof FuLiteral||expr instanceof FuLambdaExpr);else if(expr instanceof FuInterpolatedString){const interp=expr;for(const part of interp.parts)this.#writeCTemporaries(part.argument);}else if(expr instanceof FuSymbolReference){const symbol=expr;if(symbol.left!=null)this.#writeCTemporaries(symbol.left);}else if(expr instanceof FuUnaryExpr){const unary=expr;if(unary.inner!=null)this.#writeCTemporaries(unary.inner);}else if(expr instanceof FuBinaryExpr){const binary=expr;this.#writeCTemporaries(binary.left);if(GenC.isStringSubstring(binary.left)==null)this.#writeStorageTemporary(binary.left);this.#writeCTemporaries(binary.right);if(binary.op!=FuToken.ASSIGN)this.#writeStorageTemporary(binary.right);}else if(expr instanceof FuSelectExpr){const select=expr;this.#writeCTemporaries(select.cond);}else if(expr instanceof FuCallExpr){const call=expr;if(call.method.left!=null){this.#writeCTemporaries(call.method.left);this.#writeStorageTemporary(call.method.left);}const method=call.method.symbol;let param=method.parameters.firstParameter();for(const arg of call.arguments){this.#writeCTemporaries(arg);if(call.method.symbol.id!=FuId.CONSOLE_WRITE&&call.method.symbol.id!=FuId.CONSOLE_WRITE_LINE&&!(param.type instanceof FuStorageType))this.#writeStorageTemporary(arg);param=param.nextParameter();}}else throw new Error();}static#hasTemporariesToDestruct(expr){return GenC.#containsTemporariesToDestruct(expr)||GenC.#isNewString(expr);}static#containsTemporariesToDestruct(expr){if(expr instanceof FuAggregateInitializer){const init=expr;return init.items.some(field=>GenC.#hasTemporariesToDestruct(field));}else if(expr instanceof FuLiteral||expr instanceof FuLambdaExpr)return false;else if(expr instanceof FuInterpolatedString){const interp=expr;return interp.parts.some(part=>GenC.#hasTemporariesToDestruct(part.argument));}else if(expr instanceof FuSymbolReference){const symbol=expr;return symbol.left!=null&&GenC.#hasTemporariesToDestruct(symbol.left);}else if(expr instanceof FuUnaryExpr){const unary=expr;return unary.inner!=null&&GenC.#containsTemporariesToDestruct(unary.inner);}else if(expr instanceof FuBinaryExpr){const binary=expr;return GenC.#hasTemporariesToDestruct(binary.left)||binary.op!=FuToken.IS&&GenC.#hasTemporariesToDestruct(binary.right);}else if(expr instanceof FuSelectExpr){const select=expr;return GenC.#containsTemporariesToDestruct(select.cond);}else if(expr instanceof FuCallExpr){const call=expr;return call.method.left!=null&&GenC.#hasTemporariesToDestruct(call.method.left)||call.arguments.some(arg=>GenC.#hasTemporariesToDestruct(arg));}else throw new Error();}cleanupTemporary(i,temp){if(temp.type.id==FuId.STRING_STORAGE_TYPE){this.write("free(futemp");this.visitLiteralLong(BigInt(i));this.writeLine(");");}}writeVar(def){super.writeVar(def);if(GenC.#needToDestruct(def)){const local=def;this.#varsToDestruct.push(local);}}#writeGPointerCast(type,expr){if(type instanceof FuNumericType||type instanceof FuEnum){this.write("GINT_TO_POINTER(");expr.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}else if(type.id==FuId.STRING_PTR_TYPE&&expr.type.id==FuId.STRING_PTR_TYPE){this.write("(gpointer) ");expr.accept(this,FuPriority.PRIMARY);}else this.writeCoerced(type,expr,FuPriority.ARGUMENT);}#writeGConstPointerCast(expr){if(expr.type instanceof FuClassType&&!(expr.type instanceof FuStorageType))expr.accept(this,FuPriority.ARGUMENT);else {this.write("(gconstpointer) ");expr.accept(this,FuPriority.PRIMARY);}}#writeQueueObject(obj){if(obj.type instanceof FuStorageType){this.writeChar(38);obj.accept(this,FuPriority.PRIMARY);}else obj.accept(this,FuPriority.ARGUMENT);}#writeQueueGet(function_,obj,parent){let elementType=obj.type.asClassType().getElementType();let parenthesis;if(parent==FuPriority.STATEMENT)parenthesis=false;else if(elementType instanceof FuIntegerType&&elementType.id!=FuId.LONG_TYPE){this.write("GPOINTER_TO_INT(");parenthesis=true;}else {parenthesis=parent>FuPriority.MUL;if(parenthesis)this.writeChar(40);this.writeStaticCastType(elementType);}this.write(function_);this.writeChar(40);this.#writeQueueObject(obj);this.writeChar(41);if(parenthesis)this.writeChar(41);}#startDictionaryInsert(dict,key){const type=dict.type;this.write(type.class.id==FuId.SORTED_DICTIONARY_CLASS?"g_tree_insert(":"g_hash_table_insert(");dict.accept(this,FuPriority.ARGUMENT);this.write(", ");this.#writeGPointerCast(type.getKeyType(),key);this.write(", ");}writeAssign(expr,parent){let indexing;let dict;if((indexing=expr.left)instanceof FuBinaryExpr&&indexing.op==FuToken.LEFT_BRACKET&&(dict=indexing.left.type)instanceof FuClassType&&dict.class.typeParameterCount==2){this.#startDictionaryInsert(indexing.left,indexing.right);this.#writeGPointerCast(dict.getValueType(),expr.right);this.writeChar(41);}else if(expr.left.type.id==FuId.STRING_STORAGE_TYPE){let length=GenC.isTrimSubstring(expr);if(length!=null&&parent==FuPriority.STATEMENT){this.writeIndexing(expr.left,length);this.write(" = '\\0'");}else {this.#stringAssign=true;this.write("FuString_Assign(&");expr.left.accept(this,FuPriority.PRIMARY);this.write(", ");this.#writeStringStorageValue(expr.right);this.writeChar(41);}}else {let dynamic;if((dynamic=expr.left.type)instanceof FuDynamicPtrType){if(dynamic.class.id==FuId.REGEX_CLASS){super.writeAssign(expr,parent);}else {this.#sharedAssign=true;this.write("FuShared_Assign((void **) &");expr.left.accept(this,FuPriority.PRIMARY);this.write(", ");if(expr.right instanceof FuSymbolReference){this.#sharedAddRef=true;this.write("FuShared_AddRef(");expr.right.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}else expr.right.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}}else super.writeAssign(expr,parent);}}static#getThrowingMethod(expr){let binary;if((binary=expr)instanceof FuBinaryExpr&&binary.op==FuToken.ASSIGN)return GenC.#getThrowingMethod(binary.right);else if(expr instanceof FuCallExpr){const call=expr;const method=call.method.symbol;return method.throws?method:null;}else return null;}static#hasListDestroy(type){let list;return (list=type)instanceof FuStorageType&&(list.class.id==FuId.LIST_CLASS||list.class.id==FuId.STACK_CLASS)&&GenC.#needToDestructType(list.getElementType());}hasInitCode(def){if(def.isAssignableStorage())return false;let klass;let storage;return def instanceof FuField&&(def.value!=null||GenC.#isHeapAllocated(def.type.getStorageType())||(klass=def.type)instanceof FuClassType&&(klass.class.id==FuId.LIST_CLASS||klass.class.id==FuId.DICTIONARY_CLASS||klass.class.id==FuId.SORTED_DICTIONARY_CLASS))||GenC.#getThrowingMethod(def.value)!=null||(storage=def.type.getStorageType())instanceof FuStorageType&&(storage.class.id==FuId.LOCK_CLASS||this.needsConstructor(storage.class))||GenC.#hasListDestroy(def.type)||super.hasInitCode(def);}#startForwardThrow(throwingMethod){this.write("if (");switch(throwingMethod.type.id){case FuId.FLOAT_TYPE:case FuId.DOUBLE_TYPE:this.includeMath();this.write("isnan(");return FuPriority.ARGUMENT;case FuId.VOID_TYPE:this.writeChar(33);return FuPriority.PRIMARY;default:return FuPriority.EQUALITY;}}#writeDestruct(symbol){if(!GenC.#needToDestruct(symbol))return;this.ensureChildBlock();let type=symbol.type;let nesting=0;let array;while((array=type)instanceof FuArrayStorageType){this.write("for (int _i");this.visitLiteralLong(BigInt(nesting));this.write(" = ");this.visitLiteralLong(BigInt(array.length-1));this.write("; _i");this.visitLiteralLong(BigInt(nesting));this.write(" >= 0; _i");this.visitLiteralLong(BigInt(nesting));this.writeLine("--)");this.indent++;nesting++;type=array.getElementType();}let arrayFree=false;if(type instanceof FuDynamicPtrType){const dynamic=type;if(dynamic.class.id==FuId.REGEX_CLASS)this.write("g_regex_unref(");else {this.#sharedRelease=true;this.write("FuShared_Release(");}}else if(type instanceof FuStorageType){const storage=type;switch(storage.class.id){case FuId.LIST_CLASS:case FuId.STACK_CLASS:this.write("g_array_free(");arrayFree=true;break;case FuId.QUEUE_CLASS:this.write("g_queue_clear(&");break;case FuId.HASH_SET_CLASS:case FuId.DICTIONARY_CLASS:this.write("g_hash_table_unref(");break;case FuId.SORTED_SET_CLASS:case FuId.SORTED_DICTIONARY_CLASS:this.write("g_tree_unref(");break;case FuId.MATCH_CLASS:this.write("g_match_info_free(");break;case FuId.LOCK_CLASS:this.write("mtx_destroy(&");break;default:this.writeName(storage.class);this.write("_Destruct(&");break;}}else this.write("free(");this.writeLocalName(symbol,FuPriority.PRIMARY);for(let i=0;i<nesting;i++){this.write("[_i");this.visitLiteralLong(BigInt(i));this.writeChar(93);}if(arrayFree)this.write(", TRUE");this.writeLine(");");this.indent-=nesting;}#writeDestructAll(exceptVar=null){for(let i=this.#varsToDestruct.length;--i>=0;){let def=this.#varsToDestruct[i];if(def!=exceptVar)this.#writeDestruct(def);}}#writeThrowReturnValue(){if(this.currentMethod.type instanceof FuNumericType){if(this.currentMethod.type instanceof FuIntegerType)this.write("-1");else {this.includeMath();this.write("NAN");}}else if(this.currentMethod.type.id==FuId.VOID_TYPE)this.write("false");else this.write("NULL");}#writeThrow(){this.#writeDestructAll();this.write("return ");this.#writeThrowReturnValue();this.writeCharLine(59);}#endForwardThrow(throwingMethod){switch(throwingMethod.type.id){case FuId.FLOAT_TYPE:case FuId.DOUBLE_TYPE:this.writeChar(41);break;case FuId.VOID_TYPE:break;default:this.write(throwingMethod.type instanceof FuIntegerType?" == -1":" == NULL");break;}this.writeChar(41);if(this.#varsToDestruct.length>0){this.writeChar(32);this.openBlock();this.#writeThrow();this.closeBlock();}else {this.writeNewLine();this.indent++;this.#writeThrow();this.indent--;}}writeInitCode(def){if(!this.hasInitCode(def))return;let type=def.type;let nesting=0;let array;while((array=type)instanceof FuArrayStorageType){this.openLoop("int",nesting++,array.length);type=array.getElementType();}let lok;if((lok=type)instanceof FuStorageType&&lok.class.id==FuId.LOCK_CLASS){this.write("mtx_init(&");this.writeArrayElement(def,nesting);this.writeLine(", mtx_plain | mtx_recursive);");}else {let storage;if((storage=type)instanceof FuStorageType&&this.needsConstructor(storage.class)){this.writeName(storage.class);this.write("_Construct(&");this.writeArrayElement(def,nesting);this.writeLine(");");}else {if(def instanceof FuField){this.writeArrayElement(def,nesting);if(nesting>0){this.write(" = ");if(GenC.#isHeapAllocated(type))this.write("NULL");else def.value.accept(this,FuPriority.ARGUMENT);}else this.writeVarInit(def);this.writeCharLine(59);}let throwingMethod=GenC.#getThrowingMethod(def.value);if(throwingMethod!=null){this.#startForwardThrow(throwingMethod);this.writeArrayElement(def,nesting);this.#endForwardThrow(throwingMethod);}}}if(GenC.#hasListDestroy(type)){this.write("g_array_set_clear_func(");this.writeArrayElement(def,nesting);this.write(", ");if(type.asClassType().getElementType()instanceof FuStringStorageType){this.#listFrees["String"]="free(*(void **) ptr)";this.write("FuList_FreeString");}else if(type.asClassType().getElementType()instanceof FuDynamicPtrType){this.#sharedRelease=true;this.#listFrees["Shared"]="FuShared_Release(*(void **) ptr)";this.write("FuList_FreeShared");}else if(type.asClassType().getElementType()instanceof FuStorageType){const storage=type.asClassType().getElementType();switch(storage.class.id){case FuId.LIST_CLASS:case FuId.STACK_CLASS:this.#listFrees["List"]="g_array_free(*(GArray **) ptr, TRUE)";this.write("FuList_FreeList");break;case FuId.HASH_SET_CLASS:case FuId.DICTIONARY_CLASS:this.#listFrees["HashTable"]="g_hash_table_unref(*(GHashTable **) ptr)";this.write("FuList_FreeHashTable");break;case FuId.SORTED_SET_CLASS:case FuId.SORTED_DICTIONARY_CLASS:this.#listFrees["Tree"]="g_tree_unref(*(GTree **) ptr)";this.write("FuList_FreeTree");break;default:this.write("(GDestroyNotify) ");this.writeName(storage.class);this.write("_Destruct");break;}}else throw new Error();this.writeLine(");");}while(--nesting>=0)this.closeBlock();super.writeInitCode(def);}#writeMemberAccess(leftType,symbolClass){if(leftType instanceof FuStorageType)this.writeChar(46);else this.write("->");for(let klass=leftType.asClassType().class;klass!=symbolClass;klass=klass.parent)this.write("base.");}writeMemberOp(left,symbol){this.#writeMemberAccess(left.type,symbol.symbol.parent);}writeArrayPtr(expr,parent){let list;if((list=expr.type)instanceof FuClassType&&list.class.id==FuId.LIST_CLASS){this.writeChar(40);this.writeType(list.getElementType(),false);this.write(" *) ");this.writePostfix(expr,"->data");}else expr.accept(this,parent);}writeCoercedInternal(type,expr,parent){let dynamic;let klass;if((dynamic=type)instanceof FuDynamicPtrType&&expr instanceof FuSymbolReference&&parent!=FuPriority.EQUALITY){this.#sharedAddRef=true;if(dynamic.class.id==FuId.ARRAY_PTR_CLASS)this.#writeDynamicArrayCast(dynamic.getElementType());else {this.writeChar(40);this.writeName(dynamic.class);this.write(" *) ");}this.writeCall("FuShared_AddRef",expr);}else if((klass=type)instanceof FuClassType&&klass.class.id!=FuId.STRING_CLASS&&klass.class.id!=FuId.ARRAY_PTR_CLASS&&!(klass instanceof FuStorageType)){if(klass.class.id==FuId.QUEUE_CLASS&&expr.type instanceof FuStorageType){this.writeChar(38);expr.accept(this,FuPriority.PRIMARY);}else this.#writeClassPtr(klass.class,expr,parent);}else {if(type.id==FuId.STRING_STORAGE_TYPE)this.#writeStringStorageValue(expr);else if(expr.type.id==FuId.STRING_STORAGE_TYPE)this.#writeTemporaryOrExpr(expr,parent);else super.writeCoercedInternal(type,expr,parent);}}writeSubstringEqual(call,literal,parent,not){if(parent>FuPriority.EQUALITY)this.writeChar(40);this.include("string.h");this.write("memcmp(");this.writeStringPtrAdd(call);this.write(", ");this.visitLiteralString(literal);this.write(", ");this.visitLiteralLong(BigInt(literal.length));this.writeChar(41);this.write(GenC.getEqOp(not));this.writeChar(48);if(parent>FuPriority.EQUALITY)this.writeChar(41);}writeEqualStringInternal(left,right,parent,not){if(parent>FuPriority.EQUALITY)this.writeChar(40);this.include("string.h");this.write("strcmp(");this.#writeTemporaryOrExpr(left,FuPriority.ARGUMENT);this.write(", ");this.#writeTemporaryOrExpr(right,FuPriority.ARGUMENT);this.writeChar(41);this.write(GenC.getEqOp(not));this.writeChar(48);if(parent>FuPriority.EQUALITY)this.writeChar(41);}writeEqual(left,right,parent,not){if(left.type instanceof FuStringType&&right.type instanceof FuStringType){let call=GenC.isStringSubstring(left);let literal;if(call!=null&&(literal=right)instanceof FuLiteralString){let lengthExpr=GenC.getStringSubstringLength(call);let rightLength=literal.getAsciiLength();if(rightLength>=0){let rightValue=literal.value;let leftLength;if((leftLength=lengthExpr)instanceof FuLiteralLong){if(leftLength.value!=rightLength)this.notYet(left,"String comparison with unmatched length");this.writeSubstringEqual(call,rightValue,parent,not);}else if(not){if(parent>FuPriority.COND_OR)this.writeChar(40);lengthExpr.accept(this,FuPriority.EQUALITY);this.write(" != ");this.visitLiteralLong(BigInt(rightLength));if(rightLength>0){this.write(" || ");this.writeSubstringEqual(call,rightValue,FuPriority.COND_OR,true);}if(parent>FuPriority.COND_OR)this.writeChar(41);}else {if(parent>FuPriority.COND_AND||parent==FuPriority.COND_OR)this.writeChar(40);lengthExpr.accept(this,FuPriority.EQUALITY);this.write(" == ");this.visitLiteralLong(BigInt(rightLength));if(rightLength>0){this.write(" && ");this.writeSubstringEqual(call,rightValue,FuPriority.COND_AND,false);}if(parent>FuPriority.COND_AND||parent==FuPriority.COND_OR)this.writeChar(41);}return;}}this.writeEqualStringInternal(left,right,parent,not);}else super.writeEqual(left,right,parent,not);}writeStringLength(expr){this.include("string.h");this.writeCall("(int) strlen",expr);}#writeStringMethod(name,obj,args){this.include("string.h");this.write("FuString_");this.writeCall(name,obj,args[0]);}#writeSizeofCompare(elementType){this.write(", sizeof(");let typeId=elementType.id;this.writeNumericType(typeId);this.write("), FuCompare_");this.writeNumericType(typeId);this.writeChar(41);this.#compares.add(typeId);}writeArrayFill(obj,args){this.write("for (int _i = 0; _i < ");if(args.length==1)this.writeArrayStorageLength(obj);else args[2].accept(this,FuPriority.REL);this.writeLine("; _i++)");this.writeChar(9);obj.accept(this,FuPriority.PRIMARY);this.writeChar(91);if(args.length>1)this.startAdd(args[1]);this.write("_i] = ");args[0].accept(this,FuPriority.ARGUMENT);}#writeListAddInsert(obj,insert,function_,args){let elementType=obj.type.asClassType().getElementType();let id=this.#writeCTemporary(elementType,elementType.isFinal()?null:args.at(-1));let storage;if((storage=elementType)instanceof FuStorageType&&this.needsConstructor(storage.class)){this.writeName(storage.class);this.write("_Construct(&futemp");this.visitLiteralLong(BigInt(id));this.writeLine(");");}this.write(function_);this.writeChar(40);obj.accept(this,FuPriority.ARGUMENT);if(insert){this.write(", ");args[0].accept(this,FuPriority.ARGUMENT);}this.write(", futemp");this.visitLiteralLong(BigInt(id));this.writeChar(41);this.currentTemporaries[id]=elementType;}#writeDictionaryLookup(obj,function_,key){this.write(function_);this.writeChar(40);obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.#writeGConstPointerCast(key);this.writeChar(41);}#writeArgsAndRightParenthesis(method,args){let i=0;for(let param=method.parameters.firstParameter();param!=null;param=param.nextParameter()){if(i>0||method.callType!=FuCallType.STATIC)this.write(", ");if(i>=args.length)param.value.accept(this,FuPriority.ARGUMENT);else this.writeCoerced(param.type,args[i],FuPriority.ARGUMENT);i++;}this.writeChar(41);}#writeCRegexOptions(args){if(!this.writeRegexOptions(args,""," | ","","G_REGEX_CASELESS","G_REGEX_MULTILINE","G_REGEX_DOTALL"))this.writeChar(48);}writePrintfNotInterpolated(args,newLine){this.write("\"%");if(args[0].type instanceof FuIntegerType){const intType=args[0].type;if(intType.id==FuId.LONG_TYPE)this.writePrintfLongPrefix();this.writeChar(100);}else if(args[0].type instanceof FuFloatingType)this.writeChar(103);else this.writeChar(115);if(newLine)this.write("\\n");this.write("\", ");this.writeInterpolatedStringArgBase(args[0]);this.writeChar(41);}#writeTextWriterWrite(obj,args,newLine){if(args.length==0){this.write("putc('\\n', ");obj.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}else {let interpolated;if((interpolated=args[0])instanceof FuInterpolatedString){this.write("fprintf(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.writePrintf(interpolated,newLine);}else if(args[0].type instanceof FuNumericType){this.write("fprintf(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.writePrintfNotInterpolated(args,newLine);}else if(!newLine){this.write("fputs(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", ");obj.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}else {let literal;if((literal=args[0])instanceof FuLiteralString){this.write("fputs(");this.writeStringLiteralWithNewLine(literal.value);this.write(", ");obj.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}else {this.write("fprintf(");obj.accept(this,FuPriority.ARGUMENT);this.write(", \"%s\\n\", ");args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(41);}}}}#writeConsoleWrite(args,newLine){this.include("stdio.h");if(args.length==0)this.write("putchar('\\n')");else {let interpolated;if((interpolated=args[0])instanceof FuInterpolatedString){this.write("printf(");this.writePrintf(interpolated,newLine);}else if(args[0].type instanceof FuNumericType){this.write("printf(");this.writePrintfNotInterpolated(args,newLine);}else if(!newLine){this.write("fputs(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", stdout)");}else this.writeCall("puts",args[0]);}}static#getVtblStructClass(klass){while(!klass.addsVirtualMethods()){const baseClass=klass.parent;klass=baseClass;}return klass;}static#getVtblPtrClass(klass){for(let result=null;;){if(klass.addsVirtualMethods())result=klass;let baseClass;if(!((baseClass=klass.parent)instanceof FuClass))return result;klass=baseClass;}}writeCCall(obj,method,args){let klass=this.currentClass;let declaringClass=method.parent;if(GenC.isReferenceTo(obj,FuId.BASE_PTR)){this.writeName(method);this.write("(&self->base");this.#writeUpcast(declaringClass,klass.parent);}else {let definingClass=declaringClass;switch(method.callType){case FuCallType.ABSTRACT:case FuCallType.VIRTUAL:case FuCallType.OVERRIDE:if(method.callType==FuCallType.OVERRIDE){const declaringClass1=method.getDeclaringMethod().parent;declaringClass=declaringClass1;}if(obj!=null)klass=obj.type.asClassType().class;let ptrClass=GenC.#getVtblPtrClass(klass);let structClass=GenC.#getVtblStructClass(definingClass);if(structClass!=ptrClass){this.write("((const ");this.writeName(structClass);this.write("Vtbl *) ");}if(obj!=null){obj.accept(this,FuPriority.PRIMARY);this.#writeMemberAccess(obj.type,ptrClass);}else this.#writeSelfForField(ptrClass);this.write("vtbl");if(structClass!=ptrClass)this.writeChar(41);this.write("->");this.writeCamelCase(method.name);break;default:this.writeName(method);break;}this.writeChar(40);if(method.callType!=FuCallType.STATIC){if(obj!=null)this.#writeClassPtr(declaringClass,obj,FuPriority.ARGUMENT);else if(klass==declaringClass)this.write("self");else {this.write("&self->base");this.#writeUpcast(declaringClass,klass.parent);}}}this.#writeArgsAndRightParenthesis(method,args);}#writeTryParse(obj,args){this.includeStdBool();this.write("_TryParse(&");obj.accept(this,FuPriority.PRIMARY);this.write(", ");args[0].accept(this,FuPriority.ARGUMENT);if(obj.type instanceof FuIntegerType)this.writeTryParseRadix(args);this.writeChar(41);}writeStringSubstring(obj,args,parent){if(args.length==1){if(parent>FuPriority.ADD)this.writeChar(40);this.writeAdd(obj,args[0]);if(parent>FuPriority.ADD)this.writeChar(41);}else this.notSupported(obj,"Substring");}#startArrayContains(obj){this.write("FuArray_Contains_");let typeId=obj.type.asClassType().getElementType().id;switch(typeId){case FuId.NONE:this.write("object(");break;case FuId.STRING_STORAGE_TYPE:case FuId.STRING_PTR_TYPE:typeId=FuId.STRING_PTR_TYPE;this.include("string.h");this.write("string((const char * const *) ");break;default:this.writeNumericType(typeId);this.write("((const ");this.writeNumericType(typeId);this.write(" *) ");break;}this.#contains.add(typeId);}#startArrayIndexing(obj,elementType){this.write("g_array_index(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeType(elementType,false);this.write(", ");}writeCallExpr(obj,method,args,parent){switch(method.id){case FuId.NONE:case FuId.CLASS_TO_STRING:this.writeCCall(obj,method,args);break;case FuId.ENUM_FROM_INT:this.writeStaticCast(method.type,args[0]);break;case FuId.ENUM_HAS_FLAG:this.writeEnumHasFlag(obj,args,parent);break;case FuId.INT_TRY_PARSE:this.#intTryParse=true;this.write("FuInt");this.#writeTryParse(obj,args);break;case FuId.LONG_TRY_PARSE:this.#longTryParse=true;this.write("FuLong");this.#writeTryParse(obj,args);break;case FuId.DOUBLE_TRY_PARSE:this.#doubleTryParse=true;this.write("FuDouble");this.#writeTryParse(obj,args);break;case FuId.STRING_CONTAINS:this.include("string.h");if(parent>FuPriority.EQUALITY)this.writeChar(40);let c=this.getOneAscii(args[0]);if(c>=0){this.write("strchr(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.visitLiteralChar(c);this.writeChar(41);}else this.writeCall("strstr",obj,args[0]);this.write(" != NULL");if(parent>FuPriority.EQUALITY)this.writeChar(41);break;case FuId.STRING_ENDS_WITH:this.#stringEndsWith=true;this.#writeStringMethod("EndsWith",obj,args);break;case FuId.STRING_INDEX_OF:this.#stringIndexOf=true;this.#writeStringMethod("IndexOf",obj,args);break;case FuId.STRING_LAST_INDEX_OF:this.#stringLastIndexOf=true;this.#writeStringMethod("LastIndexOf",obj,args);break;case FuId.STRING_REPLACE:this.include("string.h");this.#stringAppend=true;this.#stringReplace=true;this.writeCall("FuString_Replace",obj,args[0],args[1]);break;case FuId.STRING_STARTS_WITH:if(parent>FuPriority.EQUALITY)this.writeChar(40);let c2=this.getOneAscii(args[0]);if(c2>=0){this.writePostfix(obj,"[0] == ");this.visitLiteralChar(c2);}else {this.include("string.h");this.write("strncmp(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");args[0].accept(this,FuPriority.ARGUMENT);this.write(", strlen(");args[0].accept(this,FuPriority.ARGUMENT);this.write(")) == 0");}if(parent>FuPriority.EQUALITY)this.writeChar(41);break;case FuId.STRING_SUBSTRING:this.writeStringSubstring(obj,args,parent);break;case FuId.ARRAY_BINARY_SEARCH_ALL:case FuId.ARRAY_BINARY_SEARCH_PART:if(parent>FuPriority.ADD)this.writeChar(40);this.write("(const ");let elementType2=obj.type.asClassType().getElementType();this.writeType(elementType2,false);this.write(" *) bsearch(&");args[0].accept(this,FuPriority.PRIMARY);this.write(", ");if(args.length==1)this.writeArrayPtr(obj,FuPriority.ARGUMENT);else this.writeArrayPtrAdd(obj,args[1]);this.write(", ");if(args.length==1)this.writeArrayStorageLength(obj);else args[2].accept(this,FuPriority.ARGUMENT);this.#writeSizeofCompare(elementType2);this.write(" - ");this.writeArrayPtr(obj,FuPriority.MUL);if(parent>FuPriority.ADD)this.writeChar(41);break;case FuId.ARRAY_CONTAINS:this.#startArrayContains(obj);obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeArrayStorageLength(obj);this.write(", ");args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.ARRAY_COPY_TO:case FuId.LIST_COPY_TO:this.include("string.h");let elementType=obj.type.asClassType().getElementType();if(GenC.#isHeapAllocated(elementType))this.notYet(obj,"CopyTo for this type");this.write("memcpy(");this.writeArrayPtrAdd(args[1],args[2]);this.write(", ");this.writeArrayPtrAdd(obj,args[0]);this.write(", ");if(elementType.id==FuId.S_BYTE_RANGE||elementType.id==FuId.BYTE_RANGE)args[3].accept(this,FuPriority.ARGUMENT);else {args[3].accept(this,FuPriority.MUL);this.write(" * sizeof(");this.writeType(elementType,false);this.writeChar(41);}this.writeChar(41);break;case FuId.ARRAY_FILL_ALL:case FuId.ARRAY_FILL_PART:let literal;if((literal=args[0])instanceof FuLiteral&&literal.isDefaultValue()){this.include("string.h");this.write("memset(");if(args.length==1){obj.accept(this,FuPriority.ARGUMENT);this.write(", 0, sizeof(");obj.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}else {this.writeArrayPtrAdd(obj,args[1]);this.write(", 0, ");args[2].accept(this,FuPriority.MUL);this.write(" * sizeof(");this.writeType(obj.type.asClassType().getElementType(),false);this.writeChar(41);}this.writeChar(41);}else this.writeArrayFill(obj,args);break;case FuId.ARRAY_SORT_ALL:this.write("qsort(");this.writeArrayPtr(obj,FuPriority.ARGUMENT);this.write(", ");this.writeArrayStorageLength(obj);this.#writeSizeofCompare(obj.type.asClassType().getElementType());break;case FuId.ARRAY_SORT_PART:case FuId.LIST_SORT_PART:this.write("qsort(");this.writeArrayPtrAdd(obj,args[0]);this.write(", ");args[1].accept(this,FuPriority.ARGUMENT);this.#writeSizeofCompare(obj.type.asClassType().getElementType());break;case FuId.LIST_ADD:case FuId.STACK_PUSH:let storage;if(obj.type.asClassType().getElementType()instanceof FuArrayStorageType||(storage=obj.type.asClassType().getElementType())instanceof FuStorageType&&storage.class.id==FuId.NONE&&!this.needsConstructor(storage.class)){this.write("g_array_set_size(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.writePostfix(obj,"->len + 1)");}else this.#writeListAddInsert(obj,false,"g_array_append_val",args);break;case FuId.LIST_CLEAR:case FuId.STACK_CLEAR:this.write("g_array_set_size(");obj.accept(this,FuPriority.ARGUMENT);this.write(", 0)");break;case FuId.LIST_CONTAINS:this.#startArrayContains(obj);this.writePostfix(obj,"->data, ");this.writePostfix(obj,"->len, ");args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.LIST_INSERT:this.#writeListAddInsert(obj,true,"g_array_insert_val",args);break;case FuId.LIST_LAST:case FuId.STACK_PEEK:this.#startArrayIndexing(obj,obj.type.asClassType().getElementType());this.writePostfix(obj,"->len - 1)");break;case FuId.LIST_REMOVE_AT:this.writeCall("g_array_remove_index",obj,args[0]);break;case FuId.LIST_REMOVE_RANGE:this.writeCall("g_array_remove_range",obj,args[0],args[1]);break;case FuId.LIST_SORT_ALL:this.write("g_array_sort(");obj.accept(this,FuPriority.ARGUMENT);let typeId2=obj.type.asClassType().getElementType().id;this.write(", FuCompare_");this.writeNumericType(typeId2);this.writeChar(41);this.#compares.add(typeId2);break;case FuId.QUEUE_CLEAR:this.write("g_queue_clear(");this.#writeQueueObject(obj);this.writeChar(41);break;case FuId.QUEUE_DEQUEUE:this.#writeQueueGet("g_queue_pop_head",obj,parent);break;case FuId.QUEUE_ENQUEUE:this.write("g_queue_push_tail(");this.#writeQueueObject(obj);this.write(", ");this.#writeGPointerCast(obj.type.asClassType().getElementType(),args[0]);this.writeChar(41);break;case FuId.QUEUE_PEEK:this.#writeQueueGet("g_queue_peek_head",obj,parent);break;case FuId.STACK_POP:if(parent==FuPriority.STATEMENT)this.writePostfix(obj,"->len--");else {this.#startArrayIndexing(obj,obj.type.asClassType().getElementType());this.write("--");this.writePostfix(obj,"->len)");}break;case FuId.HASH_SET_ADD:this.write("g_hash_table_add(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.#writeGPointerCast(obj.type.asClassType().getElementType(),args[0]);this.writeChar(41);break;case FuId.HASH_SET_CLEAR:case FuId.DICTIONARY_CLEAR:this.writeCall("g_hash_table_remove_all",obj);break;case FuId.HASH_SET_CONTAINS:case FuId.DICTIONARY_CONTAINS_KEY:this.#writeDictionaryLookup(obj,"g_hash_table_contains",args[0]);break;case FuId.HASH_SET_REMOVE:case FuId.DICTIONARY_REMOVE:this.#writeDictionaryLookup(obj,"g_hash_table_remove",args[0]);break;case FuId.SORTED_SET_ADD:this.write("g_tree_insert(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.#writeGPointerCast(obj.type.asClassType().getKeyType(),args[0]);this.write(", NULL)");break;case FuId.DICTIONARY_ADD:this.#startDictionaryInsert(obj,args[0]);let valueType=obj.type.asClassType().getValueType().asClassType();switch(valueType.class.id){case FuId.LIST_CLASS:case FuId.STACK_CLASS:case FuId.DICTIONARY_CLASS:case FuId.SORTED_DICTIONARY_CLASS:this.writeNewStorage(valueType);break;default:if(valueType.class.isPublic&&valueType.class.constructor_!=null&&valueType.class.constructor_.visibility==FuVisibility.PUBLIC){this.writeName(valueType.class);this.write("_New()");}else {this.write("malloc(sizeof(");this.writeType(valueType,false);this.write("))");}break;}this.writeChar(41);break;case FuId.SORTED_SET_CLEAR:case FuId.SORTED_DICTIONARY_CLEAR:this.write("g_tree_destroy(g_tree_ref(");obj.accept(this,FuPriority.ARGUMENT);this.write("))");break;case FuId.SORTED_SET_CONTAINS:case FuId.SORTED_DICTIONARY_CONTAINS_KEY:this.write("g_tree_lookup_extended(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.#writeGConstPointerCast(args[0]);this.write(", NULL, NULL)");break;case FuId.SORTED_SET_REMOVE:case FuId.SORTED_DICTIONARY_REMOVE:this.#writeDictionaryLookup(obj,"g_tree_remove",args[0]);break;case FuId.TEXT_WRITER_WRITE:this.#writeTextWriterWrite(obj,args,false);break;case FuId.TEXT_WRITER_WRITE_CHAR:this.writeCall("putc",args[0],obj);break;case FuId.TEXT_WRITER_WRITE_LINE:this.#writeTextWriterWrite(obj,args,true);break;case FuId.CONSOLE_WRITE:this.#writeConsoleWrite(args,false);break;case FuId.CONSOLE_WRITE_LINE:this.#writeConsoleWrite(args,true);break;case FuId.U_T_F8_GET_BYTE_COUNT:this.writeStringLength(args[0]);break;case FuId.U_T_F8_GET_BYTES:this.include("string.h");this.write("memcpy(");this.writeArrayPtrAdd(args[1],args[2]);this.write(", ");args[0].accept(this,FuPriority.ARGUMENT);this.write(", strlen(");args[0].accept(this,FuPriority.ARGUMENT);this.write("))");break;case FuId.ENVIRONMENT_GET_ENVIRONMENT_VARIABLE:this.writeCall("getenv",args[0]);break;case FuId.REGEX_COMPILE:this.#writeGlib("g_regex_new(");this.#writeTemporaryOrExpr(args[0],FuPriority.ARGUMENT);this.write(", ");this.#writeCRegexOptions(args);this.write(", 0, NULL)");break;case FuId.REGEX_ESCAPE:this.#writeGlib("g_regex_escape_string(");this.#writeTemporaryOrExpr(args[0],FuPriority.ARGUMENT);this.write(", -1)");break;case FuId.REGEX_IS_MATCH_STR:this.#writeGlib("g_regex_match_simple(");this.#writeTemporaryOrExpr(args[1],FuPriority.ARGUMENT);this.write(", ");this.#writeTemporaryOrExpr(args[0],FuPriority.ARGUMENT);this.write(", ");this.#writeCRegexOptions(args);this.write(", 0)");break;case FuId.REGEX_IS_MATCH_REGEX:this.write("g_regex_match(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.#writeTemporaryOrExpr(args[0],FuPriority.ARGUMENT);this.write(", 0, NULL)");break;case FuId.MATCH_FIND_STR:this.#matchFind=true;this.write("FuMatch_Find(&");obj.accept(this,FuPriority.PRIMARY);this.write(", ");this.#writeTemporaryOrExpr(args[0],FuPriority.ARGUMENT);this.write(", ");this.#writeTemporaryOrExpr(args[1],FuPriority.ARGUMENT);this.write(", ");this.#writeCRegexOptions(args);this.writeChar(41);break;case FuId.MATCH_FIND_REGEX:this.write("g_regex_match(");args[1].accept(this,FuPriority.ARGUMENT);this.write(", ");this.#writeTemporaryOrExpr(args[0],FuPriority.ARGUMENT);this.write(", 0, &");obj.accept(this,FuPriority.PRIMARY);this.writeChar(41);break;case FuId.MATCH_GET_CAPTURE:this.writeCall("g_match_info_fetch",obj,args[0]);break;case FuId.MATH_METHOD:case FuId.MATH_IS_FINITE:case FuId.MATH_IS_NA_N:case FuId.MATH_LOG2:this.includeMath();this.writeLowercase(method.name);this.writeArgsInParentheses(method,args);break;case FuId.MATH_ABS:switch(args[0].type.id){case FuId.LONG_TYPE:this.writeCall("llabs",args[0]);break;case FuId.FLOAT_TYPE:this.includeMath();this.writeCall("fabsf",args[0]);break;case FuId.FLOAT_INT_TYPE:case FuId.DOUBLE_TYPE:this.includeMath();this.writeCall("fabs",args[0]);break;default:this.writeCall("abs",args[0]);break;}break;case FuId.MATH_CEILING:this.includeMath();this.writeCall("ceil",args[0]);break;case FuId.MATH_FUSED_MULTIPLY_ADD:this.includeMath();this.writeCall("fma",args[0],args[1],args[2]);break;case FuId.MATH_IS_INFINITY:this.includeMath();this.writeCall("isinf",args[0]);break;case FuId.MATH_MAX_DOUBLE:this.includeMath();this.writeCall("fmax",args[0],args[1]);break;case FuId.MATH_MIN_DOUBLE:this.includeMath();this.writeCall("fmin",args[0],args[1]);break;case FuId.MATH_ROUND:this.includeMath();this.writeCall("round",args[0]);break;case FuId.MATH_TRUNCATE:this.includeMath();this.writeCall("trunc",args[0]);break;default:this.notSupported(obj,method.name);break;}}#writeDictionaryIndexing(function_,expr,parent){let valueType=expr.left.type.asClassType().getValueType();if(valueType instanceof FuIntegerType&&valueType.id!=FuId.LONG_TYPE){this.write("GPOINTER_TO_INT(");this.#writeDictionaryLookup(expr.left,function_,expr.right);this.writeChar(41);}else {if(parent>FuPriority.MUL)this.writeChar(40);let storage;if((storage=valueType)instanceof FuStorageType&&(storage.class.id==FuId.NONE||storage.class.id==FuId.ARRAY_STORAGE_CLASS))this.#writeDynamicArrayCast(valueType);else {this.writeStaticCastType(valueType);if(valueType instanceof FuEnum){console.assert(parent<=FuPriority.MUL,"Should close two parens");this.write("GPOINTER_TO_INT(");}}this.#writeDictionaryLookup(expr.left,function_,expr.right);if(parent>FuPriority.MUL||valueType instanceof FuEnum)this.writeChar(41);}}writeIndexingExpr(expr,parent){let klass;if((klass=expr.left.type)instanceof FuClassType){switch(klass.class.id){case FuId.LIST_CLASS:if(klass.getElementType()instanceof FuArrayStorageType){this.writeChar(40);this.#writeDynamicArrayCast(klass.getElementType());this.writePostfix(expr.left,"->data)[");expr.right.accept(this,FuPriority.ARGUMENT);this.writeChar(93);}else {this.#startArrayIndexing(expr.left,klass.getElementType());expr.right.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}return;case FuId.DICTIONARY_CLASS:this.#writeDictionaryIndexing("g_hash_table_lookup",expr,parent);return;case FuId.SORTED_DICTIONARY_CLASS:this.#writeDictionaryIndexing("g_tree_lookup",expr,parent);return;}}super.writeIndexingExpr(expr,parent);}visitBinaryExpr(expr,parent){switch(expr.op){case FuToken.PLUS:if(expr.type.id==FuId.STRING_STORAGE_TYPE){this.#stringFormat=true;this.include("stdarg.h");this.include("stdio.h");this.write("FuString_Format(\"%s%s\", ");expr.left.accept(this,FuPriority.ARGUMENT);this.write(", ");expr.right.accept(this,FuPriority.ARGUMENT);this.writeChar(41);return;}break;case FuToken.EQUAL:case FuToken.NOT_EQUAL:case FuToken.GREATER:let str=GenC.isStringEmpty(expr);if(str!=null){this.writePostfix(str,expr.op==FuToken.EQUAL?"[0] == '\\0'":"[0] != '\\0'");return;}break;case FuToken.ADD_ASSIGN:if(expr.left.type.id==FuId.STRING_STORAGE_TYPE){let rightInterpolated;if((rightInterpolated=expr.right)instanceof FuInterpolatedString){this.#stringAssign=true;this.write("FuString_Assign(&");expr.left.accept(this,FuPriority.PRIMARY);this.#stringFormat=true;this.include("stdarg.h");this.include("stdio.h");this.write(", FuString_Format(\"%s");this.writePrintfFormat(rightInterpolated);this.write("\", ");expr.left.accept(this,FuPriority.ARGUMENT);this.writeInterpolatedStringArgs(rightInterpolated);this.writeChar(41);}else {this.include("string.h");this.#stringAppend=true;this.write("FuString_Append(&");expr.left.accept(this,FuPriority.PRIMARY);this.write(", ");expr.right.accept(this,FuPriority.ARGUMENT);}this.writeChar(41);return;}break;case FuToken.IS:this.notSupported(expr,"'is' operator");break;}super.visitBinaryExpr(expr,parent);}writeResource(name,length){this.write("FuResource_");this.writeResourceName(name);}visitLambdaExpr(expr){this.notSupported(expr,"Lambda expression");}#writeDestructLoopOrSwitch(loopOrSwitch){for(let i=this.#varsToDestruct.length;--i>=0;){let def=this.#varsToDestruct[i];if(!loopOrSwitch.encloses(def))break;this.#writeDestruct(def);}}#trimVarsToDestruct(i){this.#varsToDestruct.splice(i,this.#varsToDestruct.length-i);}cleanupBlock(statement){let i=this.#varsToDestruct.length;for(;i>0;i--){let def=this.#varsToDestruct[i-1];if(def.parent!=statement)break;if(statement.completesNormally())this.#writeDestruct(def);}this.#trimVarsToDestruct(i);}visitBreak(statement){this.#writeDestructLoopOrSwitch(statement.loopOrSwitch);super.visitBreak(statement);}visitContinue(statement){this.#writeDestructLoopOrSwitch(statement.loop);super.visitContinue(statement);}visitExpr(statement){this.#writeCTemporaries(statement);let throwingMethod=GenC.#getThrowingMethod(statement);if(throwingMethod!=null){this.ensureChildBlock();statement.accept(this,this.#startForwardThrow(throwingMethod));this.#endForwardThrow(throwingMethod);this.cleanupTemporaries();}else if(statement instanceof FuCallExpr&&statement.type.id==FuId.STRING_STORAGE_TYPE){this.write("free(");statement.accept(this,FuPriority.ARGUMENT);this.writeLine(");");this.cleanupTemporaries();}else if(statement instanceof FuCallExpr&&statement.type instanceof FuDynamicPtrType){this.#sharedRelease=true;this.write("FuShared_Release(");statement.accept(this,FuPriority.ARGUMENT);this.writeLine(");");this.cleanupTemporaries();}else super.visitExpr(statement);}#startForeachHashTable(statement){this.openBlock();this.writeLine("GHashTableIter fudictit;");this.write("g_hash_table_iter_init(&fudictit, ");statement.collection.accept(this,FuPriority.ARGUMENT);this.writeLine(");");}#writeDictIterVar(iter,value){this.writeTypeAndName(iter);this.write(" = ");if(iter.type instanceof FuIntegerType&&iter.type.id!=FuId.LONG_TYPE){this.write("GPOINTER_TO_INT(");this.write(value);this.writeChar(41);}else {this.writeStaticCastType(iter.type);this.write(value);}this.writeCharLine(59);}visitForeach(statement){let element=statement.getVar().name;if(statement.collection.type instanceof FuArrayStorageType){const array=statement.collection.type;this.write("for (int ");this.writeCamelCaseNotKeyword(element);this.write(" = 0; ");this.writeCamelCaseNotKeyword(element);this.write(" < ");this.visitLiteralLong(BigInt(array.length));this.write("; ");this.writeCamelCaseNotKeyword(element);this.write("++)");this.writeChild(statement.body);}else if(statement.collection.type instanceof FuClassType){const klass=statement.collection.type;switch(klass.class.id){case FuId.STRING_CLASS:this.write("for (");this.writeStringPtrType();this.writeCamelCaseNotKeyword(element);this.write(" = ");statement.collection.accept(this,FuPriority.ARGUMENT);this.write("; *");this.writeCamelCaseNotKeyword(element);this.write(" != '\\0'; ");this.writeCamelCaseNotKeyword(element);this.write("++)");this.writeChild(statement.body);break;case FuId.LIST_CLASS:this.write("for (");let elementType=klass.getElementType();this.writeType(elementType,false);this.write(" const *");this.writeCamelCaseNotKeyword(element);this.write(" = (");this.writeType(elementType,false);this.write(" const *) ");this.writePostfix(statement.collection,"->data, ");for(;elementType.isArray();elementType=elementType.asClassType().getElementType())this.writeChar(42);if(elementType instanceof FuClassType)this.write("* const ");this.write("*fuend = ");this.writeCamelCaseNotKeyword(element);this.write(" + ");this.writePostfix(statement.collection,"->len; ");this.writeCamelCaseNotKeyword(element);this.write(" < fuend; ");this.writeCamelCaseNotKeyword(element);this.write("++)");this.writeChild(statement.body);break;case FuId.HASH_SET_CLASS:this.#startForeachHashTable(statement);this.writeLine("gpointer fukey;");this.write("while (g_hash_table_iter_next(&fudictit, &fukey, NULL)) ");this.openBlock();this.#writeDictIterVar(statement.getVar(),"fukey");this.flattenBlock(statement.body);this.closeBlock();this.closeBlock();break;case FuId.SORTED_SET_CLASS:this.write("for (GTreeNode *fusetit = g_tree_node_first(");statement.collection.accept(this,FuPriority.ARGUMENT);this.write("); fusetit != NULL; fusetit = g_tree_node_next(fusetit)) ");this.openBlock();this.#writeDictIterVar(statement.getVar(),"g_tree_node_key(fusetit)");this.flattenBlock(statement.body);this.closeBlock();break;case FuId.DICTIONARY_CLASS:this.#startForeachHashTable(statement);this.writeLine("gpointer fukey, fuvalue;");this.write("while (g_hash_table_iter_next(&fudictit, &fukey, &fuvalue)) ");this.openBlock();this.#writeDictIterVar(statement.getVar(),"fukey");this.#writeDictIterVar(statement.getValueVar(),"fuvalue");this.flattenBlock(statement.body);this.closeBlock();this.closeBlock();break;case FuId.SORTED_DICTIONARY_CLASS:this.write("for (GTreeNode *fudictit = g_tree_node_first(");statement.collection.accept(this,FuPriority.ARGUMENT);this.write("); fudictit != NULL; fudictit = g_tree_node_next(fudictit)) ");this.openBlock();this.#writeDictIterVar(statement.getVar(),"g_tree_node_key(fudictit)");this.#writeDictIterVar(statement.getValueVar(),"g_tree_node_value(fudictit)");this.flattenBlock(statement.body);this.closeBlock();break;default:this.notSupported(statement.collection,klass.class.name);break;}}else this.notSupported(statement.collection,statement.collection.type.toString());}visitLock(statement){this.write("mtx_lock(&");statement.lock.accept(this,FuPriority.PRIMARY);this.writeLine(");");statement.body.acceptStatement(this);this.write("mtx_unlock(&");statement.lock.accept(this,FuPriority.PRIMARY);this.writeLine(");");}visitReturn(statement){if(statement.value==null){this.#writeDestructAll();this.writeLine(this.currentMethod.throws?"return true;":"return;");}else if(statement.value instanceof FuLiteral||this.#varsToDestruct.length==0&&!GenC.#containsTemporariesToDestruct(statement.value)){this.#writeDestructAll();this.#writeCTemporaries(statement.value);super.visitReturn(statement);}else {let symbol;let local;if((symbol=statement.value)instanceof FuSymbolReference&&(local=symbol.symbol)instanceof FuVar){if(this.#varsToDestruct.includes(local)){this.#writeDestructAll(local);this.write("return ");let resultPtr;if((resultPtr=this.currentMethod.type)instanceof FuClassType)this.#writeClassPtr(resultPtr.class,symbol,FuPriority.ARGUMENT);else symbol.accept(this,FuPriority.ARGUMENT);this.writeCharLine(59);return;}this.#writeDestructAll();super.visitReturn(statement);return;}this.#writeCTemporaries(statement.value);this.ensureChildBlock();this.#startDefinition(this.currentMethod.type,true,true);this.write("returnValue = ");this.writeCoerced(this.currentMethod.type,statement.value,FuPriority.ARGUMENT);this.writeCharLine(59);this.cleanupTemporaries();this.#writeDestructAll();this.writeLine("return returnValue;");}}writeSwitchCaseBody(statements){let konst;if(statements[0]instanceof FuVar||(konst=statements[0])instanceof FuConst&&konst.type instanceof FuArrayStorageType)this.writeCharLine(59);let varsToDestructCount=this.#varsToDestruct.length;this.writeStatements(statements);this.#trimVarsToDestruct(varsToDestructCount);}visitSwitch(statement){if(statement.isTypeMatching())this.notSupported(statement,"Type-matching 'switch'");else super.visitSwitch(statement);}visitThrow(statement){this.#writeThrow();}#tryWriteCallAndReturn(statements,lastCallIndex,returnValue){if(this.#varsToDestruct.length>0)return false;for(let i=0;i<lastCallIndex;i++){let def;if((def=statements[i])instanceof FuVar&&GenC.#needToDestruct(def))return false;}let call;if(!((call=statements[lastCallIndex])instanceof FuExpr))return false;let throwingMethod=GenC.#getThrowingMethod(call);if(throwingMethod==null)return false;this.writeFirstStatements(statements,lastCallIndex);this.write("return ");if(throwingMethod.type instanceof FuNumericType){if(throwingMethod.type instanceof FuIntegerType){call.accept(this,FuPriority.EQUALITY);this.write(" != -1");}else {this.includeMath();this.write("!isnan(");call.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}}else if(throwingMethod.type.id==FuId.VOID_TYPE)call.accept(this,FuPriority.SELECT);else {call.accept(this,FuPriority.EQUALITY);this.write(" != NULL");}if(returnValue!=null){this.write(" ? ");returnValue.accept(this,FuPriority.SELECT);this.write(" : ");this.#writeThrowReturnValue();}this.writeCharLine(59);return true;}writeStatements(statements){let i=statements.length-2;let ret;if(i>=0&&(ret=statements[i+1])instanceof FuReturn&&this.#tryWriteCallAndReturn(statements,i,ret.value))return;super.writeStatements(statements);}writeEnum(enu){this.writeNewLine();this.writeDoc(enu.documentation);this.write("typedef enum ");this.openBlock();enu.acceptValues(this);this.writeNewLine();this.indent--;this.write("} ");this.writeName(enu);this.writeCharLine(59);}#writeTypedef(klass){if(klass.callType==FuCallType.STATIC)return;this.write("typedef struct ");this.writeName(klass);this.writeChar(32);this.writeName(klass);this.writeCharLine(59);}writeTypedefs(program,pub){for(let type=program.first;type!=null;type=type.next){if(type instanceof FuClass){const klass=type;if(klass.isPublic==pub)this.#writeTypedef(klass);}else if(type instanceof FuEnum){const enu=type;if(enu.isPublic==pub)this.writeEnum(enu);}else throw new Error();}}#writeInstanceParameters(method){this.writeChar(40);if(!method.isMutator)this.write("const ");this.writeName(method.parent);this.write(" *self");this.writeRemainingParameters(method,false,false);}#writeSignature(method){const klass=method.parent;if(!klass.isPublic||method.visibility!=FuVisibility.PUBLIC)this.write("static ");this.#writeReturnType(method);this.writeName(klass);this.writeChar(95);this.write(method.name);if(method.callType!=FuCallType.STATIC)this.#writeInstanceParameters(method);else if(method.parameters.count()==0)this.write("(void)");else this.writeParameters(method,false);}#writeVtblFields(klass){let baseClass;if((baseClass=klass.parent)instanceof FuClass)this.#writeVtblFields(baseClass);for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let method;if((method=symbol)instanceof FuMethod&&method.isAbstractOrVirtual()){this.#writeReturnType(method);this.write("(*");this.writeCamelCase(method.name);this.writeChar(41);this.#writeInstanceParameters(method);this.writeCharLine(59);}}}#writeVtblStruct(klass){this.write("typedef struct ");this.openBlock();this.#writeVtblFields(klass);this.indent--;this.write("} ");this.writeName(klass);this.writeLine("Vtbl;");}getConst(array){return "const ";}writeConst(konst){let array;if((array=konst.type)instanceof FuArrayStorageType){this.write("static ");this.write(this.getConst(array));this.writeTypeAndName(konst);this.write(" = ");konst.value.accept(this,FuPriority.ARGUMENT);this.writeCharLine(59);}else if(konst.visibility==FuVisibility.PUBLIC){this.write("#define ");this.writeName(konst);this.writeChar(32);konst.value.accept(this,FuPriority.ARGUMENT);this.writeNewLine();}}writeField(field){throw new Error();}static#hasVtblValue(klass){if(klass.callType==FuCallType.STATIC||klass.callType==FuCallType.ABSTRACT)return false;for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let method;if((method=symbol)instanceof FuMethod){switch(method.callType){case FuCallType.VIRTUAL:case FuCallType.OVERRIDE:case FuCallType.SEALED:return true;}}}return false;}needsConstructor(klass){if(klass.id==FuId.MATCH_CLASS)return false;let baseClass;return super.needsConstructor(klass)||GenC.#hasVtblValue(klass)||(baseClass=klass.parent)instanceof FuClass&&this.needsConstructor(baseClass);}#writeXstructorSignature(name,klass){this.write("static void ");this.writeName(klass);this.writeChar(95);this.write(name);this.writeChar(40);this.writeName(klass);this.write(" *self)");}writeSignatures(klass,pub){for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let konst;let method;if((konst=symbol)instanceof FuConst&&konst.visibility==FuVisibility.PUBLIC==pub){if(pub){this.writeNewLine();this.writeDoc(konst.documentation);}this.writeConst(konst);}else if((method=symbol)instanceof FuMethod&&method.isLive&&method.visibility==FuVisibility.PUBLIC==pub&&method.callType!=FuCallType.ABSTRACT){this.writeNewLine();this.writeMethodDoc(method);this.#writeSignature(method);this.writeCharLine(59);}}}writeClassInternal(klass){this.currentClass=klass;if(klass.callType!=FuCallType.STATIC){this.writeNewLine();if(klass.addsVirtualMethods())this.#writeVtblStruct(klass);this.writeDoc(klass.documentation);this.write("struct ");this.writeName(klass);this.writeChar(32);this.openBlock();if(GenC.#getVtblPtrClass(klass)==klass){this.write("const ");this.writeName(klass);this.writeLine("Vtbl *vtbl;");}if(klass.parent instanceof FuClass){this.writeName(klass.parent);this.writeLine(" base;");}for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let field;if((field=symbol)instanceof FuField){this.writeDoc(field.documentation);this.writeTypeAndName(field);this.writeCharLine(59);}}this.indent--;this.writeLine("};");if(this.needsConstructor(klass)){this.#writeXstructorSignature("Construct",klass);this.writeCharLine(59);}if(GenC.#needsDestructor(klass)){this.#writeXstructorSignature("Destruct",klass);this.writeCharLine(59);}}this.writeSignatures(klass,false);}#writeVtbl(definingClass,declaringClass){let baseClass;if((baseClass=declaringClass.parent)instanceof FuClass)this.#writeVtbl(definingClass,baseClass);for(let symbol=declaringClass.first;symbol!=null;symbol=symbol.next){let declaredMethod;if((declaredMethod=symbol)instanceof FuMethod&&declaredMethod.isAbstractOrVirtual()){let definedMethod=definingClass.tryLookup(declaredMethod.name,false);if(declaredMethod!=definedMethod){this.writeChar(40);this.#writeReturnType(declaredMethod);this.write("(*)");this.#writeInstanceParameters(declaredMethod);this.write(") ");}this.writeName(definedMethod);this.writeCharLine(44);}}}writeConstructor(klass){if(!this.needsConstructor(klass))return;this.switchesWithGoto.length=0;this.writeNewLine();this.#writeXstructorSignature("Construct",klass);this.writeNewLine();this.openBlock();let baseClass;if((baseClass=klass.parent)instanceof FuClass&&this.needsConstructor(baseClass)){this.writeName(baseClass);this.writeLine("_Construct(&self->base);");}if(GenC.#hasVtblValue(klass)){let structClass=GenC.#getVtblStructClass(klass);this.write("static const ");this.writeName(structClass);this.write("Vtbl vtbl = ");this.openBlock();this.#writeVtbl(klass,structClass);this.indent--;this.writeLine("};");let ptrClass=GenC.#getVtblPtrClass(klass);this.#writeSelfForField(ptrClass);this.write("vtbl = ");if(ptrClass!=structClass){this.write("(const ");this.writeName(ptrClass);this.write("Vtbl *) ");}this.writeLine("&vtbl;");}this.writeConstructorBody(klass);this.closeBlock();}#writeDestructFields(symbol){if(symbol!=null){this.#writeDestructFields(symbol.next);let field;if((field=symbol)instanceof FuField)this.#writeDestruct(field);}}writeDestructor(klass){if(!GenC.#needsDestructor(klass))return;this.writeNewLine();this.#writeXstructorSignature("Destruct",klass);this.writeNewLine();this.openBlock();this.#writeDestructFields(klass.first);let baseClass;if((baseClass=klass.parent)instanceof FuClass&&GenC.#needsDestructor(baseClass)){this.writeName(baseClass);this.writeLine("_Destruct(&self->base);");}this.closeBlock();}#writeNewDelete(klass,define){if(!klass.isPublic||klass.constructor_==null||klass.constructor_.visibility!=FuVisibility.PUBLIC)return;this.writeNewLine();this.writeName(klass);this.write(" *");this.writeName(klass);this.write("_New(void)");if(define){this.writeNewLine();this.openBlock();this.writeName(klass);this.write(" *self = (");this.writeName(klass);this.write(" *) malloc(sizeof(");this.writeName(klass);this.writeLine("));");if(this.needsConstructor(klass)){this.writeLine("if (self != NULL)");this.indent++;this.writeName(klass);this.writeLine("_Construct(self);");this.indent--;}this.writeLine("return self;");this.closeBlock();this.writeNewLine();}else this.writeCharLine(59);this.write("void ");this.writeName(klass);this.write("_Delete(");this.writeName(klass);this.write(" *self)");if(define){this.writeNewLine();this.openBlock();if(GenC.#needsDestructor(klass)){this.writeLine("if (self == NULL)");this.indent++;this.writeLine("return;");this.indent--;this.writeName(klass);this.writeLine("_Destruct(self);");}this.writeLine("free(self);");this.closeBlock();}else this.writeCharLine(59);}writeMethod(method){if(!method.isLive||method.callType==FuCallType.ABSTRACT)return;this.switchesWithGoto.length=0;this.writeNewLine();this.#writeSignature(method);for(let param=method.parameters.firstParameter();param!=null;param=param.nextParameter()){if(GenC.#needToDestruct(param))this.#varsToDestruct.push(param);}this.writeNewLine();this.currentMethod=method;this.openBlock();let block;if((block=method.body)instanceof FuBlock){let statements=block.statements;if(!block.completesNormally())this.writeStatements(statements);else if(method.throws&&method.type.id==FuId.VOID_TYPE){if(statements.length==0||!this.#tryWriteCallAndReturn(statements,statements.length-1,null)){this.writeStatements(statements);this.#writeDestructAll();this.writeLine("return true;");}}else {this.writeStatements(statements);this.#writeDestructAll();}}else method.body.acceptStatement(this);this.#varsToDestruct.length=0;this.closeBlock();this.currentMethod=null;}#writeTryParseLibrary(signature,call){this.writeNewLine();this.write("static bool Fu");this.writeLine(signature);this.openBlock();this.writeLine("if (*str == '\\0')");this.writeLine("\treturn false;");this.writeLine("char *end;");this.write("*result = strto");this.write(call);this.writeLine(");");this.writeLine("return *end == '\\0';");this.closeBlock();}#writeLibrary(){if(this.#intTryParse)this.#writeTryParseLibrary("Int_TryParse(int *result, const char *str, int base)","l(str, &end, base");if(this.#longTryParse)this.#writeTryParseLibrary("Long_TryParse(int64_t *result, const char *str, int base)","ll(str, &end, base");if(this.#doubleTryParse)this.#writeTryParseLibrary("Double_TryParse(double *result, const char *str)","d(str, &end");if(this.#stringAssign){this.writeNewLine();this.writeLine("static void FuString_Assign(char **str, char *value)");this.openBlock();this.writeLine("free(*str);");this.writeLine("*str = value;");this.closeBlock();}if(this.#stringSubstring){this.writeNewLine();this.writeLine("static char *FuString_Substring(const char *str, int len)");this.openBlock();this.writeLine("char *p = malloc(len + 1);");this.writeLine("memcpy(p, str, len);");this.writeLine("p[len] = '\\0';");this.writeLine("return p;");this.closeBlock();}if(this.#stringAppend){this.writeNewLine();this.writeLine("static void FuString_AppendSubstring(char **str, const char *suffix, size_t suffixLen)");this.openBlock();this.writeLine("if (suffixLen == 0)");this.writeLine("\treturn;");this.writeLine("size_t prefixLen = *str == NULL ? 0 : strlen(*str);");this.writeLine("*str = realloc(*str, prefixLen + suffixLen + 1);");this.writeLine("memcpy(*str + prefixLen, suffix, suffixLen);");this.writeLine("(*str)[prefixLen + suffixLen] = '\\0';");this.closeBlock();this.writeNewLine();this.writeLine("static void FuString_Append(char **str, const char *suffix)");this.openBlock();this.writeLine("FuString_AppendSubstring(str, suffix, strlen(suffix));");this.closeBlock();}if(this.#stringIndexOf){this.writeNewLine();this.writeLine("static int FuString_IndexOf(const char *str, const char *needle)");this.openBlock();this.writeLine("const char *p = strstr(str, needle);");this.writeLine("return p == NULL ? -1 : (int) (p - str);");this.closeBlock();}if(this.#stringLastIndexOf){this.writeNewLine();this.writeLine("static int FuString_LastIndexOf(const char *str, const char *needle)");this.openBlock();this.writeLine("if (needle[0] == '\\0')");this.writeLine("\treturn (int) strlen(str);");this.writeLine("int result = -1;");this.writeLine("const char *p = strstr(str, needle);");this.write("while (p != NULL) ");this.openBlock();this.writeLine("result = (int) (p - str);");this.writeLine("p = strstr(p + 1, needle);");this.closeBlock();this.writeLine("return result;");this.closeBlock();}if(this.#stringEndsWith){this.writeNewLine();this.writeLine("static bool FuString_EndsWith(const char *str, const char *suffix)");this.openBlock();this.writeLine("size_t strLen = strlen(str);");this.writeLine("size_t suffixLen = strlen(suffix);");this.writeLine("return strLen >= suffixLen && memcmp(str + strLen - suffixLen, suffix, suffixLen) == 0;");this.closeBlock();}if(this.#stringReplace){this.writeNewLine();this.writeLine("static char *FuString_Replace(const char *s, const char *oldValue, const char *newValue)");this.openBlock();this.write("for (char *result = NULL;;) ");this.openBlock();this.writeLine("const char *p = strstr(s, oldValue);");this.writeLine("if (p == NULL) {");this.writeLine("\tFuString_Append(&result, s);");this.writeLine("\treturn result == NULL ? strdup(\"\") : result;");this.writeCharLine(125);this.writeLine("FuString_AppendSubstring(&result, s, p - s);");this.writeLine("FuString_Append(&result, newValue);");this.writeLine("s = p + strlen(oldValue);");this.closeBlock();this.closeBlock();}if(this.#stringFormat){this.writeNewLine();this.writeLine("static char *FuString_Format(const char *format, ...)");this.openBlock();this.writeLine("va_list args1;");this.writeLine("va_start(args1, format);");this.writeLine("va_list args2;");this.writeLine("va_copy(args2, args1);");this.writeLine("size_t len = vsnprintf(NULL, 0, format, args1) + 1;");this.writeLine("va_end(args1);");this.writeLine("char *str = malloc(len);");this.writeLine("vsnprintf(str, len, format, args2);");this.writeLine("va_end(args2);");this.writeLine("return str;");this.closeBlock();}if(this.#matchFind){this.writeNewLine();this.writeLine("static bool FuMatch_Find(GMatchInfo **match_info, const char *input, const char *pattern, GRegexCompileFlags options)");this.openBlock();this.writeLine("GRegex *regex = g_regex_new(pattern, options, 0, NULL);");this.writeLine("bool result = g_regex_match(regex, input, 0, match_info);");this.writeLine("g_regex_unref(regex);");this.writeLine("return result;");this.closeBlock();}if(this.#matchPos){this.writeNewLine();this.writeLine("static int FuMatch_GetPos(const GMatchInfo *match_info, int which)");this.openBlock();this.writeLine("int start;");this.writeLine("int end;");this.writeLine("g_match_info_fetch_pos(match_info, 0, &start, &end);");this.writeLine("switch (which) {");this.writeLine("case 0:");this.writeLine("\treturn start;");this.writeLine("case 1:");this.writeLine("\treturn end;");this.writeLine("default:");this.writeLine("\treturn end - start;");this.writeCharLine(125);this.closeBlock();}if(this.#ptrConstruct){this.writeNewLine();this.writeLine("static void FuPtr_Construct(void **ptr)");this.openBlock();this.writeLine("*ptr = NULL;");this.closeBlock();}if(this.#sharedMake||this.#sharedAddRef||this.#sharedRelease){this.writeNewLine();this.writeLine("typedef void (*FuMethodPtr)(void *);");this.writeLine("typedef struct {");this.indent++;this.writeLine("size_t count;");this.writeLine("size_t unitSize;");this.writeLine("size_t refCount;");this.writeLine("FuMethodPtr destructor;");this.indent--;this.writeLine("} FuShared;");}if(this.#sharedMake){this.writeNewLine();this.writeLine("static void *FuShared_Make(size_t count, size_t unitSize, FuMethodPtr constructor, FuMethodPtr destructor)");this.openBlock();this.writeLine("FuShared *self = (FuShared *) malloc(sizeof(FuShared) + count * unitSize);");this.writeLine("self->count = count;");this.writeLine("self->unitSize = unitSize;");this.writeLine("self->refCount = 1;");this.writeLine("self->destructor = destructor;");this.write("if (constructor != NULL) ");this.openBlock();this.writeLine("for (size_t i = 0; i < count; i++)");this.writeLine("\tconstructor((char *) (self + 1) + i * unitSize);");this.closeBlock();this.writeLine("return self + 1;");this.closeBlock();}if(this.#sharedAddRef){this.writeNewLine();this.writeLine("static void *FuShared_AddRef(void *ptr)");this.openBlock();this.writeLine("if (ptr != NULL)");this.writeLine("\t((FuShared *) ptr)[-1].refCount++;");this.writeLine("return ptr;");this.closeBlock();}if(this.#sharedRelease||this.#sharedAssign){this.writeNewLine();this.writeLine("static void FuShared_Release(void *ptr)");this.openBlock();this.writeLine("if (ptr == NULL)");this.writeLine("\treturn;");this.writeLine("FuShared *self = (FuShared *) ptr - 1;");this.writeLine("if (--self->refCount != 0)");this.writeLine("\treturn;");this.write("if (self->destructor != NULL) ");this.openBlock();this.writeLine("for (size_t i = self->count; i > 0;)");this.writeLine("\tself->destructor((char *) ptr + --i * self->unitSize);");this.closeBlock();this.writeLine("free(self);");this.closeBlock();}if(this.#sharedAssign){this.writeNewLine();this.writeLine("static void FuShared_Assign(void **ptr, void *value)");this.openBlock();this.writeLine("FuShared_Release(*ptr);");this.writeLine("*ptr = value;");this.closeBlock();}for(const[name,content]of Object.entries(this.#listFrees).sort((a,b)=>a[0].localeCompare(b[0]))){this.writeNewLine();this.write("static void FuList_Free");this.write(name);this.writeLine("(void *ptr)");this.openBlock();this.write(content);this.writeCharLine(59);this.closeBlock();}if(this.#treeCompareInteger){this.writeNewLine();this.write("static int FuTree_CompareInteger(gconstpointer pa, gconstpointer pb, gpointer user_data)");this.openBlock();this.writeLine("gintptr a = (gintptr) pa;");this.writeLine("gintptr b = (gintptr) pb;");this.writeLine("return (a > b) - (a < b);");this.closeBlock();}if(this.#treeCompareString){this.writeNewLine();this.write("static int FuTree_CompareString(gconstpointer a, gconstpointer b, gpointer user_data)");this.openBlock();this.writeLine("return strcmp((const char *) a, (const char *) b);");this.closeBlock();}for(const typeId of new Int32Array(this.#compares).sort()){this.writeNewLine();this.write("static int FuCompare_");this.writeNumericType(typeId);this.writeLine("(const void *pa, const void *pb)");this.openBlock();this.writeNumericType(typeId);this.write(" a = *(const ");this.writeNumericType(typeId);this.writeLine(" *) pa;");this.writeNumericType(typeId);this.write(" b = *(const ");this.writeNumericType(typeId);this.writeLine(" *) pb;");switch(typeId){case FuId.BYTE_RANGE:case FuId.S_BYTE_RANGE:case FuId.SHORT_RANGE:case FuId.U_SHORT_RANGE:this.writeLine("return a - b;");break;default:this.writeLine("return (a > b) - (a < b);");break;}this.closeBlock();}for(const typeId of new Int32Array(this.#contains).sort()){this.writeNewLine();this.write("static bool FuArray_Contains_");if(typeId==FuId.NONE)this.write("object(const void * const *a, size_t len, const void *");else if(typeId==FuId.STRING_PTR_TYPE)this.write("string(const char * const *a, size_t len, const char *");else {this.writeNumericType(typeId);this.write("(const ");this.writeNumericType(typeId);this.write(" *a, size_t len, ");this.writeNumericType(typeId);}this.writeLine(" value)");this.openBlock();this.writeLine("for (size_t i = 0; i < len; i++)");if(typeId==FuId.STRING_PTR_TYPE)this.writeLine("\tif (strcmp(a[i], value) == 0)");else this.writeLine("\tif (a[i] == value)");this.writeLine("\t\treturn true;");this.writeLine("return false;");this.closeBlock();}}writeResources(resources){if(Object.keys(resources).length==0)return;this.writeNewLine();for(const[name,content]of Object.entries(resources).sort((a,b)=>a[0].localeCompare(b[0]))){this.write("static const ");this.writeNumericType(FuId.BYTE_RANGE);this.writeChar(32);this.writeResource(name,-1);this.writeChar(91);this.visitLiteralLong(BigInt(content.length));this.writeLine("] = {");this.writeChar(9);this.writeBytes(content);this.writeLine(" };");}}writeProgram(program){this.writtenClasses.clear();this.inHeaderFile=true;this.openStringWriter();for(const klass of program.classes){this.#writeNewDelete(klass,false);this.writeSignatures(klass,true);}this.createHeaderFile(".h");this.writeLine("#ifdef __cplusplus");this.writeLine("extern \"C\" {");this.writeLine("#endif");this.writeTypedefs(program,true);this.closeStringWriter();this.writeNewLine();this.writeLine("#ifdef __cplusplus");this.writeCharLine(125);this.writeLine("#endif");this.closeFile();this.inHeaderFile=false;this.#intTryParse=false;this.#longTryParse=false;this.#doubleTryParse=false;this.#stringAssign=false;this.#stringSubstring=false;this.#stringAppend=false;this.#stringIndexOf=false;this.#stringLastIndexOf=false;this.#stringEndsWith=false;this.#stringReplace=false;this.#stringFormat=false;this.#matchFind=false;this.#matchPos=false;this.#ptrConstruct=false;this.#sharedMake=false;this.#sharedAddRef=false;this.#sharedRelease=false;this.#sharedAssign=false;for(const key in this.#listFrees)delete this.#listFrees[key];this.#treeCompareInteger=false;this.#treeCompareString=false;this.#compares.clear();this.#contains.clear();this.openStringWriter();for(const klass of program.classes)this.writeClass(klass,program);this.writeResources(program.resources);for(const klass of program.classes){this.currentClass=klass;this.writeConstructor(klass);this.writeDestructor(klass);this.#writeNewDelete(klass,true);this.writeMethods(klass);}this.include("stdlib.h");this.createImplementationFile(program,".h");this.#writeLibrary();this.writeRegexOptionsEnum(program);this.writeTypedefs(program,false);this.closeStringWriter();this.closeFile();}}class GenCl extends GenC{#stringLength;#stringEquals;#stringStartsWith;#bytesEqualsString;getTargetName(){return "OpenCL C";}includeStdBool(){}includeMath(){}writeNumericType(id){switch(id){case FuId.S_BYTE_RANGE:this.write("char");break;case FuId.BYTE_RANGE:this.write("uchar");break;case FuId.SHORT_RANGE:this.write("short");break;case FuId.U_SHORT_RANGE:this.write("ushort");break;case FuId.INT_TYPE:this.write("int");break;case FuId.LONG_TYPE:this.write("long");break;default:throw new Error();}}writeStringPtrType(){this.write("constant char *");}writeClassType(klass,space){switch(klass.class.id){case FuId.NONE:if(klass instanceof FuDynamicPtrType)this.notSupported(klass,"Dynamic reference");else super.writeClassType(klass,space);break;case FuId.STRING_CLASS:if(klass.id==FuId.STRING_STORAGE_TYPE)this.notSupported(klass,"string()");else this.writeStringPtrType();break;default:this.notSupported(klass,klass.class.name);break;}}writePrintfLongPrefix(){this.writeChar(108);}writeInterpolatedStringArgBase(expr){expr.accept(this,FuPriority.ARGUMENT);}visitInterpolatedString(expr,parent){this.notSupported(expr,"Interpolated strings");}writeCamelCaseNotKeyword(name){switch(name){case"Constant":case"Global":case"Kernel":case"Local":case"Private":case"constant":case"global":case"kernel":case"local":case"private":this.writeCamelCase(name);this.writeChar(95);break;default:super.writeCamelCaseNotKeyword(name);break;}}getConst(array){return array.ptrTaken?"const ":"constant ";}writeSubstringEqual(call,literal,parent,not){if(not)this.writeChar(33);if(GenCl.isUTF8GetString(call)){this.#bytesEqualsString=true;this.write("FuBytes_Equals(");}else {this.#stringStartsWith=true;this.write("FuString_StartsWith(");}this.writeStringPtrAdd(call);this.write(", ");this.visitLiteralString(literal);this.writeChar(41);}writeEqualStringInternal(left,right,parent,not){this.#stringEquals=true;if(not)this.writeChar(33);this.writeCall("FuString_Equals",left,right);}writeStringLength(expr){this.#stringLength=true;this.writeCall("strlen",expr);}#writeConsoleWrite(args,newLine){this.write("printf(");if(args.length==0)this.write("\"\\n\")");else {let interpolated;if((interpolated=args[0])instanceof FuInterpolatedString)this.writePrintf(interpolated,newLine);else this.writePrintfNotInterpolated(args,newLine);}}writeCallExpr(obj,method,args,parent){switch(method.id){case FuId.NONE:case FuId.CLASS_TO_STRING:this.writeCCall(obj,method,args);break;case FuId.ENUM_FROM_INT:this.writeStaticCast(method.type,args[0]);break;case FuId.ENUM_HAS_FLAG:this.writeEnumHasFlag(obj,args,parent);break;case FuId.STRING_STARTS_WITH:let c=this.getOneAscii(args[0]);if(c>=0){if(parent>FuPriority.EQUALITY)this.writeChar(40);this.writePostfix(obj,"[0] == ");this.visitLiteralChar(c);if(parent>FuPriority.EQUALITY)this.writeChar(41);}else {this.#stringStartsWith=true;this.writeCall("FuString_StartsWith",obj,args[0]);}break;case FuId.STRING_SUBSTRING:this.writeStringSubstring(obj,args,parent);break;case FuId.ARRAY_COPY_TO:this.write("for (size_t _i = 0; _i < ");args[3].accept(this,FuPriority.REL);this.writeLine("; _i++)");this.writeChar(9);args[1].accept(this,FuPriority.PRIMARY);this.writeChar(91);this.startAdd(args[2]);this.write("_i] = ");obj.accept(this,FuPriority.PRIMARY);this.writeChar(91);this.startAdd(args[0]);this.write("_i]");break;case FuId.ARRAY_FILL_ALL:case FuId.ARRAY_FILL_PART:this.writeArrayFill(obj,args);break;case FuId.CONSOLE_WRITE:this.#writeConsoleWrite(args,false);break;case FuId.CONSOLE_WRITE_LINE:this.#writeConsoleWrite(args,true);break;case FuId.U_T_F8_GET_BYTE_COUNT:this.writeStringLength(args[0]);break;case FuId.U_T_F8_GET_BYTES:this.write("for (size_t _i = 0; ");args[0].accept(this,FuPriority.PRIMARY);this.writeLine("[_i] != '\\0'; _i++)");this.writeChar(9);args[1].accept(this,FuPriority.PRIMARY);this.writeChar(91);this.startAdd(args[2]);this.write("_i] = ");this.writePostfix(args[0],"[_i]");break;case FuId.MATH_METHOD:case FuId.MATH_CLAMP:case FuId.MATH_IS_FINITE:case FuId.MATH_IS_NA_N:case FuId.MATH_LOG2:case FuId.MATH_MAX_INT:case FuId.MATH_MIN_INT:case FuId.MATH_ROUND:this.writeLowercase(method.name);this.writeArgsInParentheses(method,args);break;case FuId.MATH_ABS:if(args[0].type instanceof FuFloatingType)this.writeChar(102);this.writeCall("abs",args[0]);break;case FuId.MATH_CEILING:this.writeCall("ceil",args[0]);break;case FuId.MATH_FUSED_MULTIPLY_ADD:this.writeCall("fma",args[0],args[1],args[2]);break;case FuId.MATH_IS_INFINITY:this.writeCall("isinf",args[0]);break;case FuId.MATH_MAX_DOUBLE:this.writeCall("fmax",args[0],args[1]);break;case FuId.MATH_MIN_DOUBLE:this.writeCall("fmin",args[0],args[1]);break;case FuId.MATH_TRUNCATE:this.writeCall("trunc",args[0]);break;default:this.notSupported(obj,method.name);break;}}writeAssert(statement){}writeSwitchCaseBody(statements){if(statements.every(statement=>statement instanceof FuAssert))this.writeCharLine(59);else super.writeSwitchCaseBody(statements);}#writeLibrary(){if(this.#stringLength){this.writeNewLine();this.writeLine("static int strlen(constant char *str)");this.openBlock();this.writeLine("int len = 0;");this.writeLine("while (str[len] != '\\0')");this.writeLine("\tlen++;");this.writeLine("return len;");this.closeBlock();}if(this.#stringEquals){this.writeNewLine();this.writeLine("static bool FuString_Equals(constant char *str1, constant char *str2)");this.openBlock();this.writeLine("for (size_t i = 0; str1[i] == str2[i]; i++) {");this.writeLine("\tif (str1[i] == '\\0')");this.writeLine("\t\treturn true;");this.writeCharLine(125);this.writeLine("return false;");this.closeBlock();}if(this.#stringStartsWith){this.writeNewLine();this.writeLine("static bool FuString_StartsWith(constant char *str1, constant char *str2)");this.openBlock();this.writeLine("for (int i = 0; str2[i] != '\\0'; i++) {");this.writeLine("\tif (str1[i] != str2[i])");this.writeLine("\t\treturn false;");this.writeCharLine(125);this.writeLine("return true;");this.closeBlock();}if(this.#bytesEqualsString){this.writeNewLine();this.writeLine("static bool FuBytes_Equals(const uchar *mem, constant char *str)");this.openBlock();this.writeLine("for (int i = 0; str[i] != '\\0'; i++) {");this.writeLine("\tif (mem[i] != str[i])");this.writeLine("\t\treturn false;");this.writeCharLine(125);this.writeLine("return true;");this.closeBlock();}}writeProgram(program){this.writtenClasses.clear();this.#stringLength=false;this.#stringEquals=false;this.#stringStartsWith=false;this.#bytesEqualsString=false;this.openStringWriter();for(const klass of program.classes){this.currentClass=klass;this.writeConstructor(klass);this.writeDestructor(klass);this.writeMethods(klass);}this.createOutputFile();this.writeTopLevelNatives(program);this.writeRegexOptionsEnum(program);this.writeTypedefs(program,true);for(const klass of program.classes)this.writeSignatures(klass,true);this.writeTypedefs(program,false);for(const klass of program.classes)this.writeClass(klass,program);this.writeResources(program.resources);this.#writeLibrary();this.closeStringWriter();this.closeFile();}}class GenCpp extends GenCCpp{#usingStringViewLiterals;#hasEnumFlags;#stringReplace;getTargetName(){return "C++";}includeStdInt(){this.include("cstdint");}includeAssert(){this.include("cassert");}includeMath(){this.include("cmath");}visitLiteralNull(){this.write("nullptr");}#startMethodCall(obj){obj.accept(this,FuPriority.PRIMARY);this.writeMemberOp(obj,null);}writeInterpolatedStringArg(expr){let klass;if((klass=expr.type)instanceof FuClassType&&klass.class.id!=FuId.STRING_CLASS){this.#startMethodCall(expr);this.write("toString()");}else super.writeInterpolatedStringArg(expr);}visitInterpolatedString(expr,parent){this.include("format");this.write("std::format(\"");for(const part of expr.parts){this.writeDoubling(part.prefix,123);this.writeChar(123);this.writePyFormat(part);}this.writeDoubling(expr.suffix,123);this.writeChar(34);this.writeInterpolatedStringArgs(expr);this.writeChar(41);}#writeCamelCaseNotKeyword(name){this.writeCamelCase(name);switch(name){case"And":case"Asm":case"Auto":case"Bool":case"Break":case"Byte":case"Case":case"Catch":case"Char":case"Class":case"Const":case"Continue":case"Default":case"Delete":case"Do":case"Double":case"Else":case"Enum":case"Explicit":case"Export":case"Extern":case"False":case"Float":case"For":case"Goto":case"If":case"Inline":case"Int":case"Long":case"Namespace":case"New":case"Not":case"Nullptr":case"Operator":case"Or":case"Override":case"Private":case"Protected":case"Public":case"Register":case"Return":case"Short":case"Signed":case"Sizeof":case"Static":case"Struct":case"Switch":case"Throw":case"True":case"Try":case"Typedef":case"Union":case"Unsigned":case"Using":case"Virtual":case"Void":case"Volatile":case"While":case"Xor":case"and":case"asm":case"auto":case"catch":case"char":case"delete":case"explicit":case"export":case"extern":case"goto":case"inline":case"namespace":case"not":case"nullptr":case"operator":case"or":case"private":case"register":case"signed":case"sizeof":case"struct":case"try":case"typedef":case"union":case"unsigned":case"using":case"volatile":case"xor":this.writeChar(95);break;}}writeName(symbol){if(symbol instanceof FuContainerType)this.write(symbol.name);else if(symbol instanceof FuVar||symbol instanceof FuMember)this.#writeCamelCaseNotKeyword(symbol.name);else throw new Error();}writeLocalName(symbol,parent){if(symbol instanceof FuField)this.write("this->");this.writeName(symbol);}#writeCollectionType(name,elementType){this.include(name);this.write("std::");this.write(name);this.writeChar(60);this.writeType(elementType,false);this.writeChar(62);}#writeClassType(klass){if(klass.class.typeParameterCount==0){if(!(klass instanceof FuReadWriteClassType))this.write("const ");switch(klass.class.id){case FuId.TEXT_WRITER_CLASS:this.include("iostream");this.write("std::ostream");break;case FuId.STRING_WRITER_CLASS:this.include("sstream");this.write("std::ostringstream");break;case FuId.REGEX_CLASS:this.include("regex");this.write("std::regex");break;case FuId.MATCH_CLASS:this.include("regex");this.write("std::cmatch");break;case FuId.LOCK_CLASS:this.include("mutex");this.write("std::recursive_mutex");break;default:this.write(klass.class.name);break;}}else {let cppType;switch(klass.class.id){case FuId.ARRAY_STORAGE_CLASS:cppType="array";break;case FuId.LIST_CLASS:cppType="vector";break;case FuId.QUEUE_CLASS:cppType="queue";break;case FuId.STACK_CLASS:cppType="stack";break;case FuId.HASH_SET_CLASS:cppType="unordered_set";break;case FuId.SORTED_SET_CLASS:cppType="set";break;case FuId.DICTIONARY_CLASS:cppType="unordered_map";break;case FuId.SORTED_DICTIONARY_CLASS:cppType="map";break;default:this.notSupported(klass,klass.class.name);cppType="NOT_SUPPORTED";break;}this.include(cppType);if(!(klass instanceof FuReadWriteClassType))this.write("const ");this.write("std::");this.write(cppType);this.writeChar(60);this.writeType(klass.typeArg0,false);let arrayStorage;if((arrayStorage=klass)instanceof FuArrayStorageType){this.write(", ");this.visitLiteralLong(BigInt(arrayStorage.length));}else if(klass.class.typeParameterCount==2){this.write(", ");this.writeType(klass.getValueType(),false);}this.writeChar(62);}}writeType(type,promote){if(type instanceof FuIntegerType)this.writeNumericType(this.getTypeId(type,promote));else if(type instanceof FuStringStorageType){this.include("string");this.write("std::string");}else if(type instanceof FuStringType){this.include("string_view");this.write("std::string_view");}else if(type instanceof FuDynamicPtrType){const dynamic=type;switch(dynamic.class.id){case FuId.REGEX_CLASS:this.include("regex");this.write("std::regex");break;case FuId.ARRAY_PTR_CLASS:this.include("memory");this.write("std::shared_ptr<");this.writeType(dynamic.getElementType(),false);this.write("[]>");break;default:this.include("memory");this.write("std::shared_ptr<");this.#writeClassType(dynamic);this.writeChar(62);break;}}else if(type instanceof FuClassType){const klass=type;if(klass.class.id==FuId.ARRAY_PTR_CLASS){this.writeType(klass.getElementType(),false);if(!(klass instanceof FuReadWriteClassType))this.write(" const");}else this.#writeClassType(klass);if(!(klass instanceof FuStorageType))this.write(" *");}else this.write(type.name);}writeNewArray(elementType,lengthExpr,parent){this.include("memory");this.write("std::make_shared<");this.writeType(elementType,false);this.write("[]>(");lengthExpr.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}writeNew(klass,parent){this.include("memory");this.write("std::make_shared<");this.#writeClassType(klass);this.write(">()");}writeStorageInit(def){}writeVarInit(def){if(def.value!=null&&def.type.id==FuId.STRING_STORAGE_TYPE){this.writeChar(123);def.value.accept(this,FuPriority.ARGUMENT);this.writeChar(125);}else if(def.type instanceof FuArrayStorageType){let literal;if(def.value==null);else if((literal=def.value)instanceof FuLiteral&&literal.isDefaultValue())this.write(" {}");else throw new Error();}else super.writeVarInit(def);}static#isSharedPtr(expr){if(expr.type instanceof FuDynamicPtrType)return true;let symbol;let loop;return (symbol=expr)instanceof FuSymbolReference&&(loop=symbol.symbol.parent)instanceof FuForeach&&loop.collection.type.asClassType().getElementType()instanceof FuDynamicPtrType;}writeStaticCast(type,expr){let dynamic;if((dynamic=type)instanceof FuDynamicPtrType){this.write("std::static_pointer_cast<");this.write(dynamic.class.name);}else {this.write("static_cast<");this.writeType(type,false);}this.write(">(");if(expr.type instanceof FuStorageType){this.writeChar(38);expr.accept(this,FuPriority.PRIMARY);}else if(!(type instanceof FuDynamicPtrType)&&GenCpp.#isSharedPtr(expr))this.writePostfix(expr,".get()");else this.getStaticCastInner(type,expr).accept(this,FuPriority.ARGUMENT);this.writeChar(41);}static#needStringPtrData(expr){let call;if((call=expr)instanceof FuCallExpr&&call.method.symbol.id==FuId.ENVIRONMENT_GET_ENVIRONMENT_VARIABLE)return false;return expr.type.id==FuId.STRING_PTR_TYPE;}writeEqual(left,right,parent,not){if(GenCpp.#needStringPtrData(left)&&right.type.id==FuId.NULL_TYPE){this.writePostfix(left,".data()");this.write(GenCpp.getEqOp(not));this.write("nullptr");}else if(left.type.id==FuId.NULL_TYPE&&GenCpp.#needStringPtrData(right)){this.write("nullptr");this.write(GenCpp.getEqOp(not));this.writePostfix(right,".data()");}else super.writeEqual(left,right,parent,not);}static#isClassPtr(type){let ptr;return (ptr=type)instanceof FuClassType&&!(type instanceof FuStorageType)&&ptr.class.id!=FuId.STRING_CLASS&&ptr.class.id!=FuId.ARRAY_PTR_CLASS;}static#isCppPtr(expr){if(GenCpp.#isClassPtr(expr.type)){let symbol;let loop;if((symbol=expr)instanceof FuSymbolReference&&(loop=symbol.symbol.parent)instanceof FuForeach&&(symbol.symbol==loop.getVar()?loop.collection.type.asClassType().typeArg0:loop.collection.type.asClassType().typeArg1)instanceof FuStorageType)return false;return true;}return false;}writeIndexingExpr(expr,parent){const klass=expr.left.type;if(parent!=FuPriority.ASSIGN){switch(klass.class.id){case FuId.DICTIONARY_CLASS:case FuId.SORTED_DICTIONARY_CLASS:case FuId.ORDERED_DICTIONARY_CLASS:this.#startMethodCall(expr.left);this.write("find(");this.writeStronglyCoerced(klass.getKeyType(),expr.right);this.write(")->second");return;}}if(GenCpp.#isClassPtr(expr.left.type)){this.write("(*");expr.left.accept(this,FuPriority.PRIMARY);this.writeChar(41);}else expr.left.accept(this,FuPriority.PRIMARY);this.writeChar(91);switch(klass.class.id){case FuId.ARRAY_PTR_CLASS:case FuId.ARRAY_STORAGE_CLASS:case FuId.LIST_CLASS:expr.right.accept(this,FuPriority.ARGUMENT);break;default:this.writeStronglyCoerced(klass.getKeyType(),expr.right);break;}this.writeChar(93);}writeMemberOp(left,symbol){if(symbol!=null&&symbol.symbol instanceof FuConst)this.write("::");else if(GenCpp.#isCppPtr(left))this.write("->");else this.writeChar(46);}writeEnumAsInt(expr,parent){this.write("static_cast<int>(");expr.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}#writeCollectionObject(obj,priority){if(GenCpp.#isCppPtr(obj)){this.writeChar(42);obj.accept(this,FuPriority.PRIMARY);}else obj.accept(this,priority);}#writeBeginEnd(obj){this.#startMethodCall(obj);this.write("begin(), ");this.#startMethodCall(obj);this.write("end()");}#writePtrRange(obj,index,count){this.writeArrayPtrAdd(obj,index);this.write(", ");this.writeArrayPtrAdd(obj,index);this.write(" + ");count.accept(this,FuPriority.MUL);}#writeNotRawStringLiteral(obj,priority){obj.accept(this,priority);if(obj instanceof FuLiteralString){this.include("string_view");this.#usingStringViewLiterals=true;this.write("sv");}}#writeStringMethod(obj,name,method,args){this.#writeNotRawStringLiteral(obj,FuPriority.PRIMARY);this.writeChar(46);this.write(name);let c=this.getOneAscii(args[0]);if(c>=0){this.writeChar(40);this.visitLiteralChar(c);this.writeChar(41);}else this.writeArgsInParentheses(method,args);}#writeAllAnyContains(function_,obj,args){this.include("algorithm");this.write("std::");this.write(function_);this.writeChar(40);this.#writeBeginEnd(obj);this.write(", ");args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(41);}#writeCString(expr){if(expr instanceof FuLiteralString)expr.accept(this,FuPriority.ARGUMENT);else this.writePostfix(expr,".data()");}#writeRegex(args,argIndex){this.include("regex");this.write("std::regex(");args[argIndex].accept(this,FuPriority.ARGUMENT);this.writeRegexOptions(args,", std::regex::ECMAScript | "," | ","","std::regex::icase","std::regex::multiline","std::regex::NOT_SUPPORTED_singleline");this.writeChar(41);}#writeWrite(args,newLine){this.include("iostream");if(args.length==1){let interpolated;if((interpolated=args[0])instanceof FuInterpolatedString){let uppercase=false;let hex=false;let flt=71;for(const part of interpolated.parts){switch(part.format){case 69:case 71:case 88:if(!uppercase){this.write(" << std::uppercase");uppercase=true;}break;case 101:case 103:case 120:if(uppercase){this.write(" << std::nouppercase");uppercase=false;}break;}switch(part.format){case 69:case 101:if(flt!=69){this.write(" << std::scientific");flt=69;}break;case 70:case 102:if(flt!=70){this.write(" << std::fixed");flt=70;}break;case 88:case 120:if(!hex){this.write(" << std::hex");hex=true;}break;default:if(hex){this.write(" << std::dec");hex=false;}if(flt!=71){this.write(" << std::defaultfloat");flt=71;}break;}if(part.prefix.length>0){this.write(" << ");this.visitLiteralString(part.prefix);}this.write(" << ");part.argument.accept(this,FuPriority.MUL);}if(uppercase)this.write(" << std::nouppercase");if(hex)this.write(" << std::dec");if(flt!=71)this.write(" << std::defaultfloat");if(interpolated.suffix.length>0){this.write(" << ");if(newLine){this.writeStringLiteralWithNewLine(interpolated.suffix);return;}this.visitLiteralString(interpolated.suffix);}}else {this.write(" << ");let literal;if(newLine&&(literal=args[0])instanceof FuLiteralString){this.writeStringLiteralWithNewLine(literal.value);return;}else if(args[0]instanceof FuLiteralChar)this.writeCall("static_cast<int>",args[0]);else args[0].accept(this,FuPriority.MUL);}}if(newLine)this.write(" << '\\n'");}#writeRegexArgument(expr){if(expr.type instanceof FuDynamicPtrType)expr.accept(this,FuPriority.ARGUMENT);else {this.writeChar(42);expr.accept(this,FuPriority.PRIMARY);}}writeCallExpr(obj,method,args,parent){switch(method.id){case FuId.NONE:case FuId.CLASS_TO_STRING:case FuId.LIST_CLEAR:case FuId.STACK_PUSH:case FuId.HASH_SET_CLEAR:case FuId.HASH_SET_CONTAINS:case FuId.SORTED_SET_CLEAR:case FuId.SORTED_SET_CONTAINS:case FuId.DICTIONARY_CLEAR:case FuId.SORTED_DICTIONARY_CLEAR:if(obj!=null){if(GenCpp.isReferenceTo(obj,FuId.BASE_PTR)){this.writeName(method.parent);this.write("::");}else {obj.accept(this,FuPriority.PRIMARY);if(method.callType==FuCallType.STATIC)this.write("::");else this.writeMemberOp(obj,null);}}this.writeName(method);this.writeArgsInParentheses(method,args);break;case FuId.ENUM_FROM_INT:this.writeStaticCast(method.type,args[0]);break;case FuId.ENUM_HAS_FLAG:this.writeEnumHasFlag(obj,args,parent);break;case FuId.INT_TRY_PARSE:case FuId.LONG_TRY_PARSE:this.include("cstdlib");this.write("[&] { char *ciend; ");obj.accept(this,FuPriority.ASSIGN);this.write(" = std::strtol");if(method.id==FuId.LONG_TRY_PARSE)this.writeChar(108);this.writeChar(40);this.#writeCString(args[0]);this.write(", &ciend");this.writeTryParseRadix(args);this.write("); return *ciend == '\\0'; }()");break;case FuId.DOUBLE_TRY_PARSE:this.include("cstdlib");this.write("[&] { char *ciend; ");obj.accept(this,FuPriority.ASSIGN);this.write(" = std::strtod(");this.#writeCString(args[0]);this.write(", &ciend); return *ciend == '\\0'; }()");break;case FuId.STRING_CONTAINS:if(parent>FuPriority.EQUALITY)this.writeChar(40);this.#writeStringMethod(obj,"find",method,args);this.write(" != std::string::npos");if(parent>FuPriority.EQUALITY)this.writeChar(41);break;case FuId.STRING_ENDS_WITH:this.#writeStringMethod(obj,"ends_with",method,args);break;case FuId.STRING_INDEX_OF:this.write("static_cast<int>(");this.#writeStringMethod(obj,"find",method,args);this.writeChar(41);break;case FuId.STRING_LAST_INDEX_OF:this.write("static_cast<int>(");this.#writeStringMethod(obj,"rfind",method,args);this.writeChar(41);break;case FuId.STRING_REPLACE:this.#stringReplace=true;this.writeCall("FuString_replace",obj,args[0],args[1]);break;case FuId.STRING_STARTS_WITH:this.#writeStringMethod(obj,"starts_with",method,args);break;case FuId.STRING_SUBSTRING:this.#writeStringMethod(obj,"substr",method,args);break;case FuId.ARRAY_BINARY_SEARCH_ALL:case FuId.ARRAY_BINARY_SEARCH_PART:this.include("algorithm");if(parent>FuPriority.ADD)this.writeChar(40);this.write("std::lower_bound(");if(args.length==1)this.#writeBeginEnd(obj);else this.#writePtrRange(obj,args[1],args[2]);this.write(", ");args[0].accept(this,FuPriority.ARGUMENT);this.write(") - ");this.writeArrayPtr(obj,FuPriority.MUL);if(parent>FuPriority.ADD)this.writeChar(41);break;case FuId.ARRAY_CONTAINS:case FuId.LIST_CONTAINS:if(parent>FuPriority.EQUALITY)this.writeChar(40);this.#writeAllAnyContains("find",obj,args);this.write(" != ");this.#startMethodCall(obj);this.write("end()");if(parent>FuPriority.EQUALITY)this.writeChar(41);break;case FuId.ARRAY_COPY_TO:case FuId.LIST_COPY_TO:this.include("algorithm");this.write("std::copy_n(");this.writeArrayPtrAdd(obj,args[0]);this.write(", ");args[3].accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeArrayPtrAdd(args[1],args[2]);this.writeChar(41);break;case FuId.ARRAY_FILL_ALL:this.#startMethodCall(obj);this.write("fill(");this.writeCoerced(obj.type.asClassType().getElementType(),args[0],FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.ARRAY_FILL_PART:this.include("algorithm");this.write("std::fill_n(");this.writeArrayPtrAdd(obj,args[1]);this.write(", ");args[2].accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeCoerced(obj.type.asClassType().getElementType(),args[0],FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.ARRAY_SORT_ALL:case FuId.LIST_SORT_ALL:this.include("algorithm");this.write("std::sort(");this.#writeBeginEnd(obj);this.writeChar(41);break;case FuId.ARRAY_SORT_PART:case FuId.LIST_SORT_PART:this.include("algorithm");this.write("std::sort(");this.#writePtrRange(obj,args[0],args[1]);this.writeChar(41);break;case FuId.LIST_ADD:this.#startMethodCall(obj);if(args.length==0)this.write("emplace_back()");else {this.write("push_back(");this.writeCoerced(obj.type.asClassType().getElementType(),args[0],FuPriority.ARGUMENT);this.writeChar(41);}break;case FuId.LIST_ADD_RANGE:this.#startMethodCall(obj);this.write("insert(");this.#startMethodCall(obj);this.write("end(), ");this.#writeBeginEnd(args[0]);this.writeChar(41);break;case FuId.LIST_ALL:this.#writeAllAnyContains("all_of",obj,args);break;case FuId.LIST_ANY:this.include("algorithm");this.#writeAllAnyContains("any_of",obj,args);break;case FuId.LIST_INDEX_OF:{let elementType=obj.type.asClassType().getElementType();this.write("[](const ");this.#writeCollectionType("vector",elementType);this.write(" &v, ");this.writeType(elementType,false);this.include("algorithm");this.write(" value) { auto i = std::find(v.begin(), v.end(), value); return i == v.end() ? -1 : i - v.begin(); }(");this.#writeCollectionObject(obj,FuPriority.ARGUMENT);this.write(", ");this.writeCoerced(elementType,args[0],FuPriority.ARGUMENT);this.writeChar(41);}break;case FuId.LIST_INSERT:this.#startMethodCall(obj);if(args.length==1){this.write("emplace(");this.writeArrayPtrAdd(obj,args[0]);}else {this.write("insert(");this.writeArrayPtrAdd(obj,args[0]);this.write(", ");this.writeCoerced(obj.type.asClassType().getElementType(),args[1],FuPriority.ARGUMENT);}this.writeChar(41);break;case FuId.LIST_LAST:this.#startMethodCall(obj);this.write("back()");break;case FuId.LIST_REMOVE_AT:this.#startMethodCall(obj);this.write("erase(");this.writeArrayPtrAdd(obj,args[0]);this.writeChar(41);break;case FuId.LIST_REMOVE_RANGE:this.#startMethodCall(obj);this.write("erase(");this.#writePtrRange(obj,args[0],args[1]);this.writeChar(41);break;case FuId.QUEUE_CLEAR:case FuId.STACK_CLEAR:this.#writeCollectionObject(obj,FuPriority.ASSIGN);this.write(" = {}");break;case FuId.QUEUE_DEQUEUE:if(parent==FuPriority.STATEMENT){this.#startMethodCall(obj);this.write("pop()");}else {let elementType=obj.type.asClassType().getElementType();this.write("[](");this.#writeCollectionType("queue",elementType);this.write(" &q) { ");this.writeType(elementType,false);this.write(" front = q.front(); q.pop(); return front; }(");this.#writeCollectionObject(obj,FuPriority.ARGUMENT);this.writeChar(41);}break;case FuId.QUEUE_ENQUEUE:this.writeMethodCall(obj,"push",args[0]);break;case FuId.QUEUE_PEEK:this.#startMethodCall(obj);this.write("front()");break;case FuId.STACK_PEEK:this.#startMethodCall(obj);this.write("top()");break;case FuId.STACK_POP:if(parent==FuPriority.STATEMENT){this.#startMethodCall(obj);this.write("pop()");}else {let elementType=obj.type.asClassType().getElementType();this.write("[](");this.#writeCollectionType("stack",elementType);this.write(" &s) { ");this.writeType(elementType,false);this.write(" top = s.top(); s.pop(); return top; }(");this.#writeCollectionObject(obj,FuPriority.ARGUMENT);this.writeChar(41);}break;case FuId.HASH_SET_ADD:case FuId.SORTED_SET_ADD:this.writeMethodCall(obj,obj.type.asClassType().getElementType().id==FuId.STRING_STORAGE_TYPE&&args[0].type.id==FuId.STRING_PTR_TYPE?"emplace":"insert",args[0]);break;case FuId.HASH_SET_REMOVE:case FuId.SORTED_SET_REMOVE:case FuId.DICTIONARY_REMOVE:case FuId.SORTED_DICTIONARY_REMOVE:this.writeMethodCall(obj,"erase",args[0]);break;case FuId.DICTIONARY_ADD:this.writeIndexing(obj,args[0]);break;case FuId.DICTIONARY_CONTAINS_KEY:case FuId.SORTED_DICTIONARY_CONTAINS_KEY:if(parent>FuPriority.EQUALITY)this.writeChar(40);this.#startMethodCall(obj);this.write("count(");this.writeStronglyCoerced(obj.type.asClassType().getKeyType(),args[0]);this.write(") != 0");if(parent>FuPriority.EQUALITY)this.writeChar(41);break;case FuId.TEXT_WRITER_WRITE:this.#writeCollectionObject(obj,FuPriority.SHIFT);this.#writeWrite(args,false);break;case FuId.TEXT_WRITER_WRITE_CHAR:this.#writeCollectionObject(obj,FuPriority.SHIFT);this.write(" << ");let literalChar;if((literalChar=args[0])instanceof FuLiteralChar&&literalChar.value<127)args[0].accept(this,FuPriority.MUL);else this.writeCall("static_cast<char>",args[0]);break;case FuId.TEXT_WRITER_WRITE_CODE_POINT:let literalChar2;if((literalChar2=args[0])instanceof FuLiteralChar&&literalChar2.value<127){this.#writeCollectionObject(obj,FuPriority.SHIFT);this.write(" << ");args[0].accept(this,FuPriority.MUL);}else {this.write("if (");args[0].accept(this,FuPriority.REL);this.writeLine(" < 0x80)");this.writeChar(9);this.#writeCollectionObject(obj,FuPriority.SHIFT);this.write(" << ");this.writeCall("static_cast<char>",args[0]);this.writeCharLine(59);this.write("else if (");args[0].accept(this,FuPriority.REL);this.writeLine(" < 0x800)");this.writeChar(9);this.#writeCollectionObject(obj,FuPriority.SHIFT);this.write(" << static_cast<char>(0xc0 | ");args[0].accept(this,FuPriority.SHIFT);this.write(" >> 6) << static_cast<char>(0x80 | (");args[0].accept(this,FuPriority.AND);this.writeLine(" & 0x3f));");this.write("else if (");args[0].accept(this,FuPriority.REL);this.writeLine(" < 0x10000)");this.writeChar(9);this.#writeCollectionObject(obj,FuPriority.SHIFT);this.write(" << static_cast<char>(0xe0 | ");args[0].accept(this,FuPriority.SHIFT);this.write(" >> 12) << static_cast<char>(0x80 | (");args[0].accept(this,FuPriority.SHIFT);this.write(" >> 6 & 0x3f)) << static_cast<char>(0x80 | (");args[0].accept(this,FuPriority.AND);this.writeLine(" & 0x3f));");this.writeLine("else");this.writeChar(9);this.#writeCollectionObject(obj,FuPriority.SHIFT);this.write(" << static_cast<char>(0xf0 | ");args[0].accept(this,FuPriority.SHIFT);this.write(" >> 18) << static_cast<char>(0x80 | (");args[0].accept(this,FuPriority.SHIFT);this.write(" >> 12 & 0x3f)) << static_cast<char>(0x80 | (");args[0].accept(this,FuPriority.SHIFT);this.write(" >> 6 & 0x3f)) << static_cast<char>(0x80 | (");args[0].accept(this,FuPriority.AND);this.write(" & 0x3f))");}break;case FuId.TEXT_WRITER_WRITE_LINE:this.#writeCollectionObject(obj,FuPriority.SHIFT);this.#writeWrite(args,true);break;case FuId.STRING_WRITER_CLEAR:this.include("string");this.#startMethodCall(obj);this.write("str(std::string())");break;case FuId.CONSOLE_WRITE:this.write("std::cout");this.#writeWrite(args,false);break;case FuId.CONSOLE_WRITE_LINE:this.write("std::cout");this.#writeWrite(args,true);break;case FuId.STRING_WRITER_TO_STRING:this.#startMethodCall(obj);this.write("str()");break;case FuId.U_T_F8_GET_BYTE_COUNT:if(args[0]instanceof FuLiteral){if(parent>FuPriority.ADD)this.writeChar(40);this.write("sizeof(");args[0].accept(this,FuPriority.ARGUMENT);this.write(") - 1");if(parent>FuPriority.ADD)this.writeChar(41);}else this.writeStringLength(args[0]);break;case FuId.U_T_F8_GET_BYTES:if(args[0]instanceof FuLiteral){this.include("algorithm");this.write("std::copy_n(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", sizeof(");args[0].accept(this,FuPriority.ARGUMENT);this.write(") - 1, ");this.writeArrayPtrAdd(args[1],args[2]);this.writeChar(41);}else {this.writePostfix(args[0],".copy(reinterpret_cast<char *>(");this.writeArrayPtrAdd(args[1],args[2]);this.write("), ");this.writePostfix(args[0],".size())");}break;case FuId.U_T_F8_GET_STRING:this.include("string_view");this.write("std::string_view(reinterpret_cast<const char *>(");this.writeArrayPtrAdd(args[0],args[1]);this.write("), ");args[2].accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.ENVIRONMENT_GET_ENVIRONMENT_VARIABLE:this.include("cstdlib");this.write("std::getenv(");this.#writeCString(args[0]);this.writeChar(41);break;case FuId.REGEX_COMPILE:this.#writeRegex(args,0);break;case FuId.REGEX_IS_MATCH_STR:case FuId.REGEX_IS_MATCH_REGEX:case FuId.MATCH_FIND_STR:case FuId.MATCH_FIND_REGEX:this.write("std::regex_search(");if(args[0].type.id==FuId.STRING_PTR_TYPE&&!(args[0]instanceof FuLiteral))this.#writeBeginEnd(args[0]);else args[0].accept(this,FuPriority.ARGUMENT);if(method.id==FuId.MATCH_FIND_STR||method.id==FuId.MATCH_FIND_REGEX){this.write(", ");obj.accept(this,FuPriority.ARGUMENT);}this.write(", ");if(method.id==FuId.REGEX_IS_MATCH_REGEX)this.#writeRegexArgument(obj);else if(method.id==FuId.MATCH_FIND_REGEX)this.#writeRegexArgument(args[1]);else this.#writeRegex(args,1);this.writeChar(41);break;case FuId.MATCH_GET_CAPTURE:this.#startMethodCall(obj);this.writeCall("str",args[0]);break;case FuId.MATH_METHOD:case FuId.MATH_ABS:case FuId.MATH_IS_FINITE:case FuId.MATH_IS_NA_N:case FuId.MATH_LOG2:case FuId.MATH_ROUND:this.includeMath();this.write("std::");this.writeLowercase(method.name);this.writeArgsInParentheses(method,args);break;case FuId.MATH_CEILING:this.includeMath();this.writeCall("std::ceil",args[0]);break;case FuId.MATH_CLAMP:this.include("algorithm");this.writeCall("std::clamp",args[0],args[1],args[2]);break;case FuId.MATH_FUSED_MULTIPLY_ADD:this.includeMath();this.writeCall("std::fma",args[0],args[1],args[2]);break;case FuId.MATH_IS_INFINITY:this.includeMath();this.writeCall("std::isinf",args[0]);break;case FuId.MATH_MAX_INT:case FuId.MATH_MAX_DOUBLE:this.include("algorithm");this.writeCall("std::max",args[0],args[1]);break;case FuId.MATH_MIN_INT:case FuId.MATH_MIN_DOUBLE:this.include("algorithm");this.writeCall("std::min",args[0],args[1]);break;case FuId.MATH_TRUNCATE:this.includeMath();this.writeCall("std::trunc",args[0]);break;default:this.notSupported(obj,method.name);break;}}writeResource(name,length){this.write("FuResource::");this.writeResourceName(name);}writeArrayPtr(expr,parent){let klass;if(expr.type instanceof FuArrayStorageType||expr.type instanceof FuStringType)this.writePostfix(expr,".data()");else if(expr.type instanceof FuDynamicPtrType)this.writePostfix(expr,".get()");else if((klass=expr.type)instanceof FuClassType&&klass.class.id==FuId.LIST_CLASS){this.#startMethodCall(expr);this.write("begin()");}else expr.accept(this,parent);}writeCoercedInternal(type,expr,parent){let klass;if((klass=type)instanceof FuClassType&&!(klass instanceof FuDynamicPtrType)&&!(klass instanceof FuStorageType)){if(klass.class.id==FuId.STRING_CLASS){if(expr.type.id==FuId.NULL_TYPE){this.include("string_view");this.write("std::string_view()");}else expr.accept(this,parent);return;}if(klass.class.id==FuId.ARRAY_PTR_CLASS){this.writeArrayPtr(expr,parent);return;}if(GenCpp.#isSharedPtr(expr)){if(klass.class.id==FuId.REGEX_CLASS){this.writeChar(38);expr.accept(this,FuPriority.PRIMARY);}else this.writePostfix(expr,".get()");return;}if(expr.type instanceof FuClassType&&!GenCpp.#isCppPtr(expr)){this.writeChar(38);if(expr instanceof FuCallExpr){this.write("static_cast<");if(!(klass instanceof FuReadWriteClassType))this.write("const ");this.writeName(klass.class);this.write(" &>(");expr.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}else expr.accept(this,FuPriority.PRIMARY);return;}}super.writeCoercedInternal(type,expr,parent);}writeSelectValues(type,expr){let trueClass;let falseClass;if((trueClass=expr.onTrue.type)instanceof FuClassType&&(falseClass=expr.onFalse.type)instanceof FuClassType&&!trueClass.class.isSameOrBaseOf(falseClass.class)&&!falseClass.class.isSameOrBaseOf(trueClass.class)){this.writeStaticCast(type,expr.onTrue);this.write(" : ");this.writeStaticCast(type,expr.onFalse);}else super.writeSelectValues(type,expr);}writeStringLength(expr){this.write("std::ssize(");this.#writeNotRawStringLiteral(expr,FuPriority.ARGUMENT);this.writeChar(41);}#writeMatchProperty(expr,name){this.#startMethodCall(expr.left);this.write(name);this.write("()");}visitSymbolReference(expr,parent){switch(expr.symbol.id){case FuId.CONSOLE_ERROR:this.write("std::cerr");break;case FuId.LIST_COUNT:case FuId.QUEUE_COUNT:case FuId.STACK_COUNT:case FuId.HASH_SET_COUNT:case FuId.SORTED_SET_COUNT:case FuId.DICTIONARY_COUNT:case FuId.SORTED_DICTIONARY_COUNT:case FuId.ORDERED_DICTIONARY_COUNT:this.write("std::ssize(");this.#writeCollectionObject(expr.left,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.MATCH_START:this.#writeMatchProperty(expr,"position");break;case FuId.MATCH_END:if(parent>FuPriority.ADD)this.writeChar(40);this.#writeMatchProperty(expr,"position");this.write(" + ");this.#writeMatchProperty(expr,"length");if(parent>FuPriority.ADD)this.writeChar(41);break;case FuId.MATCH_LENGTH:this.#writeMatchProperty(expr,"length");break;case FuId.MATCH_VALUE:this.#writeMatchProperty(expr,"str");break;default:super.visitSymbolReference(expr,parent);break;}}#writeGtRawPtr(expr){this.write(">(");if(GenCpp.#isSharedPtr(expr))this.writePostfix(expr,".get()");else expr.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}#writeIsVar(expr,def,parent){if(def.name!="_"){if(parent>FuPriority.ASSIGN)this.writeChar(40);this.writeName(def);this.write(" = ");}let dynamic;if((dynamic=def.type)instanceof FuDynamicPtrType){this.write("std::dynamic_pointer_cast<");this.write(dynamic.class.name);this.writeCall(">",expr);}else {this.write("dynamic_cast<");this.writeType(def.type,true);this.#writeGtRawPtr(expr);}if(def.name!="_"&&parent>FuPriority.ASSIGN)this.writeChar(41);}visitBinaryExpr(expr,parent){switch(expr.op){case FuToken.PLUS:if(expr.type.id==FuId.STRING_STORAGE_TYPE){if(parent>FuPriority.ADD)this.writeChar(40);this.writeStronglyCoerced(expr.type,expr.left);this.write(" + ");this.writeStronglyCoerced(expr.type,expr.right);if(parent>FuPriority.ADD)this.writeChar(41);return;}break;case FuToken.EQUAL:case FuToken.NOT_EQUAL:case FuToken.GREATER:let str=GenCpp.isStringEmpty(expr);if(str!=null){if(expr.op!=FuToken.EQUAL)this.writeChar(33);this.writePostfix(str,".empty()");return;}break;case FuToken.ASSIGN:let length=GenCpp.isTrimSubstring(expr);if(length!=null&&expr.left.type.id==FuId.STRING_STORAGE_TYPE&&parent==FuPriority.STATEMENT){this.writeMethodCall(expr.left,"resize",length);return;}break;case FuToken.IS:if(expr.right instanceof FuSymbolReference){const symbol=expr.right;if(parent>=FuPriority.OR&&parent<=FuPriority.MUL)this.write("!!");this.write("dynamic_cast<const ");this.write(symbol.symbol.name);this.write(" *");this.#writeGtRawPtr(expr.left);return;}else if(expr.right instanceof FuVar){const def=expr.right;this.#writeIsVar(expr.left,def,parent);return;}else throw new Error();}super.visitBinaryExpr(expr,parent);}visitLambdaExpr(expr){this.write("[](const ");this.writeType(expr.first.type,false);this.write(" &");this.writeName(expr.first);this.write(") { ");this.writeTemporaries(expr.body);this.write("return ");expr.body.accept(this,FuPriority.ARGUMENT);this.write("; }");}writeUnreachable(statement){this.include("cstdlib");this.write("std::");super.writeUnreachable(statement);}writeConst(konst){this.write("static constexpr ");this.writeTypeAndName(konst);this.write(" = ");konst.value.accept(this,FuPriority.ARGUMENT);this.writeCharLine(59);}visitForeach(statement){let element=statement.getVar();this.write("for (");if(statement.count()==2){this.write("const auto &[");this.#writeCamelCaseNotKeyword(element.name);this.write(", ");this.#writeCamelCaseNotKeyword(statement.getValueVar().name);this.writeChar(93);}else {if(statement.collection.type.asClassType().getElementType()instanceof FuStorageType){const storage=statement.collection.type.asClassType().getElementType();if(!(element.type instanceof FuReadWriteClassType))this.write("const ");this.write(storage.class.name);this.write(" &");this.#writeCamelCaseNotKeyword(element.name);}else if(statement.collection.type.asClassType().getElementType()instanceof FuDynamicPtrType){const dynamic=statement.collection.type.asClassType().getElementType();this.write("const ");this.writeType(dynamic,true);this.write(" &");this.#writeCamelCaseNotKeyword(element.name);}else this.writeTypeAndName(element);}this.write(" : ");if(statement.collection.type instanceof FuStringType)this.#writeNotRawStringLiteral(statement.collection,FuPriority.ARGUMENT);else this.#writeCollectionObject(statement.collection,FuPriority.ARGUMENT);this.writeChar(41);this.writeChild(statement.body);}embedIfWhileIsVar(expr,write){let binary;let def;if((binary=expr)instanceof FuBinaryExpr&&binary.op==FuToken.IS&&(def=binary.right)instanceof FuVar){if(write)this.writeType(def.type,true);return true;}return false;}visitLock(statement){this.openBlock();this.write("const std::lock_guard<std::recursive_mutex> lock(");statement.lock.accept(this,FuPriority.ARGUMENT);this.writeLine(");");this.flattenBlock(statement.body);this.closeBlock();}writeStronglyCoerced(type,expr){if(type.id==FuId.STRING_STORAGE_TYPE&&expr.type.id==FuId.STRING_PTR_TYPE&&!(expr instanceof FuLiteral)){this.write("std::string(");expr.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}else {let call=GenCpp.isStringSubstring(expr);if(call!=null&&type.id==FuId.STRING_STORAGE_TYPE&&GenCpp.getStringSubstringPtr(call).type.id!=FuId.STRING_STORAGE_TYPE){this.write("std::string(");let cast=GenCpp.isUTF8GetString(call);if(cast)this.write("reinterpret_cast<const char *>(");this.writeStringPtrAdd(call);if(cast)this.writeChar(41);this.write(", ");GenCpp.getStringSubstringLength(call).accept(this,FuPriority.ARGUMENT);this.writeChar(41);}else super.writeStronglyCoerced(type,expr);}}writeSwitchCaseCond(statement,value,parent){let def;if((def=value)instanceof FuVar){if(parent==FuPriority.ARGUMENT&&def.name!="_")this.writeType(def.type,true);this.#writeIsVar(statement.value,def,parent);}else super.writeSwitchCaseCond(statement,value,parent);}static#isIsVar(expr){let binary;return (binary=expr)instanceof FuBinaryExpr&&binary.op==FuToken.IS&&binary.right instanceof FuVar;}#hasVariables(statement){if(statement instanceof FuVar)return true;else if(statement instanceof FuAssert){const asrt=statement;return GenCpp.#isIsVar(asrt.cond);}else if(statement instanceof FuBlock||statement instanceof FuBreak||statement instanceof FuConst||statement instanceof FuContinue||statement instanceof FuLock||statement instanceof FuNative||statement instanceof FuThrow)return false;else if(statement instanceof FuIf){const ifStatement=statement;return GenCpp.hasTemporaries(ifStatement.cond)&&!GenCpp.#isIsVar(ifStatement.cond);}else if(statement instanceof FuLoop){const loop=statement;return loop.cond!=null&&GenCpp.hasTemporaries(loop.cond);}else if(statement instanceof FuReturn){const ret=statement;return ret.value!=null&&GenCpp.hasTemporaries(ret.value);}else if(statement instanceof FuSwitch){const switch_=statement;return GenCpp.hasTemporaries(switch_.value);}else if(statement instanceof FuExpr){const expr=statement;return GenCpp.hasTemporaries(expr);}else throw new Error();}writeSwitchCaseBody(statements){let block=false;for(const statement of statements){if(!block&&this.#hasVariables(statement)){this.openBlock();block=true;}statement.acceptStatement(this);}if(block)this.closeBlock();}visitSwitch(statement){if(statement.isTypeMatching())this.writeSwitchAsIfsWithGoto(statement);else super.visitSwitch(statement);}visitThrow(statement){this.include("exception");this.writeLine("throw std::exception();");}#openNamespace(){if(this.namespace.length==0)return;this.writeNewLine();this.write("namespace ");this.writeLine(this.namespace);this.writeCharLine(123);}#closeNamespace(){if(this.namespace.length!=0)this.writeCharLine(125);}writeEnum(enu){this.writeNewLine();this.writeDoc(enu.documentation);this.write("enum class ");this.writeLine(enu.name);this.openBlock();enu.acceptValues(this);this.writeNewLine();this.indent--;this.writeLine("};");if(enu instanceof FuEnumFlags){this.include("type_traits");this.#hasEnumFlags=true;this.write("FU_ENUM_FLAG_OPERATORS(");this.write(enu.name);this.writeCharLine(41);}}static#getConstructorVisibility(klass){switch(klass.callType){case FuCallType.STATIC:return FuVisibility.PRIVATE;case FuCallType.ABSTRACT:return FuVisibility.PROTECTED;default:return FuVisibility.PUBLIC;}}static#hasMembersOfVisibility(klass,visibility){for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let member;if((member=symbol)instanceof FuMember&&member.visibility==visibility)return true;}return false;}writeField(field){this.writeDoc(field.documentation);this.writeVar(field);this.writeCharLine(59);}#writeParametersAndConst(method,defaultArguments){this.writeParameters(method,defaultArguments);if(method.callType!=FuCallType.STATIC&&!method.isMutator)this.write(" const");}#writeDeclarations(klass,visibility,visibilityKeyword){let constructor=GenCpp.#getConstructorVisibility(klass)==visibility;let destructor=visibility==FuVisibility.PUBLIC&&(klass.hasSubclasses||klass.addsVirtualMethods());if(!constructor&&!destructor&&!GenCpp.#hasMembersOfVisibility(klass,visibility))return;this.write(visibilityKeyword);this.writeCharLine(58);this.indent++;if(constructor){if(klass.constructor_!=null)this.writeDoc(klass.constructor_.documentation);this.write(klass.name);this.write("()");if(klass.callType==FuCallType.STATIC)this.write(" = delete");else if(!this.needsConstructor(klass))this.write(" = default");this.writeCharLine(59);}if(destructor){this.write("virtual ~");this.write(klass.name);this.writeLine("() = default;");}for(let symbol=klass.first;symbol!=null;symbol=symbol.next){let member;if(!((member=symbol)instanceof FuMember)||member.visibility!=visibility)continue;if(member instanceof FuConst){const konst=member;this.writeDoc(konst.documentation);this.writeConst(konst);}else if(member instanceof FuField){const field=member;this.writeField(field);}else if(member instanceof FuMethod){const method=member;this.writeMethodDoc(method);switch(method.callType){case FuCallType.STATIC:this.write("static ");break;case FuCallType.ABSTRACT:case FuCallType.VIRTUAL:this.write("virtual ");break;}this.writeTypeAndName(method);this.#writeParametersAndConst(method,true);switch(method.callType){case FuCallType.ABSTRACT:this.write(" = 0");break;case FuCallType.OVERRIDE:this.write(" override");break;case FuCallType.SEALED:this.write(" final");break;}this.writeCharLine(59);}else throw new Error();}this.indent--;}writeClassInternal(klass){this.writeNewLine();this.writeDoc(klass.documentation);this.openClass(klass,klass.callType==FuCallType.SEALED?" final":""," : public ");this.indent--;this.#writeDeclarations(klass,FuVisibility.PUBLIC,"public");this.#writeDeclarations(klass,FuVisibility.PROTECTED,"protected");this.#writeDeclarations(klass,FuVisibility.INTERNAL,"public");this.#writeDeclarations(klass,FuVisibility.PRIVATE,"private");this.writeLine("};");}#writeConstructor(klass){if(!this.needsConstructor(klass))return;this.switchesWithGoto.length=0;this.write(klass.name);this.write("::");this.write(klass.name);this.writeLine("()");this.openBlock();this.writeConstructorBody(klass);this.closeBlock();}writeMethod(method){if(method.callType==FuCallType.ABSTRACT)return;this.switchesWithGoto.length=0;this.writeNewLine();this.writeType(method.type,true);this.writeChar(32);this.write(method.parent.name);this.write("::");this.#writeCamelCaseNotKeyword(method.name);this.#writeParametersAndConst(method,false);this.writeBody(method);}#writeResources(resources,define){if(Object.keys(resources).length==0)return;this.writeNewLine();this.writeLine("namespace");this.openBlock();this.writeLine("namespace FuResource");this.openBlock();for(const[name,content]of Object.entries(resources).sort((a,b)=>a[0].localeCompare(b[0]))){if(!define)this.write("extern ");this.include("array");this.include("cstdint");this.write("const std::array<uint8_t, ");this.visitLiteralLong(BigInt(content.length));this.write("> ");this.writeResourceName(name);if(define){this.writeLine(" = {");this.writeChar(9);this.writeBytes(content);this.write(" }");}this.writeCharLine(59);}this.closeBlock();this.closeBlock();}writeProgram(program){this.writtenClasses.clear();this.inHeaderFile=true;this.#usingStringViewLiterals=false;this.#hasEnumFlags=false;this.#stringReplace=false;this.openStringWriter();this.#openNamespace();this.writeRegexOptionsEnum(program);for(let type=program.first;type!=null;type=type.next){let enu;if((enu=type)instanceof FuEnum)this.writeEnum(enu);else {this.write("class ");this.write(type.name);this.writeCharLine(59);}}for(const klass of program.classes)this.writeClass(klass,program);this.#closeNamespace();this.createHeaderFile(".hpp");if(this.#hasEnumFlags){this.writeLine("#define FU_ENUM_FLAG_OPERATORS(T) \\");this.writeLine("\tinline constexpr T operator~(T a) { return static_cast<T>(~static_cast<std::underlying_type_t<T>>(a)); } \\");this.writeLine("\tinline constexpr T operator&(T a, T b) { return static_cast<T>(static_cast<std::underlying_type_t<T>>(a) & static_cast<std::underlying_type_t<T>>(b)); } \\");this.writeLine("\tinline constexpr T operator|(T a, T b) { return static_cast<T>(static_cast<std::underlying_type_t<T>>(a) | static_cast<std::underlying_type_t<T>>(b)); } \\");this.writeLine("\tinline constexpr T operator^(T a, T b) { return static_cast<T>(static_cast<std::underlying_type_t<T>>(a) ^ static_cast<std::underlying_type_t<T>>(b)); } \\");this.writeLine("\tinline constexpr T &operator&=(T &a, T b) { return (a = a & b); } \\");this.writeLine("\tinline constexpr T &operator|=(T &a, T b) { return (a = a | b); } \\");this.writeLine("\tinline constexpr T &operator^=(T &a, T b) { return (a = a ^ b); }");}this.closeStringWriter();this.closeFile();this.inHeaderFile=false;this.openStringWriter();this.#writeResources(program.resources,false);this.#openNamespace();for(const klass of program.classes){this.#writeConstructor(klass);this.writeMethods(klass);}this.#writeResources(program.resources,true);this.#closeNamespace();if(this.#stringReplace){this.include("string");this.include("string_view");}this.createImplementationFile(program,".hpp");if(this.#usingStringViewLiterals)this.writeLine("using namespace std::string_view_literals;");if(this.#stringReplace){this.writeNewLine();this.writeLine("static std::string FuString_replace(std::string_view s, std::string_view oldValue, std::string_view newValue)");this.openBlock();this.writeLine("std::string result;");this.writeLine("result.reserve(s.size());");this.writeLine("for (std::string_view::size_type i = 0;;) {");this.writeLine("\tauto j = s.find(oldValue, i);");this.writeLine("\tif (j == std::string::npos) {");this.writeLine("\t\tresult.append(s, i);");this.writeLine("\t\treturn result;");this.writeLine("\t}");this.writeLine("\tresult.append(s, i, j - i);");this.writeLine("\tresult.append(newValue);");this.writeLine("\ti = j + oldValue.size();");this.writeCharLine(125);this.closeBlock();}this.closeStringWriter();this.closeFile();}}class GenCs extends GenTyped{getTargetName(){return "C++";}startDocLine(){this.write("/// ");}writeDocPara(para,many){if(many){this.writeNewLine();this.write("/// <para>");}for(const inline of para.children){if(inline instanceof FuDocText){const text=inline;this.writeXmlDoc(text.text);}else if(inline instanceof FuDocCode){const code=inline;switch(code.text){case"true":case"false":case"null":this.write("<see langword=\"");this.write(code.text);this.write("\" />");break;default:this.write("<c>");this.writeXmlDoc(code.text);this.write("</c>");break;}}else if(inline instanceof FuDocLine){this.writeNewLine();this.startDocLine();}else throw new Error();}if(many)this.write("</para>");}writeDocList(list){this.writeNewLine();this.writeLine("/// <list type=\"bullet\">");for(const item of list.items){this.write("/// <item>");this.writeDocPara(item,false);this.writeLine("</item>");}this.write("/// </list>");}writeDoc(doc){if(doc==null)return;this.write("/// <summary>");this.writeDocPara(doc.summary,false);this.writeLine("</summary>");if(doc.details.length>0){this.write("/// <remarks>");if(doc.details.length==1)this.writeDocBlock(doc.details[0],false);else {for(const block of doc.details)this.writeDocBlock(block,true);}this.writeLine("</remarks>");}}writeName(symbol){let konst;if((konst=symbol)instanceof FuConst&&konst.inMethod!=null)this.write(konst.inMethod.name);this.write(symbol.name);switch(symbol.name){case"as":case"await":case"catch":case"char":case"checked":case"decimal":case"delegate":case"event":case"explicit":case"extern":case"finally":case"fixed":case"goto":case"implicit":case"interface":case"is":case"lock":case"namespace":case"object":case"operator":case"out":case"params":case"private":case"readonly":case"ref":case"sbyte":case"sizeof":case"stackalloc":case"struct":case"try":case"typeof":case"ulong":case"unchecked":case"unsafe":case"using":case"volatile":this.writeChar(95);break;}}getLiteralChars(){return 65536;}#writeVisibility(visibility){switch(visibility){case FuVisibility.PRIVATE:break;case FuVisibility.INTERNAL:this.write("internal ");break;case FuVisibility.PROTECTED:this.write("protected ");break;case FuVisibility.PUBLIC:this.write("public ");break;default:throw new Error();}}#writeCallType(callType,sealedString){switch(callType){case FuCallType.STATIC:this.write("static ");break;case FuCallType.NORMAL:break;case FuCallType.ABSTRACT:this.write("abstract ");break;case FuCallType.VIRTUAL:this.write("virtual ");break;case FuCallType.OVERRIDE:this.write("override ");break;case FuCallType.SEALED:this.write(sealedString);break;}}#writeElementType(elementType){this.include("System.Collections.Generic");this.writeChar(60);this.writeType(elementType,false);this.writeChar(62);}writeType(type,promote){if(type instanceof FuIntegerType){switch(this.getTypeId(type,promote)){case FuId.S_BYTE_RANGE:this.write("sbyte");break;case FuId.BYTE_RANGE:this.write("byte");break;case FuId.SHORT_RANGE:this.write("short");break;case FuId.U_SHORT_RANGE:this.write("ushort");break;case FuId.INT_TYPE:this.write("int");break;case FuId.LONG_TYPE:this.write("long");break;default:throw new Error();}}else if(type instanceof FuClassType){const klass=type;switch(klass.class.id){case FuId.STRING_CLASS:this.write("string");break;case FuId.ARRAY_PTR_CLASS:case FuId.ARRAY_STORAGE_CLASS:this.writeType(klass.getElementType(),false);this.write("[]");break;case FuId.LIST_CLASS:case FuId.QUEUE_CLASS:case FuId.STACK_CLASS:case FuId.HASH_SET_CLASS:case FuId.SORTED_SET_CLASS:this.write(klass.class.name);this.#writeElementType(klass.getElementType());break;case FuId.DICTIONARY_CLASS:case FuId.SORTED_DICTIONARY_CLASS:this.include("System.Collections.Generic");this.write(klass.class.name);this.writeChar(60);this.writeType(klass.getKeyType(),false);this.write(", ");this.writeType(klass.getValueType(),false);this.writeChar(62);break;case FuId.ORDERED_DICTIONARY_CLASS:this.include("System.Collections.Specialized");this.write("OrderedDictionary");break;case FuId.TEXT_WRITER_CLASS:case FuId.STRING_WRITER_CLASS:this.include("System.IO");this.write(klass.class.name);break;case FuId.REGEX_CLASS:case FuId.MATCH_CLASS:this.include("System.Text.RegularExpressions");this.write(klass.class.name);break;case FuId.LOCK_CLASS:this.write("object");break;default:this.write(klass.class.name);break;}}else this.write(type.name);}writeNewWithFields(type,init){this.write("new ");this.writeType(type,false);this.writeObjectLiteral(init," = ");}writeCoercedLiteral(type,expr){let range;if(expr instanceof FuLiteralChar&&(range=type)instanceof FuRangeType&&range.max<=255)this.writeStaticCast(type,expr);else super.writeCoercedLiteral(type,expr);}isPromoted(expr){return super.isPromoted(expr)||expr instanceof FuLiteralChar;}visitInterpolatedString(expr,parent){this.write("$\"");for(const part of expr.parts){this.writeDoubling(part.prefix,123);this.writeChar(123);part.argument.accept(this,FuPriority.ARGUMENT);if(part.widthExpr!=null){this.writeChar(44);this.visitLiteralLong(BigInt(part.width));}if(part.format!=32){this.writeChar(58);this.writeChar(part.format);if(part.precision>=0)this.visitLiteralLong(BigInt(part.precision));}this.writeChar(125);}this.writeDoubling(expr.suffix,123);this.writeChar(34);}writeNewArray(elementType,lengthExpr,parent){this.write("new ");this.writeType(elementType.getBaseType(),false);this.writeChar(91);lengthExpr.accept(this,FuPriority.ARGUMENT);this.writeChar(93);let array;while((array=elementType)instanceof FuClassType&&array.isArray()){this.write("[]");elementType=array.getElementType();}}writeNew(klass,parent){this.write("new ");this.writeType(klass,false);this.write("()");}hasInitCode(def){let array;return (array=def.type)instanceof FuArrayStorageType&&array.getElementType()instanceof FuStorageType;}writeInitCode(def){if(!this.hasInitCode(def))return;let array=def.type;let nesting=0;let innerArray;while((innerArray=array.getElementType())instanceof FuArrayStorageType){this.openLoop("int",nesting++,array.length);this.writeArrayElement(def,nesting);this.write(" = ");this.writeNewArray(innerArray.getElementType(),innerArray.lengthExpr,FuPriority.ARGUMENT);this.writeCharLine(59);array=innerArray;}let klass;if((klass=array.getElementType())instanceof FuStorageType){this.openLoop("int",nesting++,array.length);this.writeArrayElement(def,nesting);this.write(" = ");this.writeNew(klass,FuPriority.ARGUMENT);this.writeCharLine(59);}while(--nesting>=0)this.closeBlock();}writeResource(name,length){this.write("FuResource.");this.writeResourceName(name);}writeStringLength(expr){this.writePostfix(expr,".Length");}visitSymbolReference(expr,parent){switch(expr.symbol.id){case FuId.CONSOLE_ERROR:this.include("System");this.write("Console.Error");break;case FuId.MATCH_START:this.writePostfix(expr.left,".Index");break;case FuId.MATCH_END:if(parent>FuPriority.ADD)this.writeChar(40);this.writePostfix(expr.left,".Index + ");this.writeStringLength(expr.left);if(parent>FuPriority.ADD)this.writeChar(41);break;case FuId.MATH_NA_N:case FuId.MATH_NEGATIVE_INFINITY:case FuId.MATH_POSITIVE_INFINITY:this.write("float.");this.write(expr.symbol.name);break;default:let forEach;let dict;if((forEach=expr.symbol.parent)instanceof FuForeach&&(dict=forEach.collection.type)instanceof FuClassType&&dict.class.id==FuId.ORDERED_DICTIONARY_CLASS){if(parent==FuPriority.PRIMARY)this.writeChar(40);let element=forEach.getVar();if(expr.symbol==element){this.writeStaticCastType(dict.getKeyType());this.writeName(element);this.write(".Key");}else {this.writeStaticCastType(dict.getValueType());this.writeName(element);this.write(".Value");}if(parent==FuPriority.PRIMARY)this.writeChar(41);}else super.visitSymbolReference(expr,parent);break;}}writeCallExpr(obj,method,args,parent){switch(method.id){case FuId.ENUM_FROM_INT:this.writeStaticCast(method.type,args[0]);break;case FuId.INT_TRY_PARSE:case FuId.LONG_TRY_PARSE:case FuId.DOUBLE_TRY_PARSE:this.write(obj.type.name);this.write(".TryParse(");args[0].accept(this,FuPriority.ARGUMENT);if(args.length==2){let radix;if(!((radix=args[1])instanceof FuLiteralLong)||radix.value!=16)this.notSupported(args[1],"Radix");this.include("System.Globalization");this.write(", NumberStyles.HexNumber, null");}this.write(", out ");obj.accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.STRING_INDEX_OF:case FuId.STRING_LAST_INDEX_OF:obj.accept(this,FuPriority.PRIMARY);this.writeChar(46);this.write(method.name);this.writeChar(40);let c=this.getOneAscii(args[0]);if(c>=0)this.visitLiteralChar(c);else args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.ARRAY_BINARY_SEARCH_ALL:case FuId.ARRAY_BINARY_SEARCH_PART:this.include("System");this.write("Array.BinarySearch(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");if(args.length==3){args[1].accept(this,FuPriority.ARGUMENT);this.write(", ");args[2].accept(this,FuPriority.ARGUMENT);this.write(", ");}this.writeNotPromoted(obj.type.asClassType().getElementType(),args[0]);this.writeChar(41);break;case FuId.ARRAY_CONTAINS:this.include("System.Linq");this.writeMethodCall(obj,"Contains",args[0]);break;case FuId.ARRAY_COPY_TO:this.include("System");this.write("Array.Copy(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeArgs(method,args);this.writeChar(41);break;case FuId.ARRAY_FILL_ALL:case FuId.ARRAY_FILL_PART:this.include("System");let literal;if((literal=args[0])instanceof FuLiteral&&literal.isDefaultValue()){this.write("Array.Clear(");obj.accept(this,FuPriority.ARGUMENT);if(args.length==1){this.write(", 0, ");this.writeArrayStorageLength(obj);}}else {this.write("Array.Fill(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeNotPromoted(obj.type.asClassType().getElementType(),args[0]);}if(args.length==3){this.write(", ");args[1].accept(this,FuPriority.ARGUMENT);this.write(", ");args[2].accept(this,FuPriority.ARGUMENT);}this.writeChar(41);break;case FuId.ARRAY_SORT_ALL:this.include("System");this.writeCall("Array.Sort",obj);break;case FuId.ARRAY_SORT_PART:this.include("System");this.writeCall("Array.Sort",obj,args[0],args[1]);break;case FuId.LIST_ADD:this.writeListAdd(obj,"Add",args);break;case FuId.LIST_ALL:this.writeMethodCall(obj,"TrueForAll",args[0]);break;case FuId.LIST_ANY:this.writeMethodCall(obj,"Exists",args[0]);break;case FuId.LIST_INSERT:this.writeListInsert(obj,"Insert",args);break;case FuId.LIST_LAST:this.writePostfix(obj,"[^1]");break;case FuId.LIST_SORT_PART:this.writePostfix(obj,".Sort(");this.writeArgs(method,args);this.write(", null)");break;case FuId.DICTIONARY_ADD:this.writePostfix(obj,".Add(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeNewStorage(obj.type.asClassType().getValueType());this.writeChar(41);break;case FuId.ORDERED_DICTIONARY_CONTAINS_KEY:this.writeMethodCall(obj,"Contains",args[0]);break;case FuId.TEXT_WRITER_WRITE:case FuId.TEXT_WRITER_WRITE_LINE:case FuId.CONSOLE_WRITE:case FuId.CONSOLE_WRITE_LINE:this.include("System");obj.accept(this,FuPriority.PRIMARY);this.writeChar(46);this.write(method.name);this.writeChar(40);if(args.length!=0){if(args[0]instanceof FuLiteralChar){this.write("(int) ");args[0].accept(this,FuPriority.PRIMARY);}else args[0].accept(this,FuPriority.ARGUMENT);}this.writeChar(41);break;case FuId.STRING_WRITER_CLEAR:this.writePostfix(obj,".GetStringBuilder().Clear()");break;case FuId.TEXT_WRITER_WRITE_CHAR:this.writeCharMethodCall(obj,"Write",args[0]);break;case FuId.TEXT_WRITER_WRITE_CODE_POINT:this.writePostfix(obj,".Write(");let literalChar;if((literalChar=args[0])instanceof FuLiteralChar&&literalChar.value<65536)args[0].accept(this,FuPriority.ARGUMENT);else {this.include("System.Text");this.writeCall("new Rune",args[0]);}this.writeChar(41);break;case FuId.ENVIRONMENT_GET_ENVIRONMENT_VARIABLE:this.include("System");obj.accept(this,FuPriority.PRIMARY);this.writeChar(46);this.write(method.name);this.writeArgsInParentheses(method,args);break;case FuId.U_T_F8_GET_BYTE_COUNT:this.include("System.Text");this.write("Encoding.UTF8.GetByteCount(");args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.U_T_F8_GET_BYTES:this.include("System.Text");this.write("Encoding.UTF8.GetBytes(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", 0, ");this.writePostfix(args[0],".Length, ");args[1].accept(this,FuPriority.ARGUMENT);this.write(", ");args[2].accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.U_T_F8_GET_STRING:this.include("System.Text");this.write("Encoding.UTF8.GetString");this.writeArgsInParentheses(method,args);break;case FuId.REGEX_COMPILE:this.include("System.Text.RegularExpressions");this.write("new Regex");this.writeArgsInParentheses(method,args);break;case FuId.REGEX_ESCAPE:case FuId.REGEX_IS_MATCH_STR:case FuId.REGEX_IS_MATCH_REGEX:this.include("System.Text.RegularExpressions");obj.accept(this,FuPriority.PRIMARY);this.writeChar(46);this.write(method.name);this.writeArgsInParentheses(method,args);break;case FuId.MATCH_FIND_STR:this.include("System.Text.RegularExpressions");this.writeChar(40);obj.accept(this,FuPriority.ASSIGN);this.write(" = Regex.Match");this.writeArgsInParentheses(method,args);this.write(").Success");break;case FuId.MATCH_FIND_REGEX:this.include("System.Text.RegularExpressions");this.writeChar(40);obj.accept(this,FuPriority.ASSIGN);this.write(" = ");this.writeMethodCall(args[1],"Match",args[0]);this.write(").Success");break;case FuId.MATCH_GET_CAPTURE:this.writePostfix(obj,".Groups[");args[0].accept(this,FuPriority.ARGUMENT);this.write("].Value");break;case FuId.MATH_METHOD:case FuId.MATH_ABS:case FuId.MATH_CEILING:case FuId.MATH_CLAMP:case FuId.MATH_FUSED_MULTIPLY_ADD:case FuId.MATH_LOG2:case FuId.MATH_MAX_INT:case FuId.MATH_MAX_DOUBLE:case FuId.MATH_MIN_INT:case FuId.MATH_MIN_DOUBLE:case FuId.MATH_ROUND:case FuId.MATH_TRUNCATE:this.include("System");this.write("Math.");this.write(method.name);this.writeArgsInParentheses(method,args);break;case FuId.MATH_IS_FINITE:case FuId.MATH_IS_INFINITY:case FuId.MATH_IS_NA_N:this.write("double.");this.writeCall(method.name,args[0]);break;default:if(obj!=null){obj.accept(this,FuPriority.PRIMARY);this.writeChar(46);}this.writeName(method);this.writeArgsInParentheses(method,args);break;}}#writeOrderedDictionaryIndexing(expr){if(expr.right.type.id==FuId.INT_TYPE||expr.right.type instanceof FuRangeType){this.writePostfix(expr.left,"[(object) ");expr.right.accept(this,FuPriority.PRIMARY);this.writeChar(93);}else super.writeIndexingExpr(expr,FuPriority.AND);}writeIndexingExpr(expr,parent){let dict;if((dict=expr.left.type)instanceof FuClassType&&dict.class.id==FuId.ORDERED_DICTIONARY_CLASS){if(parent==FuPriority.PRIMARY)this.writeChar(40);this.writeStaticCastType(expr.type);this.#writeOrderedDictionaryIndexing(expr);if(parent==FuPriority.PRIMARY)this.writeChar(41);}else super.writeIndexingExpr(expr,parent);}writeAssign(expr,parent){let indexing;let dict;if((indexing=expr.left)instanceof FuBinaryExpr&&indexing.op==FuToken.LEFT_BRACKET&&(dict=indexing.left.type)instanceof FuClassType&&dict.class.id==FuId.ORDERED_DICTIONARY_CLASS){this.#writeOrderedDictionaryIndexing(indexing);this.write(" = ");this.writeAssignRight(expr);}else super.writeAssign(expr,parent);}visitBinaryExpr(expr,parent){switch(expr.op){case FuToken.AND_ASSIGN:case FuToken.OR_ASSIGN:case FuToken.XOR_ASSIGN:if(parent>FuPriority.ASSIGN)this.writeChar(40);expr.left.accept(this,FuPriority.ASSIGN);this.writeChar(32);this.write(expr.getOpString());this.writeChar(32);this.writeAssignRight(expr);if(parent>FuPriority.ASSIGN)this.writeChar(41);break;default:super.visitBinaryExpr(expr,parent);break;}}visitLambdaExpr(expr){this.writeName(expr.first);this.write(" => ");expr.body.accept(this,FuPriority.STATEMENT);}defineObjectLiteralTemporary(expr){}defineIsVar(binary){}writeAssert(statement){if(statement.completesNormally()){this.include("System.Diagnostics");this.write("Debug.Assert(");statement.cond.accept(this,FuPriority.ARGUMENT);if(statement.message!=null){this.write(", ");statement.message.accept(this,FuPriority.ARGUMENT);}}else {this.include("System");this.write("throw new NotImplementedException(");if(statement.message!=null)statement.message.accept(this,FuPriority.ARGUMENT);}this.writeLine(");");}visitForeach(statement){this.write("foreach (");let dict;if((dict=statement.collection.type)instanceof FuClassType&&dict.class.typeParameterCount==2){if(dict.class.id==FuId.ORDERED_DICTIONARY_CLASS){this.include("System.Collections");this.write("DictionaryEntry ");this.writeName(statement.getVar());}else {this.writeChar(40);this.writeTypeAndName(statement.getVar());this.write(", ");this.writeTypeAndName(statement.getValueVar());this.writeChar(41);}}else this.writeTypeAndName(statement.getVar());this.write(" in ");statement.collection.accept(this,FuPriority.ARGUMENT);this.writeChar(41);this.writeChild(statement.body);}visitLock(statement){this.writeCall("lock ",statement.lock);this.writeChild(statement.body);}visitThrow(statement){this.include("System");this.write("throw new Exception(");statement.message.accept(this,FuPriority.ARGUMENT);this.writeLine(");");}writeEnum(enu){this.writeNewLine();this.writeDoc(enu.documentation);if(enu instanceof FuEnumFlags){this.include("System");this.writeLine("[Flags]");}this.writePublic(enu);this.write("enum ");this.writeLine(enu.name);this.openBlock();enu.acceptValues(this);this.writeNewLine();this.closeBlock();}writeRegexOptionsEnum(program){if(program.regexOptionsEnum)this.include("System.Text.RegularExpressions");}writeConst(konst){this.writeNewLine();this.writeDoc(konst.documentation);this.#writeVisibility(konst.visibility);this.write(konst.type instanceof FuArrayStorageType?"static readonly ":"const ");this.writeTypeAndName(konst);this.write(" = ");this.writeCoercedExpr(konst.type,konst.value);this.writeCharLine(59);}writeField(field){this.writeNewLine();this.writeDoc(field.documentation);this.#writeVisibility(field.visibility);if(field.type.isFinal()&&!field.isAssignableStorage())this.write("readonly ");this.writeVar(field);this.writeCharLine(59);}writeParameterDoc(param,first){this.write("/// <param name=\"");this.writeName(param);this.write("\">");this.writeDocPara(param.documentation.summary,false);this.writeLine("</param>");}writeMethod(method){if(method.id==FuId.CLASS_TO_STRING&&method.callType==FuCallType.ABSTRACT)return;this.writeNewLine();this.writeDoc(method.documentation);this.writeParametersDoc(method);this.#writeVisibility(method.visibility);if(method.id==FuId.CLASS_TO_STRING)this.write("override ");else this.#writeCallType(method.callType,"sealed override ");this.writeTypeAndName(method);this.writeParameters(method,true);let ret;if((ret=method.body)instanceof FuReturn){this.write(" => ");this.writeCoerced(method.type,ret.value,FuPriority.ARGUMENT);this.writeCharLine(59);}else this.writeBody(method);}writeClass(klass,program){this.writeNewLine();this.writeDoc(klass.documentation);this.writePublic(klass);this.#writeCallType(klass.callType,"sealed ");this.openClass(klass,""," : ");if(this.needsConstructor(klass)){if(klass.constructor_!=null){this.writeDoc(klass.constructor_.documentation);this.#writeVisibility(klass.constructor_.visibility);}else this.write("internal ");this.write(klass.name);this.writeLine("()");this.openBlock();this.writeConstructorBody(klass);this.closeBlock();}this.writeMembers(klass,true);this.closeBlock();}#writeResources(resources){this.writeNewLine();this.writeLine("internal static class FuResource");this.openBlock();for(const[name,content]of Object.entries(resources).sort((a,b)=>a[0].localeCompare(b[0]))){this.write("internal static readonly byte[] ");this.writeResourceName(name);this.writeLine(" = {");this.writeChar(9);this.writeBytes(content);this.writeLine(" };");}this.closeBlock();}writeProgram(program){this.openStringWriter();if(this.namespace.length!=0){this.write("namespace ");this.writeLine(this.namespace);this.openBlock();}this.writeTopLevelNatives(program);this.writeTypes(program);if(Object.keys(program.resources).length>0)this.#writeResources(program.resources);if(this.namespace.length!=0)this.closeBlock();this.createOutputFile();this.writeIncludes("using ",";");this.closeStringWriter();this.closeFile();}}class GenD extends GenCCppD{#hasListInsert;#hasListRemoveAt;#hasQueueDequeue;#hasStackPop;#hasSortedDictionaryInsert;#hasSortedDictionaryFind;getTargetName(){return "D";}startDocLine(){this.write("/// ");}writeDocPara(para,many){if(many){this.writeNewLine();this.startDocLine();}for(const inline of para.children){if(inline instanceof FuDocText){const text=inline;this.writeXmlDoc(text.text);}else if(inline instanceof FuDocCode){const code=inline;this.writeChar(96);this.writeXmlDoc(code.text);this.writeChar(96);}else if(inline instanceof FuDocLine){this.writeNewLine();this.startDocLine();}else throw new Error();}if(many)this.writeNewLine();}writeParameterDoc(param,first){if(first){this.startDocLine();this.writeLine("Params:");}this.startDocLine();this.writeName(param);this.write(" = ");this.writeDocPara(param.documentation.summary,false);this.writeNewLine();}writeDocList(list){this.writeLine("///");this.writeLine("/// <ul>");for(const item of list.items){this.write("/// <li>");this.writeDocPara(item,false);this.writeLine("</li>");}this.writeLine("/// </ul>");this.write("///");}writeDoc(doc){if(doc==null)return;this.startDocLine();this.writeDocPara(doc.summary,false);this.writeNewLine();if(doc.details.length>0){this.startDocLine();if(doc.details.length==1)this.writeDocBlock(doc.details[0],false);else {for(const block of doc.details)this.writeDocBlock(block,true);}this.writeNewLine();}}writeName(symbol){if(symbol instanceof FuContainerType){this.write(symbol.name);return;}this.writeCamelCase(symbol.name);switch(symbol.name){case"Abstract":case"Alias":case"Align":case"Asm":case"Assert":case"Auto":case"Body":case"Bool":case"Break":case"Byte":case"Case":case"Cast":case"Catch":case"Cdouble":case"Cent":case"Cfloat":case"Char":case"Class":case"Const":case"Continue":case"Creal":case"Dchar":case"Debug":case"Default":case"Delegate":case"Delete":case"Deprecated":case"Do":case"Double":case"Else":case"Enum":case"Export":case"Extern":case"False":case"Final":case"Finally":case"Float":case"For":case"Foreach":case"Foreach_reverse":case"Function":case"Goto":case"Idouble":case"If":case"IfLoat":case"Immutable":case"Import":case"In":case"Inout":case"Int":case"Interface":case"Invariant":case"Ireal":case"Is":case"Lazy":case"Long":case"Macro":case"Mixin":case"Module":case"New":case"Nothrow":case"Null":case"Out":case"Override":case"Package":case"Pragma":case"Private":case"Protected":case"Public":case"Pure":case"Real":case"Ref":case"Return":case"Scope":case"Shared":case"Short":case"Sizeof":case"Static":case"String":case"Struct":case"Super":case"Switch":case"Synchronized":case"Template":case"Throw":case"True":case"Try":case"Typeid":case"Typeof":case"Ubyte":case"Ucent":case"Uint":case"Ulong":case"Union":case"Unittest":case"Ushort":case"Version":case"Void":case"Wchar":case"While":case"With":case"alias":case"align":case"asm":case"auto":case"body":case"cast":case"catch":case"cdouble":case"cent":case"cfloat":case"char":case"creal":case"dchar":case"debug":case"delegate":case"delete":case"deprecated":case"export":case"extern":case"final":case"finally":case"foreach_reverse":case"function":case"goto":case"idouble":case"ifloat":case"immutable":case"import":case"in":case"inout":case"interface":case"invariant":case"ireal":case"lazy":case"macro":case"mixin":case"module":case"nothrow":case"out":case"package":case"pragma":case"private":case"pure":case"real":case"ref":case"scope":case"shared":case"sizeof":case"struct":case"super":case"synchronized":case"template":case"try":case"typeid":case"typeof":case"ubyte":case"ucent":case"uint":case"ulong":case"union":case"unittest":case"ushort":case"version":case"wchar":case"with":case"__FILE__":case"__FILE_FULL_PATH__":case"__MODULE__":case"__LINE__":case"__FUNCTION__":case"__PRETTY_FUNCTION__":case"__gshared":case"__traits":case"__vector":case"__parameters":this.writeChar(95);break;}}getLiteralChars(){return 65536;}#writeVisibility(visibility){switch(visibility){case FuVisibility.PRIVATE:this.write("private ");break;case FuVisibility.INTERNAL:case FuVisibility.PUBLIC:break;case FuVisibility.PROTECTED:this.write("protected ");break;default:throw new Error();}}#writeCallType(callType,sealedString){switch(callType){case FuCallType.STATIC:this.write("static ");break;case FuCallType.NORMAL:break;case FuCallType.ABSTRACT:this.write("abstract ");break;case FuCallType.VIRTUAL:break;case FuCallType.OVERRIDE:this.write("override ");break;case FuCallType.SEALED:this.write(sealedString);break;}}static#isCreateWithNew(type){let klass;if((klass=type)instanceof FuClassType){let stg;if((stg=klass)instanceof FuStorageType)return stg.class.id!=FuId.ARRAY_STORAGE_CLASS;return true;}return false;}static#isTransitiveConst(array){while(!(array instanceof FuReadWriteClassType)){let element;if(!((element=array.getElementType())instanceof FuClassType))return true;if(element.class.id!=FuId.ARRAY_PTR_CLASS)return false;array=element;}return false;}static#isStructPtr(type){let ptr;return (ptr=type)instanceof FuClassType&&(ptr.class.id==FuId.LIST_CLASS||ptr.class.id==FuId.STACK_CLASS||ptr.class.id==FuId.QUEUE_CLASS);}#writeElementType(type){this.writeType(type,false);if(GenD.#isStructPtr(type))this.writeChar(42);}writeType(type,promote){if(type instanceof FuIntegerType){switch(this.getTypeId(type,promote)){case FuId.S_BYTE_RANGE:this.write("byte");break;case FuId.BYTE_RANGE:this.write("ubyte");break;case FuId.SHORT_RANGE:this.write("short");break;case FuId.U_SHORT_RANGE:this.write("ushort");break;case FuId.INT_TYPE:this.write("int");break;case FuId.LONG_TYPE:this.write("long");break;default:throw new Error();}}else if(type instanceof FuClassType){const klass=type;switch(klass.class.id){case FuId.STRING_CLASS:this.write("string");break;case FuId.ARRAY_STORAGE_CLASS:case FuId.ARRAY_PTR_CLASS:if(promote&&GenD.#isTransitiveConst(klass)){this.write("const(");this.#writeElementType(klass.getElementType());this.writeChar(41);}else this.#writeElementType(klass.getElementType());this.writeChar(91);let arrayStorage;if((arrayStorage=klass)instanceof FuArrayStorageType)this.visitLiteralLong(BigInt(arrayStorage.length));this.writeChar(93);break;case FuId.LIST_CLASS:case FuId.STACK_CLASS:this.include("std.container.array");this.write("Array!(");this.#writeElementType(klass.getElementType());this.writeChar(41);break;case FuId.QUEUE_CLASS:this.include("std.container.dlist");this.write("DList!(");this.#writeElementType(klass.getElementType());this.writeChar(41);break;case FuId.HASH_SET_CLASS:this.write("bool[");this.#writeElementType(klass.getElementType());this.writeChar(93);break;case FuId.DICTIONARY_CLASS:this.#writeElementType(klass.getValueType());this.writeChar(91);this.writeType(klass.getKeyType(),false);this.writeChar(93);break;case FuId.SORTED_SET_CLASS:this.include("std.container.rbtree");this.write("RedBlackTree!(");this.#writeElementType(klass.getElementType());this.writeChar(41);break;case FuId.SORTED_DICTIONARY_CLASS:this.include("std.container.rbtree");this.include("std.typecons");this.write("RedBlackTree!(Tuple!(");this.#writeElementType(klass.getKeyType());this.write(", ");this.#writeElementType(klass.getValueType());this.write("), \"a[0] < b[0]\")");break;case FuId.ORDERED_DICTIONARY_CLASS:this.include("std.typecons");this.write("Tuple!(Array!(");this.#writeElementType(klass.getValueType());this.write("), \"data\", size_t[");this.writeType(klass.getKeyType(),false);this.write("], \"dict\")");break;case FuId.TEXT_WRITER_CLASS:this.include("std.stdio");this.write("File");break;case FuId.REGEX_CLASS:this.include("std.regex");this.write("Regex!char");break;case FuId.MATCH_CLASS:this.include("std.regex");this.write("Captures!string");break;case FuId.LOCK_CLASS:this.write("Object");break;default:this.write(klass.class.name);break;}}else this.write(type.name);}writeTypeAndName(value){this.writeType(value.type,true);if(GenD.#isStructPtr(value.type))this.writeChar(42);this.writeChar(32);this.writeName(value);}visitAggregateInitializer(expr){this.write("[ ");this.writeCoercedLiterals(expr.type.asClassType().getElementType(),expr.items);this.write(" ]");}writeStaticCast(type,expr){this.write("cast(");this.writeType(type,false);this.write(")(");this.getStaticCastInner(type,expr).accept(this,FuPriority.ARGUMENT);this.writeChar(41);}visitInterpolatedString(expr,parent){this.include("std.format");this.write("format(");this.writePrintf(expr,false);}writeStorageInit(def){this.write(" = ");this.writeNewStorage(def.type);}writeVarInit(def){if(def.type instanceof FuArrayStorageType)return;super.writeVarInit(def);}hasInitCode(def){if(def.value!=null&&!(def.value instanceof FuLiteral))return true;let type=def.type;let array;if((array=type)instanceof FuArrayStorageType){let innerArray;while((innerArray=array.getElementType())instanceof FuArrayStorageType)array=innerArray;type=array.getElementType();}return type instanceof FuStorageType;}writeInitField(field){this.writeInitCode(field);}writeInitCode(def){if(!this.hasInitCode(def))return;let array;if((array=def.type)instanceof FuArrayStorageType){let nesting=0;let innerArray;while((innerArray=array.getElementType())instanceof FuArrayStorageType){this.openLoop("size_t",nesting++,array.length);array=innerArray;}let klass;if((klass=array.getElementType())instanceof FuStorageType){this.openLoop("size_t",nesting++,array.length);this.writeArrayElement(def,nesting);this.write(" = ");this.writeNew(klass,FuPriority.ARGUMENT);this.writeCharLine(59);}while(--nesting>=0)this.closeBlock();}else {let klass;if((klass=def.type)instanceof FuReadWriteClassType){switch(klass.class.id){case FuId.STRING_CLASS:case FuId.ARRAY_STORAGE_CLASS:case FuId.ARRAY_PTR_CLASS:case FuId.DICTIONARY_CLASS:case FuId.HASH_SET_CLASS:case FuId.SORTED_DICTIONARY_CLASS:case FuId.ORDERED_DICTIONARY_CLASS:case FuId.REGEX_CLASS:case FuId.MATCH_CLASS:case FuId.LOCK_CLASS:break;default:if(def.parent instanceof FuClass){this.writeName(def);this.write(" = ");if(def.value==null)this.writeNew(klass,FuPriority.ARGUMENT);else this.writeCoercedExpr(def.type,def.value);this.writeCharLine(59);}super.writeInitCode(def);break;}}}}writeNewArray(elementType,lengthExpr,parent){this.write("new ");this.writeType(elementType,false);this.writeChar(91);lengthExpr.accept(this,FuPriority.ARGUMENT);this.writeChar(93);}#writeStaticInitializer(type){this.writeChar(40);this.writeType(type,false);this.write(").init");}writeNew(klass,parent){if(GenD.#isCreateWithNew(klass)){this.write("new ");this.writeType(klass,false);}else this.#writeStaticInitializer(klass);}writeResource(name,length){this.write("FuResource.");this.writeResourceName(name);}writeStringLength(expr){this.writePostfix(expr,".length");}#writeClassReference(expr,priority=FuPriority.PRIMARY){if(GenD.#isStructPtr(expr.type)){this.write("(*");expr.accept(this,priority);this.writeChar(41);}else expr.accept(this,priority);}visitSymbolReference(expr,parent){switch(expr.symbol.id){case FuId.CONSOLE_ERROR:this.write("stderr");break;case FuId.LIST_COUNT:case FuId.STACK_COUNT:case FuId.HASH_SET_COUNT:case FuId.DICTIONARY_COUNT:case FuId.SORTED_SET_COUNT:case FuId.SORTED_DICTIONARY_COUNT:this.writeStringLength(expr.left);break;case FuId.QUEUE_COUNT:this.include("std.range");this.#writeClassReference(expr.left);this.write("[].walkLength");break;case FuId.MATCH_START:this.writePostfix(expr.left,".pre.length");break;case FuId.MATCH_END:if(parent>FuPriority.ADD)this.writeChar(40);this.writePostfix(expr.left,".pre.length + ");this.writePostfix(expr.left,".hit.length");if(parent>FuPriority.ADD)this.writeChar(41);break;case FuId.MATCH_LENGTH:this.writePostfix(expr.left,".hit.length");break;case FuId.MATCH_VALUE:this.writePostfix(expr.left,".hit");break;case FuId.MATH_NA_N:this.write("double.nan");break;case FuId.MATH_NEGATIVE_INFINITY:this.write("-double.infinity");break;case FuId.MATH_POSITIVE_INFINITY:this.write("double.infinity");break;default:super.visitSymbolReference(expr,parent);break;}}#writeWrite(args,newLine){this.include("std.stdio");if(args.length==0)this.write("writeln()");else {let interpolated;if((interpolated=args[0])instanceof FuInterpolatedString){this.write(newLine?"writefln(":"writef(");this.writePrintf(interpolated,false);}else this.writeCall(newLine?"writeln":"write",args[0]);}}#writeInsertedArg(type,args,index=0){if(args.length<=index){const klass=type;this.writeNew(klass,FuPriority.ARGUMENT);}else this.writeCoercedExpr(type,args[index]);this.writeChar(41);}writeCallExpr(obj,method,args,parent){switch(method.id){case FuId.ENUM_FROM_INT:this.writeStaticCast(method.type,args[0]);break;case FuId.ENUM_HAS_FLAG:this.writeEnumHasFlag(obj,args,parent);break;case FuId.INT_TRY_PARSE:case FuId.LONG_TRY_PARSE:case FuId.DOUBLE_TRY_PARSE:this.include("std.conv");this.write("() { try { ");this.writePostfix(obj," = ");this.writePostfix(args[0],".to!");this.write(obj.type.name);if(args.length==2){this.writeChar(40);args[1].accept(this,FuPriority.ARGUMENT);this.writeChar(41);}this.write("; return true; } catch (ConvException e) return false; }()");break;case FuId.STRING_CONTAINS:this.include("std.algorithm");this.writePostfix(obj,".canFind");this.writeArgsInParentheses(method,args);break;case FuId.STRING_ENDS_WITH:this.include("std.string");this.writeMethodCall(obj,"endsWith",args[0]);break;case FuId.STRING_INDEX_OF:this.include("std.string");this.writeMethodCall(obj,"indexOf",args[0]);break;case FuId.STRING_LAST_INDEX_OF:this.include("std.string");this.writeMethodCall(obj,"lastIndexOf",args[0]);break;case FuId.STRING_REPLACE:this.include("std.string");this.writeMethodCall(obj,"replace",args[0],args[1]);break;case FuId.STRING_STARTS_WITH:this.include("std.string");this.writeMethodCall(obj,"startsWith",args[0]);break;case FuId.STRING_SUBSTRING:obj.accept(this,FuPriority.PRIMARY);this.writeChar(91);this.writePostfix(args[0]," .. $]");if(args.length>1){this.write("[0 .. ");args[1].accept(this,FuPriority.ARGUMENT);this.writeChar(93);}break;case FuId.ARRAY_BINARY_SEARCH_ALL:case FuId.ARRAY_BINARY_SEARCH_PART:this.include("std.range");this.write("() { size_t fubegin = ");if(args.length==3)args[1].accept(this,FuPriority.ARGUMENT);else this.writeChar(48);this.write("; auto fusearch = ");this.#writeClassReference(obj);this.writeChar(91);if(args.length==3){this.write("fubegin .. fubegin + ");args[2].accept(this,FuPriority.ADD);}this.write("].assumeSorted.trisect(");this.writeNotPromoted(obj.type.asClassType().getElementType(),args[0]);this.write("); return fusearch[1].length ? fubegin + fusearch[0].length : -1; }()");break;case FuId.ARRAY_CONTAINS:case FuId.LIST_CONTAINS:this.include("std.algorithm");this.#writeClassReference(obj);this.writeCall("[].canFind",args[0]);break;case FuId.ARRAY_COPY_TO:case FuId.LIST_COPY_TO:this.include("std.algorithm");this.#writeClassReference(obj);this.writeChar(91);args[0].accept(this,FuPriority.ARGUMENT);this.write(" .. $][0 .. ");args[3].accept(this,FuPriority.ARGUMENT);this.write("].copy(");args[1].accept(this,FuPriority.ARGUMENT);this.writeChar(91);args[2].accept(this,FuPriority.ARGUMENT);this.write(" .. $])");break;case FuId.ARRAY_FILL_ALL:case FuId.ARRAY_FILL_PART:this.include("std.algorithm");this.#writeClassReference(obj);this.writeChar(91);if(args.length==3){args[1].accept(this,FuPriority.ARGUMENT);this.write(" .. $][0 .. ");args[2].accept(this,FuPriority.ARGUMENT);}this.write("].fill(");this.writeNotPromoted(obj.type.asClassType().getElementType(),args[0]);this.writeChar(41);break;case FuId.ARRAY_SORT_ALL:case FuId.ARRAY_SORT_PART:case FuId.LIST_SORT_ALL:case FuId.LIST_SORT_PART:this.include("std.algorithm");this.#writeClassReference(obj);this.writeChar(91);if(args.length==2){args[0].accept(this,FuPriority.ARGUMENT);this.write(" .. $][0 .. ");args[1].accept(this,FuPriority.ARGUMENT);}this.write("].sort");break;case FuId.LIST_ADD:case FuId.QUEUE_ENQUEUE:this.writePostfix(obj,".insertBack(");this.#writeInsertedArg(obj.type.asClassType().getElementType(),args);break;case FuId.LIST_ADD_RANGE:this.#writeClassReference(obj);this.write(" ~= ");this.#writeClassReference(args[0]);this.write("[]");break;case FuId.LIST_ALL:this.include("std.algorithm");this.#writeClassReference(obj);this.writeCall("[].all!",args[0]);break;case FuId.LIST_ANY:this.include("std.algorithm");this.#writeClassReference(obj);this.write("[].any!(");args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.LIST_INSERT:this.#hasListInsert=true;this.writePostfix(obj,".insertInPlace(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", ");this.#writeInsertedArg(obj.type.asClassType().getElementType(),args,1);break;case FuId.LIST_LAST:this.writePostfix(obj,".back");break;case FuId.LIST_REMOVE_AT:case FuId.LIST_REMOVE_RANGE:this.#hasListRemoveAt=true;this.writePostfix(obj,".removeAt");this.writeArgsInParentheses(method,args);break;case FuId.LIST_INDEX_OF:this.include("std.algorithm");this.#writeClassReference(obj);this.write("[].countUntil");this.writeArgsInParentheses(method,args);break;case FuId.QUEUE_DEQUEUE:this.#hasQueueDequeue=true;this.include("std.container.dlist");this.#writeClassReference(obj);this.write(".dequeue()");break;case FuId.QUEUE_PEEK:this.writePostfix(obj,".front");break;case FuId.STACK_PEEK:this.writePostfix(obj,".back");break;case FuId.STACK_PUSH:this.#writeClassReference(obj);this.write(" ~= ");args[0].accept(this,FuPriority.ASSIGN);break;case FuId.STACK_POP:this.#hasStackPop=true;this.#writeClassReference(obj);this.write(".pop()");break;case FuId.HASH_SET_ADD:this.writePostfix(obj,".require(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", true)");break;case FuId.HASH_SET_CLEAR:case FuId.DICTIONARY_CLEAR:this.writePostfix(obj,".clear()");break;case FuId.HASH_SET_CONTAINS:case FuId.DICTIONARY_CONTAINS_KEY:this.writeChar(40);args[0].accept(this,FuPriority.REL);this.write(" in ");obj.accept(this,FuPriority.PRIMARY);this.writeChar(41);break;case FuId.SORTED_SET_ADD:this.writePostfix(obj,".insert(");this.#writeInsertedArg(obj.type.asClassType().getElementType(),args,0);break;case FuId.SORTED_SET_REMOVE:this.writePostfix(obj,".removeKey");this.writeArgsInParentheses(method,args);break;case FuId.DICTIONARY_ADD:if(obj.type.asClassType().class.id==FuId.SORTED_DICTIONARY_CLASS){this.#hasSortedDictionaryInsert=true;this.writePostfix(obj,".replace(");}else this.writePostfix(obj,".require(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", ");this.#writeInsertedArg(obj.type.asClassType().getValueType(),args,1);break;case FuId.SORTED_DICTIONARY_CONTAINS_KEY:this.write("tuple(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", ");this.#writeStaticInitializer(obj.type.asClassType().getValueType());this.write(") in ");this.#writeClassReference(obj);break;case FuId.SORTED_DICTIONARY_REMOVE:this.#writeClassReference(obj);this.write(".removeKey(tuple(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", ");this.#writeStaticInitializer(obj.type.asClassType().getValueType());this.write("))");break;case FuId.TEXT_WRITER_WRITE:case FuId.TEXT_WRITER_WRITE_LINE:this.writePostfix(obj,".");this.#writeWrite(args,method.id==FuId.TEXT_WRITER_WRITE_LINE);break;case FuId.TEXT_WRITER_WRITE_CHAR:this.writePostfix(obj,".write(");if(!(args[0]instanceof FuLiteralChar))this.write("cast(char) ");args[0].accept(this,FuPriority.PRIMARY);this.writeChar(41);break;case FuId.TEXT_WRITER_WRITE_CODE_POINT:this.writePostfix(obj,".write(cast(dchar) ");args[0].accept(this,FuPriority.PRIMARY);this.writeChar(41);break;case FuId.CONSOLE_WRITE:case FuId.CONSOLE_WRITE_LINE:this.#writeWrite(args,method.id==FuId.CONSOLE_WRITE_LINE);break;case FuId.ENVIRONMENT_GET_ENVIRONMENT_VARIABLE:this.include("std.process");this.write("environment.get");this.writeArgsInParentheses(method,args);break;case FuId.U_T_F8_GET_BYTE_COUNT:this.writePostfix(args[0],".length");break;case FuId.U_T_F8_GET_BYTES:this.include("std.string");this.include("std.algorithm");this.writePostfix(args[0],".representation.copy(");this.writePostfix(args[1],"[");args[2].accept(this,FuPriority.ARGUMENT);this.write(" .. $])");break;case FuId.U_T_F8_GET_STRING:this.write("cast(string) (");this.writePostfix(args[0],"[");args[1].accept(this,FuPriority.ARGUMENT);this.write(" .. $][0 .. ");args[2].accept(this,FuPriority.ARGUMENT);this.write("])");break;case FuId.REGEX_COMPILE:this.include("std.regex");this.write("regex(");args[0].accept(this,FuPriority.ARGUMENT);this.writeRegexOptions(args,", \"","","\"","i","m","s");this.writeChar(41);break;case FuId.REGEX_ESCAPE:this.include("std.regex");this.include("std.conv");this.writePostfix(args[0],".escaper.to!string");break;case FuId.REGEX_IS_MATCH_REGEX:this.include("std.regex");this.writePostfix(args[0],".matchFirst(");(args.length>1?args[1]:obj).accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.REGEX_IS_MATCH_STR:this.include("std.regex");this.writePostfix(args[0],".matchFirst(");if(this.getRegexOptions(args)!=RegexOptions.NONE)this.write("regex(");(args.length>1?args[1]:obj).accept(this,FuPriority.ARGUMENT);this.writeRegexOptions(args,", \"","","\")","i","m","s");this.writeChar(41);break;case FuId.MATCH_FIND_STR:this.include("std.regex");this.writeChar(40);obj.accept(this,FuPriority.ASSIGN);this.write(" = ");args[0].accept(this,FuPriority.PRIMARY);this.write(".matchFirst(");if(this.getRegexOptions(args)!=RegexOptions.NONE)this.write("regex(");args[1].accept(this,FuPriority.ARGUMENT);this.writeRegexOptions(args,", \"","","\")","i","m","s");this.write("))");break;case FuId.MATCH_FIND_REGEX:this.include("std.regex");this.writeChar(40);obj.accept(this,FuPriority.ASSIGN);this.write(" = ");this.writeMethodCall(args[0],"matchFirst",args[1]);this.writeChar(41);break;case FuId.MATCH_GET_CAPTURE:this.writeIndexing(obj,args[0]);break;case FuId.MATH_METHOD:case FuId.MATH_ABS:case FuId.MATH_IS_FINITE:case FuId.MATH_IS_INFINITY:case FuId.MATH_IS_NA_N:case FuId.MATH_LOG2:case FuId.MATH_ROUND:this.include("std.math");this.writeCamelCase(method.name);this.writeArgsInParentheses(method,args);break;case FuId.MATH_CEILING:this.include("std.math");this.writeCall("ceil",args[0]);break;case FuId.MATH_CLAMP:case FuId.MATH_MAX_INT:case FuId.MATH_MAX_DOUBLE:case FuId.MATH_MIN_INT:case FuId.MATH_MIN_DOUBLE:this.include("std.algorithm");this.writeLowercase(method.name);this.writeArgsInParentheses(method,args);break;case FuId.MATH_FUSED_MULTIPLY_ADD:this.include("std.math");this.writeCall("fma",args[0],args[1],args[2]);break;case FuId.MATH_TRUNCATE:this.include("std.math");this.writeCall("trunc",args[0]);break;default:if(obj!=null){if(GenD.isReferenceTo(obj,FuId.BASE_PTR))this.write("super.");else {this.#writeClassReference(obj);this.writeChar(46);}}this.writeName(method);this.writeArgsInParentheses(method,args);break;}}writeIndexingExpr(expr,parent){this.#writeClassReference(expr.left);const klass=expr.left.type;switch(klass.class.id){case FuId.ARRAY_PTR_CLASS:case FuId.ARRAY_STORAGE_CLASS:case FuId.DICTIONARY_CLASS:case FuId.LIST_CLASS:this.writeChar(91);expr.right.accept(this,FuPriority.ARGUMENT);this.writeChar(93);break;case FuId.SORTED_DICTIONARY_CLASS:console.assert(parent!=FuPriority.ASSIGN);this.#hasSortedDictionaryFind=true;this.include("std.container.rbtree");this.include("std.typecons");this.write(".find(");this.writeStronglyCoerced(klass.getKeyType(),expr.right);this.writeChar(41);break;case FuId.ORDERED_DICTIONARY_CLASS:this.notSupported(expr,"OrderedDictionary");break;default:throw new Error();}}static#isIsComparable(expr){let klass;return expr instanceof FuLiteralNull||(klass=expr.type)instanceof FuClassType&&klass.class.id==FuId.ARRAY_PTR_CLASS;}writeEqual(left,right,parent,not){if(GenD.#isIsComparable(left)||GenD.#isIsComparable(right))this.writeEqualExpr(left,right,parent,not?" !is ":" is ");else super.writeEqual(left,right,parent,not);}writeAssign(expr,parent){let indexing;let dict;if((indexing=expr.left)instanceof FuBinaryExpr&&indexing.op==FuToken.LEFT_BRACKET&&(dict=indexing.left.type)instanceof FuClassType){switch(dict.class.id){case FuId.SORTED_DICTIONARY_CLASS:this.#hasSortedDictionaryInsert=true;this.writePostfix(indexing.left,".replace(");indexing.right.accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeNotPromoted(expr.type,expr.right);this.writeChar(41);return;}}super.writeAssign(expr,parent);}#writeIsVar(expr,def,parent){let thisPriority=def.name=="_"?FuPriority.PRIMARY:FuPriority.ASSIGN;if(parent>thisPriority)this.writeChar(40);if(def.name!="_"){this.writeName(def);this.write(" = ");}this.write("cast(");this.writeType(def.type,true);this.write(") ");expr.accept(this,FuPriority.PRIMARY);if(parent>thisPriority)this.writeChar(41);}visitBinaryExpr(expr,parent){switch(expr.op){case FuToken.IS:if(parent>=FuPriority.OR&&parent<=FuPriority.MUL)parent=FuPriority.PRIMARY;if(parent>FuPriority.EQUALITY)this.writeChar(40);if(expr.right instanceof FuSymbolReference){const symbol=expr.right;this.write("cast(");this.write(symbol.symbol.name);this.write(") ");expr.left.accept(this,FuPriority.PRIMARY);}else if(expr.right instanceof FuVar){const def=expr.right;this.#writeIsVar(expr.left,def,FuPriority.EQUALITY);}else throw new Error();this.write(" !is null");if(parent>FuPriority.EQUALITY)this.writeChar(41);return;case FuToken.PLUS:if(expr.type.id==FuId.STRING_STORAGE_TYPE){expr.left.accept(this,FuPriority.ASSIGN);this.write(" ~ ");expr.right.accept(this,FuPriority.ASSIGN);return;}break;case FuToken.ADD_ASSIGN:if(expr.left.type.id==FuId.STRING_STORAGE_TYPE){expr.left.accept(this,FuPriority.ASSIGN);this.write(" ~= ");this.writeAssignRight(expr);return;}break;}super.visitBinaryExpr(expr,parent);}visitLambdaExpr(expr){this.writeName(expr.first);this.write(" => ");expr.body.accept(this,FuPriority.STATEMENT);}writeAssert(statement){this.write("assert(");statement.cond.accept(this,FuPriority.ARGUMENT);if(statement.message!=null){this.write(", ");statement.message.accept(this,FuPriority.ARGUMENT);}this.writeLine(");");}visitForeach(statement){this.write("foreach (");let dict;if((dict=statement.collection.type)instanceof FuClassType&&dict.class.typeParameterCount==2){this.writeTypeAndName(statement.getVar());this.write(", ");this.writeTypeAndName(statement.getValueVar());}else this.writeTypeAndName(statement.getVar());this.write("; ");this.#writeClassReference(statement.collection);let set;if((set=statement.collection.type)instanceof FuClassType&&set.class.id==FuId.HASH_SET_CLASS)this.write(".byKey");this.writeChar(41);this.writeChild(statement.body);}visitLock(statement){this.writeCall("synchronized ",statement.lock);this.writeChild(statement.body);}writeSwitchCaseTypeVar(value){this.defineVar(value);}writeSwitchCaseCond(statement,value,parent){let def;if((def=value)instanceof FuVar){this.#writeIsVar(statement.value,def,FuPriority.EQUALITY);this.write(" !is null");}else super.writeSwitchCaseCond(statement,value,parent);}visitSwitch(statement){this.writeTemporaries(statement.value);if(statement.isTypeMatching()||statement.hasWhen())this.writeSwitchAsIfsWithGoto(statement);else {this.startSwitch(statement);this.writeLine("default:");this.indent++;if(statement.defaultBody.length>0)this.writeSwitchCaseBody(statement.defaultBody);else this.writeLine("assert(false);");this.indent--;this.writeCharLine(125);}}visitThrow(statement){this.include("std.exception");this.write("throw new Exception(");statement.message.accept(this,FuPriority.ARGUMENT);this.writeLine(");");}writeEnum(enu){this.writeNewLine();this.writeDoc(enu.documentation);this.writePublic(enu);this.write("enum ");this.write(enu.name);this.openBlock();enu.acceptValues(this);this.writeNewLine();this.closeBlock();}writeConst(konst){this.writeDoc(konst.documentation);this.write("static immutable ");this.writeTypeAndName(konst);this.write(" = ");this.writeCoercedExpr(konst.type,konst.value);this.writeCharLine(59);}writeField(field){this.writeNewLine();this.writeDoc(field.documentation);this.#writeVisibility(field.visibility);this.writeTypeAndName(field);if(field.value instanceof FuLiteral){this.write(" = ");this.writeCoercedExpr(field.type,field.value);}this.writeCharLine(59);}writeMethod(method){if(method.id==FuId.CLASS_TO_STRING&&method.callType==FuCallType.ABSTRACT)return;this.writeNewLine();this.writeDoc(method.documentation);this.writeParametersDoc(method);this.#writeVisibility(method.visibility);if(method.id==FuId.CLASS_TO_STRING)this.write("override ");else this.#writeCallType(method.callType,"final override ");this.writeTypeAndName(method);this.writeParameters(method,true);this.writeBody(method);}writeClass(klass,program){this.writeNewLine();this.writeDoc(klass.documentation);if(klass.callType==FuCallType.SEALED)this.write("final ");this.openClass(klass,""," : ");if(this.needsConstructor(klass)){if(klass.constructor_!=null){this.writeDoc(klass.constructor_.documentation);this.#writeVisibility(klass.constructor_.visibility);}else this.write("private ");this.writeLine("this()");this.openBlock();this.writeConstructorBody(klass);this.closeBlock();}for(let symbol=klass.first;symbol!=null;symbol=symbol.next){if(!(symbol instanceof FuMember))continue;if(symbol instanceof FuConst){const konst=symbol;this.writeConst(konst);}else if(symbol instanceof FuField){const field=symbol;this.writeField(field);}else if(symbol instanceof FuMethod){const method=symbol;this.writeMethod(method);this.currentTemporaries.length=0;}else if(symbol instanceof FuVar);else throw new Error();}this.closeBlock();}static#isLong(expr){switch(expr.symbol.id){case FuId.ARRAY_LENGTH:case FuId.STRING_LENGTH:case FuId.LIST_COUNT:return true;default:return false;}}writeCoercedInternal(type,expr,parent){if(type instanceof FuRangeType)this.writeStaticCast(type,expr);else {let symref;if(type instanceof FuIntegerType&&(symref=expr)instanceof FuSymbolReference&&GenD.#isLong(symref))this.writeStaticCast(type,expr);else if(type instanceof FuFloatingType&&!(expr.type instanceof FuFloatingType))this.writeStaticCast(type,expr);else if(type instanceof FuClassType&&!(type instanceof FuArrayStorageType)&&expr.type instanceof FuArrayStorageType){super.writeCoercedInternal(type,expr,FuPriority.PRIMARY);this.write("[]");}else super.writeCoercedInternal(type,expr,parent);}}#writeResources(resources){this.writeNewLine();this.writeLine("private static struct FuResource");this.openBlock();for(const[name,content]of Object.entries(resources).sort((a,b)=>a[0].localeCompare(b[0]))){this.write("private static immutable ubyte[] ");this.writeResourceName(name);this.writeLine(" = [");this.writeChar(9);this.writeBytes(content);this.writeLine(" ];");}this.closeBlock();}writeProgram(program){this.#hasListInsert=false;this.#hasListRemoveAt=false;this.#hasQueueDequeue=false;this.#hasStackPop=false;this.#hasSortedDictionaryInsert=false;this.#hasSortedDictionaryFind=false;this.openStringWriter();if(this.namespace.length!=0){this.write("struct ");this.writeLine(this.namespace);this.openBlock();this.writeLine("static:");}this.writeTopLevelNatives(program);this.writeTypes(program);if(Object.keys(program.resources).length>0)this.#writeResources(program.resources);if(this.namespace.length!=0)this.closeBlock();this.createOutputFile();if(this.#hasListInsert||this.#hasListRemoveAt||this.#hasStackPop)this.include("std.container.array");if(this.#hasSortedDictionaryInsert){this.include("std.container.rbtree");this.include("std.typecons");}this.writeIncludes("import ",";");if(this.#hasListInsert){this.writeNewLine();this.writeLine("private void insertInPlace(T, U...)(Array!T* arr, size_t pos, auto ref U stuff)");this.openBlock();this.writeLine("arr.insertAfter((*arr)[0 .. pos], stuff);");this.closeBlock();}if(this.#hasListRemoveAt){this.writeNewLine();this.writeLine("private void removeAt(T)(Array!T* arr, size_t pos, size_t count = 1)");this.openBlock();this.writeLine("arr.linearRemove((*arr)[pos .. pos + count]);");this.closeBlock();}if(this.#hasQueueDequeue){this.writeNewLine();this.writeLine("private T dequeue(T)(ref DList!T q)");this.openBlock();this.writeLine("scope(exit) q.removeFront(); return q.front;");this.closeBlock();}if(this.#hasStackPop){this.writeNewLine();this.writeLine("private T pop(T)(ref Array!T stack)");this.openBlock();this.writeLine("scope(exit) stack.removeBack(); return stack.back;");this.closeBlock();}if(this.#hasSortedDictionaryFind){this.writeNewLine();this.writeLine("private U find(T, U)(RedBlackTree!(Tuple!(T, U), \"a[0] < b[0]\") dict, T key)");this.openBlock();this.writeLine("return dict.equalRange(tuple(key, U.init)).front[1];");this.closeBlock();}if(this.#hasSortedDictionaryInsert){this.writeNewLine();this.writeLine("private void replace(T, U)(RedBlackTree!(Tuple!(T, U), \"a[0] < b[0]\") dict, T key, lazy U value)");this.openBlock();this.writeLine("dict.removeKey(tuple(key, U.init));");this.writeLine("dict.insert(tuple(key, value));");this.closeBlock();}this.closeStringWriter();this.closeFile();}}class GenJava extends GenTyped{#switchCaseDiscards;getTargetName(){return "Java";}visitLiteralLong(value){super.visitLiteralLong(value);if(value<-2147483648||value>2147483647)this.writeChar(76);}getLiteralChars(){return 65536;}#writeToString(expr,parent){switch(expr.type.id){case FuId.LONG_TYPE:this.write("Long");break;case FuId.FLOAT_TYPE:this.write("Float");break;case FuId.DOUBLE_TYPE:case FuId.FLOAT_INT_TYPE:this.write("Double");break;case FuId.STRING_PTR_TYPE:case FuId.STRING_STORAGE_TYPE:expr.accept(this,parent);return;default:if(expr.type instanceof FuIntegerType)this.write("Integer");else if(expr.type instanceof FuClassType){this.writePostfix(expr,".toString()");return;}else throw new Error();break;}this.writeCall(".toString",expr);}writePrintfWidth(part){if(part.precision>=0&&part.argument.type instanceof FuIntegerType){this.writeChar(48);this.visitLiteralLong(BigInt(part.precision));}else super.writePrintfWidth(part);}visitInterpolatedString(expr,parent){if(expr.suffix.length==0&&expr.parts.length==1&&expr.parts[0].prefix.length==0&&expr.parts[0].widthExpr==null&&expr.parts[0].format==32)this.#writeToString(expr.parts[0].argument,parent);else {this.write("String.format(");this.writePrintf(expr,false);}}#writeCamelCaseNotKeyword(name){this.writeCamelCase(name);switch(name){case"Abstract":case"Assert":case"Boolean":case"Break":case"Byte":case"Case":case"Catch":case"Char":case"Class":case"Const":case"Continue":case"Default":case"Do":case"Double":case"Else":case"Enum":case"Extends":case"False":case"Final":case"Finally":case"Float":case"For":case"Foreach":case"Goto":case"If":case"Implements":case"Import":case"Instanceof":case"Int":case"Interface":case"Long":case"Native":case"New":case"Null":case"Package":case"Private":case"Protected":case"Public":case"Return":case"Short":case"Static":case"Strictfp":case"String":case"Super":case"Switch":case"Synchronized":case"Transient":case"Throw":case"Throws":case"True":case"Try":case"Void":case"Volatile":case"While":case"Yield":case"boolean":case"catch":case"char":case"extends":case"final":case"finally":case"goto":case"implements":case"import":case"instanceof":case"interface":case"package":case"private":case"strictfp":case"super":case"synchronized":case"transient":case"try":case"volatile":case"yield":this.writeChar(95);break;}}writeName(symbol){if(symbol instanceof FuContainerType)this.write(symbol.name);else if(symbol instanceof FuConst){const konst=symbol;if(konst.inMethod!=null){this.writeUppercaseWithUnderscores(konst.inMethod.name);this.writeChar(95);}this.writeUppercaseWithUnderscores(symbol.name);}else if(symbol instanceof FuVar){let forEach;if((forEach=symbol.parent)instanceof FuForeach&&forEach.count()==2){let element=forEach.getVar();this.#writeCamelCaseNotKeyword(element.name);this.write(symbol==element?".getKey()":".getValue()");}else this.#writeCamelCaseNotKeyword(symbol.name);}else if(symbol instanceof FuMember)this.#writeCamelCaseNotKeyword(symbol.name);else throw new Error();}#writeVisibility(visibility){switch(visibility){case FuVisibility.PRIVATE:this.write("private ");break;case FuVisibility.INTERNAL:break;case FuVisibility.PROTECTED:this.write("protected ");break;case FuVisibility.PUBLIC:this.write("public ");break;default:throw new Error();}}getTypeId(type,promote){let id=super.getTypeId(type,promote);switch(id){case FuId.BYTE_RANGE:return FuId.S_BYTE_RANGE;case FuId.U_SHORT_RANGE:return FuId.INT_TYPE;default:return id;}}static#isJavaEnum(enu){for(let symbol=enu.first;symbol!=null;symbol=symbol.next){let konst;if((konst=symbol)instanceof FuConst&&!(konst.value instanceof FuImplicitEnumValue))return false;}return true;}#writeCollectionType(name,elementType){this.include("java.util."+name);this.write(name);this.writeChar(60);this.#writeJavaType(elementType,false,true);this.writeChar(62);}#writeDictType(name,dict){this.write(name);this.writeChar(60);this.#writeJavaType(dict.getKeyType(),false,true);this.write(", ");this.#writeJavaType(dict.getValueType(),false,true);this.writeChar(62);}#writeJavaType(type,promote,needClass){if(type instanceof FuNumericType){switch(this.getTypeId(type,promote)){case FuId.S_BYTE_RANGE:this.write(needClass?"Byte":"byte");break;case FuId.SHORT_RANGE:this.write(needClass?"Short":"short");break;case FuId.INT_TYPE:this.write(needClass?"Integer":"int");break;case FuId.LONG_TYPE:this.write(needClass?"Long":"long");break;case FuId.FLOAT_TYPE:this.write(needClass?"Float":"float");break;case FuId.DOUBLE_TYPE:this.write(needClass?"Double":"double");break;default:throw new Error();}}else if(type instanceof FuEnum){const enu=type;this.write(enu.id==FuId.BOOL_TYPE?needClass?"Boolean":"boolean":GenJava.#isJavaEnum(enu)?enu.name:needClass?"Integer":"int");}else if(type instanceof FuClassType){const klass=type;switch(klass.class.id){case FuId.STRING_CLASS:this.write("String");break;case FuId.ARRAY_PTR_CLASS:case FuId.ARRAY_STORAGE_CLASS:this.writeType(klass.getElementType(),false);this.write("[]");break;case FuId.LIST_CLASS:this.#writeCollectionType("ArrayList",klass.getElementType());break;case FuId.QUEUE_CLASS:this.#writeCollectionType("ArrayDeque",klass.getElementType());break;case FuId.STACK_CLASS:this.#writeCollectionType("Stack",klass.getElementType());break;case FuId.HASH_SET_CLASS:this.#writeCollectionType("HashSet",klass.getElementType());break;case FuId.SORTED_SET_CLASS:this.#writeCollectionType("TreeSet",klass.getElementType());break;case FuId.DICTIONARY_CLASS:this.include("java.util.HashMap");this.#writeDictType("HashMap",klass);break;case FuId.SORTED_DICTIONARY_CLASS:this.include("java.util.TreeMap");this.#writeDictType("TreeMap",klass);break;case FuId.ORDERED_DICTIONARY_CLASS:this.include("java.util.LinkedHashMap");this.#writeDictType("LinkedHashMap",klass);break;case FuId.TEXT_WRITER_CLASS:this.write("Appendable");break;case FuId.REGEX_CLASS:this.include("java.util.regex.Pattern");this.write("Pattern");break;case FuId.MATCH_CLASS:this.include("java.util.regex.Matcher");this.write("Matcher");break;case FuId.LOCK_CLASS:this.write("Object");break;default:this.write(klass.class.name);break;}}else this.write(type.name);}writeType(type,promote){this.#writeJavaType(type,promote,false);}writeNew(klass,parent){this.write("new ");this.writeType(klass,false);this.write("()");}writeResource(name,length){this.write("FuResource.getByteArray(");this.visitLiteralString(name);this.write(", ");this.visitLiteralLong(BigInt(length));this.writeChar(41);}static#isUnsignedByte(type){let range;return type.id==FuId.BYTE_RANGE&&(range=type)instanceof FuRangeType&&range.max>127;}static#isUnsignedByteIndexing(expr){return expr.isIndexing()&&GenJava.#isUnsignedByte(expr.type);}#writeIndexingInternal(expr){if(expr.left.type.isArray())super.writeIndexingExpr(expr,FuPriority.AND);else this.writeMethodCall(expr.left,"get",expr.right);}visitPrefixExpr(expr,parent){if((expr.op==FuToken.INCREMENT||expr.op==FuToken.DECREMENT)&&GenJava.#isUnsignedByteIndexing(expr.inner)){if(parent>FuPriority.AND)this.writeChar(40);this.write(expr.op==FuToken.INCREMENT?"++":"--");const indexing=expr.inner;this.#writeIndexingInternal(indexing);if(parent!=FuPriority.STATEMENT)this.write(" & 0xff");if(parent>FuPriority.AND)this.writeChar(41);}else super.visitPrefixExpr(expr,parent);}visitPostfixExpr(expr,parent){if((expr.op==FuToken.INCREMENT||expr.op==FuToken.DECREMENT)&&GenJava.#isUnsignedByteIndexing(expr.inner)){if(parent>FuPriority.AND)this.writeChar(40);const indexing=expr.inner;this.#writeIndexingInternal(indexing);this.write(expr.op==FuToken.INCREMENT?"++":"--");if(parent!=FuPriority.STATEMENT)this.write(" & 0xff");if(parent>FuPriority.AND)this.writeChar(41);}else super.visitPostfixExpr(expr,parent);}#writeSByteLiteral(literal){if(literal.value>=128)this.write("(byte) ");literal.accept(this,FuPriority.PRIMARY);}writeEqual(left,right,parent,not){if(left.type instanceof FuStringType&&right.type.id!=FuId.NULL_TYPE||right.type instanceof FuStringType&&left.type.id!=FuId.NULL_TYPE){if(not)this.writeChar(33);this.writeMethodCall(left,"equals",right);}else {let rightLiteral;if(GenJava.#isUnsignedByteIndexing(left)&&(rightLiteral=right)instanceof FuLiteralLong&&rightLiteral.type.id==FuId.BYTE_RANGE){if(parent>FuPriority.EQUALITY)this.writeChar(40);const indexing=left;this.#writeIndexingInternal(indexing);this.write(GenJava.getEqOp(not));this.#writeSByteLiteral(rightLiteral);if(parent>FuPriority.EQUALITY)this.writeChar(41);}else super.writeEqual(left,right,parent,not);}}writeCoercedLiteral(type,expr){if(GenJava.#isUnsignedByte(type)){const literal=expr;this.#writeSByteLiteral(literal);}else super.writeCoercedLiteral(type,expr);}writeRel(expr,parent,op){let enu;if((enu=expr.left.type)instanceof FuEnum&&GenJava.#isJavaEnum(enu)){if(parent>FuPriority.COND_AND)this.writeChar(40);this.writeMethodCall(expr.left,"compareTo",expr.right);this.write(op);this.writeChar(48);if(parent>FuPriority.COND_AND)this.writeChar(41);}else super.writeRel(expr,parent,op);}writeAnd(expr,parent){let rightLiteral;if(GenJava.#isUnsignedByteIndexing(expr.left)&&(rightLiteral=expr.right)instanceof FuLiteralLong){if(parent>FuPriority.COND_AND&&parent!=FuPriority.AND)this.writeChar(40);const indexing=expr.left;this.#writeIndexingInternal(indexing);this.write(" & ");this.visitLiteralLong(255n&rightLiteral.value);if(parent>FuPriority.COND_AND&&parent!=FuPriority.AND)this.writeChar(41);}else super.writeAnd(expr,parent);}writeStringLength(expr){this.writePostfix(expr,".length()");}writeCharAt(expr){this.writeMethodCall(expr.left,"charAt",expr.right);}visitSymbolReference(expr,parent){switch(expr.symbol.id){case FuId.CONSOLE_ERROR:this.write("System.err");break;case FuId.LIST_COUNT:case FuId.QUEUE_COUNT:case FuId.STACK_COUNT:case FuId.HASH_SET_COUNT:case FuId.SORTED_SET_COUNT:case FuId.DICTIONARY_COUNT:case FuId.SORTED_DICTIONARY_COUNT:case FuId.ORDERED_DICTIONARY_COUNT:expr.left.accept(this,FuPriority.PRIMARY);this.writeMemberOp(expr.left,expr);this.write("size()");break;case FuId.MATH_NA_N:this.write("Float.NaN");break;case FuId.MATH_NEGATIVE_INFINITY:this.write("Float.NEGATIVE_INFINITY");break;case FuId.MATH_POSITIVE_INFINITY:this.write("Float.POSITIVE_INFINITY");break;default:if(!this.writeJavaMatchProperty(expr,parent))super.visitSymbolReference(expr,parent);break;}}#writeArrayBinarySearchFill(obj,method,args){this.include("java.util.Arrays");this.write("Arrays.");this.write(method);this.writeChar(40);obj.accept(this,FuPriority.ARGUMENT);this.write(", ");if(args.length==3){this.writeStartEnd(args[1],args[2]);this.write(", ");}this.writeNotPromoted(obj.type.asClassType().getElementType(),args[0]);this.writeChar(41);}#writeWrite(method,args,newLine){let interpolated;if(args.length==1&&(interpolated=args[0])instanceof FuInterpolatedString){this.write(".format(");this.writePrintf(interpolated,newLine);}else {this.write(".print");if(newLine)this.write("ln");this.writeArgsInParentheses(method,args);}}#writeCompileRegex(args,argIndex){this.include("java.util.regex.Pattern");this.write("Pattern.compile(");args[argIndex].accept(this,FuPriority.ARGUMENT);this.writeRegexOptions(args,", "," | ","","Pattern.CASE_INSENSITIVE","Pattern.MULTILINE","Pattern.DOTALL");this.writeChar(41);}writeCallExpr(obj,method,args,parent){switch(method.id){case FuId.NONE:case FuId.CLASS_TO_STRING:case FuId.STRING_CONTAINS:case FuId.STRING_ENDS_WITH:case FuId.STRING_INDEX_OF:case FuId.STRING_LAST_INDEX_OF:case FuId.STRING_REPLACE:case FuId.STRING_STARTS_WITH:case FuId.LIST_CLEAR:case FuId.LIST_CONTAINS:case FuId.LIST_INDEX_OF:case FuId.QUEUE_CLEAR:case FuId.STACK_CLEAR:case FuId.STACK_PEEK:case FuId.STACK_PUSH:case FuId.STACK_POP:case FuId.HASH_SET_ADD:case FuId.HASH_SET_CLEAR:case FuId.HASH_SET_CONTAINS:case FuId.HASH_SET_REMOVE:case FuId.SORTED_SET_ADD:case FuId.SORTED_SET_CLEAR:case FuId.SORTED_SET_CONTAINS:case FuId.SORTED_SET_REMOVE:case FuId.DICTIONARY_CLEAR:case FuId.DICTIONARY_CONTAINS_KEY:case FuId.DICTIONARY_REMOVE:case FuId.SORTED_DICTIONARY_CLEAR:case FuId.SORTED_DICTIONARY_CONTAINS_KEY:case FuId.SORTED_DICTIONARY_REMOVE:case FuId.ORDERED_DICTIONARY_CLEAR:case FuId.ORDERED_DICTIONARY_CONTAINS_KEY:case FuId.ORDERED_DICTIONARY_REMOVE:case FuId.STRING_WRITER_TO_STRING:case FuId.MATH_METHOD:case FuId.MATH_ABS:case FuId.MATH_MAX_INT:case FuId.MATH_MAX_DOUBLE:case FuId.MATH_MIN_INT:case FuId.MATH_MIN_DOUBLE:if(obj!=null){if(GenJava.isReferenceTo(obj,FuId.BASE_PTR))this.write("super");else obj.accept(this,FuPriority.PRIMARY);this.writeChar(46);}this.writeName(method);this.writeArgsInParentheses(method,args);break;case FuId.ENUM_FROM_INT:args[0].accept(this,parent);break;case FuId.ENUM_HAS_FLAG:this.writeEnumHasFlag(obj,args,parent);break;case FuId.DOUBLE_TRY_PARSE:this.include("java.util.function.DoubleSupplier");this.write("!Double.isNaN(");obj.accept(this,FuPriority.ASSIGN);this.write(" = ((DoubleSupplier) () -> { try { return Double.parseDouble(");args[0].accept(this,FuPriority.ARGUMENT);this.write("); } catch (NumberFormatException e) { return Double.NaN; } }).getAsDouble())");break;case FuId.STRING_SUBSTRING:this.writePostfix(obj,".substring(");args[0].accept(this,FuPriority.ARGUMENT);if(args.length==2){this.write(", ");this.writeAdd(args[0],args[1]);}this.writeChar(41);break;case FuId.ARRAY_BINARY_SEARCH_ALL:case FuId.ARRAY_BINARY_SEARCH_PART:this.#writeArrayBinarySearchFill(obj,"binarySearch",args);break;case FuId.ARRAY_COPY_TO:this.write("System.arraycopy(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeArgs(method,args);this.writeChar(41);break;case FuId.ARRAY_FILL_ALL:case FuId.ARRAY_FILL_PART:this.#writeArrayBinarySearchFill(obj,"fill",args);break;case FuId.ARRAY_SORT_ALL:this.include("java.util.Arrays");this.writeCall("Arrays.sort",obj);break;case FuId.ARRAY_SORT_PART:this.include("java.util.Arrays");this.write("Arrays.sort(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeStartEnd(args[0],args[1]);this.writeChar(41);break;case FuId.LIST_ADD:this.writeListAdd(obj,"add",args);break;case FuId.LIST_ADD_RANGE:this.writeMethodCall(obj,"addAll",args[0]);break;case FuId.LIST_ALL:this.writeMethodCall(obj,"stream().allMatch",args[0]);break;case FuId.LIST_ANY:this.writeMethodCall(obj,"stream().anyMatch",args[0]);break;case FuId.LIST_COPY_TO:this.write("for (int _i = 0; _i < ");args[3].accept(this,FuPriority.REL);this.writeLine("; _i++)");this.write("\t");args[1].accept(this,FuPriority.PRIMARY);this.writeChar(91);this.startAdd(args[2]);this.write("_i] = ");this.writePostfix(obj,".get(");this.startAdd(args[0]);this.write("_i)");break;case FuId.LIST_INSERT:this.writeListInsert(obj,"add",args);break;case FuId.LIST_LAST:this.writePostfix(obj,".get(");this.writePostfix(obj,".size() - 1)");break;case FuId.LIST_REMOVE_AT:this.writeMethodCall(obj,"remove",args[0]);break;case FuId.LIST_REMOVE_RANGE:this.writePostfix(obj,".subList(");this.writeStartEnd(args[0],args[1]);this.write(").clear()");break;case FuId.LIST_SORT_ALL:this.writePostfix(obj,".sort(null)");break;case FuId.LIST_SORT_PART:this.writePostfix(obj,".subList(");this.writeStartEnd(args[0],args[1]);this.write(").sort(null)");break;case FuId.QUEUE_DEQUEUE:this.writePostfix(obj,".remove()");break;case FuId.QUEUE_ENQUEUE:this.writeMethodCall(obj,"add",args[0]);break;case FuId.QUEUE_PEEK:this.writePostfix(obj,".element()");break;case FuId.DICTIONARY_ADD:this.writePostfix(obj,".put(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeNewStorage(obj.type.asClassType().getValueType());this.writeChar(41);break;case FuId.TEXT_WRITER_WRITE:if(GenJava.isReferenceTo(obj,FuId.CONSOLE_ERROR)){this.write("System.err");this.#writeWrite(method,args,false);}else {this.write("try { ");this.writePostfix(obj,".append(");this.#writeToString(args[0],FuPriority.ARGUMENT);this.include("java.io.IOException");this.write("); } catch (IOException e) { throw new RuntimeException(e); }");}break;case FuId.TEXT_WRITER_WRITE_CHAR:if(GenJava.isReferenceTo(obj,FuId.CONSOLE_ERROR))this.writeCharMethodCall(obj,"print",args[0]);else {this.write("try { ");this.writeCharMethodCall(obj,"append",args[0]);this.include("java.io.IOException");this.write("; } catch (IOException e) { throw new RuntimeException(e); }");}break;case FuId.TEXT_WRITER_WRITE_CODE_POINT:if(GenJava.isReferenceTo(obj,FuId.CONSOLE_ERROR)){this.writeCall("System.err.print(Character.toChars",args[0]);this.writeChar(41);}else {this.write("try { ");this.writeMethodCall(obj,"append(Character.toString",args[0]);this.include("java.io.IOException");this.write("); } catch (IOException e) { throw new RuntimeException(e); }");}break;case FuId.TEXT_WRITER_WRITE_LINE:if(GenJava.isReferenceTo(obj,FuId.CONSOLE_ERROR)){this.write("System.err");this.#writeWrite(method,args,true);}else {this.write("try { ");this.writePostfix(obj,".append(");if(args.length==0)this.write("'\\n'");else {let interpolated;if((interpolated=args[0])instanceof FuInterpolatedString){this.write("String.format(");this.writePrintf(interpolated,true);}else {this.#writeToString(args[0],FuPriority.ARGUMENT);this.write(").append('\\n'");}}this.include("java.io.IOException");this.write("); } catch (IOException e) { throw new RuntimeException(e); }");}break;case FuId.STRING_WRITER_CLEAR:this.writePostfix(obj,".getBuffer().setLength(0)");break;case FuId.CONSOLE_WRITE:this.write("System.out");this.#writeWrite(method,args,false);break;case FuId.CONSOLE_WRITE_LINE:this.write("System.out");this.#writeWrite(method,args,true);break;case FuId.U_T_F8_GET_BYTE_COUNT:this.include("java.nio.charset.StandardCharsets");this.writePostfix(args[0],".getBytes(StandardCharsets.UTF_8).length");break;case FuId.U_T_F8_GET_BYTES:this.include("java.nio.ByteBuffer");this.include("java.nio.CharBuffer");this.include("java.nio.charset.StandardCharsets");this.write("StandardCharsets.UTF_8.newEncoder().encode(CharBuffer.wrap(");args[0].accept(this,FuPriority.ARGUMENT);this.write("), ByteBuffer.wrap(");args[1].accept(this,FuPriority.ARGUMENT);this.write(", ");args[2].accept(this,FuPriority.ARGUMENT);this.write(", ");this.writePostfix(args[1],".length");if(!args[2].isLiteralZero()){this.write(" - ");args[2].accept(this,FuPriority.MUL);}this.write("), true)");break;case FuId.U_T_F8_GET_STRING:this.include("java.nio.charset.StandardCharsets");this.write("new String(");this.writeArgs(method,args);this.write(", StandardCharsets.UTF_8)");break;case FuId.ENVIRONMENT_GET_ENVIRONMENT_VARIABLE:this.writeCall("System.getenv",args[0]);break;case FuId.REGEX_COMPILE:this.#writeCompileRegex(args,0);break;case FuId.REGEX_ESCAPE:this.include("java.util.regex.Pattern");this.writeCall("Pattern.quote",args[0]);break;case FuId.REGEX_IS_MATCH_STR:this.#writeCompileRegex(args,1);this.writeCall(".matcher",args[0]);this.write(".find()");break;case FuId.REGEX_IS_MATCH_REGEX:this.writeMethodCall(obj,"matcher",args[0]);this.write(".find()");break;case FuId.MATCH_FIND_STR:case FuId.MATCH_FIND_REGEX:this.writeChar(40);obj.accept(this,FuPriority.ASSIGN);this.write(" = ");if(method.id==FuId.MATCH_FIND_STR)this.#writeCompileRegex(args,1);else args[1].accept(this,FuPriority.PRIMARY);this.writeCall(".matcher",args[0]);this.write(").find()");break;case FuId.MATCH_GET_CAPTURE:this.writeMethodCall(obj,"group",args[0]);break;case FuId.MATH_CEILING:this.writeCall("Math.ceil",args[0]);break;case FuId.MATH_CLAMP:this.write("Math.min(Math.max(");this.writeClampAsMinMax(args);break;case FuId.MATH_FUSED_MULTIPLY_ADD:this.writeCall("Math.fma",args[0],args[1],args[2]);break;case FuId.MATH_IS_FINITE:this.writeCall("Double.isFinite",args[0]);break;case FuId.MATH_IS_INFINITY:this.writeCall("Double.isInfinite",args[0]);break;case FuId.MATH_IS_NA_N:this.writeCall("Double.isNaN",args[0]);break;case FuId.MATH_LOG2:if(parent>FuPriority.MUL)this.writeChar(40);this.writeCall("Math.log",args[0]);this.write(" * 1.4426950408889635");if(parent>FuPriority.MUL)this.writeChar(41);break;case FuId.MATH_ROUND:this.writeCall("Math.rint",args[0]);break;default:this.notSupported(obj,method.name);break;}}writeIndexingExpr(expr,parent){if(parent!=FuPriority.ASSIGN&&GenJava.#isUnsignedByte(expr.type)){if(parent>FuPriority.AND)this.writeChar(40);this.#writeIndexingInternal(expr);this.write(" & 0xff");if(parent>FuPriority.AND)this.writeChar(41);}else this.#writeIndexingInternal(expr);}isPromoted(expr){return super.isPromoted(expr)||GenJava.#isUnsignedByteIndexing(expr);}writeAssignRight(expr){let rightBinary;if(!GenJava.#isUnsignedByteIndexing(expr.left)&&(rightBinary=expr.right)instanceof FuBinaryExpr&&rightBinary.isAssign()&&GenJava.#isUnsignedByte(expr.right.type)){this.writeChar(40);super.writeAssignRight(expr);this.write(") & 0xff");}else super.writeAssignRight(expr);}writeAssign(expr,parent){let indexing;let klass;if((indexing=expr.left)instanceof FuBinaryExpr&&indexing.op==FuToken.LEFT_BRACKET&&(klass=indexing.left.type)instanceof FuClassType&&!klass.isArray()){this.writePostfix(indexing.left,klass.class.id==FuId.LIST_CLASS?".set(":".put(");indexing.right.accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeNotPromoted(expr.type,expr.right);this.writeChar(41);}else super.writeAssign(expr,parent);}getIsOperator(){return " instanceof ";}writeVar(def){if(def.type.isFinal()&&!def.isAssignableStorage())this.write("final ");super.writeVar(def);}hasInitCode(def){return def.type instanceof FuArrayStorageType&&def.type.getStorageType()instanceof FuStorageType||super.hasInitCode(def);}writeInitCode(def){if(!this.hasInitCode(def))return;let array;if((array=def.type)instanceof FuArrayStorageType){let nesting=0;let innerArray;while((innerArray=array.getElementType())instanceof FuArrayStorageType){this.openLoop("int",nesting++,array.length);array=innerArray;}this.openLoop("int",nesting++,array.length);this.writeArrayElement(def,nesting);this.write(" = ");const storage=array.getElementType();this.writeNew(storage,FuPriority.ARGUMENT);this.writeCharLine(59);while(--nesting>=0)this.closeBlock();}else super.writeInitCode(def);}visitLambdaExpr(expr){this.writeName(expr.first);this.write(" -> ");expr.body.accept(this,FuPriority.STATEMENT);}defineIsVar(binary){}writeAssert(statement){if(statement.completesNormally()){this.write("assert ");statement.cond.accept(this,FuPriority.ARGUMENT);if(statement.message!=null){this.write(" : ");statement.message.accept(this,FuPriority.ARGUMENT);}}else {this.write("throw new AssertionError(");if(statement.message!=null)statement.message.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}this.writeCharLine(59);}visitForeach(statement){this.write("for (");const klass=statement.collection.type;switch(klass.class.id){case FuId.STRING_CLASS:this.write("int _i = 0; _i < ");this.writeStringLength(statement.collection);this.write("; _i++) ");this.openBlock();this.writeTypeAndName(statement.getVar());this.write(" = ");statement.collection.accept(this,FuPriority.PRIMARY);this.writeLine(".charAt(_i);");this.flattenBlock(statement.body);this.closeBlock();return;case FuId.DICTIONARY_CLASS:case FuId.SORTED_DICTIONARY_CLASS:case FuId.ORDERED_DICTIONARY_CLASS:this.include("java.util.Map");this.#writeDictType("Map.Entry",klass);this.writeChar(32);this.write(statement.getVar().name);this.write(" : ");this.writePostfix(statement.collection,".entrySet()");break;default:this.writeTypeAndName(statement.getVar());this.write(" : ");statement.collection.accept(this,FuPriority.ARGUMENT);break;}this.writeChar(41);this.writeChild(statement.body);}visitLock(statement){this.writeCall("synchronized ",statement.lock);this.writeChild(statement.body);}writeSwitchValue(expr){if(GenJava.#isUnsignedByteIndexing(expr)){const indexing=expr;this.#writeIndexingInternal(indexing);}else super.writeSwitchValue(expr);}writeSwitchCaseValue(statement,value){let symbol;let enu;if((symbol=value)instanceof FuSymbolReference&&(enu=symbol.symbol.parent)instanceof FuEnum&&GenJava.#isJavaEnum(enu))this.writeUppercaseWithUnderscores(symbol.name);else super.writeSwitchCaseValue(statement,value);}#writeSwitchCaseVar(expr){expr.accept(this,FuPriority.ARGUMENT);let def;if((def=expr)instanceof FuVar&&def.name=="_"){this.visitLiteralLong(BigInt(this.#switchCaseDiscards++));return true;}return false;}writeSwitchCase(statement,kase){if(statement.isTypeMatching()){for(const expr of kase.values){this.write("case ");let discard;let when1;if((when1=expr)instanceof FuBinaryExpr){discard=this.#writeSwitchCaseVar(when1.left);this.write(" when ");when1.right.accept(this,FuPriority.ARGUMENT);}else discard=this.#writeSwitchCaseVar(expr);this.writeCharLine(58);this.indent++;this.writeSwitchCaseBody(kase.body);this.indent--;if(discard)this.#switchCaseDiscards--;}}else super.writeSwitchCase(statement,kase);}visitThrow(statement){this.write("throw new Exception(");statement.message.accept(this,FuPriority.ARGUMENT);this.writeLine(");");}#createJavaFile(className){this.createFile(this.outputFile,className+".java");if(this.namespace.length!=0){this.write("package ");this.write(this.namespace);this.writeCharLine(59);}}visitEnumValue(konst,previous){this.writeDoc(konst.documentation);this.write("int ");this.writeUppercaseWithUnderscores(konst.name);this.write(" = ");let imp;if((imp=konst.value)instanceof FuImplicitEnumValue)this.visitLiteralLong(BigInt(imp.value));else konst.value.accept(this,FuPriority.ARGUMENT);this.writeCharLine(59);}writeEnum(enu){this.#createJavaFile(enu.name);this.writeNewLine();this.writeDoc(enu.documentation);this.writePublic(enu);let javaEnum=GenJava.#isJavaEnum(enu);this.write(javaEnum?"enum ":"interface ");this.writeLine(enu.name);this.openBlock();if(javaEnum){for(let symbol=enu.getFirstValue();;){this.writeDoc(symbol.documentation);this.writeUppercaseWithUnderscores(symbol.name);symbol=symbol.next;if(symbol==null)break;this.writeCharLine(44);}this.writeNewLine();}else enu.acceptValues(this);this.closeBlock();this.closeFile();}#writeSignature(method,paramCount){this.writeNewLine();this.writeMethodDoc(method);this.#writeVisibility(method.visibility);switch(method.callType){case FuCallType.STATIC:this.write("static ");break;case FuCallType.VIRTUAL:break;case FuCallType.ABSTRACT:this.write("abstract ");break;case FuCallType.OVERRIDE:this.write("@Override ");break;case FuCallType.NORMAL:if(method.visibility!=FuVisibility.PRIVATE)this.write("final ");break;case FuCallType.SEALED:this.write("final @Override ");break;default:throw new Error();}this.writeTypeAndName(method);this.writeChar(40);let param=method.parameters.firstParameter();for(let i=0;i<paramCount;i++){if(i>0)this.write(", ");this.writeTypeAndName(param);param=param.nextParameter();}this.writeChar(41);if(method.throws)this.write(" throws Exception");}#writeOverloads(method,paramCount){if(paramCount+1<method.parameters.count())this.#writeOverloads(method,paramCount+1);this.#writeSignature(method,paramCount);this.writeNewLine();this.openBlock();if(method.type.id!=FuId.VOID_TYPE)this.write("return ");this.writeName(method);this.writeChar(40);let param=method.parameters.firstParameter();for(let i=0;i<paramCount;i++){this.writeName(param);this.write(", ");param=param.nextParameter();}param.value.accept(this,FuPriority.ARGUMENT);this.writeLine(");");this.closeBlock();}writeConst(konst){this.writeNewLine();this.writeDoc(konst.documentation);this.#writeVisibility(konst.visibility);this.write("static final ");this.writeTypeAndName(konst);this.write(" = ");this.writeCoercedExpr(konst.type,konst.value);this.writeCharLine(59);}writeField(field){this.writeDoc(field.documentation);this.#writeVisibility(field.visibility);this.writeVar(field);this.writeCharLine(59);}writeMethod(method){this.#writeSignature(method,method.parameters.count());this.writeBody(method);let i=0;for(let param=method.parameters.firstParameter();param!=null;param=param.nextParameter()){if(param.value!=null){this.#writeOverloads(method,i);break;}i++;}}writeClass(klass,program){this.openStringWriter();this.writeDoc(klass.documentation);this.writePublic(klass);switch(klass.callType){case FuCallType.NORMAL:break;case FuCallType.ABSTRACT:this.write("abstract ");break;case FuCallType.STATIC:case FuCallType.SEALED:this.write("final ");break;default:throw new Error();}this.openClass(klass,""," extends ");if(klass.callType==FuCallType.STATIC){this.write("private ");this.write(klass.name);this.writeLine("()");this.openBlock();this.closeBlock();}else if(this.needsConstructor(klass)){if(klass.constructor_!=null){this.writeDoc(klass.constructor_.documentation);this.#writeVisibility(klass.constructor_.visibility);}this.write(klass.name);this.writeLine("()");this.openBlock();this.writeConstructorBody(klass);this.closeBlock();}this.writeMembers(klass,true);this.closeBlock();this.#createJavaFile(klass.name);this.writeTopLevelNatives(program);this.writeIncludes("import ",";");this.writeNewLine();this.closeStringWriter();this.closeFile();}#writeResources(){this.#createJavaFile("FuResource");this.writeLine("import java.io.DataInputStream;");this.writeLine("import java.io.IOException;");this.writeNewLine();this.write("class FuResource");this.writeNewLine();this.openBlock();this.writeLine("static byte[] getByteArray(String name, int length)");this.openBlock();this.write("DataInputStream dis = new DataInputStream(");this.writeLine("FuResource.class.getResourceAsStream(name));");this.writeLine("byte[] result = new byte[length];");this.write("try ");this.openBlock();this.write("try ");this.openBlock();this.writeLine("dis.readFully(result);");this.closeBlock();this.write("finally ");this.openBlock();this.writeLine("dis.close();");this.closeBlock();this.closeBlock();this.write("catch (IOException e) ");this.openBlock();this.writeLine("throw new RuntimeException();");this.closeBlock();this.writeLine("return result;");this.closeBlock();this.closeBlock();this.closeFile();}writeProgram(program){this.#switchCaseDiscards=0;this.writeTypes(program);if(Object.keys(program.resources).length>0)this.#writeResources();}}class GenJsNoModule extends GenBase{#switchesWithLabel=[];#stringWriter=false;getTargetName(){return "JavaScript";}#writeCamelCaseNotKeyword(name){this.writeCamelCase(name);switch(name){case"Constructor":case"arguments":case"await":case"catch":case"debugger":case"delete":case"export":case"extends":case"finally":case"function":case"implements":case"import":case"instanceof":case"interface":case"let":case"package":case"private":case"super":case"try":case"typeof":case"var":case"with":case"yield":this.writeChar(95);break;}}writeName(symbol){if(symbol instanceof FuContainerType)this.write(symbol.name);else if(symbol instanceof FuConst){const konst=symbol;if(konst.visibility==FuVisibility.PRIVATE)this.writeChar(35);if(konst.inMethod!=null){this.writeUppercaseWithUnderscores(konst.inMethod.name);this.writeChar(95);}this.writeUppercaseWithUnderscores(symbol.name);}else if(symbol instanceof FuVar)this.#writeCamelCaseNotKeyword(symbol.name);else if(symbol instanceof FuMember){const member=symbol;if(member.visibility==FuVisibility.PRIVATE){this.writeChar(35);this.writeCamelCase(symbol.name);if(symbol.name=="Constructor")this.writeChar(95);}else this.#writeCamelCaseNotKeyword(symbol.name);}else throw new Error();}writeTypeAndName(value){this.writeName(value);}writeArrayElementType(type){switch(type.id){case FuId.S_BYTE_RANGE:this.write("Int8");break;case FuId.BYTE_RANGE:this.write("Uint8");break;case FuId.SHORT_RANGE:this.write("Int16");break;case FuId.U_SHORT_RANGE:this.write("Uint16");break;case FuId.INT_TYPE:this.write("Int32");break;case FuId.LONG_TYPE:this.write("BigInt64");break;case FuId.FLOAT_TYPE:this.write("Float32");break;case FuId.DOUBLE_TYPE:this.write("Float64");break;default:throw new Error();}}visitAggregateInitializer(expr){const array=expr.type;let numeric=false;let number;if((number=array.getElementType())instanceof FuNumericType){this.write("new ");this.writeArrayElementType(number);this.write("Array(");numeric=true;}this.write("[ ");this.writeCoercedLiterals(null,expr.items);this.write(" ]");if(numeric)this.writeChar(41);}writeNew(klass,parent){switch(klass.class.id){case FuId.LIST_CLASS:case FuId.QUEUE_CLASS:case FuId.STACK_CLASS:this.write("[]");break;case FuId.HASH_SET_CLASS:case FuId.SORTED_SET_CLASS:this.write("new Set()");break;case FuId.DICTIONARY_CLASS:case FuId.SORTED_DICTIONARY_CLASS:this.write("{}");break;case FuId.ORDERED_DICTIONARY_CLASS:this.write("new Map()");break;case FuId.LOCK_CLASS:this.notSupported(klass,"Lock");break;default:this.write("new ");if(klass.class.id==FuId.STRING_WRITER_CLASS)this.#stringWriter=true;this.write(klass.class.name);this.write("()");break;}}writeNewWithFields(type,init){this.write("Object.assign(");this.writeNew(type,FuPriority.ARGUMENT);this.writeChar(44);this.writeObjectLiteral(init,": ");this.writeChar(41);}writeVar(def){this.write(def.type.isFinal()&&!def.isAssignableStorage()?"const ":"let ");super.writeVar(def);}#writeInterpolatedLiteral(s){let i=0;for(const c of s){i++;if(c.codePointAt(0)==96||c.codePointAt(0)==36&&i<s.length&&s.charCodeAt(i)==123)this.writeChar(92);this.writeChar(c.codePointAt(0));}}visitInterpolatedString(expr,parent){this.writeChar(96);for(const part of expr.parts){this.#writeInterpolatedLiteral(part.prefix);this.write("${");if(part.width!=0||part.format!=32){if(part.argument instanceof FuLiteralLong||part.argument instanceof FuPrefixExpr){this.writeChar(40);part.argument.accept(this,FuPriority.PRIMARY);this.writeChar(41);}else part.argument.accept(this,FuPriority.PRIMARY);if(part.argument.type instanceof FuNumericType){switch(part.format){case 69:this.write(".toExponential(");if(part.precision>=0)this.visitLiteralLong(BigInt(part.precision));this.write(").toUpperCase()");break;case 101:this.write(".toExponential(");if(part.precision>=0)this.visitLiteralLong(BigInt(part.precision));this.writeChar(41);break;case 70:case 102:this.write(".toFixed(");if(part.precision>=0)this.visitLiteralLong(BigInt(part.precision));this.writeChar(41);break;case 88:this.write(".toString(16).toUpperCase()");break;case 120:this.write(".toString(16)");break;default:this.write(".toString()");break;}if(part.precision>=0){switch(part.format){case 68:case 100:case 88:case 120:this.write(".padStart(");this.visitLiteralLong(BigInt(part.precision));this.write(", \"0\")");break;}}}if(part.width>0){this.write(".padStart(");this.visitLiteralLong(BigInt(part.width));this.writeChar(41);}else if(part.width<0){this.write(".padEnd(");this.visitLiteralLong(BigInt(-part.width));this.writeChar(41);}}else part.argument.accept(this,FuPriority.ARGUMENT);this.writeChar(125);}this.#writeInterpolatedLiteral(expr.suffix);this.writeChar(96);}writeLocalName(symbol,parent){let member;if((member=symbol)instanceof FuMember){if(!member.isStatic())this.write("this");else if(this.currentMethod!=null)this.write(this.currentMethod.parent.name);else {let konst;if((konst=symbol)instanceof FuConst){konst.value.accept(this,parent);return;}else throw new Error();}this.writeChar(46);}this.writeName(symbol);let forEach;if((forEach=symbol.parent)instanceof FuForeach&&forEach.collection.type instanceof FuStringType)this.write(".codePointAt(0)");}writeCoercedInternal(type,expr,parent){if(type instanceof FuNumericType){if(type.id==FuId.LONG_TYPE){if(expr instanceof FuLiteralLong){expr.accept(this,FuPriority.PRIMARY);this.writeChar(110);return;}if(expr.type.id!=FuId.LONG_TYPE){this.writeCall("BigInt",expr);return;}}else if(expr.type.id==FuId.LONG_TYPE){this.writeCall("Number",expr);return;}}expr.accept(this,parent);}writeNewArray(elementType,lengthExpr,parent){this.write("new ");if(elementType instanceof FuNumericType)this.writeArrayElementType(elementType);this.writeCall("Array",lengthExpr);}hasInitCode(def){let array;return (array=def.type)instanceof FuArrayStorageType&&array.getElementType()instanceof FuStorageType;}writeInitCode(def){if(!this.hasInitCode(def))return;let array=def.type;let nesting=0;let innerArray;while((innerArray=array.getElementType())instanceof FuArrayStorageType){this.openLoop("let",nesting++,array.length);this.writeArrayElement(def,nesting);this.write(" = ");this.writeNewArray(innerArray.getElementType(),innerArray.lengthExpr,FuPriority.ARGUMENT);this.writeCharLine(59);array=innerArray;}let klass;if((klass=array.getElementType())instanceof FuStorageType){this.openLoop("let",nesting++,array.length);this.writeArrayElement(def,nesting);this.write(" = ");this.writeNew(klass,FuPriority.ARGUMENT);this.writeCharLine(59);}while(--nesting>=0)this.closeBlock();}writeResource(name,length){this.write("Fu.");this.writeResourceName(name);}visitSymbolReference(expr,parent){switch(expr.symbol.id){case FuId.CONSOLE_ERROR:this.write("process.stderr");break;case FuId.LIST_COUNT:case FuId.QUEUE_COUNT:case FuId.STACK_COUNT:this.writePostfix(expr.left,".length");break;case FuId.HASH_SET_COUNT:case FuId.SORTED_SET_COUNT:case FuId.ORDERED_DICTIONARY_COUNT:this.writePostfix(expr.left,".size");break;case FuId.DICTIONARY_COUNT:case FuId.SORTED_DICTIONARY_COUNT:this.writeCall("Object.keys",expr.left);this.write(".length");break;case FuId.MATCH_START:this.writePostfix(expr.left,".index");break;case FuId.MATCH_END:if(parent>FuPriority.ADD)this.writeChar(40);this.writePostfix(expr.left,".index + ");this.writePostfix(expr.left,"[0].length");if(parent>FuPriority.ADD)this.writeChar(41);break;case FuId.MATCH_LENGTH:this.writePostfix(expr.left,"[0].length");break;case FuId.MATCH_VALUE:this.writePostfix(expr.left,"[0]");break;case FuId.MATH_NA_N:this.write("NaN");break;case FuId.MATH_NEGATIVE_INFINITY:this.write("-Infinity");break;case FuId.MATH_POSITIVE_INFINITY:this.write("Infinity");break;default:super.visitSymbolReference(expr,parent);break;}}writeStringLength(expr){this.writePostfix(expr,".length");}writeCharAt(expr){this.writeMethodCall(expr.left,"charCodeAt",expr.right);}writeBinaryOperand(expr,parent,binary){this.writeCoerced(binary.isRel()?expr.type:binary.type,expr,parent);}static#isIdentifier(s){if(s.length==0||s.charCodeAt(0)<65)return false;for(const c of s){if(!FuLexer.isLetterOrDigit(c.codePointAt(0)))return false;}return true;}#writeNewRegex(args,argIndex){let pattern=args[argIndex];let literal;if((literal=pattern)instanceof FuLiteralString){this.writeChar(47);let escaped=false;for(const c of literal.value){switch(c.codePointAt(0)){case 92:if(!escaped){escaped=true;continue;}escaped=false;break;case 34:case 39:escaped=false;break;case 47:escaped=true;break;}if(escaped){this.writeChar(92);escaped=false;}this.writeChar(c.codePointAt(0));}this.writeChar(47);this.writeRegexOptions(args,"","","","i","m","s");}else {this.write("new RegExp(");pattern.accept(this,FuPriority.ARGUMENT);this.writeRegexOptions(args,", \"","","\"","i","m","s");this.writeChar(41);}}static#hasLong(args){return args.some(arg=>arg.type.id==FuId.LONG_TYPE);}#writeMathMaxMin(method,name,op,args){if(GenJsNoModule.#hasLong(args)){this.write("((x, y) => x ");this.writeChar(op);this.write(" y ? x : y)");this.writeArgsInParentheses(method,args);}else this.writeCall(name,args[0],args[1]);}writeCallExpr(obj,method,args,parent){switch(method.id){case FuId.NONE:case FuId.CLASS_TO_STRING:case FuId.STRING_ENDS_WITH:case FuId.STRING_INDEX_OF:case FuId.STRING_LAST_INDEX_OF:case FuId.STRING_STARTS_WITH:case FuId.ARRAY_SORT_ALL:case FuId.LIST_INDEX_OF:case FuId.STACK_PUSH:case FuId.STACK_POP:case FuId.HASH_SET_ADD:case FuId.HASH_SET_CLEAR:case FuId.SORTED_SET_ADD:case FuId.SORTED_SET_CLEAR:case FuId.ORDERED_DICTIONARY_CLEAR:case FuId.STRING_WRITER_CLEAR:case FuId.STRING_WRITER_TO_STRING:case FuId.MATH_METHOD:case FuId.MATH_LOG2:case FuId.MATH_MAX_DOUBLE:case FuId.MATH_MIN_DOUBLE:case FuId.MATH_ROUND:if(obj==null)this.writeLocalName(method,FuPriority.PRIMARY);else {if(GenJsNoModule.isReferenceTo(obj,FuId.BASE_PTR))this.write("super");else obj.accept(this,FuPriority.PRIMARY);this.writeChar(46);this.writeName(method);}this.writeArgsInParentheses(method,args);break;case FuId.ENUM_FROM_INT:args[0].accept(this,parent);break;case FuId.ENUM_HAS_FLAG:this.writeEnumHasFlag(obj,args,parent);break;case FuId.INT_TRY_PARSE:this.write("!isNaN(");obj.accept(this,FuPriority.ASSIGN);this.write(" = parseInt(");args[0].accept(this,FuPriority.ARGUMENT);this.writeTryParseRadix(args);this.write("))");break;case FuId.LONG_TRY_PARSE:if(args.length!=1)this.notSupported(args[1],"Radix");this.write("(() => { try { ");obj.accept(this,FuPriority.ASSIGN);this.write("  = BigInt(");args[0].accept(this,FuPriority.ARGUMENT);this.write("); return true; } catch { return false; }})()");break;case FuId.DOUBLE_TRY_PARSE:this.write("!isNaN(");obj.accept(this,FuPriority.ASSIGN);this.write(" = parseFloat(");args[0].accept(this,FuPriority.ARGUMENT);this.write("))");break;case FuId.STRING_CONTAINS:case FuId.ARRAY_CONTAINS:case FuId.LIST_CONTAINS:this.writeMethodCall(obj,"includes",args[0]);break;case FuId.STRING_REPLACE:this.writeMethodCall(obj,"replaceAll",args[0],args[1]);break;case FuId.STRING_SUBSTRING:this.writePostfix(obj,".substring(");args[0].accept(this,FuPriority.ARGUMENT);if(args.length==2){this.write(", ");this.writeAdd(args[0],args[1]);}this.writeChar(41);break;case FuId.ARRAY_FILL_ALL:case FuId.ARRAY_FILL_PART:this.writePostfix(obj,".fill(");args[0].accept(this,FuPriority.ARGUMENT);if(args.length==3){this.write(", ");this.writeStartEnd(args[1],args[2]);}this.writeChar(41);break;case FuId.ARRAY_COPY_TO:case FuId.LIST_COPY_TO:args[1].accept(this,FuPriority.PRIMARY);let sourceStorage;let literalLength;let wholeSource=(sourceStorage=obj.type)instanceof FuArrayStorageType&&args[0].isLiteralZero()&&(literalLength=args[3])instanceof FuLiteralLong&&literalLength.value==sourceStorage.length;if(obj.type.asClassType().getElementType()instanceof FuNumericType){this.write(".set(");if(wholeSource)obj.accept(this,FuPriority.ARGUMENT);else {this.writePostfix(obj,method.id==FuId.ARRAY_COPY_TO?".subarray(":".slice(");this.writeStartEnd(args[0],args[3]);this.writeChar(41);}if(!args[2].isLiteralZero()){this.write(", ");args[2].accept(this,FuPriority.ARGUMENT);}}else {this.write(".splice(");args[2].accept(this,FuPriority.ARGUMENT);this.write(", ");args[3].accept(this,FuPriority.ARGUMENT);this.write(", ...");obj.accept(this,FuPriority.PRIMARY);if(!wholeSource){this.write(".slice(");this.writeStartEnd(args[0],args[3]);this.writeChar(41);}}this.writeChar(41);break;case FuId.ARRAY_SORT_PART:this.writePostfix(obj,".subarray(");this.writeStartEnd(args[0],args[1]);this.write(").sort()");break;case FuId.LIST_ADD:this.writeListAdd(obj,"push",args);break;case FuId.LIST_ADD_RANGE:this.writePostfix(obj,".push(...");args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.LIST_ALL:this.writeMethodCall(obj,"every",args[0]);break;case FuId.LIST_ANY:this.writeMethodCall(obj,"some",args[0]);break;case FuId.LIST_CLEAR:case FuId.QUEUE_CLEAR:case FuId.STACK_CLEAR:this.writePostfix(obj,".length = 0");break;case FuId.LIST_INSERT:this.writeListInsert(obj,"splice",args,", 0, ");break;case FuId.LIST_LAST:case FuId.STACK_PEEK:this.writePostfix(obj,".at(-1)");break;case FuId.LIST_REMOVE_AT:this.writePostfix(obj,".splice(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", 1)");break;case FuId.LIST_REMOVE_RANGE:this.writeMethodCall(obj,"splice",args[0],args[1]);break;case FuId.LIST_SORT_ALL:this.writePostfix(obj,".sort((a, b) => a - b)");break;case FuId.LIST_SORT_PART:this.writePostfix(obj,".splice(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", ");args[1].accept(this,FuPriority.ARGUMENT);this.write(", ...");this.writePostfix(obj,".slice(");this.writeStartEnd(args[0],args[1]);this.write(").sort((a, b) => a - b))");break;case FuId.QUEUE_DEQUEUE:this.writePostfix(obj,".shift()");break;case FuId.QUEUE_ENQUEUE:this.writeMethodCall(obj,"push",args[0]);break;case FuId.QUEUE_PEEK:this.writePostfix(obj,"[0]");break;case FuId.HASH_SET_CONTAINS:case FuId.SORTED_SET_CONTAINS:case FuId.ORDERED_DICTIONARY_CONTAINS_KEY:this.writeMethodCall(obj,"has",args[0]);break;case FuId.HASH_SET_REMOVE:case FuId.SORTED_SET_REMOVE:case FuId.ORDERED_DICTIONARY_REMOVE:this.writeMethodCall(obj,"delete",args[0]);break;case FuId.DICTIONARY_ADD:this.writeDictionaryAdd(obj,args);break;case FuId.DICTIONARY_CLEAR:case FuId.SORTED_DICTIONARY_CLEAR:this.write("for (const key in ");obj.accept(this,FuPriority.ARGUMENT);this.writeCharLine(41);this.write("\tdelete ");this.writePostfix(obj,"[key];");break;case FuId.DICTIONARY_CONTAINS_KEY:case FuId.SORTED_DICTIONARY_CONTAINS_KEY:this.writeMethodCall(obj,"hasOwnProperty",args[0]);break;case FuId.DICTIONARY_REMOVE:case FuId.SORTED_DICTIONARY_REMOVE:this.write("delete ");this.writeIndexing(obj,args[0]);break;case FuId.TEXT_WRITER_WRITE:this.writePostfix(obj,".write(");if(args[0].type instanceof FuStringType)args[0].accept(this,FuPriority.ARGUMENT);else this.writeCall("String",args[0]);this.writeChar(41);break;case FuId.TEXT_WRITER_WRITE_CHAR:this.writeMethodCall(obj,"write(String.fromCharCode",args[0]);this.writeChar(41);break;case FuId.TEXT_WRITER_WRITE_CODE_POINT:this.writeMethodCall(obj,"write(String.fromCodePoint",args[0]);this.writeChar(41);break;case FuId.TEXT_WRITER_WRITE_LINE:if(GenJsNoModule.isReferenceTo(obj,FuId.CONSOLE_ERROR)){this.write("console.error(");if(args.length==0)this.write("\"\"");else args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(41);}else {this.writePostfix(obj,".write(");if(args.length!=0){args[0].accept(this,FuPriority.ADD);this.write(" + ");}this.write("\"\\n\")");}break;case FuId.CONSOLE_WRITE:this.write("process.stdout.write(");if(args[0].type instanceof FuStringType)args[0].accept(this,FuPriority.ARGUMENT);else this.writeCall("String",args[0]);this.writeChar(41);break;case FuId.CONSOLE_WRITE_LINE:this.write("console.log(");if(args.length==0)this.write("\"\"");else args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.U_T_F8_GET_BYTE_COUNT:this.write("new TextEncoder().encode(");args[0].accept(this,FuPriority.ARGUMENT);this.write(").length");break;case FuId.U_T_F8_GET_BYTES:this.write("new TextEncoder().encodeInto(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", ");if(args[2].isLiteralZero())args[1].accept(this,FuPriority.ARGUMENT);else this.writeMethodCall(args[1],"subarray",args[2]);this.writeChar(41);break;case FuId.U_T_F8_GET_STRING:this.write("new TextDecoder().decode(");this.writePostfix(args[0],".subarray(");args[1].accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeAdd(args[1],args[2]);this.write("))");break;case FuId.ENVIRONMENT_GET_ENVIRONMENT_VARIABLE:let literal;if((literal=args[0])instanceof FuLiteralString&&GenJsNoModule.#isIdentifier(literal.value)){this.write("process.env.");this.write(literal.value);}else {this.write("process.env[");args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(93);}break;case FuId.REGEX_COMPILE:this.#writeNewRegex(args,0);break;case FuId.REGEX_ESCAPE:this.writePostfix(args[0],".replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g, '\\\\$&')");break;case FuId.REGEX_IS_MATCH_STR:this.#writeNewRegex(args,1);this.writeCall(".test",args[0]);break;case FuId.REGEX_IS_MATCH_REGEX:this.writeMethodCall(obj,"test",args[0]);break;case FuId.MATCH_FIND_STR:case FuId.MATCH_FIND_REGEX:if(parent>FuPriority.EQUALITY)this.writeChar(40);this.writeChar(40);obj.accept(this,FuPriority.ASSIGN);this.write(" = ");if(method.id==FuId.MATCH_FIND_STR)this.#writeNewRegex(args,1);else args[1].accept(this,FuPriority.PRIMARY);this.writeCall(".exec",args[0]);this.write(") != null");if(parent>FuPriority.EQUALITY)this.writeChar(41);break;case FuId.MATCH_GET_CAPTURE:this.writeIndexing(obj,args[0]);break;case FuId.MATH_ABS:this.writeCall(args[0].type.id==FuId.LONG_TYPE?"(x => x < 0n ? -x : x)":"Math.abs",args[0]);break;case FuId.MATH_CEILING:this.writeCall("Math.ceil",args[0]);break;case FuId.MATH_CLAMP:if(method.type.id==FuId.INT_TYPE&&GenJsNoModule.#hasLong(args)){this.write("((x, min, max) => x < min ? min : x > max ? max : x)");this.writeArgsInParentheses(method,args);}else {this.write("Math.min(Math.max(");this.writeClampAsMinMax(args);}break;case FuId.MATH_FUSED_MULTIPLY_ADD:if(parent>FuPriority.ADD)this.writeChar(40);args[0].accept(this,FuPriority.MUL);this.write(" * ");args[1].accept(this,FuPriority.MUL);this.write(" + ");args[2].accept(this,FuPriority.ADD);if(parent>FuPriority.ADD)this.writeChar(41);break;case FuId.MATH_IS_FINITE:case FuId.MATH_IS_NA_N:this.writeCamelCase(method.name);this.writeArgsInParentheses(method,args);break;case FuId.MATH_IS_INFINITY:if(parent>FuPriority.EQUALITY)this.writeChar(40);this.writeCall("Math.abs",args[0]);this.write(" == Infinity");if(parent>FuPriority.EQUALITY)this.writeChar(41);break;case FuId.MATH_MAX_INT:this.#writeMathMaxMin(method,"Math.max",62,args);break;case FuId.MATH_MIN_INT:this.#writeMathMaxMin(method,"Math.min",60,args);break;case FuId.MATH_TRUNCATE:this.writeCall("Math.trunc",args[0]);break;default:this.notSupported(obj,method.name);break;}}writeIndexingExpr(expr,parent){let dict;if((dict=expr.left.type)instanceof FuClassType&&dict.class.id==FuId.ORDERED_DICTIONARY_CLASS)this.writeMethodCall(expr.left,"get",expr.right);else super.writeIndexingExpr(expr,parent);}writeAssign(expr,parent){let indexing;let dict;if((indexing=expr.left)instanceof FuBinaryExpr&&indexing.op==FuToken.LEFT_BRACKET&&(dict=indexing.left.type)instanceof FuClassType&&dict.class.id==FuId.ORDERED_DICTIONARY_CLASS)this.writeMethodCall(indexing.left,"set",indexing.right,expr.right);else super.writeAssign(expr,parent);}getIsOperator(){return " instanceof ";}writeBoolAndOr(expr){this.write("!!");super.visitBinaryExpr(expr,FuPriority.PRIMARY);}#writeBoolAndOrAssign(expr,parent){expr.right.accept(this,parent);this.writeCharLine(41);this.writeChar(9);expr.left.accept(this,FuPriority.ASSIGN);}#writeIsVar(expr,def,assign,parent){if(parent>FuPriority.REL)this.writeChar(40);if(assign){this.writeChar(40);this.#writeCamelCaseNotKeyword(def.name);this.write(" = ");expr.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}else expr.accept(this,FuPriority.REL);this.write(" instanceof ");this.write(def.type.name);if(parent>FuPriority.REL)this.writeChar(41);}visitBinaryExpr(expr,parent){let def;if(expr.op==FuToken.SLASH&&expr.type instanceof FuIntegerType&&expr.type.id!=FuId.LONG_TYPE){if(parent>FuPriority.OR)this.writeChar(40);expr.left.accept(this,FuPriority.MUL);this.write(" / ");expr.right.accept(this,FuPriority.PRIMARY);this.write(" | 0");if(parent>FuPriority.OR)this.writeChar(41);}else if(expr.op==FuToken.DIV_ASSIGN&&expr.type instanceof FuIntegerType&&expr.type.id!=FuId.LONG_TYPE){if(parent>FuPriority.ASSIGN)this.writeChar(40);expr.left.accept(this,FuPriority.ASSIGN);this.write(" = ");expr.left.accept(this,FuPriority.MUL);this.write(" / ");expr.right.accept(this,FuPriority.PRIMARY);this.write(" | 0");if(parent>FuPriority.ASSIGN)this.writeChar(41);}else if(expr.op==FuToken.AND&&expr.type.id==FuId.BOOL_TYPE||expr.op==FuToken.OR&&expr.type.id==FuId.BOOL_TYPE)this.writeBoolAndOr(expr);else if(expr.op==FuToken.XOR&&expr.type.id==FuId.BOOL_TYPE)this.writeEqual(expr.left,expr.right,parent,true);else if(expr.op==FuToken.AND_ASSIGN&&expr.type.id==FuId.BOOL_TYPE){this.write("if (!");this.#writeBoolAndOrAssign(expr,FuPriority.PRIMARY);this.write(" = false");}else if(expr.op==FuToken.OR_ASSIGN&&expr.type.id==FuId.BOOL_TYPE){this.write("if (");this.#writeBoolAndOrAssign(expr,FuPriority.ARGUMENT);this.write(" = true");}else if(expr.op==FuToken.XOR_ASSIGN&&expr.type.id==FuId.BOOL_TYPE){expr.left.accept(this,FuPriority.ASSIGN);this.write(" = ");this.writeEqual(expr.left,expr.right,FuPriority.ARGUMENT,true);}else if(expr.op==FuToken.IS&&(def=expr.right)instanceof FuVar)this.#writeIsVar(expr.left,def,true,parent);else super.visitBinaryExpr(expr,parent);}visitLambdaExpr(expr){this.writeName(expr.first);this.write(" => ");if(GenJsNoModule.hasTemporaries(expr.body)){this.openBlock();this.writeTemporaries(expr.body);this.write("return ");expr.body.accept(this,FuPriority.ARGUMENT);this.writeCharLine(59);this.closeBlock();}else expr.body.accept(this,FuPriority.STATEMENT);}startTemporaryVar(type){throw new Error();}defineObjectLiteralTemporary(expr){}writeAsType(def){}#writeVarCast(def,value){this.write(def.isAssigned?"let ":"const ");this.#writeCamelCaseNotKeyword(def.name);this.write(" = ");value.accept(this,FuPriority.ARGUMENT);this.writeAsType(def);this.writeCharLine(59);}writeAssertCast(expr){const def=expr.right;this.#writeVarCast(def,expr.left);}writeAssert(statement){if(statement.completesNormally()){this.writeTemporaries(statement.cond);this.write("console.assert(");statement.cond.accept(this,FuPriority.ARGUMENT);if(statement.message!=null){this.write(", ");statement.message.accept(this,FuPriority.ARGUMENT);}}else {this.write("throw new Error(");if(statement.message!=null)statement.message.accept(this,FuPriority.ARGUMENT);}this.writeLine(");");}visitBreak(statement){let switchStatement;if((switchStatement=statement.loopOrSwitch)instanceof FuSwitch){let label=this.#switchesWithLabel.indexOf(switchStatement);if(label>=0){this.write("break fuswitch");this.visitLiteralLong(BigInt(label));this.writeCharLine(59);return;}}super.visitBreak(statement);}visitForeach(statement){this.write("for (const ");const klass=statement.collection.type;switch(klass.class.id){case FuId.STRING_CLASS:case FuId.ARRAY_STORAGE_CLASS:case FuId.LIST_CLASS:case FuId.HASH_SET_CLASS:this.writeName(statement.getVar());this.write(" of ");statement.collection.accept(this,FuPriority.ARGUMENT);break;case FuId.SORTED_SET_CLASS:this.writeName(statement.getVar());this.write(" of ");if(klass.getElementType()instanceof FuNumericType){const number=klass.getElementType();this.write("new ");this.writeArrayElementType(number);this.write("Array(");}else if(klass.getElementType()instanceof FuEnum)this.write("new Int32Array(");else this.write("Array.from(");statement.collection.accept(this,FuPriority.ARGUMENT);this.write(").sort()");break;case FuId.DICTIONARY_CLASS:case FuId.SORTED_DICTIONARY_CLASS:case FuId.ORDERED_DICTIONARY_CLASS:this.writeChar(91);this.writeName(statement.getVar());this.write(", ");this.writeName(statement.getValueVar());this.write("] of ");if(klass.class.id==FuId.ORDERED_DICTIONARY_CLASS)statement.collection.accept(this,FuPriority.ARGUMENT);else {this.writeCall("Object.entries",statement.collection);if(statement.getVar().type instanceof FuStringType){if(klass.class.id==FuId.SORTED_DICTIONARY_CLASS)this.write(".sort((a, b) => a[0].localeCompare(b[0]))");}else if(statement.getVar().type instanceof FuNumericType||statement.getVar().type instanceof FuEnum){this.write(".map(e => [+e[0], e[1]])");if(klass.class.id==FuId.SORTED_DICTIONARY_CLASS)this.write(".sort((a, b) => a[0] - b[0])");}else throw new Error();}break;default:throw new Error();}this.writeChar(41);this.writeChild(statement.body);}visitLock(statement){this.notSupported(statement,"'lock'");}writeSwitchCaseCond(statement,value,parent){let def;if((def=value)instanceof FuVar)this.#writeIsVar(statement.value,def,parent==FuPriority.COND_AND&&def.name!="_",parent);else super.writeSwitchCaseCond(statement,value,parent);}writeIfCaseBody(body,doWhile,statement,kase){let caseVar;if(kase!=null&&(caseVar=kase.values[0])instanceof FuVar&&caseVar.name!="_"){this.writeChar(32);this.openBlock();this.#writeVarCast(caseVar,statement.value);this.writeFirstStatements(kase.body,FuSwitch.lengthWithoutTrailingBreak(kase.body));this.closeBlock();}else super.writeIfCaseBody(body,doWhile,statement,kase);}visitSwitch(statement){if(statement.isTypeMatching()||statement.hasWhen()){if(statement.cases.some(kase=>FuSwitch.hasEarlyBreak(kase.body))||FuSwitch.hasEarlyBreak(statement.defaultBody)){this.write("fuswitch");this.visitLiteralLong(BigInt(this.#switchesWithLabel.length));this.#switchesWithLabel.push(statement);this.write(": ");this.openBlock();this.writeSwitchAsIfs(statement,false);this.closeBlock();}else this.writeSwitchAsIfs(statement,false);}else super.visitSwitch(statement);}visitThrow(statement){this.write("throw ");statement.message.accept(this,FuPriority.ARGUMENT);this.writeCharLine(59);}startContainerType(container){this.writeNewLine();this.writeDoc(container.documentation);}visitEnumValue(konst,previous){if(previous!=null)this.writeCharLine(44);this.writeDoc(konst.documentation);this.writeUppercaseWithUnderscores(konst.name);this.write(" : ");this.visitLiteralLong(BigInt(konst.value.intValue()));}writeEnum(enu){this.startContainerType(enu);this.write("const ");this.write(enu.name);this.write(" = ");this.openBlock();enu.acceptValues(this);this.writeNewLine();this.closeBlock();}writeConst(konst){if(konst.visibility!=FuVisibility.PRIVATE||konst.type instanceof FuArrayStorageType){this.writeNewLine();this.writeDoc(konst.documentation);this.write("static ");this.writeName(konst);this.write(" = ");konst.value.accept(this,FuPriority.ARGUMENT);this.writeCharLine(59);}}writeField(field){this.writeDoc(field.documentation);super.writeVar(field);this.writeCharLine(59);}writeMethod(method){if(method.callType==FuCallType.ABSTRACT)return;this.#switchesWithLabel.length=0;this.writeNewLine();this.writeMethodDoc(method);if(method.callType==FuCallType.STATIC)this.write("static ");this.writeName(method);this.writeParameters(method,true);this.writeBody(method);}writeConstructor(klass){this.#switchesWithLabel.length=0;this.writeLine("constructor()");this.openBlock();if(klass.parent instanceof FuClass)this.writeLine("super();");this.writeConstructorBody(klass);this.closeBlock();}writeClass(klass,program){if(!this.writeBaseClass(klass,program))return;this.startContainerType(klass);this.openClass(klass,""," extends ");if(this.needsConstructor(klass)){if(klass.constructor_!=null)this.writeDoc(klass.constructor_.documentation);this.writeConstructor(klass);}this.writeMembers(klass,true);this.closeBlock();}writeLib(resources){if(this.#stringWriter){this.writeNewLine();this.writeLine("class StringWriter");this.openBlock();this.writeLine("#buf = \"\";");this.writeNewLine();this.writeLine("write(s)");this.openBlock();this.writeLine("this.#buf += s;");this.closeBlock();this.writeNewLine();this.writeLine("clear()");this.openBlock();this.writeLine("this.#buf = \"\";");this.closeBlock();this.writeNewLine();this.writeLine("toString()");this.openBlock();this.writeLine("return this.#buf;");this.closeBlock();this.closeBlock();}if(Object.keys(resources).length==0)return;this.writeNewLine();this.writeLine("class Fu");this.openBlock();for(const[name,content]of Object.entries(resources).sort((a,b)=>a[0].localeCompare(b[0]))){this.write("static ");this.writeResourceName(name);this.writeLine(" = new Uint8Array([");this.writeChar(9);this.writeBytes(content);this.writeLine(" ]);");}this.writeNewLine();this.closeBlock();}writeUseStrict(){this.writeNewLine();this.writeLine("\"use strict\";");}writeProgram(program){this.createOutputFile();this.writeTopLevelNatives(program);this.writeTypes(program);this.writeLib(program.resources);this.closeFile();}}class GenJs extends GenJsNoModule{startContainerType(container){super.startContainerType(container);if(container.isPublic)this.write("export ");}writeUseStrict(){}}class GenTs extends GenJs{#system;#genFullCode=false;getTargetName(){return "TypeScript";}withGenFullCode(){this.#genFullCode=true;return this;}visitEnumValue(konst,previous){this.writeEnumValue(konst);this.writeCharLine(44);}writeEnum(enu){this.startContainerType(enu);this.write("enum ");this.write(enu.name);this.writeChar(32);this.openBlock();enu.acceptValues(this);this.closeBlock();}writeTypeAndName(value){this.writeName(value);this.write(": ");this.#writeType(value.type);}#writeType(type,readOnly=false){if(type instanceof FuNumericType)this.write(type.id==FuId.LONG_TYPE?"bigint":"number");else if(type instanceof FuEnum){const enu=type;this.write(enu.id==FuId.BOOL_TYPE?"boolean":enu.name);}else if(type instanceof FuClassType){const klass=type;if(!(klass instanceof FuReadWriteClassType))readOnly=true;if(klass.class.id==FuId.STRING_CLASS)this.write("string");else if(klass.class.id==FuId.ARRAY_PTR_CLASS&&!(klass.getElementType()instanceof FuNumericType)||klass.class.id==FuId.ARRAY_STORAGE_CLASS&&!(klass.getElementType()instanceof FuNumericType)||klass.class.id==FuId.LIST_CLASS||klass.class.id==FuId.QUEUE_CLASS||klass.class.id==FuId.STACK_CLASS){if(readOnly)this.write("readonly ");if(klass.getElementType().nullable)this.writeChar(40);this.#writeType(klass.getElementType());if(klass.getElementType().nullable)this.writeChar(41);this.write("[]");}else {if(readOnly&&klass.class.typeParameterCount>0)this.write("Readonly<");switch(klass.class.id){case FuId.ARRAY_PTR_CLASS:case FuId.ARRAY_STORAGE_CLASS:this.writeArrayElementType(klass.getElementType());this.write("Array");break;case FuId.HASH_SET_CLASS:case FuId.SORTED_SET_CLASS:this.write("Set<");this.#writeType(klass.getElementType(),false);this.writeChar(62);break;case FuId.DICTIONARY_CLASS:case FuId.SORTED_DICTIONARY_CLASS:if(klass.getKeyType()instanceof FuEnum)this.write("Partial<");this.write("Record<");this.#writeType(klass.getKeyType());this.write(", ");this.#writeType(klass.getValueType());this.writeChar(62);if(klass.getKeyType()instanceof FuEnum)this.writeChar(62);break;case FuId.ORDERED_DICTIONARY_CLASS:this.write("Map<");this.#writeType(klass.getKeyType());this.write(", ");this.#writeType(klass.getValueType());this.writeChar(62);break;case FuId.REGEX_CLASS:this.write("RegExp");break;case FuId.MATCH_CLASS:this.write("RegExpMatchArray");break;default:this.write(klass.class.name);break;}if(readOnly&&klass.class.typeParameterCount>0)this.writeChar(62);}if(type.nullable)this.write(" | null");}else this.write(type.name);}writeAsType(def){this.write(" as ");this.write(def.type.name);}writeBinaryOperand(expr,parent,binary){let type=binary.type;if(expr.type instanceof FuNumericType&&binary.isRel()){type=this.#system.promoteNumericTypes(binary.left.type,binary.right.type);}this.writeCoerced(type,expr,parent);}writeEqualOperand(expr,other){if(expr.type instanceof FuNumericType)this.writeCoerced(this.#system.promoteNumericTypes(expr.type,other.type),expr,FuPriority.EQUALITY);else expr.accept(this,FuPriority.EQUALITY);}writeBoolAndOr(expr){this.write("[ ");expr.left.accept(this,FuPriority.ARGUMENT);this.write(", ");expr.right.accept(this,FuPriority.ARGUMENT);this.write(" ].");this.write(expr.op==FuToken.AND?"every":"some");this.write("(Boolean)");}defineIsVar(binary){let def;if((def=binary.right)instanceof FuVar){this.ensureChildBlock();this.write("let ");this.writeName(def);this.write(": ");this.#writeType(binary.left.type);this.endStatement();}}#writeVisibility(visibility){switch(visibility){case FuVisibility.PRIVATE:case FuVisibility.INTERNAL:break;case FuVisibility.PROTECTED:this.write("protected ");break;case FuVisibility.PUBLIC:this.write("public ");break;default:throw new Error();}}writeConst(konst){this.writeNewLine();this.writeDoc(konst.documentation);this.#writeVisibility(konst.visibility);this.write("static readonly ");this.writeName(konst);this.write(": ");this.#writeType(konst.type,true);if(this.#genFullCode){this.write(" = ");konst.value.accept(this,FuPriority.ARGUMENT);}this.writeCharLine(59);}writeField(field){this.writeDoc(field.documentation);this.#writeVisibility(field.visibility);if(field.type.isFinal()&&!field.isAssignableStorage())this.write("readonly ");this.writeTypeAndName(field);if(this.#genFullCode)this.writeVarInit(field);this.writeCharLine(59);}writeMethod(method){this.writeNewLine();this.writeMethodDoc(method);this.#writeVisibility(method.visibility);switch(method.callType){case FuCallType.STATIC:this.write("static ");break;case FuCallType.VIRTUAL:break;case FuCallType.ABSTRACT:this.write("abstract ");break;case FuCallType.OVERRIDE:break;case FuCallType.NORMAL:break;case FuCallType.SEALED:break;default:throw new Error();}this.writeName(method);this.writeChar(40);let i=0;for(let param=method.parameters.firstParameter();param!=null;param=param.nextParameter()){if(i>0)this.write(", ");this.writeName(param);if(param.value!=null&&!this.#genFullCode)this.writeChar(63);this.write(": ");this.#writeType(param.type);if(param.value!=null&&this.#genFullCode)this.writeVarInit(param);i++;}this.write("): ");this.#writeType(method.type);if(this.#genFullCode)this.writeBody(method);else this.writeCharLine(59);}writeClass(klass,program){if(!this.writeBaseClass(klass,program))return;this.startContainerType(klass);switch(klass.callType){case FuCallType.NORMAL:break;case FuCallType.ABSTRACT:this.write("abstract ");break;case FuCallType.STATIC:case FuCallType.SEALED:break;default:throw new Error();}this.openClass(klass,""," extends ");if(this.needsConstructor(klass)||klass.callType==FuCallType.STATIC){if(klass.constructor_!=null){this.writeDoc(klass.constructor_.documentation);this.#writeVisibility(klass.constructor_.visibility);}else if(klass.callType==FuCallType.STATIC)this.write("private ");if(this.#genFullCode)this.writeConstructor(klass);else this.writeLine("constructor();");}this.writeMembers(klass,this.#genFullCode);this.closeBlock();}writeProgram(program){this.#system=program.system;this.createOutputFile();if(this.#genFullCode)this.writeTopLevelNatives(program);this.writeTypes(program);if(this.#genFullCode)this.writeLib(program.resources);this.closeFile();}}class GenPySwift extends GenBase{writeDocPara(para,many){if(many){this.writeNewLine();this.startDocLine();this.writeNewLine();this.startDocLine();}for(const inline of para.children){if(inline instanceof FuDocText){const text=inline;this.write(text.text);}else if(inline instanceof FuDocCode){const code=inline;this.writeChar(96);this.write(code.text);this.writeChar(96);}else if(inline instanceof FuDocLine){this.writeNewLine();this.startDocLine();}else throw new Error();}}writeDocList(list){this.writeNewLine();for(const item of list.items){this.write(this.getDocBullet());this.writeDocPara(item,false);this.writeNewLine();}this.startDocLine();}writeLocalName(symbol,parent){let member;if((member=symbol)instanceof FuMember){if(member.isStatic())this.writeName(this.currentMethod.parent);else this.write("self");this.writeChar(46);}this.writeName(symbol);}visitAggregateInitializer(expr){this.write("[ ");this.writeCoercedLiterals(expr.type.asClassType().getElementType(),expr.items);this.write(" ]");}visitPrefixExpr(expr,parent){switch(expr.op){case FuToken.INCREMENT:case FuToken.DECREMENT:expr.inner.accept(this,parent);break;default:super.visitPrefixExpr(expr,parent);break;}}visitPostfixExpr(expr,parent){switch(expr.op){case FuToken.INCREMENT:case FuToken.DECREMENT:expr.inner.accept(this,parent);break;default:super.visitPostfixExpr(expr,parent);break;}}static#isPtr(expr){let klass;return (klass=expr.type)instanceof FuClassType&&klass.class.id!=FuId.STRING_CLASS&&!(klass instanceof FuStorageType);}writeEqual(left,right,parent,not){if(GenPySwift.#isPtr(left)||GenPySwift.#isPtr(right))this.writeEqualExpr(left,right,parent,this.getReferenceEqOp(not));else super.writeEqual(left,right,parent,not);}writeExpr(expr,parent){expr.accept(this,parent);}writeListAppend(obj,args){this.writePostfix(obj,".append(");let elementType=obj.type.asClassType().getElementType();if(args.length==0)this.writeNewStorage(elementType);else this.writeCoerced(elementType,args[0],FuPriority.ARGUMENT);this.writeChar(41);}visitPreCall(call){return false;}visitXcrement(expr,postfix,write){let seen;if(expr instanceof FuVar){const def=expr;return def.value!=null&&this.visitXcrement(def.value,postfix,write);}else if(expr instanceof FuAggregateInitializer||expr instanceof FuLiteral||expr instanceof FuLambdaExpr)return false;else if(expr instanceof FuInterpolatedString){const interp=expr;seen=false;for(const part of interp.parts)if(this.visitXcrement(part.argument,postfix,write))seen=true;return seen;}else if(expr instanceof FuSymbolReference){const symbol=expr;return symbol.left!=null&&this.visitXcrement(symbol.left,postfix,write);}else if(expr instanceof FuUnaryExpr){const unary=expr;if(unary.inner==null)return false;seen=this.visitXcrement(unary.inner,postfix,write);if((unary.op==FuToken.INCREMENT||unary.op==FuToken.DECREMENT)&&postfix==unary instanceof FuPostfixExpr){if(write){this.writeExpr(unary.inner,FuPriority.ASSIGN);this.writeLine(unary.op==FuToken.INCREMENT?" += 1":" -= 1");}seen=true;}return seen;}else if(expr instanceof FuBinaryExpr){const binary=expr;seen=this.visitXcrement(binary.left,postfix,write);if(binary.op==FuToken.IS)return seen;if(binary.op==FuToken.COND_AND||binary.op==FuToken.COND_OR)console.assert(!this.visitXcrement(binary.right,postfix,false));else if(this.visitXcrement(binary.right,postfix,write))seen=true;return seen;}else if(expr instanceof FuSelectExpr){const select=expr;seen=this.visitXcrement(select.cond,postfix,write);console.assert(!this.visitXcrement(select.onTrue,postfix,false));console.assert(!this.visitXcrement(select.onFalse,postfix,false));return seen;}else if(expr instanceof FuCallExpr){const call=expr;seen=this.visitXcrement(call.method,postfix,write);for(const arg of call.arguments)if(this.visitXcrement(arg,postfix,write))seen=true;if(!postfix)if(this.visitPreCall(call))seen=true;return seen;}else throw new Error();}visitExpr(statement){this.visitXcrement(statement,false,true);let unary;if(!((unary=statement)instanceof FuUnaryExpr)||unary.op!=FuToken.INCREMENT&&unary.op!=FuToken.DECREMENT){this.writeExpr(statement,FuPriority.STATEMENT);this.writeNewLine();let def;if((def=statement)instanceof FuVar)this.writeInitCode(def);}this.visitXcrement(statement,true,true);this.cleanupTemporaries();}endStatement(){this.writeNewLine();}writeChild(statement){this.openChild();statement.acceptStatement(this);this.closeChild();}visitBlock(statement){this.writeStatements(statement.statements);}#openCond(statement,cond,parent){this.visitXcrement(cond,false,true);this.write(statement);this.writeExpr(cond,parent);this.openChild();return this.visitXcrement(cond,true,true);}writeContinueDoWhile(cond){this.#openCond("if ",cond,FuPriority.ARGUMENT);this.writeLine("continue");this.closeChild();this.visitXcrement(cond,true,true);this.writeLine("break");}needCondXcrement(loop){return loop.cond!=null;}#endBody(loop){let forLoop;if((forLoop=loop)instanceof FuFor){if(forLoop.isRange)return;this.visitOptionalStatement(forLoop.advance);}if(this.needCondXcrement(loop))this.visitXcrement(loop.cond,false,true);}visitContinue(statement){let doWhile;if((doWhile=statement.loop)instanceof FuDoWhile)this.writeContinueDoWhile(doWhile.cond);else {this.#endBody(statement.loop);this.writeLine("continue");}}#openWhileTrue(){this.write("while ");this.visitLiteralTrue();this.openChild();}visitDoWhile(statement){this.#openWhileTrue();statement.body.acceptStatement(this);if(statement.body.completesNormally()){this.#openCond(this.getIfNot(),statement.cond,FuPriority.PRIMARY);this.writeLine("break");this.closeChild();this.visitXcrement(statement.cond,true,true);}this.closeChild();}openWhile(loop){this.#openCond("while ",loop.cond,FuPriority.ARGUMENT);}#closeWhile(loop){loop.body.acceptStatement(this);if(loop.body.completesNormally())this.#endBody(loop);this.closeChild();if(this.needCondXcrement(loop)){if(loop.hasBreak&&this.visitXcrement(loop.cond,true,false)){this.write("else");this.openChild();this.visitXcrement(loop.cond,true,true);this.closeChild();}else this.visitXcrement(loop.cond,true,true);}}visitFor(statement){if(statement.isRange){const iter=statement.init;this.write("for ");if(statement.isIteratorUsed)this.writeName(iter);else this.writeChar(95);this.write(" in ");const cond=statement.cond;this.writeForRange(iter,cond,statement.rangeStep);this.writeChild(statement.body);}else {this.visitOptionalStatement(statement.init);if(statement.cond!=null)this.openWhile(statement);else this.#openWhileTrue();this.#closeWhile(statement);}}visitIf(statement){let condPostXcrement=this.#openCond("if ",statement.cond,FuPriority.ARGUMENT);statement.onTrue.acceptStatement(this);this.closeChild();if(statement.onFalse==null&&condPostXcrement&&!statement.onTrue.completesNormally())this.visitXcrement(statement.cond,true,true);else if(statement.onFalse!=null||condPostXcrement){let childIf;if(!condPostXcrement&&(childIf=statement.onFalse)instanceof FuIf&&!this.visitXcrement(childIf.cond,false,false)){this.writeElseIf();this.visitIf(childIf);}else {this.write("else");this.openChild();this.visitXcrement(statement.cond,true,true);this.visitOptionalStatement(statement.onFalse);this.closeChild();}}}visitReturn(statement){if(statement.value==null)this.writeLine("return");else {this.visitXcrement(statement.value,false,true);this.writeTemporaries(statement.value);if(this.visitXcrement(statement.value,true,false)){this.writeResultVar();this.write(" = ");this.writeCoercedExpr(this.currentMethod.type,statement.value);this.writeNewLine();this.visitXcrement(statement.value,true,true);this.writeLine("return result");}else {this.write("return ");this.writeCoercedExpr(this.currentMethod.type,statement.value);this.writeNewLine();}this.cleanupTemporaries();}}visitWhile(statement){this.openWhile(statement);this.#closeWhile(statement);}}class GenSwift extends GenPySwift{#system;#throw;#arrayRef;#stringCharAt;#stringIndexOf;#stringSubstring;#varsAtIndent=[];#varBytesAtIndent=[];getTargetName(){return "Swift";}startDocLine(){this.write("/// ");}getDocBullet(){return "/// * ";}writeDoc(doc){if(doc!=null)this.writeContent(doc);}#writeCamelCaseNotKeyword(name){switch(name){case"this":this.write("self");break;case"As":case"Associatedtype":case"Await":case"Break":case"Case":case"Catch":case"Class":case"Continue":case"Default":case"Defer":case"Deinit":case"Do":case"Else":case"Enum":case"Extension":case"Fallthrough":case"False":case"Fileprivate":case"For":case"Foreach":case"Func":case"Guard":case"If":case"Import":case"In":case"Init":case"Inout":case"Int":case"Internal":case"Is":case"Let":case"Nil":case"Operator":case"Private":case"Protocol":case"Public":case"Repeat":case"Rethrows":case"Return":case"Self":case"Static":case"Struct":case"Switch":case"Subscript":case"Super":case"Throw":case"Throws":case"True":case"Try":case"Typealias":case"Var":case"Void":case"Where":case"While":case"as":case"associatedtype":case"await":case"catch":case"defer":case"deinit":case"extension":case"fallthrough":case"fileprivate":case"func":case"guard":case"import":case"init":case"inout":case"is":case"let":case"nil":case"operator":case"private":case"protocol":case"repeat":case"rethrows":case"self":case"struct":case"subscript":case"super":case"try":case"typealias":case"var":case"where":this.writeCamelCase(name);this.writeChar(95);break;default:this.writeCamelCase(name);break;}}writeName(symbol){let konst;if(symbol instanceof FuContainerType)this.write(symbol.name);else if((konst=symbol)instanceof FuConst&&konst.inMethod!=null){this.writeCamelCase(konst.inMethod.name);this.writePascalCase(symbol.name);}else if(symbol instanceof FuVar||symbol instanceof FuMember)this.#writeCamelCaseNotKeyword(symbol.name);else throw new Error();}writeLocalName(symbol,parent){let forEach;if((forEach=symbol.parent)instanceof FuForeach&&forEach.collection.type instanceof FuStringType){this.write("Int(");this.#writeCamelCaseNotKeyword(symbol.name);this.write(".value)");}else super.writeLocalName(symbol,parent);}writeMemberOp(left,symbol){if(left.type!=null&&left.type.nullable)this.writeChar(33);this.writeChar(46);}#openIndexing(collection){collection.accept(this,FuPriority.PRIMARY);if(collection.type.nullable)this.writeChar(33);this.writeChar(91);}static#isArrayRef(array){return array.ptrTaken||array.getElementType()instanceof FuStorageType;}#writeClassName(klass){switch(klass.class.id){case FuId.STRING_CLASS:this.write("String");break;case FuId.ARRAY_PTR_CLASS:this.#arrayRef=true;this.write("ArrayRef<");this.#writeType(klass.getElementType());this.writeChar(62);break;case FuId.LIST_CLASS:case FuId.QUEUE_CLASS:case FuId.STACK_CLASS:this.writeChar(91);this.#writeType(klass.getElementType());this.writeChar(93);break;case FuId.HASH_SET_CLASS:case FuId.SORTED_SET_CLASS:this.write("Set<");this.#writeType(klass.getElementType());this.writeChar(62);break;case FuId.DICTIONARY_CLASS:case FuId.SORTED_DICTIONARY_CLASS:this.writeChar(91);this.#writeType(klass.getKeyType());this.write(": ");this.#writeType(klass.getValueType());this.writeChar(93);break;case FuId.ORDERED_DICTIONARY_CLASS:this.notSupported(klass,"OrderedDictionary");break;case FuId.LOCK_CLASS:this.include("Foundation");this.write("NSRecursiveLock");break;default:this.write(klass.class.name);break;}}#writeType(type){if(type instanceof FuNumericType){switch(type.id){case FuId.S_BYTE_RANGE:this.write("Int8");break;case FuId.BYTE_RANGE:this.write("UInt8");break;case FuId.SHORT_RANGE:this.write("Int16");break;case FuId.U_SHORT_RANGE:this.write("UInt16");break;case FuId.INT_TYPE:this.write("Int");break;case FuId.LONG_TYPE:this.write("Int64");break;case FuId.FLOAT_TYPE:this.write("Float");break;case FuId.DOUBLE_TYPE:this.write("Double");break;default:throw new Error();}}else if(type instanceof FuEnum)this.write(type.id==FuId.BOOL_TYPE?"Bool":type.name);else if(type instanceof FuArrayStorageType){const arrayStg=type;if(GenSwift.#isArrayRef(arrayStg)){this.#arrayRef=true;this.write("ArrayRef<");this.#writeType(arrayStg.getElementType());this.writeChar(62);}else {this.writeChar(91);this.#writeType(arrayStg.getElementType());this.writeChar(93);}}else if(type instanceof FuClassType){const klass=type;this.#writeClassName(klass);if(klass.nullable)this.writeChar(63);}else this.write(type.name);}writeTypeAndName(value){this.writeName(value);if(!value.type.isFinal()||value.isAssignableStorage()){this.write(" : ");this.#writeType(value.type);}}visitLiteralNull(){this.write("nil");}#writeUnwrapped(expr,parent,substringOk){if(expr.type.nullable){expr.accept(this,FuPriority.PRIMARY);this.writeChar(33);}else {let call;if(!substringOk&&(call=expr)instanceof FuCallExpr&&call.method.symbol.id==FuId.STRING_SUBSTRING)this.writeCall("String",expr);else expr.accept(this,parent);}}visitInterpolatedString(expr,parent){if(expr.parts.some(part=>part.widthExpr!=null||part.format!=32||part.precision>=0)){this.include("Foundation");this.write("String(format: ");this.writePrintf(expr,false);}else {this.writeChar(34);for(const part of expr.parts){this.write(part.prefix);this.write("\\(");this.#writeUnwrapped(part.argument,FuPriority.ARGUMENT,true);this.writeChar(41);}this.write(expr.suffix);this.writeChar(34);}}writeCoercedInternal(type,expr,parent){let binary;if(type instanceof FuNumericType&&!(expr instanceof FuLiteral)&&this.getTypeId(type,false)!=this.getTypeId(expr.type,(binary=expr)instanceof FuBinaryExpr&&binary.op!=FuToken.LEFT_BRACKET)){this.#writeType(type);this.writeChar(40);let call;if(type instanceof FuIntegerType&&(call=expr)instanceof FuCallExpr&&call.method.symbol.id==FuId.MATH_TRUNCATE)call.arguments[0].accept(this,FuPriority.ARGUMENT);else expr.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}else if(!type.nullable)this.#writeUnwrapped(expr,parent,false);else expr.accept(this,parent);}writeStringLength(expr){this.#writeUnwrapped(expr,FuPriority.PRIMARY,true);this.write(".count");}writeCharAt(expr){this.#stringCharAt=true;this.write("fuStringCharAt(");this.#writeUnwrapped(expr.left,FuPriority.ARGUMENT,false);this.write(", ");expr.right.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}visitSymbolReference(expr,parent){switch(expr.symbol.id){case FuId.MATH_NA_N:this.write("Float.nan");break;case FuId.MATH_NEGATIVE_INFINITY:this.write("-Float.infinity");break;case FuId.MATH_POSITIVE_INFINITY:this.write("Float.infinity");break;default:super.visitSymbolReference(expr,parent);break;}}getReferenceEqOp(not){return not?" !== ":" === ";}#writeStringContains(obj,name,args){this.#writeUnwrapped(obj,FuPriority.PRIMARY,true);this.writeChar(46);this.write(name);this.writeChar(40);this.#writeUnwrapped(args[0],FuPriority.ARGUMENT,true);this.writeChar(41);}#writeRange(startIndex,length){this.writeCoerced(this.#system.intType,startIndex,FuPriority.SHIFT);this.write("..<");this.writeAdd(startIndex,length);}#addVar(name){let vars=this.#varsAtIndent[this.indent];if(vars.has(name))return false;vars.add(name);return true;}writeCallExpr(obj,method,args,parent){switch(method.id){case FuId.NONE:case FuId.ARRAY_CONTAINS:case FuId.LIST_CONTAINS:case FuId.LIST_SORT_ALL:case FuId.HASH_SET_CONTAINS:case FuId.HASH_SET_REMOVE:case FuId.SORTED_SET_CONTAINS:case FuId.SORTED_SET_REMOVE:if(obj==null){if(method.isStatic()){this.writeName(this.currentMethod.parent);this.writeChar(46);}}else if(GenSwift.isReferenceTo(obj,FuId.BASE_PTR))this.write("super.");else {obj.accept(this,FuPriority.PRIMARY);this.writeMemberOp(obj,null);}this.writeName(method);this.writeArgsInParentheses(method,args);break;case FuId.CLASS_TO_STRING:obj.accept(this,FuPriority.PRIMARY);this.writeMemberOp(obj,null);this.write("description");break;case FuId.ENUM_FROM_INT:this.write(method.type.name);this.write("(rawValue: ");args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.ENUM_HAS_FLAG:this.writeMethodCall(obj,"contains",args[0]);break;case FuId.STRING_CONTAINS:this.#writeStringContains(obj,"contains",args);break;case FuId.STRING_ENDS_WITH:this.#writeStringContains(obj,"hasSuffix",args);break;case FuId.STRING_INDEX_OF:this.include("Foundation");this.#stringIndexOf=true;this.write("fuStringIndexOf(");this.#writeUnwrapped(obj,FuPriority.ARGUMENT,true);this.write(", ");this.#writeUnwrapped(args[0],FuPriority.ARGUMENT,true);this.writeChar(41);break;case FuId.STRING_LAST_INDEX_OF:this.include("Foundation");this.#stringIndexOf=true;this.write("fuStringIndexOf(");this.#writeUnwrapped(obj,FuPriority.ARGUMENT,true);this.write(", ");this.#writeUnwrapped(args[0],FuPriority.ARGUMENT,true);this.write(", .backwards)");break;case FuId.STRING_REPLACE:this.#writeUnwrapped(obj,FuPriority.PRIMARY,true);this.write(".replacingOccurrences(of: ");this.#writeUnwrapped(args[0],FuPriority.ARGUMENT,true);this.write(", with: ");this.#writeUnwrapped(args[1],FuPriority.ARGUMENT,true);this.writeChar(41);break;case FuId.STRING_STARTS_WITH:this.#writeStringContains(obj,"hasPrefix",args);break;case FuId.STRING_SUBSTRING:if(args[0].isLiteralZero())this.#writeUnwrapped(obj,FuPriority.PRIMARY,true);else {this.#stringSubstring=true;this.write("fuStringSubstring(");this.#writeUnwrapped(obj,FuPriority.ARGUMENT,false);this.write(", ");this.writeCoerced(this.#system.intType,args[0],FuPriority.ARGUMENT);this.writeChar(41);}if(args.length==2){this.write(".prefix(");this.writeCoerced(this.#system.intType,args[1],FuPriority.ARGUMENT);this.writeChar(41);}break;case FuId.ARRAY_COPY_TO:case FuId.LIST_COPY_TO:this.#openIndexing(args[1]);this.#writeRange(args[2],args[3]);this.write("] = ");this.#openIndexing(obj);this.#writeRange(args[0],args[3]);this.writeChar(93);break;case FuId.ARRAY_FILL_ALL:obj.accept(this,FuPriority.ASSIGN);let array;if((array=obj.type)instanceof FuArrayStorageType&&!GenSwift.#isArrayRef(array)){this.write(" = [");this.#writeType(array.getElementType());this.write("](repeating: ");this.writeCoerced(array.getElementType(),args[0],FuPriority.ARGUMENT);this.write(", count: ");this.visitLiteralLong(BigInt(array.length));this.writeChar(41);}else {this.write(".fill");this.writeArgsInParentheses(method,args);}break;case FuId.ARRAY_FILL_PART:let array2;if((array2=obj.type)instanceof FuArrayStorageType&&!GenSwift.#isArrayRef(array2)){this.#openIndexing(obj);this.#writeRange(args[1],args[2]);this.write("] = ArraySlice(repeating: ");this.writeCoerced(array2.getElementType(),args[0],FuPriority.ARGUMENT);this.write(", count: ");this.writeCoerced(this.#system.intType,args[2],FuPriority.ARGUMENT);this.writeChar(41);}else {obj.accept(this,FuPriority.PRIMARY);this.writeMemberOp(obj,null);this.write("fill");this.writeArgsInParentheses(method,args);}break;case FuId.ARRAY_SORT_ALL:this.writePostfix(obj,"[0..<");const array3=obj.type;this.visitLiteralLong(BigInt(array3.length));this.write("].sort()");break;case FuId.ARRAY_SORT_PART:case FuId.LIST_SORT_PART:this.#openIndexing(obj);this.#writeRange(args[0],args[1]);this.write("].sort()");break;case FuId.LIST_ADD:case FuId.QUEUE_ENQUEUE:case FuId.STACK_PUSH:this.writeListAppend(obj,args);break;case FuId.LIST_ADD_RANGE:obj.accept(this,FuPriority.ASSIGN);this.write(" += ");args[0].accept(this,FuPriority.ARGUMENT);break;case FuId.LIST_ALL:this.writePostfix(obj,".allSatisfy ");args[0].accept(this,FuPriority.ARGUMENT);break;case FuId.LIST_ANY:this.writePostfix(obj,".contains ");args[0].accept(this,FuPriority.ARGUMENT);break;case FuId.LIST_CLEAR:case FuId.QUEUE_CLEAR:case FuId.STACK_CLEAR:case FuId.HASH_SET_CLEAR:case FuId.SORTED_SET_CLEAR:case FuId.DICTIONARY_CLEAR:case FuId.SORTED_DICTIONARY_CLEAR:this.writePostfix(obj,".removeAll()");break;case FuId.LIST_INDEX_OF:if(parent>FuPriority.REL)this.writeChar(40);this.writePostfix(obj,".firstIndex(of: ");args[0].accept(this,FuPriority.ARGUMENT);this.write(") ?? -1");if(parent>FuPriority.REL)this.writeChar(41);break;case FuId.LIST_INSERT:this.writePostfix(obj,".insert(");let elementType=obj.type.asClassType().getElementType();if(args.length==1)this.writeNewStorage(elementType);else this.writeCoerced(elementType,args[1],FuPriority.ARGUMENT);this.write(", at: ");this.writeCoerced(this.#system.intType,args[0],FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.LIST_LAST:case FuId.STACK_PEEK:this.writePostfix(obj,".last");break;case FuId.LIST_REMOVE_AT:this.writePostfix(obj,".remove(at: ");this.writeCoerced(this.#system.intType,args[0],FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.LIST_REMOVE_RANGE:this.writePostfix(obj,".removeSubrange(");this.#writeRange(args[0],args[1]);this.writeChar(41);break;case FuId.QUEUE_DEQUEUE:this.writePostfix(obj,".removeFirst()");break;case FuId.QUEUE_PEEK:this.writePostfix(obj,".first");break;case FuId.STACK_POP:this.writePostfix(obj,".removeLast()");break;case FuId.HASH_SET_ADD:case FuId.SORTED_SET_ADD:this.writePostfix(obj,".insert(");this.writeCoerced(obj.type.asClassType().getElementType(),args[0],FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.DICTIONARY_ADD:this.writeDictionaryAdd(obj,args);break;case FuId.DICTIONARY_CONTAINS_KEY:case FuId.SORTED_DICTIONARY_CONTAINS_KEY:if(parent>FuPriority.EQUALITY)this.writeChar(40);this.writeIndexing(obj,args[0]);this.write(" != nil");if(parent>FuPriority.EQUALITY)this.writeChar(41);break;case FuId.DICTIONARY_REMOVE:case FuId.SORTED_DICTIONARY_REMOVE:this.writePostfix(obj,".removeValue(forKey: ");args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.CONSOLE_WRITE:this.write("print(");this.#writeUnwrapped(args[0],FuPriority.ARGUMENT,true);this.write(", terminator: \"\")");break;case FuId.CONSOLE_WRITE_LINE:this.write("print(");if(args.length==1)this.#writeUnwrapped(args[0],FuPriority.ARGUMENT,true);this.writeChar(41);break;case FuId.U_T_F8_GET_BYTE_COUNT:this.#writeUnwrapped(args[0],FuPriority.PRIMARY,true);this.write(".utf8.count");break;case FuId.U_T_F8_GET_BYTES:if(this.#addVar("fubytes"))this.write(this.#varBytesAtIndent[this.indent]?"var ":"let ");this.write("fubytes = [UInt8](");this.#writeUnwrapped(args[0],FuPriority.PRIMARY,true);this.writeLine(".utf8)");this.#openIndexing(args[1]);this.writeCoerced(this.#system.intType,args[2],FuPriority.SHIFT);if(args[2].isLiteralZero())this.write("..<");else {this.write(" ..< ");this.writeCoerced(this.#system.intType,args[2],FuPriority.ADD);this.write(" + ");}this.writeLine("fubytes.count] = fubytes[...]");break;case FuId.U_T_F8_GET_STRING:this.write("String(decoding: ");this.#openIndexing(args[0]);this.#writeRange(args[1],args[2]);this.write("], as: UTF8.self)");break;case FuId.ENVIRONMENT_GET_ENVIRONMENT_VARIABLE:this.include("Foundation");this.write("ProcessInfo.processInfo.environment[");this.#writeUnwrapped(args[0],FuPriority.ARGUMENT,false);this.writeChar(93);break;case FuId.MATH_METHOD:case FuId.MATH_LOG2:this.include("Foundation");this.writeCamelCase(method.name);this.writeArgsInParentheses(method,args);break;case FuId.MATH_ABS:case FuId.MATH_MAX_INT:case FuId.MATH_MAX_DOUBLE:case FuId.MATH_MIN_INT:case FuId.MATH_MIN_DOUBLE:this.writeCamelCase(method.name);this.writeArgsInParentheses(method,args);break;case FuId.MATH_CEILING:this.include("Foundation");this.writeCall("ceil",args[0]);break;case FuId.MATH_CLAMP:this.write("min(max(");this.writeClampAsMinMax(args);break;case FuId.MATH_FUSED_MULTIPLY_ADD:this.include("Foundation");this.writeCall("fma",args[0],args[1],args[2]);break;case FuId.MATH_IS_FINITE:this.writePostfix(args[0],".isFinite");break;case FuId.MATH_IS_INFINITY:this.writePostfix(args[0],".isInfinite");break;case FuId.MATH_IS_NA_N:this.writePostfix(args[0],".isNaN");break;case FuId.MATH_ROUND:this.writePostfix(args[0],".rounded()");break;case FuId.MATH_TRUNCATE:this.include("Foundation");this.writeCall("trunc",args[0]);break;default:this.notSupported(obj,method.name);break;}}writeNewArrayStorage(array){if(GenSwift.#isArrayRef(array))super.writeNewArrayStorage(array);else {this.writeChar(91);this.#writeType(array.getElementType());this.write("](repeating: ");this.#writeDefaultValue(array.getElementType());this.write(", count: ");this.visitLiteralLong(BigInt(array.length));this.writeChar(41);}}writeNew(klass,parent){this.#writeClassName(klass);this.write("()");}#writeDefaultValue(type){if(type instanceof FuNumericType)this.writeChar(48);else if(type instanceof FuEnum){const enu=type;if(enu.id==FuId.BOOL_TYPE)this.write("false");else {this.writeName(enu);this.writeChar(46);this.writeName(enu.getFirstValue());}}else if(type instanceof FuStringType&&!type.nullable)this.write("\"\"");else if(type instanceof FuArrayStorageType){const array=type;this.writeNewArrayStorage(array);}else this.write("nil");}writeNewArray(elementType,lengthExpr,parent){this.#arrayRef=true;this.write("ArrayRef<");this.#writeType(elementType);this.write(">(");if(elementType instanceof FuArrayStorageType){this.write("factory: { ");this.writeNewStorage(elementType);this.write(" }");}else if(elementType instanceof FuStorageType){const klass=elementType;this.write("factory: ");this.writeName(klass.class);this.write(".init");}else {this.write("repeating: ");this.#writeDefaultValue(elementType);}this.write(", count: ");lengthExpr.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}visitPrefixExpr(expr,parent){if(expr.op==FuToken.TILDE&&expr.type instanceof FuEnumFlags){this.write(expr.type.name);this.write("(rawValue: ~");this.writePostfix(expr.inner,".rawValue)");}else super.visitPrefixExpr(expr,parent);}writeIndexingExpr(expr,parent){this.#openIndexing(expr.left);const klass=expr.left.type;let indexType;switch(klass.class.id){case FuId.ARRAY_PTR_CLASS:case FuId.ARRAY_STORAGE_CLASS:case FuId.LIST_CLASS:indexType=this.#system.intType;break;default:indexType=klass.getKeyType();break;}this.writeCoerced(indexType,expr.right,FuPriority.ARGUMENT);this.writeChar(93);let dict;if(parent!=FuPriority.ASSIGN&&(dict=expr.left.type)instanceof FuClassType&&dict.class.typeParameterCount==2)this.writeChar(33);}writeBinaryOperand(expr,parent,binary){if(expr.type.id!=FuId.BOOL_TYPE){if(binary.op==FuToken.PLUS&&binary.type.id==FuId.STRING_STORAGE_TYPE){this.#writeUnwrapped(expr,parent,true);return;}if(binary.op==FuToken.PLUS||binary.op==FuToken.MINUS||binary.op==FuToken.ASTERISK||binary.op==FuToken.SLASH||binary.op==FuToken.MOD||binary.op==FuToken.AND||binary.op==FuToken.OR||binary.op==FuToken.XOR||binary.op==FuToken.SHIFT_LEFT&&expr==binary.left||binary.op==FuToken.SHIFT_RIGHT&&expr==binary.left){if(!(expr instanceof FuLiteral)){let type=this.#system.promoteNumericTypes(binary.left.type,binary.right.type);if(type!=expr.type){this.writeCoerced(type,expr,parent);return;}}}else if(binary.op==FuToken.EQUAL||binary.op==FuToken.NOT_EQUAL||binary.op==FuToken.LESS||binary.op==FuToken.LESS_OR_EQUAL||binary.op==FuToken.GREATER||binary.op==FuToken.GREATER_OR_EQUAL){let typeComp=this.#system.promoteFloatingTypes(binary.left.type,binary.right.type);if(typeComp!=null&&typeComp!=expr.type){this.writeCoerced(typeComp,expr,parent);return;}}}expr.accept(this,parent);}#writeEnumFlagsAnd(left,method,notMethod,right){let negation;if((negation=right)instanceof FuPrefixExpr&&negation.op==FuToken.TILDE)this.writeMethodCall(left,notMethod,negation.inner);else this.writeMethodCall(left,method,right);}#writeAssignNested(expr){let rightBinary;if((rightBinary=expr.right)instanceof FuBinaryExpr&&rightBinary.isAssign()){this.visitBinaryExpr(rightBinary,FuPriority.STATEMENT);this.writeNewLine();return rightBinary.left;}return expr.right;}#writeSwiftAssign(expr,right){expr.left.accept(this,FuPriority.ASSIGN);this.writeChar(32);this.write(expr.getOpString());this.writeChar(32);let leftBinary;let dict;if(right instanceof FuLiteralNull&&(leftBinary=expr.left)instanceof FuBinaryExpr&&leftBinary.op==FuToken.LEFT_BRACKET&&(dict=leftBinary.left.type)instanceof FuClassType&&dict.class.typeParameterCount==2){this.#writeType(dict.getValueType());this.write(".none");}else this.writeCoerced(expr.type,right,FuPriority.ARGUMENT);}visitBinaryExpr(expr,parent){let right;switch(expr.op){case FuToken.SHIFT_LEFT:this.writeBinaryExpr(expr,parent>FuPriority.MUL,FuPriority.PRIMARY," << ",FuPriority.PRIMARY);break;case FuToken.SHIFT_RIGHT:this.writeBinaryExpr(expr,parent>FuPriority.MUL,FuPriority.PRIMARY," >> ",FuPriority.PRIMARY);break;case FuToken.AND:if(expr.type.id==FuId.BOOL_TYPE)this.writeCall("{ a, b in a && b }",expr.left,expr.right);else if(expr.type instanceof FuEnumFlags)this.#writeEnumFlagsAnd(expr.left,"intersection","subtracting",expr.right);else this.writeBinaryExpr(expr,parent>FuPriority.MUL,FuPriority.MUL," & ",FuPriority.PRIMARY);break;case FuToken.OR:if(expr.type.id==FuId.BOOL_TYPE)this.writeCall("{ a, b in a || b }",expr.left,expr.right);else if(expr.type instanceof FuEnumFlags)this.writeMethodCall(expr.left,"union",expr.right);else this.writeBinaryExpr(expr,parent>FuPriority.ADD,FuPriority.ADD," | ",FuPriority.MUL);break;case FuToken.XOR:if(expr.type.id==FuId.BOOL_TYPE)this.writeEqual(expr.left,expr.right,parent,true);else if(expr.type instanceof FuEnumFlags)this.writeMethodCall(expr.left,"symmetricDifference",expr.right);else this.writeBinaryExpr(expr,parent>FuPriority.ADD,FuPriority.ADD," ^ ",FuPriority.MUL);break;case FuToken.ASSIGN:case FuToken.ADD_ASSIGN:case FuToken.SUB_ASSIGN:case FuToken.MUL_ASSIGN:case FuToken.DIV_ASSIGN:case FuToken.MOD_ASSIGN:case FuToken.SHIFT_LEFT_ASSIGN:case FuToken.SHIFT_RIGHT_ASSIGN:this.#writeSwiftAssign(expr,this.#writeAssignNested(expr));break;case FuToken.AND_ASSIGN:right=this.#writeAssignNested(expr);if(expr.type.id==FuId.BOOL_TYPE){this.write("if ");let negation;if((negation=right)instanceof FuPrefixExpr&&negation.op==FuToken.EXCLAMATION_MARK){negation.inner.accept(this,FuPriority.ARGUMENT);}else {this.writeChar(33);right.accept(this,FuPriority.PRIMARY);}this.openChild();expr.left.accept(this,FuPriority.ASSIGN);this.writeLine(" = false");this.indent--;this.writeChar(125);}else if(expr.type instanceof FuEnumFlags)this.#writeEnumFlagsAnd(expr.left,"formIntersection","subtract",right);else this.#writeSwiftAssign(expr,right);break;case FuToken.OR_ASSIGN:right=this.#writeAssignNested(expr);if(expr.type.id==FuId.BOOL_TYPE){this.write("if ");right.accept(this,FuPriority.ARGUMENT);this.openChild();expr.left.accept(this,FuPriority.ASSIGN);this.writeLine(" = true");this.indent--;this.writeChar(125);}else if(expr.type instanceof FuEnumFlags)this.writeMethodCall(expr.left,"formUnion",right);else this.#writeSwiftAssign(expr,right);break;case FuToken.XOR_ASSIGN:right=this.#writeAssignNested(expr);if(expr.type.id==FuId.BOOL_TYPE){expr.left.accept(this,FuPriority.ASSIGN);this.write(" = ");expr.left.accept(this,FuPriority.EQUALITY);this.write(" != ");expr.right.accept(this,FuPriority.EQUALITY);}else if(expr.type instanceof FuEnumFlags)this.writeMethodCall(expr.left,"formSymmetricDifference",right);else this.#writeSwiftAssign(expr,right);break;default:super.visitBinaryExpr(expr,parent);break;}}writeResource(name,length){this.write("FuResource.");this.writeResourceName(name);}static#throws(expr){if(expr instanceof FuVar||expr instanceof FuLiteral||expr instanceof FuLambdaExpr)return false;else if(expr instanceof FuAggregateInitializer){const init=expr;return init.items.some(field=>GenSwift.#throws(field));}else if(expr instanceof FuInterpolatedString){const interp=expr;return interp.parts.some(part=>GenSwift.#throws(part.argument));}else if(expr instanceof FuSymbolReference){const symbol=expr;return symbol.left!=null&&GenSwift.#throws(symbol.left);}else if(expr instanceof FuUnaryExpr){const unary=expr;return unary.inner!=null&&GenSwift.#throws(unary.inner);}else if(expr instanceof FuBinaryExpr){const binary=expr;return GenSwift.#throws(binary.left)||GenSwift.#throws(binary.right);}else if(expr instanceof FuSelectExpr){const select=expr;return GenSwift.#throws(select.cond)||GenSwift.#throws(select.onTrue)||GenSwift.#throws(select.onFalse);}else if(expr instanceof FuCallExpr){const call=expr;const method=call.method.symbol;return method.throws||call.method.left!=null&&GenSwift.#throws(call.method.left)||call.arguments.some(arg=>GenSwift.#throws(arg));}else throw new Error();}writeExpr(expr,parent){if(GenSwift.#throws(expr))this.write("try ");super.writeExpr(expr,parent);}writeCoercedExpr(type,expr){if(GenSwift.#throws(expr))this.write("try ");super.writeCoercedExpr(type,expr);}startTemporaryVar(type){this.write("var ");}visitExpr(statement){this.writeTemporaries(statement);if((statement)instanceof FuCallExpr&&statement.type.id!=FuId.VOID_TYPE)this.write("_ = ");super.visitExpr(statement);}#initVarsAtIndent(){while(this.#varsAtIndent.length<=this.indent){this.#varsAtIndent.push(new Set());this.#varBytesAtIndent.push(false);}this.#varsAtIndent[this.indent].clear();this.#varBytesAtIndent[this.indent]=false;}openChild(){this.writeChar(32);this.openBlock();this.#initVarsAtIndent();}closeChild(){this.closeBlock();}writeVar(def){if(def instanceof FuField||this.#addVar(def.name)){let array;let stg;let local;this.write(((array=def.type)instanceof FuArrayStorageType?GenSwift.#isArrayRef(array):(stg=def.type)instanceof FuStorageType?stg.class.typeParameterCount==0&&!def.isAssignableStorage():(local=def)instanceof FuVar&&!local.isAssigned)?"let ":"var ");super.writeVar(def);}else {this.writeName(def);this.writeVarInit(def);}}static#needsVarBytes(statements){let count=0;for(const statement of statements){let call;if((call=statement)instanceof FuCallExpr&&call.method.symbol.id==FuId.U_T_F8_GET_BYTES){if(++count==2)return true;}}return false;}writeStatements(statements){this.#varBytesAtIndent[this.indent]=GenSwift.#needsVarBytes(statements);super.writeStatements(statements);}visitLambdaExpr(expr){this.write("{ ");this.writeName(expr.first);this.write(" in ");expr.body.accept(this,FuPriority.STATEMENT);this.write(" }");}writeAssertCast(expr){this.write("let ");const def=expr.right;this.#writeCamelCaseNotKeyword(def.name);this.write(" = ");expr.left.accept(this,FuPriority.EQUALITY);this.write(" as! ");this.writeLine(def.type.name);}writeAssert(statement){this.write("assert(");this.writeExpr(statement.cond,FuPriority.ARGUMENT);if(statement.message!=null){this.write(", ");this.writeExpr(statement.message,FuPriority.ARGUMENT);}this.writeCharLine(41);}visitBreak(statement){this.writeLine("break");}needCondXcrement(loop){return loop.cond!=null&&(!loop.hasBreak||!this.visitXcrement(loop.cond,true,false));}getIfNot(){return "if !";}writeContinueDoWhile(cond){this.visitXcrement(cond,false,true);this.writeLine("continue");}visitDoWhile(statement){if(this.visitXcrement(statement.cond,true,false))super.visitDoWhile(statement);else {this.write("repeat");this.openChild();statement.body.acceptStatement(this);if(statement.body.completesNormally())this.visitXcrement(statement.cond,false,true);this.closeChild();this.write("while ");this.writeExpr(statement.cond,FuPriority.ARGUMENT);this.writeNewLine();}}writeElseIf(){this.write("else ");}openWhile(loop){if(this.needCondXcrement(loop))super.openWhile(loop);else {this.write("while true");this.openChild();this.visitXcrement(loop.cond,false,true);this.write("let fuDoLoop = ");loop.cond.accept(this,FuPriority.ARGUMENT);this.writeNewLine();this.visitXcrement(loop.cond,true,true);this.write("if !fuDoLoop");this.openChild();this.writeLine("break");this.closeChild();}}writeForRange(iter,cond,rangeStep){if(rangeStep==1){this.writeExpr(iter.value,FuPriority.SHIFT);switch(cond.op){case FuToken.LESS:this.write("..<");cond.right.accept(this,FuPriority.SHIFT);break;case FuToken.LESS_OR_EQUAL:this.write("...");cond.right.accept(this,FuPriority.SHIFT);break;default:throw new Error();}}else {this.write("stride(from: ");this.writeExpr(iter.value,FuPriority.ARGUMENT);switch(cond.op){case FuToken.LESS:case FuToken.GREATER:this.write(", to: ");this.writeExpr(cond.right,FuPriority.ARGUMENT);break;case FuToken.LESS_OR_EQUAL:case FuToken.GREATER_OR_EQUAL:this.write(", through: ");this.writeExpr(cond.right,FuPriority.ARGUMENT);break;default:throw new Error();}this.write(", by: ");this.visitLiteralLong(rangeStep);this.writeChar(41);}}visitForeach(statement){this.write("for ");if(statement.count()==2){this.writeChar(40);this.writeName(statement.getVar());this.write(", ");this.writeName(statement.getValueVar());this.writeChar(41);}else this.writeName(statement.getVar());this.write(" in ");const klass=statement.collection.type;switch(klass.class.id){case FuId.STRING_CLASS:this.writePostfix(statement.collection,".unicodeScalars");break;case FuId.SORTED_SET_CLASS:this.writePostfix(statement.collection,".sorted()");break;case FuId.SORTED_DICTIONARY_CLASS:this.writePostfix(statement.collection,klass.getKeyType().nullable?".sorted(by: { $0.key! < $1.key! })":".sorted(by: { $0.key < $1.key })");break;default:this.writeExpr(statement.collection,FuPriority.ARGUMENT);break;}this.writeChild(statement.body);}visitLock(statement){statement.lock.accept(this,FuPriority.PRIMARY);this.writeLine(".lock()");this.write("do");this.openChild();this.write("defer { ");statement.lock.accept(this,FuPriority.PRIMARY);this.writeLine(".unlock() }");statement.body.acceptStatement(this);this.closeChild();}writeResultVar(){this.write("let result : ");this.#writeType(this.currentMethod.type);}#writeSwitchCaseVar(def){if(def.name=="_")this.write("is ");else {this.write("let ");this.#writeCamelCaseNotKeyword(def.name);this.write(" as ");}this.#writeType(def.type);}#writeSwiftSwitchCaseBody(statement,body){this.indent++;this.visitXcrement(statement.value,true,true);this.#initVarsAtIndent();this.writeSwitchCaseBody(body);this.indent--;}visitSwitch(statement){this.visitXcrement(statement.value,false,true);this.write("switch ");this.writeExpr(statement.value,FuPriority.ARGUMENT);this.writeLine(" {");for(const kase of statement.cases){this.write("case ");for(let i=0;i<kase.values.length;i++){this.writeComma(i);let when1;if((when1=kase.values[i])instanceof FuBinaryExpr&&when1.op==FuToken.WHEN){let whenVar;if((whenVar=when1.left)instanceof FuVar)this.#writeSwitchCaseVar(whenVar);else this.writeCoerced(statement.value.type,when1.left,FuPriority.ARGUMENT);this.write(" where ");this.writeExpr(when1.right,FuPriority.ARGUMENT);}else if(kase.values[i]instanceof FuVar){const def=kase.values[i];this.#writeSwitchCaseVar(def);}else this.writeCoerced(statement.value.type,kase.values[i],FuPriority.ARGUMENT);}this.writeCharLine(58);this.#writeSwiftSwitchCaseBody(statement,kase.body);}if(statement.defaultBody.length>0){this.writeLine("default:");this.#writeSwiftSwitchCaseBody(statement,statement.defaultBody);}this.writeCharLine(125);}visitThrow(statement){this.#throw=true;this.visitXcrement(statement.message,false,true);this.write("throw FuError.error(");this.writeExpr(statement.message,FuPriority.ARGUMENT);this.writeCharLine(41);}#writeReadOnlyParameter(param){this.write("fuParam");this.writePascalCase(param.name);}writeParameter(param){this.write("_ ");if(param.isAssigned)this.#writeReadOnlyParameter(param);else this.writeName(param);this.write(" : ");this.#writeType(param.type);}visitEnumValue(konst,previous){this.writeDoc(konst.documentation);this.write("static let ");this.writeName(konst);this.write(" = ");this.write(konst.parent.name);this.writeChar(40);let i=konst.value.intValue();if(i==0)this.write("[]");else {this.write("rawValue: ");this.visitLiteralLong(BigInt(i));}this.writeCharLine(41);}writeEnum(enu){this.writeNewLine();this.writeDoc(enu.documentation);this.writePublic(enu);if(enu instanceof FuEnumFlags){this.write("struct ");this.write(enu.name);this.writeLine(" : OptionSet");this.openBlock();this.writeLine("let rawValue : Int");enu.acceptValues(this);}else {this.write("enum ");this.write(enu.name);if(enu.hasExplicitValue)this.write(" : Int");this.writeNewLine();this.openBlock();const valueToConst={};for(let symbol=enu.first;symbol!=null;symbol=symbol.next){let konst;if((konst=symbol)instanceof FuConst){this.writeDoc(konst.documentation);let i=konst.value.intValue();if(valueToConst.hasOwnProperty(i)){this.write("static let ");this.writeName(konst);this.write(" = ");this.writeName(valueToConst[i]);}else {this.write("case ");this.writeName(konst);if(!(konst.value instanceof FuImplicitEnumValue)){this.write(" = ");this.visitLiteralLong(BigInt(i));}valueToConst[i]=konst;}this.writeNewLine();}}}this.closeBlock();}#writeVisibility(visibility){switch(visibility){case FuVisibility.PRIVATE:this.write("private ");break;case FuVisibility.INTERNAL:this.write("fileprivate ");break;case FuVisibility.PROTECTED:case FuVisibility.PUBLIC:this.write("public ");break;default:throw new Error();}}writeConst(konst){this.writeNewLine();this.writeDoc(konst.documentation);this.#writeVisibility(konst.visibility);this.write("static let ");this.writeName(konst);this.write(" = ");if(konst.type.id==FuId.INT_TYPE||konst.type instanceof FuEnum||konst.type.id==FuId.STRING_PTR_TYPE)konst.value.accept(this,FuPriority.ARGUMENT);else {this.#writeType(konst.type);this.writeChar(40);konst.value.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}this.writeNewLine();}writeField(field){this.writeNewLine();this.writeDoc(field.documentation);this.#writeVisibility(field.visibility);let klass;if((klass=field.type)instanceof FuClassType&&klass.class.id!=FuId.STRING_CLASS&&!(klass instanceof FuDynamicPtrType)&&!(klass instanceof FuStorageType))this.write("unowned ");this.writeVar(field);if(field.value==null&&(field.type instanceof FuNumericType||field.type instanceof FuEnum||field.type.id==FuId.STRING_STORAGE_TYPE)){this.write(" = ");this.#writeDefaultValue(field.type);}else if(field.isAssignableStorage()){this.write(" = ");this.writeName(field.type.asClassType().class);this.write("()");}this.writeNewLine();}writeParameterDoc(param,first){this.write("/// - parameter ");this.writeName(param);this.writeChar(32);this.writeDocPara(param.documentation.summary,false);this.writeNewLine();}writeMethod(method){this.writeNewLine();this.writeDoc(method.documentation);this.writeParametersDoc(method);switch(method.callType){case FuCallType.STATIC:this.#writeVisibility(method.visibility);this.write("static ");break;case FuCallType.NORMAL:this.#writeVisibility(method.visibility);break;case FuCallType.ABSTRACT:case FuCallType.VIRTUAL:this.write(method.visibility==FuVisibility.INTERNAL?"fileprivate ":"open ");break;case FuCallType.OVERRIDE:this.write(method.visibility==FuVisibility.INTERNAL?"fileprivate ":"open ");this.write("override ");break;case FuCallType.SEALED:this.#writeVisibility(method.visibility);this.write("final override ");break;}if(method.id==FuId.CLASS_TO_STRING)this.write("var description : String");else {this.write("func ");this.writeName(method);this.writeParameters(method,true);if(method.throws)this.write(" throws");if(method.type.id!=FuId.VOID_TYPE){this.write(" -> ");this.#writeType(method.type);}}this.writeNewLine();this.openBlock();if(method.callType==FuCallType.ABSTRACT)this.writeLine("preconditionFailure(\"Abstract method called\")");else {for(let param=method.parameters.firstParameter();param!=null;param=param.nextParameter()){if(param.isAssigned){this.write("var ");this.writeTypeAndName(param);this.write(" = ");this.#writeReadOnlyParameter(param);this.writeNewLine();}}this.#initVarsAtIndent();this.currentMethod=method;method.body.acceptStatement(this);this.currentMethod=null;}this.closeBlock();}writeClass(klass,program){this.writeNewLine();this.writeDoc(klass.documentation);this.writePublic(klass);if(klass.callType==FuCallType.SEALED)this.write("final ");this.startClass(klass,""," : ");if(klass.addsToString()){this.write(klass.hasBaseClass()?", ":" : ");this.write("CustomStringConvertible");}this.writeNewLine();this.openBlock();if(this.needsConstructor(klass)){if(klass.constructor_!=null){this.writeDoc(klass.constructor_.documentation);this.#writeVisibility(klass.constructor_.visibility);}else this.write("fileprivate ");if(klass.hasBaseClass())this.write("override ");this.writeLine("init()");this.openBlock();this.#initVarsAtIndent();this.writeConstructorBody(klass);this.closeBlock();}this.writeMembers(klass,true);this.closeBlock();}#writeLibrary(){if(this.#throw){this.writeNewLine();this.writeLine("public enum FuError : Error");this.openBlock();this.writeLine("case error(String)");this.closeBlock();}if(this.#arrayRef){this.writeNewLine();this.writeLine("public class ArrayRef<T> : Sequence");this.openBlock();this.writeLine("var array : [T]");this.writeNewLine();this.writeLine("init(_ array : [T])");this.openBlock();this.writeLine("self.array = array");this.closeBlock();this.writeNewLine();this.writeLine("init(repeating: T, count: Int)");this.openBlock();this.writeLine("self.array = [T](repeating: repeating, count: count)");this.closeBlock();this.writeNewLine();this.writeLine("init(factory: () -> T, count: Int)");this.openBlock();this.writeLine("self.array = (1...count).map({_ in factory() })");this.closeBlock();this.writeNewLine();this.writeLine("subscript(index: Int) -> T");this.openBlock();this.writeLine("get");this.openBlock();this.writeLine("return array[index]");this.closeBlock();this.writeLine("set(value)");this.openBlock();this.writeLine("array[index] = value");this.closeBlock();this.closeBlock();this.writeLine("subscript(bounds: Range<Int>) -> ArraySlice<T>");this.openBlock();this.writeLine("get");this.openBlock();this.writeLine("return array[bounds]");this.closeBlock();this.writeLine("set(value)");this.openBlock();this.writeLine("array[bounds] = value");this.closeBlock();this.closeBlock();this.writeNewLine();this.writeLine("func fill(_ value: T)");this.openBlock();this.writeLine("array = [T](repeating: value, count: array.count)");this.closeBlock();this.writeNewLine();this.writeLine("func fill(_ value: T, _ startIndex : Int, _ count : Int)");this.openBlock();this.writeLine("array[startIndex ..< startIndex + count] = ArraySlice(repeating: value, count: count)");this.closeBlock();this.writeNewLine();this.writeLine("public func makeIterator() -> IndexingIterator<Array<T>>");this.openBlock();this.writeLine("return array.makeIterator()");this.closeBlock();this.closeBlock();}if(this.#stringCharAt){this.writeNewLine();this.writeLine("fileprivate func fuStringCharAt(_ s: String, _ offset: Int) -> Int");this.openBlock();this.writeLine("return Int(s.unicodeScalars[s.index(s.startIndex, offsetBy: offset)].value)");this.closeBlock();}if(this.#stringIndexOf){this.writeNewLine();this.writeLine("fileprivate func fuStringIndexOf<S1 : StringProtocol, S2 : StringProtocol>(_ haystack: S1, _ needle: S2, _ options: String.CompareOptions = .literal) -> Int");this.openBlock();this.writeLine("guard let index = haystack.range(of: needle, options: options) else { return -1 }");this.writeLine("return haystack.distance(from: haystack.startIndex, to: index.lowerBound)");this.closeBlock();}if(this.#stringSubstring){this.writeNewLine();this.writeLine("fileprivate func fuStringSubstring(_ s: String, _ offset: Int) -> Substring");this.openBlock();this.writeLine("return s[s.index(s.startIndex, offsetBy: offset)...]");this.closeBlock();}}#writeResources(resources){if(Object.keys(resources).length==0)return;this.#arrayRef=true;this.writeNewLine();this.writeLine("fileprivate final class FuResource");this.openBlock();for(const[name,content]of Object.entries(resources).sort((a,b)=>a[0].localeCompare(b[0]))){this.write("static let ");this.writeResourceName(name);this.writeLine(" = ArrayRef<UInt8>([");this.writeChar(9);this.writeBytes(content);this.writeLine(" ])");}this.closeBlock();}writeProgram(program){this.#system=program.system;this.#throw=false;this.#arrayRef=false;this.#stringCharAt=false;this.#stringIndexOf=false;this.#stringSubstring=false;this.openStringWriter();this.writeTypes(program);this.createOutputFile();this.writeTopLevelNatives(program);this.writeIncludes("import ","");this.closeStringWriter();this.#writeLibrary();this.#writeResources(program.resources);this.closeFile();}}class GenPy extends GenPySwift{#childPass;#switchBreak;getTargetName(){return "Python";}writeBanner(){this.writeLine("# Generated automatically with \"fut\". Do not edit.");}startDocLine(){}getDocBullet(){return " * ";}#startDoc(doc){this.write("\"\"\"");this.writeDocPara(doc.summary,false);if(doc.details.length>0){this.writeNewLine();for(const block of doc.details){this.writeNewLine();this.writeDocBlock(block,false);}}}writeDoc(doc){if(doc!=null){this.#startDoc(doc);this.writeLine("\"\"\"");}}writeParameterDoc(param,first){if(first){this.writeNewLine();this.writeNewLine();}this.write(":param ");this.writeName(param);this.write(": ");this.writeDocPara(param.documentation.summary,false);this.writeNewLine();}#writePyDoc(method){if(method.documentation==null)return;this.#startDoc(method.documentation);this.writeParametersDoc(method);this.writeLine("\"\"\"");}visitLiteralNull(){this.write("None");}visitLiteralFalse(){this.write("False");}visitLiteralTrue(){this.write("True");}#writeNameNotKeyword(name){switch(name){case"this":this.write("self");break;case"and":case"array":case"as":case"async":case"await":case"def":case"del":case"elif":case"enum":case"except":case"finally":case"from":case"global":case"import":case"is":case"lambda":case"len":case"math":case"nonlocal":case"not":case"or":case"pass":case"pyfma":case"raise":case"re":case"sys":case"try":case"with":case"yield":this.write(name);this.writeChar(95);break;default:this.writeLowercaseWithUnderscores(name);break;}}writeName(symbol){if(symbol instanceof FuContainerType){const container=symbol;if(!container.isPublic)this.writeChar(95);this.write(symbol.name);}else if(symbol instanceof FuConst){const konst=symbol;if(konst.visibility!=FuVisibility.PUBLIC)this.writeChar(95);if(konst.inMethod!=null){this.writeUppercaseWithUnderscores(konst.inMethod.name);this.writeChar(95);}this.writeUppercaseWithUnderscores(symbol.name);}else if(symbol instanceof FuVar)this.#writeNameNotKeyword(symbol.name);else if(symbol instanceof FuMember){const member=symbol;if(member.id==FuId.CLASS_TO_STRING)this.write("__str__");else if(member.visibility==FuVisibility.PUBLIC)this.#writeNameNotKeyword(symbol.name);else {this.writeChar(95);this.writeLowercaseWithUnderscores(symbol.name);}}else throw new Error();}writeTypeAndName(value){this.writeName(value);}writeLocalName(symbol,parent){let forEach;if((forEach=symbol.parent)instanceof FuForeach&&forEach.collection.type instanceof FuStringType){this.write("ord(");this.#writeNameNotKeyword(symbol.name);this.writeChar(41);}else super.writeLocalName(symbol,parent);}static#getArrayCode(type){switch(type.id){case FuId.S_BYTE_RANGE:return 98;case FuId.BYTE_RANGE:return 66;case FuId.SHORT_RANGE:return 104;case FuId.U_SHORT_RANGE:return 72;case FuId.INT_TYPE:return 105;case FuId.LONG_TYPE:return 113;case FuId.FLOAT_TYPE:return 102;case FuId.DOUBLE_TYPE:return 100;default:throw new Error();}}visitAggregateInitializer(expr){const array=expr.type;let number;if((number=array.getElementType())instanceof FuNumericType){let c=GenPy.#getArrayCode(number);if(c==66)this.write("bytes(");else {this.include("array");this.write("array.array(\"");this.writeChar(c);this.write("\", ");}super.visitAggregateInitializer(expr);this.writeChar(41);}else super.visitAggregateInitializer(expr);}visitInterpolatedString(expr,parent){this.write("f\"");for(const part of expr.parts){this.writeDoubling(part.prefix,123);this.writeChar(123);part.argument.accept(this,FuPriority.ARGUMENT);this.writePyFormat(part);}this.writeDoubling(expr.suffix,123);this.writeChar(34);}visitPrefixExpr(expr,parent){if(expr.op==FuToken.EXCLAMATION_MARK){if(parent>FuPriority.COND_AND)this.writeChar(40);this.write("not ");expr.inner.accept(this,FuPriority.OR);if(parent>FuPriority.COND_AND)this.writeChar(41);}else super.visitPrefixExpr(expr,parent);}getReferenceEqOp(not){return not?" is not ":" is ";}writeCharAt(expr){this.write("ord(");this.writeIndexingExpr(expr,FuPriority.ARGUMENT);this.writeChar(41);}writeStringLength(expr){this.writeCall("len",expr);}visitSymbolReference(expr,parent){switch(expr.symbol.id){case FuId.CONSOLE_ERROR:this.include("sys");this.write("sys.stderr");break;case FuId.LIST_COUNT:case FuId.QUEUE_COUNT:case FuId.STACK_COUNT:case FuId.HASH_SET_COUNT:case FuId.SORTED_SET_COUNT:case FuId.DICTIONARY_COUNT:case FuId.SORTED_DICTIONARY_COUNT:case FuId.ORDERED_DICTIONARY_COUNT:this.writeStringLength(expr.left);break;case FuId.MATH_NA_N:this.include("math");this.write("math.nan");break;case FuId.MATH_NEGATIVE_INFINITY:this.include("math");this.write("-math.inf");break;case FuId.MATH_POSITIVE_INFINITY:this.include("math");this.write("math.inf");break;default:if(!this.writeJavaMatchProperty(expr,parent))super.visitSymbolReference(expr,parent);break;}}visitBinaryExpr(expr,parent){switch(expr.op){case FuToken.SLASH:if(expr.type instanceof FuIntegerType){let floorDiv;let leftRange;let rightRange;if((leftRange=expr.left)instanceof FuRangeType&&leftRange.min>=0&&(rightRange=expr.right)instanceof FuRangeType&&rightRange.min>=0){if(parent>FuPriority.OR)this.writeChar(40);floorDiv=true;}else {this.write("int(");floorDiv=false;}expr.left.accept(this,FuPriority.MUL);this.write(floorDiv?" // ":" / ");expr.right.accept(this,FuPriority.PRIMARY);if(!floorDiv||parent>FuPriority.OR)this.writeChar(41);}else super.visitBinaryExpr(expr,parent);break;case FuToken.COND_AND:this.writeBinaryExpr(expr,parent>FuPriority.COND_AND||parent==FuPriority.COND_OR,FuPriority.COND_AND," and ",FuPriority.COND_AND);break;case FuToken.COND_OR:this.writeBinaryExpr2(expr,parent,FuPriority.COND_OR," or ");break;case FuToken.ASSIGN:if(this.atLineStart){let rightBinary;for(let right=expr.right;(rightBinary=right)instanceof FuBinaryExpr&&rightBinary.isAssign();right=rightBinary.right){if(rightBinary.op!=FuToken.ASSIGN){this.visitBinaryExpr(rightBinary,FuPriority.STATEMENT);this.writeNewLine();break;}}}expr.left.accept(this,FuPriority.ASSIGN);this.write(" = ");{let rightBinary;((rightBinary=expr.right)instanceof FuBinaryExpr&&rightBinary.isAssign()&&rightBinary.op!=FuToken.ASSIGN?rightBinary.left:expr.right).accept(this,FuPriority.ASSIGN);}break;case FuToken.ADD_ASSIGN:case FuToken.SUB_ASSIGN:case FuToken.MUL_ASSIGN:case FuToken.DIV_ASSIGN:case FuToken.MOD_ASSIGN:case FuToken.SHIFT_LEFT_ASSIGN:case FuToken.SHIFT_RIGHT_ASSIGN:case FuToken.AND_ASSIGN:case FuToken.OR_ASSIGN:case FuToken.XOR_ASSIGN:{let right=expr.right;let rightBinary;if((rightBinary=right)instanceof FuBinaryExpr&&rightBinary.isAssign()){this.visitBinaryExpr(rightBinary,FuPriority.STATEMENT);this.writeNewLine();right=rightBinary.left;}expr.left.accept(this,FuPriority.ASSIGN);this.writeChar(32);if(expr.op==FuToken.DIV_ASSIGN&&expr.type instanceof FuIntegerType)this.writeChar(47);this.write(expr.getOpString());this.writeChar(32);right.accept(this,FuPriority.ARGUMENT);}break;case FuToken.IS:let symbol;if((symbol=expr.right)instanceof FuSymbolReference){this.write("isinstance(");expr.left.accept(this,FuPriority.ARGUMENT);this.write(", ");this.writeName(symbol.symbol);this.writeChar(41);}else this.notSupported(expr,"'is' with a variable");break;default:super.visitBinaryExpr(expr,parent);break;}}writeCoercedSelect(type,expr,parent){if(parent>FuPriority.SELECT)this.writeChar(40);this.writeCoerced(type,expr.onTrue,FuPriority.SELECT);this.write(" if ");expr.cond.accept(this,FuPriority.SELECT_COND);this.write(" else ");this.writeCoerced(type,expr.onFalse,FuPriority.SELECT);if(parent>FuPriority.SELECT)this.writeChar(41);}#writeDefaultValue(type){if(type instanceof FuNumericType)this.writeChar(48);else if(type.id==FuId.BOOL_TYPE)this.write("False");else if(type.id==FuId.STRING_STORAGE_TYPE)this.write("\"\"");else this.write("None");}#writePyNewArray(elementType,value,lengthExpr){if(elementType instanceof FuStorageType){this.write("[ ");this.writeNewStorage(elementType);this.write(" for _ in range(");lengthExpr.accept(this,FuPriority.ARGUMENT);this.write(") ]");}else if(elementType instanceof FuNumericType){let c=GenPy.#getArrayCode(elementType);if(c==66&&(value==null||value.isLiteralZero()))this.writeCall("bytearray",lengthExpr);else {this.include("array");this.write("array.array(\"");this.writeChar(c);this.write("\", [ ");if(value==null)this.writeChar(48);else value.accept(this,FuPriority.ARGUMENT);this.write(" ]) * ");lengthExpr.accept(this,FuPriority.MUL);}}else {this.write("[ ");if(value==null)this.#writeDefaultValue(elementType);else value.accept(this,FuPriority.ARGUMENT);this.write(" ] * ");lengthExpr.accept(this,FuPriority.MUL);}}writeNewArray(elementType,lengthExpr,parent){this.#writePyNewArray(elementType,null,lengthExpr);}writeArrayStorageInit(array,value){this.write(" = ");this.#writePyNewArray(array.getElementType(),null,array.lengthExpr);}writeNew(klass,parent){switch(klass.class.id){case FuId.LIST_CLASS:case FuId.STACK_CLASS:let number;if((number=klass.getElementType())instanceof FuNumericType){let c=GenPy.#getArrayCode(number);if(c==66)this.write("bytearray()");else {this.include("array");this.write("array.array(\"");this.writeChar(c);this.write("\")");}}else this.write("[]");break;case FuId.QUEUE_CLASS:this.include("collections");this.write("collections.deque()");break;case FuId.HASH_SET_CLASS:case FuId.SORTED_SET_CLASS:this.write("set()");break;case FuId.DICTIONARY_CLASS:case FuId.SORTED_DICTIONARY_CLASS:this.write("{}");break;case FuId.ORDERED_DICTIONARY_CLASS:this.include("collections");this.write("collections.OrderedDict()");break;case FuId.STRING_WRITER_CLASS:this.include("io");this.write("io.StringIO()");break;case FuId.LOCK_CLASS:this.include("threading");this.write("threading.RLock()");break;default:this.writeName(klass.class);this.write("()");break;}}#writeContains(haystack,needle){needle.accept(this,FuPriority.REL);this.write(" in ");haystack.accept(this,FuPriority.REL);}#writeSlice(startIndex,length){this.writeChar(91);startIndex.accept(this,FuPriority.ARGUMENT);this.writeChar(58);if(length!=null)this.writeAdd(startIndex,length);this.writeChar(93);}#writeAssignSorted(obj,byteArray){this.write(" = ");let c=GenPy.#getArrayCode(obj.type.asClassType().getElementType());if(c==66){this.write(byteArray);this.writeChar(40);}else {this.include("array");this.write("array.array(\"");this.writeChar(c);this.write("\", ");}this.write("sorted(");}#writeAllAny(function_,obj,args){this.write(function_);this.writeChar(40);const lambda=args[0];lambda.body.accept(this,FuPriority.ARGUMENT);this.write(" for ");this.writeName(lambda.first);this.write(" in ");obj.accept(this,FuPriority.ARGUMENT);this.writeChar(41);}#writePyRegexOptions(args){this.include("re");this.writeRegexOptions(args,", "," | ","","re.I","re.M","re.S");}#writeRegexSearch(args){this.write("re.search(");args[1].accept(this,FuPriority.ARGUMENT);this.write(", ");args[0].accept(this,FuPriority.ARGUMENT);this.#writePyRegexOptions(args);this.writeChar(41);}writeCallExpr(obj,method,args,parent){switch(method.id){case FuId.ENUM_FROM_INT:this.writeName(method.type);this.writeArgsInParentheses(method,args);break;case FuId.ENUM_HAS_FLAG:case FuId.STRING_CONTAINS:case FuId.ARRAY_CONTAINS:case FuId.LIST_CONTAINS:case FuId.HASH_SET_CONTAINS:case FuId.SORTED_SET_CONTAINS:case FuId.DICTIONARY_CONTAINS_KEY:case FuId.SORTED_DICTIONARY_CONTAINS_KEY:case FuId.ORDERED_DICTIONARY_CONTAINS_KEY:this.#writeContains(obj,args[0]);break;case FuId.STRING_ENDS_WITH:this.writeMethodCall(obj,"endswith",args[0]);break;case FuId.STRING_INDEX_OF:this.writeMethodCall(obj,"find",args[0]);break;case FuId.STRING_LAST_INDEX_OF:this.writeMethodCall(obj,"rfind",args[0]);break;case FuId.STRING_STARTS_WITH:this.writeMethodCall(obj,"startswith",args[0]);break;case FuId.STRING_SUBSTRING:obj.accept(this,FuPriority.PRIMARY);this.#writeSlice(args[0],args.length==2?args[1]:null);break;case FuId.ARRAY_BINARY_SEARCH_ALL:this.include("bisect");this.writeCall("bisect.bisect_left",obj,args[0]);break;case FuId.ARRAY_BINARY_SEARCH_PART:this.include("bisect");this.write("bisect.bisect_left(");obj.accept(this,FuPriority.ARGUMENT);this.write(", ");args[0].accept(this,FuPriority.ARGUMENT);this.write(", ");args[1].accept(this,FuPriority.ARGUMENT);this.write(", ");args[2].accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.ARRAY_COPY_TO:case FuId.LIST_COPY_TO:args[1].accept(this,FuPriority.PRIMARY);this.#writeSlice(args[2],args[3]);this.write(" = ");obj.accept(this,FuPriority.PRIMARY);this.#writeSlice(args[0],args[3]);break;case FuId.ARRAY_FILL_ALL:case FuId.ARRAY_FILL_PART:obj.accept(this,FuPriority.PRIMARY);if(args.length==1){this.write("[:] = ");const array=obj.type;this.#writePyNewArray(array.getElementType(),args[0],array.lengthExpr);}else {this.#writeSlice(args[1],args[2]);this.write(" = ");this.#writePyNewArray(obj.type.asClassType().getElementType(),args[0],args[2]);}break;case FuId.ARRAY_SORT_ALL:case FuId.LIST_SORT_ALL:obj.accept(this,FuPriority.ASSIGN);this.#writeAssignSorted(obj,"bytearray");obj.accept(this,FuPriority.ARGUMENT);this.write("))");break;case FuId.ARRAY_SORT_PART:case FuId.LIST_SORT_PART:obj.accept(this,FuPriority.PRIMARY);this.#writeSlice(args[0],args[1]);this.#writeAssignSorted(obj,"bytes");obj.accept(this,FuPriority.PRIMARY);this.#writeSlice(args[0],args[1]);this.write("))");break;case FuId.LIST_ADD:this.writeListAdd(obj,"append",args);break;case FuId.LIST_ADD_RANGE:obj.accept(this,FuPriority.ASSIGN);this.write(" += ");args[0].accept(this,FuPriority.ARGUMENT);break;case FuId.LIST_ALL:this.#writeAllAny("all",obj,args);break;case FuId.LIST_ANY:this.#writeAllAny("any",obj,args);break;case FuId.LIST_CLEAR:case FuId.STACK_CLEAR:let number;if((number=obj.type.asClassType().getElementType())instanceof FuNumericType&&GenPy.#getArrayCode(number)!=66){this.write("del ");this.writePostfix(obj,"[:]");}else this.writePostfix(obj,".clear()");break;case FuId.LIST_INDEX_OF:if(parent>FuPriority.SELECT)this.writeChar(40);this.writeMethodCall(obj,"index",args[0]);this.write(" if ");this.#writeContains(obj,args[0]);this.write(" else -1");if(parent>FuPriority.SELECT)this.writeChar(41);break;case FuId.LIST_INSERT:this.writeListInsert(obj,"insert",args);break;case FuId.LIST_LAST:case FuId.STACK_PEEK:this.writePostfix(obj,"[-1]");break;case FuId.LIST_REMOVE_AT:case FuId.DICTIONARY_REMOVE:case FuId.SORTED_DICTIONARY_REMOVE:case FuId.ORDERED_DICTIONARY_REMOVE:this.write("del ");this.writeIndexing(obj,args[0]);break;case FuId.LIST_REMOVE_RANGE:this.write("del ");obj.accept(this,FuPriority.PRIMARY);this.#writeSlice(args[0],args[1]);break;case FuId.QUEUE_DEQUEUE:this.writePostfix(obj,".popleft()");break;case FuId.QUEUE_ENQUEUE:case FuId.STACK_PUSH:this.writeListAppend(obj,args);break;case FuId.QUEUE_PEEK:this.writePostfix(obj,"[0]");break;case FuId.DICTIONARY_ADD:this.writeDictionaryAdd(obj,args);break;case FuId.TEXT_WRITER_WRITE:this.write("print(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", end=\"\", file=");obj.accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.TEXT_WRITER_WRITE_CHAR:case FuId.TEXT_WRITER_WRITE_CODE_POINT:this.writeMethodCall(obj,"write(chr",args[0]);this.writeChar(41);break;case FuId.TEXT_WRITER_WRITE_LINE:this.write("print(");if(args.length==1){args[0].accept(this,FuPriority.ARGUMENT);this.write(", ");}this.write("file=");obj.accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.CONSOLE_WRITE:this.write("print(");args[0].accept(this,FuPriority.ARGUMENT);this.write(", end=\"\")");break;case FuId.CONSOLE_WRITE_LINE:this.write("print(");if(args.length==1)args[0].accept(this,FuPriority.ARGUMENT);this.writeChar(41);break;case FuId.STRING_WRITER_CLEAR:this.writePostfix(obj,".seek(0)");this.writeNewLine();this.writePostfix(obj,".truncate(0)");break;case FuId.STRING_WRITER_TO_STRING:this.writePostfix(obj,".getvalue()");break;case FuId.U_T_F8_GET_BYTE_COUNT:this.write("len(");this.writePostfix(args[0],".encode(\"utf8\"))");break;case FuId.U_T_F8_GET_BYTES:this.write("fubytes = ");args[0].accept(this,FuPriority.PRIMARY);this.writeLine(".encode(\"utf8\")");args[1].accept(this,FuPriority.PRIMARY);this.writeChar(91);args[2].accept(this,FuPriority.ARGUMENT);this.writeChar(58);this.startAdd(args[2]);this.writeLine("len(fubytes)] = fubytes");break;case FuId.U_T_F8_GET_STRING:args[0].accept(this,FuPriority.PRIMARY);this.#writeSlice(args[1],args[2]);this.write(".decode(\"utf8\")");break;case FuId.ENVIRONMENT_GET_ENVIRONMENT_VARIABLE:this.include("os");this.writeCall("os.getenv",args[0]);break;case FuId.REGEX_COMPILE:this.write("re.compile(");args[0].accept(this,FuPriority.ARGUMENT);this.#writePyRegexOptions(args);this.writeChar(41);break;case FuId.REGEX_ESCAPE:this.include("re");this.writeCall("re.escape",args[0]);break;case FuId.REGEX_IS_MATCH_STR:if(parent>FuPriority.EQUALITY)this.writeChar(40);this.#writeRegexSearch(args);this.write(" is not None");if(parent>FuPriority.EQUALITY)this.writeChar(41);break;case FuId.REGEX_IS_MATCH_REGEX:if(parent>FuPriority.EQUALITY)this.writeChar(40);this.writeMethodCall(obj,"search",args[0]);this.write(" is not None");if(parent>FuPriority.EQUALITY)this.writeChar(41);break;case FuId.MATCH_FIND_STR:case FuId.MATCH_FIND_REGEX:if(parent>FuPriority.EQUALITY)this.writeChar(40);obj.accept(this,FuPriority.EQUALITY);this.write(" is not None");if(parent>FuPriority.EQUALITY)this.writeChar(41);break;case FuId.MATCH_GET_CAPTURE:this.writeMethodCall(obj,"group",args[0]);break;case FuId.MATH_METHOD:case FuId.MATH_IS_FINITE:case FuId.MATH_IS_NA_N:case FuId.MATH_LOG2:this.include("math");this.write("math.");this.writeLowercase(method.name);this.writeArgsInParentheses(method,args);break;case FuId.MATH_ABS:this.writeCall("abs",args[0]);break;case FuId.MATH_CEILING:this.include("math");this.writeCall("math.ceil",args[0]);break;case FuId.MATH_CLAMP:this.write("min(max(");this.writeClampAsMinMax(args);break;case FuId.MATH_FUSED_MULTIPLY_ADD:this.include("pyfma");this.writeCall("pyfma.fma",args[0],args[1],args[2]);break;case FuId.MATH_IS_INFINITY:this.include("math");this.writeCall("math.isinf",args[0]);break;case FuId.MATH_MAX_INT:case FuId.MATH_MAX_DOUBLE:this.writeCall("max",args[0],args[1]);break;case FuId.MATH_MIN_INT:case FuId.MATH_MIN_DOUBLE:this.writeCall("min",args[0],args[1]);break;case FuId.MATH_ROUND:this.writeCall("round",args[0]);break;case FuId.MATH_TRUNCATE:this.include("math");this.writeCall("math.trunc",args[0]);break;default:if(obj==null)this.writeLocalName(method,FuPriority.PRIMARY);else if(GenPy.isReferenceTo(obj,FuId.BASE_PTR)){this.writeName(method.parent);this.writeChar(46);this.writeName(method);this.write("(self");if(args.length>0){this.write(", ");this.writeArgs(method,args);}this.writeChar(41);break;}else {obj.accept(this,FuPriority.PRIMARY);this.writeChar(46);this.writeName(method);}this.writeArgsInParentheses(method,args);break;}}writeResource(name,length){this.write("_FuResource.");this.writeResourceName(name);}visitPreCall(call){switch(call.method.symbol.id){case FuId.MATCH_FIND_STR:call.method.left.accept(this,FuPriority.ASSIGN);this.write(" = ");this.#writeRegexSearch(call.arguments);this.writeNewLine();return true;case FuId.MATCH_FIND_REGEX:call.method.left.accept(this,FuPriority.ASSIGN);this.write(" = ");this.writeMethodCall(call.arguments[1],"search",call.arguments[0]);this.writeNewLine();return true;default:return false;}}startTemporaryVar(type){}hasInitCode(def){return (def.value!=null||def.type.isFinal())&&!def.isAssignableStorage();}visitExpr(statement){let def;if(!((def=statement)instanceof FuVar)||this.hasInitCode(def)){this.writeTemporaries(statement);super.visitExpr(statement);}}startLine(){super.startLine();this.#childPass=false;}openChild(){this.writeCharLine(58);this.indent++;this.#childPass=true;}closeChild(){if(this.#childPass)this.writeLine("pass");this.indent--;}visitLambdaExpr(expr){throw new Error();}writeAssertCast(expr){const def=expr.right;this.write(def.name);this.write(" = ");expr.left.accept(this,FuPriority.ARGUMENT);this.writeNewLine();}writeAssert(statement){this.write("assert ");statement.cond.accept(this,FuPriority.ARGUMENT);if(statement.message!=null){this.write(", ");statement.message.accept(this,FuPriority.ARGUMENT);}this.writeNewLine();}visitBreak(statement){this.writeLine(statement.loopOrSwitch instanceof FuSwitch?"raise _CiBreak()":"break");}getIfNot(){return "if not ";}#writeInclusiveLimit(limit,increment,incrementString){let literal;if((literal=limit)instanceof FuLiteralLong)this.visitLiteralLong(literal.value+BigInt(increment));else {limit.accept(this,FuPriority.ADD);this.write(incrementString);}}writeForRange(iter,cond,rangeStep){this.write("range(");if(rangeStep!=1||!iter.value.isLiteralZero()){iter.value.accept(this,FuPriority.ARGUMENT);this.write(", ");}switch(cond.op){case FuToken.LESS:case FuToken.GREATER:cond.right.accept(this,FuPriority.ARGUMENT);break;case FuToken.LESS_OR_EQUAL:this.#writeInclusiveLimit(cond.right,1," + 1");break;case FuToken.GREATER_OR_EQUAL:this.#writeInclusiveLimit(cond.right,-1," - 1");break;default:throw new Error();}if(rangeStep!=1){this.write(", ");this.visitLiteralLong(rangeStep);}this.writeChar(41);}visitForeach(statement){this.write("for ");this.writeName(statement.getVar());const klass=statement.collection.type;if(klass.class.typeParameterCount==2){this.write(", ");this.writeName(statement.getValueVar());this.write(" in ");if(klass.class.id==FuId.SORTED_DICTIONARY_CLASS){this.write("sorted(");this.writePostfix(statement.collection,".items())");}else this.writePostfix(statement.collection,".items()");}else {this.write(" in ");if(klass.class.id==FuId.SORTED_SET_CLASS)this.writeCall("sorted",statement.collection);else statement.collection.accept(this,FuPriority.ARGUMENT);}this.writeChild(statement.body);}writeElseIf(){this.write("el");}visitLock(statement){this.visitXcrement(statement.lock,false,true);this.write("with ");statement.lock.accept(this,FuPriority.ARGUMENT);this.openChild();this.visitXcrement(statement.lock,true,true);statement.body.acceptStatement(this);this.closeChild();}writeResultVar(){this.write("result");}#writeSwitchCaseVar(def){this.writeName(def.type.asClassType().class);this.write("()");if(def.name!="_"){this.write(" as ");this.#writeNameNotKeyword(def.name);}}#writePyCaseBody(statement,body){this.openChild();this.visitXcrement(statement.value,true,true);this.writeFirstStatements(body,FuSwitch.lengthWithoutTrailingBreak(body));this.closeChild();}visitSwitch(statement){let earlyBreak=statement.cases.some(kase=>FuSwitch.hasEarlyBreak(kase.body))||FuSwitch.hasEarlyBreak(statement.defaultBody);if(earlyBreak){this.#switchBreak=true;this.write("try");this.openChild();}this.visitXcrement(statement.value,false,true);this.write("match ");statement.value.accept(this,FuPriority.ARGUMENT);this.openChild();for(const kase of statement.cases){let op="case ";for(const caseValue of kase.values){this.write(op);if(caseValue instanceof FuVar){const def=caseValue;this.#writeSwitchCaseVar(def);}else if(caseValue instanceof FuBinaryExpr){const when1=caseValue;let whenVar;if((whenVar=when1.left)instanceof FuVar)this.#writeSwitchCaseVar(whenVar);else when1.left.accept(this,FuPriority.ARGUMENT);this.write(" if ");when1.right.accept(this,FuPriority.ARGUMENT);}else caseValue.accept(this,FuPriority.OR);op=" | ";}this.#writePyCaseBody(statement,kase.body);}if(statement.hasDefault()){this.write("case _");this.#writePyCaseBody(statement,statement.defaultBody);}this.closeChild();if(earlyBreak){this.closeChild();this.write("except _CiBreak");this.openChild();this.closeChild();}}visitThrow(statement){this.visitXcrement(statement.message,false,true);this.write("raise Exception(");statement.message.accept(this,FuPriority.ARGUMENT);this.writeCharLine(41);}visitEnumValue(konst,previous){this.writeUppercaseWithUnderscores(konst.name);this.write(" = ");this.visitLiteralLong(BigInt(konst.value.intValue()));this.writeNewLine();this.writeDoc(konst.documentation);}writeEnum(enu){this.include("enum");this.writeNewLine();this.write("class ");this.writeName(enu);this.write(enu instanceof FuEnumFlags?"(enum.Flag)":"(enum.Enum)");this.openChild();this.writeDoc(enu.documentation);enu.acceptValues(this);this.closeChild();}writeConst(konst){if(konst.visibility!=FuVisibility.PRIVATE||konst.type instanceof FuArrayStorageType){this.writeNewLine();this.writeName(konst);this.write(" = ");konst.value.accept(this,FuPriority.ARGUMENT);this.writeNewLine();this.writeDoc(konst.documentation);}}writeField(field){}writeMethod(method){if(method.callType==FuCallType.ABSTRACT)return;this.writeNewLine();if(method.callType==FuCallType.STATIC)this.writeLine("@staticmethod");this.write("def ");this.writeName(method);if(method.callType==FuCallType.STATIC)this.writeParameters(method,true);else {this.write("(self");this.writeRemainingParameters(method,false,true);}this.currentMethod=method;this.openChild();this.#writePyDoc(method);method.body.acceptStatement(this);this.closeChild();this.currentMethod=null;}#inheritsConstructor(klass){let baseClass;while((baseClass=klass.parent)instanceof FuClass){if(this.needsConstructor(baseClass))return true;klass=baseClass;}return false;}writeInitField(field){if(this.hasInitCode(field)){this.write("self.");this.writeVar(field);this.writeNewLine();this.writeInitCode(field);}}writeClass(klass,program){if(!this.writeBaseClass(klass,program))return;this.writeNewLine();this.write("class ");this.writeName(klass);let baseClass;if((baseClass=klass.parent)instanceof FuClass){this.writeChar(40);this.writeName(baseClass);this.writeChar(41);}this.openChild();this.writeDoc(klass.documentation);if(this.needsConstructor(klass)){this.writeNewLine();this.write("def __init__(self)");this.openChild();if(klass.constructor_!=null)this.writeDoc(klass.constructor_.documentation);if(this.#inheritsConstructor(klass)){this.writeName(klass.parent);this.writeLine(".__init__(self)");}this.writeConstructorBody(klass);this.closeChild();}this.writeMembers(klass,true);this.closeChild();}#writeResourceByte(b){this.write(`\\x${b.toString(16).padStart(2,"0")}`);}#writeResources(resources){if(Object.keys(resources).length==0)return;this.writeNewLine();this.write("class _FuResource");this.openChild();for(const[name,content]of Object.entries(resources).sort((a,b)=>a[0].localeCompare(b[0]))){this.writeResourceName(name);this.writeLine(" = (");this.indent++;this.write("b\"");let i=0;for(const b of content){if(i>0&&(i&15)==0){this.writeCharLine(34);this.write("b\"");}this.#writeResourceByte(b);i++;}this.writeLine("\" )");this.indent--;}this.closeChild();}writeProgram(program){this.#switchBreak=false;this.openStringWriter();this.writeTypes(program);this.createOutputFile();this.writeTopLevelNatives(program);this.writeIncludes("import ","");if(this.#switchBreak){this.writeNewLine();this.writeLine("class _CiBreak(Exception): pass");}this.closeStringWriter();this.#writeResources(program.resources);this.closeFile();}}class StringWriter{#buf="";write(s){this.#buf+=s;}clear(){this.#buf="";}toString(){return this.#buf;}}

    const conf = {
      wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
      comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
      },
      brackets: [['{', '}'], ['[', ']'], ['(', ')']],
      autoClosingPairs: [{
        open: '{',
        close: '}'
      }, {
        open: '[',
        close: ']'
      }, {
        open: '(',
        close: ')'
      }, {
        open: "'",
        close: "'",
        notIn: ['string', 'comment']
      }, {
        open: '"',
        close: '"',
        notIn: ['string', 'comment']
      }],
      surroundingPairs: [{
        open: '{',
        close: '}'
      }, {
        open: '[',
        close: ']'
      }, {
        open: '(',
        close: ')'
      }, {
        open: '<',
        close: '>'
      }, {
        open: "'",
        close: "'"
      }, {
        open: '"',
        close: '"'
      }]
    };
    const language = {
      defaultToken: '',
      tokenPostfix: '.fu',
      brackets: [{
        open: '{',
        close: '}',
        token: 'delimiter.curly'
      }, {
        open: '[',
        close: ']',
        token: 'delimiter.square'
      }, {
        open: '(',
        close: ')',
        token: 'delimiter.parenthesis'
      }, {
        open: '<',
        close: '>',
        token: 'delimiter.angle'
      }],
      keywords: ['abstract', 'assert', 'base', 'bool', 'break', 'byte', 'case', 'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'false', 'float', 'for', 'foreach', 'if', 'in', 'int', 'internal', 'is', 'lock', 'long', 'native', 'new', 'null', 'override', 'protected', 'public', 'resource', 'return', 'sealed', 'short', 'static', 'string', 'switch', 'this', 'throw', 'throws', 'true', 'uint', 'ushort', 'virtual', 'void', 'when', 'while'],
      parenFollows: ['catch', 'if', 'for', 'foreach', 'while', 'switch', 'when'],
      operators: ['=', '??', '||', '&&', '|', '^', '&', '==', '!=', '<=', '>=', '<<', '+', '-', '*', '/', '%', '!', '~', '++', '--', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<=', '>>=', '>>', '=>'],
      symbols: /[=><!~?:&|+\-*\/\^%]+/,
      // escape sequences
      escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
      tokenizer: {
        root: [
        // identifiers and keywords
        [/\@?[a-zA-Z_]\w*/, {
          cases: {
            '@keywords': {
              token: 'keyword.$0',
              next: '@qualified'
            },
            '@default': {
              token: 'identifier',
              next: '@qualified'
            }
          }
        }],
        // whitespace
        {
          include: '@whitespace'
        },
        // delimiters and operators
        [/}/, {
          cases: {
            '$S2==interpolatedstring': {
              token: 'string.quote',
              next: '@pop'
            },
            '$S2==litinterpstring': {
              token: 'string.quote',
              next: '@pop'
            },
            '@default': '@brackets'
          }
        }], [/[{}()\[\]]/, '@brackets'], [/[<>](?!@symbols)/, '@brackets'], [/@symbols/, {
          cases: {
            '@operators': 'delimiter',
            '@default': ''
          }
        }],
        // numbers
        [/[0-9_]*\.[0-9_]+([eE][\-+]?\d+)?[fFdD]?/, 'number.float'], [/0[x][0-9a-fA-F_]+/, 'number.hex'], [/0[o][0-7_]+/, 'number.hex'],
        // octal: use same theme style as hex
        [/0[b][01_]+/, 'number.hex'],
        // binary: use same theme style as hex
        [/[0-9_]+/, 'number'],
        // delimiter: after number because of .\d floats
        [/[;,.]/, 'delimiter'],
        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        // non-teminated string
        [/"/, {
          token: 'string.quote',
          next: '@string'
        }], [/\$\@"/, {
          token: 'string.quote',
          next: '@litinterpstring'
        }], [/\@"/, {
          token: 'string.quote',
          next: '@litstring'
        }], [/\$"/, {
          token: 'string.quote',
          next: '@interpolatedstring'
        }],
        // characters
        [/'[^\\']'/, 'string'], [/(')(@escapes)(')/, ['string', 'string.escape', 'string']], [/'/, 'string.invalid']],
        qualified: [[/[a-zA-Z_][\w]*/, {
          cases: {
            '@keywords': {
              token: 'keyword.$0'
            },
            '@default': 'identifier'
          }
        }], [/\./, 'delimiter'], ['', '', '@pop']],
        comment: [[/[^\/*]+/, 'comment'],
        // [/\/\*/,    'comment', '@push' ],    // no nested comments :-(
        ['\\*/', 'comment', '@pop'], [/[\/*]/, 'comment']],
        string: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/"/, {
          token: 'string.quote',
          next: '@pop'
        }]],
        litstring: [[/[^"]+/, 'string'], [/""/, 'string.escape'], [/"/, {
          token: 'string.quote',
          next: '@pop'
        }]],
        litinterpstring: [[/[^"{]+/, 'string'], [/""/, 'string.escape'], [/{{/, 'string.escape'], [/}}/, 'string.escape'], [/{/, {
          token: 'string.quote',
          next: 'root.litinterpstring'
        }], [/"/, {
          token: 'string.quote',
          next: '@pop'
        }]],
        interpolatedstring: [[/[^\\"{]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/{{/, 'string.escape'], [/}}/, 'string.escape'], [/{/, {
          token: 'string.quote',
          next: 'root.interpolatedstring'
        }], [/"/, {
          token: 'string.quote',
          next: '@pop'
        }]],
        whitespace: [[/^[ \t\v\f]*#((r)|(load))(?=\s)/, 'directive.csx'], [/^[ \t\v\f]*#\w.*$/, 'namespace.cpp'], [/[ \t\v\f\r\n]+/, ''], [/\/\*/, 'comment', '@comment'], [/\/\/.*$/, 'comment']]
      }
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    /** Detect free variable `global` from Node.js. */

    var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    var _freeGlobal = freeGlobal$1;

    var freeGlobal = _freeGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root$2 = freeGlobal || freeSelf || Function('return this')();

    var _root = root$2;

    var root$1 = _root;

    /** Built-in value references. */
    var Symbol$3 = root$1.Symbol;

    var _Symbol = Symbol$3;

    var Symbol$2 = _Symbol;

    /** Used for built-in method references. */
    var objectProto$b = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$b.toString;

    /** Built-in value references. */
    var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag$1(value) {
      var isOwn = hasOwnProperty$9.call(value, symToStringTag$1),
          tag = value[symToStringTag$1];

      try {
        value[symToStringTag$1] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString$1.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag$1] = tag;
        } else {
          delete value[symToStringTag$1];
        }
      }
      return result;
    }

    var _getRawTag = getRawTag$1;

    /** Used for built-in method references. */

    var objectProto$a = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto$a.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString$1(value) {
      return nativeObjectToString.call(value);
    }

    var _objectToString = objectToString$1;

    var Symbol$1 = _Symbol,
        getRawTag = _getRawTag,
        objectToString = _objectToString;

    /** `Object#toString` result references. */
    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';

    /** Built-in value references. */
    var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag$6(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    var _baseGetTag = baseGetTag$6;

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */

    function isObject$4(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    var isObject_1 = isObject$4;

    var baseGetTag$5 = _baseGetTag,
        isObject$3 = isObject_1;

    /** `Object#toString` result references. */
    var asyncTag = '[object AsyncFunction]',
        funcTag$1 = '[object Function]',
        genTag = '[object GeneratorFunction]',
        proxyTag = '[object Proxy]';

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction$2(value) {
      if (!isObject$3(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag$5(value);
      return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    var isFunction_1 = isFunction$2;

    var root = _root;

    /** Used to detect overreaching core-js shims. */
    var coreJsData$1 = root['__core-js_shared__'];

    var _coreJsData = coreJsData$1;

    var coreJsData = _coreJsData;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked$1(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    var _isMasked = isMasked$1;

    /** Used for built-in method references. */

    var funcProto$2 = Function.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$2 = funcProto$2.toString;

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource$1(func) {
      if (func != null) {
        try {
          return funcToString$2.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    var _toSource = toSource$1;

    var isFunction$1 = isFunction_1,
        isMasked = _isMasked,
        isObject$2 = isObject_1,
        toSource = _toSource;

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used for built-in method references. */
    var funcProto$1 = Function.prototype,
        objectProto$9 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$1 = funcProto$1.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString$1.call(hasOwnProperty$8).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative$1(value) {
      if (!isObject$2(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    var _baseIsNative = baseIsNative$1;

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */

    function getValue$1(object, key) {
      return object == null ? undefined : object[key];
    }

    var _getValue = getValue$1;

    var baseIsNative = _baseIsNative,
        getValue = _getValue;

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative$1(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    var _getNative = getNative$1;

    var getNative = _getNative;

    var defineProperty$2 = (function() {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    var _defineProperty = defineProperty$2;

    var defineProperty$1 = _defineProperty;

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue$2(object, key, value) {
      if (key == '__proto__' && defineProperty$1) {
        defineProperty$1(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    var _baseAssignValue = baseAssignValue$2;

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */

    function eq$3(value, other) {
      return value === other || (value !== value && other !== other);
    }

    var eq_1 = eq$3;

    var baseAssignValue$1 = _baseAssignValue,
        eq$2 = eq_1;

    /** Used for built-in method references. */
    var objectProto$8 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue$1(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty$7.call(object, key) && eq$2(objValue, value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue$1(object, key, value);
      }
    }

    var _assignValue = assignValue$1;

    var assignValue = _assignValue,
        baseAssignValue = _baseAssignValue;

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject$1(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }

    var _copyObject = copyObject$1;

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */

    function identity$2(value) {
      return value;
    }

    var identity_1 = identity$2;

    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */

    function apply$2(func, thisArg, args) {
      switch (args.length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }

    var _apply = apply$2;

    var apply$1 = _apply;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max;

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest$1(func, start, transform) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply$1(func, this, otherArgs);
      };
    }

    var _overRest = overRest$1;

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */

    function constant$1(value) {
      return function() {
        return value;
      };
    }

    var constant_1 = constant$1;

    var constant = constant_1,
        defineProperty = _defineProperty,
        identity$1 = identity_1;

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString$1 = !defineProperty ? identity$1 : function(func, string) {
      return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };

    var _baseSetToString = baseSetToString$1;

    /** Used to detect hot functions by number of calls within a span of milliseconds. */

    var HOT_COUNT = 800,
        HOT_SPAN = 16;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeNow = Date.now;

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut$1(func) {
      var count = 0,
          lastCalled = 0;

      return function() {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined, arguments);
      };
    }

    var _shortOut = shortOut$1;

    var baseSetToString = _baseSetToString,
        shortOut = _shortOut;

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString$1 = shortOut(baseSetToString);

    var _setToString = setToString$1;

    var identity = identity_1,
        overRest = _overRest,
        setToString = _setToString;

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest$2(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }

    var _baseRest = baseRest$2;

    /** Used as references for various `Number` constants. */

    var MAX_SAFE_INTEGER$1 = 9007199254740991;

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength$2(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
    }

    var isLength_1 = isLength$2;

    var isFunction = isFunction_1,
        isLength$1 = isLength_1;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike$3(value) {
      return value != null && isLength$1(value.length) && !isFunction(value);
    }

    var isArrayLike_1 = isArrayLike$3;

    /** Used as references for various `Number` constants. */

    var MAX_SAFE_INTEGER = 9007199254740991;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex$2(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    var _isIndex = isIndex$2;

    var eq$1 = eq_1,
        isArrayLike$2 = isArrayLike_1,
        isIndex$1 = _isIndex,
        isObject$1 = isObject_1;

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall$2(value, index, object) {
      if (!isObject$1(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike$2(object) && isIndex$1(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq$1(object[index], value);
      }
      return false;
    }

    var _isIterateeCall = isIterateeCall$2;

    var baseRest$1 = _baseRest,
        isIterateeCall$1 = _isIterateeCall;

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner$1(assigner) {
      return baseRest$1(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined;

        if (guard && isIterateeCall$1(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    var _createAssigner = createAssigner$1;

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */

    function baseTimes$1(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    var _baseTimes = baseTimes$1;

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */

    function isObjectLike$6(value) {
      return value != null && typeof value == 'object';
    }

    var isObjectLike_1 = isObjectLike$6;

    var baseGetTag$4 = _baseGetTag,
        isObjectLike$5 = isObjectLike_1;

    /** `Object#toString` result references. */
    var argsTag$1 = '[object Arguments]';

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments$1(value) {
      return isObjectLike$5(value) && baseGetTag$4(value) == argsTag$1;
    }

    var _baseIsArguments = baseIsArguments$1;

    var baseIsArguments = _baseIsArguments,
        isObjectLike$4 = isObjectLike_1;

    /** Used for built-in method references. */
    var objectProto$7 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

    /** Built-in value references. */
    var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments$1 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike$4(value) && hasOwnProperty$6.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };

    var isArguments_1 = isArguments$1;

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */

    var isArray$2 = Array.isArray;

    var isArray_1 = isArray$2;

    var isBuffer$1 = {exports: {}};

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */

    function stubFalse() {
      return false;
    }

    var stubFalse_1 = stubFalse;

    isBuffer$1.exports;

    (function (module, exports) {
    	var root = _root,
    	    stubFalse = stubFalse_1;

    	/** Detect free variable `exports`. */
    	var freeExports = exports && !exports.nodeType && exports;

    	/** Detect free variable `module`. */
    	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    	/** Detect the popular CommonJS extension `module.exports`. */
    	var moduleExports = freeModule && freeModule.exports === freeExports;

    	/** Built-in value references. */
    	var Buffer = moduleExports ? root.Buffer : undefined;

    	/* Built-in method references for those with the same name as other `lodash` methods. */
    	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

    	/**
    	 * Checks if `value` is a buffer.
    	 *
    	 * @static
    	 * @memberOf _
    	 * @since 4.3.0
    	 * @category Lang
    	 * @param {*} value The value to check.
    	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
    	 * @example
    	 *
    	 * _.isBuffer(new Buffer(2));
    	 * // => true
    	 *
    	 * _.isBuffer(new Uint8Array(2));
    	 * // => false
    	 */
    	var isBuffer = nativeIsBuffer || stubFalse;

    	module.exports = isBuffer; 
    } (isBuffer$1, isBuffer$1.exports));

    var isBufferExports = isBuffer$1.exports;

    var baseGetTag$3 = _baseGetTag,
        isLength = isLength_1,
        isObjectLike$3 = isObjectLike_1;

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag$1 = '[object Error]',
        funcTag = '[object Function]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag$1 = '[object Object]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        weakMapTag = '[object WeakMap]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
    typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
    typedArrayTags[errorTag$1] = typedArrayTags[funcTag] =
    typedArrayTags[mapTag] = typedArrayTags[numberTag] =
    typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
    typedArrayTags[setTag] = typedArrayTags[stringTag] =
    typedArrayTags[weakMapTag] = false;

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray$1(value) {
      return isObjectLike$3(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag$3(value)];
    }

    var _baseIsTypedArray = baseIsTypedArray$1;

    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */

    function baseUnary$1(func) {
      return function(value) {
        return func(value);
      };
    }

    var _baseUnary = baseUnary$1;

    var _nodeUtil = {exports: {}};

    _nodeUtil.exports;

    (function (module, exports) {
    	var freeGlobal = _freeGlobal;

    	/** Detect free variable `exports`. */
    	var freeExports = exports && !exports.nodeType && exports;

    	/** Detect free variable `module`. */
    	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    	/** Detect the popular CommonJS extension `module.exports`. */
    	var moduleExports = freeModule && freeModule.exports === freeExports;

    	/** Detect free variable `process` from Node.js. */
    	var freeProcess = moduleExports && freeGlobal.process;

    	/** Used to access faster Node.js helpers. */
    	var nodeUtil = (function() {
    	  try {
    	    // Use `util.types` for Node.js 10+.
    	    var types = freeModule && freeModule.require && freeModule.require('util').types;

    	    if (types) {
    	      return types;
    	    }

    	    // Legacy `process.binding('util')` for Node.js < 10.
    	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
    	  } catch (e) {}
    	}());

    	module.exports = nodeUtil; 
    } (_nodeUtil, _nodeUtil.exports));

    var _nodeUtilExports = _nodeUtil.exports;

    var baseIsTypedArray = _baseIsTypedArray,
        baseUnary = _baseUnary,
        nodeUtil = _nodeUtilExports;

    /* Node.js helper references. */
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray$1 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    var isTypedArray_1 = isTypedArray$1;

    var baseTimes = _baseTimes,
        isArguments = isArguments_1,
        isArray$1 = isArray_1,
        isBuffer = isBufferExports,
        isIndex = _isIndex,
        isTypedArray = isTypedArray_1;

    /** Used for built-in method references. */
    var objectProto$6 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys$2(value, inherited) {
      var isArr = isArray$1(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty$5.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    var _arrayLikeKeys = arrayLikeKeys$2;

    /** Used for built-in method references. */

    var objectProto$5 = Object.prototype;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype$2(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

      return value === proto;
    }

    var _isPrototype = isPrototype$2;

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */

    function nativeKeysIn$1(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    var _nativeKeysIn = nativeKeysIn$1;

    var isObject = isObject_1,
        isPrototype$1 = _isPrototype,
        nativeKeysIn = _nativeKeysIn;

    /** Used for built-in method references. */
    var objectProto$4 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn$1(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype$1(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty$4.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    var _baseKeysIn = baseKeysIn$1;

    var arrayLikeKeys$1 = _arrayLikeKeys,
        baseKeysIn = _baseKeysIn,
        isArrayLike$1 = isArrayLike_1;

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn$1(object) {
      return isArrayLike$1(object) ? arrayLikeKeys$1(object, true) : baseKeysIn(object);
    }

    var keysIn_1 = keysIn$1;

    var copyObject = _copyObject,
        createAssigner = _createAssigner,
        keysIn = keysIn_1;

    /**
     * This method is like `_.assignIn` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extendWith
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignInWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignInWith$1 = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keysIn(source), object, customizer);
    });

    var assignInWith_1 = assignInWith$1;

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */

    function overArg$2(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    var _overArg = overArg$2;

    var overArg$1 = _overArg;

    /** Built-in value references. */
    var getPrototype$1 = overArg$1(Object.getPrototypeOf, Object);

    var _getPrototype = getPrototype$1;

    var baseGetTag$2 = _baseGetTag,
        getPrototype = _getPrototype,
        isObjectLike$2 = isObjectLike_1;

    /** `Object#toString` result references. */
    var objectTag = '[object Object]';

    /** Used for built-in method references. */
    var funcProto = Function.prototype,
        objectProto$3 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject$1(value) {
      if (!isObjectLike$2(value) || baseGetTag$2(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty$3.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
    }

    var isPlainObject_1 = isPlainObject$1;

    var baseGetTag$1 = _baseGetTag,
        isObjectLike$1 = isObjectLike_1,
        isPlainObject = isPlainObject_1;

    /** `Object#toString` result references. */
    var domExcTag = '[object DOMException]',
        errorTag = '[object Error]';

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError$2(value) {
      if (!isObjectLike$1(value)) {
        return false;
      }
      var tag = baseGetTag$1(value);
      return tag == errorTag || tag == domExcTag ||
        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
    }

    var isError_1 = isError$2;

    var apply = _apply,
        baseRest = _baseRest,
        isError$1 = isError_1;

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Function} func The function to attempt.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // Avoid throwing errors for invalid selectors.
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt$1 = baseRest(function(func, args) {
      try {
        return apply(func, undefined, args);
      } catch (e) {
        return isError$1(e) ? e : new Error(e);
      }
    });

    var attempt_1 = attempt$1;

    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */

    function arrayMap$2(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    var _arrayMap = arrayMap$2;

    var arrayMap$1 = _arrayMap;

    /**
     * The base implementation of `_.values` and `_.valuesIn` which creates an
     * array of `object` property values corresponding to the property names
     * of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the array of property values.
     */
    function baseValues$1(object, props) {
      return arrayMap$1(props, function(key) {
        return object[key];
      });
    }

    var _baseValues = baseValues$1;

    var eq = eq_1;

    /** Used for built-in method references. */
    var objectProto$2 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

    /**
     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
     * of source objects to the destination object for all destination properties
     * that resolve to `undefined`.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to assign.
     * @param {Object} object The parent object of `objValue`.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsAssignIn$1(objValue, srcValue, key, object) {
      if (objValue === undefined ||
          (eq(objValue, objectProto$2[key]) && !hasOwnProperty$2.call(object, key))) {
        return srcValue;
      }
      return objValue;
    }

    var _customDefaultsAssignIn = customDefaultsAssignIn$1;

    /** Used to escape characters for inclusion in compiled string literals. */

    var stringEscapes = {
      '\\': '\\',
      "'": "'",
      '\n': 'n',
      '\r': 'r',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    };

    /**
     * Used by `_.template` to escape characters for inclusion in compiled string literals.
     *
     * @private
     * @param {string} chr The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    function escapeStringChar$1(chr) {
      return '\\' + stringEscapes[chr];
    }

    var _escapeStringChar = escapeStringChar$1;

    var overArg = _overArg;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeKeys$1 = overArg(Object.keys, Object);

    var _nativeKeys = nativeKeys$1;

    var isPrototype = _isPrototype,
        nativeKeys = _nativeKeys;

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys$1(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty$1.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    var _baseKeys = baseKeys$1;

    var arrayLikeKeys = _arrayLikeKeys,
        baseKeys = _baseKeys,
        isArrayLike = isArrayLike_1;

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys$1(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    var keys_1 = keys$1;

    /** Used to match template delimiters. */

    var reInterpolate$2 = /<%=([\s\S]+?)%>/g;

    var _reInterpolate = reInterpolate$2;

    /**
     * The base implementation of `_.propertyOf` without support for deep paths.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     */

    function basePropertyOf$1(object) {
      return function(key) {
        return object == null ? undefined : object[key];
      };
    }

    var _basePropertyOf = basePropertyOf$1;

    var basePropertyOf = _basePropertyOf;

    /** Used to map characters to HTML entities. */
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    /**
     * Used by `_.escape` to convert characters to HTML entities.
     *
     * @private
     * @param {string} chr The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    var escapeHtmlChar$1 = basePropertyOf(htmlEscapes);

    var _escapeHtmlChar = escapeHtmlChar$1;

    var baseGetTag = _baseGetTag,
        isObjectLike = isObjectLike_1;

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol$1(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && baseGetTag(value) == symbolTag);
    }

    var isSymbol_1 = isSymbol$1;

    var Symbol = _Symbol,
        arrayMap = _arrayMap,
        isArray = isArray_1,
        isSymbol = isSymbol_1;

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString$1(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString$1) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    var _baseToString = baseToString$1;

    var baseToString = _baseToString;

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString$2(value) {
      return value == null ? '' : baseToString(value);
    }

    var toString_1 = toString$2;

    var escapeHtmlChar = _escapeHtmlChar,
        toString$1 = toString_1;

    /** Used to match HTML entities and HTML characters. */
    var reUnescapedHtml = /[&<>"']/g,
        reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

    /**
     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
     * corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional
     * characters use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value. See
     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * When working with HTML you should always
     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
     * XSS vectors.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape$1(string) {
      string = toString$1(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }

    var _escape = escape$1;

    /** Used to match template delimiters. */

    var reEscape$1 = /<%-([\s\S]+?)%>/g;

    var _reEscape = reEscape$1;

    /** Used to match template delimiters. */

    var reEvaluate$1 = /<%([\s\S]+?)%>/g;

    var _reEvaluate = reEvaluate$1;

    var escape = _escape,
        reEscape = _reEscape,
        reEvaluate = _reEvaluate,
        reInterpolate$1 = _reInterpolate;

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
     * following template settings to use alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type {Object}
     */
    var templateSettings$1 = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'escape': reEscape,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'evaluate': reEvaluate,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'interpolate': reInterpolate$1,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type {string}
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type {Object}
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type {Function}
         */
        '_': { 'escape': escape }
      }
    };

    var templateSettings_1 = templateSettings$1;

    var assignInWith = assignInWith_1,
        attempt = attempt_1,
        baseValues = _baseValues,
        customDefaultsAssignIn = _customDefaultsAssignIn,
        escapeStringChar = _escapeStringChar,
        isError = isError_1,
        isIterateeCall = _isIterateeCall,
        keys = keys_1,
        reInterpolate = _reInterpolate,
        templateSettings = templateSettings_1,
        toString = toString_1;

    /** Error message constants. */
    var INVALID_TEMPL_VAR_ERROR_TEXT = 'Invalid `variable` option passed into `_.template`';

    /** Used to match empty string literals in compiled template source. */
    var reEmptyStringLeading = /\b__p \+= '';/g,
        reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
        reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

    /**
     * Used to validate the `validate` option in `_.template` variable.
     *
     * Forbids characters which could potentially change the meaning of the function argument definition:
     * - "()," (modification of function parameters)
     * - "=" (default value)
     * - "[]{}" (destructuring of function parameters)
     * - "/" (beginning of a comment)
     * - whitespace
     */
    var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;

    /**
     * Used to match
     * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
     */
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

    /** Used to ensure capturing order of template delimiters. */
    var reNoMatch = /($^)/;

    /** Used to match unescaped characters in compiled string literals. */
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is given, it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options={}] The options object.
     * @param {RegExp} [options.escape=_.templateSettings.escape]
     *  The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
     *  The "evaluate" delimiter.
     * @param {Object} [options.imports=_.templateSettings.imports]
     *  An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
     *  The "interpolate" delimiter.
     * @param {string} [options.sourceURL='templateSources[n]']
     *  The sourceURL of the compiled template.
     * @param {string} [options.variable='obj']
     *  The data object variable name.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // Use the "interpolate" delimiter to create a compiled template.
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // Use the HTML "escape" delimiter to escape data property values.
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the internal `print` function in "evaluate" delimiters.
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // Use the ES template literal delimiter as an "interpolate" delimiter.
     * // Disable support by replacing the "interpolate" delimiter.
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // Use backslashes to treat delimiters as plain text.
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // Use the `imports` option to import `jQuery` as `jq`.
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
     *
     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // Use custom template delimiters.
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // Use the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and stack traces.
     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, guard) {
      // Based on John Resig's `tmpl` implementation
      // (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = templateSettings.imports._.templateSettings || templateSettings;

      if (guard && isIterateeCall(string, options, guard)) {
        options = undefined;
      }
      string = toString(string);
      options = assignInWith({}, options, settings, customDefaultsAssignIn);

      var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      // The sourceURL gets injected into the source that's eval-ed, so be careful
      // to normalize all kinds of whitespace, so e.g. newlines (and unicode versions of it) can't sneak in
      // and escape the comment, thus injecting code that gets evaled.
      var sourceURL = hasOwnProperty.call(options, 'sourceURL')
        ? ('//# sourceURL=' +
           (options.sourceURL + '').replace(/\s/g, ' ') +
           '\n')
        : '';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products needs `match` returned in
        // order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      var variable = hasOwnProperty.call(options, 'variable') && options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Throw an error if a forbidden character was found in `variable`, to prevent
      // potential command injection attacks.
      else if (reForbiddenIdentifierChars.test(variable)) {
        throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
      }

      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source)
          .apply(undefined, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    var template_1 = template;

    var template$1 = /*@__PURE__*/getDefaultExportFromCjs(template_1);

    var previewTemplateString = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>Debug frame</title>\r\n    <style>\r\n        html {\r\n            background: #282828;\r\n        }\r\n        #debug-console-title {\r\n            font-family: monospace;\r\n            font-size: 120%;\r\n            font-weight: bold;\r\n            color: #eeeae0;\r\n        }\r\n\r\n        .debug-log {\r\n            font-family: monospace;\r\n            font-size: 87.5%;\r\n            background: #282828;\r\n            color: #eeeae0;\r\n            border-bottom: 1px solid #525252;\r\n            padding: 0.25rem;\r\n            margin: 0;\r\n            display: block;\r\n            white-space: pre-wrap;\r\n        }\r\n        .debug-log-warn {\r\n            background: #413A2A;\r\n            color: #EE9836;\r\n        }\r\n        .debug-log-error {\r\n            background: #4E3534;\r\n            color: #E46962;\r\n        }\r\n\r\n        .debug-log-item {\r\n            display: inline-block;\r\n        }\r\n        \r\n        .debug-log-item-color-square {\r\n            display: inline-block;\r\n            width: 0.75rem;\r\n            height: 0.75rem;\r\n            margin-right: 0.25rem;\r\n            border: 1px solid #525252;\r\n            vertical-align: bottom;\r\n            background: var(--color);\r\n        }\r\n    </style>\r\n</head>\r\n<body>\r\n    <div id=\"debug-console-title\">\r\n        Console:\r\n    </div>\r\n    <div id=\"debug-logs\"></div>\r\n    <script id=\"utils\">\r\n        window.debugUtils = {\r\n            'ImageLog': function ImageLog(width, height, data) {\r\n                this.width = width\r\n                this.height = height\r\n                this.data = data\r\n            },\r\n            'ColorLog': function ColorLog(color) {\r\n                let r = 0\r\n                let g = 0\r\n                let b = 0\r\n                let a = 0\r\n                if (typeof color === 'string') {\r\n                    if (color.startsWith('#')) {\r\n                        r = parseInt(color.slice(1, 3), 16)\r\n                        g = parseInt(color.slice(3, 5), 16)\r\n                        b = parseInt(color.slice(5, 7), 16)\r\n                        if (color.length > 7) {\r\n                            a = parseInt(color.slice(7, 9), 16)\r\n                        } else {\r\n                            a = 255\r\n                        }\r\n                    }\r\n                } else {\r\n                    const colorArray = Uint8Array.from(color)\r\n                    r = colorArray[0]\r\n                    g = colorArray[1]\r\n                    b = colorArray[2]\r\n                    if (colorArray.length > 3) {\r\n                        a = colorArray[3]\r\n                    } else {\r\n                        a = 255\r\n                    }\r\n                }\r\n\r\n                this.toString = function() {\r\n                    return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0') + a.toString(16).padStart(2, '0')\r\n                }\r\n            }\r\n        }\r\n        ;(() => {\r\n            const originalConsoleLog = console.log\r\n            const originalConsoleWarn = console.warn\r\n            const originalConsoleError = console.error\r\n            console.log = function() {\r\n                debugLog('log', ...arguments)\r\n                originalConsoleLog.apply(console, arguments)\r\n            }\r\n            console.warn = function() {\r\n                debugLog('warn', ...arguments)\r\n                originalConsoleWarn.apply(console, arguments)\r\n            }\r\n            console.error = function() {\r\n                debugLog('error', ...arguments)\r\n                originalConsoleError.apply(console, arguments)\r\n            }\r\n            let onNextMessage = null\r\n\r\n            function debugLog(severity, ...args) {\r\n                const wrapper = document.createElement('div')\r\n                wrapper.classList.add('debug-log')\r\n                wrapper.classList.add('debug-log-' + severity)\r\n                if (onNextMessage) {\r\n                    onNextMessage(args)\r\n                    onNextMessage = null\r\n                    return\r\n                }\r\n                const message = args.map(arg => {\r\n                    const item = document.createElement('span')\r\n                    item.classList.add('debug-log-item')\r\n                    if (typeof arg === 'object') {\r\n                        if (arg instanceof window.debugUtils.ImageLog) {\r\n                            item.appendChild(getImageCanvas(arg))\r\n                        } else if (arg instanceof window.debugUtils.ColorLog) {\r\n                            item.appendChild(getColorSquare(arg))\r\n                        } else {\r\n                            item.innerText = arg?.toString()\r\n                        }\r\n                    } else {\r\n                        item.innerText = arg\r\n                    }\r\n                    return item\r\n                })\r\n\r\n                message.forEach(item => wrapper.appendChild(item))\r\n\r\n                document.getElementById('debug-logs').appendChild(wrapper)\r\n            }\r\n\r\n            function getImageCanvas(imageLog) {\r\n                const canvas = document.createElement('canvas')\r\n                const ctx = canvas.getContext('2d')\r\n                canvas.width = imageLog.width\r\n                canvas.height = imageLog.height\r\n                ctx.putImageData(new ImageData(Uint8ClampedArray.from(imageLog.data), imageLog.width, imageLog.height), 0, 0)\r\n                return canvas\r\n            }\r\n\r\n            function getColorSquare(colorLog) {\r\n                const group = document.createDocumentFragment()\r\n                const square = document.createElement('span')\r\n                square.className = 'debug-log-item-color-square'\r\n                const color = colorLog.toString()\r\n                square.style.setProperty('--color', color)\r\n                group.appendChild(square)\r\n                const text = document.createElement('span')\r\n                text.className = 'debug-log-item-color-text'\r\n                text.innerText = color\r\n                group.appendChild(text)\r\n                return group\r\n            }\r\n        })()\r\n    </script>\r\n\r\n    <script src=\"<%= objectUrl %>\"></script>\r\n    <script>\r\n        <%= entryPoint %>()\r\n    </script>\r\n</body>\r\n</html>";

    const previewTemplate = template$1(previewTemplateString);
    function launchDebugWindow(scriptSource, entryPoint) {
      const scriptObjectUrl = URL.createObjectURL(new Blob([scriptSource], {
        type: 'text/javascript'
      }));
      const indexOfDot = entryPoint.indexOf('.');
      const outHtml = previewTemplate({
        entryPoint: `${entryPoint.slice(0, indexOfDot)}.${convertEntryPointName(entryPoint.slice(indexOfDot + 1))}`,
        objectUrl: scriptObjectUrl
      });
      const htmlObjectUrl = URL.createObjectURL(new Blob([outHtml], {
        type: 'text/html'
      }));
      const debugWindow = window.open(htmlObjectUrl, '_blank', 'width=600,height=400');
      if (!debugWindow) {
        throw new Error('Failed to open debug window');
      }
      const interval = setInterval(() => {
        if (debugWindow.closed) {
          clearInterval(interval);
          URL.revokeObjectURL(scriptObjectUrl);
          URL.revokeObjectURL(htmlObjectUrl);
        }
      }, 1000);
    }
    function convertEntryPointName(name) {
      let camelCaseName = name.slice(0, 1).toLowerCase() + name.slice(1);
      switch (name) {
        case "arguments":
        case "await":
        case "catch":
        case "debugger":
        case "delete":
        case "export":
        case "extends":
        case "finally":
        case "function":
        case "implements":
        case "import":
        case "instanceof":
        case "interface":
        case "let":
        case "package":
        case "private":
        case "super":
        case "try":
        case "typeof":
        case "var":
        case "with":
        case "yield":
          camelCaseName += '_';
          break;
      }
      return camelCaseName;
    }

    let leftEditor;
    const srcFiles = {};
    let rightEditor;
    const outFiles = {};
    const referenceFiles = [];
    let errors = [];
    let debugEntryPoint = null;
    const {
      onBuildCall,
      addOnBuildListener
    } = (() => {
      const listeners = [];
      return {
        onBuildCall: fuProgram => {
          listeners.forEach(l => l(fuProgram));
        },
        addOnBuildListener: listener => {
          listeners.push(listener);
        }
      };
    })();
    const {
      onSrcFileUpdateCall,
      addOnSrcFileUpdateListener
    } = (() => {
      const listeners = [];
      return {
        onSrcFileUpdateCall: () => {
          listeners.forEach(l => l());
        },
        addOnSrcFileUpdateListener: listener => {
          listeners.push(listener);
        }
      };
    })();
    const {
      onLeftModelChangeCall,
      addOnLeftModeChangelListener
    } = (() => {
      const listeners = [];
      return {
        onLeftModelChangeCall: path => {
          listeners.forEach(l => l(path));
        },
        addOnLeftModeChangelListener: listener => {
          listeners.push(listener);
        }
      };
    })();
    const {
      onRightModelChangeCall,
      addOnRightModeChangelListener
    } = (() => {
      const listeners = [];
      return {
        onRightModelChangeCall: path => {
          listeners.forEach(l => l(path));
        },
        addOnRightModeChangelListener: listener => {
          listeners.push(listener);
        }
      };
    })();
    const deferedBuild = defer(() => {
      build();
      let files = Object.keys(outFiles);
      if (files.indexOf(previousOpenedTargetFile) === -1) {
        openOutFile(files[0]);
      } else {
        openOutFile(previousOpenedTargetFile);
      }
    }, 500);
    addOnSrcFileUpdateListener(() => {
      deferedBuild();
    });
    const targetLanguages = [{
      name: 'C',
      value: 'c',
      getGenerator: () => new GenC(),
      macro: 'C'
    }, {
      name: 'OpenCL C',
      value: 'cl',
      getGenerator: () => new GenCl(),
      macro: 'CL'
    }, {
      name: 'C++',
      value: 'cpp',
      getGenerator: () => new GenCpp(),
      macro: 'CPP'
    }, {
      name: 'C#',
      value: 'cs',
      getGenerator: () => new GenCs(),
      macro: 'CSHARP'
    }, {
      name: 'D',
      value: 'd',
      getGenerator: () => new GenD(),
      macro: 'D'
    }, {
      name: 'Java',
      value: 'java',
      getGenerator: () => new GenJava(),
      macro: 'JAVA'
    }, {
      name: 'JavaScript',
      value: 'js',
      getGenerator: () => new GenJs(),
      macro: 'JS'
    }, {
      name: 'Python',
      value: 'py',
      getGenerator: () => new GenPy(),
      macro: 'PYTHON'
    }, {
      name: 'Swift',
      value: 'swift',
      getGenerator: () => new GenSwift(),
      macro: 'SWIFT'
    }, {
      name: 'TypeScript',
      value: 'ts',
      getGenerator: () => new GenTs().withGenFullCode(),
      macro: 'TS'
    }, {
      name: 'TypeScript typings',
      value: 'd.ts',
      getGenerator: () => new GenTs(),
      macro: 'TSD'
    }];
    let selectedTargetLanguage = targetLanguages[0].value;
    let previousOpenedSourceFile = '';
    let previousOpenedTargetFile = '';
    function App() {
      const leftEditorContainer = h("div", {
        class: "editor-container"
      });
      const rightEditorContainer = h("div", {
        class: "editor-container"
      });
      leftEditor = monaco.editor.create(leftEditorContainer, {
        theme: "vs-dark",
        lineNumbers: 'on',
        automaticLayout: true
      });
      leftEditor.onDidChangeModelContent(() => {
        deferedBuild();
      });
      rightEditor = window.monaco.editor.create(rightEditorContainer, {
        theme: "vs-dark",
        lineNumbers: 'on',
        readOnly: true,
        value: ``,
        automaticLayout: true
      });
      let targetLanguageSelect;
      return h("div", {
        class: "app"
      }, h(Banner, null), h("div", {
        class: "settings"
      }, h("div", {
        class: "form-group"
      }, h("label", {
        for: "target-language"
      }, "Target language"), h("select", {
        id: "target-language",
        ref: e => targetLanguageSelect = e,
        onChange: () => {
          selectedTargetLanguage = targetLanguageSelect.value;
          deferedBuild();
        }
      }, targetLanguages.map(lang => h("option", {
        value: lang.value
      }, lang.name)))), h("div", null, h("div", {
        class: "form-group"
      }, h("label", {
        for: "debug-starting-point"
      }, "Debug starting point"), h(DebugStartingPointSelector, null)), h("div", null, h("button", {
        title: "Run the debug starting point in a JavaScript context",
        onClick: () => runDebug()
      }, "Run Debug")))), h("div", {
        class: "editors-columns"
      }, h("div", {
        class: "editor-column"
      }, h(SrcTabSelector, null), leftEditorContainer), h("div", {
        class: "editor-column"
      }, h(TabSelector, null), h(ErrorsReporter, null), rightEditorContainer)));
    }
    function Banner() {
      return h("div", {
        class: "banner"
      }, h("div", {
        class: "banner-left"
      }, h("h1", {
        class: "banner-title"
      }, "Fusion Playground")), h("div", {
        class: "banner-right"
      }, h("div", {
        class: "libinfo"
      }, h("a", {
        href: "https://github.com/fusionlanguage/fut"
      }, "Fusion language Github"), h("div", null, "LibFut version: ", window.libfutVersion))));
    }
    function DebugStartingPointSelector() {
      let availableEntryPoints = [];
      const selectRef = h("select", {
        id: "debug-starting-point",
        onChange: () => {
          if (!selectRef.value || availableEntryPoints.indexOf(selectRef.value) === -1) return;
          debugEntryPoint = selectRef.value;
        }
      });
      addOnBuildListener(program => {
        if (!program) return;
        let entryPoints = [];
        program.classes.forEach(c => {
          if (c.callType === FuCallType.STATIC && c.isPublic) {
            for (let fieldName in c.dict) {
              const field = c.dict[fieldName];
              if (!(field instanceof FuMethod)) continue;
              if (field.callType === FuCallType.STATIC && field.visibility === FuVisibility.PUBLIC) {
                entryPoints.push(`${c.name}.${field.name}`);
              }
            }
          }
        });
        availableEntryPoints = entryPoints;
        selectRef.innerHTML = '';
        selectRef.append(...availableEntryPoints.map(entryPoint => h("option", {
          value: entryPoint
        }, entryPoint)));
        selectRef.value = debugEntryPoint && availableEntryPoints.indexOf(debugEntryPoint) !== -1 && debugEntryPoint || null;
      });
      return selectRef;
    }
    function ErrorsReporter() {
      let errorsRef = h("div", {
        class: "errors-container"
      });
      addOnBuildListener(() => {
        errorsRef.innerHTML = '';
        if (errors.length === 0) {
          return;
        }
        errorsRef.append(h("div", {
          class: "errors"
        }, errors.map(error => h("button", {
          class: "error",
          onClick: () => {
            openSrcFile(error.filename);
            leftEditor.setSelection(new monaco.Selection(error.startLine, error.startColumn, error.endLine, error.endColumn));
            leftEditor.focus();
          }
        }, error.filename, "(", error.startLine.toString(10), ":", error.startColumn.toString(10), "): ", error.message))));
      });
      return errorsRef;
    }
    function SrcTabSelector() {
      let tabsRef = h("div", {
        class: "tab-selector"
      });
      function openTab(path) {
        openSrcFile(path);
      }
      addOnSrcFileUpdateListener(() => {
        tabsRef.innerHTML = '';
        tabsRef.append(...Object.keys(srcFiles).map(path => {
          let close = null;
          let isReferenceFile = referenceFiles.indexOf(path) !== -1;
          return h("div", {
            class: "tab" + (isReferenceFile ? " reference-file-tab" : ""),
            "data-path": path,
            onClick: () => openTab(path),
            onContextMenu: e => close = openContextMenu(e, () => h("div", {
              class: "context-menu-items"
            }, h("div", {
              class: "context-menu-title"
            }, path), h("hr", null), h("button", {
              class: "context-menu-action",
              onClick: () => {
                close?.();
                promptRenameSrc(path);
              }
            }, "Rename"), !isReferenceFile ? h("button", {
              class: "context-menu-action",
              onClick: () => {
                close?.();
                markAsReferenceFile(path);
              }
            }, "Set as reference file") : h("button", {
              class: "context-menu-action",
              onClick: () => {
                close?.();
                unmarkAsReferenceFile(path);
              }
            }, "Set as source file"), h("button", {
              class: "context-menu-action",
              onClick: () => {
                close?.();
                removeSrcFile(path);
              }
            }, "Delete")))
          }, path);
        }));
        tabsRef.append(h("div", {
          class: "tab",
          onClick: () => addNewSrcFile()
        }, "+"));
        updateSelected(previousOpenedSourceFile);
      });
      addOnLeftModeChangelListener(path => {
        updateSelected(path);
      });
      function updateSelected(path) {
        tabsRef.querySelectorAll('.tab').forEach(tab => tab.getAttribute('data-path') === path ? tab.classList.add('active') : tab.classList.remove('active'));
      }
      return tabsRef;
    }
    function addNewSrcFile() {
      let newFileTemplate = i => i === 0 ? `new_file.fu` : `new_file_${i}.fu`;
      let i = 0;
      let currentFileName;
      while (srcFiles[currentFileName = newFileTemplate(i)]) {
        i++;
      }
      createSrcFile(currentFileName, '');
    }
    function runDebug() {
      if (!debugEntryPoint) return;
      const parser = new FuParser();
      const inputFiles = Object.keys(srcFiles);
      const sema = new FileResourceSema();
      let outputFile = `output.js`;
      let namespace = "";
      let files = {};
      const host = new FileGenHost(path => {
        files[path] = '';
        return {
          write: data => {
            if (typeof data === 'string') {
              files[path] += data;
              return;
            }
            const decoder = new TextDecoder();
            const text = decoder.decode(data);
            files[path] += text;
          },
          close: callback => {
            if (callback) callback();
          },
          delete: () => {
            delete files[path];
          }
        };
      });
      errors = host.errors;
      parser.setHost(host);
      sema.setHost(host);
      parser.addPreSymbol('JS');
      parser.addPreSymbol('DEBUG');
      const system = FuSystem.new();
      let parent = system;
      let program = null;
      try {
        program = parseAndResolve(parser, system, parent, inputFiles, sema, host);
        if (program == null) {
          throw new Error('Failed to parse input files');
        }
        emit(program, new GenJsNoModule(), namespace, outputFile, host);
      } catch (e) {
        console.error(`fut: ERROR: ${e?.message || e}`);
      }
      launchDebugWindow(files[outputFile], debugEntryPoint);
    }
    function markAsReferenceFile(path) {
      referenceFiles.push(path);
      onSrcFileUpdateCall();
    }
    function unmarkAsReferenceFile(path) {
      const index = referenceFiles.indexOf(path);
      if (index === -1) {
        return;
      }
      referenceFiles.splice(index, 1);
      onSrcFileUpdateCall();
    }
    function TabSelector() {
      let tabsRef = h("div", {
        class: "tab-selector"
      });
      function openTab(path) {
        openOutFile(path);
      }
      addOnBuildListener(() => {
        tabsRef.innerHTML = '';
        tabsRef.append(...Object.keys(outFiles).map(path => h("div", {
          class: "tab",
          "data-path": path,
          onClick: () => openTab(path)
        }, path)));
        updateSelected(previousOpenedTargetFile);
      });
      addOnRightModeChangelListener(path => {
        updateSelected(path);
      });
      function updateSelected(path) {
        tabsRef.querySelectorAll('.tab').forEach(tab => tab.getAttribute('data-path') === path ? tab.classList.add('active') : tab.classList.remove('active'));
      }
      return tabsRef;
    }
    function createSrcFile(path, content) {
      const model = monaco.editor.createModel(content, 'fusion');
      srcFiles[path] = model;
      openSrcFile(path);
      onSrcFileUpdateCall();
    }
    function removeSrcFile(path) {
      if (!srcFiles[path]) {
        return;
      }
      if (previousOpenedSourceFile === path) {
        const files = Object.keys(srcFiles);
        const index = files.indexOf(path);
        if (index < files.length - 1) {
          openSrcFile(files[index + 1]);
        } else if (index > 0) {
          openSrcFile(files[index - 1]);
        } else {
          openSrcFile(null);
        }
      }
      srcFiles[path].dispose();
      delete srcFiles[path];
      onSrcFileUpdateCall();
    }
    function promptRenameSrc(path) {
      const result = prompt(`Rename file "${path}"`, path.slice(0, path.lastIndexOf('.')));
      if (!result) {
        return;
      }
      const newPath = `${result}.fu`;
      renameSrcFile(path, newPath);
    }
    function renameSrcFile(oldPath, newPath) {
      if (!srcFiles[oldPath]) {
        return;
      }
      srcFiles[newPath] = srcFiles[oldPath];
      delete srcFiles[oldPath];
      let referenceFileIndex = referenceFiles.indexOf(oldPath);
      if (referenceFileIndex !== -1) {
        referenceFiles.splice(referenceFileIndex, 1, newPath);
      }
      if (previousOpenedSourceFile === oldPath) {
        openSrcFile(newPath);
      }
      onSrcFileUpdateCall();
    }
    function openContextMenu(e, content) {
      e.preventDefault();
      e.stopPropagation();
      const contextMenu = h("div", {
        class: "context-menu",
        style: {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`
        }
      }, content());
      document.body.appendChild(contextMenu);
      const close = () => {
        document.removeEventListener('click', documentClickHandler);
        contextMenu.parentElement?.removeChild(contextMenu);
      };
      const documentClickHandler = e => {
        if (contextMenu.contains(e.target)) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        close();
      };
      document.addEventListener('click', documentClickHandler);
      return close;
    }
    function openSrcFile(path) {
      if (path != null && !srcFiles[path]) return;
      const model = path == null ? null : srcFiles[path];
      leftEditor.setModel(model);
      previousOpenedSourceFile = path;
      onLeftModelChangeCall(path);
    }
    function openOutFile(path) {
      if (!path || !outFiles[path]) return;
      previousOpenedTargetFile = path;
      rightEditor.setModel(outFiles[path]);
      onRightModelChangeCall(path);
    }
    class FileResourceSema extends FuSema {
      #readResource(name, expr) {
        if (srcFiles[name]) {
          return new TextEncoder().encode(srcFiles[name].getValue());
        } else {
          this.reportError(expr, `File ${name} not found`);
        }
        return [];
      }
      getResourceLength(name, expr) {
        if (this.program.resources.hasOwnProperty(name)) return this.program.resources[name].length;
        const content = this.#readResource(name, expr);
        this.program.resources[name] = content;
        return content.length;
      }
    }
    function createOutStream(path) {
      const model = monaco.editor.createModel('', undefined, monaco.Uri.file(path));
      outFiles[path] = model;
      let value = '';
      return {
        write: data => {
          if (typeof data === 'string') {
            value += data;
            return;
          }
          const decoder = new TextDecoder();
          const text = decoder.decode(data);
          value += text;
        },
        close: callback => {
          model.setValue(value);
          value = '';
          if (callback) callback();
        },
        delete: () => {
          value = '';
          delete outFiles[path];
        }
      };
    }
    class FileGenHost extends FuConsoleHost {
      #currentFile;
      errors = [];
      #createOutStream;
      constructor(createOutStream) {
        super();
        this.#createOutStream = createOutStream;
      }
      createFile(directory, filename) {
        if (directory != null) filename = directory ? `${directory}/${filename}` : filename;
        this.#currentFile = this.#createOutStream(filename);
        return this.#currentFile;
      }
      closeFile() {
        if (this.hasErrors) {
          this.#currentFile.close(() => this.#currentFile.delete());
        } else this.#currentFile.close();
      }
      reportError(filename, startLine, startColumn, endLine, endColumn, message) {
        super.reportError(filename, startLine, startColumn, endLine, endColumn, message);
        this.errors.push({
          filename,
          startLine,
          startColumn,
          endLine,
          endColumn,
          message
        });
      }
    }
    function parseAndResolve(parser, system, parent, files, sema, host) {
      parser.program = new FuProgram();
      parser.program.parent = parent;
      parser.program.system = system;
      for (const file of files) {
        const input = new TextEncoder().encode(srcFiles[file].getValue());
        parser.parse(file, input, input.length);
      }
      if (host.hasErrors) return null;
      sema.process(parser.program);
      if (host.hasErrors) return null;
      return parser.program;
    }
    function emit(program, lang, namespace, outputFile, host) {
      let gen;
      if (typeof lang === 'string') {
        switch (lang) {
          case "java":
            outputFile = '';
            break;
        }
        const languageTarget = targetLanguages.find(l => l.value === lang);
        if (!languageTarget) {
          console.error(`fut: ERROR: Unknown target language ${lang}`);
          return;
        }
        gen = languageTarget.getGenerator();
      } else {
        gen = lang;
      }
      gen.namespace = namespace;
      gen.outputFile = outputFile;
      gen.setHost(host);
      gen.writeProgram(program);
      if (host.hasErrors) {
        host.hasErrors = false;
      }
    }
    function disposeOutModels() {
      for (const path of Object.keys(outFiles)) {
        outFiles[path].dispose();
        delete outFiles[path];
      }
    }
    function getExtensionFromLanguage(lang) {
      const languageTarget = targetLanguages.find(l => l.value === lang);
      if (!languageTarget) {
        console.error(`fut: ERROR: Unknown target language ${lang}`);
        return;
      }
      return languageTarget.value;
    }
    function getMacroFromLanguage(lang) {
      const languageTarget = targetLanguages.find(l => l.value === lang);
      if (!languageTarget) {
        console.error(`fut: ERROR: Unknown target language ${lang}`);
        return;
      }
      return languageTarget.macro;
    }
    function build() {
      disposeOutModels();
      const parser = new FuParser();
      const inputFiles = Object.keys(srcFiles).filter(f => referenceFiles.indexOf(f) === -1);
      const sema = new FileResourceSema();
      let outputFile = `output.${getExtensionFromLanguage(selectedTargetLanguage)}`;
      let namespace = "";
      const host = new FileGenHost(createOutStream);
      errors = host.errors;
      parser.setHost(host);
      sema.setHost(host);
      parser.addPreSymbol(getMacroFromLanguage(selectedTargetLanguage));
      const system = FuSystem.new();
      let parent = system;
      let program = null;
      transpileTry: try {
        if (referenceFiles.length > 0) parent = parseAndResolve(parser, system, parent, referenceFiles, sema, host);
        if (parent == null) {
          console.error(`fut: ERROR: Failed to parse referenced files`);
          break transpileTry;
        }
        program = parseAndResolve(parser, system, parent, inputFiles, sema, host);
        if (program == null) {
          console.error(`fut: ERROR: Failed to parse input files`);
          break transpileTry;
        }
        emit(program, selectedTargetLanguage, namespace, outputFile, host);
      } catch (e) {
        console.error(`fut: ERROR: ${e?.message || e}`);
      }
      onBuildCall(program);
    }
    function defer(func, delay) {
      let timeoutHandle;
      return function () {
        if (timeoutHandle) {
          clearTimeout(timeoutHandle);
        }
        timeoutHandle = setTimeout(func, delay);
      };
    }
    async function main() {
      window.monaco.languages.register({
        id: 'fusion'
      });
      monaco.languages.setLanguageConfiguration('fusion', conf);
      monaco.languages.setMonarchTokensProvider('fusion', language);
      document.body.appendChild(h(App, null));
      setTimeout(() => {
        createSrcFile('main.fu', `public class HelloFu
{
    public static string GetMessage()
    {
        return "Hello, world!";
    }
}

public static class Debug
{
    public static void Run() {
        const int Width = 20;
        const int Height = 30;
        byte[Width * Height * 4] colors;
        Console.WriteLine(HelloFu.GetMessage());
        for (int x = 0; x < Width; x++) {
            for (int y = 0; y < Height; y++) {
                int pxOffset = (x + y * Width) * 4;
                int split = 3 * y / Height;
                // R
                colors[pxOffset] = split == 0 ? 255 : 0;
                // G
                colors[pxOffset + 1] = split == 1 ? 255 : 0;
                // B
                colors[pxOffset + 2] = split == 2 ? 255 : 0;
                // Alpha
                colors[pxOffset + 3] = 255;
            }
        }
        DebugExt.WriteImage(Width, Height, colors);
        DebugExt.WriteColorFromArray(colors, Width * 0);
        DebugExt.WriteColorFromArray(colors, Width * 10);
        DebugExt.WriteColorFromArray(colors, Width * 20);
    }
}`);
        createSrcFile('DebugExt.fu', `public static class DebugExt {
    public static void WriteImage(int width, int height, byte[] imageData) {
#if DEBUG
native {console.log(new window.debugUtils.ImageLog(width, height, imageData)); }
#endif
    }
    public static void WriteColor(string color) {
#if DEBUG
native {console.log(new window.debugUtils.ColorLog(color)); }
#endif
    }
    public static void WriteColorFromArray(byte[] pixels, int pixel) {
#if DEBUG
native {console.log(new window.debugUtils.ColorLog(pixels.slice(pixel * 4, (pixel + 1) * 4))); }
#endif
    }
}`);
        markAsReferenceFile('DebugExt.fu');
        debugEntryPoint = 'Debug.Run';
        openSrcFile('main.fu');
        deferedBuild();
      }, 10);
    }

    exports.main = main;

    return exports;

})({});
