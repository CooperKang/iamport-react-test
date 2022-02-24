import React, { Component } from "react";
import PropTypes from "prop-types";
import MultipleUploader from "components/utils/MultipleUploader";
import Editor from "components/utils/Editor";

import api from "services/api";
import _, { result } from "lodash";

class MailComponent extends Component {
  constructor(props) {
    super(props);

    this.initialState = this.initialState.bind(this);
    this.initialize = this.initialize.bind(this);
    this.loadItem = this.loadItem.bind(this);
    this.handle = this.handle.bind(this);
    this.sendEmail = this.sendEmail.bind(this);

    this.state = this.initialState(props);
  }

  componentDidMount() {
    this._mounted = true;
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    if (!this._mounted) {
      return;
    }
    const curProps = this.props;
    if (JSON.stringify(prevProps) !== JSON.stringify(curProps)) {
      return this.setState(this.initialState(curProps), () =>
        this.initialize()
      );
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  initialState(props = this.props) {
    const { user } = this.props;
    const state = { loading: true, error: false, item: { files: [] } };
    return state;
  }

  initialize() {
    if (!this._mounted) {
      return;
    }
    this.loadItem();
  }

  loadItem() {
    this.setState({ loading: false, error: false });
  }

  async handle() {
    const next = { ...this.state },
      values = arguments;
    if (typeof values[0] === "string") {
      _.set(next, values[0], values[1]);
      return this.setState(next, () =>
        values[2] ? values[2](null, next) : null
      );
    }
    if (typeof values[0] === "object" && !values[0].length) {
      Object.keys(values[0]).forEach((key) => _.set(next, key, values[0][key]));
    }
    if (typeof values[0] === "object" && values[0].length) {
      values[0].forEach((e) =>
        Object.keys(e).forEach((key) => _.set(next, key, e[key]))
      );
    }
    return this.setState(next, () =>
      values[1] ? values[1](null, next) : null
    );
  }

  sendEmail() {
    const { item } = this.state;
    const sendTo = document.querySelector(".emailTo").value;
    return api
      .post(`/api/sendEmail`, {
        ...item,
        to: sendTo,
      })
      .then((result) => {
        if (result === 0) {
          alert("이메일 전송이 완료되었습니다.");
        } else {
          alert("이메일 전송에 실패하였습니다.");
        }
      });
  }

  render() {
    const { handle, initialize, sendEmail } = this;
    const { user, location, history, match } = this.props;
    const { loading, error, item } = this.state;
    const commonProps = { user, location, history, match };

    if (loading) {
      return null;
    }
    if (error) {
      return <>error</>;
    }

    return (
      <>
        제목{" "}
        <input
          type="text"
          value={item.title || ""}
          onChange={(e) => [
            e.stopPropagation(),
            e.preventDefault(),
            handle(`item.title`, e.target.value),
          ]}
          style={{ width: "80%", height: "30px", marginBottom: "10px" }}
        />
        <br />
        받는이:
        <input
          className="emailTo"
          type="text"
          style={{ width: "80%", height: "30px", marginBottom: "10px" }}
        />
        <MultipleUploader item={item} handle={handle} path="files" />
        <Editor
          value={item.conts || ""}
          onChange={(val) => handle(`item.conts`, val)}
        />
        <button
          onClick={(e) => [
            e.preventDefault(),
            e.stopPropagation(),
            sendEmail(),
          ]}
        >
          Send email
        </button>
      </>
    );
  }
}

MailComponent.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
};

MailComponent.defaultProps = {
  user: {},
  location: {},
  history: {},
  match: {},
};

export default MailComponent;
