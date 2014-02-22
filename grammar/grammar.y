%start program
%ebnf
%%

program
: statements EOF
{
    return {
        type: "AST",
        body: $statements
    };
}
;

block
: LPAREN statements RPAREN
{
    $$ = {
        type: "BLOCK",
        body: $statements
    };
}
;

statements
: statement*
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
