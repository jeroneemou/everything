import * as React from 'react';
import { ChangeEvent } from 'react';

export interface EditableProps {
    content: string;
    children?: any;
    tagName?: string;
    editable: boolean;
}

export interface EditableState {
    content: string;
}

export class Editable extends React.Component<EditableProps, EditableState> {
    constructor(props: EditableProps) {
        super(props);

        this.state = {
            content: props.content,
        };
    }

    handlePaste(e: ClipboardEvent) {
        e.preventDefault();
        console.log(e);
        console.log(e.clipboardData.getData('text/plain'));
        const text = e.clipboardData.getData('text/plain');
        console.log(e.clipboardData.getData('text/html'));
        console.log(e.clipboardData.items);
        console.log(e.clipboardData.types);

        document.execCommand('insertHTML', false, text);
        e.clipboardData.clearData();
        // e.clipboardData.setData('text/plain', text);
        // TODO remove any formating ...
    }

    handleChange(e: ChangeEvent) {
        console.log(e);
    }

    render(): React.ReactNode {
        const editableComponent = React.createElement(
            this.props.tagName || 'div',
            {
                onPaste: this.handlePaste,
                onChange: this.handleChange,
                contentEditable: this.props.editable,
                dangerouslySetInnerHTML: { __html: this.state.content },
            },
        );

        return editableComponent;
    }
}
