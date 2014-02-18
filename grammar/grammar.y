%start program
%ebnf
%%

program
: statements EOF
{
    return {
        type: "AST",
        data: $$
    };
}
;

statements: statement+;

statement
: compound_statement
| simple_statement
;

compound_statement
: TWICE LPAREN statements RPAREN PERIOD
{
    $$ = {
        type: "TWICE",
        body: $statements
    };
}
;

simple_statement
: COUNT PERIOD
{
    $$ = {
        type: "COUNT"
    };
}
;
