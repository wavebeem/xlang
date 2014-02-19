%lex
%%

\s+                     /* skip whitespace */

'twice'                 return "TWICE"
'count'                 return "COUNT"

'up'                    return "UP"
'down'                  return "DOWN"
'left'                  return "LEFT"
'right'                 return "RIGHT"

'('                     return "LPAREN"
')'                     return "RPAREN"
'.'                     return "PERIOD"

<<EOF>>                 return "EOF"
/lex
