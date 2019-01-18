import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input type={type} 
                className={classnames('form-control form-control-lg', {
                'is-invalid': error
            })}
            placeholder={placeholder} 
            name={name} 
            value={value}
            disabled={disabled}
            onChange={onChange}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

TextFieldGroup.protoTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    disabled: PropTypes.string.isRequired
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup