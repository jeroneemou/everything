import * as React from 'react';
import { Fragment } from 'react';
import { Button } from '../components/Button';
import { Editable } from '../components/Editable';
import { Headline } from '../components/Headline';
import { Code } from '../components/Code';
import { Editor } from '@tinymce/tinymce-react';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon-block';
import { CKEditor } from '../components/CkEditor';

// Token handler
type TokenProperties = string[];
type TokenType = [string, TokenProperties[]?];

interface TokenProps {
    token: TokenType;
}

const Token = (props: TokenProps) => {
    const applyFilters = (token: TokenType) => {
        return <span>{token[0]}</span>;
    };

    return props.token.length < 2 ? (
        <Fragment>{props.token[0]}</Fragment>
    ) : (
        applyFilters(props.token)
    );
};

interface TokenHandlerProps {
    tokens: TokenType[];
}

const TokenHandler = (props: TokenHandlerProps) => {
    const handleToken = (token: TokenType) => {
        return <Token token={token} />;
    };

    return <div contentEditable={true}>{props.tokens.map(handleToken)}</div>;
};

// Page
interface IndexProps {}

export const Index = (props: IndexProps) => {
    const content = 'my dummy content <b> bold </b>';

    function handleChange(e: any) {
        console.log(e);
    }

    return (
        <Fragment>
            <Button>Hello</Button>
            <Editable editable={true} content={content} />

            <Headline content={'This is my PIPI'} editable={true} />
            <Code content={'whatever'} editable={true} />
            <TokenHandler
                tokens={[
                    [
                        'This is mdasd dad asodk ad asd oads asdkoaskdo aksd asdo asdo kasd aoskd asd',
                    ],
                    [
                        'asdadsadasdsadsadasdasdasd',
                        [['a', 'https://google.com']],
                    ],
                ]}
            />
            <Editor
                initialValue={'Hello world!'}
                init={{ menubar: false }}
                onChange={handleChange}
                inline
            />
            <CKEditor
                editor={BalloonEditor}
                data={'This is my pip'}
                onChange={(e, ed) => {
                    console.log(e);
                    console.log(ed.getData());
                    console.log(ed.model);
                }}
            />
        </Fragment>
    );
};
