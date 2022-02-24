import React from 'react'
import PropTypes from 'prop-types'

const Lnr = ({ c }) => (c ? <span className={`lnr-${c}`}></span> : null)

Lnr.propTypes = {
  c: PropTypes.string,
}

Lnr.defaultProps = {
  c: '',
}

export default Lnr
