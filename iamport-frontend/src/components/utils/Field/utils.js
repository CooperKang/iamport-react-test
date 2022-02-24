import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'

export const Field = styled.div`
  position: relative; box-sizing: border-box; padding: 0; 
  // justifyContent: 
  z-index: 1; 
  & > div.control {
    margin: .4rem;
    display: flex; position: relative; 
    // z-index: 1;
    & > input { flex: 1 1 auto; min-width: 0; }
    & > textarea { flex: 1 1 auto; min-width: 0; }
    & > select { flex: 1 1 auto; min-width: 30; }
    & > div.icon { position: absolute; right: 0; top: 0; font-size: 1em; padding: 0.75rem; }
    & .row { 
      display: flex;
      & > .label { word-break: keep-all; text-align: center; color: ${palette('muted', 0)}; min-width: 150px; max-width: 150px; } 
    }
    & .col-3 { width: 25%; }
    & .col-6 { width: 50%; }
    & .col-12 { width: 100%; }
  }
  & > div.description {
      display: none; z-index: 0; box-sizing: border-box; transition: all 0.3s; opacity: 0;
      position: absolute; left: 0; top: calc(100%); 
      // max-width: 100%; 
      box-sizing: border-box;
      background: ${palette('darkblue', 3)}; color:  ${palette('muted', 15)}; border-radius: 3px;
      font-size: 0.8em; line-height: 1.3rem; padding: 0.5rem 0.75rem;
      &:after {
        content: ''; position: absolute; top: -10px; left: 10px;
        border: 5px solid transparent; border-bottom: 5px solid ${palette('darkblue', 3)};
      }
  }
  & > div.calendar {
    &:not(.active) { display: none; }
    box-sizing: border-box; box-shadow: 0 0 5px ${palette('muted', 4)}; background: ${palette('muted', 21)};  
    transition: all 0.3s; 
    position: absolute; border-radius: 3px;
    left: 0; top: calc(100%); z-index: 10;
  }
  & .label {
    padding: 0; margin: auto .5em;
    &.input { padding: .5em 0; }
    & > .button { cursor: pointer; }
  }
  & > .flex { display: flex; justify-content: space-between; }
  & > div.control.input { margin: 0 .6em; }
  &:hover {
    z-index: 3;
    & > div.description { z-index: 3; display: block; opacity: 1; }
  }
`

Field.Group = styled.div`
  position: relative; box-sizing: border-box; 
  // z-index: 1; 
  display: flex;
  & > * { flex: 1 1 100%; }
  &:hover { z-index: 3; }
`

Field.Buttons = styled.div`
  position: relative; box-sizing: border-box;
  display: flex;
`

Field.Button = styled.a`
  display: block; outline: none; box-sizing: border-box; white-space: pre; text-decoration: none; min-width: max-content;
  border: 0; padding: 0.85rem 1.25rem; border-radius: 3px; transition: all 0.3s; width: 100%; max-width: 100%;
  box-shadow: 0 0 4px ${palette('muted', 10)}; background: ${palette('muted', 21)}; color: ${palette('muted', 3)};
  &.active { background: ${palette('darkblue', 6)}; color: ${palette('muted', 21)}; }
  &:hover { background: ${palette('darkblue', 3)}; color: ${palette('muted', 21)}; }
  &.terms {
    padding: 0.32rem 1.25rem; font-size: .8rem;
    align-self: center;
    font-size: .9rem;
    @media screen and (max-width: 480px) { font-size: 12px; }
  }
`

export const ProfileControl = styled.div`
  position: relative; box-sizing: border-box;
`

ProfileControl.Picture = styled.div`
  position: relative; box-sizing: border-box;
  & > img {}
`

ProfileControl.Buttons = styled.div`
  position: relative; box-sizing: border-box;
`

ProfileControl.Button = styled.div`
  position: relative; box-sizing: border-box;
`

ProfileControl.Status = styled.div`
  position: relative; box-sizing: border-box;
  & > img {}
`

export const InputControl = styled.input`
  display: block; outline: none; box-sizing: border-box;
  border: 1px; padding: 0.85rem; border-radius: 3px; transition: all 0.3s; width: 100%; max-width: 100%;
  box-shadow: 0 0 4px ${palette('muted', 10)}; color: ${palette('darkblue', 3)};
  &.red { border: 1px solid ${palette('danger', 7)}; }
  &:focus { background: ${palette('muted', 17)}; box-shadow: none; color: ${palette('darkblue', 3)}; }
  &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${palette('darkblue', 3)};
    box-shadow: 0 0 0px 1000px ${palette('muted', 17)} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`

export const SelectControl = styled.select`
  display: block; outline: none; box-sizing: border-box;
  border: 0; padding: 0.85rem; border-radius: 3px; transition: all 0.3s; width: 100%; max-width: 100%;
  box-shadow: 0 0 4px ${palette('muted', 10)}; color: ${palette('darkblue', 3)};
  &:focus { background: ${palette('muted', 17)}; box-shadow: none; color: ${palette('darkblue', 3)}; }
  &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${palette('darkblue', 3)};
    box-shadow: 0 0 0px 1000px ${palette('muted', 17)} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`

export const TextareaControl = styled.textarea`
  display: block; line-height: 1.9rem; outline: none; box-sizing: border-box;
  border: 0; padding: 0.85rem; border-radius: 3px; transition: all 0.3s; min-height: 180px; min-width: 99.9%;
  font-family: ${font('primary')}; box-shadow: 0 0 4px ${palette('muted', 10)}; color: ${palette('darkblue', 3)};
  &:focus { background: ${palette('muted', 15)}; box-shadow: none; color: ${palette('darkblue', 3)}; }
`

export const CheckControl = styled.div`
  display: flex; align-items: center; box-sizing: border-box; padding: 0.2rem 0.5rem; 
  & > div.buttons {
    margin-right: 0.5rem;
    & > button {
      // border-radius: 50%; 
      // line-height: 30px; 
      border-radius: 5px; 
      width: 1.5rem; height: 1.5rem; text-align: center; 
      padding: 0; transition: all 0.3s;
      border: 2px solid ${palette('muted', 7)}; 
      // background: ${palette('muted', 7)}; 
      color: ${palette('muted', 0)};  
      outline: none;  cursor: pointer; 
      &:hover { background: ${palette('muted', 7)}; }
      &.active { 
        border: 2px solid ${palette('muted', 5)}; 
        background: ${palette('muted', 5)}; 
        color: ${palette('muted', 21)};  
      }
    }
    & > span {
      font-weight: normal; margin-left: 0.3em;
      @media screen and (max-width: 480px) { font-size: 3.65vw; }
    }
  }
  & > div.label { color: ${palette('darkblue', 6)}; flex: 1; min-width: 0;}
`

export const TagControl = styled.div`
  display: flex; flex-wrap: wrap;
  & > a {
    display: block; font-size: 0.8em; padding: 0.3rem 0.8rem; margin: 0.25em; letter-spacing: -0.05rem; text-decoration: none;
    color: ${palette('muted', 6)}; border-radius: 10px; border: 1px solid ${palette('muted', 15)}; min-width: max-content;
    &.active { background: ${palette('muted', 4)}; color: ${palette('muted', 17)}; }
  }
`

export const UploadControl = styled.div`
  display: block; position: relative; box-sizing: border-box;
`

UploadControl.Items = styled.div`
  position: relative; box-sizing: border-box; 
  display: flex; flex-wrap: wrap; padding-bottom: 1rem;
`

UploadControl.Item = styled.div`
  position: relative; box-sizing: border-box; overflow: hidden;
  width: 100px; max-height: 100px; min-height: 100px;
  display: flex; align-items: center; justify-content: center;
  @media screen and (max-width: 960px) { min-width: 31%; max-width: 31%; }
  background: ${palette('muted', 10)}; cursor: pointer; border-radius: 5px; margin: 0.5rem 1%;
  & > img {
    opacity: 0.6; transition: all 0.3s; position: relative; height: 100%; margin: 0 auto; display: block; z-index: 1;  
    &:hover { opacity: 1; }
  }
  & > div.file {
    position: relative; box-sizing: border-box;
    width: 100%; margin: 0 auto; display: block; padding: 1rem;
    & > div.icon { text-align: center; font-size: 3em; color: ${palette('muted', 8)}; }
    & > div.text { opacity: 0; transition: all 0.3s; position: absolute; top: 0; left: 0; max-width: 100%; padding: 1rem; font-size: 0.6em; color: ${palette('muted', 3)}; }
    &:hover {
      & > div.text {  opacity: 1; }
    }
  }
`

UploadControl.Options = styled.div`
  position: absolute; box-sizing: border-box; overflow: hidden;
  top: 0rem; right: 0rem; z-index: 3;
`

UploadControl.Option = styled.div`
  position: relative; box-sizing: border-box;
  min-width: 15px; max-width: 15px; min-height: 15px; max-height: 15px; line-height: 15px;
  font-size: 10px; margin: 0.5rem;
  background: ${palette('muted', 21)}; border-radius: 50%; text-align: center;
`

UploadControl.Buttons = styled.div`
  display: flex; position: relative; box-sizing: border-box;
`

const uploadControlButtonRateCSS = css`
  &::after {
    content: ''; font-size: 0;
    position: absolute; left: 0; top: 0; width: ${props => `${props.rate*100}%`}; height: 100%;
    background: ${palette('muted', 21)}; opacity: 0.9; z-index: 2;
  }
`

UploadControl.Button = styled.button`
  position: relative; display: block; font-size: 1em; outline: none; box-sizing: border-box; cursor: pointer;
  text-align: center; border: 0; padding: 0.75rem; transition: all 0.3s; overflow: hidden; outline: none;
  font-family: ${font('primary')}; font-weight: 700; color: ${palette('success', 21)}; border-radius: 5px;
  background: ${palette('success', 7)}; 
  width: -webkit-fill-available; 
  cursor: pointer;
  @media screen and (max-width: 980px) { min-width: 100%; }
  &:hover { background: ${palette('success', 4)}; }
  ${props => props.rate ? uploadControlButtonRateCSS : null}
  & > span { position: relative; z-index: 1; }
  & > small { position: relative; margin-left: 0.25rem; z-index: 1; }
  &.muted { color: ${palette('muted', 21)}; background: ${palette('muted', 7)}; }
`
