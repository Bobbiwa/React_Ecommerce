import React, { useState, useImperativeHandle} from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './css/rich_text_editor.less'

export default function RichTextEditor(props,ref) {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        getRichText()
    };

    //get rich text
    const getRichText = () => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }

    //向父组件暴露getRichText方法
    useImperativeHandle(ref,()=> ({
        getRichText
    }))

    return (
        <div>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    );

}
