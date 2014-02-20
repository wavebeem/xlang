%lex
%%

\s+                     /* skip whitespace */

\d+                     return "NUM"

'twice'                 return "TWICE"

'up'                    return "UP"
'down'                  return "DOWN"
'left'                  return "LEFT"
'right'                 return "RIGHT"
'count'                 return "COUNT"

'wait'                  return "WAIT"

'('                     return "LPAREN"
')'                     return "RPAREN"
'.'                     return "PERIOD"

<<EOF>>                 return "EOF"
/lex
