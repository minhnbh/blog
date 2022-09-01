import { useField } from 'formik';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import classNames from 'classnames';
import { Editor } from 'react-draft-wysiwyg';
import If from 'pages/_commons/If';
import { isEmpty, isUndefined } from 'lodash';
import FormLabel from '../FormLabel';
import draftToHtml from 'draftjs-to-html';
import classes from 'app/utils/classes';

export interface ITextEditorControlProps {
  name: string;
  label?: string;
  placeholder?: string;
  containerClassName?: string;
  onValueChange?: (e: string) => void;
}

const TextEditorControl: React.FC<ITextEditorControlProps> = ({
  name,
  label,
  placeholder = '',
  containerClassName = ''
}) => {
  const [{ value: valueProp = '' }, { error }, { setValue }] = useField(name);
  const editorRef = useRef<any>();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleChange = (changeState: EditorState) => {
    setEditorState(changeState);
  };

  const handleBlur = (e: SyntheticEvent) => {
    setValue(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  useEffect(() => {
    if (valueProp) {
    }
  }, [valueProp]);

  return (
    <div className={classNames('mt-16', containerClassName)}>
      <If condition={!isUndefined(label)}>
        <FormLabel>{label}</FormLabel>
      </If>
      <div
        className={classNames({
          [`${classes.textBox.error} ${classes.textBox.input}`]:
            !isUndefined(error) && !isEmpty(error)
        })}
      >
        <Editor
          ref={editorRef}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          placeholder={placeholder}
          onBlur={handleBlur}
          onEditorStateChange={handleChange}
        />
      </div>
    </div>
  );
};

export default TextEditorControl;
