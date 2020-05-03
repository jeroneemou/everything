import * as React from 'react';
import { RefObject, useEffect } from 'react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon-block';

interface CKEditableProps {
    editor: BalloonEditor;
    data?: string;
    config?: any;
    onChange?: (e: Event, ed?: BalloonEditor) => void;
    onInit?: (ed?: BalloonEditor) => void;
    onFocus?: (e: Event, ed?: BalloonEditor) => void;
    onBlur?: (e: Event, ed?: BalloonEditor) => void;
    onError?: (e: Event, ed?: BalloonEditor) => void;
    disabled?: boolean;
}

export class CKEditor extends React.Component<CKEditableProps> {
    private editor: BalloonEditor;
    private readonly domContainer: RefObject<HTMLDivElement>;

    constructor(props: CKEditableProps) {
        super(props);

        this.editor = null;
        this.domContainer = React.createRef();
    }

    // This component should never be updated by React itself.
    shouldComponentUpdate(nextProps: Readonly<CKEditableProps>) {
        if (!this.editor) {
            return false;
        }

        if (this._shouldUpdateContent(nextProps)) {
            this.editor.setData(nextProps.data);
        }

        if ('disabled' in nextProps) {
            this.editor.isReadOnly = nextProps.disabled;
        }

        return false;
    }

    // Initialize the editor when the component is mounted.
    componentDidMount() {
        this._initializeEditor();
    }

    // Destroy the editor before unmouting the component.
    componentWillUnmount() {
        this._destroyEditor();
    }

    // Render a <div> element which will be replaced by CKEditor.
    render() {
        // We need to inject initial data to the container where the editable will be enabled. Using `editor.setData()`
        // is a bad practice because it initializes the data after every new connection (in case of collaboration usage).
        // It leads to reset the entire content. See: #68
        return (
            <div
                ref={this.domContainer}
                dangerouslySetInnerHTML={{ __html: this.props.data || '' }}
            ></div>
        );
    }

    _initializeEditor() {
        this.props.editor
            .create(this.domContainer.current, this.props.config)
            .then((editor: BalloonEditor) => {
                this.editor = editor;

                if ('disabled' in this.props) {
                    editor.isReadOnly = this.props.disabled;
                }

                if (this.props.onInit) {
                    this.props.onInit(editor);
                }

                const modelDocument = editor.model.document;
                const viewDocument = editor.editing.view.document;

                modelDocument.on('change:data', (event) => {
                    /* istanbul ignore else */
                    if (this.props.onChange) {
                        this.props.onChange(event, editor);
                    }
                });

                viewDocument.on('focus', (event) => {
                    /* istanbul ignore else */
                    if (this.props.onFocus) {
                        this.props.onFocus(event, editor);
                    }
                });

                viewDocument.on('blur', (event) => {
                    /* istanbul ignore else */
                    if (this.props.onBlur) {
                        this.props.onBlur(event, editor);
                    }
                });
            })
            .catch((error) => {
                const onErrorCallback = this.props.onError || console.error;

                onErrorCallback(error);
            });
    }

    _destroyEditor() {
        if (this.editor) {
            this.editor.destroy().then(() => {
                this.editor = null;
            });
        }
    }

    _shouldUpdateContent(nextProps: Readonly<CKEditableProps>) {
        // Check whether `nextProps.data` is equal to `this.props.data` is required if somebody defined the `#data`
        // property as a static string and updated a state of component when the editor's content has been changed.
        // If we avoid checking those properties, the editor's content will back to the initial value because
        // the state has been changed and React will call this method.
        if (this.props.data === nextProps.data) {
            return false;
        }

        // We should not change data if the editor's content is equal to the `#data` property.
        if (this.editor.getData() === nextProps.data) {
            return false;
        }

        return true;
    }
}
