%lex
%%

\s+                     /* skip whitespace */
'twice'                 return "TWICE"
'count'                 return "COUNT"
'('                     return "LPAREN"
')'                     return "RPAREN"
'.'                     return "PERIOD"
<<EOF>>                 return "EOF"
/lex
