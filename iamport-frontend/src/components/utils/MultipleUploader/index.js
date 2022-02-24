import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import { apiUrl } from "services/api";
import qs from "query-string";
import { fromUpload } from "store/selectors";
import moment from "services/moment";
import * as actions from "store/actions";

import Lnr from "components/utils/Lnr";
import { UploadControl } from "components/utils/Field";

const MultipleUploader = ({ ...props }) => {
  const {
    item,
    path = "images",
    accept = "*",
    upload = { progress: false, rate: 0, ready: false, settings: {} },
    handle = () => {},
    imgOnly = false,
    maxLength = Infinity,
  } = props;
  const getRate = () =>
    (_.get(upload, "settings.key") &&
      _.get(upload, "settings.key") === path &&
      upload.rate) ||
    0;

  const isImage = (file) =>
    ["jpg", "jiff", "png", "bmp", "gif", "jpeg"].includes(
      file.fileName.split(".").splice(-1).toString().toLowerCase()
    );

  const readyUpload = () => {
    const options = { key: path, hidden: false, accept, multiple: true };
    options.onEnd = (datas) => {
      const prev = item[path] || [];
      var next =
        datas && typeof datas === "object" && datas.length ? datas : [];
      if (imgOnly) {
        if (next.find((file) => !isImage(file))) {
          alert("이미지 형식만 업로드 가능합니다");
          next = next.filter((file) => isImage(file));
        }
      }
      if (prev.length + next.length > maxLength) {
        next = next.filter((_, idx) =>
          prev.length + idx + 1 > maxLength ? false : true
        );
        alert(`최대 업로드 갯수는${maxLength} 입니다.`);
      }
      handle(`item.${path}`, [
        ...prev,
        ...next.map((n) => ({ endpoint: apiUrl, ...n })),
      ]);
    };
    props.readyUpload(options);
  };

  const moveUpItem = (file, index) => {
    const nextIndex = index - 1,
      moveIndex = index;
    const next = Array.from({ length: item[path].length }).map(
      (blank, index) => {
        if (index === nextIndex) {
          return item[path][moveIndex];
        }
        if (index === moveIndex) {
          return item[path][nextIndex];
        }
        return item[path][index];
      }
    );
    return handle(`item.${path}`, next);
  };

  const moveDownItem = (file, index) => {
    const moveIndex = index,
      nextIndex = index + 1;
    const next = Array.from({ length: item[path].length }).map(
      (blank, index) => {
        if (index === moveIndex) {
          return item[path][nextIndex];
        }
        if (index === nextIndex) {
          return item[path][moveIndex];
        }
        return item[path][index];
      }
    );
    return handle(`item.${path}`, next);
  };

  const deleteItem = (file, index) => {
    return handle(
      `item.${path}`,
      item[path].filter((file, idx) => index !== idx)
    );
  };

  const uploadButtonProps = {
    type: "button",
    rate: getRate(),
    onClick: (e) => [e.stopPropagation(), e.preventDefault(), readyUpload()],
  };
  //   const uploadButtonProps = { type: 'button', rate: getRate(), onClick: (e) => [e.stopPropagation(), e.preventDefault(), readyUpload()] }

  return (
    <UploadControl>
      <UploadControl.Buttons>
        <UploadControl.Button {...uploadButtonProps}>
          <span className="text">
            {_.get(upload, "settings.key") === path && upload.progress
              ? `업로드중`
              : `업로드`}
          </span>
          {_.get(upload, "settings.key") === path && upload.rate ? (
            <small className="rate">{parseInt(upload.rate * 100)}%</small>
          ) : null}
        </UploadControl.Button>
      </UploadControl.Buttons>

      {_.get(item, `${path}.length`) > 0 ? (
        <UploadControl.Items>
          {item[path].map((file, index) => (
            <UploadControl.Item
              key={`${path}_${index}`}
              onClick={(e) => [
                e.stopPropagation(),
                e.preventDefault(),
                window.open(`${file.endpoint}${file.fileName}`),
              ]}
            >
              <UploadControl.Options>
                {index && index > 0 ? (
                  <UploadControl.Option
                    href="#moveUpItem"
                    onClick={(e) => [
                      e.stopPropagation(),
                      e.preventDefault(),
                      moveUpItem(file, index),
                    ]}
                  >
                    <Lnr c="arrow-up" />
                  </UploadControl.Option>
                ) : null}
                {index < item[path].length - 1 ? (
                  <UploadControl.Option
                    href="#moveDownItem"
                    onClick={(e) => [
                      e.stopPropagation(),
                      e.preventDefault(),
                      moveDownItem(file, index),
                    ]}
                  >
                    <Lnr c="arrow-down" />
                  </UploadControl.Option>
                ) : null}
                <UploadControl.Option
                  href="#deleteItem"
                  onClick={(e) => [
                    e.stopPropagation(),
                    e.preventDefault(),
                    deleteItem(file, index),
                  ]}
                >
                  <Lnr c="cross" />
                </UploadControl.Option>
              </UploadControl.Options>
              {isImage(file) ? (
                <img src={`${file.endpoint}${file.fileName}`} />
              ) : null}
              {!isImage(file) ? (
                <div className="file">
                  <div className="icon">
                    <Lnr c="cloud-download" />
                  </div>
                  <div className="text">{file.originalFileName}</div>
                </div>
              ) : null}
            </UploadControl.Item>
          ))}
        </UploadControl.Items>
      ) : null}
    </UploadControl>
  );
};

MultipleUploader.propTypes = {
  item: PropTypes.object,
  upload: PropTypes.object,
  readyUpload: PropTypes.func,
  endUpload: PropTypes.func,
};

MultipleUploader.defaultProps = {
  item: {},
  upload: {},
  readyUpload: () => {},
};

const mapStateToProps = (state) => ({
  upload: fromUpload.getState(state),
});

const mapDispatchToProps = (dispatch) => ({
  readyUpload: (settings = {}, callback = () => {}) =>
    dispatch(actions.readyUpload(settings, callback)),
  endUpload: (callback = () => {}) => dispatch(actions.endUpload(callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MultipleUploader);
