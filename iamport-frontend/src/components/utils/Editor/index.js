import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ReactQuill } from './utils'
import { isEqual } from 'lodash'
import api, { parseEndpoint } from 'services/api'

/**
 * Usage
 * const [val, setVal] = useState('')
 * <Editor value={val} onChange={setVal} />
 */
const Editor = ({
  style, height, value, formats, onChange, ...props
}) => {

  const quillRef = useRef()

  const imageHandler = () => { 
    const input = document.createElement('input');
    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click()
    
    input.addEventListener('change', async () => {
      const file = input.files[0]
      const formData = new FormData();
      formData.append('files', file); 
      
      api.upload(`/files`, formData)
        .then(file => {
          const editor = quillRef.current.getEditor()
          const range = editor.getSelection()
          editor.insertEmbed(range, 'image', `${file[0].endpoint}${file[0].fileName}`)
        })
        .catch(e => console.error(e.message))
      
    })
  }

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        //[{ 'font': [] }],
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    } 
  }), [])
  return (
    <Wrapper height={height} style={style}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        value={value || ''}
        onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
        {...props}
      />
    </Wrapper>
  )
}
Editor.propTypes = {
  style: PropTypes.object,
  height: PropTypes.any,
  value: PropTypes.string,
  formats: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
}

Editor.defaultProps = {
  style: {},
  height: null,
  value: '',
  formats: [
    //'font',
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background',        
  ],
  onChange: ()=>{}
}

export default Editor
