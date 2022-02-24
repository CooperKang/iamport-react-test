import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export { ReactQuill }
export const Wrapper = styled.div`
max-width: 100%; margin: 1em auto;
min-width: 43em;
${props => props.height ? `& .ql-editor { height: ${props.height}; } ` : `` }
`
