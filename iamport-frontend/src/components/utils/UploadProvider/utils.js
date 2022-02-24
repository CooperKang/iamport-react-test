import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

export const UploadProvider = styled.div`
  display: block; position: relative; box-sizing: border-box; z-index: 1;
  & > form { position: absolute; left: -9999px; top: -9999px; }
`

UploadProvider.App = styled.div`
  display: block; position: relative; box-sizing: border-box;  z-index: 2;
`

UploadProvider.Progress = styled.div`
  position: fixed; box-sizing: border-box; z-index: 0;
  width: 100%; height: 100%; top: 0; left: 0; transition: all 0.9s;
  z-index: ${props => props.show ? `9999` : `0`}; opacity: ${props => props.show ? 1 : 0};
`

UploadProvider.Progress.propTypes = {
  show: PropTypes.bool,
}

UploadProvider.Progress.Overlay = styled.div`
  display: block; position: absolute; box-sizing: border-box; z-index: 9999; opacity: 0.8;
  width: 100%; height: 100%; top: 0; left: 0; background: ${palette('darkblue', 5)};
`

UploadProvider.Progress.Bar = styled.div`
  display: block; position: absolute; box-sizing: border-box; z-index: 9999; box-shadow: 0 0 5px ${palette('darkblue', 5)}; border-radius: 15px;
  width: 80%; height: 20px; top: 50%; left: 50%; margin-left: calc(-40%); background: ${palette('darkblue', 1)}; transition: all 0.3s;
  &:before {
    content: '${props => Math.round(props.rate*100)}%'; position: absolute; box-sizing: border-box; width: 100%; height: 100%; text-align: center;
    left: 0; top: calc(150%); font-size: 30px; font-weight: 900; font-family: ${font('primary')}; color: ${palette('muted', 21)};
    text-shadow: 0 0 5px ${palette('darkblue', 9)};  transition: all 0.3s;
  }
  &:after { content: ''; position: absolute; box-sizing: border-box; width: ${props => `${Math.round(props.rate*100)}%`}; height: 100%; top: 0; left: 0; background: ${palette('muted', 21)}; border-radius: 15px;  transition: all 0.3s; }
`

UploadProvider.Progress.Bar.propTypes = {
  rate: PropTypes.number,
}

UploadProvider.Progress.Bar.defaultProps = {
  rate: 0,
}
