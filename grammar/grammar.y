%start program
%ebnf
%%

program
: statement+ EOF
{
    return {
        type: "AST",
        data: $1
    };
}
;

block
: LPAREN statement+ RPAREN
{
    $$ = {
        type: "BLOCK",
        body: $2
    };
}
;

statement
: compound_statement PERIOD
| simple_statement PERIOD
;

compound_statement
: TWICE block
{
    $$ = {
        type: "TWICE",
        body: $block
    };
}
;

simple_statement
: COUNT { $$ = { type: "COUNT"   }; }
| UP    { $$ = { type: "UP"      }; }
| DOWN  { $$ = { type: "DOWN"    }; }
| LEFT  { $$ = { type: "LEFT"    }; }
| RIGHT { $$ = { type: "RIGHT"   }; }
;
